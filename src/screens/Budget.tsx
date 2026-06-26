import { useState } from 'react'
import { Link } from 'react-router-dom'
import { trip } from '../data/trip'
import { eur } from '../lib/utils'
import { usePlanner } from '../store'
import { CURRENCIES, type Cur, useRates, convert } from '../lib/fx'

const EXP_CATS = ['Comida', 'Transporte', 'Actividades', 'Compras', 'Otros']

function SpendTracker() {
  const expenses = usePlanner((s) => s.expenses)
  const addExpense = usePlanner((s) => s.addExpense)
  const removeExpense = usePlanner((s) => s.removeExpense)
  const rates = useRates()
  const [amount, setAmount] = useState('')
  const [cur, setCur] = useState<Cur>('EUR')
  const [cat, setCat] = useState('Comida')

  const spent = expenses.reduce((s, e) => s + e.eur, 0)
  const planned = trip.budget.reduce((s, b) => s + b.amount, 0)

  function add() {
    const amt = parseFloat(amount.replace(',', '.'))
    if (!amt || amt <= 0) return
    const eurVal = convert(amt, cur, 'EUR', rates.rates)
    addExpense({ label: cat, cat, amount: amt, cur, eur: Math.round(eurVal * 100) / 100, ts: Date.now() })
    setAmount('')
  }

  return (
    <div className="card spend">
      <div className="spend-top">
        <div><div className="n">{eur(Math.round(spent))}</div><div className="l">gastado real</div></div>
        <div className="spend-of">de {eur(planned)} planificado</div>
      </div>
      <div className="prog" style={{ marginTop: 8 }}><i style={{ width: `${Math.min(100, (spent / planned) * 100)}%`, background: spent > planned ? 'var(--urg)' : 'var(--ok)' }} /></div>

      <div className="spend-form">
        <div className="sf-row">
          <input className="sf-amount" inputMode="decimal" placeholder="0" value={amount} onChange={(e) => setAmount(e.target.value)} />
          <select className="sf-cur" value={cur} onChange={(e) => setCur(e.target.value as Cur)}>
            {CURRENCIES.map((c) => <option key={c.code} value={c.code}>{c.code}</option>)}
          </select>
          <button className="sf-add" onClick={add}>＋ Añadir</button>
        </div>
        <div className="sf-cats">
          {EXP_CATS.map((c) => <button key={c} className={`sf-cat ${cat === c ? 'on' : ''}`} onClick={() => setCat(c)}>{c}</button>)}
        </div>
      </div>

      {expenses.length > 0 && (
        <div className="spend-list">
          {expenses.slice(0, 12).map((e) => (
            <div key={e.id} className="spend-row">
              <span className="sr-cat">{e.cat}</span>
              <span className="sr-raw">{e.amount.toLocaleString('es-ES')} {e.cur}</span>
              <span className="sr-eur">{eur(Math.round(e.eur))}</span>
              <button className="sr-del" onClick={() => removeExpense(e.id)}>✕</button>
            </div>
          ))}
          {expenses.length > 12 && <div className="spend-more">…y {expenses.length - 12} más</div>}
        </div>
      )}
    </div>
  )
}

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

      <div className="section-title">💸 Gasto real del viaje</div>
      <SpendTracker />

      <div className="section-title">Plan estimado por categoría</div>
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
