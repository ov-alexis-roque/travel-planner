import { useState } from 'react'
import { trip } from '../data/trip'
import { destById } from '../lib/utils'
import { DEST_HEX } from '../components/DayView'
import DayPicker from '../components/DayPicker'
import { findPlaceInPlan } from '../lib/agenda'
import { usePlanner } from '../store'
import type { Place } from '../types'

type View = 'must' | 'activity' | 'food' | 'kids'
const VIEWS: { key: View; label: string }[] = [
  { key: 'must', label: '⭐ Imprescindibles' },
  { key: 'activity', label: '🎒 Actividades' },
  { key: 'food', label: '🍽️ Restaurantes' },
  { key: 'kids', label: '🧒 Ideal niños' },
]

export default function Explore() {
  const dests = trip.destinations.filter((d) => d.id !== 'travel')
  const [destId, setDestId] = useState(dests[0].id)
  const [view, setView] = useState<View>('must')
  const [picker, setPicker] = useState<Place | null>(null)

  const { addedByDay, movedBase, hiddenBase } = usePlanner((s) => ({ addedByDay: s.addedByDay, movedBase: s.movedBase, hiddenBase: s.hiddenBase }))
  const addPlace = usePlanner((s) => s.addPlace)
  const removePlace = usePlanner((s) => s.removePlace)
  const hideBase = usePlanner((s) => s.hideBase)

  const dest = destById(destId)
  const all = trip.catalog.filter((p) => p.destinationId === destId)
  const filtered = all
    .filter((p) => (view === 'must' ? p.must : view === 'food' ? p.kind === 'food' : view === 'kids' ? p.forKids : p.kind === 'activity'))
    .sort((a, b) => a.rank - b.rank)

  const dayLabel = (dayId: string) => {
    const d = trip.days.find((x) => x.id === dayId)
    return d ? `Día ${d.dayNumber ?? 0} · ${d.date}` : ''
  }
  const counts = {
    must: all.filter((p) => p.must).length,
    activity: all.filter((p) => p.kind === 'activity').length,
    food: all.filter((p) => p.kind === 'food').length,
    kids: all.filter((p) => p.forKids).length,
  }

  return (
    <div className="fadein">
      <div className="page-head" style={{ paddingBottom: 4 }}>
        <h1>Explorar</h1>
        <div className="sub">Lo mejor de cada destino · ✓ = ya en tu plan</div>
      </div>

      <div className="pill-row">
        {dests.map((d) => (
          <button key={d.id} className={`pill ${destId === d.id ? 'active' : ''}`}
            style={destId === d.id ? { background: DEST_HEX[d.colorVar], borderColor: DEST_HEX[d.colorVar] } : undefined}
            onClick={() => setDestId(d.id)}>
            {d.emoji} {d.name.replace(/^.*— /, '')}
          </button>
        ))}
      </div>

      <div className="pill-row" style={{ paddingTop: 0 }}>
        {VIEWS.map((v) => (
          <button key={v.key} className={`pill ${view === v.key ? 'active' : ''}`} onClick={() => setView(v.key)}>
            {v.label} {counts[v.key] > 0 && <span style={{ opacity: 0.6 }}>{counts[v.key]}</span>}
          </button>
        ))}
      </div>

      <div className="section-title" style={{ ['--dest' as string]: DEST_HEX[dest.colorVar] }}>
        {dest.emoji} {dest.name} · {VIEWS.find((v) => v.key === view)?.label} ({filtered.length})
      </div>

      {filtered.length === 0 && <div className="empty">Nada en esta categoría para {dest.name}.</div>}

      {filtered.map((p) => {
        const inPlan = findPlaceInPlan(p, { addedByDay, movedBase, hiddenBase })
        return (
          <div key={p.id} className={`place-card ${inPlan ? 'in-plan' : ''}`} style={{ ['--dest' as string]: DEST_HEX[dest.colorVar], ['--dest-l' as string]: `var(${dest.colorVar}-l)` }}>
            <div className="pc-rank">{inPlan ? '✓' : p.rank}</div>
            <div className="pc-body">
              <div className="pc-top">
                <span className="pc-name">{p.emoji} {p.name}</span>
              </div>
              <div className="pc-meta">
                {p.zone && <span className="zone-tag">📍 {p.zone}</span>}
                <span className="sc-cat">{p.category}</span>
                {p.must && <span className="badge" style={{ background: '#fff3d6', color: '#9a6b00' }}>⭐ imprescindible</span>}
                {p.forKids && <span className="badge" style={{ background: '#e6f4ff', color: '#1a5fa0' }}>🧒 niños</span>}
                {p.hours && <span>🕒 {p.hours}</span>}
                {p.price && <span>💶 {p.price}</span>}
              </div>
              <div className="pc-blurb">{p.blurb}</div>
              {p.kids && <div className="pc-kids">👧🧒 {p.kids}</div>}
              <div className="pc-actions">
                {inPlan ? (
                  <>
                    <span className="pc-assigned">✓ En el plan · {dayLabel(inPlan.dayId)}</span>
                    {inPlan.source === 'added'
                      ? <button className="pc-btn ghost" onClick={() => setPicker(p)}>Cambiar día</button>
                      : null}
                    <button className="pc-btn ghost danger" onClick={() => {
                      if (inPlan.source === 'added') removePlace(inPlan.dayId, p.id)
                      else if (inPlan.origDayId && inPlan.n != null) hideBase(inPlan.origDayId, inPlan.n)
                    }}>Quitar del plan</button>
                  </>
                ) : (
                  <button className="pc-btn add" onClick={() => setPicker(p)}>➕ Añadir al día</button>
                )}
              </div>
            </div>
          </div>
        )
      })}
      <div style={{ height: 12 }} />

      {picker && (
        <DayPicker
          title={`${picker.emoji} ${picker.name}`}
          sub={`¿Qué día lo hacéis? · ${dest.emoji} ${dest.name}`}
          destId={picker.destinationId}
          onPick={(dayId) => addPlace(dayId, picker.id)}
          onClose={() => setPicker(null)}
        />
      )}
    </div>
  )
}
