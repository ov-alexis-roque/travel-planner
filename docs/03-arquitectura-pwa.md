# Fase 1 · Arquitectura técnica PWA y modelo de datos

> Propuesta técnica para la PWA instalable offline-first. Borrador para validar antes de construir.

## 1. Stack propuesto

| Capa | Elección | Por qué |
|------|----------|---------|
| **Framework** | **React + Vite** (TypeScript) | Ecosistema maduro, build rápido, PWA sencilla con `vite-plugin-pwa` |
| **PWA / Service Worker** | `vite-plugin-pwa` (Workbox) | Manifest, precache del app-shell, estrategias de cache, offline |
| **Estado / datos** | **Zustand** + **IndexedDB** (vía `idb`) | Estado ligero en memoria + persistencia local robusta (NO localStorage) |
| **Estilos** | CSS modules / Tailwind | Reutilizar paleta por destino del HTML base |
| **Contenido del viaje** | **JSON versionado en el repo** (seed) cargado a IndexedDB en primer arranque | Datos editables, offline, sin backend en v1 |
| **Mapas (v2)** | MapLibre GL JS + PMTiles en OPFS | Offline real verificado en el benchmark |
| **Fechas/divisa** | date-fns + tabla de tasas EUR↔SGD/MYR/IDR (snapshot, editable) | Sin depender de API online para multi-divisa offline |

**Decisión clave — sin backend en v1.** Es un viaje de una familia: los datos viven en el dispositivo (IndexedDB) sembrados desde un JSON en el repo. Esto da offline-first real, cero coste de servidor y máxima simplicidad. La sincronización multi-dispositivo / colaboración es v2 (p. ej. Supabase, ya disponible como MCP).

## 2. Estrategia offline

- **App-shell** precacheado por el Service Worker (HTML/CSS/JS).
- **Contenido del viaje** en **IndexedDB** (no localStorage: tope ~5 MiB insuficiente).
- `navigator.storage.persist()` al instalar para resistir evicción (best-effort).
- Docs de reserva (PDF/imágenes) en **Cache API**.
- Mapas offline (v2) en **OPFS** vía PMTiles; sprites/fuentes vía Service Worker.
- Bajo Chromium: hasta ~60 % del disco por origin → sobra para itinerario + docs + mapas.

## 3. Modelo de datos (TypeScript, resumen)

```ts
type ID = string;

interface Trip {
  id: ID; name: string; description: string;
  startDate: string; endDate: string;
  travelers: Traveler[];
  status: 'planning' | 'confirmed' | 'ongoing' | 'completed';
  budgetEstimate: number; currency: 'EUR';
}

interface Traveler { id: ID; name: string; kind: 'adult' | 'child'; age?: number; notes?: string; }

interface Destination {
  id: ID; name: string; color: string;       // paleta del HTML base
  logistics: { currency: string; tipping?: string; transport?: string; notes?: string };
  alerts: string[];                            // "T4 sin MRT", "no hay coches en Gili Air"
  emergency: { insurance?: string; hotel?: string; embassy?: string };
}

interface Day {
  id: ID; date: string; destinationId: ID; title: string;
  kind: 'travel' | 'exploration' | 'activation' | 'rest';
  accommodationId?: ID; notes?: string; alerts?: string[];
}

type BlockType = 'transport' | 'activity' | 'meal' | 'rest' | 'accommodation';
type BookingStatus = 'pending' | 'booked' | 'included' | 'free' | 'done';

interface Block {
  id: ID; dayId: ID; type: BlockType; title: string;
  start?: string; end?: string;                // "HH:mm"
  location?: string; durationMin?: number;
  status: BookingStatus; price?: number; currency?: string;
  bookingRef?: string; bookingUrl?: string;
  audience: 'all' | 'adults' | 'kids';
  expertNotes?: string;                         // wildlife timing, tips niños
  legId?: ID;
}

type LegType = 'flight' | 'ferry' | 'transfer' | 'train' | 'bus';

interface Leg {
  id: ID; type: LegType; from: string; to: string;
  date: string; depart?: string; arrive?: string;
  number?: string; ref?: string; status: BookingStatus;
  warnings: string[];                           // ⚠️ trasbordo propio, terminal
  selfTransferGroupId?: ID;                      // billetes separados encadenados
  minConnectionMin?: number; connectionAtRisk?: boolean;
  subLegs?: { mode: LegType; from: string; to: string; note?: string }[]; // transfer compuesto
}

interface Accommodation {
  id: ID; destinationId: ID; name: string;
  checkIn: string; checkOut: string; nights: number;
  roomType?: string; capacity?: number; price?: number; currency?: string;
  ref?: string; contact?: string; status: BookingStatus;
}

interface Task {
  id: ID; what: string; category: 'book' | 'buy' | 'manage' | 'verify';
  urgency: 'low' | 'medium' | 'high' | 'urgent'; deadline?: string;
  status: 'pending' | 'in_progress' | 'done'; leadTimesDays?: number[]; // [3, 1]
}

interface BudgetItem {
  id: ID; category: string; concept: string;
  amount: number; currency: string;
  status: 'paid' | 'pending' | 'estimated'; notes?: string;
}

interface Restaurant {
  id: ID; destinationId: ID; name: string; cuisine: string;
  priceApprox?: string; kidFriendly: boolean; moment?: string;
  specialty?: string; area?: string; needsReservation: boolean;
}
```

## 4. Arquitectura de pantallas (v1)

- **Hoy** — qué toca ahora/hoy (timeline del día activo, fecha del sistema).
- **Itinerario** — lista de 23 días agrupados por destino → detalle de día.
- **Vuelos & Transporte** — todos los legs, con self-transfers y advertencias.
- **Pendientes** — inbox de tareas por urgencia/deadline.
- **Presupuesto** — categorías, estado, multi-divisa.
- **Destinos** — fichas contextuales + emergencias.
- (Nav inferior móvil tipo app nativa.)

## 5. Estructura de repo propuesta

```
/docs               # discovery, spec, arquitectura (este material)
/data               # trip.json (seed canónico) + tasas de cambio
/src
  /components
  /screens
  /store           # zustand + idb
  /lib             # fechas, divisa, alertas, self-transfer
  /styles
/public            # manifest, iconos, service worker
```

## 6. Riesgos / decisiones abiertas

- **Notificaciones**: push real en PWA iOS es limitado; v1 usa avisos in-app calculados al abrir. ¿Suficiente?
- **Tasas de cambio**: snapshot offline editable vs. fetch online cuando haya red. Propuesta: snapshot + refresh opcional.
- **Mapas offline**: añade complejidad y peso; propuesto para v2.
- **Multi-dispositivo**: sin backend en v1 los datos no se sincronizan entre el móvil de Alexis y el de Cristina. ¿Aceptable para v1?
