import { useEffect, useState } from 'react'
import './App.css'
import { pingBackend, sendEntry } from './api'
import { DAY_TYPES } from './constants/dayTypes'
import { fmtDate, fmtTime } from './utils/time'
import Backdrop from './components/Backdrop'
import DayPicker from './components/DayPicker'
import HoldButton from './components/HoldButton'

export default function App() {
  const [day, setDay] = useState(null)
  const [custom, setCustom] = useState('')
  const [remark, setRemark] = useState('')
  const [customTime, setCustomTime] = useState('')

  useEffect(pingBackend, [])

  function addEntry(subject) {
    const timing = customTime ? customTime.replace(':', '') + 'hrs' : fmtTime()
    sendEntry({ timing, subject, remark }, fmtDate())
    setRemark('')
    setCustomTime('')
    setCustom('')
  }

  function startDay(type) {
    setDay(type)
    setCustom(DAY_TYPES[type].opening)
  }

  function addCustom() {
    addEntry(custom)
  }

  if (!day) {
    return (
      <>
        <Backdrop />
        <DayPicker onPick={startDay} />
      </>
    )
  }

  return (
    <>
      <Backdrop />
      <main>
        <h1>{DAY_TYPES[day].label.toLowerCase()}</h1>

        <div className="remark-bar">
          <input
            value={remark}
            onChange={e => setRemark(e.target.value)}
            placeholder="remark for next entry (optional)"
          />
          <input
            type="time"
            value={customTime}
            onChange={e => setCustomTime(e.target.value)}
            title="custom timing (leave empty for now)"
          />
        </div>

        <div className="verbs">
          {DAY_TYPES[day].verbs.map(v => <button key={v} className={custom === v ? 'selected' : ''} onClick={() => setCustom(v)}>{v}</button>)}
        </div>

        <div className="custom">
          <input
            value={custom}
            onChange={e => setCustom(e.target.value)}
            placeholder="custom entry"
          />
        </div>

        <div className="hold-wrap">
          <HoldButton onHold={addCustom}>hold to add</HoldButton>
        </div>

        <button className="reset" onClick={() => setDay(null)}>
          end day / reset
        </button>
      </main>
    </>
  )
}
