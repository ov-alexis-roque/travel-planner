import { Link } from 'react-router-dom'
import { trip } from '../data/trip'
import { eur } from '../lib/utils'

export default function Budget() {
  const items = trip.budget
  const total = items.reduce((s, b) => s + b.amount, 0)
  const paid = items.filter((b) => b.status === 'paid').reduce((s, b) => s + b.amount, 0)
  const pending = total - paid

  const categories = [...new Set(items.map((b) => b.category))]

  return (
    <>
      <div className="page-head">
        <h1>Presupuesto</h1>
        <div className="sub">4 personas · 23 días · estimado en EUR</div>
      </div>

      <Link to="/cambio" className="card tight" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span><strong>💱 Cambio de moneda</strong><div style={{ fontSize: '.82em', color: 'var(--muted)' }}>conversor €/SGD/MYR/IDR · efectivo y propina · sin conexión</div></span>
        <span style={{ fontSize: '1.3em', color: 'var(--muted)' }}>›</span>
      </Link>

      <div className="card">
        <div className="bgt-total">
          <div className="n">{eur(total)}</div>
          <div className="l">Presupuesto total estimado</div>
        </div>
        <div className="bgt-split">
          <div className="paid" style={{ width: `${(paid / total) * 100}%` }} />
          <div className="pend" style={{ width: `${(pending / total) * 100}%` }} />
        </div>
        <div className="bgt-legend">
          <span><i style={{ background: 'var(--ok)' }} />Pagado {eur(paid)}</span>
          <span><i style={{ background: 'var(--warn)' }} />Pendiente {eur(pending)}</span>
        </div>
      </div>

      {categories.map((cat) => {
        const rows = items.filter((b) => b.category === cat)
        const sub = rows.reduce((s, b) => s + b.amount, 0)
        return (
          <div key={cat}>
            <div className="urg-head" style={{ justifyContent: 'space-between' }}>
              <span>{cat}</span>
              <span style={{ color: 'var(--ink)' }}>{eur(sub)}</span>
            </div>
            <div className="card" style={{ paddingTop: 4, paddingBottom: 4 }}>
              {rows.map((b) => (
                <div key={b.id} className="bgt-row">
                  <span className="c">{b.concept}{b.note ? <span style={{ color: 'var(--muted)' }}> · {b.note}</span> : null}</span>
                  <span className={`badge ${b.status === 'paid' ? 'paid' : b.status === 'pending' ? 'pending' : 'free'}`}>
                    {b.status === 'paid' ? '✓' : b.status === 'pending' ? '⏳' : '~'}
                  </span>
                  <span className="a">{eur(b.amount)}</span>
                </div>
              ))}
            </div>
          </div>
        )
      })}
      <div style={{ height: 12 }} />
    </>
  )
}
