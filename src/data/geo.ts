import type { Climate, Stop } from '../types'

// Coordenadas, clima y sol por destino (normales de julio-agosto).
export const destGeo: Record<string, { coords?: { lat: number; lon: number }; climate?: Climate; sun?: { rise: string; set: string } }> = {
  sin: { coords: { lat: 1.2897, lon: 103.8501 }, sun: { rise: '07:05', set: '19:11' }, climate: { tempDay: 31, tempNight: 26, label: 'Cálido y muy húmedo', advice: 'Chubascos posibles. Hidratarse, buscar AC al mediodía.' } },
  sepilok: { coords: { lat: 5.8740, lon: 117.9460 }, sun: { rise: '05:58', set: '18:20' }, climate: { tempDay: 32, tempNight: 24, label: 'Selva húmeda, lluvias', advice: 'Manga larga al amanecer/anochecer. DEET siempre.' } },
  kinabatangan: { coords: { lat: 5.5170, lon: 118.2950 }, sun: { rise: '05:55', set: '18:22' }, climate: { tempDay: 32, tempNight: 24, label: 'Tropical húmedo', advice: 'Aguas bajas en julio = mejor fauna. Bolsas estancas en barca.' } },
  kl: { coords: { lat: 3.1539, lon: 101.7120 }, sun: { rise: '07:08', set: '19:25' }, climate: { tempDay: 32, tempNight: 25, label: 'Cálido, chubascos tarde', advice: 'Tormentas a media tarde. Aprovechar mañanas y malls con AC.' } },
  ubud: { coords: { lat: -8.5069, lon: 115.2625 }, sun: { rise: '06:30', set: '18:08' }, climate: { tempDay: 29, tempNight: 22, label: 'Seco, noches frescas', advice: 'Estación seca en Bali. Mañanas frescas, sol fuerte al mediodía.' } },
  gili: { coords: { lat: -8.3560, lon: 116.0840 }, sun: { rise: '06:25', set: '18:05' }, climate: { tempDay: 30, tempNight: 25, label: 'Seco y soleado', advice: 'Sol intenso sobre el agua. Protector biodegradable y sombra.' } },
  sanur: { coords: { lat: -8.6878, lon: 115.2620 }, sun: { rise: '06:31', set: '18:09' }, climate: { tempDay: 29, tempNight: 24, label: 'Seco, brisa marina', advice: 'Época seca. Brisa agradable. Sol fuerte 11-15h.' } },
}

type Enrich = { stops?: Stop[]; highlights?: string[]; quickTips?: string[] }

