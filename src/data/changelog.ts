// Notas de versión que se muestran en el aviso de actualización de la PWA.
// La primera entrada es la versión actual (debe coincidir con package.json).
export const changelog: { v: string; date: string; title: string; notes: string[] }[] = [
  {
    v: '1.12.0', date: 'Jul 2026', title: 'Guías de local + foodie a tope + icono nuevo',
    notes: [
      '🧭 Guía de local en todas las visitas (recorrido, trucos, wow para peques y dónde comer cerca).',
      '🍜 Sabores muy ampliado y curado: Singapur ~37, KL ~20, Ubud ~16, Sanur ~16, Gili y Borneo — platos imprescindibles + restaurantes reales por categoría.',
      '📍 Tocar un sitio en Explorar/Itinerario lo resalta y hace ZOOM en el mapa.',
      '🎨 Icono nuevo de la app (tríptico Singapur–Borneo–Bali).',
    ],
  },
  {
    v: '1.6.0', date: 'Jul 2026', title: 'Guías locales (primeras oleadas)',
    notes: [
      '🧭 Guías de local en todas las visitas (secundarias incluidas): S.E.A. Aquarium, Petronas, Monkey Forest, Tegenungan, Campuhan…',
      '🍜 Curación foodie de los 7 destinos: platos imprescindibles + restaurantes reales (cerca de las visitas vs. merece la excursión).',
      '📍 Tocar un sitio en Explorar/Itinerario lo resalta en el mapa.',
      '🔄 Nuevo aviso de actualización con novedades (¡esto que ves!).',
    ],
  },
  {
    v: '1.3.0', date: 'Jul 2026', title: 'Maleta, pasaporte y mapas',
    notes: [
      '🎒 Maleta por persona con círculos por unidad y celebración para los peques.',
      '🖨️ Checklist imprimible de Aira y Leo.',
      '🛂 Mapa de sellos del pasaporte con geolocalización.',
      '🐛 Arreglados los checkboxes de Hoy y Tareas.',
    ],
  },
]
