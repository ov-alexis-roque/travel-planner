import { useState } from 'react'
import type { Day, Stop, TransitMode } from '../types'
import { trip } from '../data/trip'
import { destById, destStyle, KIND_LABEL } from '../lib/utils'
import { usePlanner } from '../store'
import { buildAgenda, type AgendaItem } from '../lib/agenda'
import TripMap, { type MapPoint } from './TripMap'
import DayPicker from './DayPicker'
import { Tip } from './common'

const TRANSIT_ICON: Record<TransitMode, string> = {
  walk: '🚶', car: '🚗', flight: '✈️', ferry: '⛴️', boat: '🛥️', train: '🚆', bus: '🚌',
}
const TRANSIT_LABEL: Record<TransitMode, string> = {
  walk: 'Andando', car: 'Grab / coche', flight: 'Vuelo', ferry: 'Ferry', boat: 'Barca', train: 'Tren', bus: 'Bus',
}

function Transit({ t }: { t: NonNullable<Stop['transitToNext']> }) {
  const [open, setOpen] = useState(false)
  const bits = [TRANSIT_LABEL[t.mode]]
  if (t.min) bits.push(t.min >= 60 ? `${Math.floor(t.min / 60)}h${t.min % 60 ? ' ' + (t.min % 60) + 'm' : ''}` : `${t.min} min`)
  if (t.km) bits.push(`${t.km} km`)
  const hasInfo = t.line || t.board || t.alight || t.fare || t.freq || t.tip
  return (
    <div className="transit-wrap">
      <div className="transit">
        <span className="tx-ic">{TRANSIT_ICON[t.mode]}</span>
        <span>{bits.join(' · ')}{t.note ? ` · ${t.note}` : ''}</span>
        {hasInfo && <button className="tx-info" onClick={() => setOpen((v) => !v)}>{open ? 'ocultar' : 'ⓘ cómo'}</button>}
        <span className="tx-line" />
      </div>
      {open && hasInfo && (
        <div className="transit-info">
          {t.line && <div><b>Línea:</b> {t.line}</div>}
          {t.board && <div><b>Coger en:</b> {t.board}</div>}
          {t.alight && <div><b>Bajar en:</b> {t.alight}</div>}
          {t.fare && <div><b>Tarifa:</b> {t.fare}</div>}
          {t.freq && <div><b>Frecuencia:</b> {t.freq}</div>}
          {t.tip && <div className="ti-tip">💡 {t.tip}</div>}
        </div>
      )}
    </div>
  )
}

