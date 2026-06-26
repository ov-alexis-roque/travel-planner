import { Link } from 'react-router-dom'
import { packGroups, appGroups, laundryPlan, luggageStrategy } from '../data/packing'
import { usePlanner } from '../store'

export default function Packing() {
  const packDone = usePlanner((s) => s.packDone)
  const togglePack = usePlanner((s) => s.togglePack)

  const allItems = packGroups.flatMap((g) => g.items)
  const done = allItems.filter((it) => packDone[it.id]).length
  const total = allItems.length

  return (
    <div className="fadein">
      <div className="page-head">
        <Link to="/resumen" className="back-link">‹ Resumen</Link>
        <h1>Maleta</h1>
        <div className="sub">{done}/{total} cosas listas · adaptada a todo el recorrido</div>
      </div>

      {/* Progreso */}
      <div className="card tight">
        <div className="prog"><i style={{ width: `${total ? (done / total) * 100 : 0}%`, background: 'var(--ok)' }} /></div>
      </div>

      {/* Estrategia de equipaje */}
      <div className="section-title">🧳 Estrategia: solo equipaje de mano</div>
      <div className="card pack-strat">
        <div className="ps-row"><span className="ps-k">Bultos</span><span>{luggageStrategy.bags}</span></div>
        <div className="ps-row"><span className="ps-k">Por qué</span><span>{luggageStrategy.why}</span></div>
        <div className="ps-row"><span className="ps-k">Check-in</span><span>{luggageStrategy.checkin}</span></div>
        <div className="ps-row"><span className="ps-k">Límites</span><span>{luggageStrategy.limits}</span></div>
        <div className="pack-tip">💡 {luggageStrategy.tip}</div>
      </div>

      {/* Plan de lavandería */}
      <div className="section-title">🧺 Plan de lavandería</div>
      <div className="card">
        {laundryPlan.map((l, i) => (
          <div className="qtip" key={i}><span className="qi">🧺</span><span><strong>{l.when}</strong><div style={{ color: 'var(--muted)', fontSize: '.92em', marginTop: 2 }}>{l.what}</div></span></div>
        ))}
      </div>

      {/* Categorías */}
      {packGroups.map((g) => {
        const gDone = g.items.filter((it) => packDone[it.id]).length
        return (
          <div key={g.id}>
            <div className="section-title pack-head">
              <span>{g.icon} {g.title}</span>
              <span className="pack-count">{gDone}/{g.items.length}</span>
            </div>
            {g.intro && <div className="pack-intro">{g.intro}</div>}
            <div className="card">
              {g.items.map((it) => {
                const on = !!packDone[it.id]
                return (
                  <button key={it.id} className={`check pack-item ${on ? 'on' : ''}`} onClick={() => togglePack(it.id)}>
                    <span className="box">{on ? '✓' : ''}</span>
                    <span className="ct">
                      <span className="pi-label">{it.label}{it.kids && <span className="pi-kids">niños</span>}{it.qty && <span className="pi-qty">{it.qty}</span>}</span>
                      {it.note && <span className="pi-note">{it.note}</span>}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}

      {/* Apps imprescindibles */}
      <div className="section-title" style={{ marginTop: 18 }}>📲 Apps para descargar (con WiFi, antes de salir)</div>
      <div className="pack-intro">Instálalas y configúralas en casa: en destino tendrás datos justos. Grab/Gojek para moverte, AirAsia para el check-in, Google Maps y Translate offline.</div>
      {appGroups.map((g) => (
        <div key={g.title}>
          <div className="section-title pack-head" style={{ fontSize: '.82em' }}><span>{g.icon} {g.title}</span></div>
          <div className="card">
            {g.items.map((it) => {
              const on = !!packDone[it.id]
              return (
                <button key={it.id} className={`check pack-item ${on ? 'on' : ''}`} onClick={() => togglePack(it.id)}>
                  <span className="box">{on ? '✓' : ''}</span>
                  <span className="ct">
                    <span className="pi-label">{it.label}</span>
                    {it.note && <span className="pi-note">{it.note}</span>}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      ))}
      <div style={{ height: 12 }} />
    </div>
  )
}
