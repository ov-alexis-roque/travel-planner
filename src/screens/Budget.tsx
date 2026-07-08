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

// Estimación €/sitio a partir del texto de precio (primer número; "gratis" = 0).
function placeEst(price?: string): number {
  if (!price) return 0
  if (/gratis|free/i.test(price)) return 0
  const m = /(\d+(?:[.,]\d+)?)/.exec(price)
  return m ? Math.round(parseFloat(m[1].replace(',', '.'))) : 0
}

export default function Budget() {
  const items = trip.budget
  const total = items.reduce((s, b) => s + b.amount, 0)
  const paid = items.filter((b) => b.status === 'paid').reduce((s, b) => s + b.amount, 0)
  const pending = total - paid

  const categories = [...new Set(items.map((b) => b.category))]

  // Resumen por categoría (para el gráfico)
  const catTotals = categories.map((cat) => ({ cat, sum: items.filter((b) => b.category === cat).reduce((s, b) => s + b.amount, 0) }))
    .sort((a, b) => b.sum - a.sum)
  const catMax = Math.max(...catTotals.map((c) => c.sum), 1)
  // Rampa secuencial de un solo tono (teal de marca): la intensidad refuerza la
  // magnitud del gasto (las categorías ya vienen ordenadas), sin "arcoíris".
  // Derivada de tokens → adapta a claro/oscuro automáticamente.
  const CAT_COLOR: Record<string, string> = {}
  catTotals.forEach((c, i) => {
    const pct = Math.max(32, 92 - i * 11)
    CAT_COLOR[c.cat] = `color-mix(in srgb, var(--sa) ${pct}%, var(--muted))`
  })

  // Actividades añadidas al plan desde Explorar → estimación de coste extra
  const addedByDay = usePlanner((s) => s.addedByDay)
  const addedIds = Object.values(addedByDay).flat()
  const addedPlaces = trip.catalog.filter((p) => addedIds.includes(p.id))
  const addedEst = addedPlaces.reduce((s, p) => s + placeEst(p.price), 0)

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

      {/* Gráfico de gasto por categoría */}
      <div className="section-title">📊 Gasto estimado por categoría</div>
      <div className="card cat-chart">
        {catTotals.map((c) => (
          <div key={c.cat} className="cc-row">
            <div className="cc-top"><span className="cc-cat">{c.cat}</span><span className="cc-amt">{eur(c.sum)}</span></div>
            <div className="cc-bar"><i style={{ width: `${(c.sum / catMax) * 100}%`, background: CAT_COLOR[c.cat] }} /></div>
          </div>
        ))}
      </div>

      {/* Actividades añadidas desde Explorar (estimado) */}
      {addedPlaces.length > 0 && (
        <div className="card added-est">
          <div className="ae-top"><span><strong>➕ Actividades añadidas al plan</strong><div style={{ fontSize: '.8em', color: 'var(--muted)' }}>{addedPlaces.length} sitios desde Explorar · estimado orientativo</div></span><span className="ae-amt">{eur(addedEst)}</span></div>
          <div style={{ fontSize: '.78em', color: 'var(--muted)', marginTop: 8 }}>Total estimado con extras: <strong style={{ color: 'var(--ink)' }}>{eur(total + addedEst)}</strong></div>
        </div>
      )}

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
