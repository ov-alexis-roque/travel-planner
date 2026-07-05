import { Link } from 'react-router-dom'
import { packPeople, itemCount } from '../data/packing'

// Versión imprimible (backup en papel) de las checklists de Aira y Leo.
// Casillas vacías para marcar a mano. Leo lleva su etiqueta en MAYÚSCULAS
// grande (kidLabel) para practicar la lectura mientras prepara la maleta.
export default function PackingPrint() {
  const kids = packPeople.filter((p) => p.kid)

  return (
    <div className="fadein print-wrap">
      <div className="page-head no-print">
        <Link to="/maleta" className="back-link">‹ Maleta</Link>
        <h1>Checklist imprimible</h1>
        <div className="sub">Backup en papel para Aira y Leo</div>
      </div>

      <div className="card no-print print-actions">
        <p style={{ margin: '0 0 10px', color: 'var(--muted)', fontSize: '.92em' }}>
          Imprime esta hoja como respaldo: cada peque tacha lo que va metiendo, sin depender del móvil. La de Leo va en mayúsculas para que la lea él.
        </p>
        <button className="print-btn" onClick={() => window.print()}>🖨️ Imprimir / Guardar PDF</button>
      </div>

      <div className="print-sheets">
        {kids.map((p) => (
          <section className="print-sheet" key={p.id}>
            <header className="psh-head">
              <span className="psh-emoji">{p.emoji}</span>
              <div>
                <h2 className="psh-title">La maleta de {p.name}</h2>
                <p className="psh-sub">Viaje Asia 2026 · Familia Roque · 12 jul – 5 ago</p>
              </div>
            </header>
            <ul className="psh-list">
              {p.items.map((it) => {
                const count = itemCount(it)
                return (
                  <li key={it.id} className={p.reader ? 'psh-reader' : ''}>
                    <span className="psh-ico">{it.icon}</span>
                    <span className="psh-txt">
                      {p.reader ? (
                        <>
                          <span className="psh-big">{it.kidLabel ?? it.label.toUpperCase()}</span>
                          <span className="psh-small">{it.label}{count > 1 && ` · ${count}`}</span>
                        </>
                      ) : (
                        <span className="psh-normal">{it.label}{it.qty && <em> · {it.qty}</em>}</span>
                      )}
                    </span>
                    {/* Un círculo por unidad para tachar a mano */}
                    <span className="psh-dots">
                      {Array.from({ length: count }).map((_, j) => (
                        <span className="psh-dot" key={j} aria-hidden />
                      ))}
                    </span>
                  </li>
                )
              })}
            </ul>
            <footer className="psh-foot">¡Marca cada cosa que metas en tu maleta! 🎒✨</footer>
          </section>
        ))}
      </div>
      <div className="no-print" style={{ height: 12 }} />
    </div>
  )
}
