import { useState } from 'react'
import { trip } from '../data/trip'
import { destById } from '../lib/utils'
import { DEST_HEX } from '../components/DayView'
import DayPicker from '../components/DayPicker'
import { findPlaceInPlan } from '../lib/agenda'
import { gmapsUrl, distanceFromHotel, fmtKm } from '../lib/places-helpers'
import { usePlanner, useUI } from '../store'
import type { Place } from '../types'

type View = 'must' | 'activity' | 'food' | 'kids'
type Sort = 'rank' | 'zone' | 'price' | 'alpha' | 'pop'
const SORTS: { key: Sort; label: string }[] = [
  { key: 'rank', label: 'Recomendado' },
  { key: 'pop', label: 'Popularidad' },
  { key: 'zone', label: 'Zona' },
  { key: 'price', label: 'Precio' },
  { key: 'alpha', label: 'A-Z' },
]
const priceNum = (p: Place) => { if (!p.price) return 9999; if (/gratis/i.test(p.price)) return 0; const m = /(\d+)/.exec(p.price); return m ? +m[1] : 9999 }
const SORTERS: Record<Sort, (a: Place, b: Place) => number> = {
  rank: (a, b) => a.rank - b.rank,
  pop: (a, b) => (b.rating ?? 0) - (a.rating ?? 0) || a.rank - b.rank,
  zone: (a, b) => (a.zone ?? '').localeCompare(b.zone ?? '') || a.rank - b.rank,
  price: (a, b) => priceNum(a) - priceNum(b) || a.rank - b.rank,
  alpha: (a, b) => a.name.localeCompare(b.name),
}
const VIEWS: { key: View; label: string }[] = [
  { key: 'must', label: '⭐ Imprescindibles' },
  { key: 'activity', label: '🎒 Actividades' },
  { key: 'food', label: '🍽️ Restaurantes' },
  { key: 'kids', label: '🧒 Ideal niños' },
]

export default function Explore() {
  const dests = trip.destinations.filter((d) => d.id !== 'travel')
  // Destino y filtro viven en el store para que el mapa lateral (iPad) los siga.
  const destId = useUI((s) => s.exploreDest)
  const setDestId = useUI((s) => s.setExploreDest)
  const view = useUI((s) => s.exploreView) as View
  const setView = useUI((s) => s.setExploreView)
  const [sort, setSort] = useState<Sort>('rank')
  const [picker, setPicker] = useState<Place | null>(null)

  const { addedByDay, movedBase, hiddenBase } = usePlanner((s) => ({ addedByDay: s.addedByDay, movedBase: s.movedBase, hiddenBase: s.hiddenBase }))
  const addPlace = usePlanner((s) => s.addPlace)
  const removePlace = usePlanner((s) => s.removePlace)
  const hideBase = usePlanner((s) => s.hideBase)

  const dest = destById(destId)
  const all = trip.catalog.filter((p) => p.destinationId === destId)
  const filtered = all
    .filter((p) => (view === 'must' ? p.must : view === 'food' ? p.kind === 'food' : view === 'kids' ? p.forKids : p.kind === 'activity'))
    .sort(SORTERS[sort])

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

      <div className="sort-row">
        <span>Ordenar:</span>
        <select value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
          {SORTS.map((s) => <option key={s.key} value={s.key}>{s.label}</option>)}
        </select>
      </div>

      <div className="section-title" style={{ ['--dest' as string]: DEST_HEX[dest.colorVar] }}>
        {dest.emoji} {dest.name} · {VIEWS.find((v) => v.key === view)?.label} ({filtered.length})
      </div>

      {filtered.length === 0 && <div className="empty">Nada en esta categoría para {dest.name}.</div>}

      {filtered.map((p) => {
        const inPlan = findPlaceInPlan(p, { addedByDay, movedBase, hiddenBase })
        const dist = distanceFromHotel(p)
        return (
          <div key={p.id} className={`place-card ${inPlan ? 'in-plan' : ''}`} style={{ ['--dest' as string]: DEST_HEX[dest.colorVar], ['--dest-l' as string]: `var(${dest.colorVar}-l)` }}>
            <div className="pc-rank">{inPlan ? '✓' : p.rank}</div>
            <div className="pc-body">
              <div className="pc-top">
                <span className="pc-name">{p.emoji} {p.name}</span>
              </div>
              <div className="pc-meta">
                {p.zone && <span className="zone-tag">📍 {p.zone}</span>}
                {p.rating && <span className="rating-tag">⭐ {p.rating.toString().replace('.', ',')}{p.reviews ? ` · ${p.reviews}` : ''}</span>}
                {dist && <span>🏨 {fmtKm(dist.km)} · ~{dist.min} min</span>}
                <span className="sc-cat">{p.category}</span>
                {p.must && <span className="badge" style={{ background: '#fff3d6', color: '#9a6b00' }}>⭐ imprescindible</span>}
                {p.forKids && <span className="badge" style={{ background: '#e6f4ff', color: '#1a5fa0' }}>🧒 niños</span>}
                {p.hours && <span>🕒 {p.hours}</span>}
                {p.price && <span>💶 {p.price}</span>}
              </div>
              <div className="pc-blurb">{p.blurb}</div>
              {p.kids && <div className="pc-kids">👧🧒 {p.kids}</div>}
              {(p.provider || p.booking) && <div className="pc-provider">🎟️ {p.provider ?? `Reservar en ${p.booking}`}</div>}
              <div className="pc-actions">
                <a className="pc-btn ghost" href={gmapsUrl(p.name, p.zone, p.coords)} target="_blank" rel="noreferrer">🗺️ Maps</a>
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
