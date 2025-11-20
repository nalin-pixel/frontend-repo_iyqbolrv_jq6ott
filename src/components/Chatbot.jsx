import { useState } from 'react'

export default function Chatbot({ baseUrl }) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I can help with registrations, schedules, and event info.' }
  ])
  const [input, setInput] = useState('')

  const send = async () => {
    if (!input.trim()) return
    const userMsg = { role: 'user', content: input }
    setMessages((m) => [...m, userMsg])
    setInput('')
    try {
      const res = await fetch(`${baseUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg.content })
      })
      const data = await res.json()
      setMessages((m) => [...m, { role: 'assistant', content: data.response }])
    } catch (e) {
      setMessages((m) => [...m, { role: 'assistant', content: 'Sorry, I could not reach the server right now.' }])
    }
  }

  return (
    <div>
      <button onClick={() => setOpen(!open)} className="fixed bottom-6 right-6 rounded-full bg-blue-600 hover:bg-blue-500 text-white px-5 py-3 shadow-lg">
        {open ? 'Close' : 'Chat'}
      </button>
      {open && (
        <div className="fixed bottom-20 right-6 w-80 rounded-2xl bg-slate-900 border border-white/10 shadow-2xl overflow-hidden">
          <div className="p-3 text-sm text-slate-200 border-b border-white/10">Assistant</div>
          <div className="h-64 overflow-y-auto p-3 space-y-2">
            {messages.map((m, i) => (
              <div key={i} className={`${m.role === 'assistant' ? 'text-blue-200' : 'text-slate-200'} text-sm`}>{m.content}</div>
            ))}
          </div>
          <div className="p-3 flex gap-2 border-t border-white/10">
            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e)=> e.key==='Enter' && send()} placeholder="Type your question" className="flex-1 rounded-lg bg-slate-800 border border-white/10 px-3 py-2 text-slate-200 placeholder-slate-400 focus:outline-none" />
            <button onClick={send} className="rounded-lg bg-blue-600 hover:bg-blue-500 text-white px-3">Send</button>
          </div>
        </div>
      )}
    </div>
  )
}
