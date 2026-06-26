import { trip } from '../data/trip'
import { distanceKm } from './utils'
import type { Place } from '../types'

// Enlace a Google Maps (abre la ficha real con su puntuación en vivo).
export function gmapsUrl(name: string, zone?: string, coords?: { lat: number; lon: number }): string {
  const q = encodeURIComponent([name, zone].filter(Boolean).join(' '))
  const ll = coords ? `&center=${coords.lat},${coords.lon}` : ''
  return `https://www.google.com/maps/search/?api=1&query=${q}${ll}`
}

// Distancia y tiempo aprox. desde el alojamiento del destino al sitio.
export function distanceFromHotel(place: Place): { km: number; min: number } | null {
  if (!place.coords) return null
  const hotel = trip.accommodations.find((a) => a.destinationId === place.destinationId && a.coords)
  if (!hotel?.coords) return null
  const km = distanceKm([hotel.coords, place.coords])
  // a pie si <1,2km (~12 min/km); en coche el resto (~24 km/h urbano)
  const min = km < 1.2 ? Math.round(km * 12) : Math.round(km * 2.6)
  return { km: Math.round(km * 10) / 10, min }
}

export function fmtKm(km: number) {
  return km < 10 ? `${km.toString().replace('.', ',')} km` : `${Math.round(km)} km`
}
