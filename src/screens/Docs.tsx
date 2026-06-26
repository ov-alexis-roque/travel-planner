import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { trip } from '../data/trip'
import { destById } from '../lib/utils'
import { gmapsUrl } from '../lib/places-helpers'
import { countryEmergency, vaultFields, docSlots } from '../data/emergency'
import { usePlanner } from '../store'
import { putDoc, getDoc, delDoc, fileToDataUrl } from '../lib/idb'

// --- Foto de documento guardada en IndexedDB ---
function DocPhoto({ slotKey, label }: { slotKey: string; label: string }) {
  const [url, setUrl] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => { getDoc(slotKey).then(setUrl) }, [slotKey])

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setBusy(true)
    try {
      const dataUrl = await fileToDataUrl(file)
      await putDoc(slotKey, dataUrl)
      setUrl(dataUrl)
    } finally { setBusy(false) }
  }
  async function remove() {
    await delDoc(slotKey)
    setUrl(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div className={`doc-slot ${url ? 'has' : ''}`}>
      <input ref={inputRef} type="file" accept="image/*" hidden onChange={onPick} />
      {url ? (
        <a href={url} target="_blank" rel="noreferrer" className="doc-thumb"><img src={url} alt={label} /></a>
      ) : (
        <button className="doc-add" onClick={() => inputRef.current?.click()} disabled={busy}>{busy ? '…' : '＋'}</button>
      )}
      <div className="doc-meta">
        <span className="doc-label">{label}</span>
        {url
          ? <button className="doc-link danger" onClick={remove}>Quitar</button>
          : <button className="doc-link" onClick={() => inputRef.current?.click()}>Añadir foto</button>}
      </div>
    </div>
  )
}

// --- Campo de texto editable persistido ---
function VaultInput({ fieldKey, label, placeholder }: { fieldKey: string; label: string; placeholder?: string }) {
  const value = usePlanner((s) => s.vaultText[fieldKey] ?? '')
  const setVaultText = usePlanner((s) => s.setVaultText)
  return (
    <label className="vault-field">
      <span className="vf-label">{label}</span>
      <input className="vf-input" value={value} placeholder={placeholder ?? '—'} onChange={(e) => setVaultText(fieldKey, e.target.value)} />
    </label>
  )
}

const STATUS_LABEL: Record<string, string> = { booked: 'Reservado', paid: 'Pagado', pending: 'Pendiente' }

export default function Docs() {
  const fieldsByGroup = (g: string) => vaultFields.filter((f) => f.group === g)
  const refLegs = trip.legs.filter((l) => l.ref)

  return (
    <div className="fadein">
      <div className="page-head">
        <Link to="/resumen" className="back-link">‹ Resumen</Link>
        <h1>Documentos</h1>
        <div className="sub">Todo a mano y sin conexión · fotos guardadas solo en este móvil</div>
      </div>

      <div className="card tip info" style={{ margin: '8px 14px' }}>
        🔒 Las fotos y los datos que escribas se guardan <strong>solo en este dispositivo</strong> (no se suben a ningún sitio) y funcionan sin internet.
      </div>

      {/* Documentos con foto */}
      <div className="section-title">📄 Documentos (fotos offline)</div>
      <div className="card doc-grid">
        {docSlots.map((d) => <DocPhoto key={d.key} slotKey={d.key} label={d.label} />)}
      </div>

      {/* Seguro y contactos */}
      <div className="section-title">🆘 Seguro y contactos</div>
      <div className="card">
        {fieldsByGroup('familia').map((f) => <VaultInput key={f.key} fieldKey={f.key} label={f.label} placeholder={f.placeholder} />)}
      </div>

      {/* Tarjeta de los niños */}
      <div className="section-title">🧒 Tarjeta médica y “estoy perdido”</div>
      <div className="card">
        {fieldsByGroup('ninos').map((f) => <VaultInput key={f.key} fieldKey={f.key} label={f.label} placeholder={f.placeholder} />)}
      </div>

      {/* Transfers */}
      <div className="section-title">🚗 Transfers y contactos clave</div>
      <div className="card">
        {fieldsByGroup('transfer').map((f) => <VaultInput key={f.key} fieldKey={f.key} label={f.label} placeholder={f.placeholder} />)}
      </div>

      {/* Reservas / localizadores */}
      <div className="section-title">🎫 Reservas y localizadores</div>
      <div className="card">
        {refLegs.map((l) => (
          <div key={l.id} className="res-row"><span className="rr-name">{l.number ?? l.type} · {l.from}→{l.to}</span><span className="rr-ref">{l.ref}</span></div>
        ))}
        {trip.accommodations.map((a) => (
          <div key={a.id} className="res-row"><span className="rr-name">🏨 {a.name}</span><span className="rr-ref">{a.ref ?? STATUS_LABEL[a.status]}</span></div>
        ))}
      </div>

      {/* Para el taxista */}
      <div className="section-title">🗺️ Para enseñar al taxi</div>
      <div className="card">
        {trip.accommodations.map((a) => {
          const dest = destById(a.destinationId)
          return (
            <a key={a.id} className="taxi-row" href={a.coords ? gmapsUrl(a.name, dest.name, a.coords) : '#'} target="_blank" rel="noreferrer">
              <span className="tx-body"><span className="tx-name">{dest.emoji} {a.name}</span>{a.note && <span className="tx-note">{a.note}</span>}</span>
              <span className="tx-go">🗺️</span>
            </a>
          )
        })}
      </div>

      {/* Emergencias por país */}
      <div className="section-title">📞 Emergencias por país</div>
      {countryEmergency.map((c) => (
        <div key={c.id} className="card emg-card">
          <div className="emg-head">{c.flag} {c.country}</div>
          <div className="emg-nums">
            {c.emergency.map((e, i) => (
              <a key={i} className="emg-num" href={`tel:${e.number.split(' ')[0]}`}><span className="en-n">{e.number}</span><span className="en-l">{e.label}</span></a>
            ))}
            {c.fromMobile && <div className="emg-num"><span className="en-n">{c.fromMobile}</span><span className="en-l">desde móvil</span></div>}
          </div>
          <div className="emg-kv"><span className="k">💧 Agua</span><span>{c.water}</span></div>
          <div className="emg-kv"><span className="k">📱 Apps</span><span>{c.apps}</span></div>
          <div className="emg-kv"><span className="k">🏛️ Embajada</span><span>{c.embassyDefault.name}{c.embassyDefault.phone ? ` · ${c.embassyDefault.phone}` : ''}{c.embassyDefault.address ? ` · ${c.embassyDefault.address}` : ''}{c.embassyDefault.note ? ` (${c.embassyDefault.note})` : ''}</span></div>
        </div>
      ))}
      <div style={{ height: 12 }} />
    </div>
  )
}
