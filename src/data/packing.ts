// Checklist de maleta SEPARADA POR PERSONA para todo el recorrido:
// Singapur (ciudad tropical), Borneo (selva/safari/trekking), KL (ciudad),
// Bali/Gili (playa, snorkel, templos).
// Estrategia: 2 bultos por persona (mochila + maleta de cabina), SIN facturar,
// check-in online en los 6 vuelos, y lavandería por el camino.
//
// Cada persona marca su propia lista (clave en el store: `${personaId}:${itemId}`).
// Común = lo que se comparte en familia (uno para todos).
// Aira (9) y Leo (4) tienen su lista con celebración al marcar.
// Leo puede activar "modo lectura": etiquetas en MAYÚSCULAS y palabras sencillas
// (kidLabel) para practicar leer mientras prepara su maleta.

export interface PackItem {
  id: string
  label: string
  icon: string // emoji por ítem (gamificación)
  qty?: string
  note?: string
  kidLabel?: string // etiqueta simplificada en mayúsculas para el modo lectura de Leo
}

export interface PackPerson {
  id: string // 'comun' | 'papa' | 'mama' | 'aira' | 'leo'
  name: string
  emoji: string
  kid?: boolean // Aira y Leo: activan la celebración al marcar
  reader?: boolean // Leo: puede activar el modo lectura
  intro?: string
  items: PackItem[]
}

// ── Ropa/enseres personales que llevan Papá y Mamá (misma plantilla) ──
function adultItems(prefix: string): PackItem[] {
  return [
    { id: `${prefix}-camisetas`, label: 'Camisetas transpirables', icon: '👕', qty: '5–6', note: 'Tejidos que sequen rápido; se lava por el camino.' },
    { id: `${prefix}-shorts`, label: 'Pantalones cortos / faldas', icon: '🩳', qty: '3–4' },
    { id: `${prefix}-pantalon-largo`, label: 'Pantalón largo ligero', icon: '👖', qty: '1–2', note: 'Templos (tapar rodillas), safari y mosquitos. Lino o técnico.' },
    { id: `${prefix}-ropa-interior`, label: 'Ropa interior', icon: '🩲', qty: '7 mudas' },
    { id: `${prefix}-calcetines`, label: 'Calcetines', icon: '🧦', qty: '5 pares + 2 altos finos', note: 'Los altos, para las botas de trekking en Borneo.' },
    { id: `${prefix}-cena`, label: 'Una muda “buena”', icon: '👔', qty: '1', note: 'Para cenas (Murni’s, Dirty Duck). Camisa/vestido ligero.' },
    { id: `${prefix}-capa`, label: 'Sudadera / capa fina', icon: '🧥', qty: '1', note: 'Aire acondicionado de aviones y madrugadas.' },
    { id: `${prefix}-pijama`, label: 'Pijama ligero', icon: '🛌', qty: '1' },
    { id: `${prefix}-banador`, label: 'Bañadores', icon: '🩱', qty: '2', note: 'Rotando se secan; casi a diario.' },
    { id: `${prefix}-snorkel`, label: 'Gafas de snorkel propias', icon: '🤿', note: 'Más cómodo e higiénico que las de alquiler.' },
    { id: `${prefix}-chanclas`, label: 'Chanclas', icon: '🩴', qty: '1' },
    { id: `${prefix}-botas`, label: 'Zapatillas de trekking', icon: '🥾', qty: '1 par', note: 'Cerradas, que puedan mojarse/embarrarse (Borneo).' },
    { id: `${prefix}-sombrero`, label: 'Sombrero / gorra', icon: '🧢', qty: '1' },
    { id: `${prefix}-gafas-sol`, label: 'Gafas de sol', icon: '🕶️', qty: '1' },
    { id: `${prefix}-aseo`, label: 'Neceser personal', icon: '🪥', note: 'Cepillo, desodorante, cosas de aseo. Líquidos ≤100 ml en cabina.' },
    { id: `${prefix}-chubasquero`, label: 'Chubasquero / poncho', icon: '🌂', qty: '1', note: 'Lluvia tropical y Gomantong Cave.' },
    { id: `${prefix}-movil`, label: 'Móvil + cargador', icon: '📱' },
  ]
}

