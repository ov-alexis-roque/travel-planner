# Fase 1 · Benchmarking de apps de travel planning

> Investigación verificada (deep-research): 6 ángulos · 26 fuentes · 28 claims → 22 confirmados con verificación adversarial a 3 votos · 3 refutados. Junio 2026.

## Conclusión de fondo

**Ninguna app sola cubre el caso de la Familia Roque.** Wanderlog gana en la estructura del itinerario, TripIt en alertas y disrupciones, y el **modo offline robusto + el modelado de self-transfers no lo resuelve bien ninguna app del mercado** — ese es el hueco diferencial del proyecto.

## "Lo mejor de cada una"

| App | Lo que hace mejor | Qué adoptamos |
|-----|-------------------|----------------|
| **Wanderlog** ⭐ | Mejor modelo de itinerario all-in-one | Timeline diario por horas (cada actividad con hora inicio/fin), drag-and-drop entre días, **actividades genéricas tipo "Nota"** sin proveedor (clave para ferries / transfers compuestos / lodge todo-incluido), presupuesto integrado con split + multi-divisa en tiempo real + desglose por categoría/día, import de reservas por email |
| **TripIt Pro** ⭐ | Mejor modelo de alertas y disrupciones | Esquema de avisos con lead-time concreto: **3 días antes** + resumen de salida y cambios de puerta **4 h antes**; avisos de "conexión en riesgo"; notificaciones de terminal/puerta por GPS |
| **MapLibre + PMTiles** | Mejor stack web para offline real | Mapas offline en navegador vía PMTiles en OPFS + Service Worker para sprites/fuentes + `navigator.storage.persist()` |
| **AI planners** | ⚠️ Contraejemplo | IA solo como asistente de research con verificación humana; nunca generador autónomo |

## Diferenciador clave para este viaje

El modelado de **self-transfer / billetes separados / transfers compuestos**. La lógica de conexiones de TripIt **solo funciona dentro de una misma reserva**:

- El trasbordo propio en KLIA2 (AK704 + AK5194, billetes separados) → ninguna app lo detecta como conexión.
- El ferry compuesto Bluewater (minivan + barco) → no se modela en apps generalistas.

Hay que modelarlo a mano: leg → leg con **buffer de tiempo mínimo** y **alerta de "conexión en riesgo"**. Confirma la sección 9.4 del docx Marco.

## Sobre IA

Los generadores tipo ChatGPT fallan justo en lo que este viaje exige: orden geográfico incoherente, ignoran horas de cierre/transfer, "paseos cortos" de varios km, programan la última actividad a la hora del vuelo, ignoran descansos de los niños. GPT-4 puntúa ~0,6 % en planes que respetan todas las restricciones (benchmark TravelPlanner). **La fuente de verdad es el timeline estructurado, no la IA.**

## MVP vs. Avanzado

**MVP imprescindible**
- Timeline diario por horas con bloques tipados (transporte / actividad / comida / descanso).
- Actividades genéricas sin proveedor (ferries, transfers, lodge todo-incluido).
- Modelado explícito de legs + **self-transfer con buffer y alerta de riesgo**.
- Offline robusto: itinerario + docs de reserva en IndexedDB/Cache (NO localStorage, tope ~5 MiB) con `persist()`.
- Panel de pendientes con deadlines + recordatorios (3 días / 24 h / 4 h).
- Presupuesto multi-divisa (EUR ↔ SGD / MYR / IDR) con estado pagado/pendiente.
- Ficha de destino contextual (terminal, moneda, transporte, alertas como "T4 sin MRT").

**Avanzado (después)**
- Mapas offline con tiles descargables (PMTiles).
- Import automático de reservas por email (error-prone; manual primero).
- Notificaciones multicanal (SMS/email).
- Colaboración multi-usuario; IA como asistente de research.

## Caveats de cobertura

- **Google Maps lists/offline, Roadtrippers, Polarsteps, Sygic** quedaron como fuentes no fiables (bloqueo anti-bot / sin claims verificables). El núcleo verificado es Wanderlog + TripIt + stack offline. Pendiente: segunda pasada si se desea cerrar el cuadro.
- Mito refutado: *"Safari borra el storage a los 7 días"* es **falso** para origins en modo persistente (buena noticia para iOS).
- El grant de `persist()` es best-effort: el navegador puede denegarlo.

## Fuentes primarias

- Wanderlog Help — Add activities / Add time / Budget: help.wanderlog.com
- TripIt — Flight alerts (3 días / 4 h), connection alerts: help.tripit.com
- MapLibre offline PMTiles: github.com/makinacorpus/maplibre-offline-pmtiles
- MDN — Storage quotas & eviction: developer.mozilla.org/Storage_API
- TravelPlanner benchmark (GPT-4 ~0,6%): arxiv.org/abs/2402.01622
- HuffPost — fallos de planners IA (mid-2025)
