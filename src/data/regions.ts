// Intro de país/región para el primer día en cada lugar (plegable en el itinerario).
// Historia para niños + leyenda + frases con audio (speechSynthesis) + compras.

export interface Phrase { es: string; local: string; lang: string }
export interface RegionIntro {
  flag: string
  title: string
  intro: string
  funFacts: string[]
  legend: { title: string; text: string }
  phrases: Phrase[]
  shopping: { what: string; where: string }
}

export const regionInfo: Record<string, RegionIntro> = {
  // ---- Singapur (día 1) ----
  d1: {
    flag: '🇸🇬', title: 'Singapur',
    intro: 'Estamos en Singapur, una ciudad-estado tan pequeña que cabría unas 9.000 veces en España. En solo 50 años pasó de pueblo de pescadores a una de las ciudades más ricas, limpias y futuristas del mundo. Es tan ordenada que ¡está prohibido tirar chicle al suelo! Aquí conviven chinos, malayos e indios y se hablan cuatro idiomas.',
    funFacts: [
      'Tiene árboles-jardín gigantes que se iluminan y suenan de noche (los Supertrees).',
      'El aeropuerto tiene dentro una cascada de 40 metros, la más alta del mundo.',
      'Está tan limpia porque hay multas hasta por cruzar mal la calle.',
    ],
    legend: {
      title: '🦁 El león y el pez (Merlión)',
      text: 'Cuenta la leyenda que hace siglos un príncipe llegó a la isla y vio un león. La llamó "Singapura", que significa "ciudad del león". Hoy su símbolo es el Merlión: mitad león, mitad pez, que escupe agua a la bahía.',
    },
    phrases: [
      { es: 'Hola', local: 'Hello', lang: 'en-GB' },
      { es: 'Gracias', local: 'Thank you', lang: 'en-GB' },
      { es: 'Por favor', local: 'Please', lang: 'en-GB' },
      { es: 'Adiós', local: 'Goodbye', lang: 'en-GB' },
    ],
    shopping: {
      what: 'Electrónica y gadgets de última generación, juguetes y ropa. Es el paraíso de los centros comerciales.',
      where: 'Orchard Road (malls), Bugis Street (barato y de regateo) y Mustafa Centre (abierto 24h).',
    },
  },

  // ---- Borneo (día 4) ----
  d4: {
    flag: '🇲🇾', title: 'Borneo (Sabah, Malasia)',
    intro: 'Estamos en Borneo, la tercera isla más grande del mundo, cubierta por una de las selvas más antiguas del planeta: ¡130 millones de años, más vieja que el Amazonas! Aquí viven los orangutanes, que solo existen en Borneo y Sumatra, y los elefantes pigmeos, los más pequeños del mundo.',
    funFacts: [
      'El orangután comparte el 97 % de su ADN con nosotros.',
      'En el río Kinabatangan se ven proboscis: unos monos con la nariz enorme.',
      'De la cueva de Gomantong salen millones de murciélagos cada atardecer.',
    ],
    legend: {
      title: '🦧 La gente del bosque',
      text: 'Los pueblos de Borneo creían que los orangutanes eran personas que se fueron a vivir a los árboles para no tener que trabajar. Por eso los llamaron "orang-utan": orang = persona, hutan = bosque.',
    },
    phrases: [
      { es: 'Hola', local: 'Apa khabar', lang: 'ms-MY' },
      { es: 'Gracias', local: 'Terima kasih', lang: 'ms-MY' },
      { es: 'Por favor', local: 'Tolong', lang: 'ms-MY' },
      { es: 'Adiós', local: 'Selamat tinggal', lang: 'ms-MY' },
    ],
    shopping: {
      what: 'Poco de compras y mucha naturaleza: camisetas de orangutanes, artesanía de las tribus (telas y cestería).',
      where: 'Tiendas de los centros de fauna y mercado de Sandakan.',
    },
  },

  // ---- Kuala Lumpur (día 9) ----
  d9: {
    flag: '🇲🇾', title: 'Kuala Lumpur',
    intro: 'Estamos en Kuala Lumpur, la capital de Malasia. Su nombre significa "confluencia fangosa", porque la ciudad nació donde se juntan dos ríos. Mezcla rascacielos altísimos como las Torres Petronas con templos hindúes, mezquitas y mercados: es la ciudad de tres mundos, el malayo, el chino y el indio.',
    funFacts: [
      'Las Torres Petronas fueron los edificios más altos del mundo hasta 2004.',
      'Un puente une las dos torres a 170 metros de altura.',
      'El desayuno típico es nasi lemak: arroz con leche de coco… ¡y picante!',
    ],
    legend: {
      title: '🕌 La cueva de los dioses (Batu Caves)',
      text: 'Hace unos 120 años se descubrieron unas cuevas enormes en la roca. Los hindúes vieron que parecían un templo natural y construyeron dentro un santuario, con una estatua dorada de 43 metros del dios Murugan vigilando desde abajo.',
    },
    phrases: [
      { es: 'Hola', local: 'Apa khabar', lang: 'ms-MY' },
      { es: 'Gracias', local: 'Terima kasih', lang: 'ms-MY' },
      { es: 'Por favor', local: 'Tolong', lang: 'ms-MY' },
      { es: 'Adiós', local: 'Jumpa lagi', lang: 'ms-MY' },
    ],
    shopping: {
      what: 'Ropa y calzado baratos, electrónica y artesanía. Buen sitio para renovar maleta antes de la playa.',
      where: 'Central Market (artesanía, con AC), Bukit Bintang/Pavilion (malls) y Petaling Street/Chinatown (regateo).',
    },
  },

  // ---- Bali (día 13) ----
  d13: {
    flag: '🇮🇩', title: 'Bali (Indonesia)',
    intro: 'Estamos en Bali, una isla de Indonesia conocida como "la isla de los dioses" porque tiene más de 10.000 templos. Casi todos son hinduistas, a diferencia del resto de Indonesia, que es musulmán. Cada mañana verás pequeñas ofrendas de flores en el suelo y en las puertas: se llaman canang sari.',
    funFacts: [
      'Bali tiene un volcán sagrado y activo, el monte Agung.',
      'Celebran el Año Nuevo (Nyepi) en silencio total: un día entero sin luces, ruido ni móviles.',
      'A los niños se les pone el nombre según el orden de nacimiento: el 1.º Wayan, el 2.º Made…',
    ],
    legend: {
      title: '🦁 Barong contra Rangda',
      text: 'Una danza balinesa cuenta la lucha eterna entre Barong, un león bondadoso que protege a la gente, y Rangda, la bruja del caos. Nunca gana nadie del todo: así se mantiene el equilibrio entre el bien y el mal.',
    },
    phrases: [
      { es: 'Hola', local: 'Halo', lang: 'id-ID' },
      { es: 'Gracias', local: 'Terima kasih', lang: 'id-ID' },
      { es: 'Por favor', local: 'Tolong', lang: 'id-ID' },
      { es: 'Adiós', local: 'Sampai jumpa', lang: 'id-ID' },
    ],
    shopping: {
      what: 'Artesanía en madera, pareos y batik, plata de Celuk, café de Bali y cometas. Regatear es parte del juego.',
      where: 'Mercado de Ubud, Sukawati Art Market y tiendas del paseo de Sanur.',
    },
  },
}