// Plan "de máximos" como guía experto en familias y Sudeste Asiático.
// Cada día incluye desayuno/comida/cena y actividades sin huecos muertos.
export const dayEnrich: Record<string, Enrich> = {
  d0: {
    highlights: ['✈️ Vuelo BCN→SIN', '🌙 Nocturno 13h15'],
    quickTips: ['Estar en T1 BCN a las 9:00 (vuelo 11:40).', 'Cenad ligero a bordo e intentad dormir: aterrizáis a las 6:55.'],
    stops: [
      { n: 1, name: 'Aeropuerto BCN-El Prat (T1)', category: 'Aeropuerto', emoji: '🛫', coords: { lat: 41.2974, lon: 2.0833 }, time: '09:00', note: 'Facturación SQ387. Agua vacía para rellenar tras el control.', transitToNext: { mode: 'flight', note: 'SQ387 · 13h15 non-stop' } },
      { n: 2, name: 'Changi Airport (T3)', category: 'Aeropuerto', emoji: '🛬', coords: { lat: 1.3564, lon: 103.9876 }, time: '06:55+1', note: 'Inmigración rápida. Día 1 empieza aquí.' },
    ],
  },

  // ===================== SINGAPUR =====================
  d1: {
    highlights: ['🌳 Botanic Gardens', '🦁 Marina Bay', '💧 Spectra (show agua+luz)'],
    quickTips: [
      'Llegada directa al hotel: el Jewel (Rain Vortex) del aeropuerto lo veréis a la VUELTA, con la escala de 6.5h en Changi.',
      'Check-in real del hotel a las ~14:00 — por la mañana solo dejáis maletas en recepción.',
      '💧 Spectra es GRATIS: 20:00 y 21:00 en Marina Bay Sands. 🌇 Atardece a las 19:11.',
    ],
    stops: [
      { n: 1, name: 'Llegada Changi → Grab al hotel', category: 'Aeropuerto', emoji: '🛬', coords: { lat: 1.3564, lon: 103.9876 }, time: '06:55', note: 'Inmigración y directos al hotel para no perder la mañana. Hoy no paramos en el aeropuerto: el Jewel y su Rain Vortex los disfrutaréis a la vuelta, con la escala larga.',
        transitToNext: { mode: 'car', min: 25, note: 'Grab al hotel', line: 'Grab / taxi', board: 'Punto Grab/taxis en T3', alight: 'Holiday Inn Orchard', fare: '~25 SGD (~17€) los 4', tip: "Alternativa barata: MRT (East-West verde, cambio en Tanah Merah → North-South roja hasta Orchard), ~45-60 min y ~2 SGD/persona, pero con maletas es incómodo." } },
      { n: 2, name: 'Holiday Inn Orchard', category: 'Hotel', emoji: '🛏️', coords: { lat: 1.3048, lon: 103.8318 }, time: '09:30', note: 'Dejar maletas en recepción (check-in a las 14:00). Aseo, agua y a por la mañana.', status: 'booked',
        transitToNext: { mode: 'car', min: 12, note: 'Grab al Botanic Gardens', fare: '~8 SGD', tip: 'También MRT línea Downtown (azul) hasta Botanic Gardens, ~10 min.' } },
      { n: 3, name: 'Singapore Botanic Gardens + Orchid Garden', category: 'Naturaleza', emoji: '🌳', coords: { lat: 1.3138, lon: 103.8159 }, time: '10:30', hours: 'Abre 5:00 · Orchid Garden ~5 SGD', note: 'Patrimonio UNESCO, gratis. Mañana suave y a la sombra: lago de cisnes, ardillas, césped donde corren los niños y el jardín de orquídeas. Ideal con jet lag sin quedarse parados.',
        transitToNext: { mode: 'walk', min: 5, note: 'Dentro de los jardines' } },
      { n: 4, name: 'Comida: Casa Verde (en los jardines)', category: 'Comida', emoji: '🍜', coords: { lat: 1.3135, lon: 103.8166 }, time: '13:00', note: 'Pizzas y platos locales kid-friendly dentro del parque. Alternativa: hawker de Tiong Bahru Market (chwee kueh, lor mee).',
        transitToNext: { mode: 'car', min: 12, note: 'Vuelta al hotel' } },
      { n: 5, name: 'Holiday Inn — check-in + siesta', category: 'Hotel', emoji: '😴', coords: { lat: 1.3048, lon: 103.8318 }, time: '14:30', note: 'Check-in real, maletas a la habitación. Siesta o piscina 2h: ESTE es el reset del jet lag antes de la noche.', status: 'booked',
        transitToNext: { mode: 'train', min: 18, note: 'MRT a Marina Bay', line: 'MRT North-South (roja) + Downtown (azul)', board: 'Orchard', alight: 'Bayfront (Marina Bay Sands)', fare: '~1,5 SGD/persona', freq: 'cada 3-5 min' } },
      { n: 6, name: 'Merlion Park + waterfront', category: 'Mirador', emoji: '🦁', coords: { lat: 1.2868, lon: 103.8545 }, time: '17:00', note: 'Paseo por la bahía, foto con el Merlion y vistas a Marina Bay Sands. Atardecer ~19:11.',
        transitToNext: { mode: 'walk', min: 12, note: 'Paseo por el waterfront' } },
      { n: 7, name: 'Cena: Makansutra Gluttons Bay', category: 'Comida', emoji: '🍢', coords: { lat: 1.2895, lon: 103.8556 }, time: '18:45', note: 'Hawker al aire libre junto al agua: satay, chili crab, char kway teow. Fácil y rico antes del show.',
        transitToNext: { mode: 'walk', min: 8, note: 'Hasta el Event Plaza de MBS' } },
      { n: 8, name: 'Spectra — show de agua y luz', category: 'Show', emoji: '💧', coords: { lat: 1.2834, lon: 103.8607 }, time: '20:00', hours: 'Gratis · 20:00 y 21:00', note: 'Show de agua, láser y música en Marina Bay Sands. Sentaos en las gradas junto al agua. Grab de vuelta.' },
    ],
  },
  d2: {
    highlights: ['🌿 Cloud Forest', '🏖️ Sentosa', '🌳 Garden Rhapsody'],
    quickTips: [
      'Cloud Forest a primera hora: con AC, escapáis del calor del mediodía.',
      '🌳 Garden Rhapsody GRATIS: 19:45 y 20:45 en los Supertrees.',
      'Mañana (15 Jul) vuelos a Borneo: dejad la maleta lista esta noche (mochila pequeña aparte).',
    ],
    stops: [
      { n: 1, name: 'Desayuno: Ya Kun Kaya Toast', category: 'Comida', emoji: '🍞', coords: { lat: 1.3040, lon: 103.8320 }, time: '08:15', note: 'Kaya toast con huevo pasado por agua y kopi — desayuno singapurense clásico cerca del hotel.',
        transitToNext: { mode: 'train', min: 20, note: 'MRT a Gardens by the Bay', line: 'Downtown (azul)', alight: 'Bayfront', fare: '~1,5 SGD' } },
      { n: 2, name: 'Cloud Forest + Flower Dome', category: 'Naturaleza', emoji: '🌿', coords: { lat: 1.2816, lon: 103.8636 }, time: '09:00', hours: 'Abre 9:00', note: 'Cascada interior con AC. Pasarela entre la niebla. Reservar online. Combo con Flower Dome.', status: 'pending',
        transitToNext: { mode: 'walk', min: 8, note: 'A Satay by the Bay' } },
      { n: 3, name: 'Comida: Satay by the Bay', category: 'Comida', emoji: '🍢', coords: { lat: 1.2812, lon: 103.8669 }, time: '12:00', note: 'Hawker dentro de los jardines: satay, fideos, zumos. A la sombra.',
        transitToNext: { mode: 'train', min: 30, note: 'MRT a Sentosa (HarbourFront + Sentosa Express)', line: 'North-East (morada)', alight: 'HarbourFront → Sentosa Express', fare: '~2 SGD + 4 SGD Express' } },
      { n: 4, name: 'Sentosa — Playa Palawan', category: 'Playa', emoji: '🏖️', coords: { lat: 1.2496, lon: 103.8226 }, time: '13:30', note: 'Agua calmada, hamacas, puente al islote. Cable car opcional con vistas. Plan B con calor/lluvia: S.E.A. Aquarium (túnel de tiburones).',
        transitToNext: { mode: 'train', min: 30, note: 'Vuelta a Gardens by the Bay' } },
      { n: 5, name: 'OCBC Skyway (Supertrees)', category: 'Mirador', emoji: '🌉', coords: { lat: 1.2825, lon: 103.8640 }, time: '18:45', hours: '~10 SGD', note: 'Pasarela a 22m entre los Supertrees al atardecer (~19:11). Cena rápida en Satay by the Bay antes.',
        transitToNext: { mode: 'walk', min: 3 } },
      { n: 6, name: 'Garden Rhapsody — show de luz', category: 'Show', emoji: '🌳', coords: { lat: 1.2820, lon: 103.8645 }, time: '19:45', hours: 'Gratis · 19:45 y 20:45', note: 'Luz y sonido bajo los Supertrees, tumbados en el césped. Cierre perfecto de Singapur.' },
    ],
  },

  // ===================== SIN → BORNEO =====================
  d3: {
    highlights: ['✈️ Trasbordo propio KUL', '⚠️ T4 sin MRT', '🦧 Noche en Sepilok'],
    quickTips: [
      '⚠️ AirAsia sale de T4 Changi (sin MRT) — Grab directo a "Changi Airport Terminal 4".',
      'Trasbordo propio KLIA2: recoger maletas y re-check-in. 4h de margen — comer sin prisa allí.',
      'Cambiad algo de efectivo a ringgit (MYR) en KLIA2 para el Grab/cena en Sandakan.',
    ],
    stops: [
      { n: 1, name: 'Changi Terminal 4', category: 'Aeropuerto', emoji: '⚠️', coords: { lat: 1.3386, lon: 103.9830 }, time: '08:30', note: 'Desayuno rápido en el hotel y Grab a T4 (sin MRT). Facturar AK704.',
        transitToNext: { mode: 'flight', min: 80, note: 'AK704 SIN→KUL 10:10' } },
      { n: 2, name: 'KLIA2 — escala + comida', category: 'Aeropuerto', emoji: '🔁', coords: { lat: 2.7456, lon: 101.6865 }, time: '11:30', note: '4h de trasbordo propio: recoger maletas, re-check-in AK5194. Comer en el food court de KLIA2 (nasi lemak, Old Town White Coffee).',
        transitToNext: { mode: 'flight', min: 155, note: 'AK5194 KUL→SDK 15:30' } },
      { n: 3, name: 'Sandakan Airport', category: 'Aeropuerto', emoji: '🛬', coords: { lat: 5.9009, lon: 118.0594 }, time: '19:05', note: 'Grab al hotel en Sepilok (~25 min).',
        transitToNext: { mode: 'car', min: 25, note: 'Grab a Sepilok', fare: '~30-40 MYR' } },
      { n: 4, name: 'Cena en Sepilok + Sepilok Jungle Resort', category: 'Hotel', emoji: '🛏️', coords: { lat: 5.8740, lon: 117.9450 }, time: '20:00', note: 'Check-in. Cena en el restaurante del resort (junto al lago, ranas y luciérnagas). A dormir: mañana orangutanes a las 10:00.', status: 'booked' },
    ],
  },

  // ===================== BORNEO — SEPILOK =====================
  d4: {
    highlights: ['🦧 Orangutanes', '🐻 Osos de sol', '🐒 Proboscis al atardecer'],
    quickTips: [
      'Feeding orangutanes 10:00. Llegar 30 min antes; guardar mochilas (los macacos roban).',
      'Sun Bear a 5 min andando del Orangutan Centre — se hacen juntos.',
      'Labuk Bay: feeding tarde 16:30, mejor luz y menos calor.',
    ],
    stops: [
      { n: 1, name: 'Desayuno en el resort', category: 'Comida', emoji: '🍳', coords: { lat: 5.8740, lon: 117.9450 }, time: '08:00', note: 'Desayuno tropical en el lodge. Ropa fresca, repelente DEET y gorra.',
        transitToNext: { mode: 'walk', min: 5, note: 'Al Orangutan Centre' } },
      { n: 2, name: 'Sepilok Orangutan Centre', category: 'Naturaleza', emoji: '🦧', coords: { lat: 5.8740, lon: 117.9492 }, time: '09:30', hours: 'Feeding 10:00', note: 'Plataforma de alimentación: orangutanes en semilibertad llegando por las cuerdas. Nursery con crías tras cristal.', status: 'pending',
        transitToNext: { mode: 'walk', min: 5 } },
      { n: 3, name: 'Bornean Sun Bear Centre', category: 'Naturaleza', emoji: '🐻', coords: { lat: 5.8732, lon: 117.9480 }, time: '11:00', hours: '~6€', note: 'El único centro del mundo de osos de sol. Pequeños y trepadores, encantan a los niños.',
        transitToNext: { mode: 'walk', min: 8, note: 'Al restaurante' } },
      { n: 4, name: 'Comida: Sepilok Bistro / lodge', category: 'Comida', emoji: '🍛', coords: { lat: 5.8745, lon: 117.9460 }, time: '12:30', note: 'Arroz nasi goreng, fideos, fruta. Después, descanso/piscina en el resort (calor de mediodía).',
        transitToNext: { mode: 'car', min: 35, note: 'Grab a Labuk Bay', fare: '~40 MYR' } },
      { n: 5, name: 'Labuk Bay Proboscis Sanctuary', category: 'Naturaleza', emoji: '🐒', coords: { lat: 5.9667, lon: 118.1500 }, time: '16:00', hours: 'Feeding 16:30', note: 'Monos narigudos endémicos sobre el manglar. Las narices enormes hacen reír. Plataforma A para fotos.',
        transitToNext: { mode: 'car', min: 35, note: 'Vuelta a Sepilok' } },
      { n: 6, name: 'Cena en el resort', category: 'Comida', emoji: '🍽️', coords: { lat: 5.8740, lon: 117.9450 }, time: '19:30', note: 'Cena tranquila. Preparar mochila: mañana Rainforest Discovery al alba y transfer a Sukau.' },
    ],
  },
  d5: {
    highlights: ['🌳 Canopy walkway', '🚤 Primer crucero', '🦎 Night walk'],
    quickTips: [
      'Rainforest Discovery abre 8:00 — ir temprano por las aves y el fresco.',
      'Transfer a Sukau ~2h, incluido (SeekSophie). Bolsas estancas a mano para la barca.',
      'A partir de aquí, poca/ninguna cobertura: descargad mapas y avisad en casa.',
    ],
    stops: [
      { n: 1, name: 'Rainforest Discovery Centre', category: 'Naturaleza', emoji: '🌳', coords: { lat: 5.8780, lon: 117.9420 }, time: '07:30', hours: 'Abre 8:00 · ~8€', note: 'Canopy walkway a 26m por selva virgen. Torres para cálaos y águilas. Leo en hombros.',
        transitToNext: { mode: 'walk', min: 10, note: 'Desayuno en el resort' } },
      { n: 2, name: 'Desayuno + check-out Sepilok', category: 'Comida', emoji: '🍳', coords: { lat: 5.8740, lon: 117.9450 }, time: '10:00', note: 'Desayuno tardío, últimas compras (repelente, agua) y check-out.',
        transitToNext: { mode: 'car', min: 120, note: 'Transfer incluido a Sukau (~2h)' } },
      { n: 3, name: 'Sukau Greenview Lodge', category: 'Hotel', emoji: '🛏️', coords: { lat: 5.5170, lon: 118.2950 }, time: '14:00', note: 'Check-in 2× Twin Deluxe. Pasarela de madera sobre el río Kinabatangan. Almuerzo incluido.', status: 'booked',
        transitToNext: { mode: 'boat', min: 5, note: 'Al embarcadero' } },
      { n: 4, name: 'Crucero río (tarde)', category: 'Naturaleza', emoji: '🚤', coords: { lat: 5.5200, lon: 118.3050 }, time: '15:30', note: 'Primer safari fluvial: proboscis, macacos, cocodrilos, cálaos. Guía Orang Sungai. Calibrar prismáticos.',
        transitToNext: { mode: 'boat', min: 5 } },
      { n: 5, name: 'Cena en el lodge + night walk', category: 'Naturaleza', emoji: '🦎', coords: { lat: 5.5170, lon: 118.2950 }, time: '19:30', note: 'Cena incluida y paseo nocturno con frontal: ranas, insectos palo, ojos de cocodrilo. Aventura de exploradores.' },
    ],
  },
  d6: {
    highlights: ['🌅 Crucero amanecer', '🐘 Elefantes pigmeos', '🌟 Luciérnagas'],
    quickTips: [
      'Amanecer 06:00 = mejor hora para elefantes pigmeos y orangutanes. Madrugón que vale la pena.',
      'Mediodía de calor: descanso en la pasarela. Manga larga al atardecer (mosquitos).',
      'Prismáticos siempre encima.',
    ],
    stops: [
      { n: 1, name: 'Crucero del amanecer', category: 'Naturaleza', emoji: '🌅', coords: { lat: 5.5180, lon: 118.2900 }, time: '06:00', note: 'Niebla sobre el río, silencio total. La mejor sesión: elefantes pigmeos en las orillas si hay suerte.',
        transitToNext: { mode: 'boat', min: 5, note: 'Al lodge a desayunar' } },
      { n: 2, name: 'Desayuno en el lodge', category: 'Comida', emoji: '🍳', coords: { lat: 5.5170, lon: 118.2950 }, time: '08:30', note: 'Desayuno incluido. Tiempo libre en la pasarela; los niños exploran con el guía.',
        transitToNext: { mode: 'boat', min: 5 } },
      { n: 3, name: 'Trek / Oxbow lake (opcional)', category: 'Naturaleza', emoji: '🥾', coords: { lat: 5.5230, lon: 118.2980 }, time: '11:00', note: 'Mini-trek por la jungla o visita al lago en herradura buscando aves y monos (según guía). Si aprieta el calor, piscina/descanso.',
        transitToNext: { mode: 'boat', min: 5, note: 'Comida en el lodge' } },
      { n: 4, name: 'Comida en el lodge', category: 'Comida', emoji: '🍛', coords: { lat: 5.5170, lon: 118.2950 }, time: '13:00', note: 'Almuerzo incluido. Siesta en la habitación o hamaca.',
        transitToNext: { mode: 'boat', min: 5 } },
      { n: 5, name: 'Crucero de la tarde', category: 'Naturaleza', emoji: '🚤', coords: { lat: 5.5230, lon: 118.3100 }, time: '15:30', note: 'Segunda sesión: distinta luz y fauna. Proboscis, cálaos, cocodrilos.',
        transitToNext: { mode: 'boat', min: 5 } },
      { n: 6, name: 'Cena + crucero de luciérnagas', category: 'Naturaleza', emoji: '🌟', coords: { lat: 5.5160, lon: 118.2960 }, time: '20:00', note: 'Cena incluida y crucero opcional de luciérnagas: árboles parpadeando como un árbol de Navidad natural.' },
    ],
  },
  d7: {
    highlights: ['🌅 Crucero amanecer', '🦇 Gomantong Cave', '🌿 Último día de río'],
    quickTips: [
      'Gomantong: salida de millones de murciélagos al atardecer (~18:00) — el momento clave.',
      'Llevar ropa que no importe manchar (cae guano) y calzado cerrado.',
      'Última noche en la selva: preparar mochilas para el aeropuerto mañana.',
    ],
    stops: [
      { n: 1, name: 'Crucero del amanecer', category: 'Naturaleza', emoji: '🌅', coords: { lat: 5.5180, lon: 118.2900 }, time: '06:00', note: 'Tercer amanecer en el río. El guía ajusta la ruta según avistamientos. Última caza de elefantes pigmeos.',
        transitToNext: { mode: 'boat', min: 5 } },
      { n: 2, name: 'Desayuno + mañana libre', category: 'Comida', emoji: '🍳', coords: { lat: 5.5170, lon: 118.2950 }, time: '08:30', note: 'Desayuno incluido. Relax en la pasarela, fotos, lectura. Comida en el lodge a mediodía.',
        transitToNext: { mode: 'boat', min: 5 } },
      { n: 3, name: 'Crucero de la tarde', category: 'Naturaleza', emoji: '🚤', coords: { lat: 5.5230, lon: 118.3100 }, time: '15:30', note: 'Último crucero vespertino del Kinabatangan, luz dorada. Despedida del río.',
        transitToNext: { mode: 'car', min: 45, note: 'Furgoneta a Gomantong' } },
      { n: 4, name: 'Gomantong Cave', category: 'Naturaleza', emoji: '🦇', coords: { lat: 5.5333, lon: 118.0667 }, time: '18:00', note: 'Cueva gigante: salida en espiral de millones de murciélagos al atardecer, con águilas cazándolos. Serpientes en la entrada.',
        transitToNext: { mode: 'car', min: 45, note: 'Vuelta al lodge' } },
      { n: 5, name: 'Cena en el lodge', category: 'Comida', emoji: '🍽️', coords: { lat: 5.5170, lon: 118.2950 }, time: '20:00', note: 'Cena incluida, última noche. Mochilas listas: mañana crucero de despedida y aeropuerto.' },
    ],
  },
  d8: {
    highlights: ['🌅 Crucero despedida', '✈️ SDK→KL', '🍢 Jalan Alor'],
    quickTips: [
      'Transfer al aeropuerto 09:00, vuelo 14:10 (2h30 de margen).',
      'KLIA Ekspres al centro: 28 min, MYR 55/adulto · 25/niño <12.',
      'Llegáis a KL con energía: cena de celebración en Jalan Alor.',
    ],
    stops: [
      { n: 1, name: 'Crucero del amanecer (add-on)', category: 'Naturaleza', emoji: '🌅', coords: { lat: 5.5180, lon: 118.2900 }, time: '06:00', note: 'Último abrazo al río. Niebla y silencio.',
        transitToNext: { mode: 'boat', min: 5, note: 'Desayuno + check-out' } },
      { n: 2, name: 'Desayuno + transfer a Sandakan', category: 'Comida', emoji: '🍳', coords: { lat: 5.5170, lon: 118.2950 }, time: '08:00', note: 'Check-out Sukau, foto con los guías. Transfer incluido al aeropuerto (salida 09:00, llegada 11:30).',
        transitToNext: { mode: 'car', min: 150, note: 'Transfer SeekSophie a SDK' } },
      { n: 3, name: 'Comida: English Tea House (Sandakan)', category: 'Comida', emoji: '🫖', coords: { lat: 5.8420, lon: 118.1170 }, time: '12:00', note: 'Si da tiempo, almuerzo colonial con vistas a la bahía. Si no, comer en el aeropuerto SDK.',
        transitToNext: { mode: 'flight', min: 180, note: 'MH2711 SDK→KUL 14:10' } },
      { n: 4, name: 'Star Suites KLCC', category: 'Hotel', emoji: '🛏️', coords: { lat: 3.1577, lon: 101.7120 }, time: '18:00', note: 'KLIA Ekspres a KL Sentral + Grab al hotel. Suite con vistas a las torres.', status: 'booked',
        transitToNext: { mode: 'walk', min: 12, note: 'A Jalan Alor' } },
      { n: 5, name: 'Cena: Jalan Alor', category: 'Comida', emoji: '🍢', coords: { lat: 3.1457, lon: 101.7090 }, time: '20:00', note: 'Calle de street food: satay, char kway teow, dim sum, zumos. Celebrar la semana de Borneo.' },
    ],
  },

  // ===================== KUALA LUMPUR =====================
  d9: {
    highlights: ['😴 Mañana de piscina', '🦜 KL Bird Park', '⛲ Fuentes KLCC'],
    quickTips: [
      'Día suave tras 5 días de selva: piscina del hotel por la mañana.',
      'KL Bird Park: el aviario libre más grande del mundo, con AC natural de selva.',
      'Las torres Petronas iluminadas + show de fuentes del KLCC Park por la noche (gratis).',
    ],
    stops: [
      { n: 1, name: 'Desayuno + piscina del hotel', category: 'Hotel', emoji: '🏊', coords: { lat: 3.1577, lon: 101.7120 }, time: '09:00', note: 'Recuperación: desayuno tranquilo y piscina con vistas a las Petronas.',
        transitToNext: { mode: 'car', min: 20, note: 'Grab a Lake Gardens', fare: '~12 MYR' } },
      { n: 2, name: 'KL Bird Park (Lake Gardens)', category: 'Naturaleza', emoji: '🦜', coords: { lat: 3.1430, lon: 101.6869 }, time: '10:30', hours: '9:00–18:00 · ~15€/ad', note: 'Aviario libre gigantesco: loros, cálaos, flamencos. Los niños dan de comer a las aves.',
        transitToNext: { mode: 'walk', min: 8, note: 'Almuerzo en el parque' } },
      { n: 3, name: 'Comida: Hornbill Restaurant', category: 'Comida', emoji: '🍛', coords: { lat: 3.1432, lon: 101.6875 }, time: '13:00', note: 'Restaurante dentro del Bird Park, con aves alrededor. Curry, fideos, ensaladas.',
        transitToNext: { mode: 'car', min: 20, note: 'Grab al hotel' } },
      { n: 4, name: 'Descanso / Suria KLCC', category: 'Compras', emoji: '🛍️', coords: { lat: 3.1580, lon: 101.7120 }, time: '15:30', note: 'Siesta o el centro comercial Suria (AC) bajo las Petronas si hace falta ropa.',
        transitToNext: { mode: 'walk', min: 5, note: 'Al KLCC Park' } },
      { n: 5, name: 'KLCC Park + show de fuentes', category: 'Parque', emoji: '⛲', coords: { lat: 3.1590, lon: 101.7140 }, time: '19:00', note: 'Playground y piscina de chapoteo; show de fuentes Lake Symphony al anochecer con las torres iluminadas.',
        transitToNext: { mode: 'walk', min: 12, note: 'A cenar' } },
      { n: 6, name: 'Cena: Jalan Alor', category: 'Comida', emoji: '🍢', coords: { lat: 3.1457, lon: 101.7090 }, time: '20:30', note: 'O Lot 10 Hutong (food court con AC) si prefieren tranquilidad.' },
    ],
  },
  d10: {
    highlights: ['🏙️ Petronas', '🐠 Aquaria KLCC', '🗼 KL Tower'],
    quickTips: [
      '⚠️ Petronas se agota — comprar online con fecha y hora. Cerrado los lunes.',
      'Aquaria está justo bajo las torres: combínalo sin moverte.',
      'KL Tower al atardecer: vistas y suelo de cristal (Sky Box).',
    ],
    stops: [
      { n: 1, name: 'Desayuno + Petronas Twin Towers', category: 'Mirador', emoji: '🏙️', coords: { lat: 3.1578, lon: 101.7117 }, time: '09:30', hours: 'Reserva online', note: 'Skybridge + observatorio. Desayuno antes en el hotel. Llegar 15 min antes del turno.', status: 'pending',
        transitToNext: { mode: 'walk', min: 8, note: 'A Suria KLCC' } },
      { n: 2, name: 'Comida: Madam Kwan\'s (Suria)', category: 'Comida', emoji: '🍽️', coords: { lat: 3.1580, lon: 101.7125 }, time: '12:30', note: 'Nasi lemak y laksa con vistas a las torres. Clásico familiar.',
        transitToNext: { mode: 'walk', min: 6, note: 'Bajo las torres' } },
      { n: 3, name: 'Aquaria KLCC', category: 'Naturaleza', emoji: '🐠', coords: { lat: 3.1533, lon: 101.7136 }, time: '14:00', hours: '10:00–20:00', note: 'Túnel de cristal con tiburones y rayas sobre la cabeza. Refugio del calor.', status: 'pending',
        transitToNext: { mode: 'car', min: 12, note: 'Grab a KL Tower' } },
      { n: 4, name: 'KL Tower — Sky Deck & Sky Box', category: 'Mirador', emoji: '🗼', coords: { lat: 3.1528, lon: 101.7039 }, time: '17:30', hours: '~25€', note: 'Mirador abierto y cajas de cristal voladizas. Atardecer ~19:25 sobre la ciudad.',
        transitToNext: { mode: 'car', min: 10, note: 'Grab a Bukit Bintang' } },
      { n: 5, name: 'Cena: Lot 10 Hutong', category: 'Comida', emoji: '🍜', coords: { lat: 3.1466, lon: 101.7110 }, time: '20:00', note: 'Los mejores puestos hawker de Malasia bajo un techo con AC. Para todos los gustos.' },
    ],
  },
  d11: {
    highlights: ['🙏 Batu Caves', '💦 Sunway Lagoon', '🍛 Nasi lemak'],
    quickTips: [
      'Batu Caves a las 8:00: 272 escalones de colores, antes del calor y los grupos. Gratis.',
      'Hombros/rodillas cubiertos en el templo. Cuidado con los macacos (comida escondida).',
      'Sunway Lagoon: comprar online con descuento. Medio día de desfogue acuático.',
    ],
    stops: [
      { n: 1, name: 'Batu Caves', category: 'Templo', emoji: '🙏', coords: { lat: 3.2379, lon: 101.6840 }, time: '08:00', hours: 'Gratis', note: 'Estatua dorada de 43m y escalera arcoíris a la cueva-templo. Macacos por todos lados. Llegar pronto.',
        transitToNext: { mode: 'car', min: 35, note: 'Grab a desayunar/comer', fare: '~25 MYR' } },
      { n: 2, name: 'Brunch: Restoran Yut Kee', category: 'Comida', emoji: '🍳', coords: { lat: 3.1610, lon: 101.7000 }, time: '10:30', note: 'Kopitiam desde 1928: roti babi, hainanese chicken chop, kaya toast. Institución de KL.',
        transitToNext: { mode: 'car', min: 35, note: 'Grab a Sunway Lagoon' } },
      { n: 3, name: 'Sunway Lagoon', category: 'Parque', emoji: '💦', coords: { lat: 3.0707, lon: 101.6075 }, time: '12:30', hours: '10:00–18:00', note: 'Parque acuático + atracciones: olas, tirolinas, zona infantil. Comer dentro. Medio día largo.', status: 'pending',
        transitToNext: { mode: 'car', min: 35, note: 'Grab al hotel a descansar' } },
      { n: 4, name: 'Cena: Village Park Nasi Lemak', category: 'Comida', emoji: '🍛', coords: { lat: 3.1300, lon: 101.6300 }, time: '20:00', note: 'Para muchos el mejor nasi lemak de KL (pollo rendang crujiente). O vuelta a Jalan Alor si queda cerca.' },
    ],
  },
  d12: {
    highlights: ['🛍️ Central Market', '✈️ KL→Bali', '🌴 Llegada a Ubud'],
    quickTips: [
      '⚠️ KLIA2 (AirAsia) ≠ KLIA1. Salir del hotel a las 13:00 (2h15 de margen).',
      'Transfer privado DPS→Ubud pre-reservado (~1.5h). Bali va 1h por delante de Malasia.',
      'Cambiad algo de efectivo a rupias (IDR) o sacad en cajero del aeropuerto DPS.',
    ],
    stops: [
      { n: 1, name: 'Central Market + Merdeka Square', category: 'Compras', emoji: '🛍️', coords: { lat: 3.1457, lon: 101.6957 }, time: '09:30', note: 'Mañana de artesanía, batik y souvenirs (con AC) y paseo por Merdeka Square. Último vistazo a KL.',
        transitToNext: { mode: 'car', min: 10, note: 'Grab a Bukit Bintang' } },
      { n: 2, name: 'Comida: Lot 10 Hutong', category: 'Comida', emoji: '🍜', coords: { lat: 3.1466, lon: 101.7110 }, time: '12:00', note: 'Comida rápida y rica antes del aeropuerto. Check-out del hotel y maletas.',
        transitToNext: { mode: 'car', min: 50, note: 'Grab a KLIA2', fare: '~75 MYR', tip: 'Salir 13:00. KLIA2 es la terminal de AirAsia (≠ KLIA).' } },
      { n: 3, name: 'KLIA2', category: 'Aeropuerto', emoji: '🛫', coords: { lat: 2.7456, lon: 101.6865 }, time: '13:50', note: 'Facturar AK398. Vuelo 16:05.',
        transitToNext: { mode: 'flight', min: 190, note: 'AK398 KUL→DPS' } },
      { n: 4, name: 'Transfer DPS → Green Field Hotel Ubud', category: 'Hotel', emoji: '🚗', coords: { lat: -8.5060, lon: 115.2620 }, time: '21:00', note: 'Transfer privado pre-reservado (~1.5h). Llegada ~21:00 (hora Bali). Cena ligera en el hotel o warung cercano.', status: 'booked' },
    ],
  },

  // ===================== UBUD =====================
  d13: {
    highlights: ['🌾 Tegallalang + columpios', '🐒 Monkey Forest', '🦆 Bebek betutu'],
    quickTips: [
      'Tegallalang a las 8:00, antes de los buses. Coche privado con conductor todo el día (~35-40€).',
      '⚠️ Monkey Forest: sin comida ni gafas/bolsos colgando — los macacos roban.',
      'Reservad Murni\'s la noche anterior y pedid el bebek betutu (24h de antelación).',
    ],
    stops: [
      { n: 1, name: 'Desayuno en el hotel', category: 'Comida', emoji: '🍳', coords: { lat: -8.5060, lon: 115.2620 }, time: '07:15', note: 'Desayuno temprano; conductor a las 7:45.',
        transitToNext: { mode: 'car', min: 25, note: 'Coche privado a Tegallalang' } },
      { n: 2, name: 'Tegallalang Rice Terraces + Bali Swing', category: 'Naturaleza', emoji: '🌾', coords: { lat: -8.4318, lon: 115.2797 }, time: '08:00', hours: '~2€ + columpios aparte', note: 'Arrozales UNESCO al fresco. Paseo entre bancales y columpios gigantes con vistas (con arnés para los niños).',
        transitToNext: { mode: 'car', min: 10, note: 'A comer entre arrozales' } },
      { n: 3, name: 'Comida: Sari Organik', category: 'Comida', emoji: '🥗', coords: { lat: -8.4900, lon: 115.2620 }, time: '12:00', note: 'Comida orgánica con vistas a los arrozales (se llega por un sendero bonito). Zumos frescos.',
        transitToNext: { mode: 'car', min: 15, note: 'Al Monkey Forest' } },
      { n: 4, name: 'Sacred Monkey Forest', category: 'Naturaleza', emoji: '🐒', coords: { lat: -8.5188, lon: 115.2585 }, time: '14:30', hours: '9:00–18:00 · ~5€', note: '700 macacos entre templos cubiertos de musgo y un río. Mágico (y respetuoso con las normas).',
        transitToNext: { mode: 'walk', min: 8, note: 'Al mercado y centro' } },
      { n: 5, name: 'Ubud Art Market + Palacio', category: 'Compras', emoji: '🧺', coords: { lat: -8.5069, lon: 115.2625 }, time: '16:00', note: 'Artesanía, telas y recuerdos; el Palacio Real de Ubud al lado. Helado o café.',
        transitToNext: { mode: 'car', min: 10, note: 'Al hotel a refrescarse' } },
      { n: 6, name: 'Cena: Murni\'s Warung', category: 'Comida', emoji: '🦆', coords: { lat: -8.5040, lon: 115.2550 }, time: '19:30', hours: 'Reservar', note: 'Bebek betutu (pato ahumado 24h) junto al puente Campuhan. Pedir con antelación.', status: 'pending' },
    ],
  },
  d14: {
    highlights: ['🌿 Campuhan al alba', '🙏 Tirta Empul', '🧑‍🍳 Clase de cocina'],
    quickTips: [
      'Campuhan Ridge al amanecer (~6:30): fresco, sombra y vacío. Según energía de Leo.',
      'Tirta Empul antes de las 11:00; llevar sarong (se alquila) para participar en la purificación.',
      'Tarde de clase de cocina o piscina — última noche en Ubud.',
    ],
    stops: [
      { n: 1, name: 'Campuhan Ridge Walk', category: 'Naturaleza', emoji: '🌿', coords: { lat: -8.5050, lon: 115.2530 }, time: '06:45', hours: 'Gratis', note: 'Loma de hierba entre valles al amanecer. Paseo suave y bonito antes del calor.',
        transitToNext: { mode: 'car', min: 10, note: 'Desayuno en el hotel' } },
      { n: 2, name: 'Desayuno en el hotel', category: 'Comida', emoji: '🍳', coords: { lat: -8.5060, lon: 115.2620 }, time: '08:30', note: 'Desayuno sin prisa. Conductor a las 9:30.',
        transitToNext: { mode: 'car', min: 30, note: 'Coche privado a Tirta Empul' } },
      { n: 3, name: 'Tirta Empul + Gunung Kawi', category: 'Templo', emoji: '🙏', coords: { lat: -8.4156, lon: 115.3153 }, time: '10:00', hours: '~4€', note: 'Templo de manantiales sagrados; los balineses se purifican bajo las fuentes. A 5 min, los santuarios tallados en roca de Gunung Kawi entre arrozales.',
        transitToNext: { mode: 'car', min: 25, note: 'A comer' } },
      { n: 4, name: 'Comida: Warung Biah Biah', category: 'Comida', emoji: '🍲', coords: { lat: -8.5060, lon: 115.2600 }, time: '13:00', note: 'Cocina balinesa auténtica y barata, favorita de locales.',
        transitToNext: { mode: 'car', min: 15, note: 'A la clase de cocina o al hotel' } },
      { n: 5, name: 'Clase de cocina balinesa (Paon) o piscina', category: 'Actividad', emoji: '🧑‍🍳', coords: { lat: -8.4900, lon: 115.2700 }, time: '15:00', hours: '~80€ familia', note: 'Cocinar en familia (visita a mercado + platos balineses). Alternativa relajada: piscina del hotel y spa.',
        transitToNext: { mode: 'car', min: 10, note: 'A cenar' } },
      { n: 6, name: 'Cena: Bebek Bengil (Dirty Duck)', category: 'Comida', emoji: '🦆', coords: { lat: -8.5147, lon: 115.2625 }, time: '19:30', note: 'Pato crujiente entre arrozales. Última cena en Ubud; preparar maletas para Gili.' },
    ],
  },

  // ===================== UBUD → GILI =====================
  d15: {
    highlights: ['🚐 Door-to-door', '⛵ Padang Bai→Gili', '🐢 Primer baño con tortugas'],
    quickTips: [
      '⚠️ Reservar Bluewater Express ya — temporada alta. Pickup en el hotel a las 7:00.',
      'Antimareos preventivo para Leo (travesía ~3h). Dry bag con lo importante a mano.',
      'En Gili no hay coches: maletas en cidomo (carro) o a pie desde el embarcadero.',
    ],
    stops: [
      { n: 1, name: 'Desayuno + check-out Ubud', category: 'Comida', emoji: '🍳', coords: { lat: -8.5060, lon: 115.2620 }, time: '06:30', note: 'Desayuno rápido (o pedir picnic). Mochilas listas la noche anterior.',
        transitToNext: { mode: 'car', min: 45, note: 'Minivan Bluewater a Padang Bai (incluido)' } },
      { n: 2, name: 'Puerto Padang Bai', category: 'Puerto', emoji: '⚓', coords: { lat: -8.5300, lon: 115.5100 }, time: '08:30', note: 'Embarque del fast boat. Antimareos 30 min antes.',
        transitToNext: { mode: 'ferry', min: 180, note: 'Fast boat a Gili Air' } },
      { n: 3, name: 'Manta Dive Gili Air + comida', category: 'Hotel', emoji: '🏝️', coords: { lat: -8.3560, lon: 116.0840 }, time: '12:00', note: 'Check-in frente al mar. Comida en la playa (poké, pescado). Sin coches, ritmo isla.', status: 'booked',
        transitToNext: { mode: 'walk', min: 8, note: 'A la costa norte' } },
      { n: 4, name: 'Snorkel + sunset', category: 'Playa', emoji: '🐢', coords: { lat: -8.3490, lon: 116.0820 }, time: '16:00', note: 'Primer snorkel con tortugas desde la orilla y atardecer (~18:05) en el lado oeste.',
        transitToNext: { mode: 'walk', min: 5 } },
      { n: 5, name: 'Cena en la playa', category: 'Comida', emoji: '🍤', coords: { lat: -8.3560, lon: 116.0850 }, time: '19:30', note: 'Pescado a la brasa con los pies en la arena. Cielo estrellado sin contaminación lumínica.' },
    ],
  },
  d16: {
    highlights: ['🐢 Tortugas', '🤿 Snorkel 3 Gilis', '🚴 Vuelta en bici'],
    quickTips: [
      'Tortugas desde la orilla por la mañana (mejor mar). Protector biodegradable.',
      'Snorkel trip en barca de fondo de cristal a Gili Meno (estatuas sumergidas) — fácil para niños.',
      'Vuelta a la isla en bici al atardecer (~45 min). Reservad el fast boat de mañana a Sanur.',
    ],
    stops: [
      { n: 1, name: 'Desayuno + snorkel tortugas', category: 'Playa', emoji: '🐢', coords: { lat: -8.3490, lon: 116.0820 }, time: '08:30', note: 'Desayuno en el resort y snorkel con tortugas en la costa norte, con el mar más calmado.',
        transitToNext: { mode: 'boat', min: 10, note: 'Barca de snorkel' } },
      { n: 2, name: 'Snorkel trip 3 Gilis (glass-bottom)', category: 'Actividad', emoji: '🤿', coords: { lat: -8.3550, lon: 116.0700 }, time: '10:30', hours: '~12€/persona', note: 'Arrecifes y las estatuas sumergidas entre Meno y Air. Fondo de cristal para quien no quiera mojarse.',
        transitToNext: { mode: 'walk', min: 5, note: 'A comer' } },
      { n: 3, name: 'Comida en chiringuito', category: 'Comida', emoji: '🦞', coords: { lat: -8.3560, lon: 116.0850 }, time: '13:00', note: 'Langosta y pescado fresco, barato. Siesta/sombra en las horas de más sol.',
        transitToNext: { mode: 'walk', min: 5 } },
      { n: 4, name: 'Vuelta a la isla en bici', category: 'Actividad', emoji: '🚴', coords: { lat: -8.3600, lon: 116.0780 }, time: '16:00', hours: 'Bici ~3€/h', note: 'Rodear Gili Air por caminos de arena, parando en calas. Leo en silla o cidomo.',
        transitToNext: { mode: 'walk', min: 8, note: 'Al lado oeste' } },
      { n: 5, name: 'Sunset West + cena', category: 'Comida', emoji: '🌅', coords: { lat: -8.3570, lon: 116.0760 }, time: '18:00', note: 'Columpios de mar y atardecer sobre el Agung. Cena en la playa. Maletas listas: mañana barco a Sanur.' },
    ],
  },

  // ===================== GILI → SANUR =====================
  d17: {
    highlights: ['🚤 Fast boat directo', '🐟 Warung Mak Beng', '🏖️ Base 6 noches'],
    quickTips: [
      '⚠️ Gili Air→Sanur DIRECTO es 1.5-2h (NO 3.5h). Salida 8:30.',
      'Base fija 6 noches en Sanur: sin mover maletas hasta el aeropuerto.',
      'Tarde tranquila para aterrizar en el ritmo costero.',
    ],
    stops: [
      { n: 1, name: 'Desayuno + embarcadero Gili Air', category: 'Puerto', emoji: '⚓', coords: { lat: -8.3620, lon: 116.0790 }, time: '07:30', note: 'Desayuno temprano, check-out y al muelle (cidomo con maletas).',
        transitToNext: { mode: 'ferry', min: 105, note: 'Fast boat directo a Sanur' } },
      { n: 2, name: 'Prime Plaza Suites Sanur + Mak Beng', category: 'Hotel', emoji: '🛏️', coords: { lat: -8.6900, lon: 115.2630 }, time: '10:45', note: 'Llegada Sanur. Dejar maletas (check-in 14:00). Almuerzo en Warung Mak Beng (pescado frito desde 1941, a 5 min).', status: 'booked',
        transitToNext: { mode: 'walk', min: 8, note: 'A la playa' } },
      { n: 3, name: 'Playa de Sanur + paseo marítimo', category: 'Playa', emoji: '🏖️', coords: { lat: -8.6850, lon: 115.2680 }, time: '14:00', note: 'Agua calmada ideal para Leo. Check-in real y descanso; alquilar bicis para el paseo de 5 km.',
        transitToNext: { mode: 'walk', min: 6, note: 'A cenar' } },
      { n: 4, name: 'Cena: Massimo (italiano)', category: 'Comida', emoji: '🍕', coords: { lat: -8.6920, lon: 115.2610 }, time: '19:30', note: 'Pizza, pasta y el famoso gelato — los niños lo agradecen a mitad de viaje.' },
    ],
  },
  d18: {
    highlights: ['🏛️ Gates of Heaven', '🐠 Tirta Gangga', '🚗 Este de Bali'],
    quickTips: [
      'Salir 8:00 con coche privado (~45-50€/día). Lempuyang primero para evitar la cola de la foto.',
      'Las "Gates of Heaven": la foto del reflejo es un truco con espejo del fotógrafo local.',
      'Hombros/rodillas cubiertos en los templos (sarong incluido).',
    ],
    stops: [
      { n: 1, name: 'Desayuno + salida temprano', category: 'Comida', emoji: '🍳', coords: { lat: -8.6900, lon: 115.2630 }, time: '07:15', note: 'Desayuno y conductor a las 8:00 (1.5h hasta el este).',
        transitToNext: { mode: 'car', min: 90, note: 'Coche privado a Lempuyang' } },
      { n: 2, name: 'Pura Lempuyang — Gates of Heaven', category: 'Templo', emoji: '🏛️', coords: { lat: -8.3900, lon: 115.6310 }, time: '09:30', hours: '~5€', note: 'Las puertas que enmarcan el volcán Agung. Llegar pronto: la cola para la foto crece rápido.',
        transitToNext: { mode: 'car', min: 40, note: 'A Tirta Gangga' } },
      { n: 3, name: 'Comida con vistas a arrozales', category: 'Comida', emoji: '🍛', coords: { lat: -8.4120, lon: 115.5850 }, time: '12:30', note: 'Warung con terraza sobre los campos del este (p.ej. cerca de Tirta Gangga). Cocina balinesa.',
        transitToNext: { mode: 'walk', min: 5 } },
      { n: 4, name: 'Tirta Gangga', category: 'Templo', emoji: '🐠', coords: { lat: -8.4120, lon: 115.5870 }, time: '14:00', hours: '~3€', note: 'Palacio del agua real: estanques de carpas gigantes y piedras para saltar sobre el agua. A los niños les encanta.',
        transitToNext: { mode: 'car', min: 90, note: 'Vuelta a Sanur' } },
      { n: 5, name: 'Cena en Sanur: Pregina Warung', category: 'Comida', emoji: '🍽️', coords: { lat: -8.6880, lon: 115.2600 }, time: '19:30', note: 'Cocina balinesa auténtica (nasi campur, sate lilit) de vuelta en Sanur.' },
    ],
  },
  d19: {
    highlights: ['🦕 Kelingking', '🐠 Crystal Bay (mantas)', '🏝️ Nusa Penida'],
    quickTips: [
      '⚠️ Reservar fast boat con antelación (salida ~8:30 de Sanur). Día intenso pero de los más espectaculares.',
      'Contratar conductor en la isla al llegar; las carreteras de Penida son malas — ir con calma.',
      'No bajar a la playa de Kelingking con Leo (sendero duro): la vista desde arriba es el premio.',
    ],
    stops: [
      { n: 1, name: 'Fast boat Sanur → Nusa Penida', category: 'Puerto', emoji: '🚤', coords: { lat: -8.6850, lon: 115.2680 }, time: '08:00', hours: '~80€ (4 pax)', note: 'Desayuno temprano y barco (45 min). Mar a veces movido: antimareos.', status: 'pending',
        transitToNext: { mode: 'car', min: 45, note: 'Conductor a Kelingking' } },
      { n: 2, name: 'Kelingking Beach (mirador)', category: 'Mirador', emoji: '🦕', coords: { lat: -8.7510, lon: 115.4720 }, time: '10:00', note: 'El acantilado en forma de T-Rex sobre agua turquesa. Vista desde arriba: una de las más espectaculares de Asia.',
        transitToNext: { mode: 'car', min: 25, note: 'A Crystal Bay' } },
      { n: 3, name: 'Comida cerca de Crystal Bay', category: 'Comida', emoji: '🍤', coords: { lat: -8.7180, lon: 115.4530 }, time: '12:30', note: 'Warung sencillo junto a la playa. Sombra y reponer fuerzas.',
        transitToNext: { mode: 'walk', min: 5 } },
      { n: 4, name: 'Crystal Bay — snorkel', category: 'Playa', emoji: '🐠', coords: { lat: -8.7190, lon: 115.4520 }, time: '14:00', note: 'Snorkel con mantas y tortugas en agua cristalina. Chaleco para Leo. Angel\'s Billabong si queda tiempo y marea baja.',
        transitToNext: { mode: 'ferry', min: 45, note: 'Fast boat de vuelta ~17:00' } },
      { n: 5, name: 'Cena en Sanur: Soul on the Beach', category: 'Comida', emoji: '🌅', coords: { lat: -8.6840, lon: 115.2660 }, time: '19:30', note: 'Cena con los pies en la arena de vuelta en Sanur. Ducha del salitre primero.' },
    ],
  },
  d20: {
    highlights: ['💦 Waterbom', '🏆 #1 de Asia', '🛝 Día de los peques'],
    quickTips: [
      'Abre 9:00: llegar pronto para hacer más toboganes. Comprar online con descuento.',
      'Leo pasa el mínimo (~90cm) en muchas atracciones; zona Kids\' Waterpark para los más pequeños.',
      'Día relajado: dejar la tarde para piscina del hotel.',
    ],
    stops: [
      { n: 1, name: 'Grab Sanur → Waterbom (Kuta)', category: 'Parque', emoji: '🚗', coords: { lat: -8.7000, lon: 115.2400 }, time: '08:30', note: 'Desayuno y Grab (~20 min, ~8€). Llevar bañadores puestos.',
        transitToNext: { mode: 'car', min: 20, note: 'A Kuta' } },
      { n: 2, name: 'Waterbom Bali', category: 'Parque', emoji: '💦', coords: { lat: -8.7220, lon: 115.1720 }, time: '09:00', hours: 'Abre 9:00 · ~120€', note: 'El mejor parque acuático de Asia, entre jardines tropicales. Toboganes para todas las edades.', status: 'pending',
        transitToNext: { mode: 'walk', min: 3, note: 'Food court interior' } },
      { n: 3, name: 'Comida dentro de Waterbom', category: 'Comida', emoji: '🍔', coords: { lat: -8.7222, lon: 115.1722 }, time: '13:00', note: 'Buen food court; no perder tiempo saliendo. Seguir hasta ~15:30-16:00.',
        transitToNext: { mode: 'car', min: 20, note: 'Grab al hotel' } },
      { n: 4, name: 'Piscina del hotel + descanso', category: 'Hotel', emoji: '🏊', coords: { lat: -8.6900, lon: 115.2630 }, time: '16:30', note: 'Descanso en la suite. Los niños reventados (en el buen sentido).',
        transitToNext: { mode: 'walk', min: 6, note: 'A cenar' } },
      { n: 5, name: 'Cena: Merta Sari o Mamma Mia', category: 'Comida', emoji: '🍽️', coords: { lat: -8.6890, lon: 115.2610 }, time: '19:30', note: 'Pescado picante balinés (Merta Sari) o italiano fácil (Mamma Mia) para los peques.' },
    ],
  },
  d21: {
    highlights: ['🏯 Uluwatu', '🔥 Kecak Fire Dance', '🦐 Jimbaran'],
    quickTips: [
      'Mañana de playa/piscina y salir 15:00 hacia Uluwatu (~1h). EL momento Bali.',
      '⚠️ Monos de Uluwatu roban gafas y móviles — guardarlo todo. Sarong incluido.',
      'Reservar el Kecak (18:00, ~15€/persona); llegar con tiempo para sitio con vistas.',
    ],
    stops: [
      { n: 1, name: 'Mañana de playa / piscina', category: 'Playa', emoji: '🏖️', coords: { lat: -8.6850, lon: 115.2680 }, time: '09:30', note: 'Descanso, snorkel suave en Sanur o piscina. Comida tranquila antes de salir.',
        transitToNext: { mode: 'car', min: 60, note: 'Coche privado a Uluwatu (salir 15:00)' } },
      { n: 2, name: 'Comida: Kayu Api / en Sanur', category: 'Comida', emoji: '🍴', coords: { lat: -8.6900, lon: 115.2620 }, time: '13:00', note: 'Brunch-comida en Sanur antes del traslado. Salir hacia Uluwatu a las 15:00.',
        transitToNext: { mode: 'car', min: 60, note: 'A Uluwatu' } },
      { n: 3, name: 'Uluwatu Temple', category: 'Templo', emoji: '🏯', coords: { lat: -8.8291, lon: 115.0849 }, time: '16:30', hours: '~5€', note: 'Templo al filo de un acantilado de 70m sobre el Índico. Paseo por el borde (cuidado con los monos).',
        transitToNext: { mode: 'walk', min: 5, note: 'Al anfiteatro del Kecak' } },
      { n: 4, name: 'Kecak Fire Dance', category: 'Show', emoji: '🔥', coords: { lat: -8.8295, lon: 115.0855 }, time: '18:00', hours: '~15€/persona', note: '50 hombres cantando en círculo alrededor del fuego con el sol hundiéndose en el mar. Espectáculo inolvidable.', status: 'pending',
        transitToNext: { mode: 'car', min: 25, note: 'A cenar a Jimbaran' } },
      { n: 5, name: 'Cena: marisco en Jimbaran', category: 'Comida', emoji: '🦐', coords: { lat: -8.7905, lon: 115.1620 }, time: '20:00', note: 'Pescado y marisco a la brasa con mesas en la arena y velas. Vuelta a Sanur ~21:30.' },
    ],
  },
  d22: {
    highlights: ['🏄 Surf para Aira', '🌊 Tanah Lot sunset', '🌅 Última noche'],
    quickTips: [
      'Sanur tiene olas suaves de arrecife: perfecto para la primera clase de surf de Aira.',
      'Tanah Lot: salir 15:30, llegar 16:30 para pasear antes del atardecer (~18:09).',
      'Preparar maletas por la tarde; mañana vuelo a las 14:05.',
    ],
    stops: [
      { n: 1, name: 'Clase de surf en Sanur', category: 'Actividad', emoji: '🏄', coords: { lat: -8.6850, lon: 115.2680 }, time: '08:30', hours: '~30€', note: 'Olas suaves para aprender; Leo juega en la orilla. Escuelas locales en la playa.',
        transitToNext: { mode: 'walk', min: 6, note: 'A comer' } },
      { n: 2, name: 'Comida: Kayu Api Smoke Grill', category: 'Comida', emoji: '☕', coords: { lat: -8.6900, lon: 115.2620 }, time: '12:30', note: 'BBQ y café de especialidad, favorito de Sanur. Tarde para hacer maletas y descansar.',
        transitToNext: { mode: 'car', min: 45, note: 'Grab a Tanah Lot (salir 15:30)' } },
      { n: 3, name: 'Tanah Lot', category: 'Templo', emoji: '🌊', coords: { lat: -8.6212, lon: 115.0868 }, time: '16:30', hours: '~5€', note: 'Templo del s.XVI sobre una roca en el mar. Con marea baja se acerca uno; serpientes sagradas en las rocas. Atardecer detrás del templo.',
        transitToNext: { mode: 'car', min: 45, note: 'Vuelta a Sanur' } },
      { n: 4, name: 'Cena de despedida en Sanur', category: 'Comida', emoji: '🌅', coords: { lat: -8.6840, lon: 115.2660 }, time: '19:45', note: 'El sitio favorito que hayáis descubierto (Soul on the Beach, Three Monkeys...). Brindis final. Maletas listas.' },
    ],
  },
  d23: {
    highlights: ['🏖️ Última mañana', '✈️ DPS→SIN', '🌧️ Jewel Rain Vortex'],
    quickTips: [
      'Check-out 11:00. Grab a DPS (~30 min). Comer en el aeropuerto.',
      'Escala de 6.5h en Changi: piscina T1 (niños gratis), cine, jardines y mariposas — aprovechadla.',
      'Llegada a BCN el 5 Ago a las 06:55.',
    ],
    stops: [
      { n: 1, name: 'Última mañana de playa + check-out', category: 'Playa', emoji: '🏖️', coords: { lat: -8.6850, lon: 115.2680 }, time: '09:00', note: 'Baño final en Sanur, desayuno y check-out a las 11:00. Últimas compras de souvenirs.',
        transitToNext: { mode: 'car', min: 30, note: 'Grab a DPS', fare: '~15€' } },
      { n: 2, name: 'Aeropuerto DPS — comida', category: 'Aeropuerto', emoji: '🛫', coords: { lat: -8.7467, lon: 115.1668 }, time: '12:00', note: 'Comer en Ngurah Rai antes del vuelo Scoot TR289 (14:05).',
        transitToNext: { mode: 'flight', min: 170, note: 'DPS→SIN' } },
      { n: 3, name: 'Changi — escala de 6.5h (Jewel)', category: 'Mirador', emoji: '🌧️', coords: { lat: 1.3601, lon: 103.9890 }, time: '17:00', note: 'Aprovechad la escala: JEWEL — Rain Vortex (la cascada interior más alta del mundo), jardines, red de saltos y laberintos de setos. Además piscina rooftop T1 (~20 SGD, niños gratis), cine gratis y jardín de mariposas. Cena aquí antes del vuelo.',
        transitToNext: { mode: 'flight', min: 800, note: 'SQ388 SIN→BCN 23:35' } },
      { n: 4, name: 'Barcelona (BCN)', category: 'Aeropuerto', emoji: '🏡', coords: { lat: 41.2974, lon: 2.0833 }, time: '5 Ago 06:55', note: 'Llegada a casa. Fin de un viaje de los que no se olvidan.' },
    ],
  },
}