export const packPeople: PackPerson[] = [
  {
    id: 'comun',
    name: 'Común',
    emoji: '🎒',
    intro: 'Lo que se comparte en familia — uno para todos. Repartidlo en las mochilas.',
    items: [
      { id: 'c-botiquin', label: 'Botiquín básico', icon: '🩹', note: 'Paracetamol/ibuprofeno, antidiarreico, suero oral, antihistamínico, tiritas, Betadine, termómetro.' },
      { id: 'c-pediatrico', label: 'Medicación pediátrica', icon: '🧒', note: 'Dosis para Aira y Leo (paracetamol/ibuprofeno infantil).' },
      { id: 'c-antimalaria', label: 'Antipalúdico (malaria)', icon: '💊', note: '⚠️ Consultar al médico/vacunación internacional: el interior de Borneo (Kinabatangan) es zona de riesgo. Pauta completa.' },
      { id: 'c-repelente', label: 'Repelente DEET fuerte', icon: '🦟', qty: '2 botes', note: 'Imprescindible en Borneo. DEET 30–50%.' },
      { id: 'c-afterbite', label: 'After-bite / crema picaduras', icon: '🧴' },
      { id: 'c-solar', label: 'Protector solar 50+', icon: '☀️', qty: '2', note: 'Mejor reef-safe para el snorkel de Gili.' },
      { id: 'c-gel', label: 'Gel hidroalcohólico', icon: '🧼' },
      { id: 'c-binoculares', label: 'Binoculares', icon: '🔭', note: 'Clave para orangutanes y elefantes pigmeos desde el barco.' },
      { id: 'c-linterna', label: 'Linterna frontal', icon: '🔦', note: 'Night walk y lodge sin mucha luz.' },
      { id: 'c-mochila-dia', label: 'Mochila de día', icon: '🎒', note: 'Agua, repelente, cámara. Cierre seguro (los macacos roban).' },
      { id: 'c-toalla', label: 'Toallas de microfibra', icon: '🏖️', qty: '2–3', note: 'Secan rápido y ocupan poco.' },
      { id: 'c-bolsa-mojado', label: 'Bolsa estanca / para mojado', icon: '💧', qty: '1–2' },
      { id: 'c-adaptador-g', label: 'Adaptador enchufe Tipo G', icon: '🔌', note: 'Singapur y Malasia (clavija británica de 3 patas).' },
      { id: 'c-adaptador-c', label: 'Adaptador enchufe Tipo C/F', icon: '🔌', note: 'Indonesia (Bali/Gili): clavija europea, la de casa sirve.' },
      { id: 'c-powerbank', label: 'Power bank', icon: '🔋', qty: '1–2', note: 'SIEMPRE en cabina (nunca bodega). <100 Wh.' },
      { id: 'c-multipuerto', label: 'Cargador multipuerto USB + cables', icon: '⚡', note: 'Uno por dispositivo: móviles, cámara, power bank, iPad, consola.' },
      { id: 'c-ipad', label: 'iPad + cargador', icon: '📲', note: 'Vuelos largos. Descargad pelis/series/juegos offline antes de salir.' },
      { id: 'c-splitter', label: 'Splitter de auriculares (2 en 1)', icon: '🎧', note: 'Para que Aira y Leo vean lo mismo en el avión.' },
      { id: 'c-esim', label: 'eSIM / datos', icon: '📶', note: 'eSIM regional Asia o local. Bali: Gojek/Grab necesitan datos.' },
      { id: 'c-docs', label: 'Documentos + copias', icon: '🛂', note: 'Pasaportes (validez 6+ meses), copias digitales y en papel, seguro, reservas.' },
      { id: 'c-dinero', label: 'Tarjetas + algo de efectivo', icon: '💳', note: 'Cambiar/sacar SGD, MYR e IDR. Una tarjeta de respaldo aparte.' },
    ],
  },
  {
    id: 'papa',
    name: 'Papá',
    emoji: '👨',
    intro: 'Tu maleta de cabina + mochila. Sin facturar.',
    items: adultItems('pa'),
  },
  {
    id: 'mama',
    name: 'Mamá',
    emoji: '👩',
    intro: 'Tu maleta de cabina + mochila. Sin facturar.',
    items: adultItems('ma'),
  },
  {
    id: 'aira',
    name: 'Aira',
    emoji: '👧',
    kid: true,
    intro: '¡Tu maleta, Aira! Ve marcando cada cosa que metas tú misma. 🌟',
    items: [
      { id: 'ai-camisetas', label: 'Camisetas', icon: '👕', qty: '5–6' },
      { id: 'ai-shorts', label: 'Pantalones cortos / faldas', icon: '🩳', qty: '3–4' },
      { id: 'ai-vestido', label: 'Un vestido bonito para cenas', icon: '👗', qty: '1' },
      { id: 'ai-pantalon', label: 'Pantalón largo ligero', icon: '👖', qty: '1', note: 'Templos y mosquitos.' },
      { id: 'ai-interior', label: 'Ropa interior', icon: '🩲', qty: '7 mudas' },
      { id: 'ai-calcetines', label: 'Calcetines', icon: '🧦', qty: '5 pares' },
      { id: 'ai-pijama', label: 'Pijama', icon: '🛌', qty: '1' },
      { id: 'ai-banador', label: 'Bañadores', icon: '🩱', qty: '2' },
      { id: 'ai-licra', label: 'Camiseta de licra / UV', icon: '🏄‍♀️', note: 'Para el sol y las medusas al hacer snorkel.' },
      { id: 'ai-snorkel', label: 'Gafas de snorkel', icon: '🤿' },
      { id: 'ai-chanclas', label: 'Chanclas', icon: '🩴' },
      { id: 'ai-botas', label: 'Zapatillas de trekking', icon: '🥾', note: 'Para la selva de Borneo.' },
      { id: 'ai-gorra', label: 'Gorra o sombrero', icon: '🧢' },
      { id: 'ai-gafas-sol', label: 'Gafas de sol', icon: '🕶️' },
      { id: 'ai-aseo', label: 'Cepillo de dientes y cosas de aseo', icon: '🪥' },
      { id: 'ai-tablet', label: 'Tablet/libro + auriculares', icon: '📚', note: 'Para los vuelos largos.' },
      { id: 'ai-peluche', label: 'Peluche o algo especial', icon: '🧸' },
      { id: 'ai-diario', label: 'Cuaderno de viaje y lápices', icon: '✏️', note: 'Para dibujar lo que veas y los sellos del pasaporte.' },
    ],
  },
  {
    id: 'leo',
    name: 'Leo',
    emoji: '👦',
    kid: true,
    reader: true,
    intro: 'La maleta de Leo. Papá o mamá la marcan; con el modo lectura, Leo lee cada cosa. 🦕',
    items: [
      { id: 'le-camisetas', label: 'Camisetas', icon: '👕', qty: '5–6', kidLabel: 'CAMISETAS' },
      { id: 'le-shorts', label: 'Pantalones cortos', icon: '🩳', qty: '4', kidLabel: 'PANTALONES' },
      { id: 'le-pantalon', label: 'Pantalón largo (mosquitos)', icon: '👖', qty: '1', kidLabel: 'UN PANTALÓN LARGO' },
      { id: 'le-interior', label: 'Calzoncillos', icon: '🩲', qty: '7', kidLabel: 'CALZONCILLOS' },
      { id: 'le-calcetines', label: 'Calcetines', icon: '🧦', qty: '5 pares', kidLabel: 'CALCETINES' },
      { id: 'le-pijama', label: 'Pijama', icon: '🛌', qty: '1', kidLabel: 'EL PIJAMA' },
      { id: 'le-banador', label: 'Bañadores', icon: '🩳', qty: '2', kidLabel: 'EL BAÑADOR' },
      { id: 'le-licra', label: 'Camiseta de licra / UV', icon: '🏄', kidLabel: 'CAMISETA DE AGUA' },
      { id: 'le-snorkel', label: 'Gafas de bucear', icon: '🤿', kidLabel: 'GAFAS DE BUCEAR' },
      { id: 'le-chanclas', label: 'Chanclas', icon: '🩴', kidLabel: 'CHANCLAS' },
      { id: 'le-botas', label: 'Zapatillas de la selva', icon: '🥾', kidLabel: 'ZAPATILLAS' },
      { id: 'le-gorra', label: 'Gorra', icon: '🧢', kidLabel: 'LA GORRA' },
      { id: 'le-gafas-sol', label: 'Gafas de sol', icon: '🕶️', kidLabel: 'GAFAS DE SOL' },
      { id: 'le-aseo', label: 'Cepillo de dientes', icon: '🪥', kidLabel: 'CEPILLO DE DIENTES' },
      { id: 'le-consola', label: 'Consola retro + juegos + cargador', icon: '🎮', kidLabel: 'LA CONSOLA' },
      { id: 'le-peluche', label: 'Peluche', icon: '🧸', kidLabel: 'EL PELUCHE' },
      { id: 'le-snacks', label: 'Snacks de casa', icon: '🍪', kidLabel: 'GALLETAS' },
      { id: 'le-muda-mano', label: 'Muda de recambio en la mochila', icon: '🎒', note: 'Por si acaso en aviones y barcos.', kidLabel: 'ROPA DE REPUESTO' },
      { id: 'le-mareo', label: 'Pulseras para el mareo', icon: '⌚', note: 'Fast boat a Gili y coche de montaña en Ubud.', kidLabel: 'PULSERAS' },
    ],
  },
]

