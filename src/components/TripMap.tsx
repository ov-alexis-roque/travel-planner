import { useEffect, useRef } from 'react'
import L from 'leaflet'

export interface MapPoint {
  lat: number
  lon: number
  n?: number | string
  label?: string
  emoji?: string
  color?: string
}

interface Props {
  points: MapPoint[]
  height?: number
  showRoute?: boolean
  routeColor?: string
  interactive?: boolean
  rounded?: boolean
  fitPadding?: number
}

// Mapa Leaflet con marcadores numerados y ruta. Online (tiles CARTO Voyager).
export default function TripMap({ points, height = 200, showRoute = true, routeColor = '#1a1a2a', interactive = true, rounded = true, fitPadding = 40 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const mapRef = useRef<L.Map | null>(null)

  useEffect(() => {
    if (!ref.current) return
    const valid = points.filter((p) => typeof p.lat === 'number' && typeof p.lon === 'number')
    if (valid.length === 0) return

    const map = L.map(ref.current, {
      zoomControl: false,
      attributionControl: false,
      dragging: interactive,
      scrollWheelZoom: false,
      doubleClickZoom: interactive,
      touchZoom: interactive,
      tap: interactive,
    })
    mapRef.current = map

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      subdomains: 'abcd',
    }).addTo(map)
    L.control.attribution({ position: 'bottomright', prefix: false }).addAttribution('© OpenStreetMap · CARTO').addTo(map)

    if (showRoute && valid.length > 1) {
      L.polyline(valid.map((p) => [p.lat, p.lon]), {
        color: routeColor, weight: 3, opacity: 0.55, dashArray: '1 8', lineCap: 'round',
      }).addTo(map)
    }

    valid.forEach((p) => {
      const color = p.color ?? routeColor
      const inner = p.n !== undefined ? String(p.n) : (p.emoji ?? '')
      const icon = L.divIcon({
        className: 'map-pin-wrap',
        html: `<div class="map-pin" style="background:${color}">${inner}</div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      })
      const m = L.marker([p.lat, p.lon], { icon }).addTo(map)
      if (p.label) m.bindPopup(`<b>${p.label}</b>`, { closeButton: false })
    })

    const bounds = L.latLngBounds(valid.map((p) => [p.lat, p.lon] as [number, number]))
    map.fitBounds(bounds, { padding: [fitPadding, fitPadding], maxZoom: 14 })

    // Recalcular tamaño tras montar (evita tiles grises)
    setTimeout(() => map.invalidateSize(), 60)

    return () => {
      map.remove()
      mapRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(points), height])

  return <div ref={ref} className={`trip-map ${rounded ? 'rounded' : ''}`} style={{ height }} />
}
