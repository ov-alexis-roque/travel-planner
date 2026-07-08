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
export interface MapAnchor { lat: number; lon: number; kind: 'hotel' | 'airport' | 'atm'; label: string; note?: string }

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
  foodPoints?: MapPoint[] // "dónde comer hoy": marcador distinto (tenedor), resaltable
  anchors?: MapAnchor[] // hotel / aeropuerto: iconos fijos destacados
  onPointClick?: (key: string) => void
  highlight?: string | null // key de un punto a resaltar/centrar (clic desde la lista)
}

// Mapa Leaflet con marcadores numerados y ruta. Online (tiles CARTO Voyager).
export default function TripMap({ points, height = 200, showRoute = true, routeColor = '#1a1a2a', interactive = true, rounded = true, fitPadding = 40, routeCount, expandable = true, caption, extraPoints, foodPoints, anchors, onPointClick, highlight }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const mapRef = useRef<L.Map | null>(null)
  const markersRef = useRef<Record<string, L.Marker>>({})
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
    markersRef.current = {}
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
      if (p.label) m.bindPopup(`<b>${p.label}</b>`, { closeButton: false, autoPan: false })
      if (onPointClick && p.key) m.on('click', () => onPointClick(p.key as string))
      if (p.key) markersRef.current[p.key] = m
    })

    // Anclas fijas destacadas: hotel, aeropuerto y cajeros
    ;(anchors ?? []).filter((a) => typeof a.lat === 'number').forEach((a) => {
      const emoji = a.kind === 'hotel' ? '🏨' : a.kind === 'airport' ? '✈️' : '🏧'
      const size = a.kind === 'atm' ? 28 : 34
      const icon = L.divIcon({
        className: 'map-pin-wrap',
        html: `<div class="map-anchor ${a.kind}">${emoji}</div>`,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
      })
      const popup = `<b>${emoji} ${a.label}</b>${a.note ? `<br><span style="color:#666">${a.note}</span>` : ''}`
      L.marker([a.lat, a.lon], { icon, zIndexOffset: a.kind === 'atm' ? 120 : 200 }).addTo(map).bindPopup(popup, { closeButton: false })
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

    // "Dónde comer hoy": marcador distinto (tenedor) para distinguir de las actividades.
    // Se registra en markersRef para poder resaltar/centrar al tocar la lista.
    ;(foodPoints ?? []).filter((p) => typeof p.lat === 'number' && !Number.isNaN(p.lat)).forEach((p) => {
      const icon = L.divIcon({
        className: 'map-pin-wrap',
        html: `<div class="map-pin food">🍴</div>`,
        iconSize: [26, 26],
        iconAnchor: [13, 13],
      })
      const m = L.marker([p.lat, p.lon], { icon, zIndexOffset: 60 }).addTo(map)
      if (p.label) m.bindPopup(`<b>🍴 ${p.label}</b>`, { closeButton: false })
      if (onPointClick && p.key) m.on('click', () => onPointClick(p.key as string))
      if (p.key) markersRef.current[p.key] = m
    })

    const boundPts = [...valid, ...(foodPoints ?? []).filter((p) => typeof p.lat === 'number' && !Number.isNaN(p.lat))]
    const bounds = L.latLngBounds(boundPts.map((p) => [p.lat, p.lon] as [number, number]))
    map.fitBounds(bounds, { padding: [fitPadding, fitPadding], maxZoom: 14 })

    // Recalcular tamaño tras montar (evita tiles grises). Se comprueba que el
    // mapa siga montado: si el componente se desmontó, invalidateSize sobre un
    // mapa ya eliminado lanza "_leaflet_pos undefined".
    setTimeout(() => { if (mapRef.current === map) { try { map.invalidateSize() } catch { /* desmontado */ } } }, 60)

    return () => {
      map.remove()
      mapRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(points), JSON.stringify(extraPoints), JSON.stringify(foodPoints), JSON.stringify(anchors), height, routeCount])

  // Resaltar y centrar el punto seleccionado desde la lista
  useEffect(() => {
    const map = mapRef.current
    if (!map) return
    // Quitar énfasis previo de todos los pines
    Object.values(markersRef.current).forEach((m) => m.getElement()?.querySelector('.map-pin')?.classList.remove('pin-hi'))
    if (!highlight) return
    const m = markersRef.current[highlight]
    if (!m) return

    // Se aplica en el siguiente frame para asegurar que el mapa ya está
    // dimensionado (flyTo/setView leen la posición del pane y, si el contenedor
    // mide 0×0, producen NaN y el error "_leaflet_pos undefined").
    let raf2 = 0
    const apply = () => {
      try {
        if (!mapRef.current) return
        // Asegura tamaño correcto antes de mover (mapa recién montado u oculto)
        map.invalidateSize(false)
        const size = map.getSize()
        if (!size || size.x === 0 || size.y === 0) return
        const ll = m.getLatLng()
        if (!ll || Number.isNaN(ll.lat) || Number.isNaN(ll.lng)) return
        // Resalta el pin. NO se hace zoom (marea al navegar): como mucho, un
        // paneo suave si el punto queda fuera de la vista, sin tocar el zoom.
        m.getElement()?.querySelector('.map-pin')?.classList.add('pin-hi')
        map.stop()
        if (!map.getBounds().pad(-0.12).contains(ll)) map.panTo(ll, { animate: true, duration: 0.4 })
        try { m.openPopup() } catch { /* autoPan puede fallar en mapas diminutos */ }
      } catch { /* mapa aún no listo: ignorar */ }
    }
    const raf1 = requestAnimationFrame(() => { raf2 = requestAnimationFrame(apply) })
    return () => { cancelAnimationFrame(raf1); cancelAnimationFrame(raf2) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [highlight])

  // Recalcular tamaño al entrar/salir de pantalla completa
  useEffect(() => {
    const map = mapRef.current
    if (!map) return
    const valid = points.filter((p) => typeof p.lat === 'number' && typeof p.lon === 'number')
    const t = setTimeout(() => {
      if (mapRef.current !== map) return
      try {
        map.invalidateSize()
        if (valid.length) map.fitBounds(L.latLngBounds(valid.map((p) => [p.lat, p.lon] as [number, number])), { padding: [full ? 60 : fitPadding, full ? 60 : fitPadding], maxZoom: 14 })
      } catch { /* desmontado */ }
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
