// Pasaporte de Exploradores — colección de "sellos" que Aira y Leo van
// consiguiendo durante el viaje. Lugares, experiencias, comidas típicas y
// animales. Cada sello trae una curiosidad para peques. Todo offline.

export interface Stamp {
  id: string
  emoji: string
  label: string
  where?: string
  fact?: string // curiosidad que se ve en la ficha (antes de sellar)
  fact2?: string // 2ª curiosidad DIFERENTE que salta al conseguir el sello
  desc?: string // "cómo es / qué es": para que los peques sepan qué buscar
  img?: string // foto embebida opcional (si se añade a /public); si falta, la ficha ofrece "ver foto"
  search?: string // término de búsqueda para "ver foto" (por defecto, el label)
}
export interface StampCategory { id: string; title: string; icon: string; stamps: Stamp[] }

export const passportCategories: StampCategory[] = [
  {
    id: 'animales', title: 'Animales vistos', icon: '🦁',
    stamps: [
      { id: 'a-orangutan', emoji: '🦧', label: 'Orangután', where: 'Sepilok', desc: 'Un gran simio de pelo largo naranja-rojizo, con brazos larguísimos y cara sin pelo. Casi tan grande como una persona y vive en los árboles.', search: 'orangután Borneo', fact: 'Son tan listos que usan hojas grandes como paraguas cuando llueve. ☔', fact2: 'Aprenden a abrir fruta y hacer su cama en los árboles imitando a su mamá durante años.' },
      { id: 'a-sunbear', emoji: '🐻', label: 'Oso del sol', where: 'Sepilok', desc: 'El oso más pequeño del mundo (como un perro grande), negro con una mancha naranja en forma de sol en el pecho y una lengua larguísima.', search: 'oso del sol sun bear', fact: 'Es el oso más pequeño del mundo y tiene la lengua larguísima para sacar miel.', fact2: 'Su lengua puede medir 25 cm: la más larga (para su tamaño) de todos los osos.' },
      { id: 'a-proboscis', emoji: '🐒', label: 'Mono narigudo', where: 'Río Kinabatangan', desc: 'Mono grande de pelo naranja-marrón y barriga clara; el macho tiene una nariz enorme y colgante. Palmea el agua y nada muy bien.', search: 'mono narigudo proboscis monkey', fact: 'Solo vive en Borneo. ¡Los machos tienen una nariz enorme y saben nadar!', fact2: 'Su barriga suena como un tambor porque se pasan el día digiriendo hojas.' },
      { id: 'a-elephant', emoji: '🐘', label: 'Elefante pigmeo', where: 'Río Kinabatangan', desc: 'Un elefante pequeño y regordete, de orejas grandes, cara tierna y cola larga. Es el elefante más pequeño del mundo.', search: 'elefante pigmeo Borneo', fact: 'Son los elefantes más pequeños del mundo, orejones y muy juguetones.', fact2: 'Usan la trompa como una mano: cogen fruta, beben y hasta se duchan con ella.' },
      { id: 'a-hornbill', emoji: '🦅', label: 'Cálao (hornbill)', where: 'Borneo', desc: 'Ave grande y negra con un pico enorme y curvado, y encima un "casco" de color amarillo o rojo. Al volar hace mucho ruido con las alas.', search: 'cálao hornbill Borneo', fact: 'El papá tapa el nido con barro y le pasa comida a la mamá por un agujerito.', fact2: 'Su pico parece pesadísimo pero por dentro está casi hueco, como una esponja.' },
      { id: 'a-croc', emoji: '🐊', label: 'Cocodrilo', where: 'Río Kinabatangan', desc: 'Reptil enorme verde-grisáceo, con el cuerpo cubierto de escamas duras y una boca larga llena de dientes. Flota quieto como si fuera un tronco.', search: 'cocodrilo de agua salada', fact: 'Puede aguantar más de una hora bajo el agua sin respirar.', fact2: 'Tiene la mordida más fuerte del mundo… pero abre la boca con tan poca fuerza que se le sujeta con una goma.' },
      { id: 'a-bats', emoji: '🦇', label: 'Nube de murciélagos', where: 'Gomantong', desc: 'Pequeños mamíferos que vuelan de noche con alas de piel. Salen de la cueva a millones y forman una nube que se retuerce en el cielo.', search: 'murciélagos cueva Gomantong', fact: 'Cada tarde salen unos 2 millones de murciélagos de la cueva. 🦇', fact2: '"Ven" en plena oscuridad lanzando chillidos y escuchando el eco que rebota.' },
      { id: 'a-fireflies', emoji: '✨', label: 'Luciérnagas', where: 'Río de noche', desc: 'Escarabajos diminutos que encienden una lucecita verde-amarilla en la tripa. De noche parecen chispas flotando entre los árboles.', search: 'luciérnagas fireflies', fact: 'Se encienden todas a la vez para "hablarse" con la luz.', fact2: 'Su luz es "luz fría": no quema nada, es pura química dentro de su tripita.' },
      { id: 'a-macaque', emoji: '🐵', label: 'Macaco', where: 'Batu Caves / Monkey Forest', desc: 'Mono mediano de pelo marrón-gris y cara rosada, muy espabilado. Va en grupo y roba comida, gafas y hasta móviles.', search: 'macaco de cola larga', fact: 'Algunos lavan la comida en el agua antes de comérsela. ¡Y roban gafas!', fact2: 'A veces roban algo… ¡para cambiártelo por comida! Han aprendido a negociar.' },
      { id: 'a-turtle', emoji: '🐢', label: 'Tortuga marina', where: 'Gili Air', desc: 'Tortuga grande de caparazón liso, con aletas en vez de patas para "volar" bajo el agua. Sube a respirar y es muy tranquila.', search: 'tortuga marina verde', fact: 'Vuelven a poner sus huevos en la MISMA playa donde nacieron.', fact2: 'Pueden dormir bajo el agua varias horas sin necesidad de subir a respirar.' },
      { id: 'a-fish', emoji: '🐠', label: 'Peces de arrecife', where: 'Snorkel', desc: 'Pececillos de mil colores (naranja, azul, amarillo) que viven entre los corales. El pez payaso es naranja con rayas blancas.', search: 'peces de arrecife de coral', fact: 'El pez payaso vive dentro de una anémona que pica… ¡pero a él no le pica!', fact2: 'Hay peces "limpiadores" que quitan los bichitos a otros más grandes: son su peluquería.' },
      { id: 'a-monitor', emoji: '🦎', label: 'Varano / lagarto', where: 'Selva', desc: 'Un lagarto grande (¡hasta 1-2 metros!) de piel gris y lengua amarilla partida en dos. Corre, nada y trepa como un mini-dragón.', search: 'varano monitor lizard', fact: 'Corre, nada y trepa: es como un mini-dragón.', fact2: 'Saca y mete la lengua partida en dos para "oler" el aire y encontrar comida.' },
    ],
  },
  {
    id: 'comidas', title: 'Comidas y platos típicos', icon: '🍜',
    stamps: [
      { id: 'f-chickenrice', emoji: '🍗', label: 'Hainanese chicken rice', where: 'Singapur', desc: 'Arroz blanco brillante con trozos de pollo blanco muy jugoso, pepino y unas salsas al lado. Suave y sencillo: gusta a todos.', search: 'hainanese chicken rice', fact: 'El arroz se cocina en el caldo del pollo: por eso sabe tan rico.', fact2: 'Es tan querido que lo consideran el plato "nacional" no oficial de Singapur.' },
      { id: 'f-satay', emoji: '🍢', label: 'Satay', where: 'Singapur / KL', desc: 'Brochetas de pollo o ternera doradas a la brasa, servidas con una salsa espesa de cacahuete para mojar.', search: 'satay skewers', fact: 'Son brochetas a la brasa que se mojan en salsa de cacahuete. 🥜', fact2: 'El palito es de bambú y lo ponen en remojo para que no se queme en la brasa.' },
      { id: 'f-chilicrab', emoji: '🦀', label: 'Chili crab', where: 'Singapur', desc: 'Un cangrejo entero rojo bañado en salsa espesa de tomate, dulce y algo picante. Se come con las manos y con bollitos fritos.', search: 'chili crab Singapore', fact: 'Es EL plato de Singapur: cangrejo en salsa dulce y un poco picante.', fact2: 'Se inventó en Singapur en los años 50 y hoy es famoso en todo el mundo.' },
      { id: 'f-kaya', emoji: '🍞', label: 'Kaya toast + kopi', where: 'Singapur', desc: 'Tostadas finas y crujientes untadas con mermelada verde de coco (kaya) y mantequilla, con huevos blanditos y café con leche.', search: 'kaya toast', fact: 'La kaya es una mermelada de coco y huevo que se unta en tostadas.', fact2: 'Se moja la tostada en el huevo con salsa de soja: pruébalo, ¡está más rico de lo que parece!' },
      { id: 'f-laksa', emoji: '🍜', label: 'Laksa', where: 'Singapur / KL', desc: 'Un bol de fideos en caldo naranja de leche de coco y curry, con gambas. Cremoso y con un puntito picante.', search: 'laksa noodles', fact: 'Sopa de fideos con leche de coco y un puntito picante.', fact2: 'La de Katong se come solo con cuchara: ¡le cortan los fideos en trocitos!' },
      { id: 'f-nasilemak', emoji: '🍛', label: 'Nasi lemak', where: 'Kampung Baru (KL)', desc: 'Un montoncito de arroz cocido en coco con salsa roja (sambal), pescaditos crujientes, cacahuetes, huevo y pepino, en hoja de plátano.', search: 'nasi lemak', fact: 'El plato nacional de Malasia. ¡Se come hasta para desayunar!', fact2: 'Se envuelve en hoja de plátano, que le da un olorcillo especial al arroz.' },
      { id: 'f-roti', emoji: '🫓', label: 'Roti canai', where: 'Malasia', desc: 'Un pan plano y hojaldrado que estiran lanzándolo al aire y doran en la plancha; se moja en curry.', search: 'roti canai', fact: 'Lo lanzan al aire para dejarlo finito: ¡es todo un espectáculo!', fact2: 'Pídelo "kosong" (solo) o con huevo: mira cómo lo giran como una peonza.' },
      { id: 'f-bakkutteh', emoji: '🥘', label: 'Bak kut teh', where: 'Singapur', desc: 'Una sopa clara y calentita con costillas de cerdo, mucho ajo y pimienta. Se toma con arroz y un churro salado para mojar.', search: 'bak kut teh', fact: 'Significa "té de costilla de cerdo": una sopa llena de especias.', fact2: 'En Singapur lleva mucha pimienta; en Malasia, más hierbas y soja oscura.' },
      { id: 'f-babiguling', emoji: '🐖', label: 'Babi guling', where: 'Ubud', desc: 'Cochinillo asado entero con especias hasta que la piel queda muy crujiente; se sirve con arroz y verduras.', search: 'babi guling Bali', fact: 'Cochinillo asado con especias: el plato de fiesta en Bali.', fact2: 'Se prepara para las fiestas: ¡un cerdo entero girando sobre el fuego durante horas!' },
      { id: 'f-bebek', emoji: '🦆', label: 'Bebek (pato balinés)', where: 'Ubud', desc: 'Pato cocinado durante horas con especias hasta quedar tierno por dentro y crujiente por fuera.', search: 'bebek betutu Bali', fact: 'Se cocina durante horas hasta quedar súper tierno y crujiente.', fact2: 'La versión "betutu" se envuelve en hojas y se cuece enterrada entre brasas.' },
      { id: 'f-nasigoreng', emoji: '🍚', label: 'Nasi / mie goreng', where: 'Bali', desc: 'Arroz ("nasi") o fideos ("mie") frito al wok con verduras y a veces pollo, coronado con un huevo frito encima.', search: 'nasi goreng', fact: '"Goreng" significa frito. ¡Casi siempre lleva un huevo encima!', fact2: 'Nació para aprovechar el arroz del día anterior: en la cocina no se tira nada.' },
      { id: 'f-coconut', emoji: '🥥', label: 'Coco fresco', where: 'Playa', desc: 'Un coco verde entero con una pajita: primero bebes el agua fresca de dentro y luego raspas la carne blanca con una cuchara.', search: 'coco fresco bebida', fact: 'Primero bebes el agua y luego raspas la carne blanca con una cuchara.', fact2: 'Un mismo coco te da bebida (el agua) y comida (la carne blanca). ¡Dos en uno!' },
      { id: 'f-tehtarik', emoji: '🧋', label: 'Teh tarik', where: 'Malasia', desc: 'Té con leche muy dulce y espumoso; lo "estiran" pasándolo en alto de un vaso a otro para hacer espuma.', search: 'teh tarik', fact: 'Té con leche "estirado": lo pasan de vaso a vaso para hacer espuma.', fact2: '"Tarik" significa "estirar": cuanto más alto lo estiran, más espuma hace.' },
      { id: 'f-gelato', emoji: '🍦', label: 'Helado / gelato', where: 'Bali', desc: 'Helado cremoso; en Bali lo hay de sabores curiosos como coco, arroz negro o mango.', search: 'gelato helado', fact: 'En Bali hay helado hasta de arroz negro y de coco.', fact2: 'El gelato lleva menos aire que el helado normal: por eso es más cremoso.' },
      { id: 'f-spicy', emoji: '🌶️', label: '¡Algo MUY picante!', where: 'Reto valiente', desc: 'Cualquier plato con mucho chili que pica en la lengua: sambal, curry picante… ¡un reto para valientes!', search: 'sambal chili', fact: 'El picante no quema de verdad: solo engaña a tu lengua. 😝', fact2: 'Si pica mucho, bebe leche o come arroz: ¡el agua NO lo quita!' },
      { id: 'f-durian', emoji: '😬', label: 'Probar durian', where: 'Reto extremo', desc: 'Una fruta grande y verde con pinchos por fuera; por dentro es amarilla y cremosa como natillas. Huele MUY fuerte, pero a muchos les encanta.', search: 'durian fruta', fact: 'Lo llaman "el rey de las frutas"… ¡pero huele tan fuerte que está prohibido en muchos hoteles!', fact2: 'Dentro esconde varios "gajos" cremosos entre una cáscara llena de pinchos.' },
    ],
  },
  {
    id: 'lugares', title: 'Lugares y monumentos', icon: '🗺️',
    stamps: [
      { id: 'p-gardens', emoji: '🌳', label: 'Gardens by the Bay', where: 'Singapur', fact: 'Los Supertrees recogen agua de lluvia y energía del sol de verdad.', fact2: 'Dentro de los domos gigantes hace tanto frío que crecen plantas de montaña.' },
      { id: 'p-merlion', emoji: '🦁', label: 'El Merlion', where: 'Singapur', fact: 'Es mitad león y mitad pez, y escupe agua por la boca.', fact2: 'Lo inventaron en 1964 como símbolo de la ciudad: no es un animal real.' },
      { id: 'p-chinatown', emoji: '🏮', label: 'Chinatown', where: 'Singapur', fact: 'Sus calles se llenan de farolillos rojos, que dan buena suerte.', fact2: 'En el Año Nuevo Chino se llena de dragones y bailes por la calle.' },
      { id: 'p-sentosa', emoji: '🏖️', label: 'Playa de Sentosa', where: 'Singapur', fact: '"Sentosa" significa "paz y tranquilidad" en malayo.', fact2: 'Antes fue una isla militar; hoy es todo playas, parques y atracciones.' },
      { id: 'p-batu', emoji: '🙏', label: 'Batu Caves', where: 'KL', fact: '272 escalones de colores y una estatua dorada de 43 metros.', fact2: 'La cueva de arriba es tan alta que dentro cabría un edificio entero.' },
      { id: 'p-petronas', emoji: '🏙️', label: 'Torres Petronas', where: 'KL', fact: 'Fueron las más altas del mundo y están unidas por un puente en el aire.', fact2: 'El puente que une las dos torres está a 170 m de altura, en el piso 41.' },
      { id: 'p-tegallalang', emoji: '🌾', label: 'Arrozales de Tegallalang', where: 'Ubud', fact: 'Se hacen en escalones para que el agua baje poco a poco. ¡Hace 1000 años!', fact2: 'El sistema de canales que los riega se llama "subak" y lo protege la UNESCO.' },
      { id: 'p-monkeyforest', emoji: '🌳', label: 'Monkey Forest', where: 'Ubud', fact: 'Es un bosque sagrado con templos de más de 600 años… y 700 monos.', fact2: 'Aquí mandan los monos: si dejas algo brillante a la vista, ¡seguro que lo cogen!' },
      { id: 'p-tirta', emoji: '💧', label: 'Tirta Empul', where: 'Ubud', fact: 'La gente se mete bajo los chorros de agua para purificarse.', fact2: 'El agua brota sola de un manantial natural desde hace más de 1000 años.' },
      { id: 'p-uluwatu', emoji: '🔥', label: 'Uluwatu', where: 'Bali', fact: 'El templo está sobre un acantilado de 70 metros sobre el mar.', fact2: 'Cada tarde hay una danza kecak: 50 hombres cantando "chak-chak" junto al fuego.' },
      { id: 'p-tanahlot', emoji: '🌊', label: 'Tanah Lot', where: 'Bali', fact: 'Cuando sube la marea, el templo queda rodeado de agua como una islita.', fact2: 'Dicen que unas serpientes marinas sagradas vigilan el templo desde las rocas.' },
      { id: 'p-penida', emoji: '🦕', label: 'Nusa Penida', where: 'Bali', fact: 'El acantilado de Kelingking parece un T-Rex mirando al mar. 🦕', fact2: 'Para llegar hay que cruzar el mar en lancha rápida unos 45 minutos.' },
    ],
  },
  {
    id: 'experiencias', title: 'Experiencias', icon: '🎢',
    stamps: [
      { id: 'e-cruise', emoji: '🚤', label: 'Crucero al amanecer', where: 'Río Kinabatangan', fact: 'Al amanecer los animales bajan al río a beber: la mejor hora para verlos.', fact2: 'Ve muy callado: si no hacéis ruido, los animales se acercan más al barco.' },
      { id: 'e-lodge', emoji: '🛖', label: 'Dormir en la selva', where: 'Sukau', fact: 'De noche la selva suena como una orquesta de insectos y ranas. 🐸', fact2: 'Sin farolas alrededor, se ven muchísimas más estrellas que en la ciudad.' },
      { id: 'e-snorkel', emoji: '🤿', label: 'Snorkel con tortugas', where: 'Gili', fact: 'Las tortugas duermen bajo el agua y suben a respirar cada pocos minutos.', fact2: 'Nunca las toques: se miran de lejos para no asustarlas ni molestarlas.' },
      { id: 'e-spectra', emoji: '💧', label: 'Show Spectra', where: 'Marina Bay', fact: 'Es un show de agua, luz y música… ¡y es gratis!', fact2: 'Los chorros de agua hacen de pantalla para proyectar dibujos de luz encima.' },
      { id: 'e-rhapsody', emoji: '🌳', label: 'Garden Rhapsody', where: 'Supertrees', fact: 'Los Supertrees se iluminan al ritmo de la música.', fact2: 'Hay dos pases gratis cada noche: túmbate en el suelo mirando hacia arriba.' },
      { id: 'e-wings', emoji: '✨', label: 'Wings of Time', where: 'Sentosa', fact: 'Sale un pájaro gigante hecho de agua y luz sobre el mar.', fact2: 'Mezcla fuego, agua, láser y música: es el mayor espectáculo de playa de Asia.' },
      { id: 'e-swing', emoji: '🌴', label: 'Bali Swing', where: 'Tegallalang', fact: 'Te columpias sobre la selva con arnés: ¡es como volar de verdad!', fact2: 'Vas siempre atado con un arnés de seguridad, como los escaladores.' },
      { id: 'e-surf', emoji: '🏄', label: 'Clase de surf', where: 'Sanur', fact: 'Las olas de Sanur son suaves porque las frena un arrecife.', fact2: 'Lo más difícil no es surfear… ¡es ponerse de pie sin caerse de la tabla!' },
      { id: 'e-cidomo', emoji: '🐴', label: 'Paseo en cidomo', where: 'Gili Air', fact: 'El cidomo es un carrito tirado por un caballo: el "taxi" de Gili (¡no hay coches!).', fact2: 'El caballito lleva campanillas que suenan mientras trota por los caminos de arena.' },
      { id: 'e-fastboat', emoji: '⛵', label: 'Viajar en fast boat', where: 'Bali ↔ Gili', fact: 'Es una lancha rápida que va dando saltos sobre las olas.', fact2: 'Ponte el chaleco y siéntate atrás: es donde menos se nota el salto de las olas.' },
      { id: 'e-waterbom', emoji: '💦', label: 'Waterbom', where: 'Bali', fact: 'Está considerado uno de los mejores parques acuáticos del mundo.', fact2: 'Tiene toboganes tan altos como un edificio de varios pisos.' },
      { id: 'e-steps', emoji: '🪜', label: 'Subir los 272 escalones', where: 'Batu Caves', fact: 'Son exactamente 272… ¡cuéntalos a ver si coinciden!', fact2: 'Cada tramo de escalones está pintado de un color distinto del arcoíris.' },
      { id: 'e-purify', emoji: '🙏', label: 'Purificarse en el manantial', where: 'Tirta Empul', fact: 'Cada fuente sirve para "limpiar" algo distinto: mala suerte, malos pensamientos…', fact2: 'Te metes vestido bajo los chorros, de uno en uno y siguiendo el orden.' },
    ],
  },
  {
    id: 'retos', title: 'Retos de viajero', icon: '🏅',
    stamps: [
      { id: 'r-graciasms', emoji: '🗣️', label: 'Decir "terima kasih"', where: 'A un camarero', fact: 'Se dice "terima kásih" y significa gracias. ¡Sonríe al decirlo!', fact2: 'Si además aprendes "halo" (hola), la gente te sonreirá encantada.' },
      { id: 'r-bargain', emoji: '💰', label: 'Regatear en un mercado', where: 'Ubud / KL', fact: 'Truco: ofrece la mitad del precio y ve subiendo poco a poco, con buena cara.', fact2: 'Regatear con una sonrisa es parte del juego: si no hay trato, da las gracias y sigue.' },
      { id: 'r-map', emoji: '🧭', label: 'Guiar con el mapa', where: 'Un trayecto entero', fact: 'Orientarte con el mapa es un súperpoder de explorador. 🧭', fact2: 'Elige un edificio grande como referencia: así no te pierdes por el camino.' },
      { id: 'r-sunrise', emoji: '🌅', label: 'Amanecer y atardecer el mismo día', where: 'Cualquier día', fact: 'Cerca del ecuador, el sol sale y se pone casi a la misma hora todo el año.', fact2: 'Aquí el día y la noche duran casi lo mismo: unas 12 horas cada uno.' },
      { id: 'r-photo', emoji: '📸', label: 'La mejor foto del día', where: 'Cada día', fact: 'Truco de fotógrafo: ponte el sol a la espalda y acércate al motivo.', fact2: 'Agáchate a la altura de lo que fotografías: las fotos salen mucho mejor.' },
      { id: 'r-newfood', emoji: '🍽️', label: 'Pedir un plato sin saber qué es', where: 'Reto sorpresa', fact: 'Probar algo nuevo es de valientes… ¡aunque luego no te guste!', fact2: 'Aunque no te guste, ya podrás contar que lo probaste: ¡eso es ser un valiente!' },
    ],
  },
]

