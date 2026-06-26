// Checklist de maleta contextual a TODO el recorrido: Singapur (ciudad tropical),
// Borneo (selva/safari/trekking), KL (ciudad), Bali/Gili (playa, snorkel, templos).
// Estrategia: 2 bultos por persona (mochila + maleta de cabina), SIN facturar,
// check-in online en los 6 vuelos, y lavandería por el camino.

export interface PackItem {
  id: string
  label: string
  qty?: string // cantidad recomendada para 23 días lavando por el camino
  note?: string
  kids?: boolean // especialmente relevante para Aira (9) y Leo (5)
}
export interface PackGroup {
  id: string
  title: string
  icon: string
  intro?: string
  items: PackItem[]
}

export const packGroups: PackGroup[] = [
  {
    id: 'ropa',
    title: 'Ropa (clima tropical, 27–33°)',
    icon: '👕',
    intro: 'Húmedo y caluroso todo el viaje. Tejidos transpirables que sequen rápido — se lava por el camino, no hace falta llevar para 23 días.',
    items: [
      { id: 'p-camisetas', label: 'Camisetas transpirables', qty: '5–6 por persona' },
      { id: 'p-shorts', label: 'Pantalones cortos / faldas', qty: '3–4' },
      { id: 'p-pantalon-largo', label: 'Pantalón largo ligero', qty: '1–2', note: 'Templos (tapar rodillas), safari y noches con mosquitos. Tipo lino o técnico.' },
      { id: 'p-ropa-interior', label: 'Ropa interior', qty: '7 mudas' },
      { id: 'p-calcetines', label: 'Calcetines normales', qty: '5 pares' },
      { id: 'p-calcetines-altos', label: 'Calcetines altos finos', qty: '2 pares', note: 'Para las botas de trekking en Borneo (sanguijuelas/mosquitos).' },
      { id: 'p-cena', label: 'Una muda “buena”', qty: '1 por persona', note: 'Para cenas (Murni’s, Dirty Duck). Camisa/vestido ligero.' },
      { id: 'p-capa', label: 'Capa fina / sudadera ligera', qty: '1', note: 'Aire acondicionado de aviones y madrugadas. No hace falta ropa de frío ni guantes.' },
      { id: 'p-pijama', label: 'Pijama ligero', qty: '1' },
    ],
  },
  {
    id: 'agua',
    title: 'Playa, snorkel y agua',
    icon: '🤿',
    intro: 'Gili Air y Sanur son puro mar; también piscinas casi cada día.',
    items: [
      { id: 'p-banador', label: 'Bañadores', qty: '2 por persona', note: 'Rotando se secan; casi se usan a diario.' },
      { id: 'p-snorkel', label: 'Gafas de snorkel propias', note: 'Más higiénico y cómodo que las de alquiler, sobre todo para los niños.' },
      { id: 'p-chanclas', label: 'Chanclas', qty: '1 por persona' },
      { id: 'p-escarpines', label: 'Escarpines de agua', note: 'Opcional, útil en arrecife/rocas de Gili.' },
      { id: 'p-toalla', label: 'Toalla de microfibra', qty: '2', note: 'Secan rápido y ocupan poco.' },
      { id: 'p-licra', label: 'Camiseta de licra / UV', qty: '1 por niño', kids: true, note: 'Sol y posibles medusas al hacer snorkel.' },
      { id: 'p-bolsa-mojado', label: 'Bolsa estanca / para mojado', qty: '1–2' },
    ],
  },
  {
    id: 'trekking',
    title: 'Trekking y selva (Borneo)',
    icon: '🥾',
    intro: 'Sepilok y el río Kinabatangan: pasarelas, barro, mosquitos y cruceros de fauna.',
    items: [
      { id: 'p-botas', label: 'Botas o zapatillas de trekking', qty: '1 par', note: 'Cerradas, que puedan mojarse/embarrarse.' },
      { id: 'p-pantalon-trek', label: 'Pantalón largo de trekking', note: 'Cubre de mosquitos y sanguijuelas (cubierto en Ropa, pero tenlo a mano).' },
      { id: 'p-chubasquero', label: 'Chubasquero / poncho ligero', qty: '1 por persona', note: 'Lluvia tropical y guano en Gomantong Cave.' },
      { id: 'p-mochila-dia', label: 'Mochila de día', qty: '1', note: 'Agua, repelente, cámara. Cierre seguro (los macacos roban).' },
      { id: 'p-binoculares', label: 'Binoculares', note: 'Clave para orangutanes y elefantes pigmeos desde el barco.' },
      { id: 'p-linterna', label: 'Linterna frontal', note: 'Night walk y lodge sin mucha luz.' },
    ],
  },
  {
    id: 'salud',
    title: 'Salud y protección',
    icon: '🧴',
    intro: 'Sol fuerte, mosquitos y zona rural de Borneo: lo más importante de la maleta.',
    items: [
      { id: 'p-antimalaria', label: 'Antipalúdico (malaria)', note: '⚠️ Consultar al médico/centro de vacunación internacional antes del viaje: el interior de Borneo (Kinabatangan) es zona de riesgo. Llevar la pauta completa.' },
      { id: 'p-repelente', label: 'Repelente DEET fuerte', qty: '2 botes', note: 'Imprescindible en Borneo. DEET 30–50%.' },
      { id: 'p-afterbite', label: 'After-bite / crema picaduras', qty: '1' },
      { id: 'p-solar', label: 'Protector solar alto (50+)', qty: '2', note: 'Mejor reef-safe para el snorkel de Gili.' },
      { id: 'p-sombrero', label: 'Sombrero / gorra', qty: '1 por persona' },
      { id: 'p-gafas-sol', label: 'Gafas de sol', qty: '1 por persona' },
      { id: 'p-botiquin', label: 'Botiquín básico', note: 'Paracetamol/ibuprofeno, antidiarreico, suero oral, antihistamínico, tiritas, Betadine, termómetro.' },
      { id: 'p-pediatrico', label: 'Medicación pediátrica', kids: true, note: 'Dosis para Aira y Leo (paracetamol/ibuprofeno infantil).' },
      { id: 'p-gel', label: 'Gel hidroalcohólico', qty: '1' },
    ],
  },
  {
    id: 'tech',
    title: 'Tecnología y documentos',
    icon: '🔌',
    intro: 'Ojo: el enchufe cambia entre Malasia/Singapur y Bali.',
    items: [
      { id: 'p-adaptador-g', label: 'Adaptador enchufe Tipo G', note: 'Singapur y Malasia (clavija británica de 3 patas).' },
      { id: 'p-adaptador-c', label: 'Adaptador enchufe Tipo C/F', note: 'Indonesia (Bali/Gili) usa clavija europea de 2 patas redondas — la vuestra de casa sirve.' },
      { id: 'p-powerbank', label: 'Power bank', qty: '1–2', note: 'En la mochila de mano, NUNCA en bodega (aunque no facturéis).' },
      { id: 'p-cargadores', label: 'Cargadores y cables', note: 'Móviles, cámara, power bank.' },
      { id: 'p-esim', label: 'eSIM / datos', note: 'eSIM regional Asia o local. Bali: app Gojek/Grab necesita datos.' },
      { id: 'p-apps', label: 'Apps offline listas', note: 'Esta app instalada, Google Maps offline de cada zona, Grab (SG/MY) y Gojek (Bali).' },
      { id: 'p-docs', label: 'Documentos + copias', note: 'Pasaportes (validez 6+ meses), copias digitales y en papel, seguro de viaje, reservas.' },
      { id: 'p-dinero', label: 'Tarjetas + algo de efectivo', note: 'Cambiar/sacar SGD, MYR e IDR. Llevar una tarjeta de respaldo aparte.' },
    ],
  },
  {
    id: 'ninos',
    title: 'Niños (Aira 9 · Leo 5)',
    icon: '🧒',
    items: [
      { id: 'p-entretenimiento', label: 'Tablet/libros + auriculares', kids: true, note: 'Para los vuelos y escalas largas (la del KUL son 4h).' },
      { id: 'p-peluche', label: 'Peluche / objeto de apego', kids: true },
      { id: 'p-snacks', label: 'Snacks de casa', kids: true, note: 'Para aviones y trayectos en coche por Bali.' },
      { id: 'p-muda-mano', label: 'Muda de recambio en mano', kids: true, note: 'Sobre todo para Leo, en vuelos y barcos.' },
      { id: 'p-mareo', label: 'Pulseras / pastillas para el mareo', kids: true, note: 'Fast boat a Gili y coche de montaña en Ubud.' },
    ],
  },
]

// Apps imprescindibles a descargar (con WiFi, antes de salir). Se marcan en la
// checklist igual que la maleta (mismo packDone, ids con prefijo app-).
export const appGroups: { title: string; icon: string; items: PackItem[] }[] = [
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
      { id: 'app-chope', label: 'Chope', note: 'Reservar restaurantes en Singapur y KL (la app de “Grill/reservas” que recordabas).' },
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
