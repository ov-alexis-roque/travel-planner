import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import type { Day, Stop, TransitMode } from '../types'
import { trip } from '../data/trip'
import { destById, destStyle, KIND_LABEL } from '../lib/utils'
import { usePlanner, useUI } from '../store'
import { buildAgenda, type AgendaItem } from '../lib/agenda'
import { dayAnchors, dayAtms } from '../lib/anchors'
import { gmapsUrl } from '../lib/places-helpers'
import { regionInfo } from '../data/regions'
import TripMap, { type MapPoint } from './TripMap'
import DayPicker from './DayPicker'
import { Tip } from './common'

function speak(text: string, lang: string) {
  try {
    const u = new SpeechSynthesisUtterance(text)
    u.lang = lang
    u.rate = 0.9
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(u)
  } catch { /* sin soporte de voz */ }
}

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
  const statusDone = usePlanner((s) => s.statusDone)
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
  const [openGuide, setOpenGuide] = useState<string | null>(null)
  const [openEats, setOpenEats] = useState(true)
  const region = regionInfo[day.id]
  const [openRegion, setOpenRegion] = useState(true)
  const setFocusDay = useUI((s) => s.setFocusDay)
  const setExploreDest = useUI((s) => s.setExploreDest)
  const setExploreView = useUI((s) => s.setExploreView)
  const highlight = useUI((s) => s.highlight)
  const setHighlight = useUI((s) => s.setHighlight)
  useEffect(() => { setFocusDay(day.id) }, [day.id, setFocusDay])

  const legs = (day.legIds ?? []).map((lid) => trip.legs.find((l) => l.id === lid)).filter(Boolean)
  const destColor = DEST_HEX[dest.colorVar] ?? '#1a1a2a'

  // Amanecer/atardecer: usa el del destino; en días de vuelo, el del destino de llegada (siguiente con datos).
  let sun = dest.sun
  if (!sun) {
    const di = trip.days.findIndex((d) => d.id === day.id)
    for (let i = di; i < trip.days.length && !sun; i++) sun = destById(trip.days[i].destinationId).sun
    for (let i = di; i >= 0 && !sun; i--) sun = destById(trip.days[i].destinationId).sun
  }

  const agenda = buildAgenda(day.id, { addedByDay, movedBase, hiddenBase, order })
  const keys = agenda.map((i) => i.key)
  const dayEdited = !!(order[day.id]?.length) ||
    Object.entries(movedBase).some(([k, v]) => v === day.id || k.startsWith(`${day.id}:`)) ||
    (addedByDay[day.id]?.length ?? 0) > 0

  const mapPointsResolved: MapPoint[] = agenda.filter((i) => i.coords).map((i, idx) => ({
    lat: i.coords!.lat, lon: i.coords!.lon, n: idx + 1, label: i.name,
    color: i.kind === 'added' ? '#d4900a' : destColor, key: i.key,
  }))
  // Sitios del catálogo de este destino que NO están ya en la agenda → pins "por explorar"
  const agendaCoordKeys = new Set(agenda.filter((i) => i.coords).map((i) => `${i.coords!.lat.toFixed(3)},${i.coords!.lon.toFixed(3)}`))
  const extraPoints: MapPoint[] = trip.catalog
    .filter((p) => p.destinationId === day.destinationId && p.coords)
    .filter((p) => !agendaCoordKeys.has(`${p.coords!.lat.toFixed(3)},${p.coords!.lon.toFixed(3)}`))
    .map((p) => ({ lat: p.coords!.lat, lon: p.coords!.lon, emoji: p.emoji, label: p.name }))

  // Todas las sugerencias de "comer cerca" de las paradas del día, en un solo bloque visible
  const dayEats = (() => {
    const seen = new Set<string>()
    const out: { name: string; dish?: string; note?: string; loc?: { lat: number; lon: number }; key: string }[] = []
    const norm = (n: string) => n.toLowerCase().replace(/^[^a-zà-ÿ0-9]+/, '').replace(/\s*\(.*?\)\s*/g, ' ').replace(/[^a-zà-ÿ0-9]/g, '').trim()
    for (const it of agenda) {
      for (const e of it.guide?.eat ?? []) {
        const k = norm(e.name)
        if (seen.has(k)) continue
        seen.add(k)
        out.push({ ...e, key: `eat-${k}` })
      }
    }
    return out
  })()
  const eatQuery = (name: string) => name.replace(/^[^A-Za-zÀ-ÿ0-9]+/, '').replace(/\s*\(.*?\)\s*/g, ' ').trim()
  // Puntos de comida con coordenadas conocidas → marcador 🍴 en el mapa
  const foodPoints: MapPoint[] = dayEats
    .filter((e) => e.loc)
    .map((e) => ({ lat: e.loc!.lat, lon: e.loc!.lon, label: e.name, key: e.key }))

  function moveItemTo(item: AgendaItem, targetDay: string) {
    if (item.kind === 'base' && item.origDayId && item.n != null) moveBaseToDay(item.origDayId, item.n, targetDay)
    else if (item.kind === 'added' && item.placeId) addPlace(targetDay, item.placeId)
  }
  function removeItem(item: AgendaItem) {
    if (item.kind === 'base' && item.origDayId && item.n != null) hideBase(item.origDayId, item.n)
    else if (item.kind === 'added' && item.placeId) removePlace(day.id, item.placeId)
  }
  // Paradas clave que no se pueden quitar ni mover de día (solo reordenar).
  // Solo se editan actividades, restaurantes y sitios añadidos desde Explorar.
  const LOCKED_CATS = new Set(['Aeropuerto', 'Hotel', 'Puerto', 'Vuelo'])
  const isLocked = (item: AgendaItem) => item.kind === 'base' && LOCKED_CATS.has(item.category)

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
        {sun && <div style={{ marginTop: 8, fontSize: '.78em', color: 'var(--muted)' }}>🌅 Amanece {sun.rise} · 🌇 Anochece {sun.set}</div>}
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

      {/* Intro de país (al iniciar un destino) */}
      {region && (
        <div className="card region-card">
          <button className="region-head" onClick={() => setOpenRegion((v) => !v)}>
            <span>{region.flag} Conoce {region.title} <span className="region-sub">— para contarles a los peques</span></span>
            <span>{openRegion ? '▲' : '▼'}</span>
          </button>
          {openRegion && (
            <div className="region-body">
              <p className="region-intro">{region.intro}</p>
              <div className="region-sec">🤓 ¿Sabías que…?</div>
              {region.funFacts.map((f, i) => <div key={i} className="qtip"><span className="qi">✨</span><span>{f}</span></div>)}
              <div className="region-legend">
                <div className="rl-title">{region.legend.title}</div>
                <div className="rl-text">{region.legend.text}</div>
              </div>
              <div className="region-sec">🗣️ Cuatro palabras (toca 🔊 para oírlas)</div>
              <div className="phrase-grid">
                {region.phrases.map((ph, i) => (
                  <button key={i} className="phrase" onClick={() => speak(ph.local, ph.lang)}>
                    <span className="ph-es">{ph.es}</span>
                    <span className="ph-local">🔊 {ph.local}</span>
                  </button>
                ))}
              </div>
              <Link to="/frases" className="region-more">🗣️ Ver todas las frases (por situación, con audio) →</Link>
              <div className="region-sec">🛍️ De compras</div>
              <div className="region-shop"><b>Qué:</b> {region.shopping.what}</div>
              <div className="region-shop"><b>Dónde:</b> {region.shopping.where}</div>
            </div>
          )}
        </div>
      )}

      {/* Mapa del día */}
      {mapPointsResolved.length > 0 && (
        <div className="map-wrap">
          <TripMap points={mapPointsResolved} height={190} caption={`🗺️ ${day.title}`} extraPoints={extraPoints} foodPoints={foodPoints} anchors={[...dayAnchors(day), ...dayAtms(day)]} highlight={highlight} onPointClick={(k) => setHighlight(highlight === k ? null : k)} />
          <span className="map-cap">🗺️ Recorrido del día · {mapPointsResolved.length} paradas</span>
        </div>
      )}
      {mapPointsResolved.length > 0 && (
        <div className="map-legend">● paradas del día{extraPoints.length > 0 && <> · <span className="lg-extra">◌</span> por explorar cerca</>}{foodPoints.length > 0 && <> · 🍴 dónde comer</>} · 🏧 cajeros · 🏨 hotel · ✈️ aeropuerto</div>
      )}
      {mapPointsResolved.length > 0 && (
        <Link to="/explorar" onClick={() => { setExploreDest(day.destinationId); setExploreView('all') }} className="map-explore-link">🔍 Explorar y añadir sitios en {dest.name.replace(/^.*— /, '')} →</Link>
      )}

      {/* Dónde comer por la zona hoy (agregado de las guías de las paradas, visible directamente) */}
      {dayEats.length > 0 && (
        <>
          <button className="eats-title" onClick={() => setOpenEats((v) => !v)}>
            <span>🍽️ Dónde comer por la zona hoy <span className="eats-count">· {dayEats.length}</span></span>
            <span>{openEats ? '▲' : '▼'}</span>
          </button>
          {openEats && (
            <div className="card" style={{ paddingTop: 6, paddingBottom: 6 }}>
              {dayEats.map((e, i) => (
                <div key={e.key} className={`sg-eat sg-eat-row ${highlight === e.key ? 'hi' : ''}`} style={{ marginTop: i === 0 ? 0 : 6 }}>
                  <button className="sge-main" onClick={() => e.loc && setHighlight(highlight === e.key ? null : e.key)} disabled={!e.loc}>
                    <span className="sge-name">{e.name}{e.loc && <span className="pc-locate"> 📍</span>}{e.dish && <span className="sge-dish"> · {e.dish}</span>}</span>
                    {e.note && <span className="sge-note">{e.note}</span>}
                  </button>
                  <a className="sge-go" href={gmapsUrl(eatQuery(e.name), dest.name.replace(/^[^—]*—\s*/, ''))} target="_blank" rel="noreferrer" aria-label="Abrir en Maps">🗺️</a>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Reservas / estado */}
      {day.statusItems.length > 0 && (
        <>
          <div className="section-title">Reservas y estado</div>
          <div className="card">
            {day.statusItems.map((s, i) => {
              const stored = statusDone[`${day.id}:${i}`]
              const on = stored === undefined ? s.done : stored
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
              <div key={item.key} id={`stop-${item.key}`} className="stop">
                <div className="marker">
                  <div className="num" style={item.kind === 'added' ? { background: '#d4900a' } : undefined}>{idx + 1}</div>
                  <div className="line" />
                </div>
                <div className="content">
                  <div className={`stop-card ${highlight === item.key ? 'hi' : ''}`}>
                    <div className="sc-top">
                      <span className={`sc-name ${item.coords ? 'sc-name-btn' : ''}`} onClick={() => item.coords && setHighlight(highlight === item.key ? null : item.key)}>{item.alt && <span className={`alt-badge alt-${item.alt}`}>Opción {item.alt}</span>}{item.emoji} {item.name}{item.coords && <span className="pc-locate"> 📍</span>}{item.kind === 'added' && <span className="added-tag"> ⭐ añadido</span>}</span>
                      {item.time && <span className="sc-time">{item.time}</span>}
                    </div>
                    <div className="sc-meta">
                      <span className="sc-cat">{item.category}</span>
                      {item.hours && <span>🕒 {item.hours}</span>}
                      {item.status === 'pending' && <span className="badge pending">⏳ reservar</span>}
                      {item.status === 'booked' && <span className="badge booked">✓ ok</span>}
                    </div>
                    {item.note && <div className="sc-note">{item.note}</div>}
                    {item.guide && (
                      <div className="stop-guide">
                        <button className="sg-toggle" onClick={() => setOpenGuide((k) => (k === item.key ? null : item.key))}>
                          <span>🧭 Guía local · cómo sacarle el máximo</span>
                          <span>{openGuide === item.key ? '▲' : '▼'}</span>
                        </button>
                        {openGuide === item.key && (
                          <div className="sg-body">
                            {item.guide.intro && <p className="sg-intro">{item.guide.intro}</p>}
                            {(item.guide.time || item.guide.bestTime) && (
                              <div className="sg-meta">
                                {item.guide.time && <span>⏱️ {item.guide.time}</span>}
                                {item.guide.bestTime && <span>🕐 Mejor: {item.guide.bestTime}</span>}
                              </div>
                            )}
                            {item.guide.route && item.guide.route.length > 0 && (
                              <div className="sg-sec">
                                <div className="sg-h">🚶 El recorrido</div>
                                <ol className="sg-route">{item.guide.route.map((r, i) => <li key={i}>{r}</li>)}</ol>
                              </div>
                            )}
                            {item.guide.tips && item.guide.tips.length > 0 && (
                              <div className="sg-sec">
                                <div className="sg-h">💡 Trucos de local</div>
                                <ul className="sg-list">{item.guide.tips.map((t, i) => <li key={i}>{t}</li>)}</ul>
                              </div>
                            )}
                            {item.guide.family && item.guide.family.length > 0 && (
                              <div className="sg-sec">
                                <div className="sg-h">👧👦 Para el “wow” de los peques</div>
                                <ul className="sg-list">{item.guide.family.map((t, i) => <li key={i}>{t}</li>)}</ul>
                              </div>
                            )}
                            {item.guide.eat && item.guide.eat.length > 0 && (
                              <div className="sg-sec">
                                <div className="sg-h">🍜 Comer cerca (local y a mano)</div>
                                {item.guide.eat.map((e, i) => (
                                  <a key={i} className="sg-eat" href={gmapsUrl(e.name, dest.name.replace(/^[^—]*—\s*/, ''))} target="_blank" rel="noreferrer">
                                    <span className="sge-name">{e.name}{e.dish && <span className="sge-dish"> · {e.dish}</span>}</span>
                                    {e.note && <span className="sge-note">{e.note}</span>}
                                    <span className="sge-go">🗺️</span>
                                  </a>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                    <div className="stop-ctl">
                      <button onClick={() => reorder(day.id, item.key, -1, keys)} disabled={idx === 0} aria-label="Subir">▲</button>
                      <button onClick={() => reorder(day.id, item.key, 1, keys)} disabled={idx === agenda.length - 1} aria-label="Bajar">▼</button>
                      {isLocked(item) ? (
                        <span className="stop-lock">🔒 parada fija</span>
                      ) : (
                        <>
                          <button onClick={() => setMoving(item)}>⤴ Mover de día</button>
                          <button className="danger" onClick={() => removeItem(item)}>✕ Quitar</button>
                        </>
                      )}
                      {item.coords && <a href={gmapsUrl(item.name, undefined, item.coords)} target="_blank" rel="noreferrer">🗺️ Maps</a>}
                    </div>
                  </div>
                  {!dayEdited && item.transit && <Transit t={item.transit} />}
                </div>
              </div>
            ))}
          </div>
          <div style={{ margin: '2px 14px 0', fontSize: '.78em', color: 'var(--muted)' }}>
            💡 Reordena con ▲▼. Puedes mover o quitar actividades y restaurantes (los añadidos desde <b>Explorar</b> también). El aeropuerto y el hotel quedan fijos 🔒.
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
