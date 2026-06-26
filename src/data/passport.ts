// Pasaporte de Exploradores — colección de "sellos" que Aira y Leo van
// consiguiendo durante el viaje. Lugares, experiencias, comidas típicas y
// animales. Todo offline (se guarda en el dispositivo).

export interface Stamp { id: string; emoji: string; label: string; where?: string }
export interface StampCategory { id: string; title: string; icon: string; stamps: Stamp[] }

export const passportCategories: StampCategory[] = [
  {
    id: 'animales', title: 'Animales vistos', icon: '🦁',
    stamps: [
      { id: 'a-orangutan', emoji: '🦧', label: 'Orangután', where: 'Sepilok' },
      { id: 'a-sunbear', emoji: '🐻', label: 'Oso del sol', where: 'Sepilok' },
      { id: 'a-proboscis', emoji: '🐒', label: 'Mono narigudo', where: 'Río Kinabatangan' },
      { id: 'a-elephant', emoji: '🐘', label: 'Elefante pigmeo', where: 'Río Kinabatangan' },
      { id: 'a-hornbill', emoji: '🦅', label: 'Cálao (hornbill)', where: 'Borneo' },
      { id: 'a-croc', emoji: '🐊', label: 'Cocodrilo', where: 'Río Kinabatangan' },
      { id: 'a-bats', emoji: '🦇', label: 'Nube de murciélagos', where: 'Gomantong' },
      { id: 'a-fireflies', emoji: '✨', label: 'Luciérnagas', where: 'Río de noche' },
      { id: 'a-macaque', emoji: '🐵', label: 'Macaco', where: 'Batu Caves / Monkey Forest' },
      { id: 'a-turtle', emoji: '🐢', label: 'Tortuga marina', where: 'Gili Air' },
      { id: 'a-fish', emoji: '🐠', label: 'Peces de arrecife', where: 'Snorkel' },
      { id: 'a-monitor', emoji: '🦎', label: 'Varano / lagarto', where: 'Selva' },
    ],
  },
  {
    id: 'comidas', title: 'Comidas y platos típicos', icon: '🍜',
    stamps: [
      { id: 'f-chickenrice', emoji: '🍗', label: 'Hainanese chicken rice', where: 'Singapur' },
      { id: 'f-satay', emoji: '🍢', label: 'Satay', where: 'Singapur / KL' },
      { id: 'f-chilicrab', emoji: '🦀', label: 'Chili crab', where: 'Singapur' },
      { id: 'f-kaya', emoji: '🍞', label: 'Kaya toast + kopi', where: 'Singapur' },
      { id: 'f-laksa', emoji: '🍜', label: 'Laksa', where: 'Singapur / KL' },
      { id: 'f-nasilemak', emoji: '🍛', label: 'Nasi lemak', where: 'Kampung Baru (KL)' },
      { id: 'f-roti', emoji: '🫓', label: 'Roti canai', where: 'Malasia' },
      { id: 'f-bakkutteh', emoji: '🥘', label: 'Bak kut teh', where: 'Singapur' },
      { id: 'f-babiguling', emoji: '🐖', label: 'Babi guling', where: 'Ubud' },
      { id: 'f-bebek', emoji: '🦆', label: 'Bebek (pato balinés)', where: 'Ubud' },
      { id: 'f-nasigoreng', emoji: '🍚', label: 'Nasi / mie goreng', where: 'Bali' },
      { id: 'f-coconut', emoji: '🥥', label: 'Coco fresco', where: 'Playa' },
      { id: 'f-tehtarik', emoji: '🧋', label: 'Teh tarik', where: 'Malasia' },
      { id: 'f-gelato', emoji: '🍦', label: 'Helado / gelato', where: 'Bali' },
      { id: 'f-spicy', emoji: '🌶️', label: '¡Algo MUY picante!', where: 'Reto valiente' },
      { id: 'f-durian', emoji: '😬', label: 'Probar durian', where: 'Reto extremo' },
    ],
  },
  {
    id: 'lugares', title: 'Lugares y monumentos', icon: '🗺️',
    stamps: [
      { id: 'p-gardens', emoji: '🌳', label: 'Gardens by the Bay', where: 'Singapur' },
      { id: 'p-merlion', emoji: '🦁', label: 'El Merlion', where: 'Singapur' },
      { id: 'p-chinatown', emoji: '🏮', label: 'Chinatown', where: 'Singapur' },
      { id: 'p-sentosa', emoji: '🏖️', label: 'Playa de Sentosa', where: 'Singapur' },
      { id: 'p-batu', emoji: '🙏', label: 'Batu Caves', where: 'KL' },
      { id: 'p-petronas', emoji: '🏙️', label: 'Torres Petronas', where: 'KL' },
      { id: 'p-tegallalang', emoji: '🌾', label: 'Arrozales de Tegallalang', where: 'Ubud' },
      { id: 'p-monkeyforest', emoji: '🌳', label: 'Monkey Forest', where: 'Ubud' },
      { id: 'p-tirta', emoji: '💧', label: 'Tirta Empul', where: 'Ubud' },
      { id: 'p-uluwatu', emoji: '🔥', label: 'Uluwatu', where: 'Bali' },
      { id: 'p-tanahlot', emoji: '🌊', label: 'Tanah Lot', where: 'Bali' },
      { id: 'p-penida', emoji: '🦕', label: 'Nusa Penida', where: 'Bali' },
    ],
  },
  {
    id: 'experiencias', title: 'Experiencias', icon: '🎢',
    stamps: [
      { id: 'e-cruise', emoji: '🚤', label: 'Crucero al amanecer', where: 'Río Kinabatangan' },
      { id: 'e-lodge', emoji: '🛖', label: 'Dormir en la selva', where: 'Sukau' },
      { id: 'e-snorkel', emoji: '🤿', label: 'Snorkel con tortugas', where: 'Gili' },
      { id: 'e-spectra', emoji: '💧', label: 'Show Spectra', where: 'Marina Bay' },
      { id: 'e-rhapsody', emoji: '🌳', label: 'Garden Rhapsody', where: 'Supertrees' },
      { id: 'e-wings', emoji: '✨', label: 'Wings of Time', where: 'Sentosa' },
      { id: 'e-swing', emoji: '🌴', label: 'Bali Swing', where: 'Tegallalang' },
      { id: 'e-surf', emoji: '🏄', label: 'Clase de surf', where: 'Sanur' },
      { id: 'e-cidomo', emoji: '🐴', label: 'Paseo en cidomo', where: 'Gili Air' },
      { id: 'e-fastboat', emoji: '⛵', label: 'Viajar en fast boat', where: 'Bali ↔ Gili' },
      { id: 'e-waterbom', emoji: '💦', label: 'Waterbom', where: 'Bali' },
      { id: 'e-steps', emoji: '🪜', label: 'Subir los 272 escalones', where: 'Batu Caves' },
      { id: 'e-purify', emoji: '🙏', label: 'Purificarse en el manantial', where: 'Tirta Empul' },
    ],
  },
  {
    id: 'retos', title: 'Retos de viajero', icon: '🏅',
    stamps: [
      { id: 'r-graciasms', emoji: '🗣️', label: 'Decir "terima kasih"', where: 'A un camarero' },
      { id: 'r-bargain', emoji: '💰', label: 'Regatear en un mercado', where: 'Ubud / KL' },
      { id: 'r-map', emoji: '🧭', label: 'Guiar con el mapa', where: 'Un trayecto entero' },
      { id: 'r-sunrise', emoji: '🌅', label: 'Amanecer y atardecer el mismo día', where: 'Cualquier día' },
      { id: 'r-photo', emoji: '📸', label: 'La mejor foto del día', where: 'Cada día' },
      { id: 'r-newfood', emoji: '🍽️', label: 'Pedir un plato sin saber qué es', where: 'Reto sorpresa' },
    ],
  },
]

// Rangos por número de sellos (gamificación suave).
export const passportRanks = [
  { min: 0, label: 'Aprendiz de explorador', emoji: '🐣' },
  { min: 10, label: 'Explorador júnior', emoji: '🧭' },
  { min: 25, label: 'Aventurero', emoji: '🎒' },
  { min: 40, label: 'Gran explorador', emoji: '🏆' },
  { min: 55, label: 'Leyenda del viaje', emoji: '👑' },
]
