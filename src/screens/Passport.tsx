import { useState } from 'react'
import { Link } from 'react-router-dom'
import { passportCategories, passportRanks, type Stamp } from '../data/passport'
import { usePlanner } from '../store'

const CONFETTI = ['🎉', '✨', '🎊', '⭐', '🌟', '🥳']

export default function Passport() {
  const passportDone = usePlanner((s) => s.passportDone)
  const togglePassport = usePlanner((s) => s.togglePassport)
  const [celebrate, setCelebrate] = useState<Stamp | null>(null)

  const allStamps = passportCategories.flatMap((c) => c.stamps)
  const total = allStamps.length
  const got = allStamps.filter((s) => passportDone[s.id]).length
  const pct = Math.round((got / total) * 100)
  const rank = [...passportRanks].reverse().find((r) => got >= r.min) ?? passportRanks[0]

  function onToggle(stamp: Stamp) {
    const wasOn = !!passportDone[stamp.id]
    togglePassport(stamp.id)
    if (!wasOn) {
      setCelebrate(stamp)
      setTimeout(() => setCelebrate(null), 1400)
    }
  }

  return (
    <div className="fadein">
      <div className="page-head">
        <Link to="/resumen" className="back-link">‹ Resumen</Link>
        <h1>Pasaporte de Exploradores</h1>
        <div className="sub">Aira & Leo · sellad cada cosa que viváis 🛂</div>
      </div>

      {/* Progreso + rango */}
      <div className="card pp-progress">
        <div className="pp-rank"><span className="pp-rank-emoji">{rank.emoji}</span><div><div className="pp-rank-label">{rank.label}</div><div className="pp-rank-count">{got} de {total} sellos · {pct}%</div></div></div>
        <div className="prog" style={{ marginTop: 10 }}><i style={{ width: `${pct}%`, background: 'var(--ok)' }} /></div>
      </div>

      {passportCategories.map((cat) => {
        const cGot = cat.stamps.filter((s) => passportDone[s.id]).length
        return (
          <div key={cat.id}>
            <div className="section-title pack-head"><span>{cat.icon} {cat.title}</span><span className="pack-count">{cGot}/{cat.stamps.length}</span></div>
            <div className="pp-grid">
              {cat.stamps.map((s) => {
                const on = !!passportDone[s.id]
                return (
                  <button key={s.id} className={`pp-stamp ${on ? 'on' : ''}`} onClick={() => onToggle(s)}>
                    <span className="pp-emoji">{s.emoji}</span>
                    <span className="pp-label">{s.label}</span>
                    {s.where && <span className="pp-where">{s.where}</span>}
                    {on && <span className="pp-check">✓</span>}
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}
      <div style={{ height: 12 }} />

      {/* Celebración al conseguir un sello */}
      {celebrate && (
        <div className="pp-celebrate" onClick={() => setCelebrate(null)}>
          <div className="ppc-card">
            <div className="ppc-emoji">{celebrate.emoji}</div>
            <div className="ppc-title">¡Sello conseguido!</div>
            <div className="ppc-label">{celebrate.label}</div>
          </div>
          <div className="ppc-confetti">
            {Array.from({ length: 14 }).map((_, i) => (
              <span key={i} style={{ left: `${(i * 7 + 3) % 100}%`, animationDelay: `${(i % 5) * 0.06}s` }}>{CONFETTI[i % CONFETTI.length]}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
