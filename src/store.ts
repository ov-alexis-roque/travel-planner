import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Estado persistente del usuario (v1: localStorage; v2: IndexedDB + sync).
// Guarda overrides sobre el contenido canónico: tareas hechas, ítems de día marcados.

interface PlannerState {
  taskDone: Record<string, boolean>
  statusDone: Record<string, boolean> // clave: `${dayId}:${index}`
  addedByDay: Record<string, string[]> // dayId -> placeId[]
  toggleTask: (id: string) => void
  toggleStatus: (dayId: string, index: number) => void
  isTaskDone: (id: string, fallback: boolean) => boolean
  isStatusDone: (dayId: string, index: number, fallback: boolean) => boolean
  addPlace: (dayId: string, placeId: string) => void
  removePlace: (dayId: string, placeId: string) => void
  dayForPlace: (placeId: string) => string | undefined
  reset: () => void
}

export const usePlanner = create<PlannerState>()(
  persist(
    (set, get) => ({
      taskDone: {},
      statusDone: {},
      addedByDay: {},
      toggleTask: (id) =>
        set((s) => ({ taskDone: { ...s.taskDone, [id]: !s.taskDone[id] } })),
      toggleStatus: (dayId, index) =>
        set((s) => {
          const key = `${dayId}:${index}`
          return { statusDone: { ...s.statusDone, [key]: !s.statusDone[key] } }
        }),
      isTaskDone: (id, fallback) => {
        const v = get().taskDone[id]
        return v === undefined ? fallback : v
      },
      isStatusDone: (dayId, index, fallback) => {
        const v = get().statusDone[`${dayId}:${index}`]
        return v === undefined ? fallback : v
      },
      addPlace: (dayId, placeId) =>
        set((s) => {
          // un sitio solo puede estar en un día: quitarlo de cualquier otro
          const cleaned: Record<string, string[]> = {}
          for (const [d, ids] of Object.entries(s.addedByDay)) {
            cleaned[d] = ids.filter((id) => id !== placeId)
          }
          const current = cleaned[dayId] ?? []
          cleaned[dayId] = current.includes(placeId) ? current : [...current, placeId]
          return { addedByDay: cleaned }
        }),
      removePlace: (dayId, placeId) =>
        set((s) => ({
          addedByDay: { ...s.addedByDay, [dayId]: (s.addedByDay[dayId] ?? []).filter((id) => id !== placeId) },
        })),
      dayForPlace: (placeId) => {
        const entries = Object.entries(get().addedByDay)
        const hit = entries.find(([, ids]) => ids.includes(placeId))
        return hit?.[0]
      },
      reset: () => set({ taskDone: {}, statusDone: {}, addedByDay: {} }),
    }),
    { name: 'roque-asia-2026' },
  ),
)
