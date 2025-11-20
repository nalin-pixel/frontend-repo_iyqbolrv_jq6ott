import { useState } from 'react'

export default function AuthModal({ open, onClose, baseUrl, onAuthed }) {
  const [mode, setMode] = useState('login') // 'login' | 'signup'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [role, setRole] = useState('athlete')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (!open) return null

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const path = mode === 'login' ? '/api/auth/login' : '/api/auth/signup'
      const body = mode === 'login' ? { email, password } : { email, password, name, role }
      const res = await fetch(`${baseUrl}${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Auth failed')
      localStorage.setItem('token', data.access_token)
      localStorage.setItem('user', JSON.stringify(data.user))
      onAuthed?.(data.user)
      onClose?.()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-white/10 p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold">{mode === 'login' ? 'Sign in' : 'Create account'}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-200">✕</button>
        </div>
        <form onSubmit={submit} className="space-y-4">
          {mode === 'signup' && (
            <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Name" className="w-full rounded-lg bg-slate-800 border border-white/10 px-3 py-2 text-slate-200" />
          )}
          <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" className="w-full rounded-lg bg-slate-800 border border-white/10 px-3 py-2 text-slate-200" required />
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" className="w-full rounded-lg bg-slate-800 border border-white/10 px-3 py-2 text-slate-200" required />
          {mode === 'signup' && (
            <select value={role} onChange={(e)=>setRole(e.target.value)} className="w-full rounded-lg bg-slate-800 border border-white/10 px-3 py-2 text-slate-200">
              <option value="athlete">Athlete</option>
              <option value="coach">Coach</option>
              <option value="organizer">Organizer</option>
            </select>
          )}
          {error && <div className="text-red-400 text-sm">{error}</div>}
          <button disabled={loading} className="w-full rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold px-4 py-2">
            {loading ? 'Please wait…' : (mode === 'login' ? 'Sign in' : 'Create account')}
          </button>
        </form>
        <div className="mt-4 text-sm text-slate-400">
          {mode === 'login' ? (
            <button onClick={()=>setMode('signup')} className="text-blue-400 hover:text-blue-300">New here? Create an account</button>
          ) : (
            <button onClick={()=>setMode('login')} className="text-blue-400 hover:text-blue-300">Have an account? Sign in</button>
          )}
        </div>
      </div>
    </div>
  )
}
