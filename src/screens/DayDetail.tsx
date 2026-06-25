import { useParams, Link, useNavigate } from 'react-router-dom'
import { trip } from '../data/trip'
import DayView from '../components/DayView'

export default function DayDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const idx = trip.days.findIndex((d) => d.id === id)
  const day = trip.days[idx]
  if (!day) return <div className="empty">Día no encontrado. <Link to="/itinerario">Ver itinerario</Link></div>
  const prev = trip.days[idx - 1]
  const next = trip.days[idx + 1]

  return (
    <>
      <button className="back" onClick={() => navigate(-1)}>← Volver</button>
      <DayView day={day} />
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 16px 8px', gap: 10 }}>
        {prev ? <Link to={`/dia/${prev.id}`} className="pill">← {prev.date}</Link> : <span />}
        {next ? <Link to={`/dia/${next.id}`} className="pill">{next.date} →</Link> : <span />}
      </div>
    </>
  )
}
