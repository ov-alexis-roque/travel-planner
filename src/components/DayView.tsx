import type { Day, Stop, TransitMode } from '../types'
import { trip } from '../data/trip'
import { destById, destStyle, KIND_LABEL } from '../lib/utils'
import { usePlanner } from '../store'
import TripMap, { type MapPoint } from './TripMap'
import { Tip } from './common'

const TRANSIT_ICON: Record<TransitMode, string> = {
  walk: '🚶', car: '🚗', flight: '✈️', ferry: '⛴️', boat: '🛥️', train: '🚆', bus: '🚌',
}
const TRANSIT_LABEL: Record<TransitMode, string> = {
  walk: 'Andando', car: 'Grab / coche', flight: 'Vuelo', ferry: 'Ferry', boat: 'Barca', train: 'Tren', bus: 'Bus',
}

function Transit({ t }: { t: NonNullable<Stop['transitToNext']> }) {
  const bits = [TRANSIT_LABEL[t.mode]]
  if (t.min) bits.push(t.min >= 60 ? `${Math.floor(t.min / 60)}h${t.min % 60 ? ' ' + (t.min % 60) + 'm' : ''}` : `${t.min} min`)
  if (t.km) bits.push(`${t.km} km`)
  return (
    <div className="transit">
      <span className="tx-ic">{TRANSIT_ICON[t.mode]}</span>
      <span>{bits.join(' · ')}{t.note ? ` · ${t.note}` : ''}</span>
      <span className="tx-line" />
    </div>
  )
}

