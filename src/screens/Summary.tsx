import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { trip } from '../data/trip'
import { destStyle, eur, distanceKm } from '../lib/utils'

// Coordenadas de aeropuertos para calcular km volados
const AIRPORTS: Record<string, { lat: number; lon: number }> = {
  BCN: { lat: 41.297, lon: 2.083 }, SIN: { lat: 1.356, lon: 103.988 },
  KUL: { lat: 2.745, lon: 101.71 }, SDK: { lat: 5.901, lon: 118.059 }, DPS: { lat: -8.747, lon: 115.167 },
}
function flightStats() {
  const flights = trip.legs.filter((l) => l.type === 'flight')
  let mins = 0, km = 0
  for (const f of flights) {
    const d = f.duration ?? ''
    const h = /(\d+)\s*h/.exec(d)
    const m = /h\s*(\d+)/.exec(d)
    mins += (h ? +h[1] * 60 : 0) + (m ? +m[1] : 0)
    const a = AIRPORTS[f.from], b = AIRPORTS[f.to]
    if (a && b) km += distanceKm([a, b])
  }
  return { count: flights.length, hours: Math.round(mins / 60), km: Math.round(km) }
}
import { usePlanner, useTheme } from '../store'
import TripMap, { type MapPoint } from '../components/TripMap'
import OfflineMaps from '../components/OfflineMaps'
import { DEST_HEX } from '../components/DayView'

