import type { Climate, Stop } from '../types'

// Coordenadas y clima por destino (normales de julio-agosto).
export const destGeo: Record<string, { coords?: { lat: number; lon: number }; climate?: Climate }> = {
  sin: { coords: { lat: 1.2897, lon: 103.8501 }, climate: { tempDay: 31, tempNight: 26, label: 'Cálido y muy húmedo', advice: 'Chubascos posibles. Hidratarse, buscar AC al mediodía.' } },
  sepilok: { coords: { lat: 5.8740, lon: 117.9460 }, climate: { tempDay: 32, tempNight: 24, label: 'Selva húmeda, lluvias', advice: 'Manga larga al amanecer/anochecer. DEET siempre.' } },
  kinabatangan: { coords: { lat: 5.5170, lon: 118.2950 }, climate: { tempDay: 32, tempNight: 24, label: 'Tropical húmedo', advice: 'Aguas bajas en julio = mejor fauna. Bolsas estancas en barca.' } },
  kl: { coords: { lat: 3.1539, lon: 101.7120 }, climate: { tempDay: 32, tempNight: 25, label: 'Cálido, chubascos tarde', advice: 'Tormentas a media tarde. Aprovechar mañanas y malls con AC.' } },
  ubud: { coords: { lat: -8.5069, lon: 115.2625 }, climate: { tempDay: 29, tempNight: 22, label: 'Seco, noches frescas', advice: 'Estación seca en Bali. Mañanas frescas, sol fuerte al mediodía.' } },
  gili: { coords: { lat: -8.3560, lon: 116.0840 }, climate: { tempDay: 30, tempNight: 25, label: 'Seco y soleado', advice: 'Sol intenso sobre el agua. Protector biodegradable y sombra.' } },
  sanur: { coords: { lat: -8.6878, lon: 115.2620 }, climate: { tempDay: 29, tempNight: 24, label: 'Seco, brisa marina', advice: 'Época seca. Brisa agradable. Sol fuerte 11-15h.' } },
}

type Enrich = { stops?: Stop[]; highlights?: string[]; quickTips?: string[] }

