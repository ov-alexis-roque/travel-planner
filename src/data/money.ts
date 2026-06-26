// Normas de efectivo, tarjeta y propina por país (orientativo, julio 2026).
export interface CashNorms {
  id: string
  country: string
  flag: string
  cur: string
  cards: string
  tipping: string
  cash: string
}

export const cashNorms: CashNorms[] = [
  {
    id: 'sg', country: 'Singapur', flag: '🇸🇬', cur: 'SGD (dólar de Singapur)',
    cards: 'Tarjeta y móvil aceptados casi en todo.',
    tipping: 'Propina NO habitual; muchos sitios ya incluyen 10% de servicio.',
    cash: 'Lleva algo de efectivo solo para los hawker centers.',
  },
  {
    id: 'my', country: 'Malasia', flag: '🇲🇾', cur: 'MYR (ringgit)',
    cards: 'Tarjeta en centros y hoteles; efectivo para hawkers y Grab.',
    tipping: 'Propina no obligatoria; redondear está bien.',
    cash: '⚠️ Borneo rural (Sepilok/Kinabatangan): NO hay cajeros. Saca ringgit en KL o en el aeropuerto antes de entrar a la selva.',
  },
  {
    id: 'id', country: 'Indonesia (Bali)', flag: '🇮🇩', cur: 'IDR (rupia)',
    cards: 'Muy de EFECTIVO; tarjeta solo en hoteles y restaurantes grandes.',
    tipping: 'Propina ~5–10% si no viene incluida; redondear en warungs.',
    cash: 'Lleva billetes pequeños. Regatea en mercados (no en warungs ni precios fijos). En Gili Air hay pocos cajeros y caros: saca rupias en Bali.',
  },
]
