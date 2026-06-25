# Fase 1 · Spec de Funcionalidades — Travel Planner Familia Roque

> Spec de producto priorizado. Cruza el benchmarking (`01-benchmarking.md`) con las entidades y funcionalidades críticas del docx Marco (sección 9). Borrador para validar antes de construir.

## 1. Visión

Una **PWA móvil instalable y offline-first** que convierte el plan del Gran Viaje Asia 2026 en una guía-itinerario viva: día a día por horas, con todo lo logístico (vuelos, ferries, transfers compuestos, self-transfers), pendientes con deadlines, presupuesto multi-divisa y fichas de destino — accesible **sin conexión** en zonas sin cobertura (Borneo, ferries).

No es un generador de itinerarios genérico: el itinerario **ya está diseñado**. La app lo ejecuta, lo vigila (alertas) y lo mantiene a mano. Es un clon de lo mejor de Wanderlog + TripIt, especializado para **una familia en un viaje multi-destino concreto**.

## 2. Personas

| Persona | Necesidad principal | Implicación de producto |
|---------|---------------------|--------------------------|
| **Alexis / Cristina (adultos)** | Tener todo bajo control sin estrés logístico; saber "qué toca ahora" y "qué tengo que reservar/pagar" | Vista "Hoy", panel de pendientes, alertas de deadlines, docs de reserva offline |
| **Aira (9) / Leo (5)** | Saber qué cosas guais vienen; sentirse parte | Modo niños / countdown a highlights ("faltan 3 días para los orangutanes"), iconos, factor wow |
| **La familia en ruta** | Consultar rápido offline, en el móvil, con poca batería/cobertura | Offline-first, UI móvil de carga rápida, modo de bajo consumo |

## 3. Funcionalidades por prioridad

### 3.1 MVP imprescindible (v1)

1. **Vista "Hoy" / timeline diario por horas**
   - Bloques tipados por hora: `transporte` · `actividad` · `comida` · `descanso` · `alojamiento`.
   - Estado de cada bloque (pendiente / hecho / reservado / incluido / gratis).
   - Códigos de color por destino (reutilizar la paleta del HTML base).
   - Detección de conflictos (solape actividad/transfer, check-out antes de check-in).

2. **Navegación del viaje**
   - Línea de tiempo global de 23 días → entrar a cada día.
   - Agrupación por destino (Singapur, Sepilok, Kinabatangan, KL, Ubud, Gili Air, Sanur).

3. **Legs de transporte con modelado avanzado**
   - Vuelo / ferry / transfer / tren / bus, con origen→destino, horas, nº, ref, estado.
   - **Self-transfer**: cadena de legs con billetes separados + buffer de conexión + **alerta de "conexión en riesgo"**.
   - **Transfer compuesto** (Bluewater: minivan + barco) como un leg con sub-tramos.
   - Campo de **advertencias** prominente (⚠️ T4 sin MRT, ⚠️ KLIA2, ⚠️ trasbordo propio).

4. **Alojamientos**
   - Por destino: hotel, check-in/out, noches, tipo de habitación, capacidad, precio, ref, contacto, estado.

5. **Panel de pendientes (Inbox de tareas)**
   - Tareas agrupadas por urgencia y deadline; categoría (reservar / comprar / gestionar / verificar).
   - **Recordatorios** con esquema de lead-time tipo TripIt: 3 días / 24 h / 4 h antes.

6. **Presupuesto multi-divisa**
   - Por categoría (vuelos / alojamiento / actividades / comida / transporte / varios).
   - Estado por ítem (pagado / pendiente / estimado); EUR ↔ SGD / MYR / IDR.
   - Estimado vs. gastado.

7. **Ficha de destino contextual**
   - Logística: cómo llegar, moneda, propina, transporte local, enchufes, agua.
   - **Alertas específicas** del destino (terminal, "no hay coches en Gili Air", malaria Borneo).
   - Contactos de emergencia: seguro (Heymondo, póliza, urgencias 24 h), hotel, embajada.

8. **Offline-first**
   - Todo el contenido del viaje accesible sin red (IndexedDB + Cache API, `persist()`).
   - Instalable (PWA): icono en pantalla de inicio, splash, pantalla completa.

### 3.2 Avanzado (v2+)

- **Mapas offline** descargables por destino (MapLibre + PMTiles en OPFS).
- **Import de reservas** reenviando emails (parseo best-effort).
- **Notificaciones push reales** (más allá de avisos in-app) y multicanal.
- **Modo niños**: countdown a highlights, "logros", galería.
- **Colaboración** (Cristina edita, comentarios).
- **Registro de gastos reales** en ruta (gasto rápido por categoría).
- **IA como asistente** de research con verificación contra el timeline (nunca autónoma).
- **Diario de viaje** (fotos + notas por día, estilo Polarsteps).

## 4. Casos de uso avanzados que la app debe resolver (del docx 9.4)

- Self-transfer (billetes separados, riesgo no garantizado por aerolínea).
- Terminales distintas en mismo aeropuerto (T4 Changi, KLIA vs KLIA2).
- Wildlife timing (cruceros amanecer vs. tarde): notas de contexto experto por actividad.
- Logística de ferries con niños (equipaje, hora de llegada al puerto, alternativa por oleaje).
- Door-to-door / transfers compuestos (minivan + barco).
- Plataformas de reserva especializadas (SeekSophie, Bluewater) que las generalistas no tienen.

## 5. Modelo de datos (entidades)

Derivado del docx (9.2), validado por el modelo de TripIt (AirObject, LodgingObject, ActivityObject…) y Wanderlog.

- **Trip**: id, nombre, descripción, fechas, nº viajeros, perfil, estado global, presupuesto estimado vs. gastado.
- **Traveler**: nombre, tipo (adulto/niño), edad, pasaporte, notas (profilaxis, etc.).
- **Day**: fecha, destino, título, tipo (viaje/exploración/activación/descanso), alojamiento activo, notas/alertas.
- **Block / Activity**: día, tipo, título, ubicación, hora inicio/fin, duración, estado, precio, divisa, enlace/ref de reserva, público objetivo (todos/adultos/niños), notas de contexto.
- **Leg** (transporte): tipo, origen→destino, fecha, hora salida/llegada, nº, ref, estado, **advertencias**, `selfTransferGroup` (cadena con buffer), sub-tramos (transfer compuesto).
- **Accommodation**: destino, hotel, check-in/out, noches, tipo habitación, capacidad, precio, ref, contacto, estado.
- **Task**: qué, urgencia, deadline, categoría, estado, leadTimes[].
- **BudgetItem**: categoría, concepto, importe, divisa, estado (pagado/pendiente/estimado), notas.
- **Destination**: nombre, color, logística, alertas, contactos de emergencia.
- **Restaurant** (catálogo): destino, nombre, cocina, precio, kid-friendly, momento, especialidad, zona, reservar?.

## 6. Datos canónicos

Fuente de verdad: **docx Marco v1.0 + HTML** (Sukau Greenview, trasbordo KUL, con Gili Air). El **Excel es versión anterior** (Sukau Rainforest, ruta SIN→KK→SDK, sin Gili Air) — se usa solo para datos de detalle que no contradigan al docx/HTML.
