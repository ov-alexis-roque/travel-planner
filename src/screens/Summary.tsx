import { Link } from 'react-router-dom'
import { trip } from '../data/trip'
import { destStyle, eur } from '../lib/utils'
import { usePlanner } from '../store'
import TripMap, { type MapPoint } from '../components/TripMap'
import { DEST_HEX } from '../components/DayView'

export default function Summary() {
  const dests = trip.destinations.filter((d) => d.id !== 'travel')
  const taskDone = usePlanner((s) => s.taskDone)
  const doneCount = trip.tasks.filter((t) => (taskDone[t.id] === undefined ? t.done : taskDone[t.id])).length

  const total = trip.budget.reduce((s, b) => s + b.amount, 0)
  const paid = trip.budget.filter((b) => b.status === 'paid').reduce((s, b) => s + b.amount, 0)

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

      {/* Mapa de toda la ruta */}
      <div className="map-wrap">
        <TripMap points={routePoints} height={260} />
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

      {/* Progreso */}
      <div className="card tight">
        <div className="prog-label"><span>Tareas completadas</span><span>{doneCount}/{trip.tasks.length}</span></div>
        <div className="prog"><i style={{ width: `${(doneCount / trip.tasks.length) * 100}%` }} /></div>
        <div className="prog-label" style={{ marginTop: 10 }}><span>Presupuesto pagado</span><span>{eur(paid)} / {eur(total)}</span></div>
        <div className="prog"><i style={{ width: `${(paid / total) * 100}%`, background: 'var(--ok)' }} /></div>
      </div>

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
      <div style={{ height: 12 }} />
    </div>
  )
}
