import { useState } from 'react'
import { Link } from 'react-router-dom'
import { trip } from '../data/trip'
import { gastronomy } from '../data/food'
import { useUI } from '../store'
import { gmapsUrl } from '../lib/places-helpers'

export default function Gastronomy() {
  const exploreDest = useUI((s) => s.exploreDest)
  const dests = trip.destinations.filter((d) => d.id !== 'travel')
  const [dest, setDest] = useState(gastronomy[exploreDest] ? exploreDest : 'sin')
  const g = gastronomy[dest]
  const destName = (dests.find((d) => d.id === dest)?.name ?? '').replace(/^[^—]*—\s*/, '')

  return (
    <div className="fadein">
      <div className="page-head">
        <Link to="/resumen" className="back-link">‹ Resumen</Link>
        <h1>Sabores del viaje</h1>
        <div className="sub">Lo que no te puedes ir sin probar · curado, local y a mano</div>
      </div>

      {/* Selector de destino */}
      <div className="pack-matrix" style={{ paddingTop: 4 }}>
        {dests.map((d) => (
          <button key={d.id} className={`gc-dest ${dest === d.id ? 'on' : ''} ${gastronomy[d.id] ? '' : 'soon'}`} onClick={() => setDest(d.id)}>
            <span className="pm-emoji">{d.emoji}</span>
            <span className="pm-name">{d.name.replace(/^[^—]*—\s*/, '').split(' ')[0]}</span>
          </button>
        ))}
      </div>

      {!g ? (
        <div className="pack-intro" style={{ marginTop: 14 }}>
          🍜 La curación foodie de <b>{destName}</b> llega en la próxima oleada. Singapur ya está completa — ábrela para ver el formato.
        </div>
      ) : (
        <>
          <div className="card" style={{ marginTop: 10 }}>
            <p style={{ margin: 0, fontSize: '.92em', lineHeight: 1.55 }}>{g.blurb}</p>
          </div>

          {/* Platos imprescindibles */}
          <div className="section-title">🍽️ Platos que no te puedes perder</div>
          {g.dishes.map((di) => (
            <div className="card dish-card" key={di.name}>
              <div className="dish-head"><span className="dish-emoji">{di.emoji}</span><span className="dish-name">{di.name}</span></div>
              <div className="dish-what">{di.what}</div>
              {di.tip && <div className="dish-tip">💡 {di.tip}</div>}
            </div>
          ))}

          {/* Restaurantes cerca de las visitas */}
          <div className="section-title">📍 Cerca de tus visitas</div>
          <div className="pack-intro">Para comer bien sin desviarte: caen de paso con el plan del día.</div>
          {g.spots.filter((s) => s.near).map((s) => <SpotCard key={s.name} s={s} destName={destName} />)}

          {/* Merecen el viaje */}
          {g.spots.some((s) => s.worthTrip) && (
            <>
              <div className="section-title">⭐ Merecen la excursión</div>
              <div className="pack-intro">De esos por los que un foodie se desplaza aunque no pillen de camino.</div>
              {g.spots.filter((s) => s.worthTrip).map((s) => <SpotCard key={s.name} s={s} destName={destName} />)}
            </>
          )}
        </>
      )}
      <div style={{ height: 14 }} />
    </div>
  )
}

function SpotCard({ s, destName }: { s: import('../data/food').FoodSpot; destName: string }) {
  return (
    <a className="card spot-card" href={gmapsUrl(s.name, destName)} target="_blank" rel="noreferrer">
      <div className="spot-top">
        <span className="spot-name">{s.name}</span>
        <span className="spot-price">{s.price}</span>
      </div>
      <div className="spot-dish">🍽️ {s.dish}</div>
      <div className="spot-why">{s.why}</div>
      <div className="spot-meta">
        <span className="spot-area">📍 {s.area}</span>
        {s.badge && <span className="spot-badge">{s.badge}</span>}
        {s.near && <span className="spot-near">a mano: {s.near}</span>}
      </div>
      <span className="spot-go">🗺️ abrir en Maps</span>
    </a>
  )
}
