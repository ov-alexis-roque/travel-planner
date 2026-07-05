import { useEffect, useState } from 'react'
import { Routes, Route, NavLink, Navigate } from 'react-router-dom'
import Today from './screens/Today'
import Summary from './screens/Summary'
import Itinerary from './screens/Itinerary'
import DayDetail from './screens/DayDetail'
import Explore from './screens/Explore'
import Flights from './screens/Flights'
import Hotels from './screens/Hotels'
import Packing from './screens/Packing'
import PackingPrint from './screens/PackingPrint'
import Docs from './screens/Docs'
import Money from './screens/Money'
import Phrases from './screens/Phrases'
import Passport from './screens/Passport'
import Tasks from './screens/Tasks'
import Budget from './screens/Budget'
import SideMap from './components/SideMap'

const NAV = [
  { to: '/hoy', icon: '🏠', label: 'Hoy' },
  { to: '/itinerario', icon: '🗓️', label: 'Itinerario' },
  { to: '/explorar', icon: '🔍', label: 'Explorar' },
  { to: '/resumen', icon: '🧭', label: 'Resumen' },
  { to: '/presupuesto', icon: '💶', label: 'Budget' },
  { to: '/pendientes', icon: '📋', label: 'Tareas' },
]

export default function App() {
  const [online, setOnline] = useState(navigator.onLine)
  useEffect(() => {
    const on = () => setOnline(true)
    const off = () => setOnline(false)
    window.addEventListener('online', on)
    window.addEventListener('offline', off)
    return () => { window.removeEventListener('online', on); window.removeEventListener('offline', off) }
  }, [])

  return (
    <div className="app-shell">
      <div className="app">
        {!online && (
          <div className="offline-bar">📴 Sin conexión · plan e itinerario disponibles · los mapas usan lo ya descargado</div>
        )}
        <Routes>
          <Route path="/" element={<Navigate to="/resumen" replace />} />
          <Route path="/hoy" element={<Today />} />
          <Route path="/resumen" element={<Summary />} />
          <Route path="/itinerario" element={<Itinerary />} />
          <Route path="/explorar" element={<Explore />} />
          <Route path="/dia/:id" element={<DayDetail />} />
          <Route path="/vuelos" element={<Flights />} />
          <Route path="/hoteles" element={<Hotels />} />
          <Route path="/maleta" element={<Packing />} />
          <Route path="/maleta-print" element={<PackingPrint />} />
          <Route path="/documentos" element={<Docs />} />
          <Route path="/cambio" element={<Money />} />
          <Route path="/frases" element={<Phrases />} />
          <Route path="/pasaporte" element={<Passport />} />
          <Route path="/pendientes" element={<Tasks />} />
          <Route path="/presupuesto" element={<Budget />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <nav className="bottom">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} className={({ isActive }) => (isActive ? 'active' : '')}>
              <span className="ni">{n.icon}</span>
              <span>{n.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <aside className="side-map">
        <SideMap />
      </aside>
    </div>
  )
}
