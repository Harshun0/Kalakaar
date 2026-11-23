import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import logo from '../assets/logo.png'
import { Button } from './Button'

const links = [
  { label: 'Browse', href: '#creators' },
  { label: 'How it Works', href: '#how-it-works' },
  { label: 'For Brands', href: '#why' },
  { label: 'For Creators', href: '#for-creators' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-bg/80 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 md:px-8 h-18 flex items-center justify-between py-3">
        <a href="#top" className="flex items-center shrink-0">
          <img src={logo} alt="Kalakaar" className="h-10 md:h-11 w-auto" />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm font-medium text-muted hover:text-text transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm">Login</Button>
          <Button variant="primary" size="sm">Join as Creator</Button>
        </div>

        <button
          className="md:hidden p-2 text-text"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-white/10 bg-bg/95 backdrop-blur-xl px-5 py-6 flex flex-col gap-5">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-base font-medium text-text"
            >
              {l.label}
            </a>
          ))}
          <div className="flex flex-col gap-3 pt-2">
            <Button variant="ghost" className="w-full">Login</Button>
            <Button variant="primary" className="w-full">Join as Creator</Button>
          </div>
        </div>
      )}
    </header>
  )
}
