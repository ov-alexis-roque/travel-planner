// Curación foodie por destino: los platos que NO te puedes ir sin probar
// (qué son y por qué) + restaurantes/hawkers reales y curados, separando
// los que están CERCA de una actividad de los que MERECEN un viaje aparte.
// Singapur curado a partir de instituciones hawker (Michelin Bib Gourmand /
// leyendas locales); ampliable por destino en próximas oleadas.

export interface Dish {
  name: string
  emoji: string
  what: string // qué es: ingredientes y por qué probarlo
  tip?: string // cómo pedirlo / con qué / detalle de local
}

export interface FoodSpot {
  name: string
  dish: string // por qué es famoso / qué pedir
  area: string // barrio o hawker centre
  price: string // €/€€/€€€ orientativo
  why: string // por qué este y no otro
  near?: string // qué actividad/zona del viaje tiene al lado
  worthTrip?: boolean // merece desviarse aunque no pille de paso
  badge?: string // "Michelin", "Bib Gourmand", "leyenda hawker"…
}

export interface Gastronomy {
  blurb: string // el alma culinaria del destino en 1-2 frases
  dishes: Dish[]
  spots: FoodSpot[]
}

export const gastronomy: Record<string, Gastronomy> = {
  sin: {
    blurb: 'Singapur es la capital mundial del hawker: comida callejera china, malaya e india cocinada por maestros que llevan décadas con el mismo plato — barata, limpísima (mira la nota NEA) y con dos puestos con estrella Michelin. Comer aquí ES el viaje.',
    dishes: [
      { name: 'Hainanese chicken rice', emoji: '🍗', what: 'El plato nacional: pollo escalfado sedoso, arroz cocido en su caldo con jengibre y pandan, y salsa de chili-ajo. Aparentemente simple, adictivo de verdad.', tip: 'Se pide medio o entero para compartir; moja el pollo en la salsa de chili y jengibre.' },
      { name: 'Chili crab', emoji: '🦀', what: 'Cangrejo de barro en salsa espesa de tomate y chili, dulce y picante a la vez. El plato "de celebración" de Singapur.', tip: 'Pide mantou (bollitos fritos) para mojar la salsa: es lo mejor del plato. Alternativa menos picante: black pepper crab.' },
      { name: 'Laksa (estilo Katong)', emoji: '🍜', what: 'Fideos de arroz en caldo curry de coco con gambas, berberechos y tofu. Cremoso y con gambas.', tip: 'En Katong los fideos van cortados: se come solo con cuchara.' },
      { name: 'Char kway teow', emoji: '🍳', what: 'Fideos planos salteados al wok con soja oscura, berberechos, salchicha china, huevo y brotes. Ahumado del "wok hei".', tip: 'Pídelo con berberechos (cockles) para probarlo como los locales.' },
      { name: 'Satay', emoji: '🍢', what: 'Brochetas de pollo/ternera marinadas y a la brasa, con salsa de cacahuete, arroz en hoja (ketupat), pepino y cebolla.', tip: 'De noche en la Satay Street de Lau Pa Sat, al aire libre. Se pide por decenas.' },
      { name: 'Bak kut teh', emoji: '🥣', what: 'Sopa de costilla de cerdo con mucha pimienta y ajo (estilo Teochew, clara). Reconfortante a cualquier hora.', tip: 'Se acompaña de youtiao (churro salado) para mojar y té para "cortar" la grasa.' },
      { name: 'Kaya toast + huevos pasados por agua + kopi', emoji: '🍞', what: 'El desayuno de Singapur: tostada crujiente con mermelada de coco y huevo (kaya) y mantequilla, huevos casi crudos con soja y pimienta, y café kopi.', tip: 'Mojas la tostada en el huevo. Pide "kopi" (con leche condensada) o "kopi-o" (solo).' },
      { name: 'Roti prata', emoji: '🫓', what: 'Pan indio-musulmán hojaldrado a la plancha, con curry para mojar. Desayuno o cena barata.', tip: 'Prueba "prata kosong" (simple) y una "egg prata". Regado con teh tarik (té con leche "estirado").' },
      { name: 'Nasi lemak', emoji: '🍚', what: 'Arroz al coco con sambal picante, anchoas fritas, cacahuetes, huevo y pepino. Malayo, humilde y perfecto.', tip: 'El de Adam Road (Selera Rasa) es de los más queridos — al lado del Botánico.' },
      { name: 'Durian', emoji: '👑', what: 'El "rey de las frutas": cremosa, olor intenso, sabor único. Experiencia obligada para valientes.', tip: 'Cómprala abierta en Geylang. Prohibida en metro y hoteles por el olor: es parte de la broma.' },
    ],
    spots: [
      { name: 'Tian Tian Hainanese Chicken Rice', dish: 'chicken rice', area: 'Maxwell Food Centre · Chinatown', price: '€', why: 'El chicken rice más famoso de la ciudad, en pleno recorrido de Chinatown. Cola rápida.', near: 'Chinatown (día 2)', badge: 'Bib Gourmand' },
      { name: 'Hawker Chan', dish: 'soya sauce chicken rice', area: 'Chinatown Complex / Smith St', price: '€', why: 'El pollo en salsa de soja más barato del mundo con estrella Michelin. A 2 min de Tian Tian.', near: 'Chinatown (día 2)', badge: 'Michelin' },
      { name: 'Satay Street — Lau Pa Sat', dish: 'satay a la brasa', area: 'CBD (Boon Tat St)', price: '€€', why: 'Cada noche cortan la calle y se llena de humo de satay. Ambientazo al aire libre cerca de Marina Bay.', near: 'Marina Bay (día 2)' },
      { name: 'Satay by the Bay', dish: 'satay y marisco hawker', area: 'Gardens by the Bay', price: '€€', why: 'Hawker dentro de los jardines: cenáis ahí mismo antes del show de los Supertrees.', near: 'Gardens by the Bay (día 2, ya en el plan)' },
      { name: 'Makansutra Gluttons Bay', dish: 'char kway teow, BBQ stingray, satay', area: 'Esplanade · Marina Bay', price: '€€', why: 'Hawker icónico junto al agua, mirando a Marina Bay Sands. Perfecto antes/después del paseo del Merlion.', near: 'Marina Bay / Merlion (día 2)' },
      { name: 'Adam Road Food Centre', dish: 'nasi lemak (Selera Rasa), mee rebus', area: 'Bukit Timah', price: '€', why: 'Hawker de locales pegado al Jardín Botánico. La comida perfecta al salir del parque.', near: 'Botanic Gardens (día 1)' },
      { name: '328 Katong Laksa', dish: 'laksa de Katong', area: 'East Coast / Katong', price: '€', why: 'La laksa de fideos cortados que se come con cuchara. Merece la excursión al barrio Peranakan de casas de colores.', worthTrip: true, badge: 'leyenda local' },
      { name: 'Hill Street Tai Hwa Pork Noodle', dish: 'bak chor mee (fideos de cerdo)', area: 'Crawford / Lavender', price: '€', why: 'Puesto hawker con ESTRELLA Michelin. Cola larga pero es de esos "no te vas sin probarlo".', worthTrip: true, badge: 'Michelin ⭐' },
      { name: 'Jumbo Seafood', dish: 'chili crab + mantou', area: 'East Coast / Clarke Quay', price: '€€€', why: 'La experiencia del chili crab sentados, con el cangrejo entero. Reserva; es la cena "de celebración".', worthTrip: true },
      { name: 'Song Fa Bak Kut Teh', dish: 'sopa de costilla a la pimienta', area: 'New Bridge / Clarke Quay', price: '€€', why: 'El bak kut teh más querido, cerca del centro. Reconfortante y muy local.', near: 'Clarke Quay', badge: 'Bib Gourmand' },
    ],
  },
}
