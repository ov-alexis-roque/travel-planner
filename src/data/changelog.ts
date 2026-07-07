// Notas de versión que se muestran en el aviso de actualización de la PWA.
// La primera entrada es la versión actual (debe coincidir con package.json).
export const changelog: { v: string; date: string; title: string; notes: string[] }[] = [
  {
    v: '1.14.0', date: 'Jul 2026', title: 'Restaurantes en el mapa + tocar para localizar',
    notes: [
      '🍴 Los sitios de "Dónde comer hoy" salen ahora en el mapa con un marcador propio (tenedor), distinto de las actividades: se ve de un vistazo si quedan cerca.',
      '📍 Toca un restaurante de la lista y el mapa hace zoom a su pin (igual que con las actividades).',
      '🗺️ Arreglado el zoom del mapa al tocar una actividad del itinerario (se había roto).',
      '🔽 El bloque "Dónde comer por la zona hoy" ahora se pliega y despliega.',
    ],
  },
  {
    v: '1.12.3', date: 'Jul 2026', title: 'Restaurantes foodie ya en Explorar (y añadibles)',
    notes: [
      '🍽️ Los restaurantes curados de "Sabores" ahora salen en Explorar → Restaurantes y se pueden AÑADIR al día (antes estaban escondidos).',
      '🧭 Guía de local en todas las visitas + dónde comer cerca por momento (desayuno/comida/cena/postre/copa), p. ej. Uluwatu.',
      '🍜 Platos típicos + restaurantes por destino: Singapur ~37, KL ~20, Ubud ~16, Sanur ~16.',
      '📍 Tocar un sitio en Explorar/Itinerario lo resalta y hace zoom en el mapa · 🎨 icono nuevo.',
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