export const dayEnrich: Record<string, Enrich> = {
  d0: {
    highlights: ['✈️ Vuelo BCN→SIN', '🌙 Nocturno 13h15'],
    quickTips: ['Estar en T1 BCN a las 9:00 (vuelo 11:40).', 'Intentar dormir en el avión: se llega a las 6:55.'],
    stops: [
      { n: 1, name: 'Aeropuerto BCN-El Prat (T1)', category: 'Aeropuerto', emoji: '🛫', coords: { lat: 41.2974, lon: 2.0833 }, time: '09:00', transitToNext: { mode: 'flight', note: 'SQ387 · 13h15' } },
      { n: 2, name: 'Changi Airport (T3)', category: 'Aeropuerto', emoji: '🛬', coords: { lat: 1.3564, lon: 103.9876 }, time: '06:55+1' },
    ],
  },
  d1: {
    highlights: ['🏖️ Playa Palawan', '🚡 Cable car', '😴 Recuperar jetlag'],
    quickTips: ['No forzar: día de recuperación.', 'Sentosa es ideal con jetlag — playa sin horarios.'],
    stops: [
      { n: 1, name: 'Changi Airport', category: 'Aeropuerto', emoji: '🛬', coords: { lat: 1.3564, lon: 103.9876 }, time: '06:55', transitToNext: { mode: 'train', min: 30, note: 'MRT a Orchard' } },
      { n: 2, name: 'Holiday Inn Orchard', category: 'Hotel', emoji: '🛏️', coords: { lat: 1.3048, lon: 103.8318 }, time: '09:00', note: 'Check-in + descanso 2-3h', transitToNext: { mode: 'train', min: 25, note: 'MRT + Sentosa Express' } },
      { n: 3, name: 'Playa Palawan (Sentosa)', category: 'Playa', emoji: '🏖️', coords: { lat: 1.2496, lon: 103.8226 }, time: 'Tarde', note: 'Arena, agua calmada, cable car opcional', transitToNext: { mode: 'train', min: 15 } },
      { n: 4, name: 'VivoCity', category: 'Comida', emoji: '🍽️', coords: { lat: 1.2643, lon: 103.8222 }, time: 'Cena', note: 'Food court con AC' },
    ],
  },
  d2: {
    highlights: ['🌿 Cloud Forest', '🦁 Night Safari', '🌳 Supertrees'],
    quickTips: ['⚠️ Reservar Cloud Forest y Night Safari online — se agotan.', 'Supertrees show gratis 19:45 antes del safari.'],
    stops: [
      { n: 1, name: 'Cloud Forest + Flower Dome', category: 'Naturaleza', emoji: '🌿', coords: { lat: 1.2816, lon: 103.8636 }, time: 'Mañana', hours: 'Abierto 9:00–21:00', note: 'Cascada interior con AC', status: 'pending', transitToNext: { mode: 'walk', min: 12 } },
      { n: 2, name: 'Maxwell Food Centre', category: 'Comida', emoji: '🍜', coords: { lat: 1.2807, lon: 103.8447 }, time: 'Mediodía', note: 'Tian Tian chicken rice', transitToNext: { mode: 'walk', min: 15 } },
      { n: 3, name: 'Merlion + Marina Bay', category: 'Mirador', emoji: '📸', coords: { lat: 1.2868, lon: 103.8545 }, time: 'Tarde', transitToNext: { mode: 'walk', min: 10 } },
      { n: 4, name: 'Supertree Grove (light show)', category: 'Show', emoji: '🌳', coords: { lat: 1.2820, lon: 103.8645 }, time: '19:45', note: 'Show gratis', transitToNext: { mode: 'car', min: 25, note: 'Grab a Mandai' } },
      { n: 5, name: 'Night Safari Mandai', category: 'Naturaleza', emoji: '🦁', coords: { lat: 1.4029, lon: 103.7886 }, time: '21:00', hours: 'Abre 19:30', note: 'Tram nocturno', status: 'pending' },
    ],
  },
  d3: {
    highlights: ['✈️ Trasbordo propio KUL', '⚠️ T4 sin MRT', '🛬 Llegada Sandakan'],
    quickTips: ['⚠️ AirAsia sale de T4 Changi (sin MRT) — Grab directo a "Terminal 4".', 'Trasbordo propio KLIA2: recoger maletas y re-check-in. 4h de margen.'],
    stops: [
      { n: 1, name: 'Changi Terminal 4', category: 'Aeropuerto', emoji: '⚠️', coords: { lat: 1.3386, lon: 103.9830 }, time: '10:10', note: 'AK704 · sin MRT, Grab directo', transitToNext: { mode: 'flight', min: 80, note: 'AK704 SIN→KUL' } },
      { n: 2, name: 'KLIA2 (trasbordo propio)', category: 'Aeropuerto', emoji: '🔁', coords: { lat: 2.7456, lon: 101.6865 }, time: '11:30', note: '4h escala · recoger maletas + re-check-in', transitToNext: { mode: 'flight', min: 155, note: 'AK5194 KUL→SDK' } },
      { n: 3, name: 'Sandakan Airport', category: 'Aeropuerto', emoji: '🛬', coords: { lat: 5.9009, lon: 118.0594 }, time: '19:05', transitToNext: { mode: 'car', min: 25, note: 'Grab a Sepilok' } },
      { n: 4, name: 'Sepilok Jungle Resort', category: 'Hotel', emoji: '🛏️', coords: { lat: 5.8740, lon: 117.9450 }, time: 'Noche', status: 'booked' },
    ],
  },
  d4: {
    highlights: ['🦧 Orangutanes', '🐻 Osos de sol', '🐒 Proboscis'],
    quickTips: ['Feeding orangutanes 10:00. Sun Bear a 5 min andando.', 'Labuk Bay: feeding tarde 17:30, mejor luz.'],
    stops: [
      { n: 1, name: 'Sepilok Orangutan Centre', category: 'Naturaleza', emoji: '🦧', coords: { lat: 5.8740, lon: 117.9492 }, time: '09:30', hours: 'Feeding 10:00', status: 'pending', transitToNext: { mode: 'walk', min: 5 } },
      { n: 2, name: 'Bornean Sun Bear Centre', category: 'Naturaleza', emoji: '🐻', coords: { lat: 5.8732, lon: 117.9480 }, time: '11:00', note: 'Único centro de osos de sol del mundo', transitToNext: { mode: 'car', min: 30 } },
      { n: 3, name: 'Labuk Bay Proboscis Sanctuary', category: 'Naturaleza', emoji: '🐒', coords: { lat: 5.9667, lon: 118.1500 }, time: '17:30', hours: 'Feeding tarde 17:30', status: 'pending' },
    ],
  },
  d5: {
    highlights: ['🌳 Canopy walkway', '🚤 Primer crucero', '🦎 Night walk'],
    quickTips: ['Rainforest Discovery abre 8:00 — ir temprano por las aves.', 'Transfer a Sukau ~2h, incluido (SeekSophie).'],
    stops: [
      { n: 1, name: 'Rainforest Discovery Centre', category: 'Naturaleza', emoji: '🌳', coords: { lat: 5.8780, lon: 117.9420 }, time: '08:00', hours: 'Abre 8:00', note: 'Canopy walkway 26m', status: 'pending', transitToNext: { mode: 'car', min: 120, note: 'Transfer a Sukau' } },
      { n: 2, name: 'Sukau Greenview Lodge', category: 'Hotel', emoji: '🛏️', coords: { lat: 5.5170, lon: 118.2950 }, time: '14:30', status: 'booked', transitToNext: { mode: 'boat', min: 10, note: 'Embarcadero' } },
      { n: 3, name: 'Crucero río Kinabatangan (tarde)', category: 'Naturaleza', emoji: '🚤', coords: { lat: 5.5200, lon: 118.3050 }, time: '15:30', note: 'Proboscis, cocodrilos, hornbills' },
    ],
  },
  d6: {
    highlights: ['🌅 Crucero amanecer', '🐘 Elefantes pigmeos', '🌟 Luciérnagas'],
    quickTips: ['Amanecer 06:00 = mejor hora para elefantes pigmeos.', 'Binoculares imprescindibles.'],
    stops: [
      { n: 1, name: 'Crucero amanecer', category: 'Naturaleza', emoji: '🌅', coords: { lat: 5.5180, lon: 118.2900 }, time: '06:00', note: 'Niebla, elefantes pigmeos', transitToNext: { mode: 'boat', min: 0 } },
      { n: 2, name: 'Crucero tarde', category: 'Naturaleza', emoji: '🚤', coords: { lat: 5.5230, lon: 118.3100 }, time: '15:30', transitToNext: { mode: 'boat', min: 0 } },
      { n: 3, name: 'Crucero luciérnagas (opcional)', category: 'Naturaleza', emoji: '🌟', coords: { lat: 5.5160, lon: 118.2960 }, time: 'Noche' },
    ],
  },
  d7: {
    highlights: ['🌅 Crucero amanecer', '🦇 Gomantong Cave', '🌿 Último día río'],
    quickTips: ['Gomantong: salida de millones de murciélagos al atardecer (~18:00).', 'Ropa que no importe manchar (cae guano).'],
    stops: [
      { n: 1, name: 'Crucero amanecer', category: 'Naturaleza', emoji: '🌅', coords: { lat: 5.5180, lon: 118.2900 }, time: '06:00', transitToNext: { mode: 'boat', min: 0 } },
      { n: 2, name: 'Crucero tarde', category: 'Naturaleza', emoji: '🚤', coords: { lat: 5.5230, lon: 118.3100 }, time: '15:30', transitToNext: { mode: 'car', min: 45, note: 'Furgoneta a Gomantong' } },
      { n: 3, name: 'Gomantong Cave', category: 'Naturaleza', emoji: '🦇', coords: { lat: 5.5333, lon: 118.0667 }, time: '18:00', note: 'Salida de murciélagos al atardecer' },
    ],
  },
  d8: {
    highlights: ['🌅 Crucero despedida', '✈️ SDK→KL', '🍢 Jalan Alor'],
    quickTips: ['Transfer al aeropuerto 09:00, vuelo 14:10 (2h30 margen).', 'KLIA Ekspres al centro: 28 min.'],
    stops: [
      { n: 1, name: 'Crucero amanecer (add-on)', category: 'Naturaleza', emoji: '🌅', coords: { lat: 5.5180, lon: 118.2900 }, time: '06:00', transitToNext: { mode: 'car', min: 150, note: 'Transfer a SDK' } },
      { n: 2, name: 'Sandakan Airport', category: 'Aeropuerto', emoji: '🛫', coords: { lat: 5.9009, lon: 118.0594 }, time: '11:30', transitToNext: { mode: 'flight', min: 180, note: 'MH2711 SDK→KUL' } },
      { n: 3, name: 'Star Suites KLCC', category: 'Hotel', emoji: '🛏️', coords: { lat: 3.1577, lon: 101.7120 }, time: '18:00', status: 'booked', transitToNext: { mode: 'walk', min: 12 } },
      { n: 4, name: 'Jalan Alor', category: 'Comida', emoji: '🍢', coords: { lat: 3.1457, lon: 101.7090 }, time: 'Noche', note: 'Street food' },
    ],
  },
  d9: {
    highlights: ['😴 Descanso', '🏊 Piscina', '🍢 Jalan Alor'],
    quickTips: ['Día suave tras 5 días de selva. Piscina prioritaria.'],
    stops: [
      { n: 1, name: 'KLCC Park', category: 'Parque', emoji: '🌳', coords: { lat: 3.1590, lon: 101.7140 }, time: 'Tarde', note: 'Playground y fuentes', transitToNext: { mode: 'walk', min: 10 } },
      { n: 2, name: "Madam Kwan's (KLCC)", category: 'Comida', emoji: '🍽️', coords: { lat: 3.1580, lon: 101.7130 }, time: 'Mediodía', transitToNext: { mode: 'walk', min: 15 } },
      { n: 3, name: 'Jalan Alor', category: 'Comida', emoji: '🍢', coords: { lat: 3.1457, lon: 101.7090 }, time: 'Noche' },
    ],
  },
  d10: {
    highlights: ['🏙️ Petronas', '🐠 Aquaria KLCC'],
    quickTips: ['⚠️ Petronas se agota — comprar online con fecha.', 'Aquaria justo debajo de las torres.'],
    stops: [
      { n: 1, name: 'Petronas Twin Towers', category: 'Mirador', emoji: '🏙️', coords: { lat: 3.1578, lon: 101.7117 }, time: 'Mañana', note: 'Skybridge + observatorio', status: 'pending', transitToNext: { mode: 'walk', min: 8 } },
      { n: 2, name: 'Madam Kwan\'s (Suria)', category: 'Comida', emoji: '🍽️', coords: { lat: 3.1580, lon: 101.7125 }, time: 'Mediodía', transitToNext: { mode: 'walk', min: 6 } },
      { n: 3, name: 'Aquaria KLCC', category: 'Naturaleza', emoji: '🐠', coords: { lat: 3.1533, lon: 101.7136 }, time: 'Tarde', note: 'Túnel con tiburones', status: 'pending' },
    ],
  },
  d11: {
    highlights: ['🙏 Batu Caves', '💦 Sunway Lagoon'],
    quickTips: ['Batu Caves 8am antes del calor (gratis, 272 escalones).', 'Sunway Lagoon: comprar online con descuento.'],
    stops: [
      { n: 1, name: 'Batu Caves', category: 'Templo', emoji: '🙏', coords: { lat: 3.2379, lon: 101.6840 }, time: '08:00', note: '272 escalones, estatua dorada', transitToNext: { mode: 'car', min: 40 } },
      { n: 2, name: 'Restoran Yut Kee', category: 'Comida', emoji: '🍳', coords: { lat: 3.1610, lon: 101.7000 }, time: 'Mediodía', note: 'Desde 1928', transitToNext: { mode: 'car', min: 35 } },
      { n: 3, name: 'Sunway Lagoon', category: 'Parque', emoji: '💦', coords: { lat: 3.0707, lon: 101.6075 }, time: 'Tarde', status: 'pending' },
    ],
  },
  d12: {
    highlights: ['🛍️ Central Market', '✈️ KL→Bali', '🌴 Llegada Ubud'],
    quickTips: ['⚠️ KLIA2 (AirAsia) ≠ KLIA1. Salir hotel 13:00.', 'Transfer DPS→Ubud pre-reservado (~1.5h).'],
    stops: [
      { n: 1, name: 'Central Market (Pasar Seni)', category: 'Mercado', emoji: '🛍️', coords: { lat: 3.1457, lon: 101.6957 }, time: 'Mañana', transitToNext: { mode: 'car', min: 50, note: 'Grab a KLIA2' } },
      { n: 2, name: 'KLIA2', category: 'Aeropuerto', emoji: '🛫', coords: { lat: 2.7456, lon: 101.6865 }, time: '13:50', transitToNext: { mode: 'flight', min: 190, note: 'AK398 KUL→DPS' } },
      { n: 3, name: 'Green Field Hotel Ubud', category: 'Hotel', emoji: '🛏️', coords: { lat: 5.5170, lon: 118.2950 }, time: '~21:00', status: 'booked' },
    ],
  },
  d13: {
    highlights: ['🌾 Tegallalang', '🐒 Monkey Forest', '🦆 Murni\'s'],
    quickTips: ['Tegallalang 8am antes de los tours.', '⚠️ Monkey Forest: sin comida ni gafas colgadas.'],
    stops: [
      { n: 1, name: 'Tegallalang Rice Terraces', category: 'Naturaleza', emoji: '🌾', coords: { lat: -8.4318, lon: 115.2797 }, time: '08:00', note: 'Arrozales UNESCO', transitToNext: { mode: 'car', min: 20 } },
      { n: 2, name: 'Sari Organik', category: 'Comida', emoji: '🥗', coords: { lat: -8.4900, lon: 115.2620 }, time: 'Mediodía', transitToNext: { mode: 'car', min: 15 } },
      { n: 3, name: 'Sacred Monkey Forest', category: 'Naturaleza', emoji: '🐒', coords: { lat: -8.5188, lon: 115.2585 }, time: 'Tarde', note: '700 monos', transitToNext: { mode: 'walk', min: 8 } },
      { n: 4, name: 'Ubud Market', category: 'Mercado', emoji: '🛍️', coords: { lat: -8.5069, lon: 115.2625 }, time: 'Tarde', transitToNext: { mode: 'car', min: 10 } },
      { n: 5, name: "Murni's Warung", category: 'Comida', emoji: '🦆', coords: { lat: -8.5040, lon: 115.2550 }, time: 'Cena', note: 'Bebek betutu — reservar', status: 'pending' },
    ],
  },
  d14: {
    highlights: ['🌿 Campuhan Ridge', '🙏 Tirta Empul', '🏊 Piscina'],
    quickTips: ['Campuhan al alba (opcional, según energía de Leo).', 'Tirta Empul antes de las 11h.'],
    stops: [
      { n: 1, name: 'Campuhan Ridge Walk', category: 'Naturaleza', emoji: '🌿', coords: { lat: -8.5050, lon: 115.2530 }, time: '7:30', note: 'Paseo entre arrozales', transitToNext: { mode: 'car', min: 25 } },
      { n: 2, name: 'Tirta Empul', category: 'Templo', emoji: '🙏', coords: { lat: -8.4156, lon: 115.3153 }, time: '10:30', note: 'Piscinas sagradas', transitToNext: { mode: 'car', min: 30 } },
      { n: 3, name: 'Warung Biah Biah', category: 'Comida', emoji: '🍲', coords: { lat: -8.5060, lon: 115.2600 }, time: 'Mediodía' },
    ],
  },
  d15: {
    highlights: ['🚐 Door-to-door', '⛵ Padang Bai→Gili', '🐢 Gili Air'],
    quickTips: ['⚠️ Reservar Bluewater Express ya — temporada alta.', 'Antimareos para Leo (travesía ~3h).'],
    stops: [
      { n: 1, name: 'Green Field Hotel Ubud', category: 'Hotel', emoji: '🛏️', coords: { lat: 5.5170, lon: 118.2950 }, time: '07:00', note: 'Pickup door-to-door', transitToNext: { mode: 'car', min: 45, note: 'Minivan a Padang Bai' } },
      { n: 2, name: 'Puerto Padang Bai', category: 'Puerto', emoji: '⚓', coords: { lat: -8.5300, lon: 115.5100 }, time: '09:00', transitToNext: { mode: 'ferry', min: 180, note: 'Barco a Gili Air' } },
      { n: 3, name: 'Manta Dive Gili Air', category: 'Hotel', emoji: '🏝️', coords: { lat: -8.3560, lon: 116.0840 }, time: '12:00', status: 'booked' },
    ],
  },
  d16: {
    highlights: ['🐢 Tortugas', '🤿 Snorkel', '🚴 Vuelta en bici'],
    quickTips: ['Tortugas desde la orilla, sin excursión.', 'Vuelta a la isla en bici ~45min.'],
    stops: [
      { n: 1, name: 'Snorkel costa norte', category: 'Playa', emoji: '🐢', coords: { lat: -8.3490, lon: 116.0820 }, time: 'Mañana', note: 'Tortugas marinas', transitToNext: { mode: 'walk', min: 10 } },
      { n: 2, name: 'Chiringuito playa', category: 'Comida', emoji: '🦞', coords: { lat: -8.3560, lon: 116.0850 }, time: 'Mediodía', transitToNext: { mode: 'walk', min: 5 } },
      { n: 3, name: 'Vuelta a la isla en bici', category: 'Aventura', emoji: '🚴', coords: { lat: -8.3600, lon: 116.0780 }, time: 'Tarde' },
    ],
  },
  d17: {
    highlights: ['🚤 Fast boat a Sanur', '🐟 Warung Mak Beng', '🏖️ Base 6 noches'],
    quickTips: ['⚠️ Directo 1.5-2h (NO 3.5h). Salida 8:30.', 'Base fija 6 noches — sin mover maletas.'],
    stops: [
      { n: 1, name: 'Embarcadero Gili Air', category: 'Puerto', emoji: '⚓', coords: { lat: -8.3620, lon: 116.0790 }, time: '08:30', transitToNext: { mode: 'ferry', min: 105, note: 'Fast boat directo a Sanur' } },
      { n: 2, name: 'Prime Plaza Suites Sanur', category: 'Hotel', emoji: '🛏️', coords: { lat: -8.6900, lon: 115.2630 }, time: '10:30', status: 'booked', transitToNext: { mode: 'walk', min: 6 } },
      { n: 3, name: 'Warung Mak Beng', category: 'Comida', emoji: '🐟', coords: { lat: -8.6790, lon: 115.2620 }, time: 'Almuerzo', note: 'Pescado frito desde 1941' },
    ],
  },
  d18: {
    highlights: ['🐠 Tirta Gangga', '🏛️ Gates of Heaven'],
    quickTips: ['Salir 8am. Lempuyang tiene cola — llegar pronto.', 'Coche privado todo el día (~45-50€).'],
    stops: [
      { n: 1, name: 'Tirta Gangga', category: 'Templo', emoji: '🐠', coords: { lat: -8.4120, lon: 115.5870 }, time: 'Mañana', note: 'Palacio del agua, carpas', transitToNext: { mode: 'car', min: 40 } },
      { n: 2, name: 'Pura Lempuyang (Gates of Heaven)', category: 'Templo', emoji: '🏛️', coords: { lat: -8.3900, lon: 115.6310 }, time: 'Tarde', note: 'Las puertas enmarcando el Agung' },
    ],
  },
  d19: {
    highlights: ['🦕 Kelingking', '🐠 Crystal Bay mantas'],
    quickTips: ['⚠️ Reservar fast boat con antelación.', 'No bajar a Kelingking con Leo — vista desde arriba.'],
    stops: [
      { n: 1, name: 'Puerto Sanur', category: 'Puerto', emoji: '⚓', coords: { lat: -8.6850, lon: 115.2680 }, time: 'Mañana', transitToNext: { mode: 'ferry', min: 45, note: 'Fast boat a Nusa Penida' } },
      { n: 2, name: 'Kelingking Beach', category: 'Mirador', emoji: '🦕', coords: { lat: -8.7510, lon: 115.4720 }, time: 'Mañana', note: 'Acantilado en T-Rex', transitToNext: { mode: 'car', min: 30 } },
      { n: 3, name: 'Crystal Bay', category: 'Playa', emoji: '🐠', coords: { lat: -8.7190, lon: 115.4520 }, time: 'Tarde', note: 'Snorkel mantas y tortugas' },
    ],
  },
  d20: {
    highlights: ['💦 Waterbom', '🏆 #1 de Asia'],
    quickTips: ['Abre 9am, llegar pronto. Online con descuento.', 'Leo pasa el mínimo (~90cm).'],
    stops: [
      { n: 1, name: 'Waterbom Bali', category: 'Parque', emoji: '💦', coords: { lat: -8.7220, lon: 115.1720 }, time: '09:00', hours: 'Abre 9:00', note: 'Mejor parque acuático de Asia', status: 'pending' },
    ],
  },
  d21: {
    highlights: ['🏯 Uluwatu', '🔥 Kecak Fire Dance'],
    quickTips: ['🔥 EL momento Bali. Salir 15:00, Kecak 18:00.', '⚠️ Monos roban gafas/móviles — guardar todo.'],
    stops: [
      { n: 1, name: 'Uluwatu Temple', category: 'Templo', emoji: '🏯', coords: { lat: -8.8291, lon: 115.0849 }, time: '15:00', note: 'Acantilado 70m, monos', transitToNext: { mode: 'walk', min: 5 } },
      { n: 2, name: 'Kecak Fire Dance', category: 'Show', emoji: '🔥', coords: { lat: -8.8295, lon: 115.0855 }, time: '18:00', note: '50 hombres + fuego + atardecer', status: 'pending', transitToNext: { mode: 'car', min: 20 } },
      { n: 3, name: 'Jimbaran (cena en la playa)', category: 'Comida', emoji: '🦐', coords: { lat: -8.7905, lon: 115.1620 }, time: 'Noche', note: 'Pescado a la brasa' },
    ],
  },
  d22: {
    highlights: ['🏄 Surf Aira', '🌊 Tanah Lot sunset'],
    quickTips: ['Tanah Lot: llegar 16:30, atardecer 18:00.', 'Última noche — preparar maletas.'],
    stops: [
      { n: 1, name: 'Playa de Sanur (surf)', category: 'Playa', emoji: '🏄', coords: { lat: -8.6850, lon: 115.2680 }, time: 'Mañana', note: 'Clase de surf para Aira', transitToNext: { mode: 'car', min: 45 } },
      { n: 2, name: 'Tanah Lot', category: 'Templo', emoji: '🌊', coords: { lat: -8.6212, lon: 115.0868 }, time: '16:30', note: 'Templo sobre el mar, atardecer' },
    ],
  },
  d23: {
    highlights: ['✈️ DPS→SIN', '✨ Changi 6.5h', '🏡 SQ388 a casa'],
    quickTips: ['Escala 6.5h en Changi: piscina T1 (niños gratis), cine, jardines.', 'Llegada BCN 5 Ago 06:55.'],
    stops: [
      { n: 1, name: 'Aeropuerto DPS (Ngurah Rai)', category: 'Aeropuerto', emoji: '🛫', coords: { lat: -8.7467, lon: 115.1668 }, time: '14:05', note: 'Scoot TR289', transitToNext: { mode: 'flight', min: 170, note: 'DPS→SIN' } },
      { n: 2, name: 'Changi (escala 6.5h)', category: 'Aeropuerto', emoji: '✨', coords: { lat: 1.3564, lon: 103.9876 }, time: '17:00', note: 'Piscina, cine, jardines', transitToNext: { mode: 'flight', min: 800, note: 'SQ388 a BCN' } },
      { n: 3, name: 'Barcelona (BCN)', category: 'Aeropuerto', emoji: '🏡', coords: { lat: 41.2974, lon: 2.0833 }, time: '5 Ago 06:55' },
    ],
  },
}
