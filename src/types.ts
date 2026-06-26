// Modelo de datos del Travel Planner (v1)
// Derivado del docx Marco v1.0 (sección 9) + benchmarking (TripIt/Wanderlog).

export type ID = string
export type BookingStatus = 'pending' | 'booked' | 'included' | 'free' | 'done' | 'paid'
export type DayKind = 'travel' | 'exploration' | 'activation' | 'rest'
export type SlotKey = 'morning' | 'midday' | 'afternoon' | 'evening' | 'night'
export type LegType = 'flight' | 'ferry' | 'transfer' | 'train' | 'bus'
export type Audience = 'all' | 'adults' | 'kids'

export interface Traveler {
  id: ID
  name: string
  kind: 'adult' | 'child'
  age?: number
  notes?: string
}

export interface Climate {
  tempDay: number // °C típico de día (julio-agosto)
  tempNight: number
  label: string // "Cálido y húmedo", "Seco y soleado"
  advice: string
}

export interface Destination {
  id: ID
  name: string
  emoji: string
  colorVar: string // clave de la paleta CSS (--sin, --bo, ...)
  dates: string
  nights?: number
  summary: string
  coords?: { lat: number; lon: number }
  climate?: Climate
  sun?: { rise: string; set: string } // amanecer/atardecer típico (jul-ago, hora local)
  logistics: { currency?: string; plug?: string; transport?: string; tipping?: string; water?: string; notes?: string }
  alerts: string[]
  emergency?: { insurance?: string; hotel?: string; embassy?: string }
}

// Una franja del día (mañana, mediodía, tarde, noche...)
export interface DaySlot {
  key: SlotKey
  icon?: string
  time?: string
  text: string
}

export interface DayHighlightStatus {
  label: string
  done: boolean
}

export type TransitMode = 'walk' | 'car' | 'flight' | 'ferry' | 'train' | 'bus' | 'boat'
export interface Stop {
  n: number // orden / número de pin
  name: string
  category: string // "Templo", "Playa", "Comida", "Naturaleza", "Aeropuerto", "Hotel"
  emoji?: string
  coords?: { lat: number; lon: number }
  time?: string
  hours?: string // "Abierto 7:00–19:00"
  note?: string
  status?: BookingStatus
  audience?: Audience
  alt?: string // "A" / "B" — marca alternativas para el mismo hueco (elige una)
  transitToNext?: {
    mode: TransitMode; min?: number; km?: number; note?: string
    line?: string // p.ej. "MRT North-South (roja)"
    board?: string // dónde subir: "Changi T3 → cambio en Tanah Merah"
    alight?: string // dónde bajar
    fare?: string // tarifa aprox
    freq?: string // frecuencia
    tip?: string // consejo práctico
  }
}

export interface Day {
  id: ID
  dayNumber: number | null // null = día 0 (salida)
  date: string // "12 Jul"
  weekday: string
  destinationId: ID
  title: string
  emoji?: string
  kind: DayKind
  headline: string // resumen de una línea — "qué haremos"
  summary?: string // 1-2 líneas, qué veremos/haremos hoy
  highlights?: string[] // chips "qué veremos": "🦧 Orangutanes"
  quickTips?: string[] // cosas a saber hoy
  accommodation?: { name: string; note?: string; status: BookingStatus }
  progress: number // 0-100 de preparación del día
  statusItems: DayHighlightStatus[] // checklist del día (reservas)
  stops?: Stop[] // paradas geolocalizadas (timeline + mapa)
  slots: DaySlot[]
  transport?: string // línea de logística de transporte
  tip?: string // 💡 consejo / ⚠️ alerta del día
  legIds?: ID[]
}

export interface Leg {
  id: ID
  type: LegType
  from: string
  to: string
  date: string
  depart?: string
  arrive?: string
  number?: string
  carrier?: string
  ref?: string
  status: BookingStatus
  duration?: string
  warnings: string[]
  selfTransferGroup?: string // legs con el mismo grupo = trasbordo propio encadenado
  connectionInfo?: string
  subLegs?: { mode: LegType; from: string; to: string; note?: string }[]
  price?: string
}

export interface Accommodation {
  id: ID
  destinationId: ID
  name: string
  checkIn: string
  checkOut: string
  nights: number
  roomType?: string
  ref?: string
  price?: string
  status: BookingStatus
  note?: string
}

export type TaskUrgency = 'urgent' | 'soon' | 'buy' | 'week' | 'done'
export interface Task {
  id: ID
  icon?: string
  title: string
  detail?: string
  where?: string
  cost?: string
  urgency: TaskUrgency
  done: boolean
}

export interface BudgetItem {
  id: ID
  category: string
  concept: string
  amount: number // en EUR (estimado)
  status: 'paid' | 'pending' | 'estimated'
  note?: string
}

export interface Restaurant {
  id: ID
  destinationId: ID
  name: string
  cuisine: string
  priceApprox?: string
  kidFriendly: boolean
  moment?: string
  specialty?: string
  area?: string
  needsReservation: boolean
}

// Catálogo "Explorar": sitios que el usuario puede añadir a un día.
export interface Place {
  id: ID
  destinationId: ID
  name: string
  category: string // Naturaleza · Playa · Templo · Comida · Mirador · Show · Parque · Compras · Actividad
  emoji: string
  coords?: { lat: number; lon: number }
  blurb: string
  kids?: string // por qué mola para los niños
  price?: string
  hours?: string
  rank: number // posición en el "top"
  booking?: string // requiere reserva (url / nota)
}

export interface Trip {
  name: string
  subtitle: string
  startDate: string
  endDate: string
  travelers: Traveler[]
  stats: { days: number; destinations: number; flights: number; nights: number; budget: string }
  destinations: Destination[]
  days: Day[]
  legs: Leg[]
  accommodations: Accommodation[]
  tasks: Task[]
  budget: BudgetItem[]
  restaurants: Restaurant[]
  catalog: Place[]
}
