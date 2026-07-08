import type { Place } from '../types'

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
      { name: 'Wanton mee', emoji: '🥟', what: 'Fideos finos "secos" con char siu (cerdo asado), wantones y verdura, salsa oscura.', tip: 'Versión "dry" con chili; los wantones fritos aparte.' },
      { name: 'Fish head curry', emoji: '🐟', what: 'Cabeza de pescado en curry con quingombó y berenjena. Herencia india-singapurense; para compartir.', tip: 'En Little India (Muthu\'s, The Banana Leaf Apolo).' },
      { name: 'Nasi padang', emoji: '🍛', what: 'Arroz con surtido de guisos malayos/indonesios que señalas en la vitrina (rendang, ayam, verduras).', tip: 'Hjh Maimunah en Kampong Glam es el rey (Bib Gourmand).' },
      { name: 'Dim sum', emoji: '🥟', what: 'Bocaditos al vapor/fritos cantoneses: har gow, siew mai, bollos de cerdo, custard bun.', tip: 'Swee Choon abre hasta de madrugada; un clásico de after.' },
      { name: 'Chendol / ice kachang', emoji: '🍧', what: 'Postre de hielo con leche de coco, azúcar de palma (gula melaka) y gelatina de pandan (chendol) o con toppings (ice kachang). Salva del calor.', tip: 'De postre en cualquier hawker; Ah Chiew\'s borda los de la vieja escuela (mango sago).' },
      { name: 'BBQ stingray (sambal)', emoji: '🌶️', what: 'Raya a la brasa en hoja de plátano cubierta de sambal picante, con lima. Marisco callejero por excelencia.', tip: 'En East Coast Lagoon o Newton, de noche.' },
      { name: 'Durian', emoji: '👑', what: 'El "rey de las frutas": cremosa, olor intenso, sabor único.', tip: 'Cómprala abierta en Geylang o reserva en Ah Di (Dempsey). Prohibida en metro y hoteles por el olor.' },
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
      { name: 'Killiney Kopitiam', dish: 'kaya toast + huevos + kopi', area: 'Killiney Rd (Orchard)', price: '€', why: 'El kopitiam más antiguo de Singapur (1919), a un paseo del hotel de Orchard. Desayuno histórico.', near: 'Orchard / hotel día 1', badge: 'leyenda local' },
      { name: 'A Noodle Story', dish: '"Singapore-style ramen" (wanton mee gourmet)', area: 'Amoy Street FC · CBD', price: '€', why: 'Puesto hawker con Bib Gourmand: wanton mee reinventado con gamba tempura y huevo. Cerca de Marina Bay.', near: 'Marina Bay / CBD', badge: 'Bib Gourmand' },
      { name: 'Hjh Maimunah', dish: 'nasi padang (rendang, ayam)', area: 'Kampong Glam', price: '€', why: 'El nasi padang de referencia, señalas los guisos en la vitrina. Junto a la mezquita de Sultan y Arab St.', worthTrip: true, badge: 'Bib Gourmand' },
      { name: 'Swee Choon Tim Sum', dish: 'dim sum de madrugada', area: 'Jalan Besar', price: '€', why: 'Institución del dim sum barato abierta hasta tardísimo. Perfecto para un after o cena informal.', worthTrip: true, badge: 'leyenda local' },
      { name: 'Sungei Road Laksa', dish: 'laksa a la brasa de carbón', area: 'Jln Berseh (centro)', price: '€', why: 'Laksa old-school cocinada con carbón, solo cuchara y a 3 SGD. Un pedazo de historia.', worthTrip: true, badge: 'leyenda local' },
      { name: 'Long Beach Seafood', dish: 'black pepper crab', area: 'East Coast / Dempsey', price: '€€€', why: 'Los inventores del black pepper crab (alternativa al chili crab, menos picante para los peques).', worthTrip: true },
      { name: 'Muthu\'s Curry', dish: 'fish head curry', area: 'Little India', price: '€€', why: 'El fish head curry más famoso de la ciudad, en el corazón de Little India.', worthTrip: true, badge: 'leyenda local' },
      { name: 'Springleaf Prata Place', dish: 'roti prata (creativas)', area: 'Upper Thomson', price: '€', why: 'Prata clásica y de autor (con queso, plátano...). Desayuno-merienda para toda la familia.', worthTrip: true },
      { name: 'Bismillah Biryani', dish: 'biryani (Bib Gourmand)', area: 'Kampong Glam (Dunlop St)', price: '€', why: 'Biryani de cordero/pollo que se agota a diario, en Little India/Kampong Glam.', worthTrip: true, badge: 'Bib Gourmand' },
      { name: 'Tekka Centre', dish: 'biryani, prata, comida india', area: 'Little India', price: '€', why: 'El hawker de Little India: la mejor inmersión en la comida india de Singapur, colorido y barato.', worthTrip: true },
      // Joyas locales de la lista de Reddit (curadas: solo lo auténtico, sin brunch/burgers)
      { name: 'East Coast Lagoon Food Village', dish: 'satay, BBQ stingray, alitas, chili crab', area: 'East Coast Park (a pie de playa)', price: '€', why: 'Hawker al aire libre junto al mar, con brisa: marisco a la brasa y alitas mejores que Newton. Muy familiar.', worthTrip: true, badge: 'joya local' },
      { name: 'Chef Kang\'s Noodle House', dish: 'wanton mee (el mejor de SG)', area: 'Toa Payoh', price: '€', why: 'Para muchos el mejor wanton mee de Singapur: fideos "QQ" y char siu grueso. Bib Gourmand.', worthTrip: true, badge: 'Bib Gourmand' },
      { name: 'JB Ah Meng', dish: 'zi char (san lou hor fun, sambal)', area: 'Geylang', price: '€€', why: 'El zi char de after favorito de los locales: platos wok potentes, lleno hasta tarde.', worthTrip: true, badge: 'leyenda local' },
      { name: 'Ah Chiew\'s Dessert', dish: 'postres de la vieja escuela (mango sago)', area: 'centro', price: '€', why: 'Postres chinos tradicionales para rematar: mango sago, tau suan. Dulce y refrescante para los peques.', worthTrip: true },
      { name: 'Charlie\'s Peranakan (Golden Mile FC)', dish: 'nyonya barato (ayam buah keluak)', area: 'Golden Mile Food Centre', price: '€', why: 'Cocina Peranakan de hawker (la versión asequible de Candlenut): platos nyonya caseros.', worthTrip: true, badge: 'joya local' },
      { name: 'Tambuah Mas', dish: 'comida indonesia casera', area: 'Orchard (Paragon/Thomson)', price: '€€', why: 'Indonesio auténtico (rendang, ayam, sambal) — buen aperitivo del viaje a Bali. Cerca del hotel.', near: 'Orchard / hotel día 1' },
      { name: 'Tea Chapter', dish: 'ceremonia de té chino + snacks', area: 'Chinatown (Neil Rd)', price: '€€', why: 'Casa de té tradicional donde tomó té la Reina Isabel II. Experiencia cultural tranquila en pleno Chinatown.', near: 'Chinatown (día 2)' },
      { name: 'Moghul Sweet Shop', dish: 'samosas (¡salta los dulces!)', area: 'Little India', price: '€', why: 'Las mejores samosas de la ciudad, con relleno especiado y chutney dulce. Snack barato en Little India.', worthTrip: true, badge: 'joya local' },
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
      { name: 'Pan mee', emoji: '🍜', what: 'Fideos caseros ("board noodles") en sopa con carne picada, anchoas fritas, verdura y huevo. Especialidad chino-malaya de KL.', tip: 'Pídelo "chili pan mee" (seco con chili) para probar la versión estrella.' },
      { name: 'Bak kut teh de Klang', emoji: '🥣', what: 'La versión malaya (más oscura y herbal que la de Singapur), de Klang, cuna del plato.', tip: 'Desayuno de fin de semana; con youtiao y té chino.' },
      { name: 'Chee cheong fun', emoji: '🍥', what: 'Rollos de arroz al vapor con salsa dulce y sésamo (estilo KL) o con curry (estilo Ipoh).', tip: 'Desayuno de mercado, en Imbi.' },
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
      { name: 'Wong Ah Wah (WAW)', dish: 'alitas de pollo a la brasa', area: 'Jalan Alor', price: '€', why: 'Las alitas legendarias de Jalan Alor: crujientes y jugosas. Cena nocturna de calle.', near: 'Jalan Alor (noche)', badge: 'leyenda local' },
      { name: 'Imbi Market (ICC Pudu)', dish: 'chee cheong fun, sang har mee, desayunos', area: 'Pudu', price: '€', why: 'Mercado de desayunos chino, un ritual matutino de KL. Muchos puestos con solera.', worthTrip: true },
      { name: 'Kim Lian Kee', dish: 'Hokkien mee (desde 1927)', area: 'Petaling Street · Chinatown', price: '€', why: 'La casa del Hokkien mee de KL, en plena Petaling St. De paso con el Central Market.', near: 'Central Market / Chinatown', badge: 'leyenda local' },
      { name: 'Ho Kow Hainam Kopitiam', dish: 'kaya toast, nasi lemak, curry mee', area: 'centro (Jln Tun H.S. Lee)', price: '€', why: 'Kopitiam hainanés con encanto retro; desayuno malayo de toda la vida cerca de Chinatown.', near: 'Central Market / Chinatown' },
      { name: 'Sek Yuen', dish: 'cantonés clásico (pato asado)', area: 'Pudu', price: '€€', why: 'Restaurante de 1948 con cocina de leña: cantonés de otra época. Para una comida con historia.', worthTrip: true, badge: 'leyenda local' },
      { name: 'Bunn Choon', dish: 'egg tarts (tartaletas de huevo)', area: 'Petaling Street', price: '€', why: 'Las mejores egg tarts de KL, de una familia desde 1893. Merienda dulce en Chinatown.', near: 'Central Market / Chinatown' },
      { name: 'Sup Hameed', dish: 'sup tulang, mee goreng mamak', area: 'Jln Tuanku Abdul Rahman', price: '€', why: 'Mamak nocturno famoso por la sopa de huesos (sup tulang) roja. Muy local.', worthTrip: true },
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
      { name: 'Nasi ayam bali', emoji: '🍗', what: 'Arroz con pollo balinés especiado (a la brasa o desmenuzado), sate lilit, verduras y sambal matah.', tip: 'El de Kedewatan (Ibu Mangku) es institución.' },
      { name: 'Jaje bali (dulces)', emoji: '🍡', what: 'Dulces tradicionales de arroz, coco y azúcar de palma (klepon, dadar gulung, laklak).', tip: 'En los mercados de mañana; los klepon "explotan" con gula melaka dentro.' },
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
      { name: 'Warung Teges', dish: 'babi guling + nasi campur', area: 'Peliatan (afueras de Ubud)', price: '€', why: 'Para muchos locales, mejor babi guling que Ibu Oka y sin colas de turistas. Barato y auténtico.', worthTrip: true, badge: 'joya local' },
      { name: 'Bebek Tepi Sawah', dish: 'pato crujiente con vistas a arrozales', area: 'Peliatan', price: '€€', why: 'Pato balinés en pabellones sobre los arrozales; precioso para una comida en familia.', worthTrip: true },
      { name: 'Casa Luna', dish: 'balinesa (Janet DeNeefe)', area: 'Ubud centro (Jl. Raya)', price: '€€', why: 'Cocina balinesa con alma, de la fundadora del festival gastronómico de Ubud. Céntrico y cómodo.', near: 'Centro de Ubud' },
      { name: 'Warung Makan Bu Rus', dish: 'nasi campur, bebek betutu', area: 'Ubud (Jl. Suweta)', price: '€', why: 'Warung familiar muy querido junto a un estanque; betutu que hay que encargar.', near: 'Centro de Ubud' },
      { name: 'Room4Dessert', dish: 'menú de postres (Will Goldfarb)', area: 'Sayan', price: '€€€', why: 'Bar de postres de fama mundial (Chef\'s Table): experiencia dulce única para foodies. Reserva.', worthTrip: true, badge: 'top mundial' },
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
      { name: 'Gili Air Santay', dish: 'satay y curry sasak', area: 'Gili Air (este)', price: '€', why: 'Warung con encanto de bambú: satay y curries de Lombok bien de precio.', near: 'Centro de Gili Air' },
      { name: 'Coffee & Thyme / bakery', dish: 'desayuno, café, bollería', area: 'Gili Air', price: '€', why: 'Para el desayuno y el café de media mañana antes del snorkel. Opciones para peques.', near: 'Centro de Gili Air' },
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
      // 6 noches en Sanur dan para mucho: más joyas locales
      { name: 'Warung Kolega', dish: 'nasi campur javanés (eliges en vitrina)', area: 'Sanur', price: '€', why: 'Warung de comida javanesa al peso, baratísimo y buenísimo. Favorito de locales y expats.', near: 'Sanur centro', badge: 'joya local' },
      { name: 'Warung Babi Guling Pande Egi', dish: 'babi guling', area: 'Sanur', price: '€', why: 'Para comer el cerdo asado balinés sin ir hasta Ubud: crujiente y a mediodía.', near: 'Sanur centro' },
      { name: 'Char Ming', dish: 'balinesa-asiática frente al mar', area: 'Sanur (paseo marítimo)', price: '€€', why: 'Casa de madera preciosa a pie de playa; pato y pescado con un toque más elaborado para una cena especial.', near: 'Playa de Sanur' },
      { name: 'Sari Bundo', dish: 'nasi padang (rendang)', area: 'Sanur / Denpasar', price: '€', why: 'Padang 24 h: señala guisos en la vitrina. Rápido, contundente y muy local.', near: 'Sanur' },
      { name: 'Three Monkeys Sanur', dish: 'desayunos, brunch, café', area: 'Sanur (Danau Tamblingan)', price: '€€', why: 'Buen desayuno/brunch con opciones para peques cuando queráis variar del warung. Céntrico.', near: 'Sanur centro' },
      { name: 'Massimo (gelato)', dish: 'helado italiano artesano', area: 'Sanur', price: '€', why: 'El gelato más famoso de Bali (sí, italiano, pero es EL capricho de los niños en Sanur). Prueba el de coco.', near: 'Sanur centro' },
      { name: 'Pasar Sindhu (mercado de mañana)', dish: 'bubur, jaja, frutas', area: 'Sindhu, Sanur', price: '€', why: 'El mercado matutino: gachas de arroz (bubur), dulces balineses y fruta. Desayuno de inmersión total.', near: 'Sanur centro (mañana)' },
      { name: 'Warung Blanjong', dish: 'nasi campur, sate lilit caseros', area: 'Sur de Sanur', price: '€', why: 'Warung de barrio muy querido, baratísimo y auténtico. Para el día a día en Sanur.', near: 'Sanur sur' },

      // ===== Zonas de las EXCURSIONES desde Sanur (Uluwatu, Kuta, Nusa Penida, Este de Bali) =====
      // Uluwatu / Bukit
      { name: 'Suka Espresso', dish: 'desayuno/brunch, huevos, bowls', area: 'Uluwatu (Pecatu)', price: '€€', why: 'DESAYUNO/BRUNCH en Uluwatu, con opciones para peques. Para empezar el día del templo sin volver.', near: 'Día de Uluwatu', worthTrip: true },
      { name: 'Warung Local Uluwatu', dish: 'nasi/mie goreng, nasi campur', area: 'Uluwatu', price: '€', why: 'COMIDA barata y balinesa cerca del templo de Uluwatu.', near: 'Día de Uluwatu', worthTrip: true },
      { name: 'Single Fin', dish: 'bebidas + pizzas con vistas de acantilado', area: 'Uluwatu (Cliff)', price: '€€', why: 'TOMAR ALGO al ATARDECER: el bar-mirador icónico sobre el océano. Llega pronto los findes.', near: 'Día de Uluwatu', worthTrip: true, badge: 'vistas top' },
      { name: 'Nalu Bowls', dish: 'açaí y smoothie bowls', area: 'Uluwatu', price: '€', why: 'POSTRE/MERIENDA: bowls de fruta y helado sano, perfectos para Aira y Leo.', near: 'Día de Uluwatu', worthTrip: true },
      { name: 'Menega Café', dish: 'marisco a la brasa en la arena', area: 'Muaya Beach, Jimbaran', price: '€€€', why: 'CENA clásica de Jimbaran con los pies en la arena y velas (de camino de vuelta a Sanur).', near: 'Día de Uluwatu', worthTrip: true, badge: 'leyenda local' },
      // Kuta / Seminyak (día de Waterbom)
      { name: 'Made\'s Warung', dish: 'nasi campur, sate, clásicos balineses', area: 'Kuta / Seminyak', price: '€€', why: 'Institución desde 1969: buen punto para COMER el día de Waterbom (Kuta), tourist-friendly.', near: 'Día de Waterbom (Kuta)', worthTrip: true, badge: 'leyenda local' },
      // Nusa Penida
      { name: 'Penida Colada', dish: 'bar de playa, bowls, bebidas', area: 'Nusa Penida (Toya Pakeh)', price: '€€', why: 'Chiringuito de playa para COMER/tomar algo tras Kelingking, con hamacas.', near: 'Día de Nusa Penida', worthTrip: true },
      { name: 'Warungs de Crystal Bay / Kelingking', dish: 'nasi goreng, coco, pescado', area: 'Nusa Penida', price: '€', why: 'Puestos junto a los miradores y la playa: COMIDA sencilla local sin perder tiempo en la isla.', near: 'Día de Nusa Penida', worthTrip: true },
      // Este de Bali (Tirta Gangga / Lempuyang / Karangasem)
      { name: 'Tirta Ayu Restaurant', dish: 'balinés con vistas a los estanques', area: 'Dentro de Tirta Gangga (Karangasem)', price: '€€', why: 'COMIDA con vistas al palacio del agua: justo donde estáis en el este de Bali.', near: 'Día de Tirta Gangga / Lempuyang', worthTrip: true },
      { name: 'Warungs con vista a arrozales (Ababi)', dish: 'nasi campur, mie goreng', area: 'Ababi (junto a Tirta Gangga)', price: '€', why: 'Terrazas locales mirando a los arrozales de Karangasem, baratas y con encanto.', near: 'Día de Tirta Gangga / Lempuyang', worthTrip: true },
    ],
  },
}

