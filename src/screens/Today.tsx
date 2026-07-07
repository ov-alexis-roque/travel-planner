import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { trip } from '../data/trip'
import { activeDay, daysUntilTrip, destById, destStyle, dayIntro, distanceKm, visitStops } from '../lib/utils'
import { usePlanner, useUI } from '../store'
import { useWeather, weatherEmoji, useRainToday } from '../lib/weather'
import { useGeo } from '../lib/useGeo'
import { todayBrief } from '../lib/brief'
import { kidFacts } from '../data/kidfacts'
import TripMap, { type MapPoint } from '../components/TripMap'
import NowNext from '../components/NowNext'
import Celebrate from '../components/Celebrate'
import { DEST_HEX } from '../components/DayView'

export default function Today() {
  const now = new Date()
  const today = activeDay(now)
  const until = daysUntilTrip(now)
  // Pre-viaje: clima/contexto de la primera parada (Singapur). En ruta: el destino del día.
  const focusDest = until > 0 ? destById('sin') : destById(today.destinationId === 'travel' ? 'sin' : today.destinationId)
  // Nos suscribimos a los objetos (no a las funciones) para re-renderizar al marcar
  const statusDone = usePlanner((s) => s.statusDone)
  const toggleStatus = usePlanner((s) => s.toggleStatus)
  const taskDone = usePlanner((s) => s.taskDone)
  const isTaskDoneSel = (id: string, fallback: boolean) => (taskDone[id] === undefined ? fallback : taskDone[id])
  const { data: wx, live } = useWeather(focusDest.coords)
  const rain = useRainToday(until <= 0 ? focusDest.coords : undefined)
  const geo = useGeo()
  const brief = todayBrief(now, isTaskDoneSel)
  const setFocusDay = useUI((s) => s.setFocusDay)
  useEffect(() => { setFocusDay(today.id) }, [today.id, setFocusDay])

  // Día completado (microcelebración)
  const dayDone = usePlanner((s) => !!s.dayComplete[today.id])
  const toggleDayComplete = usePlanner((s) => s.toggleDayComplete)
  const [celebrate, setCelebrate] = useState(false)
  function completeDay() {
    if (!dayDone) setCelebrate(true)
    toggleDayComplete(today.id)
  }

  // "¿Sabías que…?" para peques, rotando
  const facts = kidFacts[until > 0 ? 'general' : (today.destinationId === 'travel' ? 'general' : today.destinationId)] ?? kidFacts.general
  const [factIdx, setFactIdx] = useState(0)
  useEffect(() => {
    setFactIdx(0)
    const t = setInterval(() => setFactIdx((i) => (i + 1) % facts.length), 7000)
    return () => clearInterval(t)
  }, [facts])

  const idx = trip.days.findIndex((d) => d.id === today.id)
  const nextDay = trip.days[idx + 1]

  const destColor = DEST_HEX[focusDest.colorVar] ?? '#1a1a2a'
  const mapPoints: MapPoint[] = (today.stops ?? []).filter((s) => s.coords)
    .map((s) => ({ lat: s.coords!.lat, lon: s.coords!.lon, n: s.n, label: s.name, color: destColor }))

  const tempShown = live && wx ? wx.tempC : focusDest.climate?.tempDay
  const wxIcon = live && wx ? weatherEmoji(wx.code) : '🌡️'
  const sun = focusDest.sun

  // Stats de la cabecera, adaptadas a la fase del día (estilo "guía del día")
  const nVisit = visitStops(today).length
  const kmToday = Math.round(distanceKm((today.stops ?? []).filter((s) => s.coords).map((s) => s.coords!)))
  const isTravel = today.kind === 'travel'
  const legCount = (today.legIds ?? []).length

  // "Mensaje del día" del guía: en viaje, lo que te espera hoy; pre-viaje, lo que te espera el día 1.
  const firstDay = trip.days.find((d) => d.dayNumber === 1)
  const firstHl = (firstDay?.highlights ?? []).join(' · ')
  const heroMessage = until > 0
    ? `Os espera ${focusDest.name}${firstHl ? `: ${firstHl}` : ''}`
    : dayIntro(today)

  return (
    <div className="fadein">
      <div className="hero" style={{ ...destStyle(focusDest.id), background: destColor }}>
        <div className="hero-date">{until > 0 ? `Faltan ${until} días para volar` : `${today.weekday} · ${today.date} · ${until === 0 ? 'día 1' : `día ${today.dayNumber}`} de ${trip.stats.days}`}</div>
        <div className="big">{focusDest.emoji} {focusDest.name}</div>
        <div className="hero-guide">{heroMessage}</div>
        <div className="countdown">
          {until > 0 ? (
            <>
              <div className="cd"><div className="n">✈️</div><div className="l">sale 12 Jul</div></div>
              <div className="cd"><div className="n">{tempShown}°</div><div className="l">{wxIcon} Singapur</div></div>
              <div className="cd"><div className="n">{trip.stats.days}</div><div className="l">días de viaje</div></div>
            </>
          ) : isTravel ? (
            <>
              <div className="cd"><div className="n">✈️ {legCount}</div><div className="l">{legCount === 1 ? 'vuelo' : 'vuelos'} hoy</div></div>
              <div className="cd"><div className="n">{tempShown}°</div><div className="l">{wxIcon} {focusDest.name}</div></div>
              {sun && <div className="cd"><div className="n">🌅</div><div className="l">{sun.rise}–{sun.set}</div></div>}
            </>
          ) : (
            <>
              <div className="cd"><div className="n">{nVisit}</div><div className="l">🗺️ sitios hoy</div></div>
              {kmToday > 0 && <div className="cd"><div className="n">{kmToday}</div><div className="l">🚗 km del día</div></div>}
              <div className="cd"><div className="n">{tempShown}°</div><div className="l">{wxIcon} {live ? 'ahora' : 'típico'}</div></div>
            </>
          )}
        </div>
        {sun && !isTravel && until <= 0 && (
          <div className="hero-sun">🌅 Amanece {sun.rise} · 🌇 Anochece {sun.set}</div>
        )}
      </div>

      {/* ¿Sabías que…? para peques (rotando) */}
      {facts.length > 0 && (
        <div className="kidfact" key={factIdx}>
          <span className="kf-ic">🤓</span>
          <span><b>¿Sabías que…?</b> {facts[factIdx]}</span>
        </div>
      )}

      {/* Check-in online si hay vuelo hoy o mañana (solo durante el viaje) */}
      {until <= 0 && (isTravel || nextDay?.kind === 'travel') && (
        <Link to="/vuelos" className="checkin-badge">
          ✈️ {isTravel ? 'Vuelo hoy' : 'Vuelo mañana'} · haz el check-in online (24–48 h antes) y lleva la tarjeta en el móvil ›
        </Link>
      )}

      {/* Aviso de lluvia */}
      {rain && (
        <div className="rain-alert">🌧️ Lluvia probable hacia las {rain.hour} ({rain.prob}%) · lleva chubasquero y ten un plan bajo techo a mano.</div>
      )}

      {/* En vivo: ahora / próximo */}
      <NowNext day={today} preview={until > 0} />

      {/* Agenda contextual de hoy */}
      <div className="card brief" style={{ ['--dest' as string]: destColor }}>
        <div className="brief-loc">
          <span>{geo.state === 'ok' && geo.nearestName ? `📍 Estás cerca de ${geo.nearestName} (${geo.nearestKm} km)` : brief.locationLine}</span>
          {geo.state !== 'ok' && (
            <button className="brief-geo" onClick={geo.request}>{geo.state === 'asking' ? '…' : '📍 ¿Dónde estás?'}</button>
          )}
        </div>
        <div className="brief-msg">{brief.message}</div>
        <div className="brief-head">{brief.mode === 'pre' ? '🧭 Para ir cerrando' : '🧭 Tu agenda de hoy'}</div>
        <div className="brief-items">
          {brief.items.map((it, i) => {
            const inner = (
              <>
                <span className="bi-ic">{it.icon}</span>
                <span className="bi-body"><span className={`bi-title ${it.warn ? 'warn' : ''}`}>{it.title}</span>{it.sub && <span className="bi-sub">{it.sub}</span>}</span>
                {it.to && <span className="bi-go">›</span>}
              </>
            )
            return it.to
              ? <Link key={i} to={it.to} className="brief-item">{inner}</Link>
              : <div key={i} className="brief-item">{inner}</div>
          })}
        </div>
      </div>

      {/* Salud en zona de malaria (Borneo) */}
      {until <= 0 && (today.destinationId === 'sepilok' || today.destinationId === 'kinabatangan') && (
        <div className="card health-card">
          <div className="health-head">💊 Salud en Borneo</div>
          <div className="health-row">💊 Toma hoy tu <strong>antipalúdico</strong> según la pauta de tu médico (suele empezar antes de llegar y seguir varias semanas después de salir).</div>
          <div className="health-row">🦟 Repelente DEET por la mañana y, sobre todo, al atardecer (manga larga en los cruceros).</div>
          <div className="health-row">💧 Bebe solo agua embotellada; nada de hielo de origen dudoso.</div>
        </div>
      )}

      {/* Clima del destino */}
      {focusDest.climate && (
        <div className="card climate">
          <div className="temp">{tempShown}°</div>
          <div className="cl-body">
            <div className="cl-label">{wxIcon} {focusDest.climate.label}</div>
            <div className="cl-advice">{focusDest.climate.advice}</div>
          </div>
          {live ? <span className="cl-live">En vivo</span> : <span className="cl-typ">típico julio</span>}
        </div>
      )}

      {/* Día activo */}
      <div className="section-title">
        {until > 0 ? `Faltan ${until} días · empezamos con` : until === 0 ? '¡Hoy empieza el viaje!' : `Hoy · ${today.date} ${today.weekday}`}
      </div>
      <div className="card tight" style={destStyle(focusDest.id)}>
        <div className="dc-daynum" style={{ marginBottom: 4 }}>
          <span className="dc-pill">{today.dayNumber === null ? 'Salida' : `Día ${today.dayNumber}`}</span>
          <span>·&nbsp;{today.date} · {today.weekday}</span>
        </div>
        <h3 style={{ fontSize: '1.15em', fontWeight: 700 }}>{today.emoji} {today.title}</h3>
        <div className="dc-headline" style={{ marginTop: 4 }}>{today.headline}</div>
        {today.highlights && today.highlights.length > 0 && (
          <div className="chips" style={{ marginTop: 10 }}>
            {today.highlights.map((h, i) => <span key={i} className="chip-h">{h}</span>)}
          </div>
        )}
      </div>

      {/* Mini-mapa del recorrido de hoy */}
      {mapPoints.length > 0 && (
        <div className="map-wrap">
          <TripMap points={mapPoints} height={170} caption="🗺️ Recorrido de hoy" />
          <span className="map-cap">🗺️ Recorrido de hoy · {mapPoints.length} paradas</span>
        </div>
      )}

      {/* Reservas del día */}
      {today.statusItems.length > 0 && (
        <div className="card">
          {today.statusItems.map((s, i) => {
            const stored = statusDone[`${today.id}:${i}`]
            const on = stored === undefined ? s.done : stored
            return (
              <button key={i} className={`check ${on ? 'on' : ''}`} style={{ width: '100%', textAlign: 'left' }} onClick={() => toggleStatus(today.id, i)}>
                <span className="box">{on ? '✓' : ''}</span>
                <span className="ct">{s.label}</span>
              </button>
            )
          })}
        </div>
      )}

      {/* Cómo moverse */}
      {today.transport && (
        <>
          <div className="section-title">Cómo moverse hoy</div>
          <div className="transport" style={{ margin: '0 14px' }}>🚗 {today.transport}</div>
        </>
      )}

      {/* Tips del día */}
      {today.quickTips && today.quickTips.length > 0 && (
        <>
          <div className="section-title">Que no se te olvide hoy</div>
          <div className="card">
            {today.quickTips.map((q, i) => (
              <div className="qtip" key={i}><span className="qi">{q.startsWith('⚠️') ? '' : '✅'}</span><span>{q}</span></div>
            ))}
          </div>
        </>
      )}

      <Link to={`/dia/${today.id}`} className="section-title" style={{ display: 'block', color: 'var(--sa)' }}>Ver día completo →</Link>

      {/* Marcar día completado (microcelebración) */}
      {until <= 0 && (
        <button className={`day-done-btn ${dayDone ? 'on' : ''}`} onClick={completeDay}>
          {dayDone ? '✓ ¡Día completado!' : '🎉 Marcar día como completado'}
        </button>
      )}

      {nextDay && until <= 0 && (
        <>
          <div className="section-title">Mañana</div>
          <Link to={`/dia/${nextDay.id}`} className="card tight" style={{ display: 'block' }}>
            <strong>{nextDay.emoji} {nextDay.title}</strong>
            <div style={{ color: 'var(--muted)', fontSize: '.85em', marginTop: 3 }}>{nextDay.headline}</div>
          </Link>
        </>
      )}

      <div style={{ textAlign: 'center', color: 'var(--muted)', fontSize: '.72em', padding: '18px' }}>
        Familia Roque · 12 Jul — 5 Ago 2026
      </div>

      {celebrate && (
        <Celebrate emoji="🎉" title="¡Día completado!" sub={`${today.emoji} ${today.title} · ¡buen trabajo, familia Roque!`} onDone={() => setCelebrate(false)} />
      )}
    </div>
  )
}
