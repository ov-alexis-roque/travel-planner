// Notas de versión que se muestran en el aviso de actualización de la PWA.
// La primera entrada es la versión actual (debe coincidir con package.json).
export const changelog: { v: string; date: string; title: string; notes: string[] }[] = [
  {
    v: '1.16.1', date: 'Ago 2026', title: 'Restaurantes en el mapa de Explorar + fichas del pasaporte',
    notes: [
      '🍽️ Los ~100 restaurantes de la guía foodie ya salen como pin en el mapa de Explorar: el mapa muestra EXACTAMENTE lo que filtras en la lista (antes faltaban casi todos).',
      '📍 Pasa el ratón o toca una tarjeta y el pin se resalta (sin marear con zoom); al cambiar de filtro el mapa vuelve a la vista completa. Toca un pin y te lleva a su ficha en la lista.',
      '🛂 Pasaporte: toca un sello y se abre su ficha "¿qué es / cómo es?" para peques (emoji grande + descripción). Botón grande "¡Sellar!" (con confeti) y otro para ver una foto de verdad.',
      '🐒 Así Aira y Leo saben cómo es el mono narigudo o qué es un durian antes de buscarlos.',
    ],
  },
  {
    v: '1.15.0', date: 'Ago 2026', title: 'Días de Bali reordenados para esquivar masas',
    notes: [
      '🗓️ Excursiones de Sanur reordenadas para que los grandes imanes caigan ENTRE SEMANA: Nusa Penida (jue), Uluwatu (vie) y Waterbom (lun).',
      '🏖️ El fin de semana queda tranquilo: sábado relax en Sanur (surf + playa) y domingo el este de Bali (Lempuyang + Tirta Gangga), la zona menos turística.',
      '🔥 Uluwatu sale del domingo (evita el gentío y la fiesta de Single Fin) y ya no es el último día → se disfruta sin prisa.',
      '💦 Waterbom pasa al lunes: entre semana hay mucha menos cola y, al estar cerca y acabar pronto, es un último día ideal antes de volar.',
      '🌊 Tanah Lot queda como plan opcional del sábado (atardecer muy concurrido).',
    ],
  },
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