// Coordenadas de los restaurantes de la guía foodie, por nombre. Los sitios
// famosos van con su ubicación real; los warungs/locales más pequeños, al
// centroide de su barrio (el botón "Maps" de la ficha busca por nombre exacto).
// Sin esto, los restaurantes no aparecían como pin en el mapa de Explorar.
const SPOT_COORDS: Record<string, { lat: number; lon: number }> = {
  // --- Singapur ---
  'Tian Tian Hainanese Chicken Rice': { lat: 1.2801, lon: 103.8447 },
  'Hawker Chan': { lat: 1.2825, lon: 103.8437 },
  'Maxwell Food Centre (general)': { lat: 1.2803, lon: 103.8447 },
  'Satay Street — Lau Pa Sat': { lat: 1.2806, lon: 103.8505 },
  'Satay by the Bay': { lat: 1.2812, lon: 103.8669 },
  'Makansutra Gluttons Bay': { lat: 1.2895, lon: 103.8556 },
  'Adam Road Food Centre': { lat: 1.3236, lon: 103.8140 },
  'Ya Kun Kaya Toast': { lat: 1.2846, lon: 103.8478 },
  'Malaysian Food Street': { lat: 1.2540, lon: 103.8230 },
  'Old Airport Road Food Centre': { lat: 1.3081, lon: 103.8853 },
  'Newton Food Centre': { lat: 1.3120, lon: 103.8385 },
  'Tiong Bahru Market': { lat: 1.2851, lon: 103.8312 },
  '328 Katong Laksa': { lat: 1.3062, lon: 103.9051 },
  'Hill Street Tai Hwa Pork Noodle': { lat: 1.3072, lon: 103.8636 },
  'Jumbo Seafood': { lat: 1.3013, lon: 103.9243 },
  'Song Fa Bak Kut Teh': { lat: 1.2870, lon: 103.8455 },
  'Zam Zam': { lat: 1.3020, lon: 103.8590 },
  'Candlenut': { lat: 1.3043, lon: 103.8100 },
  'Killiney Kopitiam': { lat: 1.2996, lon: 103.8390 },
  'A Noodle Story': { lat: 1.2799, lon: 103.8470 },
  'Hjh Maimunah': { lat: 1.3025, lon: 103.8600 },
  'Swee Choon Tim Sum': { lat: 1.3095, lon: 103.8570 },
  'Sungei Road Laksa': { lat: 1.3070, lon: 103.8560 },
  'Long Beach Seafood': { lat: 1.3007, lon: 103.9285 },
  "Muthu's Curry": { lat: 1.3105, lon: 103.8520 },
  'Springleaf Prata Place': { lat: 1.3600, lon: 103.8330 },
  'Bismillah Biryani': { lat: 1.3050, lon: 103.8555 },
  'Tekka Centre': { lat: 1.3065, lon: 103.8500 },
  'East Coast Lagoon Food Village': { lat: 1.3040, lon: 103.9310 },
  "Chef Kang's Noodle House": { lat: 1.3350, lon: 103.8560 },
  'JB Ah Meng': { lat: 1.3140, lon: 103.8880 },
  "Ah Chiew's Dessert": { lat: 1.3010, lon: 103.8570 },
  'Charlie\'s Peranakan (Golden Mile FC)': { lat: 1.3020, lon: 103.8640 },
  'Tambuah Mas': { lat: 1.3040, lon: 103.8360 },
  'Tea Chapter': { lat: 1.2800, lon: 103.8420 },
  'Moghul Sweet Shop': { lat: 1.3070, lon: 103.8510 },
  // --- Kuala Lumpur ---
  'Lot 10 Hutong': { lat: 3.1465, lon: 101.7100 },
  'Jalan Alor': { lat: 3.1450, lon: 101.7085 },
  "Madam Kwan's (KLCC)": { lat: 3.1580, lon: 101.7120 },
  'Madras Lane (Chinatown)': { lat: 3.1435, lon: 101.6975 },
  'Nam Heong': { lat: 3.1440, lon: 101.6970 },
  'Masjid India / Kampung Baru': { lat: 3.1620, lon: 101.7020 },
  'Restoran de Brickfields (Little India)': { lat: 3.1290, lon: 101.6870 },
  'Village Park Restaurant': { lat: 3.1360, lon: 101.6260 },
  'Restoran Yut Kee': { lat: 3.1595, lon: 101.6960 },
  'Sri Nirwana Maju': { lat: 3.1290, lon: 101.6710 },
  'Nasi Kandar Pelita': { lat: 3.1600, lon: 101.7180 },
  'Soong Kee Beef Noodles': { lat: 3.1470, lon: 101.6960 },
  'Rebung (Chef Ismail)': { lat: 3.1290, lon: 101.6720 },
  'Wong Ah Wah (WAW)': { lat: 3.1447, lon: 101.7083 },
  'Imbi Market (ICC Pudu)': { lat: 3.1370, lon: 101.7100 },
  'Kim Lian Kee': { lat: 3.1440, lon: 101.6980 },
  'Ho Kow Hainam Kopitiam': { lat: 3.1475, lon: 101.6958 },
  'Sek Yuen': { lat: 3.1385, lon: 101.7110 },
  'Bunn Choon': { lat: 3.1430, lon: 101.6975 },
  'Sup Hameed': { lat: 3.1620, lon: 101.6960 },
  // --- Sepilok / Sandakan ---
  'Comidas en el lodge (Sepilok)': { lat: 5.8745, lon: 117.9460 },
  'Sim Sim (Sandakan)': { lat: 5.8360, lon: 118.1230 },
  'Comfort Sang Nyuk Mee (Sandakan)': { lat: 5.8390, lon: 118.1170 },
  'English Tea House (Sandakan)': { lat: 5.8420, lon: 118.1170 },
  // --- Kinabatangan ---
  'Pensión completa en el lodge (Sukau)': { lat: 5.5170, lon: 118.2950 },
  // --- Ubud ---
  'Warung Babi Guling Ibu Oka': { lat: -8.5065, lon: 115.2620 },
  'Bebek Bengil (Dirty Duck)': { lat: -8.5165, lon: 115.2635 },
  'Warung Biah Biah': { lat: -8.5080, lon: 115.2640 },
  "Murni's Warung": { lat: -8.5070, lon: 115.2530 },
  'Nasi Ayam Kedewatan Ibu Mangku': { lat: -8.4930, lon: 115.2480 },
  'Sari Organik': { lat: -8.4990, lon: 115.2560 },
  'Warung Pulau Kelapa': { lat: -8.4980, lon: 115.2540 },
  'Hujan Locale': { lat: -8.5085, lon: 115.2635 },
  'Warung Bu Mi': { lat: -8.5080, lon: 115.2650 },
  'Locavore': { lat: -8.5075, lon: 115.2630 },
  'Mozaic': { lat: -8.4975, lon: 115.2530 },
  'Warung Teges': { lat: -8.5230, lon: 115.2680 },
  'Bebek Tepi Sawah': { lat: -8.5200, lon: 115.2700 },
  'Casa Luna': { lat: -8.5070, lon: 115.2620 },
  'Warung Makan Bu Rus': { lat: -8.5050, lon: 115.2630 },
  'Room4Dessert': { lat: -8.5010, lon: 115.2470 },
  // --- Gili Air ---
  'Mercado nocturno de Gili Air (Pasar Malam)': { lat: -8.3585, lon: 116.0840 },
  'Warung Sasak 2 / warungs locales': { lat: -8.3600, lon: 116.0830 },
  'Pituq Waroeng': { lat: -8.3595, lon: 116.0810 },
  'Chiringuitos costa oeste (sunset)': { lat: -8.3600, lon: 116.0780 },
  "Ruby's / beach BBQ": { lat: -8.3575, lon: 116.0865 },
  'Gili Air Santay': { lat: -8.3580, lon: 116.0860 },
  'Coffee & Thyme / bakery': { lat: -8.3590, lon: 116.0835 },
  // --- Sanur / Jimbaran ---
  'Warung Mak Beng': { lat: -8.6770, lon: 115.2620 },
  'Nasi Bali Men Weti': { lat: -8.6850, lon: 115.2610 },
  'Pasar Malam Sindhu (mercado nocturno)': { lat: -8.6870, lon: 115.2630 },
  'Pregina Warung': { lat: -8.6900, lon: 115.2620 },
  'Warung Little Bird': { lat: -8.6880, lon: 115.2615 },
  'Genggong': { lat: -8.6920, lon: 115.2640 },
  'Nasi Ayam Bu Oki': { lat: -8.6600, lon: 115.2450 },
  'Cena de marisco en Jimbaran': { lat: -8.7900, lon: 115.1580 },
  'Warung Kolega': { lat: -8.6850, lon: 115.2500 },
  'Warung Babi Guling Pande Egi': { lat: -8.6820, lon: 115.2560 },
  'Char Ming': { lat: -8.6890, lon: 115.2650 },
  'Sari Bundo': { lat: -8.6700, lon: 115.2500 },
  'Three Monkeys Sanur': { lat: -8.6930, lon: 115.2620 },
  'Massimo (gelato)': { lat: -8.6910, lon: 115.2620 },
  'Pasar Sindhu (mercado de mañana)': { lat: -8.6870, lon: 115.2630 },
  'Warung Blanjong': { lat: -8.6960, lon: 115.2600 },
}

// Convierte los restaurantes curados en "Places" del catálogo, para que salgan
// en Explorar → Restaurantes (con pin en el mapa) y se puedan AÑADIR al
// itinerario como cualquier sitio.
export function gastronomyPlaces(): Place[] {
  const out: Place[] = []
  for (const [destId, g] of Object.entries(gastronomy)) {
    g.spots.forEach((s, i) => {
      out.push({
        id: `food-${destId}-${i}`,
        destinationId: destId,
        kind: 'food',
        category: s.worthTrip ? 'Comida · vale el viaje' : 'Comida',
        name: s.name,
        emoji: '🍽️',
        zone: s.area,
        price: s.price,
        rank: 100 + i,
        must: !!s.badge,
        blurb: `${s.dish}. ${s.why}${s.near ? ` · A mano en: ${s.near}` : ''}`,
        provider: s.badge,
        coords: SPOT_COORDS[s.name],
      })
    })
  }
  return out
}
