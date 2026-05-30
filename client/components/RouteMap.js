
import { useEffect, useRef } from 'react'

const COORDS = {
  'Shanghai': [31.2304, 121.4737], 'Mumbai': [19.0760, 72.8777],
  'Kolkata': [22.5726, 88.3639], 'Delhi': [28.6139, 77.2090],
  'Chennai': [13.0827, 80.2707], 'Dubai': [25.2048, 55.2708],
  'Singapore': [1.3521, 103.8198], 'Rotterdam': [51.9244, 4.4777],
  'Hamburg': [53.5753, 10.0153], 'Guangzhou': [23.1291, 113.2644],
  'Colombo': [6.9271, 79.8612], 'Hong Kong': [22.3193, 114.1694],
  'Bangkok': [13.7563, 100.5018], 'Karachi': [24.8607, 67.0011],
  'London': [51.5074, -0.1278], 'New York': [40.7128, -74.0060],
  'Tokyo': [35.6762, 139.6503], 'Nhava Sheva': [18.9500, 72.9500],
  'Mundra': [22.8394, 69.7132], 'Jawaharlal Nehru': [18.9500, 72.9500],
}

const getCoords = (loc) => {
  if (!loc) return null
  const city = loc.split(',')[0].trim()
  return COORDS[city] || null
}

export default function RouteMap({ shipment, events }) {
  const mapRef = useRef(null)
  const mapInstance = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined' || !window.L || !mapRef.current) return
    if (mapInstance.current) { mapInstance.current.remove(); mapInstance.current = null }

    const L = window.L
    const originCoords = getCoords(shipment.origin)
    const destCoords = getCoords(shipment.destination)
    if (!originCoords || !destCoords) return

    const map = L.map(mapRef.current, { zoomControl: true, scrollWheelZoom: false })
    mapInstance.current = map

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: 'OpenStreetMap contributors', maxZoom: 19
    }).addTo(map)

    const makeIcon = (color, size) => L.divIcon({
      html: `<div style="width:${size}px;height:${size}px;background:${color};border-radius:50%;border:2px solid #fff;box-shadow:0 0 6px ${color};"></div>`,
      iconSize: [size, size], iconAnchor: [size/2, size/2], className: ''
    })

    L.marker(originCoords, { icon: makeIcon('#3fb950', 12) }).addTo(map)
      .bindPopup('<b>Origin:</b> ' + (shipment.origin || ''))
    L.marker(destCoords, { icon: makeIcon('#1c6ef3', 12) }).addTo(map)
      .bindPopup('<b>Destination:</b> ' + (shipment.destination || ''))

    L.polyline([originCoords, destCoords], {
      color: '#1c6ef3', weight: 2, dashArray: '6 4', opacity: 0.7
    }).addTo(map)

    events.forEach(e => {
      const coords = getCoords(e.location)
      if (coords) {
        L.marker(coords, { icon: makeIcon('#d29922', 8) }).addTo(map)
          .bindPopup('<b>' + e.raw_status + '</b><br>' + e.location)
      }
    })

    map.fitBounds(L.latLngBounds([originCoords, destCoords]), { padding: [40, 40] })

    return () => { if (mapInstance.current) { mapInstance.current.remove(); mapInstance.current = null } }
  }, [shipment, events])

  const originCoords = getCoords(shipment.origin)
  const destCoords = getCoords(shipment.destination)

  if (!originCoords || !destCoords) return (
    <div style={{ background: '#0d1117', border: '1px solid #21262d', borderRadius: 8, padding: '1rem', textAlign: 'center', marginBottom: 12 }}>
      <p style={{ fontSize: 12, color: '#484f58', margin: 0 }}>Map not available for this route — city not in database</p>
    </div>
  )

  return (
    <div style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid #21262d', marginBottom: 14, height: 220 }}>
      <div ref={mapRef} style={{ height: '100%', width: '100%' }} />
    </div>
  )
}
