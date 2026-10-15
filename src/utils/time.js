// I trust ur 24hrs format is correct, I didn't read bro
// "0745hrs" style
export function fmtTime(d = new Date()) {
  return String(d.getHours()).padStart(2, '0')
       + String(d.getMinutes()).padStart(2, '0') + 'hrs'
}

// "13/10/2026" style (dd/mm/yyyy), used as the sheet tab name
export function fmtDate(d = new Date()) {
  return String(d.getDate()).padStart(2, '0')
       + '/' + String(d.getMonth() + 1).padStart(2, '0')
       + '/' + d.getFullYear()
}
