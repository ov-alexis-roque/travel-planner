import { trip } from '../data/trip'
import type { Stop } from '../types'

export interface AgendaItem {
  key: string
  kind: 'base' | 'added'
  name: string
  emoji?: string
  category: string
  time?: string
  hours?: string
  note?: string
  coords?: { lat: number; lon: number }
  status?: string
  origDayId?: string
  n?: number
  placeId?: string
  alt?: string
  transit?: Stop['transitToNext']
}

interface Overrides {
  addedByDay: Record<string, string[]>
  movedBase: Record<string, string>
  hiddenBase: Record<string, boolean>
  order: Record<string, string[]>
}

// Construye la agenda editable de un día: paradas base (no ocultas, en su día efectivo)
// + sitios añadidos desde Explorar, en el orden definido por el usuario.
export function buildAgenda(dayId: string, ov: Overrides): AgendaItem[] {
  const items: AgendaItem[] = []

  for (const d of trip.days) {
    for (const s of d.stops ?? []) {
      const baseKey = `${d.id}:${s.n}`
      if (ov.hiddenBase[baseKey]) continue
      const eff = ov.movedBase[baseKey] ?? d.id
      if (eff !== dayId) continue
      items.push({
        key: `b:${baseKey}`, kind: 'base', name: s.name, emoji: s.emoji, category: s.category,
        time: s.time, hours: s.hours, note: s.note, coords: s.coords, status: s.status,
        origDayId: d.id, n: s.n, transit: s.transitToNext, alt: s.alt,
      })
    }
  }

  for (const placeId of ov.addedByDay[dayId] ?? []) {
    const p = trip.catalog.find((x) => x.id === placeId)
    if (!p) continue
    items.push({
      key: `a:${p.id}`, kind: 'added', name: p.name, emoji: p.emoji, category: p.category,
      hours: p.hours, note: p.blurb, coords: p.coords, placeId: p.id,
    })
  }

  const ord = ov.order[dayId]
  if (ord && ord.length) {
    items.sort((a, b) => {
      const ia = ord.indexOf(a.key)
      const ib = ord.indexOf(b.key)
      if (ia === -1 && ib === -1) return 0
      if (ia === -1) return 1
      if (ib === -1) return -1
      return ia - ib
    })
  }
  return items
}