export default function DayView({ day }: { day: Day }) {
  const dest = destById(day.destinationId)
  const isStatusDone = usePlanner((s) => s.isStatusDone)
  const toggleStatus = usePlanner((s) => s.toggleStatus)
  const legs = (day.legIds ?? []).map((lid) => trip.legs.find((l) => l.id === lid)).filter(Boolean)

  const mapPoints: MapPoint[] = (day.stops ?? [])
    .filter((s) => s.coords)
    .map((s) => ({ lat: s.coords!.lat, lon: s.coords!.lon, n: s.n, label: s.name, color: `var(${dest.colorVar})` }))
  // resolver var() a color real para Leaflet (no entiende CSS vars en inline marker)
  const destColor = DEST_HEX[dest.colorVar] ?? '#1a1a2a'
  const mapPointsResolved = mapPoints.map((p) => ({ ...p, color: destColor }))

  return (
    <div style={destStyle(day.destinationId)} className="fadein">
      {/* Header */}
      <div className="card" style={{ borderLeft: '5px solid var(--dest)' }}>
        <div className="dc-daynum" style={{ marginBottom: 4 }}>
          <span className="dc-pill">{day.dayNumber === null ? 'Salida' : `Día ${day.dayNumber}`}</span>
          <span>·&nbsp;{day.date} · {day.weekday} · {dest.emoji} {dest.name}</span>
        </div>
        <h2 style={{ fontSize: '1.3em', fontWeight: 800, letterSpacing: '-.3px' }}>{day.emoji} {day.title}</h2>
        <div className="dc-headline" style={{ marginTop: 5 }}>{day.headline}</div>
        <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
          <span className="badge free">{KIND_LABEL[day.kind]}</span>
          {day.accommodation && <span className={`badge ${day.accommodation.status}`}>🛏️ {day.accommodation.name}</span>}
        </div>
        {day.highlights && day.highlights.length > 0 && (
          <div className="chips" style={{ marginTop: 12 }}>
            {day.highlights.map((h, i) => <span key={i} className="chip-h">{h}</span>)}
          </div>
        )}
      </div>

      {/* Mapa del día */}
      {mapPointsResolved.length > 0 && (
        <div className="map-wrap">
          <TripMap points={mapPointsResolved} height={190} />
          <span className="map-cap">🗺️ Recorrido del día · {mapPointsResolved.length} paradas</span>
        </div>
      )}

      {/* Reservas / estado */}
      {day.statusItems.length > 0 && (
        <>
          <div className="section-title">Reservas y estado</div>
          <div className="card">
            {day.statusItems.map((s, i) => {
              const on = isStatusDone(day.id, i, s.done)
              return (
                <button key={i} className={`check ${on ? 'on' : ''}`} style={{ width: '100%', textAlign: 'left' }} onClick={() => toggleStatus(day.id, i)}>
                  <span className="box">{on ? '✓' : ''}</span>
                  <span className="ct">{s.label}</span>
                </button>
              )
            })}
          </div>
        </>
      )}

      {/* Timeline de paradas */}
      {day.stops && day.stops.length > 0 && (
        <>
          <div className="section-title">Recorrido · paso a paso</div>
          <div className="stops">
            {day.stops.map((s) => (
              <div key={s.n} className="stop">
                <div className="marker">
                  <div className="num">{s.n}</div>
                  <div className="line" />
                </div>
                <div className="content">
                  <div className="stop-card">
                    <div className="sc-top">
                      <span className="sc-name">{s.emoji} {s.name}</span>
                      {s.time && <span className="sc-time">{s.time}</span>}
                    </div>
                    <div className="sc-meta">
                      <span className="sc-cat">{s.category}</span>
                      {s.hours && <span>🕒 {s.hours}</span>}
                      {s.status === 'pending' && <span className="badge pending">⏳ reservar</span>}
                      {s.status === 'booked' && <span className="badge booked">✓ ok</span>}
                    </div>
                    {s.note && <div className="sc-note">{s.note}</div>}
                  </div>
                  {s.transitToNext && <Transit t={s.transitToNext} />}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Plan por franjas (texto detallado) */}
      <div className="section-title">Detalle por franjas</div>
      <div className="card">
        {day.slots.map((s, i) => (
          <div className="slot" key={i}>
            <div className="ic">{s.icon ?? '•'}</div>
            <div className="body">
              <div className="when">{s.time ?? SLOT_LABEL[s.key] ?? s.key}</div>
              <div className="txt">{s.text}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Cómo moverse */}
      {day.transport && (
        <>
          <div className="section-title">Cómo moverse hoy</div>
          <div className="transport" style={{ margin: '0 14px' }}>🚗 {day.transport}</div>
        </>
      )}

      {/* Tips */}
      {(day.quickTips?.length || day.tip) && (
        <>
          <div className="section-title">Que no se te olvide</div>
          <div className="card">
            {day.quickTips?.map((q, i) => (
              <div className="qtip" key={i}><span className="qi">{q.startsWith('⚠️') ? '' : '✅'}</span><span>{q}</span></div>
            ))}
          </div>
          {day.tip && <div style={{ margin: '0 14px' }}><Tip text={day.tip} /></div>}
        </>
      )}

      {/* Vuelos del día */}
      {legs.length > 0 && (
        <>
          <div className="section-title">Transporte de este día</div>
          {legs.map((l) => l && (
            <div key={l.id} className="leg">
              <div className="lg-main">
                <div className="lg-route">
                  <div className="lg-cities">{l.from} → {l.to}</div>
                  <div className="lg-times">{l.depart}{l.arrive ? ` → ${l.arrive}` : ''} · {l.duration}</div>
                </div>
                <div className="lg-num"><b>{l.number ?? l.type}</b>{l.carrier}</div>
              </div>
              {l.warnings.map((w, i) => (
                <div key={i} className={`lg-warn ${w.includes('rasbordo') || w.includes('conexión') ? 'transfer' : ''}`}>{w}</div>
              ))}
            </div>
          ))}
        </>
      )}
    </div>
  )
}

const SLOT_LABEL: Record<string, string> = {
  morning: 'Mañana', midday: 'Mediodía', afternoon: 'Tarde', evening: 'Tarde-noche', night: 'Noche',
}

// Colores hex equivalentes a las CSS vars (Leaflet no entiende var()).
export const DEST_HEX: Record<string, string> = {
  '--sin': '#1a3a5c', '--bo': '#2d5016', '--kl': '#8b1a00', '--ub': '#6b4c1a', '--gi': '#00897b', '--sa': '#006994', '--tr': '#4a4a6a',
}