// Niveles por categoría (gamificación): 3 medallas por bloque, a ⅓, ⅔ y 100%
// de sus sellos. Da metas cortas y un título que mola por cada categoría.
export interface CatLevel { min: number; medal: string; label: string; emoji: string }
export const categoryLevels: Record<string, CatLevel[]> = {
  animales: [
    { min: 4, medal: '🥉', label: 'Rastreador', emoji: '🐾' },
    { min: 8, medal: '🥈', label: 'Naturalista', emoji: '🦎' },
    { min: 12, medal: '🥇', label: 'Guardián de la selva', emoji: '🦧' },
  ],
  comidas: [
    { min: 6, medal: '🥉', label: 'Paladar curioso', emoji: '🥢' },
    { min: 11, medal: '🥈', label: 'Sabueso del sabor', emoji: '🍜' },
    { min: 16, medal: '🥇', label: 'Maestro gastrónomo', emoji: '👨‍🍳' },
  ],
  lugares: [
    { min: 4, medal: '🥉', label: 'Turista', emoji: '🧭' },
    { min: 8, medal: '🥈', label: 'Explorador', emoji: '🗺️' },
    { min: 12, medal: '🥇', label: 'Descubridor legendario', emoji: '🏛️' },
  ],
  experiencias: [
    { min: 5, medal: '🥉', label: 'Intrépido', emoji: '🎈' },
    { min: 9, medal: '🥈', label: 'Aventurero', emoji: '🎢' },
    { min: 13, medal: '🥇', label: 'Trotamundos audaz', emoji: '🪂' },
  ],
  retos: [
    { min: 2, medal: '🥉', label: 'Atrevido', emoji: '💪' },
    { min: 4, medal: '🥈', label: 'Valiente', emoji: '⚡' },
    { min: 6, medal: '🥇', label: 'Héroe del viaje', emoji: '🦸' },
  ],
}

// Nivel actual de una categoría según cuántos sellos lleva (null = ninguno aún).
export function catLevel(catId: string, got: number): { idx: number; level: CatLevel } | null {
  const tiers = categoryLevels[catId]
  if (!tiers) return null
  let res: { idx: number; level: CatLevel } | null = null
  tiers.forEach((level, idx) => { if (got >= level.min) res = { idx, level } })
  return res
}

// Rangos por número de sellos (gamificación suave).
export const passportRanks = [
  { min: 0, label: 'Aprendiz de explorador', emoji: '🐣' },
  { min: 10, label: 'Explorador júnior', emoji: '🧭' },
  { min: 25, label: 'Aventurero', emoji: '🎒' },
  { min: 40, label: 'Gran explorador', emoji: '🏆' },
  { min: 55, label: 'Leyenda del viaje', emoji: '👑' },
]
