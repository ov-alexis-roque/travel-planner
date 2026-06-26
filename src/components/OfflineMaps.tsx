import { useState } from 'react'
import { trip } from '../data/trip'
import { usePlanner } from '../store'
import { countRegionTiles, downloadRegion } from '../lib/offlineMaps'
import { fetchRates } from '../lib/fx'

// Panel "Listo para usar sin conexión": confirma qué ya funciona offline (todo
// el contenido va dentro de la app) y permite precargar de una vez lo único que
// necesita red: los mapas de cada zona y las tasas de cambio.
export default function OfflineMaps() {
  const dests = trip.destinations.filter((d) => d.id !== 'travel' && d.coords)
  const mapPacks = usePlanner((s) => s.mapPacks)
  const setMapPack = usePlanner((s) => s.setMapPack)
  const [progress, setProgress] = useState<Record<string, number>>({})
  const [busy, setBusy] = useState<string | null>(null)
  const [allBusy, setAllBusy] = useState(false)
  const [ratesReady, setRatesReady] = useState(() => !!localStorage.getItem('fx-cache-v1'))
  const online = navigator.onLine

  const zonesDone = dests.filter((d) => mapPacks[d.id]).length

  async function dl(destId: string) {
    setBusy(destId)
    setProgress((p) => ({ ...p, [destId]: 0 }))
    try {
      const total = await downloadRegion(destId, (done, t) => setProgress((p) => ({ ...p, [destId]: t ? done / t : 0 })))
      setMapPack(destId, total, Date.now())
    } finally { setBusy(null) }
  }

  async function prepareAll() {
    if (allBusy) return
    setAllBusy(true)
    try {
      for (const d of dests) {
        setBusy(d.id)
        setProgress((p) => ({ ...p, [d.id]: 0 }))
        const total = await downloadRegion(d.id, (done, t) => setProgress((p) => ({ ...p, [d.id]: t ? done / t : 0 })))
        setMapPack(d.id, total, Date.now())
      }
      setBusy(null)
      await fetchRates()
      setRatesReady(true)
    } finally { setAllBusy(false); setBusy(null) }
  }

  const ready = [
    { k: 'Plan, itinerario y Explorar', v: true, note: 'Incluidos en la app' },
    { k: 'Documentos y emergencias', v: true, note: 'Guardados en tu dispositivo' },
    { k: 'Presupuesto y maleta', v: true, note: 'Incluidos en la app' },
    { k: 'Clima', v: true, note: online ? 'En vivo + datos típicos de julio offline' : 'Datos típicos de julio' },
    { k: 'Tasas de cambio', v: ratesReady, note: ratesReady ? 'Cacheadas' : 'Pulsa “preparar todo”' },
    { k: 'Mapas', v: zonesDone === dests.length, note: `${zonesDone}/${dests.length} zonas descargadas` },
  ]

  return (
    <div className="card offline-maps">
      <div className="om-intro">
        Casi todo funciona ya <strong>sin conexión</strong>: el plan, el itinerario, Explorar, los documentos y el presupuesto viajan dentro de la app desde la primera carga. Lo único que necesita descarga son los <strong>mapas</strong>. Hazlo con WiFi antes de Borneo.
      </div>

      <div className="om-ready">
        {ready.map((r) => (
          <div key={r.k} className="omr-row">
            <span className={`omr-ic ${r.v ? 'ok' : 'pend'}`}>{r.v ? '✓' : '◌'}</span>
            <span className="omr-k">{r.k}</span>
            <span className="omr-note">{r.note}</span>
          </div>
        ))}
      </div>

      <button className="om-prepare" disabled={!online || allBusy} onClick={prepareAll}>
        {allBusy ? `Preparando… (${zonesDone}/${dests.length} zonas)` : '⬇️ Preparar TODO para el viaje (offline)'}
      </button>
      {!online && <div className="om-warn">📴 Conéctate al WiFi para descargar los mapas.</div>}

      <div className="om-sub">Mapas por zona</div>
      {dests.map((d) => {
        const pack = mapPacks[d.id]
        const prog = progress[d.id]
        const isBusy = busy === d.id
        return (
          <div key={d.id} className="om-row">
            <div className="om-body">
              <span className="om-name">{d.emoji} {d.name}</span>
              <span className="om-meta">
                {isBusy ? `Descargando… ${Math.round((prog ?? 0) * 100)}%`
                  : pack ? `✓ Descargado · ${pack.tiles} teselas`
                  : `~${countRegionTiles(d.id)} teselas`}
              </span>
              {isBusy && <span className="om-bar"><i style={{ width: `${Math.round((prog ?? 0) * 100)}%` }} /></span>}
            </div>
            <button className={`om-btn ${pack ? 'done' : ''}`} disabled={!online || !!busy || allBusy} onClick={() => dl(d.id)}>
              {isBusy ? '…' : pack ? 'Actualizar' : 'Descargar'}
            </button>
          </div>
        )
      })}
    </div>
  )
}
