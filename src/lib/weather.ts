import { useEffect, useState } from 'react'

interface Weather { tempC: number; code: number }

// Clima en vivo vía Open-Meteo (sin API key). Si no hay red, el caller usa el clima típico.
export function useWeather(coords?: { lat: number; lon: number }) {
  const [data, setData] = useState<Weather | null>(null)
  const [state, setState] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle')

  useEffect(() => {
    if (!coords) return
    let cancelled = false
    setState('loading')
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current=temperature_2m,weather_code`
    fetch(url)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((j) => {
        if (cancelled) return
        const t = j?.current?.temperature_2m
        if (typeof t === 'number') {
          setData({ tempC: Math.round(t), code: j.current.weather_code ?? 0 })
          setState('ok')
        } else setState('error')
      })
      .catch(() => !cancelled && setState('error'))
    return () => { cancelled = true }
  }, [coords?.lat, coords?.lon])

  return { data, live: state === 'ok', loading: state === 'loading' }
}

// Mapeo simple de weather_code (WMO) a emoji
export function weatherEmoji(code: number): string {
  if (code === 0) return '☀️'
  if (code <= 2) return '🌤️'
  if (code === 3) return '☁️'
  if (code <= 48) return '🌫️'
  if (code <= 67) return '🌧️'
  if (code <= 77) return '🌨️'
  if (code <= 82) return '🌦️'
  if (code <= 99) return '⛈️'
  return '🌡️'
}
