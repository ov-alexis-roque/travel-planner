import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Estado de UI no persistente: qué muestra el mapa lateral (iPad/desktop).
// focusDayId = día en foco; exploreDest/exploreView = destino y filtro activos
// en la pestaña Explorar (para que el mapa lateral los siga).
type ExploreView = 'all' | 'must' | 'activity' | 'food' | 'kids'
interface UIState {
  focusDayId: string | null
  setFocusDay: (id: string) => void
  exploreDest: string
  setExploreDest: (id: string) => void
  exploreView: ExploreView
  setExploreView: (v: ExploreView) => void
}
export const useUI = create<UIState>((set) => ({
  focusDayId: null,
  setFocusDay: (id) => set({ focusDayId: id }),
  exploreDest: 'sin',
  setExploreDest: (id) => set({ exploreDest: id }),
  exploreView: 'all',
  setExploreView: (v) => set({ exploreView: v }),
}))

// Estado persistente del usuario (v1: localStorage; v2: IndexedDB + sync).
// Guarda overrides sobre el contenido canónico: tareas hechas, ítems de día marcados.

interface PlannerState {
  taskDone: Record<string, boolean>
  statusDone: Record<string, boolean> // clave: `${dayId}:${index}`
  addedByDay: Record<string, string[]> // dayId -> placeId[]
  movedBase: Record<string, string> // baseKey `${origDayId}:${n}` -> targetDayId
  hiddenBase: Record<string, boolean> // baseKey -> oculto
  order: Record<string, string[]> // dayId -> orden explícito de claves de agenda
  packDone: Record<string, boolean> // id de ítem de maleta -> empacado
  togglePack: (id: string) => void
  isPackDone: (id: string) => boolean
  vaultText: Record<string, string> // campos editables de la bóveda (seguro, contactos, niños…)
  setVaultText: (key: string, value: string) => void
  mapPacks: Record<string, { tiles: number; ts: number }> // destId -> mapa offline descargado
  setMapPack: (destId: string, tiles: number, ts: number) => void
  expenses: { id: string; label: string; cat: string; amount: number; cur: string; eur: number; ts: number }[]
  addExpense: (e: { label: string; cat: string; amount: number; cur: string; eur: number; ts: number }) => void
  removeExpense: (id: string) => void
  passportDone: Record<string, boolean> // sellos conseguidos del Pasaporte de Exploradores
  togglePassport: (id: string) => void
  toggleTask: (id: string) => void
  toggleStatus: (dayId: string, index: number) => void
  isTaskDone: (id: string, fallback: boolean) => boolean
  isStatusDone: (dayId: string, index: number, fallback: boolean) => boolean
  addPlace: (dayId: string, placeId: string) => void
  removePlace: (dayId: string, placeId: string) => void
  moveBaseToDay: (origDayId: string, n: number, targetDay: string) => void
  hideBase: (origDayId: string, n: number) => void
  reorder: (dayId: string, key: string, dir: -1 | 1, currentKeys: string[]) => void
  setOrder: (dayId: string, keys: string[]) => void
  reset: () => void
}

export const usePlanner = create<PlannerState>()(
  persist(
    (set, get) => ({
      taskDone: {},
      statusDone: {},
      addedByDay: {},
      movedBase: {},
      hiddenBase: {},
      order: {},
      packDone: {},
      togglePack: (id) =>
        set((s) => ({ packDone: { ...s.packDone, [id]: !s.packDone[id] } })),
      isPackDone: (id) => !!get().packDone[id],
      vaultText: {},
      setVaultText: (key, value) =>
        set((s) => ({ vaultText: { ...s.vaultText, [key]: value } })),
      mapPacks: {},
      setMapPack: (destId, tiles, ts) =>
        set((s) => ({ mapPacks: { ...s.mapPacks, [destId]: { tiles, ts } } })),
      expenses: [],
      addExpense: (e) =>
        set((s) => ({ expenses: [{ ...e, id: `${e.ts}-${s.expenses.length}` }, ...s.expenses] })),
      removeExpense: (id) =>
        set((s) => ({ expenses: s.expenses.filter((x) => x.id !== id) })),
      passportDone: {},
      togglePassport: (id) =>
        set((s) => ({ passportDone: { ...s.passportDone, [id]: !s.passportDone[id] } })),
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
      moveBaseToDay: (origDayId, n, targetDay) =>
        set((s) => ({ movedBase: { ...s.movedBase, [`${origDayId}:${n}`]: targetDay } })),
      hideBase: (origDayId, n) =>
        set((s) => ({ hiddenBase: { ...s.hiddenBase, [`${origDayId}:${n}`]: true } })),
      reorder: (dayId, key, dir, currentKeys) =>
        set((s) => {
          const keys = [...currentKeys]
          const i = keys.indexOf(key)
          const j = i + dir
          if (i < 0 || j < 0 || j >= keys.length) return {}
          ;[keys[i], keys[j]] = [keys[j], keys[i]]
          return { order: { ...s.order, [dayId]: keys } }
        }),
      setOrder: (dayId, keys) => set((s) => ({ order: { ...s.order, [dayId]: keys } })),
      reset: () => set({ taskDone: {}, statusDone: {}, addedByDay: {}, movedBase: {}, hiddenBase: {}, order: {}, packDone: {}, passportDone: {} }),
    }),
    { name: 'roque-asia-2026' },
  ),
)
