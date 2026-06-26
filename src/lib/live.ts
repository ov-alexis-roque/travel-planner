import type { Stop } from '../types'

// "16:30" o "06:55–09:30" → minutos desde medianoche (toma la primera hora).
export function parseTime(t?: string): number | null {
  if (!t) return null
  const m = /(\d{1,2}):(\d{2})/.exec(t)
  if (!m) return null
  return +m[1] * 60 + +m[2]
}

export interface NowNext {
  current: Stop | null // lo que toca ahora (última parada ya empezada)
  next: Stop | null // lo siguiente
  minsToNext: number | null // minutos hasta la próxima parada
  leaveInMins: number | null // "sal en X" = minsToNext - tiempo de traslado de la parada actual
  done: boolean // el día ya ha terminado
}

// Calcula el estado en vivo del día a partir de las horas de las paradas.
export function computeNowNext(stops: Stop[], nowMin: number): NowNext {
  const timed = stops
    .map((s) => ({ s, t: parseTime(s.time) }))
    .filter((x): x is { s: Stop; t: number } => x.t !== null)
    .sort((a, b) => a.t - b.t)

  if (timed.length === 0) return { current: null, next: null, minsToNext: null, leaveInMins: null, done: false }

  let currentIdx = -1
  for (let i = 0; i < timed.length; i++) if (timed[i].t <= nowMin) currentIdx = i
  const current = currentIdx >= 0 ? timed[currentIdx].s : null
  const nextEntry = timed.find((x) => x.t > nowMin) ?? null
  const next = nextEntry?.s ?? null
  const minsToNext = nextEntry ? nextEntry.t - nowMin : null
  const transit = current?.transitToNext?.min ?? null
  const leaveInMins = minsToNext !== null && transit !== null ? Math.max(0, minsToNext - transit) : null
  const done = next === null && current !== null

  return { current, next, minsToNext, leaveInMins, done }
}

// Deep links de navegación / ride-hailing.
export function mapsDirUrl(coords: { lat: number; lon: number }) {
  return `https://www.google.com/maps/dir/?api=1&destination=${coords.lat},${coords.lon}`
}
// Indonesia (Bali) usa Gojek; el resto, Grab.
export function rideApp(destId: string): { name: string; url: string } {
  const isBali = destId === 'ubud' || destId === 'gili' || destId === 'sanur'
  return isBali
    ? { name: 'Gojek', url: 'https://www.gojek.com/' }
    : { name: 'Grab', url: 'https://grab.com/' }
}
