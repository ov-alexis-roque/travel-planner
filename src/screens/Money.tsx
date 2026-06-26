import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CURRENCIES, type Cur, useRates, fetchRates, convert, fmtCur } from '../lib/fx'
import { cashNorms, cardTip } from '../data/money'
import { atmsByDest } from '../data/atms'

// Mapa país -> destinos para listar sus cajeros.
const COUNTRY_DESTS: Record<string, string[]> = {
  sg: ['sin'], my: ['sepilok', 'kinabatangan', 'kl'], id: ['ubud', 'gili', 'sanur'],
}

export default function Money() {
  const [rates, setRates] = useState(useRates())
  const [amount, setAmount] = useState('10')
  const [from, setFrom] = useState<Cur>('EUR')
  const [refreshing, setRefreshing] = useState(false)

  const amt = parseFloat(amount.replace(',', '.')) || 0
  const others = CURRENCIES.filter((c) => c.code !== from)

  async function refresh() {
    setRefreshing(true)
    try { setRates(await fetchRates()) } finally { setRefreshing(false) }
  }

  const updated = rates.ts
    ? `${rates.live ? 'Actualizado' : 'Cacheado'} ${new Date(rates.ts).toLocaleString('es-ES', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}`
    : 'Tasas aproximadas (sin conexión)'

  return (
    <div className="fadein">
      <div className="page-head">
        <Link to="/resumen" className="back-link">‹ Resumen</Link>
        <h1>Cambio de moneda</h1>
        <div className="sub">{updated} · funciona sin conexión</div>
      </div>

      {/* Conversor */}
      <div className="card fx-card">
        <div className="fx-input-row">
          <input className="fx-amount" inputMode="decimal" value={amount} onChange={(e) => setAmount(e.target.value)} />
          <div className="fx-from">
            {CURRENCIES.map((c) => (
              <button key={c.code} className={`fx-cur ${from === c.code ? 'on' : ''}`} onClick={() => setFrom(c.code)}>{c.flag} {c.code}</button>
            ))}
          </div>
        </div>
        <div className="fx-results">
          {others.map((c) => (
            <div key={c.code} className="fx-res">
              <span className="fx-res-cur">{c.flag} {c.code}</span>
              <span className="fx-res-val">{fmtCur(convert(amt, from, c.code, rates.rates), c.code)}</span>
            </div>
          ))}
        </div>
        <button className="fx-refresh" onClick={refresh} disabled={refreshing}>{refreshing ? 'Actualizando…' : '↻ Actualizar tasas'}</button>
      </div>

      {/* Referencia rápida desde EUR */}
      <div className="section-title">De un vistazo (1 €)</div>
      <div className="card fx-quick">
        {CURRENCIES.filter((c) => c.code !== 'EUR').map((c) => (
          <div key={c.code} className="fx-q-row"><span>{c.flag} 1 € =</span><strong>{fmtCur(convert(1, 'EUR', c.code, rates.rates), c.code)} {c.code}</strong></div>
        ))}
      </div>

      {/* Efectivo, tarjeta, propina y cajeros por país */}
      <div className="section-title">💵 Efectivo, tarjeta y cajeros</div>
      <div className="card tip info" style={{ margin: '0 14px 10px' }}>💳 {cardTip}</div>
      {cashNorms.map((c) => (
        <div key={c.id} className="card cash-card">
          <div className="cash-head">{c.flag} {c.country} · <span className="cash-cur">{c.cur}</span></div>
          <div className="cash-kv"><span className="k">💳 Tarjeta</span><span>{c.cards}</span></div>
          <div className="cash-kv"><span className="k">🏧 Cajeros</span><span>{c.atm}</span></div>
          <div className="cash-kv"><span className="k">🪙 Propina</span><span>{c.tipping}</span></div>
          <div className="cash-kv"><span className="k">💵 Efectivo</span><span>{c.cash}</span></div>
          {(COUNTRY_DESTS[c.id] ?? []).flatMap((d) => atmsByDest[d] ?? []).length > 0 && (
            <div className="atm-list">
              <div className="atm-list-head">🏧 Dónde sacar (también en el mapa de cada día)</div>
              {(COUNTRY_DESTS[c.id] ?? []).flatMap((d) => atmsByDest[d] ?? []).map((a, i) => (
                <div key={i} className="atm-item"><span className="ai-name">{a.name}</span>{a.note && <span className="ai-note">{a.note}</span>}</div>
              ))}
            </div>
          )}
        </div>
      ))}
      <div style={{ height: 12 }} />
    </div>
  )
}