// Apps imprescindibles a descargar (con WiFi, antes de salir). Se marcan igual
// que la maleta (mismo store packDone, con prefijo app-).
export const appGroups: { title: string; icon: string; items: { id: string; label: string; note?: string }[] }[] = [
  {
    title: 'Transporte (taxi/coche)', icon: '🚗',
    items: [
      { id: 'app-grab', label: 'Grab', note: 'Singapur y Malasia: taxi, coche, también comida (GrabFood). El “Uber” de la zona.' },
      { id: 'app-gojek', label: 'Gojek', note: 'Bali/Indonesia: moto, coche, comida (GoFood) y pagos. Imprescindible en Bali.' },
    ],
  },
  {
    title: 'Comida a domicilio y reservas', icon: '🍜',
    items: [
      { id: 'app-grabfood', label: 'GrabFood / Foodpanda', note: 'Comida a domicilio en SG y KL (Foodpanda es la otra grande).' },
      { id: 'app-chope', label: 'Chope', note: 'Reservar restaurantes en Singapur y KL.' },
    ],
  },
  {
    title: 'Mapas y traductor', icon: '🗺️',
    items: [
      { id: 'app-gmaps', label: 'Google Maps', note: 'Descarga offline las zonas (Singapur, KL, Ubud, Sanur) antes de ir.' },
      { id: 'app-translate', label: 'Google Translate', note: 'Descarga malayo e indonesio para traducir sin conexión y con la cámara.' },
      { id: 'app-whatsapp', label: 'WhatsApp', note: 'Hoteles, transfers y operadores se comunican por aquí.' },
    ],
  },
  {
    title: 'Vuelos (check-in online)', icon: '✈️',
    items: [
      { id: 'app-airasia', label: 'AirAsia (MOVE)', note: 'Vuelos AK: check-in online y tarjeta de embarque. Clave para los trasbordos.' },
      { id: 'app-sia', label: 'Singapore Airlines', note: 'Vuelo BCN↔SIN (SQ387/388).' },
      { id: 'app-scoot', label: 'Scoot', note: 'Vuelo DPS→SIN de vuelta (TR289).' },
    ],
  },
  {
    title: 'Tickets, planes y conectividad', icon: '🎟️',
    items: [
      { id: 'app-klook', label: 'Klook', note: 'Entradas más baratas y sin colas: Gardens by the Bay, Petronas, parques…' },
      { id: 'app-airalo', label: 'Airalo (eSIM)', note: 'Datos en cada país sin cambiar de SIM. Activar al aterrizar.' },
      { id: 'app-revolut', label: 'Revolut', note: 'Tu tarjeta de viaje; paga siempre en moneda local.' },
    ],
  },
]