export default function DayView({ day }: { day: Day }) {
  const dest = destById(day.destinationId)
  const isStatusDone = usePlanner((s) => s.isStatusDone)
  const toggleStatus = usePlanner((s) => s.toggleStatus)
  const { addedByDay, movedBase, hiddenBase, order } = usePlanner((s) => ({
    addedByDay: s.addedByDay, movedBase: s.movedBase, hiddenBase: s.hiddenBase, order: s.order,
  }))
  const reorder = usePlanner((s) => s.reorder)
  const moveBaseToDay = usePlanner((s) => s.moveBaseToDay)
  const hideBase = usePlanner((s) => s.hideBase)
  const addPlace = usePlanner((s) => s.addPlace)
  const removePlace = usePlanner((s) => s.removePlace)
  const [moving, setMoving] = useState<AgendaItem | null>(null)

  const legs = (day.legIds ?? []).map((lid) => trip.legs.find((l) => l.id === lid)).filter(Boolean)
  const destColor = DEST_HEX[dest.colorVar] ?? '#1a1a2a'

  const agenda = buildAgenda(day.id, { addedByDay, movedBase, hiddenBase, order })
  const keys = agenda.map((i) => i.key)
  const dayEdited = !!(order[day.id]?.length) ||
    Object.entries(movedBase).some(([k, v]) => v === day.id || k.startsWith(`${day.id}:`)) ||
    (addedByDay[day.id]?.length ?? 0) > 0

  const mapPointsResolved: MapPoint[] = agenda.filter((i) => i.coords).map((i, idx) => ({
    lat: i.coords!.lat, lon: i.coords!.lon, n: idx + 1, label: i.name,
    color: i.kind === 'added' ? '#d4900a' : destColor,
  }))

  function moveItemTo(item: AgendaItem, targetDay: string) {
    if (item.kind === 'base' && item.origDayId && item.n != null) moveBaseToDay(item.origDayId, item.n, targetDay)
    else if (item.kind === 'added' && item.placeId) addPlace(targetDay, item.placeId)
  }
  function removeItem(item: AgendaItem) {
    if (item.kind === 'base' && item.origDayId && item.n != null) hideBase(item.origDayId, item.n)
    else if (item.kind === 'added' && item.placeId) removePlace(day.id, item.placeId)
  }

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
        {dest.sun && <div style={{ marginTop: 8, fontSize: '.78em', color: 'var(--muted)' }}>🌅 Amanece {dest.sun.rise} · 🌇 Anochece {dest.sun.set}</div>}
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
          <TripMap points={mapPointsResolved} height={190} caption={`🗺️ ${day.title}`} />
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

      {/* Agenda editable */}
      {agenda.length > 0 && (
        <>
          <div className="section-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Recorrido · paso a paso</span>
            <span style={{ color: 'var(--muted)', fontWeight: 600, textTransform: 'none', letterSpacing: 0 }}>editable ✏️</span>
          </div>
          <div className="stops">
            {agenda.map((item, idx) => (
              <div key={item.key} className="stop">
                <div className="marker">
                  <div className="num" style={item.kind === 'added' ? { background: '#d4900a' } : undefined}>{idx + 1}</div>
                  <div className="line" />
                </div>
                <div className="content">
                  <div className="stop-card">
                    <div className="sc-top">
                      <span className="sc-name">{item.alt && <span className={`alt-badge alt-${item.alt}`}>Opción {item.alt}</span>}{item.emoji} {item.name}{item.kind === 'added' && <span className="added-tag"> ⭐ añadido</span>}</span>
                      {item.time && <span className="sc-time">{item.time}</span>}
                    </div>
                    <div className="sc-meta">
                      <span className="sc-cat">{item.category}</span>
                      {item.hours && <span>🕒 {item.hours}</span>}
                      {item.status === 'pending' && <span className="badge pending">⏳ reservar</span>}
                      {item.status === 'booked' && <span className="badge booked">✓ ok</span>}
                    </div>
                    {item.note && <div className="sc-note">{item.note}</div>}
                    <div className="stop-ctl">
                      <button onClick={() => reorder(day.id, item.key, -1, keys)} disabled={idx === 0} aria-label="Subir">▲</button>
                      <button onClick={() => reorder(day.id, item.key, 1, keys)} disabled={idx === agenda.length - 1} aria-label="Bajar">▼</button>
                      <button onClick={() => setMoving(item)}>⤴ Mover de día</button>
                      <button className="danger" onClick={() => removeItem(item)}>✕ Quitar</button>
                    </div>
                  </div>
                  {!dayEdited && item.transit && <Transit t={item.transit} />}
                </div>
              </div>
            ))}
          </div>
          <div style={{ margin: '2px 14px 0', fontSize: '.78em', color: 'var(--muted)' }}>
            💡 Reordena con ▲▼, mueve paradas a otro día o quita lo que no harás. Añade más desde <b>Explorar</b>.
          </div>
        </>
      )}

      {/* Si no hay paradas detalladas, mostrar el plan por franjas */}
      {(!day.stops || day.stops.length === 0) && (
        <>
          <div className="section-title">Plan del día</div>
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
        </>
      )}

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

      {moving && (
        <DayPicker
          title={`Mover: ${moving.emoji} ${moving.name}`}
          sub="¿A qué día lo llevas?"
          onPick={(target) => moveItemTo(moving, target)}
          onClose={() => setMoving(null)}
        />
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
