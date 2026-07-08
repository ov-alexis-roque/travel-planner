import { useState } from 'react'
import { Link } from 'react-router-dom'
import { passportCategories, passportRanks, categoryLevels, catLevel, type Stamp, type CatLevel } from '../data/passport'
import { usePlanner, useUI } from '../store'
import TripMap, { type MapPoint } from '../components/TripMap'

const CONFETTI = ['🎉', '✨', '🎊', '⭐', '🌟', '🥳']
const KIDS = [{ id: 'aira', name: 'Aira', emoji: '👧' }, { id: 'leo', name: 'Leo', emoji: '👦' }]

export default function Passport() {
  const passportDone = usePlanner((s) => s.passportDone)
  const togglePassport = usePlanner((s) => s.togglePassport)
  const passportGeo = usePlanner((s) => s.passportGeo)
  const setPassportGeo = usePlanner((s) => s.setPassportGeo)
  const kid = useUI((s) => s.passportKid)
  const setKid = useUI((s) => s.setPassportKid)
  const [celebrate, setCelebrate] = useState<Stamp | null>(null)
  const [levelUp, setLevelUp] = useState<{ cat: string; level: CatLevel } | null>(null)
  const [ficha, setFicha] = useState<Stamp | null>(null)
  const key = (stampId: string) => `${kid}:${stampId}`

  // Sellos conseguidos por categoría (para niveles y vista de logros)
  const catGot = (catId: string) => {
    const cat = passportCategories.find((c) => c.id === catId)
    return cat ? cat.stamps.filter((s) => passportDone[key(s.id)]).length : 0
  }

  const allStamps = passportCategories.flatMap((c) => c.stamps)
  const total = allStamps.length
  const got = allStamps.filter((s) => passportDone[key(s.id)]).length
  const pct = Math.round((got / total) * 100)
  const rank = [...passportRanks].reverse().find((r) => got >= r.min) ?? passportRanks[0]
  const kidName = KIDS.find((k) => k.id === kid)?.name ?? ''

  // Sellos con ubicación guardada → puntos para el mapa
  const stampPoints: MapPoint[] = allStamps
    .filter((s) => passportGeo[key(s.id)])
    .map((s) => { const g = passportGeo[key(s.id)]; return { lat: g.lat, lon: g.lng, emoji: s.emoji, label: s.label } })

  function onToggle(stamp: Stamp) {
    const k = key(stamp.id)
    const wasOn = !!passportDone[k]
    togglePassport(k)
    if (!wasOn) {
      setCelebrate(stamp)
      setTimeout(() => setCelebrate(null), 5000)
      // ¿Este sello hace subir de nivel su categoría?
      const cat = passportCategories.find((c) => c.stamps.some((s) => s.id === stamp.id))
      if (cat) {
        const before = catLevel(cat.id, catGot(cat.id))
        const after = catLevel(cat.id, catGot(cat.id) + 1)
        if (after && (!before || after.idx > before.idx)) {
          setLevelUp({ cat: cat.title, level: after.level })
          setTimeout(() => setLevelUp(null), 6000)
        }
      }
      // Guardamos dónde se consiguió el sello (si el peque da permiso de ubicación)
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => setPassportGeo(k, { lat: pos.coords.latitude, lng: pos.coords.longitude, ts: Date.now() }),
          () => {},
          { enableHighAccuracy: false, timeout: 8000, maximumAge: 60000 },
        )
      }
    }
  }

  return (
    <div className="fadein">
      <div className="page-head">
        <Link to="/resumen" className="back-link">‹ Resumen</Link>
        <h1>Pasaporte de Exploradores</h1>
        <div className="sub">Sellad cada cosa que viváis 🛂</div>
      </div>

      {/* Selector de niño */}
      <div className="pp-kids">
        {KIDS.map((k) => (
          <button key={k.id} className={`pp-kid ${kid === k.id ? 'on' : ''}`} onClick={() => setKid(k.id)}>{k.emoji} {k.name}</button>
        ))}
      </div>

      {/* Progreso + rango */}
      <div className="card pp-progress">
        <div className="pp-rank"><span className="pp-rank-emoji">{rank.emoji}</span><div><div className="pp-rank-label">{rank.label}</div><div className="pp-rank-count">{kidName}: {got} de {total} sellos · {pct}%</div></div></div>
        <div className="prog" style={{ marginTop: 10 }}><i style={{ width: `${pct}%`, background: 'var(--ok)' }} /></div>
      </div>

      {/* Mis logros: medalla y título por categoría */}
      <div className="section-title">🏅 Mis logros de {kidName}</div>
      <div className="card tight pp-ach">
        {passportCategories.map((cat) => {
          const g = catGot(cat.id)
          const n = cat.stamps.length
          const lvl = catLevel(cat.id, g)
          const next = (categoryLevels[cat.id] ?? []).find((t) => g < t.min)
          return (
            <div key={cat.id} className={`pp-ach-row ${lvl ? 'has' : ''}`}>
              <span className="pp-ach-medal">{lvl ? lvl.level.medal : '🔒'}</span>
              <div className="pp-ach-body">
                <div className="pp-ach-title">{lvl ? `${lvl.level.emoji} ${lvl.level.label}` : `${cat.icon} ${cat.title}`}</div>
                <div className="pp-ach-sub">{g}/{n} sellos{next ? ` · siguiente medalla a ${next.min}` : ' · ¡bloque completo! 🎉'}</div>
                <div className="pp-ach-bar"><i style={{ width: `${(g / n) * 100}%` }} /></div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Mapa de sellos: dónde consiguió cada sello */}
      <div className="section-title">🗺️ Mapa de sellos de {kidName}</div>
      {stampPoints.length > 0 ? (
        <div className="card tight" style={{ padding: 0, overflow: 'hidden' }}>
          <TripMap key={`pp-${kid}-${stampPoints.length}`} points={stampPoints} showRoute={false} height="240px" rounded={false} expandable fitPadding={40} />
        </div>
      ) : (
        <div className="pack-intro">Aún no hay sellos con ubicación. Cuando {kidName} consiga un sello y deis permiso de ubicación, aparecerá aquí en el mapa. 📍</div>
      )}

      {passportCategories.map((cat) => {
        const cGot = cat.stamps.filter((s) => passportDone[key(s.id)]).length
        return (
          <div key={cat.id}>
            <div className="section-title pack-head"><span>{cat.icon} {cat.title}</span><span className="pack-count">{cGot}/{cat.stamps.length}</span></div>
            <div className="pp-grid">
              {cat.stamps.map((s) => {
                const on = !!passportDone[key(s.id)]
                return (
                  <button key={s.id} className={`pp-stamp ${on ? 'on' : ''}`} onClick={() => setFicha(s)} title="Ver ficha">
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

      {/* Ficha: ¿qué es / cómo es? + foto */}
      {ficha && (
        <div className="pp-ficha-back" onClick={() => setFicha(null)}>
          <div className="pp-ficha" onClick={(e) => e.stopPropagation()}>
            <button className="pp-ficha-x" onClick={() => setFicha(null)} aria-label="Cerrar">✕</button>
            <div className="pp-ficha-hero">
              {ficha.img
                ? <img src={ficha.img} alt={ficha.label} className="pp-ficha-img" />
                : <span className="pp-ficha-emoji">{ficha.emoji}</span>}
            </div>
            <div className="pp-ficha-title">{ficha.label}</div>
            {ficha.where && <div className="pp-ficha-where">📍 {ficha.where}</div>}
            {ficha.desc && <p className="pp-ficha-desc">{ficha.desc}</p>}
            {ficha.fact && <p className="pp-ficha-fact">🤓 ¿Sabías que…? {ficha.fact}</p>}
            <div className="pp-ficha-actions">
              {passportDone[key(ficha.id)] ? (
                <button className="pp-ficha-seal is-done" onClick={() => { togglePassport(key(ficha.id)); setFicha(null) }}>✓ Sellado · tocar para quitar</button>
              ) : (
                <button className="pp-ficha-seal" onClick={() => { onToggle(ficha); setFicha(null) }}>🎉 ¡Sellar!</button>
              )}
              {!ficha.img && (
                <a className="pp-ficha-photo" href={`https://www.google.com/search?tbm=isch&q=${encodeURIComponent(ficha.search ?? ficha.label)}`} target="_blank" rel="noreferrer">
                  🔍 Ver una foto de verdad
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Celebración al conseguir un sello */}
      {celebrate && (
        <div className="pp-celebrate" onClick={() => setCelebrate(null)}>
          <div className="ppc-card">
            <div className="ppc-emoji">{celebrate.emoji}</div>
            <div className="ppc-title">¡Sello conseguido!</div>
            <div className="ppc-label">{celebrate.label}</div>
            {(celebrate.fact2 ?? celebrate.fact) && <div className="ppc-fact">🤓 ¿Y sabías que…? {celebrate.fact2 ?? celebrate.fact}</div>}
            {levelUp && (
              <div className="ppc-levelup">{levelUp.level.medal} ¡Subes de nivel!<br /><strong>{levelUp.level.emoji} {levelUp.level.label}</strong><span> · {levelUp.cat}</span></div>
            )}
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
