import { useLocation } from 'react-router-dom'
import { trip } from '../data/trip'
import { activeDay, destById } from '../lib/utils'
import { buildAgenda } from '../lib/agenda'
import { dayAnchors, dayAtms } from '../lib/anchors'
import { atmsByDest } from '../data/atms'
import { usePlanner, useUI } from '../store'
import TripMap, { type MapPoint, type MapAnchor } from './TripMap'
import { DEST_HEX } from './DayView'
import { passportCategories } from '../data/passport'
import type { Place } from '../types'

const VIEW_LABEL: Record<string, string> = { all: '🗂️ Todo', must: '⭐ Imprescindibles', activity: '🎒 Actividades', food: '🍽️ Restaurantes', kids: '🧒 Ideal niños' }
const matchView = (p: Place, v: string) => (v === 'all' ? true : v === 'must' ? !!p.must : v === 'food' ? p.kind === 'food' : v === 'kids' ? !!p.forKids : p.kind === 'activity')

// Mapa lateral persistente (iPad/desktop). Es contextual según la pestaña:
//  · Itinerario / Hoy / detalle de día → mapa del día (con scroll a la parada)
//  · Explorar → el destino y el filtro activos en esa pestaña
//  · Resumen → la ruta completa del viaje (todos los destinos)
export default function SideMap() {
  const { pathname } = useLocation()
  const mode = pathname.startsWith('/explorar') ? 'explore' : pathname.startsWith('/resumen') ? 'route' : pathname.startsWith('/pasaporte') ? 'passport' : 'day'

  const focusDayId = useUI((s) => s.focusDayId)
  const exploreDest = useUI((s) => s.exploreDest)
  const exploreView = useUI((s) => s.exploreView)
  const passportKid = useUI((s) => s.passportKid)
  const highlight = useUI((s) => s.highlight)
  const passportGeo = usePlanner((s) => s.passportGeo)
  const { addedByDay, movedBase, hiddenBase, order } = usePlanner((s) => ({
    addedByDay: s.addedByDay, movedBase: s.movedBase, hiddenBase: s.hiddenBase, order: s.order,
  }))

  // ===== Pasaporte: mapa de sellos conseguidos por el niño activo =====
  if (mode === 'passport') {
    const allStamps = passportCategories.flatMap((c) => c.stamps)
    const points: MapPoint[] = allStamps
      .map((s) => ({ s, g: passportGeo[`${passportKid}:${s.id}`] }))
      .filter((x) => x.g)
      .map(({ s, g }) => ({ lat: g!.lat, lon: g!.lng, emoji: s.emoji, label: s.label, color: '#1a1a2a' }))
    const kidName = passportKid === 'leo' ? 'Leo' : 'Aira'
    return (
      <div className="side-map-inner" style={{ ['--dest' as string]: '#1a1a2a' }}>
        <div className="side-map-head">🛂 Sellos de {kidName} · {points.length} con ubicación</div>
        <div className="side-map-canvas">
          {points.length > 0 ? (
            <TripMap key={`pp-side-${passportKid}-${points.length}`} points={points} showRoute={false} height="100%" rounded={false} expandable={false} fitPadding={50} />
          ) : (
            <div className="empty">Aún sin sellos con ubicación.<br />Al conseguir un sello y dar permiso de ubicación, aparecerá aquí.</div>
          )}
        </div>
        <div className="side-map-foot">El mapa de los sellos que {kidName} ha conseguido por el viaje 🌟</div>
      </div>
    )
  }

  // ===== Resumen: ruta completa del viaje =====
  if (mode === 'route') {
    const dests = trip.destinations.filter((d) => d.id !== 'travel' && d.coords)
    const points: MapPoint[] = dests.map((d, i) => ({ lat: d.coords!.lat, lon: d.coords!.lon, n: i + 1, label: d.name, color: DEST_HEX[d.colorVar] ?? '#1a1a2a' }))
    return (
      <div className="side-map-inner" style={{ ['--dest' as string]: '#1a1a2a' }}>
        <div className="side-map-head">🧭 La ruta · {dests.length} destinos</div>
        <div className="side-map-canvas">
          <TripMap key="route" points={points} height="100%" rounded={false} expandable={false} fitPadding={50} />
        </div>
        <div className="side-map-foot">La ruta completa, en orden · toca un destino</div>
      </div>
    )
  }

  // ===== Explorar: sigue el destino y el filtro activos =====
  if (mode === 'explore') {
    const dest = destById(exploreDest)
    const destColor = DEST_HEX[dest.colorVar] ?? '#1a1a2a'
    const places = trip.catalog.filter((p) => p.destinationId === exploreDest && p.coords && matchView(p, exploreView))
    const points: MapPoint[] = places.map((p) => ({ lat: p.coords!.lat, lon: p.coords!.lon, emoji: p.emoji, label: p.name, color: destColor, key: p.id }))
    const acc = trip.accommodations.find((a) => a.destinationId === exploreDest && a.coords)
    const anchors: MapAnchor[] = [
      ...(acc?.coords ? [{ lat: acc.coords.lat, lon: acc.coords.lon, kind: 'hotel' as const, label: acc.name }] : []),
      ...(atmsByDest[exploreDest] ?? []).map((a) => ({ lat: a.coords.lat, lon: a.coords.lon, kind: 'atm' as const, label: a.name, note: a.note })),
    ]
    return (
      <div className="side-map-inner" style={{ ['--dest' as string]: destColor }}>
        <div className="side-map-head">{dest.emoji} {dest.name.replace(/^.*— /, '')} · {VIEW_LABEL[exploreView]} ({places.length})</div>
        <div className="side-map-canvas">
          {points.length > 0 ? (
            <TripMap key={`${exploreDest}-${exploreView}`} points={points} anchors={anchors} showRoute={false} height="100%" rounded={false} expandable={false} fitPadding={50} highlight={highlight} />
          ) : (
            <div className="empty">Nada en esta categoría aquí.</div>
          )}
        </div>
        <div className="side-map-foot">Sigue lo que filtras en Explorar · toca un pin para ver qué es · 🏨 hotel · 🏧 cajeros</div>
      </div>
    )
  }

  // ===== Día (Hoy / Itinerario / detalle) =====
  const day = trip.days.find((d) => d.id === focusDayId) ?? activeDay(new Date())
  const dest = destById(day.destinationId)
  const destColor = DEST_HEX[dest.colorVar] ?? '#1a1a2a'
  const agenda = buildAgenda(day.id, { addedByDay, movedBase, hiddenBase, order })

  const points: MapPoint[] = agenda.filter((i) => i.coords).map((i, idx) => ({
    lat: i.coords!.lat, lon: i.coords!.lon, n: idx + 1, label: i.name,
    color: i.kind === 'added' ? '#d4900a' : destColor, key: i.key,
  }))
  const agendaKeys = new Set(agenda.filter((i) => i.coords).map((i) => `${i.coords!.lat.toFixed(3)},${i.coords!.lon.toFixed(3)}`))
  const extraPoints: MapPoint[] = trip.catalog
    .filter((p) => p.destinationId === day.destinationId && p.coords)
    .filter((p) => !agendaKeys.has(`${p.coords!.lat.toFixed(3)},${p.coords!.lon.toFixed(3)}`))
    .map((p) => ({ lat: p.coords!.lat, lon: p.coords!.lon, emoji: p.emoji, label: p.name }))

  // "Dónde comer hoy" con coordenadas → mismos pines 🍴 y misma clave que en DayView
  const norm = (n: string) => n.toLowerCase().replace(/^[^a-zà-ÿ0-9]+/, '').replace(/\s*\(.*?\)\s*/g, ' ').replace(/[^a-zà-ÿ0-9]/g, '').trim()
  const seenEat = new Set<string>()
  const foodPoints: MapPoint[] = []
  for (const it of agenda) {
    for (const e of it.guide?.eat ?? []) {
      const k = norm(e.name)
      if (seenEat.has(k)) continue
      seenEat.add(k)
      if (e.loc) foodPoints.push({ lat: e.loc.lat, lon: e.loc.lon, label: e.name, key: `eat-${k}` })
    }
  }

  function scrollToStop(key: string) {
    const el = document.getElementById(`stop-${key}`)
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    el?.classList.add('stop-flash')
    setTimeout(() => el?.classList.remove('stop-flash'), 1200)
  }

  return (
    <div className="side-map-inner" style={{ ['--dest' as string]: destColor }}>
      <div className="side-map-head">🗺️ {day.dayNumber === null ? 'Salida' : `Día ${day.dayNumber}`} · {day.date} · {dest.emoji} {day.title}</div>
      <div className="side-map-canvas">
        {points.length > 0 ? (
          <TripMap key={day.id} points={points} extraPoints={extraPoints} foodPoints={foodPoints} anchors={[...dayAnchors(day), ...dayAtms(day)]} height="100%" rounded={false} expandable={false} onPointClick={scrollToStop} highlight={highlight} />
        ) : (
          <div className="empty">Sin mapa para este día.</div>
        )}
      </div>
      <div className="side-map-foot">Toca un pin para ir a la actividad · ◌ = por explorar cerca · 🏧 cajeros · 🏨 hotel · ✈️ aeropuerto</div>
    </div>
  )
}
