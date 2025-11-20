export default function EventCard({ event, onRegister }) {
  const start = event.start_date ? new Date(event.start_date) : null
  const date = start ? start.toLocaleDateString() : 'TBA'

  return (
    <div className="group rounded-2xl bg-slate-800/60 border border-white/10 p-5 hover:border-blue-500/40 transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-white font-semibold text-lg">{event.title || event.name}</h3>
          <p className="text-slate-400 text-sm mt-1">{event.location || event.city || 'Location TBA'}</p>
        </div>
        <span className="text-xs px-2 py-1 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">{date}</span>
      </div>
      {event.description && (
        <p className="text-slate-300 text-sm mt-3 line-clamp-3">{event.description}</p>
      )}
      <div className="mt-4 flex items-center gap-3">
        <button onClick={() => onRegister?.(event)} className="inline-flex items-center rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-4 py-2 transition-colors">Register</button>
        {event.url && (
          <a href={event.url} target="_blank" rel="noreferrer" className="text-slate-300 text-sm hover:text-white">View details</a>
        )}
      </div>
    </div>
  )
}
