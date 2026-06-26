// Información de emergencia por país del recorrido. Los números cortos de
// emergencia son públicos y estables; los datos de embajada van como valor
// por defecto EDITABLE (el usuario los confirma antes de salir y quedan
// guardados offline).

export interface CountryEmergency {
  id: string
  country: string
  flag: string
  destIds: string[] // destinos de trip que caen en este país
  emergency: { label: string; number: string }[]
  fromMobile?: string // número unificado desde móvil
  water: string
  apps: string
  embassyDefault: { name: string; address?: string; phone?: string; note?: string }
}

export const countryEmergency: CountryEmergency[] = [
  {
    id: 'sg',
    country: 'Singapur',
    flag: '🇸🇬',
    destIds: ['sin'],
    emergency: [
      { label: 'Policía', number: '999' },
      { label: 'Ambulancia / Bomberos', number: '995' },
    ],
    water: 'Agua del grifo POTABLE en todo Singapur.',
    apps: 'Grab (taxi), MRT (metro). Inglés en todas partes.',
    embassyDefault: {
      name: 'Embajada de España en Singapur',
      address: '7 Temasek Boulevard, #19-03 Suntec Tower One',
      phone: '+65 6737 9988',
      note: 'Confirmar contacto actualizado antes de salir.',
    },
  },
  {
    id: 'my',
    country: 'Malasia',
    flag: '🇲🇾',
    destIds: ['sepilok', 'kinabatangan', 'kl'],
    emergency: [
      { label: 'Emergencias (todo)', number: '999' },
    ],
    fromMobile: '112',
    water: 'Agua del grifo NO potable. Beber embotellada (en KL y, sobre todo, en el lodge de Borneo).',
    apps: 'Grab (taxi/coche). En Borneo (Kinabatangan/Sukau) NO hay cobertura: descarga el mapa y avisa por el lodge.',
    embassyDefault: {
      name: 'Embajada de España en Kuala Lumpur',
      address: 'Menara Tan & Tan, 207 Jalan Tun Razak',
      phone: '+60 3-2148 4868',
      note: 'Confirmar contacto actualizado antes de salir.',
    },
  },
  {
    id: 'id',
    country: 'Indonesia (Bali)',
    flag: '🇮🇩',
    destIds: ['ubud', 'gili', 'sanur'],
    emergency: [
      { label: 'Emergencias (unificado)', number: '112' },
      { label: 'Policía', number: '110' },
      { label: 'Ambulancia', number: '118 / 119' },
    ],
    water: 'Agua del grifo NO potable. Beber embotellada y ojo al hielo fuera de sitios de confianza.',
    apps: 'Gojek y Grab (moto/coche/comida). En Gili Air no hay coches: a pie, bici o cidomo (carro de caballo).',
    embassyDefault: {
      name: 'Embajada de España en Yakarta · Consulado Hon. en Bali',
      address: 'Yakarta: Jl. H. Agus Salim No. 61 · Bali: consulado honorario en Denpasar',
      phone: '+62 21 3193 5135',
      note: 'En Bali hay consulado honorario; confirmar contacto antes de salir.',
    },
  },
]

// Tarjeta médica de los niños y datos de la familia: estructura de campos
// EDITABLES que el usuario rellena (se guardan offline). Pre-rellenamos lo que
// sabemos del viaje.
export const vaultFields: { key: string; label: string; placeholder?: string; group: string }[] = [
  { group: 'familia', key: 'seguro-compania', label: 'Seguro de viaje — compañía', placeholder: 'p. ej. IATI / Mapfre' },
  { group: 'familia', key: 'seguro-poliza', label: 'Seguro — nº de póliza' },
  { group: 'familia', key: 'seguro-tel', label: 'Seguro — teléfono 24h asistencia' },
  { group: 'familia', key: 'contacto-espana', label: 'Contacto en España (familiar)' },

  { group: 'transfer', key: 'transfer-dps', label: 'Chófer transfer DPS → Ubud', placeholder: 'Nombre + WhatsApp' },
  { group: 'transfer', key: 'transfer-sukau', label: 'Contacto lodge / transfer Borneo (SeekSophie)', placeholder: 'WhatsApp del operador' },
  { group: 'transfer', key: 'transfer-gili', label: 'Fast boat Gili (Bluewater) — reserva/contacto' },

  { group: 'ninos', key: 'aira-datos', label: 'Aira (9) — grupo sanguíneo, alergias, medicación' },
  { group: 'ninos', key: 'leo-datos', label: 'Leo (5) — grupo sanguíneo, alergias, medicación' },
  { group: 'ninos', key: 'tel-padres', label: 'Tarjeta "estoy perdido": vuestros teléfonos', placeholder: 'Papá +34… · Mamá +34…' },
]

// Documentos con foto (se guardan en IndexedDB, accesibles sin conexión).
export const docSlots: { key: string; label: string }[] = [
  { key: 'pasaporte-papa', label: 'Pasaporte · adulto 1' },
  { key: 'pasaporte-mama', label: 'Pasaporte · adulto 2' },
  { key: 'pasaporte-aira', label: 'Pasaporte · Aira' },
  { key: 'pasaporte-leo', label: 'Pasaporte · Leo' },
  { key: 'seguro-doc', label: 'Póliza de seguro de viaje' },
  { key: 'visado', label: 'Visados / autorizaciones (si aplica)' },
  { key: 'vacunas', label: 'Cartilla de vacunación / antimalárico' },
]
