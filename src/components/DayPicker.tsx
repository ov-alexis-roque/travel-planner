import { trip } from '../data/trip'
import { destById } from '../lib/utils'
import { DEST_HEX } from './DayView'

interface Props {
  title: string
  sub?: string
  destId?: string // si se indica, prioriza los días de ese destino
  onPick: (dayId: string) => void
  onClose: () => void
}

export default function DayPicker({ title, sub, destId, onPick, onClose }: Props) {
  const scoped = destId ? trip.days.filter((d) => d.destinationId === destId) : []
  // Sin destino (p.ej. "Mover de día") mostramos TODOS los días, incluidos los de viaje (4 Ago).
  const days = scoped.length ? scoped : trip.days

  return (
    <div className="sheet-backdrop" onClick={onClose}>
      <div className="sheet" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-handle" />
        <div className="sheet-title">{title}</div>
        {sub && <div className="sheet-sub">{sub}</div>}
        <div className="sheet-days">
          {days.map((d) => {
            const dd = destById(d.destinationId)
            return (
              <button key={d.id} className="sheet-day" style={{ ['--dest' as string]: DEST_HEX[dd.colorVar] }}
                onClick={() => { onPick(d.id); onClose() }}>
                <span className="sd-num">Día {d.dayNumber ?? 0}</span>
                <span className="sd-info"><b>{d.date} · {d.weekday}</b><span>{dd.emoji} {d.title}</span></span>
                <span className="sd-go">＋</span>
              </button>
            )
          })}
        </div>
        <button className="sheet-cancel" onClick={onClose}>Cancelar</button>
      </div>
    </div>
  )
}
