import { Menu } from 'lucide-react'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 bg-slate-900/80 border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3">
          <img src="/flame-icon.svg" alt="Logo" className="w-8 h-8" />
          <span className="text-white font-semibold tracking-tight">WrestlePro</span>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-200">
          <a href="#events" className="hover:text-white">Events</a>
          <a href="#about" className="hover:text-white">About</a>
          <a href="#contact" className="hover:text-white">Contact</a>
        </nav>
        <button className="md:hidden text-slate-200 hover:text-white" aria-label="Open menu">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </header>
  )
}
