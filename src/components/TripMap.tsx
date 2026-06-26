import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'

export interface MapPoint {
  lat: number
  lon: number
  n?: number | string
  label?: string
  emoji?: string
  color?: string
  key?: string // para hacer scroll a la actividad al hacer clic
}
export interface MapAnchor { lat: number; lon: number; kind: 'hotel' | 'airport'; label: string }

interface Props {
  points: MapPoint[]
  height?: number | string
  showRoute?: boolean
  routeColor?: string
  interactive?: boolean
  rounded?: boolean
  fitPadding?: number
  routeCount?: number // solo enrutar los primeros N puntos (el resto son pins sueltos)
  expandable?: boolean // botón de pantalla completa
  caption?: string // rótulo mostrado dentro del mapa
  extraPoints?: MapPoint[] // sitios "por explorar" cerca (otro color, no en la ruta)
  anchors?: MapAnchor[] // hotel / aeropuerto: iconos fijos destacados
  onPointClick?: (key: string) => void
}

// Mapa Leaflet con marcadores numerados y ruta. Online (tiles CARTO Voyager).
export default function TripMap({ points, height = 200, showRoute = true, routeColor = '#1a1a2a', interactive = true, rounded = true, fitPadding = 40, routeCount, expandable = true, caption, extraPoints, anchors, onPointClick }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const mapRef = useRef<L.Map | null>(null)
  const [full, setFull] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    const valid = points.filter((p) => typeof p.lat === 'number' && typeof p.lon === 'number')
    if (valid.length === 0) return

    const map = L.map(ref.current, {
      zoomControl: interactive,
      attributionControl: false,
      dragging: interactive,
      scrollWheelZoom: interactive,
      doubleClickZoom: interactive,
      touchZoom: interactive,
      tap: interactive,
    })
    mapRef.current = map
    if (interactive) map.zoomControl.setPosition('bottomleft')

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      subdomains: 'abcd',
    }).addTo(map)
    L.control.attribution({ position: 'bottomright', prefix: false }).addAttribution('© OpenStreetMap · CARTO').addTo(map)

    const routePts = routeCount ? valid.slice(0, routeCount) : valid
    if (showRoute && routePts.length > 1) {
      L.polyline(routePts.map((p) => [p.lat, p.lon]), {
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
      if (onPointClick && p.key) m.on('click', () => onPointClick(p.key as string))
    })

    // Anclas fijas destacadas: hotel y aeropuerto
    ;(anchors ?? []).filter((a) => typeof a.lat === 'number').forEach((a) => {
      const emoji = a.kind === 'hotel' ? '🏨' : '✈️'
      const icon = L.divIcon({
        className: 'map-pin-wrap',
        html: `<div class="map-anchor ${a.kind}">${emoji}</div>`,
        iconSize: [34, 34],
        iconAnchor: [17, 17],
      })
      L.marker([a.lat, a.lon], { icon, zIndexOffset: 200 }).addTo(map).bindPopup(`<b>${emoji} ${a.label}</b>`, { closeButton: false })
    })

    // Sitios "por explorar" cerca: pin secundario en otro color, fuera de la ruta
    ;(extraPoints ?? []).filter((p) => typeof p.lat === 'number').forEach((p) => {
      const icon = L.divIcon({
        className: 'map-pin-wrap',
        html: `<div class="map-pin extra">${p.emoji ?? '+'}</div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      })
      const m = L.marker([p.lat, p.lon], { icon, zIndexOffset: -100 }).addTo(map)
      if (p.label) m.bindPopup(`<b>${p.label}</b><br><span style="color:#888">Está en Explorar — puedes añadirlo</span>`, { closeButton: false })
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
  }, [JSON.stringify(points), JSON.stringify(extraPoints), JSON.stringify(anchors), height, routeCount])

  // Recalcular tamaño al entrar/salir de pantalla completa
  useEffect(() => {
    const map = mapRef.current
    if (!map) return
    const valid = points.filter((p) => typeof p.lat === 'number' && typeof p.lon === 'number')
    const t = setTimeout(() => {
      map.invalidateSize()
      if (valid.length) map.fitBounds(L.latLngBounds(valid.map((p) => [p.lat, p.lon] as [number, number])), { padding: [full ? 60 : fitPadding, full ? 60 : fitPadding], maxZoom: 14 })
    }, 120)
    if (full) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { clearTimeout(t); document.body.style.overflow = '' }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [full])

  return (
    <div className={`trip-map-shell ${full ? 'full' : ''}`}>
      <div ref={ref} className={`trip-map ${rounded && !full ? 'rounded' : ''}`} style={{ height: full ? '100%' : height }} />
      {full && caption && <span className="map-cap map-cap-full">{caption}</span>}
      {expandable && (
        <button className={`map-expand ${full ? 'is-full' : ''}`} onClick={() => setFull((f) => !f)} aria-label={full ? 'Cerrar mapa' : 'Ampliar mapa'}>
          {full ? '✕ Cerrar' : '⤢'}
        </button>
      )}
    </div>
  )
}
