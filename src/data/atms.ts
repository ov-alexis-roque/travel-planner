// Cajeros orientativos por destino, cerca del hotel o del aeropuerto. Son ZONAS
// de cajeros conocidas (centros comerciales, calles principales, llegadas del
// aeropuerto), no máquinas exactas. En Borneo lo clave es: NO hay cajeros en la
// selva → marcar los últimos en Sandakan y avisar.

export interface AtmPoint {
  name: string
  coords: { lat: number; lon: number }
  note?: string
}

export const atmsByDest: Record<string, AtmPoint[]> = {
  sin: [
    { name: 'Cajeros Orchard (ION / Lucky Plaza)', coords: { lat: 1.3041, lon: 103.8322 }, note: 'DBS/UOB/OCBC, a un paso del Holiday Inn.' },
    { name: 'Cajeros Marina Bay (Suntec / MBS)', coords: { lat: 1.2839, lon: 103.8585 }, note: 'Junto a la zona de shows.' },
    { name: 'Cajeros Changi (llegadas)', coords: { lat: 1.3564, lon: 103.9876 }, note: 'En el aeropuerto, nada más llegar.' },
  ],
  kl: [
    { name: 'Cajeros Suria KLCC', coords: { lat: 3.1581, lon: 101.7122 }, note: 'Maybank/CIMB bajo las Petronas, al lado del hotel.' },
    { name: 'Cajeros Bukit Bintang (Pavilion)', coords: { lat: 3.1488, lon: 101.7137 }, note: 'Zona de compras y Jalan Alor.' },
  ],
  sepilok: [
    { name: '⚠️ Últimos cajeros: Aeropuerto Sandakan', coords: { lat: 5.9009, lon: 118.0594 }, note: 'SACA AQUÍ ringgit: en Sepilok y el río NO hay cajeros.' },
    { name: 'Cajeros centro de Sandakan', coords: { lat: 5.8390, lon: 118.1170 }, note: 'Bancos en la ciudad, de camino al lodge.' },
  ],
  kinabatangan: [
    { name: '⚠️ Sin cajeros en el río Kinabatangan', coords: { lat: 5.5170, lon: 118.2950 }, note: 'Lleva el efectivo desde Sandakan/KL. El lodge es todo incluido.' },
  ],
  ubud: [
    { name: 'Cajeros Ubud centro (Jl. Raya Ubud)', coords: { lat: 8.5069 * -1, lon: 115.2628 }, note: 'BCA/Mandiri junto al mercado y el palacio.' },
    { name: 'Cajeros Monkey Forest Rd', coords: { lat: -8.5150, lon: 115.2605 }, note: 'A lo largo de la calle principal.' },
  ],
  gili: [
    { name: '⚠️ Cajeros Gili Air (puerto)', coords: { lat: -8.3540, lon: 116.0790 }, note: 'Escasos y caros, a veces sin servicio. Mejor saca rupias en Bali antes del barco.' },
  ],
  sanur: [
    { name: 'Cajeros Sanur (Jl. Danau Tamblingan)', coords: { lat: -8.6890, lon: 115.2615 }, note: 'BCA/BNI en la calle principal, cerca del hotel.' },
    { name: 'Cajeros zona playa/puerto Sanur', coords: { lat: -8.6960, lon: 115.2640 }, note: 'Junto al embarcadero de ferries.' },
  ],
}
