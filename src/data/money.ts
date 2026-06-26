// Normas de efectivo, tarjeta y propina por país (orientativo, julio 2026).
export interface CashNorms {
  id: string
  country: string
  flag: string
  cur: string
  cards: string
  tipping: string
  cash: string
  atm: string
}

export const cashNorms: CashNorms[] = [
  {
    id: 'sg', country: 'Singapur', flag: '🇸🇬', cur: 'SGD (dólar de Singapur)',
    cards: 'Tarjeta y móvil aceptados casi en todo. Con Revolut apenas necesitarás efectivo.',
    tipping: 'Propina NO habitual; muchos sitios ya incluyen 10% de servicio.',
    cash: 'Lleva algo de efectivo solo para los hawker centers.',
    atm: 'Cajeros DBS / OCBC / UOB, sin sorpresas. Saca poco: con tarjeta pagas casi todo.',
  },
  {
    id: 'my', country: 'Malasia', flag: '🇲🇾', cur: 'MYR (ringgit)',
    cards: 'Tarjeta en centros y hoteles; efectivo para hawkers y Grab.',
    tipping: 'Propina no obligatoria; redondear está bien.',
    cash: '⚠️ Borneo rural (Sepilok/Kinabatangan): NO hay cajeros. Saca ringgit en KL o en el aeropuerto antes de entrar a la selva.',
    atm: 'Cajeros Maybank / CIMB / Public Bank. ⚠️ Cobran tasa fija (~RM 10–12) por retirada a tarjeta extranjera: saca cantidades grandes de una vez.',
  },
  {
    id: 'id', country: 'Indonesia (Bali)', flag: '🇮🇩', cur: 'IDR (rupia)',
    cards: 'Muy de EFECTIVO; tarjeta solo en hoteles y restaurantes grandes.',
    tipping: 'Propina ~5–10% si no viene incluida; redondear en warungs.',
    cash: 'Lleva billetes pequeños. Regatea en mercados (no en warungs ni precios fijos).',
    atm: 'Usa cajeros de BCA / Mandiri / BNI dentro de recintos (evita los de calle por skimming). Comisión ~IDR 50.000 y límite ~IDR 2–3 M por retirada. En Gili Air casi no hay y son caros: saca rupias en Bali.',
  },
]

// Consejo transversal para tarjeta (Revolut) en todo el viaje.
export const cardTip = 'Con Revolut/tarjeta paga SIEMPRE en moneda local: si el datáfono o el cajero ofrece cobrar en EUR, di NO (el cambio “DCC” sale caro). Lleva una 2ª tarjeta de respaldo guardada aparte y algo de efectivo de emergencia.'
