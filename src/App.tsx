import { Routes, Route, NavLink, Navigate } from 'react-router-dom'
import Today from './screens/Today'
import Summary from './screens/Summary'
import Itinerary from './screens/Itinerary'
import DayDetail from './screens/DayDetail'
import Flights from './screens/Flights'
import Tasks from './screens/Tasks'
import Budget from './screens/Budget'

const NAV = [
  { to: '/', icon: '🏠', label: 'Hoy', end: true },
  { to: '/itinerario', icon: '🗓️', label: 'Días' },
  { to: '/resumen', icon: '🧭', label: 'Resumen' },
  { to: '/vuelos', icon: '✈️', label: 'Vuelos' },
  { to: '/presupuesto', icon: '💶', label: 'Budget' },
  { to: '/pendientes', icon: '📋', label: 'Tareas' },
]

export default function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Today />} />
        <Route path="/resumen" element={<Summary />} />
        <Route path="/itinerario" element={<Itinerary />} />
        <Route path="/dia/:id" element={<DayDetail />} />
        <Route path="/vuelos" element={<Flights />} />
        <Route path="/pendientes" element={<Tasks />} />
        <Route path="/presupuesto" element={<Budget />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <nav className="bottom">
        {NAV.map((n) => (
          <NavLink key={n.to} to={n.to} end={n.end} className={({ isActive }) => (isActive ? 'active' : '')}>
            <span className="ni">{n.icon}</span>
            <span>{n.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
