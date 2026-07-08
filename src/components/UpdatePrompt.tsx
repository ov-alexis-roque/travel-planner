import { useEffect, useRef, useState } from 'react'
import { useRegisterSW } from 'virtual:pwa-register/react'
import { changelog } from '../data/changelog'

// Aviso de actualización de la PWA: detecta nueva versión, muestra novedades y
// permite actualizar. Se puede disparar desde Resumen con eventos de ventana:
//   window.dispatchEvent(new Event('pwa:check'))  → buscar actualización
//   window.dispatchEvent(new Event('pwa:notes'))  → ver novedades
export default function UpdatePrompt() {
  const swRef = useRef<ServiceWorkerRegistration | null>(null)
  const [showNotes, setShowNotes] = useState(false)

  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(_url, r) {
      swRef.current = r ?? null
      if (r) {
        const check = () => r.update().catch(() => {})
        document.addEventListener('visibilitychange', () => document.visibilityState === 'visible' && check())
        setInterval(check, 30 * 60 * 1000)
      }
    },
  })

  // Actualizar con respaldo: en iOS/PWA standalone updateServiceWorker no siempre
  // recarga solo (el evento controllerchange no dispara), así que forzamos recarga.
  const doUpdate = async () => {
    try {
      // Ordena al SW en espera que tome el control
      swRef.current?.waiting?.postMessage({ type: 'SKIP_WAITING' })
      await updateServiceWorker(true)
    } catch { /* ignore */ }
    setTimeout(() => window.location.reload(), 1500)
  }

  // Al detectar versión nueva, abre las novedades y avisa a Resumen (badge)
  useEffect(() => {
    if (needRefresh) {
      setShowNotes(true)
      window.dispatchEvent(new CustomEvent('pwa:state', { detail: { needRefresh: true } }))
    }
  }, [needRefresh])

  // Disparadores desde Resumen
  useEffect(() => {
    const onNotes = () => setShowNotes(true)
    const onCheck = () => {
      swRef.current?.update().catch(() => {})
      window.dispatchEvent(new CustomEvent('pwa:checked', { detail: { needRefresh } }))
    }
    window.addEventListener('pwa:notes', onNotes)
    window.addEventListener('pwa:check', onCheck)
    return () => { window.removeEventListener('pwa:notes', onNotes); window.removeEventListener('pwa:check', onCheck) }
  }, [needRefresh])

  const current = changelog[0]

  return (
    <>
      {needRefresh && (
        <div className="update-bar">
          <span className="ub-txt">✨ Nueva versión disponible</span>
          <div className="ub-actions">
            <button className="ub-notes" onClick={() => setShowNotes(true)}>Novedades</button>
            <button className="ub-go" onClick={doUpdate}>Actualizar</button>
            <button className="ub-x" onClick={() => setNeedRefresh(false)} aria-label="Cerrar">✕</button>
          </div>
        </div>
      )}

      {showNotes && (
        <div className="notes-overlay" onClick={() => setShowNotes(false)}>
          <div className="notes-card" onClick={(e) => e.stopPropagation()}>
            <div className="notes-head">
              <div>
                <div className="notes-title">{needRefresh ? '✨ Novedades de la nueva versión' : '📋 Novedades'}</div>
                <div className="notes-ver">Última: v{current.v} · {current.date}</div>
              </div>
              <button className="notes-x" onClick={() => setShowNotes(false)}>✕</button>
            </div>
            <div className="notes-body">
              {changelog.map((c) => (
                <div className="notes-block" key={c.v}>
                  <div className="notes-vh">v{c.v} · {c.title}</div>
                  <ul>{c.notes.map((n, i) => <li key={i}>{n}</li>)}</ul>
                </div>
              ))}
            </div>
            {needRefresh
              ? <button className="notes-go" onClick={doUpdate}>Actualizar ahora</button>
              : <button className="notes-go ghost" onClick={() => setShowNotes(false)}>Cerrar</button>}
          </div>
        </div>
      )}
    </>
  )
}
