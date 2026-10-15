const APPSCRIPT_URL = import.meta.env.VITE_APPSCRIPT_URL

// GET doGet on app start (also wakes Apps Script from cold start)
export function pingBackend() {
  if (!APPSCRIPT_URL) return console.warn('VITE_APPSCRIPT_URL not set')
  fetch(APPSCRIPT_URL)
    .then(res => res.json())
    .then(data => console.log('doGet', data))
    .catch(err => console.error('doGet failed', err))
}

// POST one entry to doPost; text/plain avoids the CORS preflight Apps Script can't answer
export function sendEntry(entry, date) {
  if (!APPSCRIPT_URL) return console.warn('VITE_APPSCRIPT_URL not set')
  fetch(APPSCRIPT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ entry, date }),
  })
    .then(res => res.json())
    .then(data => console.log('doPost', data))
    .catch(err => console.error('doPost failed', err))
}
