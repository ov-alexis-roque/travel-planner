import { trip } from '../data/trip'
import type { Day } from '../types'
import type { MapAnchor } from '../components/TripMap'
import { atmsByDest } from '../data/atms'

const AIRPORT: Record<string, { lat: number; lon: number; label: string }> = {
  sin: { lat: 1.3564, lon: 103.9876, label: 'Aeropuerto Changi' },
  sepilok: { lat: 5.9009, lon: 118.0594, label: 'Aeropuerto Sandakan' },
  kinabatangan: { lat: 5.9009, lon: 118.0594, label: 'Aeropuerto Sandakan' },
  kl: { lat: 2.7456, lon: 101.7099, label: 'KLIA' },
  ubud: { lat: -8.7467, lon: 115.1668, label: 'Aeropuerto Bali (DPS)' },
  sanur: { lat: -8.7467, lon: 115.1668, label: 'Aeropuerto Bali (DPS)' },
}

// Iconos fijos destacados del día: alojamiento y aeropuerto.
export function dayAnchors(day: Day): MapAnchor[] {
  const out: MapAnchor[] = []
  const acc =
    trip.accommodations.find((a) => a.name === day.accommodation?.name && a.coords) ??
    trip.accommodations.find((a) => a.destinationId === day.destinationId && a.coords)
  if (acc?.coords) out.push({ lat: acc.coords.lat, lon: acc.coords.lon, kind: 'hotel', label: acc.name })
  const ap = AIRPORT[day.destinationId]
  if (ap) out.push({ lat: ap.lat, lon: ap.lon, kind: 'airport', label: ap.label })
  return out
}

// Cajeros de la zona del día (capa 🏧 en el mapa).
export function dayAtms(day: Day): MapAnchor[] {
  return (atmsByDest[day.destinationId] ?? []).map((a) => ({
    lat: a.coords.lat, lon: a.coords.lon, kind: 'atm', label: a.name, note: a.note,
  }))
}