export default function Summary() {
  // Estado de actualización de la PWA (lo gestiona UpdatePrompt; aquí solo el botón/aviso)
  const [needRefresh, setNeedRefresh] = useState(false)
  const [checkMsg, setCheckMsg] = useState('')
  useEffect(() => {
    const onState = (e: Event) => setNeedRefresh(!!(e as CustomEvent).detail?.needRefresh)
    const onChecked = (e: Event) => {
      const nr = !!(e as CustomEvent).detail?.needRefresh
      setNeedRefresh(nr)
      setCheckMsg(nr ? '' : 'Estás en la última versión ✓')
      setTimeout(() => setCheckMsg(''), 4000)
    }
    window.addEventListener('pwa:state', onState)
    window.addEventListener('pwa:checked', onChecked)
    return () => { window.removeEventListener('pwa:state', onState); window.removeEventListener('pwa:checked', onChecked) }
  }, [])

  const theme = useTheme((s) => s.theme)
  const cycleTheme = useTheme((s) => s.cycle)
  const themeLabel = theme === 'auto' ? '🌗 Tema: auto' : theme === 'light' ? '☀️ Tema: claro' : '🌙 Tema: oscuro'

  const dests = trip.destinations.filter((d) => d.id !== 'travel')
  const taskDone = usePlanner((s) => s.taskDone)
  const doneCount = trip.tasks.filter((t) => (taskDone[t.id] === undefined ? t.done : taskDone[t.id])).length

  const total = trip.budget.reduce((s, b) => s + b.amount, 0)
  const paid = trip.budget.filter((b) => b.status === 'paid').reduce((s, b) => s + b.amount, 0)

  const fs = flightStats()
  const catCount: Record<string, number> = {}
  trip.days.forEach((d) => (d.stops ?? []).forEach((s) => { catCount[s.category] = (catCount[s.category] ?? 0) + 1 }))
  const cruises = trip.days.flatMap((d) => d.stops ?? []).filter((s) => /crucero/i.test(s.name)).length
  const kpis = [
    { n: `${trip.stats.days}`, l: '🗓️ días' },
    { n: `${trip.stats.destinations}`, l: '🌍 países' },
    { n: `${fs.count}`, l: '✈️ vuelos' },
    { n: `${fs.hours}h`, l: '🕐 en el aire' },
    { n: `${(fs.km / 1000).toFixed(1)}k`, l: '🛬 km volados' },
    { n: `${trip.stats.nights}`, l: '🛏️ noches' },
  ]
  const funFacts = [
    `🛬 ${fs.km.toLocaleString('es-ES')} km en avión — casi ${(fs.km / 40075).toFixed(2).replace('.', ',')} vueltas al planeta`,
    `🦧 ${cruises} cruceros de fauna por el río Kinabatangan`,
    `🏛️ ${catCount['Templo'] ?? 0} templos · 🏖️ ${catCount['Playa'] ?? 0} playas · 🌿 ${catCount['Naturaleza'] ?? 0} planes de naturaleza`,
    `💶 ${eur(total)} para 4 personas · ${eur(Math.round(total / trip.stats.days / 4))}/persona y día`,
  ]

  // Mapa global: una parada por destino, en orden de ruta
  const routePoints: MapPoint[] = dests
    .filter((d) => d.coords)
    .map((d, i) => ({ lat: d.coords!.lat, lon: d.coords!.lon, n: i + 1, label: d.name, color: DEST_HEX[d.colorVar] }))

  return (
    <div className="fadein">
      <div className="page-head">
        <h1>Resumen del viaje</h1>
        <div className="sub">{trip.subtitle}</div>
      </div>

      {/* KPIs */}
      <div className="card kpi-grid">
        {kpis.map((k, i) => (
          <div key={i} className="kpi"><div className="kpi-n">{k.n}</div><div className="kpi-l">{k.l}</div></div>
        ))}
      </div>

      {/* Fun facts */}
      <div className="section-title">¿Sabías que…?</div>
      <div className="card">
        {funFacts.map((f, i) => <div key={i} className="qtip"><span className="qi">✨</span><span>{f}</span></div>)}
      </div>

      {/* Mapa de toda la ruta */}
      <div className="map-wrap">
        <TripMap points={routePoints} height={260} caption="🗺️ Ruta del viaje" />
        <span className="map-cap">🗺️ Ruta · {dests.length} destinos · {trip.stats.flights} vuelos</span>
      </div>

      {/* Stats */}
      <div className="card" style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
        <div><div style={{ fontSize: '1.5em', fontWeight: 800 }}>{trip.stats.days}</div><div style={{ fontSize: '.7em', color: 'var(--muted)' }}>DÍAS</div></div>
        <div><div style={{ fontSize: '1.5em', fontWeight: 800 }}>{trip.stats.destinations}</div><div style={{ fontSize: '.7em', color: 'var(--muted)' }}>PAÍSES</div></div>
        <div><div style={{ fontSize: '1.5em', fontWeight: 800 }}>{trip.stats.flights}</div><div style={{ fontSize: '.7em', color: 'var(--muted)' }}>VUELOS</div></div>
        <div><div style={{ fontSize: '1.5em', fontWeight: 800 }}>{trip.stats.nights}</div><div style={{ fontSize: '.7em', color: 'var(--muted)' }}>NOCHES</div></div>
      </div>

      {/* Accesos */}
      <Link to="/vuelos" className="card tight" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span><strong>✈️ Vuelos y transporte</strong><div style={{ fontSize: '.82em', color: 'var(--muted)' }}>{trip.legs.filter((l) => l.type === 'flight').length} vuelos · {trip.legs.filter((l) => l.type === 'ferry').length} ferries · trasbordo propio</div></span>
        <span style={{ fontSize: '1.3em', color: 'var(--muted)' }}>›</span>
      </Link>
      <Link to="/hoteles" className="card tight" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span><strong>🏨 Alojamientos</strong><div style={{ fontSize: '.82em', color: 'var(--muted)' }}>{trip.accommodations.length} hoteles · {trip.accommodations.reduce((s, a) => s + a.nights, 0)} noches · todos reservados</div></span>
        <span style={{ fontSize: '1.3em', color: 'var(--muted)' }}>›</span>
      </Link>
      <Link to="/presupuesto" className="card tight" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span><strong>💶 Presupuesto</strong><div style={{ fontSize: '.82em', color: 'var(--muted)' }}>{eur(total)} para 4 · {eur(paid)} pagado · desglose por categoría</div></span>
        <span style={{ fontSize: '1.3em', color: 'var(--muted)' }}>›</span>
      </Link>
      <Link to="/maleta" className="card tight" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span><strong>🧳 Maleta</strong><div style={{ fontSize: '.82em', color: 'var(--muted)' }}>checklist adaptada al recorrido · solo equipaje de mano · plan de lavandería</div></span>
        <span style={{ fontSize: '1.3em', color: 'var(--muted)' }}>›</span>
      </Link>
      <Link to="/documentos" className="card tight" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span><strong>📄 Documentos y emergencias</strong><div style={{ fontSize: '.82em', color: 'var(--muted)' }}>pasaportes, seguro, localizadores y teléfonos de emergencia · sin conexión</div></span>
        <span style={{ fontSize: '1.3em', color: 'var(--muted)' }}>›</span>
      </Link>
      <Link to="/cambio" className="card tight" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span><strong>💱 Cambio de moneda</strong><div style={{ fontSize: '.82em', color: 'var(--muted)' }}>conversor €/SGD/MYR/IDR · efectivo y propina por país · sin conexión</div></span>
        <span style={{ fontSize: '1.3em', color: 'var(--muted)' }}>›</span>
      </Link>
      <Link to="/frases" className="card tight" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span><strong>🗣️ Frases útiles</strong><div style={{ fontSize: '.82em', color: 'var(--muted)' }}>malayo e indonesio por situación · con audio · sin conexión</div></span>
        <span style={{ fontSize: '1.3em', color: 'var(--muted)' }}>›</span>
      </Link>
      <Link to="/pasaporte" className="card tight" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span><strong>🛂 Pasaporte de Exploradores</strong><div style={{ fontSize: '.82em', color: 'var(--muted)' }}>Aira & Leo · sellos de animales, comidas, lugares y experiencias</div></span>
        <span style={{ fontSize: '1.3em', color: 'var(--muted)' }}>›</span>
      </Link>
      <Link to="/gastronomia" className="card tight" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span><strong>🍜 Sabores del viaje</strong><div style={{ fontSize: '.82em', color: 'var(--muted)' }}>platos imprescindibles y restaurantes curados por destino</div></span>
        <span style={{ fontSize: '1.3em', color: 'var(--muted)' }}>›</span>
      </Link>

      {/* Progreso */}
      <div className="card tight">
        <div className="prog-label"><span>Tareas completadas</span><span>{doneCount}/{trip.tasks.length}</span></div>
        <div className="prog"><i style={{ width: `${(doneCount / trip.tasks.length) * 100}%` }} /></div>
        <div className="prog-label" style={{ marginTop: 10 }}><span>Presupuesto pagado</span><span>{eur(paid)} / {eur(total)}</span></div>
        <div className="prog"><i style={{ width: `${(paid / total) * 100}%`, background: 'var(--ok)' }} /></div>
      </div>

      {/* Listo para usar sin conexión */}
      <div className="section-title">📴 Listo para usar sin conexión</div>
      <OfflineMaps />

      {/* Ruta paso a paso */}
      <div className="section-title">La ruta</div>
      <div className="card">
        {dests.map((d) => (
          <div className="route-step" key={d.id} style={destStyle(d.id)}>
            <div className="rs-mark"><div className="rs-dot" /><div className="rs-line" /></div>
            <div className="rs-body">
              <div className="rs-name">{d.emoji} {d.name}</div>
              <div className="rs-meta">{d.dates}{d.nights ? ` · ${d.nights} noches` : ''}{d.climate ? ` · ${d.climate.tempDay}° ${d.climate.label.toLowerCase()}` : ''}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Fichas de destino */}
      <div className="section-title">Fichas de destino</div>
      {dests.map((d) => {
        const restaurants = trip.restaurants.filter((r) => r.destinationId === d.id)
        const acc = trip.accommodations.find((a) => a.destinationId === d.id)
        const L = d.logistics
        return (
          <div key={d.id} className="dest-card" style={destStyle(d.id)}>
            <div className="dest-head">
              <div className="dn">{d.emoji} {d.name}</div>
              <div className="dd">{d.dates}{d.nights ? ` · ${d.nights} noches` : ''}</div>
            </div>
            <div className="dest-body">
              <div className="summ">{d.summary}</div>
              {d.climate && <div className="dest-kv" style={{ marginTop: 10 }}><span className="k">🌡️ Clima jul</span><span>{d.climate.tempDay}°/{d.climate.tempNight}° · {d.climate.label}</span></div>}
              {acc && <div className="dest-kv"><span className="k">🛏️ Alojamiento</span><span>{acc.name}</span></div>}
              {L.currency && <div className="dest-kv"><span className="k">💱 Moneda</span><span>{L.currency}</span></div>}
              {L.transport && <div className="dest-kv"><span className="k">🚕 Transporte</span><span>{L.transport}</span></div>}
              {L.plug && <div className="dest-kv"><span className="k">🔌 Enchufe</span><span>{L.plug}</span></div>}
              {L.notes && <div className="dest-kv"><span className="k">ℹ️ Nota</span><span>{L.notes}</span></div>}
              {d.alerts.map((a, i) => <div key={i} className="dest-alert">⚠️ {a}</div>)}
              {restaurants.length > 0 && (
                <>
                  <div className="section-title" style={{ margin: '14px 0 4px' }}>🍽️ Dónde comer</div>
                  {restaurants.map((r) => (
                    <div key={r.id} className="dest-kv"><span className="k">{r.name}</span><span>{r.specialty} · {r.priceApprox}{r.needsReservation ? ' · reservar' : ''}</span></div>
                  ))}
                </>
              )}
              {d.emergency && <div className="tip info" style={{ marginTop: 12 }}>🆘 {d.emergency.insurance}</div>}
            </div>
          </div>
        )
      })}

      {/* Sello de versión + actualización de la PWA */}
      <div className="version-stamp">
        🧳 Travel Planner Roque · <strong>v{__APP_VERSION__}</strong><br />
        Instalada: {new Date(__BUILD_TIME__).toLocaleString('es-ES', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
        <div className="vs-actions">
          {needRefresh ? (
            <button className="vs-btn hot" onClick={() => window.dispatchEvent(new Event('pwa:notes'))}>✨ ¡Nueva versión! Ver y actualizar</button>
          ) : (
            <button className="vs-btn" onClick={() => window.dispatchEvent(new Event('pwa:check'))}>🔄 Buscar actualización</button>
          )}
          <button className="vs-btn ghost" onClick={() => window.dispatchEvent(new Event('pwa:notes'))}>📋 Novedades</button>
          <button className="vs-btn ghost" onClick={cycleTheme}>{themeLabel}</button>
        </div>
        {checkMsg && <div className="vs-msg">{checkMsg}</div>}
      </div>
      <div style={{ height: 12 }} />
    </div>
  )
}
