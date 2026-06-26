import { useState } from 'react'
import { trip } from '../data/trip'
import { usePlanner } from '../store'
import type { Task, TaskUrgency } from '../types'

const GROUPS: { key: TaskUrgency; label: string; color: string }[] = [
  { key: 'urgent', label: 'Urgente — cerrar esta semana', color: 'var(--urg)' },
  { key: 'soon', label: 'Pronto — reservar antes de salir', color: 'var(--warn)' },
  { key: 'buy', label: 'Cosas a comprar', color: 'var(--sa)' },
  { key: 'week', label: 'Semana antes de salir', color: 'var(--muted)' },
]

export default function Tasks() {
  const isTaskDone = usePlanner((s) => s.isTaskDone)
  const toggleTask = usePlanner((s) => s.toggleTask)
  const [showDone, setShowDone] = useState(false)

  const total = trip.tasks.length
  const doneTasks = trip.tasks.filter((t) => isTaskDone(t.id, t.done))
  const done = doneTasks.length

  const TaskRow = ({ t }: { t: Task }) => {
    const on = isTaskDone(t.id, t.done)
    return (
      <button className={`task ${on ? 'on' : ''}`} style={{ width: '100%', textAlign: 'left' }} onClick={() => toggleTask(t.id)}>
        <span className="tbox">{on ? '✓' : ''}</span>
        <span className="tmain">
          <span className="tt">{t.icon} {t.title}</span>
          {t.detail && <span className="td">{t.detail}</span>}
          <span className="tmeta">
            {t.where && <span className="twhere">🔗 {t.where}</span>}
            {t.cost && <span className="tcost">{t.cost}</span>}
          </span>
        </span>
      </button>
    )
  }

  return (
    <>
      <div className="page-head">
        <h1>Pendientes</h1>
        <div className="sub">{done}/{total} completadas</div>
      </div>

      <div className="card tight">
        <div className="prog-label"><span>Progreso de preparación</span><span>{Math.round((done / total) * 100)}%</span></div>
        <div className="prog"><i style={{ width: `${(done / total) * 100}%` }} /></div>
      </div>

      {GROUPS.map((g) => {
        const tasks = trip.tasks.filter((t) => t.urgency === g.key && !isTaskDone(t.id, t.done))
        if (tasks.length === 0) return null
        return (
          <div key={g.key}>
            <div className="urg-head"><span className="urg-dot" style={{ background: g.color }} />{g.label} <span style={{ color: 'var(--muted)' }}>({tasks.length})</span></div>
            <div className="card" style={{ padding: 0 }}>
              {tasks.map((t) => <TaskRow key={t.id} t={t} />)}
            </div>
          </div>
        )
      })}

      {trip.tasks.every((t) => isTaskDone(t.id, t.done)) && (
        <div className="card" style={{ textAlign: 'center', color: 'var(--ok)', fontWeight: 700 }}>🎉 ¡Todo listo para volar!</div>
      )}

      {done > 0 && (
        <>
          <button className="done-head" onClick={() => setShowDone((v) => !v)}>
            <span>✅ Completadas ({done})</span>
            <span>{showDone ? '▲' : '▼'}</span>
          </button>
          {showDone && (
            <div className="card" style={{ padding: 0 }}>
              {doneTasks.map((t) => <TaskRow key={t.id} t={t} />)}
            </div>
          )}
        </>
      )}
      <div style={{ height: 12 }} />
    </>
  )
}
