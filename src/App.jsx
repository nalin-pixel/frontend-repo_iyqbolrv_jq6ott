import { useEffect, useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import EventCard from './components/EventCard'
import Chatbot from './components/Chatbot'
import AuthModal from './components/AuthModal'

function App() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [query, setQuery] = useState('')
  const [remoteEvents, setRemoteEvents] = useState([])
  const [localEvents, setLocalEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [authOpen, setAuthOpen] = useState(false)
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('user') || 'null') } catch { return null }
  })

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const [remoteRes, localRes] = await Promise.all([
          fetch(`${baseUrl}/api/smoothcomp/events?q=${encodeURIComponent(query)}`).then(r => r.json()),
          fetch(`${baseUrl}/api/events`).then(r => r.json()),
        ])
        setRemoteEvents(remoteRes.events || [])
        setLocalEvents(localRes.events || [])
      } catch (e) {
        setRemoteEvents([])
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [query])

  const events = useMemo(() => {
    const list = [...localEvents, ...remoteEvents]
    return list
  }, [localEvents, remoteEvents])

  const onRegister = async (event) => {
    const first = prompt('First name')
    const last = prompt('Last name')
    const email = prompt('Email')
    if (!first || !last || !email) return
    try {
      const res = await fetch(`${baseUrl}/api/registrations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event_id: event._id || event.slug || String(event.id || event.external_id || event.title),
          participant: { first_name: first, last_name: last, email },
          division: event.division || 'Open',
        })
      })
      const data = await res.json()
      alert(data.id ? 'Registration submitted!' : 'Could not submit registration')
    } catch (e) {
      alert('Error submitting registration')
    }
  }

  const onAuthed = (u) => setUser(u)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <Navbar onLoginClick={() => setAuthOpen(true)} />
      <Hero onSearch={setQuery} />
      <section id="events" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Upcoming Events</h2>
          {loading && <span className="text-slate-400 text-sm">Loading…</span>}
        </div>
        {events.length === 0 ? (
          <p className="text-slate-400">No events found. Try a different search.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {events.map((ev, idx) => (
              <EventCard key={idx} event={ev} onRegister={onRegister} />
            ))}
          </div>
        )}
      </section>
      <Chatbot baseUrl={baseUrl} />
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} baseUrl={baseUrl} onAuthed={onAuthed} />
    </div>
  )
}

export default App
