import { DAY_TYPES } from '../constants/dayTypes'

// ---- no day started: pick a template ----
export default function DayPicker({ onPick }) {
  return (
    <main>
      <h1>logbook</h1>
      <p className="muted">start today's log</p>
      <div className="day-pick">
        {Object.entries(DAY_TYPES).map(([key, t]) => (
          <button key={key} className="day-btn" onClick={() => onPick(key)}>
            {t.label}
            <span className="day-sub">{t.opening}</span>
          </button>
        ))}
      </div>
    </main>
  )
}
