import { trip } from '../data/trip'
import { activeDay, daysUntilTrip, destById, dayIntro } from './utils'

export interface BriefItem { icon: string; title: string; sub?: string; to?: string; warn?: boolean }
export interface Brief {
  mode: 'pre' | 'flight' | 'arrival' | 'inDest'
  locationLine: string
  headline: string
  message: string // "mensaje del día" del guía (narrativa según la fase)
  items: BriefItem[]
}

const COUNTRY: Record<string, { c: string; app: string }> = {
  sin: { c: 'Singapur', app: 'Grab' },
  sepilok: { c: 'Malasia', app: 'Grab' }, kinabatangan: { c: 'Malasia', app: 'Grab' }, kl: { c: 'Malasia', app: 'Grab' },
  ubud: { c: 'Indonesia', app: 'Gojek / Grab' }, gili: { c: 'Indonesia', app: 'Gojek / Grab' }, sanur: { c: 'Indonesia', app: 'Gojek / Grab' },
}
const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']

export function todayBrief(now: Date, isTaskDone: (id: string, fallback: boolean) => boolean): Brief {
  const until = daysUntilTrip(now)
  const today = activeDay(now)
  const idx = trip.days.findIndex((d) => d.id === today.id)
  const prev = trip.days[idx - 1]
  const dest = destById(today.destinationId)
  const pending = trip.tasks.filter((t) => !isTaskDone(t.id, t.done))
  const fechaHoy = `${now.getDate()} de ${MESES[now.getMonth()]}`

  const meals = (today.stops ?? []).filter((s) => s.category === 'Comida')
  const lunch = meals[0]?.name
  const dinner = meals[meals.length - 1]?.name
  const firstAct = (today.stops ?? []).find((s) => !['Aeropuerto', 'Hotel', 'Puerto', 'Comida'].includes(s.category))
  const mealsLine = lunch ? ` Para comer, ${lunch}${dinner && dinner !== lunch ? `; y de cena, ${dinner}` : ''}.` : ''

  // ---------- PRE-VIAJE ----------
  if (until > 0) {
    const doneCount = trip.tasks.filter((t) => isTaskDone(t.id, t.done)).length
    const restantes = trip.tasks.length - doneCount
    const message = `Hoy ${fechaHoy}: faltan ${until} días para volar. Lo importante de hoy es ir dejando lista la checklist —reservas, billetes, vacunas y compras— para tenerlo todo resuelto antes de salir. Te quedan ${restantes} cosas por cerrar 👇`
    const items: BriefItem[] = []
    const flight = trip.legs[0]
    items.push({ icon: '✈️', title: `Lo siguiente: vuelo ${flight.number}`, sub: `${flight.from}→${flight.to} · 12 Jul · sal de casa a las 9:00`, to: '/vuelos' })
    if (until <= 16) {
      const checkin = pending.find((t) => t.id === 't18')
      if (checkin) items.push({ icon: '📱', title: 'Pronto: check-in online AirAsia', sub: 'Se abre 14 días antes (28 Jun) · asientos gratis', to: '/pendientes', warn: true })
    }
    const grp = (u: string) => pending.filter((t) => t.urgency === u)
    grp('urgent').forEach((t) => items.push({ icon: t.icon ?? '⚠️', title: t.title.split('—')[0].trim(), sub: t.cost, to: '/pendientes', warn: true }))
    const reservas = grp('soon')
    if (reservas.length) items.push({ icon: '🎟️', title: `Reservar (${reservas.length})`, sub: reservas.map((t) => t.title.replace(/ —.*| · .*/, '').replace(/Tickets |Reservar /, '')).slice(0, 6).join(' · '), to: '/pendientes' })
    const comprar = grp('buy')
    if (comprar.length) items.push({ icon: '🛒', title: `Comprar (${comprar.length})`, sub: comprar.map((t) => t.title.split('—')[0].replace(/^[^ ]+ /, '').trim()).join(' · '), to: '/pendientes' })
    const semana = grp('week')
    if (semana.length) items.push({ icon: '🧳', title: `Antes de salir (${semana.length})`, sub: semana.map((t) => t.title.split('—')[0].split('·')[0].trim()).join(' · '), to: '/pendientes' })
    return { mode: 'pre', locationLine: '📍 Estás en Barcelona', headline: `Faltan ${until} días para volar`, message, items }
  }

  // ---------- DÍA DE VUELO ----------
  if (today.kind === 'travel') {
    const items: BriefItem[] = []
    const firstLeg = (today.legIds ?? []).map((id) => trip.legs.find((l) => l.id === id))[0]
    const firstStop = today.stops?.[0]
    if (firstStop?.time) items.push({ icon: '⏰', title: `Sal a las ${firstStop.time}`, sub: firstLeg ? `Vuelo ${firstLeg.number} ${firstLeg.depart} · ${firstLeg.from}→${firstLeg.to}` : today.headline })
    items.push({ icon: '🚗', title: 'Reserva el transporte al aeropuerto', sub: 'Pide taxi/Grab con margen. Equipaje listo la noche anterior.' })
    const checkin = pending.find((t) => /check-in/i.test(t.title))
    if (checkin) items.push({ icon: '📱', title: 'Haz el check-in online', sub: 'Selecciona asientos juntos', to: '/pendientes', warn: true })
    today.quickTips?.forEach((q) => items.push({ icon: q.startsWith('⚠️') ? '⚠️' : '💡', title: q.replace(/^⚠️\s*/, ''), warn: q.startsWith('⚠️') }))
    const message = today.id === 'd0'
      ? `¡Hoy ${fechaHoy} empieza el viaje! Rumbo al aeropuerto: revisa que tienes el check-in hecho, las maletas listas para facturar y la documentación a mano (pasaportes). No te dejes nada — el próximo destino es Singapur.`
      : `Hoy ${fechaHoy} toca traslado: ${today.title}. Día de logística — viaja cómodo, ten a mano la documentación y sigue los avisos de transporte de abajo.`
    return { mode: 'flight', locationLine: today.id === 'd0' ? '📍 Estás en Barcelona · hoy vuelas' : '✈️ Día de vuelos', headline: today.title, message, items }
  }

  // ---------- LLEGADA A NUEVO DESTINO ----------
  const isArrival = prev && prev.destinationId !== today.destinationId
  if (isArrival) {
    const items: BriefItem[] = []
    const prevCountry = prev ? COUNTRY[prev.destinationId]?.c : undefined
    const here = COUNTRY[today.destinationId]
    if (here && here.c !== prevCountry) items.push({ icon: '📲', title: `Descárgate ${here.app}`, sub: `App de taxis/transporte en ${here.c}. Instálala antes de necesitarla.`, warn: true })
    items.push({ icon: '🛏️', title: 'Check-in y deja las maletas', sub: today.accommodation?.name })
    if (today.transport) items.push({ icon: '🚕', title: 'Cómo llegar del aeropuerto/puerto', sub: today.transport })
    if (firstAct) items.push({ icon: firstAct.emoji ?? '📍', title: `Primer plan: ${firstAct.name}`, sub: firstAct.note })
    items.push({ icon: '😌', title: 'Sin prisa', sub: 'Aclimataos al ritmo y al calor antes de cargar el día.' })
    const message = `Hoy ${fechaHoy} llegáis a ${dest.name}. Lo primero: al alojamiento a dejar las maletas, estirar y coger fuerzas (descansad un poco si hace falta). Luego, con calma, empezamos${firstAct ? ` por ${firstAct.name}` : ''}.${mealsLine}`
    return { mode: 'arrival', locationLine: `📍 Llegáis a ${dest.name}`, headline: today.title, message, items }
  }

  // ---------- DÍA EN DESTINO ----------
  const items: BriefItem[] = []
  const stops = (today.stops ?? []).filter((s) => s.category !== 'Hotel')
  stops.slice(0, 3).forEach((s, i) => items.push({ icon: i === 0 ? '👉' : '↓', title: `${i === 0 ? 'Primero' : 'Luego'}: ${s.emoji ?? ''} ${s.name}`, sub: [s.time, s.note].filter(Boolean).join(' · ') }))
  today.quickTips?.slice(0, 2).forEach((q) => items.push({ icon: q.startsWith('⚠️') ? '⚠️' : '💡', title: q.replace(/^⚠️\s*/, ''), warn: q.startsWith('⚠️') }))
  const message = `Hoy ${fechaHoy}, ${dayIntro(today).charAt(0).toLowerCase()}${dayIntro(today).slice(1)}.${mealsLine} Abajo tienes el plan y lo que conviene reservar.`
  return { mode: 'inDest', locationLine: `📍 ${dest.name}`, headline: today.title, message, items }
}
