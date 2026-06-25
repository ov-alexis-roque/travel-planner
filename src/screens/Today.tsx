import { Link } from 'react-router-dom'
import { trip } from '../data/trip'
import { activeDay, daysUntilTrip, destById, destStyle, eur } from '../lib/utils'
import { usePlanner } from '../store'
import { useWeather, weatherEmoji } from '../lib/weather'
import TripMap, { type MapPoint } from '../components/TripMap'
import { DEST_HEX } from '../components/DayView'

export default function Today() {
  const now = new Date()
  const today = activeDay(now)
  const until = daysUntilTrip(now)
  // Pre-viaje: clima/contexto de la primera parada (Singapur). En ruta: el destino del día.
  const focusDest = until > 0 ? destById('sin') : destById(today.destinationId === 'travel' ? 'sin' : today.destinationId)
  const totalBudget = trip.budget.reduce((s, b) => s + b.amount, 0)
  const isStatusDone = usePlanner((s) => s.isStatusDone)
  const toggleStatus = usePlanner((s) => s.toggleStatus)
  const { data: wx, live } = useWeather(focusDest.coords)

  const idx = trip.days.findIndex((d) => d.id === today.id)
  const nextDay = trip.days[idx + 1]
  const pendingTasks = trip.tasks.filter((t) => t.urgency === 'urgent' || t.urgency === 'soon')
    .filter((t) => !isTaskDone(t))

  const destColor = DEST_HEX[focusDest.colorVar] ?? '#1a1a2a'
  const mapPoints: MapPoint[] = (today.stops ?? []).filter((s) => s.coords)
    .map((s) => ({ lat: s.coords!.lat, lon: s.coords!.lon, n: s.n, label: s.name, color: destColor }))

  const tempShown = live && wx ? wx.tempC : focusDest.climate?.tempDay
  const wxIcon = live && wx ? weatherEmoji(wx.code) : '🌡️'

  return (
    <div className="fadein">
      <div className="hero" style={{ ...destStyle(focusDest.id), background: destColor }}>
        <h1>{trip.name}</h1>
        <div className="big">{focusDest.emoji} {focusDest.name}</div>
        <div className="meta">{until > 0 ? `Primera parada · ${trip.subtitle}` : trip.subtitle}</div>
        <div className="countdown">
          {until > 0
            ? <div className="cd"><div className="n">{until}</div><div className="l">días para salir</div></div>
            : <div className="cd"><div className="n">{today.dayNumber ?? 0}</div><div className="l">de {trip.stats.days} días</div></div>}
          <div className="cd"><div className="n">{tempShown ? `${tempShown}°` : '—'}</div><div className="l">{live ? `${wxIcon} ahora` : '🌡️ típico jul'}</div></div>
          <div className="cd"><div className="n">{eur(totalBudget)}</div><div className="l">presupuesto</div></div>
        </div>
      </div>

      {/* Clima del destino */}
      {focusDest.climate && (
        <div className="card climate">
          <div className="temp">{tempShown}°</div>
          <div className="cl-body">
            <div className="cl-label">{wxIcon} {focusDest.climate.label}</div>
            <div className="cl-advice">{focusDest.climate.advice}</div>
          </div>
          {live ? <span className="cl-live">En vivo</span> : <span className="cl-typ">típico julio</span>}
        </div>
      )}

      {/* Día activo */}
      <div className="section-title">
        {until > 0 ? `Faltan ${until} días · empezamos con` : until === 0 ? '¡Hoy empieza el viaje!' : `Hoy · ${today.date} ${today.weekday}`}
      </div>
      <div className="card tight" style={destStyle(focusDest.id)}>
        <div className="dc-daynum" style={{ marginBottom: 4 }}>
          <span className="dc-pill">{today.dayNumber === null ? 'Salida' : `Día ${today.dayNumber}`}</span>
          <span>·&nbsp;{today.date} · {today.weekday}</span>
        </div>
        <h3 style={{ fontSize: '1.15em', fontWeight: 700 }}>{today.emoji} {today.title}</h3>
        <div className="dc-headline" style={{ marginTop: 4 }}>{today.headline}</div>
        {today.highlights && today.highlights.length > 0 && (
          <div className="chips" style={{ marginTop: 10 }}>
            {today.highlights.map((h, i) => <span key={i} className="chip-h">{h}</span>)}
          </div>
        )}
      </div>

      {/* Mini-mapa del recorrido de hoy */}
      {mapPoints.length > 0 && (
        <div className="map-wrap">
          <TripMap points={mapPoints} height={170} />
          <span className="map-cap">🗺️ Recorrido de hoy · {mapPoints.length} paradas</span>
        </div>
      )}

      {/* Reservas del día */}
      {today.statusItems.length > 0 && (
        <div className="card">
          {today.statusItems.map((s, i) => {
            const on = isStatusDone(today.id, i, s.done)
            return (
              <button key={i} className={`check ${on ? 'on' : ''}`} style={{ width: '100%', textAlign: 'left' }} onClick={() => toggleStatus(today.id, i)}>
                <span className="box">{on ? '✓' : ''}</span>
                <span className="ct">{s.label}</span>
              </button>
            )
          })}
        </div>
      )}

      {/* Cómo moverse */}
      {today.transport && (
        <>
          <div className="section-title">Cómo moverse hoy</div>
          <div className="transport" style={{ margin: '0 14px' }}>🚗 {today.transport}</div>
        </>
      )}

      {/* Tips del día */}
      {today.quickTips && today.quickTips.length > 0 && (
        <>
          <div className="section-title">Que no se te olvide hoy</div>
          <div className="card">
            {today.quickTips.map((q, i) => (
              <div className="qtip" key={i}><span className="qi">{q.startsWith('⚠️') ? '' : '✅'}</span><span>{q}</span></div>
            ))}
          </div>
        </>
      )}

      <Link to={`/dia/${today.id}`} className="section-title" style={{ display: 'block', color: 'var(--sa)' }}>Ver día completo →</Link>

      {/* Lo que falta */}
      {until > 0 && pendingTasks.length > 0 && (
        <>
          <div className="section-title">Lo que falta por cerrar</div>
          <Link to="/pendientes" className="card tight" style={{ display: 'block' }}>
            <strong>{pendingTasks.length} tareas pendientes</strong>
            <div style={{ color: 'var(--muted)', fontSize: '.85em', marginTop: 3 }}>
              {pendingTasks.slice(0, 3).map((t) => t.title.split('—')[0].trim()).join(' · ')}…
            </div>
          </Link>
        </>
      )}

      {nextDay && until <= 0 && (
        <>
          <div className="section-title">Mañana</div>
          <Link to={`/dia/${nextDay.id}`} className="card tight" style={{ display: 'block' }}>
            <strong>{nextDay.emoji} {nextDay.title}</strong>
            <div style={{ color: 'var(--muted)', fontSize: '.85em', marginTop: 3 }}>{nextDay.headline}</div>
          </Link>
        </>
      )}

      <div style={{ textAlign: 'center', color: 'var(--muted)', fontSize: '.72em', padding: '18px' }}>
        Familia Roque · 12 Jul — 5 Ago 2026
      </div>
    </div>
  )
}

function isTaskDone(t: { id: string; done: boolean }) {
  return usePlanner.getState().isTaskDone(t.id, t.done)
}
