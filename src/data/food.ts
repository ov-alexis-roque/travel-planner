// Curación foodie por destino: los platos que NO te puedes ir sin probar
// (qué son y por qué) + restaurantes/hawkers reales y curados, separando
// los que están CERCA de una actividad de los que MERECEN un viaje aparte.
// Todo son sitios reales y conocidos (instituciones hawker, Bib Gourmand,
// Michelin o leyendas locales), verificables en Google Maps.

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
    blurb: 'Singapur es la capital mundial del hawker: comida callejera china, malaya e india cocinada por maestros que llevan décadas con el mismo plato — barata, limpísima (mira la nota NEA) y con puestos con estrella Michelin. Comer aquí ES el viaje.',
    dishes: [
      { name: 'Hainanese chicken rice', emoji: '🍗', what: 'El plato nacional: pollo escalfado sedoso, arroz cocido en su caldo con jengibre y pandan, y salsa de chili-ajo.', tip: 'Se pide medio o entero para compartir; moja el pollo en la salsa de chili y jengibre.' },
      { name: 'Chili crab', emoji: '🦀', what: 'Cangrejo de barro en salsa espesa de tomate y chili, dulce y picante. El plato "de celebración".', tip: 'Pide mantou (bollitos fritos) para mojar. Menos picante: black pepper crab.' },
      { name: 'Laksa (Katong)', emoji: '🍜', what: 'Fideos de arroz en caldo curry de coco con gambas y berberechos. Cremoso.', tip: 'En Katong los fideos van cortados: se come solo con cuchara.' },
      { name: 'Char kway teow', emoji: '🍳', what: 'Fideos planos al wok con soja oscura, berberechos, salchicha china, huevo y brotes. Ahumado ("wok hei").', tip: 'Pídelo con berberechos (cockles) como los locales.' },
      { name: 'Hokkien mee', emoji: '🦐', what: 'Fideos amarillos + finos salteados en un caldo intenso de gambas y cerdo, con calamar y sambal.', tip: 'Un chorrito de lima y sambal antes de empezar. El de Old Airport Rd es legendario.' },
      { name: 'Bak chor mee', emoji: '🍲', what: 'Fideos con carne de cerdo picada, albóndigas, hígado y vinagre negro. Agridulce y adictivo.', tip: 'El de Hill Street Tai Hwa tiene estrella Michelin: seco ("dry"), con mucho vinagre.' },
      { name: 'Satay', emoji: '🍢', what: 'Brochetas a la brasa con salsa de cacahuete, ketupat, pepino y cebolla.', tip: 'De noche en la Satay Street de Lau Pa Sat. Se pide por decenas.' },
      { name: 'Bak kut teh', emoji: '🥣', what: 'Sopa de costilla de cerdo con pimienta y ajo (Teochew, clara). Reconfortante.', tip: 'Con youtiao (churro salado) para mojar y té para "cortar" la grasa.' },
      { name: 'Kaya toast + huevos + kopi', emoji: '🍞', what: 'Desayuno nacional: tostada con mermelada de coco (kaya) y mantequilla, huevos casi crudos con soja, y café kopi.', tip: 'Moja la tostada en el huevo. "Kopi" (con leche condensada) o "kopi-o" (solo).' },
      { name: 'Roti prata', emoji: '🫓', what: 'Pan indio-musulmán hojaldrado a la plancha con curry para mojar.', tip: 'Prueba "kosong" (simple) y "egg prata", con teh tarik.' },
      { name: 'Nasi lemak', emoji: '🍚', what: 'Arroz al coco con sambal, anchoas fritas, cacahuetes, huevo y pepino.', tip: 'El de Adam Road (Selera Rasa) es de los más queridos — al lado del Botánico.' },
      { name: 'Carrot cake (chai tow kway)', emoji: '⬜', what: 'Nada de zanahoria: pastel de rábano salteado con huevo y rábano en conserva. "Blanco" o "negro" (con soja dulce).', tip: 'Pide "black" para probar la versión dulce-salada.' },
      { name: 'Oyster omelette (orh luak)', emoji: '🦪', what: 'Tortilla crujiente con ostras pequeñas y fécula, con salsa de chili picante.', tip: 'En Newton o cualquier hawker de marisco.' },
      { name: 'Durian', emoji: '👑', what: 'El "rey de las frutas": cremosa, olor intenso, sabor único.', tip: 'Cómprala abierta en Geylang. Prohibida en metro y hoteles por el olor.' },
    ],
    spots: [
      // Cerca de las visitas
      { name: 'Tian Tian Hainanese Chicken Rice', dish: 'chicken rice', area: 'Maxwell FC · Chinatown', price: '€', why: 'El chicken rice más famoso de la ciudad, en pleno recorrido de Chinatown.', near: 'Chinatown (día 2)', badge: 'Bib Gourmand' },
      { name: 'Hawker Chan', dish: 'soya sauce chicken rice', area: 'Chinatown Complex', price: '€', why: 'Pollo en soja más barato del mundo con Michelin. A 2 min de Tian Tian.', near: 'Chinatown (día 2)', badge: 'Michelin' },
      { name: 'Maxwell Food Centre (general)', dish: 'de todo: chicken rice, congee, popiah', area: 'Chinatown', price: '€', why: 'El hawker más cómodo para probar varias cosas de golpe en Chinatown.', near: 'Chinatown (día 2)' },
      { name: 'Satay Street — Lau Pa Sat', dish: 'satay a la brasa', area: 'CBD (Boon Tat St)', price: '€€', why: 'Cada noche cortan la calle y se llena de humo de satay. Cerca de Marina Bay.', near: 'Marina Bay (día 2)' },
      { name: 'Satay by the Bay', dish: 'satay y marisco hawker', area: 'Gardens by the Bay', price: '€€', why: 'Hawker dentro de los jardines: cenáis ahí antes del show de los Supertrees.', near: 'Gardens by the Bay (día 2, en el plan)' },
      { name: 'Makansutra Gluttons Bay', dish: 'char kway teow, BBQ stingray, satay', area: 'Esplanade · Marina Bay', price: '€€', why: 'Hawker icónico junto al agua, mirando a Marina Bay Sands.', near: 'Marina Bay / Merlion (día 2)' },
      { name: 'Adam Road Food Centre', dish: 'nasi lemak (Selera Rasa), mee rebus', area: 'Bukit Timah', price: '€', why: 'Hawker de locales pegado al Jardín Botánico. Comida perfecta al salir.', near: 'Botanic Gardens (día 1)' },
      { name: 'Ya Kun Kaya Toast', dish: 'kaya toast + huevos + kopi', area: 'varias (Orchard, Chinatown)', price: '€', why: 'El desayuno clásico de Singapur; hay una cerca del hotel de Orchard.', near: 'Orchard / hotel día 1' },
      { name: 'Malaysian Food Street', dish: 'chicken rice, char kway teow', area: 'Resorts World Sentosa', price: '€€', why: 'Hawker con AC dentro de Sentosa: sabor local sin salir de la isla.', near: 'Sentosa (día 1)' },
      // Merecen la excursión
      { name: 'Old Airport Road Food Centre', dish: 'Hokkien mee (Nam Sing), lor mee, rojak', area: 'Mountbatten', price: '€', why: 'Para muchos, EL mejor hawker centre de Singapur. Peregrinación foodie obligada.', worthTrip: true, badge: 'leyenda hawker' },
      { name: 'Newton Food Centre', dish: 'satay, BBQ seafood, oyster omelette', area: 'Newton (central)', price: '€€', why: 'El hawker de "Crazy Rich Asians": marisco a la brasa de noche. Muy ambiente.', worthTrip: true },
      { name: 'Tiong Bahru Market', dish: 'chwee kueh, lor mee, chicken rice', area: 'Tiong Bahru', price: '€', why: 'Desayuno en el barrio más hipster-tradicional, con panaderías y art déco.', worthTrip: true },
      { name: '328 Katong Laksa', dish: 'laksa de Katong', area: 'East Coast / Katong', price: '€', why: 'La laksa que se come con cuchara, en el barrio Peranakan de casas de colores.', worthTrip: true, badge: 'leyenda local' },
      { name: 'Hill Street Tai Hwa Pork Noodle', dish: 'bak chor mee', area: 'Crawford / Lavender', price: '€', why: 'Puesto hawker con ESTRELLA Michelin. Cola larga, pero de los "no te vas sin probar".', worthTrip: true, badge: 'Michelin ⭐' },
      { name: 'Jumbo Seafood', dish: 'chili crab + mantou', area: 'East Coast / Clarke Quay', price: '€€€', why: 'La experiencia del chili crab sentados. Reserva; la cena "de celebración".', worthTrip: true },
      { name: 'Song Fa Bak Kut Teh', dish: 'sopa de costilla a la pimienta', area: 'New Bridge / Clarke Quay', price: '€€', why: 'El bak kut teh más querido, cerca del centro.', near: 'Clarke Quay', badge: 'Bib Gourmand' },
      { name: 'Zam Zam', dish: 'murtabak (crepe relleno de carne)', area: 'Arab Street / Kampong Glam', price: '€', why: 'Institución india-musulmana desde 1908 junto a la mezquita de Sultan.', worthTrip: true, badge: 'leyenda local' },
      { name: 'Candlenut', dish: 'cocina Peranakan (nyonya)', area: 'Dempsey Hill', price: '€€€', why: 'El único restaurante Peranakan del mundo con estrella Michelin. Para una cena especial.', worthTrip: true, badge: 'Michelin ⭐' },
    ],
  },

  kl: {
    blurb: 'Kuala Lumpur es un cruce malayo-chino-indio: aquí se desayuna nasi lemak, se come banana leaf con la mano y se cena a pie de calle en Jalan Alor. Barato, intenso y con mucho picante — pide el sambal aparte para los peques.',
    dishes: [
      { name: 'Nasi lemak', emoji: '🍚', what: 'Plato nacional: arroz al coco con sambal, anchoas, cacahuetes, huevo y pepino; a menudo con pollo frito (ayam goreng).', tip: 'El "nasi lemak ayam goreng" es la versión reina.' },
      { name: 'Roti canai + teh tarik', emoji: '🫓', what: 'Pan hojaldrado con curry de lentejas, y té con leche "estirado" espumoso. Desayuno de 1€.', tip: 'En un "mamak" (local indio-musulmán 24 h).' },
      { name: 'Char kuey teow', emoji: '🍳', what: 'Fideos planos al wok con gambas, berberechos, huevo y soja. Ahumado.', tip: 'En los puestos chinos de Jalan Alor.' },
      { name: 'Hokkien mee (KL)', emoji: '🍜', what: 'Fideos gruesos en salsa de soja oscura con cerdo, calamar y chicharrón. Distinto al de Singapur.', tip: 'Plato de cena, pesado y adictivo.' },
      { name: 'Satay', emoji: '🍢', what: 'Brochetas a la brasa con salsa de cacahuete y ketupat.', tip: 'Kajang es "la cuna del satay"; en KL, en Jalan Alor de noche.' },
      { name: 'Banana leaf rice', emoji: '🍛', what: 'Arroz sobre hoja de plátano con currys vegetales, papadum y curry de carne/pescado. Del sur de India.', tip: 'Con la mano derecha; rellenan el arroz gratis. Muy veggie-friendly.' },
      { name: 'Nasi kandar', emoji: '🍛', what: 'Arroz con surtido de currys mezclados ("banjir", inundado de salsas). De Penang, brutal en KL.', tip: 'Señala los currys que quieras; pide que te "inunden" el arroz.' },
      { name: 'Cendol / ABC', emoji: '🍧', what: 'Hielo picado con leche de coco, azúcar de palma y gusanitos de pandan (cendol) o toppings (ABC).', tip: 'El chute dulce perfecto a media tarde.' },
    ],
    spots: [
      // Cerca de las visitas
      { name: 'Lot 10 Hutong', dish: 'hawker chino de puestos con solera', area: 'Bukit Bintang', price: '€', why: 'Sótano con puestos heredados (Hokkien mee, pollo, carrot cake), AC y en plena zona de tiendas.', near: 'Bukit Bintang' },
      { name: 'Jalan Alor', dish: 'char kuey teow, satay, marisco a la brasa', area: 'Bukit Bintang', price: '€€', why: 'La calle de comida nocturna de KL: mesas fuera, humo y ambientazo.', near: 'Bukit Bintang (noche)' },
      { name: 'Madam Kwan\'s (KLCC)', dish: 'nasi lemak, nasi bojari', area: 'Suria KLCC', price: '€€', why: 'Malayo clásico y cómodo con AC, al pie de las Torres Petronas.', near: 'Petronas / KLCC' },
      { name: 'Madras Lane (Chinatown)', dish: 'curry laksa, yong tau foo', area: 'Petaling St', price: '€', why: 'Callejón hawker escondido junto al Central Market. Curry laksa top.', near: 'Central Market / Chinatown' },
      { name: 'Nam Heong', dish: 'Hainanese chicken rice', area: 'Petaling St · Chinatown', price: '€', why: 'Chicken rice histórico de Chinatown, de paso con el Central Market.', near: 'Central Market / Chinatown' },
      { name: 'Masjid India / Kampung Baru', dish: 'nasi lemak malayo de barrio', area: 'Kampung Baru', price: '€', why: 'El barrio malayo donde ya tenéis el brunch: nasi lemak en hoja de plátano.', near: 'Kampung Baru (día 11, en el plan)' },
      { name: 'Restoran de Brickfields (Little India)', dish: 'banana leaf rice', area: 'Brickfields', price: '€', why: 'La "Pequeña India" de KL: banana leaf y thali del sur, veggie-friendly.', near: 'KL Sentral' },
      // Merecen la excursión
      { name: 'Village Park Restaurant', dish: 'nasi lemak ayam goreng', area: 'Damansara Uptown', price: '€', why: 'Para muchos, el mejor nasi lemak con pollo frito de KL. A las afueras.', worthTrip: true, badge: 'leyenda local' },
      { name: 'Restoran Yut Kee', dish: 'chop hainanés, roti babi, tostada kaya', area: 'Jln Kamunting (centro)', price: '€', why: 'Kopitiam hainanés desde 1928: desayuno con historia. Cierra pronto.', worthTrip: true, badge: 'leyenda local' },
      { name: 'Sri Nirwana Maju', dish: 'banana leaf rice', area: 'Bangsar', price: '€', why: 'Banana leaf a rebosar y baratísimo. La experiencia india comiendo con la mano.', worthTrip: true },
      { name: 'Nasi Kandar Pelita', dish: 'nasi kandar', area: 'Jln Ampang', price: '€', why: 'Nasi kandar 24 h muy popular: arroz "inundado" de currys. Abierto siempre.', worthTrip: true },
      { name: 'Soong Kee Beef Noodles', dish: 'fideos con bolas de ternera', area: 'centro (Jln Tun H.S. Lee)', price: '€', why: 'Desde 1945: fideos secos con carne picada y sopa de bolas de ternera.', worthTrip: true, badge: 'leyenda local' },
      { name: 'Rebung (Chef Ismail)', dish: 'bufé malayo tradicional', area: 'Bangsar', price: '€€', why: 'Bufé de cocina malaya casera para probar MUCHOS platos de una vez. Ideal foodies.', worthTrip: true },
    ],
  },

  sepilok: {
    blurb: 'En Sepilok se come sobre todo en los lodges (comida de selva, sencilla y correcta), pero Sandakan, a 30 min, es puerto y tiene marisco de primera y dulces coloniales. Aprovechad si pasáis por la ciudad.',
    dishes: [
      { name: 'Seafood de Sandakan', emoji: '🦐', what: 'Sandakan presume del marisco más barato y fresco de Malasia: gambas gigantes, cangrejo, vieiras al ajillo o al chili.', tip: 'Pedid "butter prawns" (gambas en salsa de mantequilla y hoja de curry).' },
      { name: 'Sang nyuk mien', emoji: '🍜', what: 'Sopa de fideos con cerdo marinado, típica de Sabah. Caldo claro y reconfortante.', tip: 'Desayuno o almuerzo local en Sandakan.' },
      { name: 'UFO tart', emoji: '🥧', what: 'Tartaleta de Sandakan con bizcocho, crema y merengue tostado.', tip: 'En panaderías del centro de Sandakan.' },
      { name: 'Hinava', emoji: '🐟', what: 'Ceviche kadazan: pescado crudo curado en lima, chili y jengibre. El "sushi" de Sabah.', tip: 'Para paladares aventureros, en sitios de comida kadazan.' },
    ],
    spots: [
      { name: 'Comidas en el lodge (Sepilok)', dish: 'buffet de selva', area: 'Sepilok', price: '€€', why: 'Junto a los centros de fauna casi todo se come en el lodge o cafés cercanos: cómodo y sin desplazarse.', near: 'Sepilok (orangutanes/sun bears)' },
      { name: 'Sim Sim (Sandakan)', dish: 'marisco sobre el agua', area: 'Sandakan waterfront', price: '€€', why: 'Casas de pescadores sobre pilotes con marisquerías. La comida top si pasáis por Sandakan.', worthTrip: true },
      { name: 'Comfort Sang Nyuk Mee (Sandakan)', dish: 'sopa de fideos con cerdo', area: 'Sandakan centro', price: '€', why: 'El sang nyuk mee de referencia de la ciudad. Desayuno local de verdad.', worthTrip: true },
      { name: 'English Tea House (Sandakan)', dish: 'té colonial con vistas', area: 'Sandakan', price: '€€', why: 'Jardín colonial con vistas al mar de Sulu: parada bonita con niños.', worthTrip: true },
    ],
  },

  kinabatangan: {
    blurb: 'En el río Kinabatangan la comida va incluida en el lodge (Sukau): buffets caseros entre cruceros de fauna. No hay restaurantes alrededor — es selva pura — así que aquí el "foodie" es la experiencia de comer rodeados de jungla.',
    dishes: [
      { name: 'Buffet del lodge', emoji: '🍛', what: 'Arroz, curry suave, verduras, pollo/pescado y fruta tropical. Casero y abundante.', tip: 'Avisad de alergias/niños al reservar; adaptan el picante.' },
      { name: 'Fruta tropical local', emoji: '🍍', what: 'Piña, papaya, plátano de selva, rambután, cultivada por la zona.', tip: 'Entre el crucero del amanecer y el desayuno.' },
    ],
    spots: [
      { name: 'Pensión completa en el lodge (Sukau)', dish: 'todo incluido', area: 'Río Kinabatangan', price: '€€€', why: 'No hay dónde salir a comer: el lodge da desayuno-comida-cena entre las salidas en barco.', near: 'Cruceros del Kinabatangan' },
    ],
  },

  ubud: {
    blurb: 'Ubud es el corazón culinario de Bali: cerdo asado (babi guling), pato crujiente y nasi campur en warungs escondidos entre arrozales. Aquí sí hay que buscar: el mejor babi guling se acaba a mediodía.',
    dishes: [
      { name: 'Babi guling', emoji: '🐖', what: 'Cerdo asado relleno de especias con piel crujiente, arroz, verduras y sambal. EL plato de Bali.', tip: 'Se sirve a mediodía y se agota: ve pronto. Pide "spesial" (con todo).' },
      { name: 'Bebek/Ayam betutu', emoji: '🦆', what: 'Pato o pollo cocinado lento en pasta de especias (base gede), horneado hasta deshacerse.', tip: 'El bebek (pato) es más jugoso; a veces hay que encargarlo.' },
      { name: 'Nasi campur bali', emoji: '🍚', what: 'Arroz con un poco de todo: sate lilit, lawar, tempeh, huevo y sambal. Bali de un bocado.', tip: 'Señala lo que quieras; cada warung tiene su mezcla.' },
      { name: 'Sate lilit', emoji: '🍢', what: 'Brocheta de pescado o pollo picado con coco y especias, moldeado en caña de limón y a la brasa.', tip: 'Aromática y suave: gusta a los niños.' },
      { name: 'Lawar', emoji: '🥗', what: 'Ensalada balinesa de verduras, coco rallado y especias (a veces con carne). Guarnición típica.', tip: 'Pide el "lawar putih" (sin sangre) si te da respeto la versión tradicional.' },
      { name: 'Pisang goreng + kopi/jamu', emoji: '🍌', what: 'Plátano frito de merienda, con café balinés o jamu (cúrcuma y jengibre).', tip: 'En cualquier warung con vistas a los arrozales.' },
    ],
    spots: [
      // Cerca de las visitas
      { name: 'Warung Babi Guling Ibu Oka', dish: 'babi guling', area: 'Ubud centro (frente al Palacio)', price: '€', why: 'El babi guling que hizo famoso Bourdain, a un paso del Palacio y del Mercado.', near: 'Centro de Ubud / Palacio', badge: 'leyenda local' },
      { name: 'Bebek Bengil (Dirty Duck)', dish: 'pato crujiente', area: 'Padang Tegal (junto a Monkey Forest)', price: '€€', why: 'Pato crujiente en pabellones sobre arrozales, al lado del Bosque de los Monos.', near: 'Monkey Forest' },
      { name: 'Warung Biah Biah', dish: 'nasi campur, sate lilit', area: 'Jl. Goutama (centro)', price: '€', why: 'Balinés auténtico, barato y riquísimo en una callecita del centro.', near: 'Centro de Ubud' },
      { name: 'Murni\'s Warung', dish: 'cocina balinesa, spare ribs', area: 'Campuhan (puente)', price: '€€', why: 'Institución desde 1974 sobre el río, junto al Campuhan Ridge Walk.', near: 'Campuhan Ridge Walk' },
      { name: 'Nasi Ayam Kedewatan Ibu Mangku', dish: 'pollo betutu con nasi campur', area: 'Kedewatan (camino Bali Swing)', price: '€', why: 'Institución del pollo betutu, de camino a Tegallalang/Bali Swing.', near: 'Tegallalang / Bali Swing' },
      { name: 'Sari Organik', dish: 'sano-local entre arrozales', area: 'Subak Sok Wayah', price: '€€', why: 'Warung orgánico al final de un sendero por los arrozales. La caminata es parte del plan.', near: 'Arrozales de Ubud' },
      // Merecen la excursión
      { name: 'Warung Pulau Kelapa', dish: 'nasi campur, babi kecap', area: 'Sanggingan', price: '€€', why: 'Cocina indonesia casera en un jardín precioso de estilo javanés. Muy querido.', worthTrip: true },
      { name: 'Hujan Locale', dish: 'indonesia moderna', area: 'Ubud centro', price: '€€', why: 'Platos indonesios reinterpretados con producto local, en una casa colonial.', worthTrip: true },
      { name: 'Warung Bu Mi', dish: 'nasi campur casero', area: 'Ubud', price: '€', why: 'De los nasi campur más queridos por locales y viajeros: barato y sabroso.', worthTrip: true },
      { name: 'Locavore', dish: 'menú degustación indonesio moderno', area: 'Ubud centro', price: '€€€', why: 'De los mejores de Asia: alta cocina con producto balinés. Reserva con MUCHA antelación.', worthTrip: true, badge: 'top mundial' },
      { name: 'Mozaic', dish: 'alta cocina franco-balinesa', area: 'Sanggingan', price: '€€€', why: 'Fine dining con estrellas: menú degustación en jardín. Otra opción de cena especial.', worthTrip: true },
    ],
  },

  gili: {
    blurb: 'Gili Air es diminuta y sin coches: se come descalzo, con los pies en la arena y pescado recién sacado. De día, warungs sasak (de Lombok); de noche, el mercado con pescado a la brasa y jaffles.',
    dishes: [
      { name: 'Ikan bakar (pescado a la brasa)', emoji: '🐟', what: 'Pescado marinado y a la parrilla de coco, con arroz y sambal. Eliges la pieza en hielo.', tip: 'Al atardecer en los chiringuitos de la costa oeste, mirando a Bali.' },
      { name: 'Nasi campur sasak', emoji: '🍚', what: 'Arroz con guarniciones de Lombok, más picante que el balinés.', tip: 'En los warungs del interior, donde comen los locales.' },
      { name: 'Ayam taliwang', emoji: '🍗', what: 'Pollo especiado a la brasa típico de Lombok, con salsa de chili y tomate.', tip: 'Pídelo poco picante para la familia.' },
      { name: 'Plecing kangkung', emoji: '🥬', what: 'Espinaca de agua con sambal de tomate, lima y cacahuete. Guarnición fresca sasak.', tip: 'Acompaña genial al ayam taliwang.' },
    ],
    spots: [
      { name: 'Mercado nocturno de Gili Air (Pasar Malam)', dish: 'pescado a la brasa, satay, jaffles', area: 'Zona del puerto', price: '€', why: 'Puestos que montan al anochecer: eliges pescado y te lo hacen al momento. Barato y familiar.', near: 'Puerto / llegada del ferry' },
      { name: 'Warung Sasak 2 / warungs locales', dish: 'nasi campur, ayam taliwang', area: 'Interior de la isla', price: '€', why: 'A un paseo del centro turístico: comida de Lombok de verdad y a mitad de precio.', near: 'Centro de Gili Air' },
      { name: 'Pituq Waroeng', dish: 'sano, veggie, local', area: 'Gili Air', price: '€', why: 'Warung sencillo muy querido, con opciones veganas y zumos. Bueno para los peques.', near: 'Centro de Gili Air' },
      { name: 'Chiringuitos costa oeste (sunset)', dish: 'ikan bakar al atardecer', area: 'Playa oeste', price: '€€', why: 'Cena con los pies en la arena y el Rinjani/Bali de fondo. La estampa de Gili.', near: 'Snorkel / playa' },
      { name: 'Ruby\'s / beach BBQ', dish: 'parrillada de pescado y marisco', area: 'Playa este', price: '€€', why: 'Barbacoa de playa al atardecer, ambiente relajado con música.', near: 'Playa este' },
    ],
  },

  sanur: {
    blurb: 'Sanur es la Bali de siempre, tranquila y familiar: dos leyendas que abren temprano y se agotan (Mak Beng y Men Weti), un mercado nocturno estupendo y marisco a pie de playa. Se come de maravilla sin gastar.',
    dishes: [
      { name: 'Nasi campur Bali', emoji: '🍚', what: 'Arroz con sate lilit, pollo, verduras, huevo y sambal. En Sanur está uno de los más famosos de la isla.', tip: 'Men Weti abre a las 7:30 y se agota antes de mediodía: id pronto.' },
      { name: 'Ikan goreng + sup kepala ikan', emoji: '🐟', what: 'Pescado frito crujiente con sopa de cabeza de pescado y sambal. El combo de Mak Beng desde 1941.', tip: 'Plato único: te sientas y te lo traen. Sin cartas.' },
      { name: 'Sate lilit + lawar', emoji: '🍢', what: 'Brochetas de coco y ensalada balinesa de verduras con especias.', tip: 'En el mercado nocturno de Sindhu, recién hechas.' },
      { name: 'Babi kecap / ayam betutu', emoji: '🍗', what: 'Cerdo guisado en soja dulce o pollo especiado lento. Platos caseros balineses.', tip: 'En los warung de nasi campur, como guarnición del arroz.' },
      { name: 'Es campur / dadar gulung', emoji: '🍧', what: 'Hielo con frutas y jarabes, o crepe verde de pandan con coco y azúcar de palma.', tip: 'De merienda en el Pasar Sindhu.' },
    ],
    spots: [
      { name: 'Warung Mak Beng', dish: 'pescado frito + sopa de pescado', area: 'Jl. Hang Tuah (norte de la playa)', price: '€', why: 'Institución desde 1941, un solo plato, cola constante y a pie de playa. Imprescindible.', near: 'Playa de Sanur', badge: 'leyenda local' },
      { name: 'Nasi Bali Men Weti', dish: 'nasi campur de desayuno', area: 'Sanur centro', price: '€', why: 'Para muchos el mejor nasi campur de Bali. Diminuto y se agota a media mañana.', near: 'Sanur centro', badge: 'leyenda local' },
      { name: 'Pasar Malam Sindhu (mercado nocturno)', dish: 'satay, ikan bakar, postres', area: 'Sindhu, Sanur', price: '€', why: 'Mercado nocturno auténtico donde cenan los locales: barato, variado, perfecto con niños.', near: 'Sanur centro (noche)' },
      { name: 'Pregina Warung', dish: 'cocina balinesa (bebek, sate lilit)', area: 'Jl. Danau Tamblingan', price: '€€', why: 'Balinés auténtico y acogedor en la calle principal de Sanur. Buen sitio para cenar en familia.', near: 'Sanur centro' },
      { name: 'Warung Little Bird', dish: 'nasi/mie goreng, ayam', area: 'Sanur', price: '€', why: 'Warung familiar, limpio y económico para el día a día.', near: 'Sanur centro' },
      { name: 'Genggong', dish: 'marisco a pie de playa', area: 'Sanur (frente al mar)', price: '€€', why: 'Pescado y marisco fresco con mesas mirando al mar. Atardecer y calma.', near: 'Playa de Sanur' },
      // Merecen la excursión
      { name: 'Nasi Ayam Bu Oki', dish: 'nasi ayam (pollo balinés especiado)', area: 'Denpasar (cerca de Sanur)', price: '€', why: 'Pollo balinés legendario con arroz y sambal, a un paso de Sanur. Otra joya local.', worthTrip: true, badge: 'leyenda local' },
      { name: 'Cena de marisco en Jimbaran', dish: 'pescado a la brasa en la arena', area: 'Muaya Beach, Jimbaran', price: '€€€', why: 'La cena clásica con los pies en la arena y velas al atardecer (día de Uluwatu).', worthTrip: true },
    ],
  },
}
