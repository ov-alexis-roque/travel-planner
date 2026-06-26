import { trip } from '../data/trip'
import { activeDay, destById } from '../lib/utils'
import { buildAgenda } from '../lib/agenda'
import { dayAnchors, dayAtms } from '../lib/anchors'
import { usePlanner, useUI } from '../store'
import TripMap, { type MapPoint } from './TripMap'
import { DEST_HEX } from './DayView'

// Mapa lateral persistente (iPad/desktop). Muestra el día en foco y, al tocar
// un pin, hace scroll a esa actividad en la columna izquierda.
export default function SideMap() {
  const focusDayId = useUI((s) => s.focusDayId)
  const { addedByDay, movedBase, hiddenBase, order } = usePlanner((s) => ({
    addedByDay: s.addedByDay, movedBase: s.movedBase, hiddenBase: s.hiddenBase, order: s.order,
  }))

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
          <TripMap key={day.id} points={points} extraPoints={extraPoints} anchors={[...dayAnchors(day), ...dayAtms(day)]} height="100%" rounded={false} expandable={false} onPointClick={scrollToStop} />
        ) : (
          <div className="empty">Sin mapa para este día.</div>
        )}
      </div>
      <div className="side-map-foot">Toca un pin para ir a la actividad · ◌ = por explorar cerca · 🏨 hotel · ✈️ aeropuerto</div>
    </div>
  )
}