// Plan de lavandería: con maleta de cabina y 23 días, lavar 2–3 veces.
export const laundryPlan = [
  { when: 'Borneo (Sepilok / Sukau · 15–20 jul)', what: 'La ropa de selva acaba sudada y embarrada. Los lodges ofrecen lavado; lava lo de safari aquí antes de KL.' },
  { when: 'Kuala Lumpur (20–24 jul · 4 noches)', what: 'Lavado grande a mitad de viaje. Star Suites es tipo apartamento; hay lavanderías baratas al lado (lavan y doblan al peso, listo en el día).' },
  { when: 'Ubud (24–27 jul)', what: 'Lavandería rápida y baratísima por todo Ubud (kilo en horas). Aclarado de bañadores y camisetas.' },
  { when: 'Sanur (29 jul–4 ago · 6 noches)', what: 'Suite con espacio: último lavado largo para llegar a casa con todo limpio. Lavandería a pie o servicio del hotel.' },
]

// Estrategia de equipaje y check-in online.
export const luggageStrategy = {
  bags: 'Por persona: 1 maleta de cabina + 1 mochila personal. SIN facturar en ninguno de los 6 vuelos.',
  why: 'Ahorra tiempo y dinero (AirAsia cobra bodega), y agiliza las escalas — sobre todo el trasbordo propio SIN→KUL→SDK, donde NO tendréis que esperar a recoger maletas.',
  checkin: 'Check-in online en los 6 vuelos en cuanto abra (24–48 h antes). Tarjeta de embarque en el móvil. Así vais directos a seguridad/puerta.',
  limits: 'Cabina AirAsia: 7 kg (maleta + bolso) por persona. Líquidos ≤100 ml en la bolsa transparente. Power bank SIEMPRE en cabina.',
  tip: 'Como solo lleváis cabina, la estrategia de lavar por el camino (ver abajo) es la que hace que quepa todo el viaje en bultos pequeños.',
}
