import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { packPeople, appGroups, laundryPlan, luggageStrategy, itemCount, PackItem, PackPerson } from '../data/packing'
import { usePlanner } from '../store'
import Celebrate from '../components/Celebrate'

const key = (personId: string, itemId: string) => `${personId}:${itemId}`

export default function Packing() {
  const packDone = usePlanner((s) => s.packDone)
  const togglePack = usePlanner((s) => s.togglePack)
  const packUnits = usePlanner((s) => s.packUnits)
  const setPackUnits = usePlanner((s) => s.setPackUnits)
  const [active, setActive] = useState('comun')
  const [leoRead, setLeoRead] = useState(false)
  const [celebrate, setCelebrate] = useState<{ emoji: string; title: string; sub: string } | null>(null)

  const person = packPeople.find((p) => p.id === active)!

  // Matriz de progreso por persona, contando unidades (cada círculo cuenta)
  const matrix = useMemo(
    () =>
      packPeople.map((p) => {
        let done = 0
        let total = 0
        p.items.forEach((it) => {
          const c = itemCount(it)
          total += c
          done += Math.min(packUnits[key(p.id, it.id)] || 0, c)
        })
        return { ...p, done, total }
      }),
    [packUnits],
  )

  // Marca/desmarca una unidad (patrón "estrellas": clic rellena hasta ahí; clic en la última la quita)
  const onUnit = (p: PackPerson, it: PackItem, idx: number) => {
    const k = key(p.id, it.id)
    const count = itemCount(it)
    const done = Math.min(packUnits[k] || 0, count)
    const next = done === idx + 1 ? idx : idx + 1
    setPackUnits(k, next)
    if (p.kid && done < count && next === count) {
      // ítem completado del todo por un peque → microcelebración tipo sello
      setCelebrate({ emoji: it.icon, title: '¡Perfecto! ✨', sub: `${it.label.split(' ')[0]} en la maleta` })
    }
  }

  const personDone = person.items.filter((it) => (Math.min(packUnits[key(person.id, it.id)] || 0, itemCount(it))) === itemCount(it)).length

  return (
    <div className="fadein">
      <div className="page-head">
        <Link to="/resumen" className="back-link">‹ Resumen</Link>
        <h1>Maleta</h1>
        <div className="sub">Cada uno marca la suya · un círculo por unidad</div>
      </div>

      {/* Matriz de progreso por persona */}
      <div className="section-title">📊 ¿Quién va listo?</div>
      <div className="pack-matrix">
        {matrix.map((p) => {
          const pct = p.total ? Math.round((p.done / p.total) * 100) : 0
          return (
            <button
              key={p.id}
              className={`pm-cell ${active === p.id ? 'on' : ''} ${p.done === p.total ? 'full' : ''}`}
              onClick={() => setActive(p.id)}
            >
              <span className="pm-emoji">{p.emoji}</span>
              <span className="pm-name">{p.name}</span>
              <span className="pm-ring" style={{ background: `conic-gradient(var(--ok) ${pct * 3.6}deg, var(--line) 0)` }}>
                <span className="pm-ring-in">{p.done === p.total ? '✓' : `${pct}%`}</span>
              </span>
              <span className="pm-count">{p.done}/{p.total}</span>
            </button>
          )
        })}
      </div>

      {/* Imprimir checklist de los niños (backup en papel, offline) */}
      <Link to="/maleta-print" className="pack-print-link">🖨️ Imprimir checklist de Aira y Leo (backup)</Link>

      {/* Lista de la persona activa */}
      <div className="section-title pack-head" style={{ marginTop: 16 }}>
        <span>{person.emoji} Maleta de {person.name}</span>
        <span className="pack-count">{personDone}/{person.items.length} ✓</span>
      </div>
      {person.intro && <div className="pack-intro">{person.intro}</div>}

      {person.reader && (
        <button className={`leo-read-toggle ${leoRead ? 'on' : ''}`} onClick={() => setLeoRead((v) => !v)}>
          <span>🦖 Modo lectura de Leo</span>
          <span className="lrt-state">{leoRead ? 'ACTIVADO' : 'activar'}</span>
        </button>
      )}

      <div className={`card pack-list ${person.kid ? 'kid-list' : ''} ${leoRead && person.reader ? 'leo-reading' : ''}`}>
        {person.items.map((it) => {
          const k = key(person.id, it.id)
          const count = itemCount(it)
          const done = Math.min(packUnits[k] || 0, count)
          const full = done === count
          const showKid = leoRead && person.reader
          return (
            <div key={it.id} className={`pack-row ${full ? 'full' : ''} ${showKid ? 'pi-reading' : ''}`}>
              <span className="pi-icon" aria-hidden>{it.icon}</span>
              <span className="pr-text">
                {showKid ? (
                  <>
                    <span className="pi-kidlabel">{it.kidLabel ?? it.label.toUpperCase()}</span>
                    <span className="pi-label-small">{it.label}{count > 1 && ` · ${count}`}</span>
                  </>
                ) : (
                  <>
                    <span className="pi-label">{it.label}{it.qty && <span className="pi-qty">{it.qty}</span>}</span>
                    {it.note && <span className="pi-note">{it.note}</span>}
                  </>
                )}
              </span>
              <span className={`pi-units ${count > 6 ? 'wrap' : ''}`}>
                {Array.from({ length: count }).map((_, j) => (
                  <button
                    key={j}
                    className={`unit-dot ${j < done ? 'on' : ''}`}
                    onClick={() => onUnit(person, it, j)}
                    aria-label={`${it.label} ${j + 1}/${count}`}
                  >
                    {j < done ? '✓' : ''}
                  </button>
                ))}
              </span>
            </div>
          )
        })}
      </div>

      {/* Estrategia + lavandería + apps: solo en la pestaña Común */}
      {active === 'comun' && (
        <>
          <div className="section-title">🧳 Estrategia: solo equipaje de mano</div>
          <div className="card pack-strat">
            <div className="ps-row"><span className="ps-k">Bultos</span><span>{luggageStrategy.bags}</span></div>
            <div className="ps-row"><span className="ps-k">Por qué</span><span>{luggageStrategy.why}</span></div>
            <div className="ps-row"><span className="ps-k">Check-in</span><span>{luggageStrategy.checkin}</span></div>
            <div className="ps-row"><span className="ps-k">Límites</span><span>{luggageStrategy.limits}</span></div>
            <div className="pack-tip">💡 {luggageStrategy.tip}</div>
          </div>

          <div className="section-title">🧺 Plan de lavandería</div>
          <div className="card">
            {laundryPlan.map((l, i) => (
              <div className="qtip" key={i}><span className="qi">🧺</span><span><strong>{l.when}</strong><div style={{ color: 'var(--muted)', fontSize: '.92em', marginTop: 2 }}>{l.what}</div></span></div>
            ))}
          </div>

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
        </>
      )}
      <div style={{ height: 12 }} />

      {celebrate && <Celebrate emoji={celebrate.emoji} title={celebrate.title} sub={celebrate.sub} onDone={() => setCelebrate(null)} />}
    </div>
  )
}
