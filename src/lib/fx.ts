import { useEffect, useState } from 'react'

// Conversor de divisas con tasas cacheadas. Intenta tasas en vivo (open.er-api,
// sin clave) y, sin conexión, usa un fallback aproximado para que SIEMPRE
// funcione sobre el terreno. El service worker cachea la respuesta (NetworkFirst).

export type Cur = 'EUR' | 'SGD' | 'MYR' | 'IDR'
export const CURRENCIES: { code: Cur; flag: string; name: string }[] = [
  { code: 'EUR', flag: '🇪🇺', name: 'Euro' },
  { code: 'SGD', flag: '🇸🇬', name: 'Dólar de Singapur' },
  { code: 'MYR', flag: '🇲🇾', name: 'Ringgit malayo' },
  { code: 'IDR', flag: '🇮🇩', name: 'Rupia indonesia' },
]

// Fallback aproximado (1 EUR = …). Orientativo; se actualiza con red.
const FALLBACK: Record<Cur, number> = { EUR: 1, SGD: 1.46, MYR: 5.05, IDR: 17600 }
const KEY = 'fx-cache-v1'

export interface Rates { rates: Record<Cur, number>; ts: number; live: boolean }

function readCache(): Rates | null {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch { return null }
}

export async function fetchRates(): Promise<Rates> {
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/EUR')
    const json = await res.json()
    const r = json?.rates
    if (!r || !r.SGD) throw new Error('sin tasas')
    const rates: Record<Cur, number> = { EUR: 1, SGD: r.SGD, MYR: r.MYR, IDR: r.IDR }
    const out = { rates, ts: Date.now(), live: true }
    localStorage.setItem(KEY, JSON.stringify(out))
    return out
  } catch {
    const cached = readCache()
    if (cached) return { ...cached, live: false }
    return { rates: FALLBACK, ts: 0, live: false }
  }
}

export function convert(amount: number, from: Cur, to: Cur, rates: Record<Cur, number>): number {
  if (!isFinite(amount)) return 0
  const inEur = amount / rates[from] // a EUR
  return inEur * rates[to]
}

export function fmtCur(n: number, cur: Cur): string {
  const dec = cur === 'IDR' ? 0 : 2
  return n.toLocaleString('es-ES', { minimumFractionDigits: dec, maximumFractionDigits: dec })
}

export function useRates(): Rates {
  const [rates, setRates] = useState<Rates>(() => readCache() ?? { rates: FALLBACK, ts: 0, live: false })
  useEffect(() => { fetchRates().then(setRates) }, [])
  return rates
}
