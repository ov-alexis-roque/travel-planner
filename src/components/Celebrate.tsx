import { useEffect } from 'react'

const CONFETTI = ['🎉', '✨', '🎊', '⭐', '🌟', '🥳', '🎈']

// Overlay de microcelebración con confeti. Se auto-cierra solo.
export default function Celebrate({ emoji, title, sub, onDone }: { emoji: string; title: string; sub?: string; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1800)
    return () => clearTimeout(t)
  }, [onDone])
  return (
    <div className="pp-celebrate" onClick={onDone}>
      <div className="ppc-card">
        <div className="ppc-emoji">{emoji}</div>
        <div className="ppc-title">{title}</div>
        {sub && <div className="ppc-label">{sub}</div>}
      </div>
      <div className="ppc-confetti">
        {Array.from({ length: 16 }).map((_, i) => (
          <span key={i} style={{ left: `${(i * 6 + 3) % 100}%`, animationDelay: `${(i % 5) * 0.06}s` }}>{CONFETTI[i % CONFETTI.length]}</span>
        ))}
      </div>
    </div>
  )
}
