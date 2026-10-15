import { useEffect, useRef, useState } from 'react'

export default function HoldButton({ onHold, ms = 3000, children, ...props }) {
  const timer = useRef(null)
  const [holding, setHolding] = useState(false)

  useEffect(() => () => clearTimeout(timer.current), [])

  function start() {
    if (props.disabled) return
    setHolding(true)
    timer.current = setTimeout(() => { setHolding(false); onHold() }, ms)
  }

  function cancel() {
    clearTimeout(timer.current)
    setHolding(false)
  }

  return (
    <button
      {...props}
      className={holding ? 'hold holding' : 'hold'}
      style={{ '--hold-ms': `${ms}ms` }}
      onPointerDown={start}
      onPointerUp={cancel}
      onPointerLeave={cancel}
      onPointerCancel={cancel}
      onContextMenu={e => e.preventDefault()}
    >
      <span>{children}</span>
    </button>
  )
}
