import { useState, useRef, useEffect } from 'react'
import { trip } from '../data/trip'
import { activeDay, destById, dayIso } from '../lib/utils'
import { DEST_HEX } from '../components/DayView'
import DayView from '../components/DayView'

export default function Itinerary() {
  const todayId = activeDay(new Date()).id
  const [sel, setSel] = useState<string>(todayId)
  const tabsRef = useRef<HTMLDivElement>(null)

  // Centrar el día activo al entrar
  useEffect(() => {
    const el = tabsRef.current?.querySelector('.day-tab.active') as HTMLElement | null
    el?.scrollIntoView({ inline: 'center', block: 'nearest' })
  }, [sel])

  const day = trip.days.find((d) => d.id === sel) ?? trip.days[0]

  return (
    <>
      <div className="page-head" style={{ paddingBottom: 4 }}>
        <h1>Itinerario</h1>
        <div className="sub">{trip.stats.days} días · {trip.stats.destinations} países · {trip.stats.nights} noches</div>
      </div>

      <div className="day-tabs" ref={tabsRef}>
        {trip.days.map((d) => {
          const dest = destById(d.destinationId)
          const isSel = d.id === sel
          const isToday = d.id === todayId
          return (
            <button
              key={d.id}
              className={`day-tab ${isSel ? 'active' : ''} ${isToday && !isSel ? 'today-mark' : ''}`}
              style={{ ['--dest' as string]: DEST_HEX[dest.colorVar] }}
              onClick={() => setSel(d.id)}
            >
              <div className="dt-emoji">{dest.emoji}</div>
              <div className="dt-wd">{d.weekday}</div>
              <div className="dt-d">{d.date.replace(' ', ' ')}</div>
              <div className="dt-dot" />
            </button>
          )
        })}
      </div>

      <DayView key={day.id} day={day} />
      <div style={{ textAlign: 'center', color: 'var(--muted)', fontSize: '.72em', padding: '14px' }}>
        {dayIso(day.id)} · {destById(day.destinationId).name}
      </div>
    </>
  )
}
