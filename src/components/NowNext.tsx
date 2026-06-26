import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Day } from '../types'
import { computeNowNext, mapsDirUrl, rideApp } from '../lib/live'

// Tarjeta "en vivo": qué toca ahora, qué viene después, cuándo salir y cómo ir.
// preview = el viaje aún no ha empezado (muestra el plan del día 1 como ejemplo).
export default function NowNext({ day, preview }: { day: Day; preview: boolean }) {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30000)
    return () => clearInterval(id)
  }, [])

  const stops = day.stops ?? []
  // En vista previa (viaje aún no empezado) mostramos el día desde su inicio,
  // no contra el reloj real (si no, saldría "día completado").
  const nowMin = preview ? -1 : now.getHours() * 60 + now.getMinutes()
  const { current, next, minsToNext, leaveInMins, done } = computeNowNext(stops, nowMin)
  if (stops.length === 0 || (!current && !next)) return null

  const ride = rideApp(day.destinationId)
  const fmt = (m: number) => (m >= 60 ? `${Math.floor(m / 60)}h ${m % 60}m` : `${m} min`)

  return (
    <div className="card now-next">
      <div className="nn-head">
        <span className="nn-live"><span className="nn-dot" />{preview ? 'Vista previa · Día 1' : 'Ahora'}</span>
        <Link to={`/dia/${day.id}`} className="nn-all">ver día →</Link>
      </div>

      {current && (
        <div className="nn-current">
          <span className="nn-ic">{current.emoji}</span>
          <div className="nn-body">
            <div className="nn-now-label">Ahora · {current.time}</div>
            <div className="nn-name">{current.name}</div>
          </div>
        </div>
      )}

      {done ? (
        <div className="nn-done">🎉 Día completado. ¡A descansar!</div>
      ) : next ? (
        <div className="nn-next">
          <div className="nn-next-row">
            <span className="nn-ic next">{next.emoji}</span>
            <div className="nn-body">
              <div className="nn-next-label">
                Después · {next.time}
                {minsToNext !== null && <span className="nn-count">en {fmt(minsToNext)}</span>}
              </div>
              <div className="nn-name">{next.name}</div>
            </div>
          </div>
          {leaveInMins !== null && !preview && (
            <div className={`nn-leave ${leaveInMins <= 10 ? 'soon' : ''}`}>
              {leaveInMins <= 0 ? '🚦 Sal ya hacia la siguiente parada' : `🚦 Sal en ${fmt(leaveInMins)}`}
              {current?.transitToNext?.note ? ` · ${current.transitToNext.note}` : ''}
            </div>
          )}
          {next.coords && (
            <div className="nn-actions">
              <a className="nn-go" href={mapsDirUrl(next.coords)} target="_blank" rel="noreferrer">🗺️ Cómo llegar</a>
              <a className="nn-ride" href={ride.url} target="_blank" rel="noreferrer">🚗 {ride.name}</a>
            </div>
          )}
        </div>
      ) : null}
    </div>
  )
}
