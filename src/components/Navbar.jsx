import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, Sparkles } from 'lucide-react'
import { Logo3D } from './Logo3D'
import { Button } from './Button'

const links = [
  { label: 'Browse Creators', href: '#creators' },
  { label: 'How it Works', href: '#how-it-works' },
  { label: 'Why Kalakaar', href: '#why' },
  { label: 'For Creators', href: '#for-creators' },
  { label: 'FAQs', href: '#faq' },
]

export function Navbar({ onOpenRoleModal, onOpenNav, onOpenDashboard, currentView = 'home' }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 35)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex justify-center pointer-events-none px-3 sm:px-6">
      <motion.nav
        initial={false}
        animate={{
          y: scrolled ? 16 : 0,
          width: scrolled ? 'min(94vw, 1060px)' : '100%',
          maxWidth: scrolled ? '1060px' : '1280px',
          height: scrolled ? '3.75rem' : '5rem',
          borderRadius: scrolled ? '9999px' : '0px',
          backgroundColor: scrolled ? 'rgba(12, 12, 12, 0.82)' : 'rgba(0, 0, 0, 0)',
          backdropFilter: scrolled ? 'blur(24px) saturate(170%)' : 'blur(0px)',
          borderColor: scrolled ? 'rgba(255, 255, 255, 0.14)' : 'rgba(255, 255, 255, 0)',
          boxShadow: scrolled
            ? '0 20px 45px -15px rgba(0, 0, 0, 0.85), 0 0 35px -5px rgba(109, 0, 26, 0.4)'
            : '0 0 0 0 rgba(0, 0, 0, 0)',
          paddingLeft: scrolled ? '1.25rem' : '1.5rem',
          paddingRight: scrolled ? '1.25rem' : '1.5rem',
        }}
        transition={{
          type: 'spring',
          stiffness: 280,
          damping: 28,
          mass: 0.8,
        }}
        className="pointer-events-auto border flex items-center justify-between mx-auto transition-colors duration-300 relative overflow-hidden"
      >
        {/* Subtle interior gradient reflection when in frosted pill mode */}
        {scrolled && (
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-burgundy/15 via-transparent to-burgundy-light/10 opacity-70" />
        )}

        {/* Brand Logo with 3D Interactive Rotation */}
        <a href="#top" className="relative z-10 flex items-center gap-2.5 sm:gap-3 shrink-0 group">
          <Logo3D size={scrolled ? 'sm' : 'md'} />
          <div className="flex flex-col">
            <span
              className={`font-display font-extrabold tracking-tight text-white flex items-center gap-1.5 transition-all duration-300 ${
                scrolled ? 'text-lg' : 'text-xl'
              }`}
            >
              Kalakaar
              {!scrolled && (
                <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-burgundy/30 text-burgundy-light font-bold border border-burgundy/40">
                  Stage
                </span>
              )}
            </span>
            {!scrolled && (
              <span className="font-deva text-[11px] text-muted -mt-1 group-hover:text-white transition-colors">
                कलाकार · Direct Hiring
              </span>
            )}
          </div>
        </a>

        {/* Desktop Links */}
        <div className="relative z-10 hidden lg:flex items-center gap-1 xl:gap-2">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase transition-all duration-200 ${
                scrolled
                  ? 'text-white/75 hover:text-white hover:bg-white/10'
                  : 'text-muted hover:text-white hover:drop-shadow-[0_0_8px_rgba(209,41,79,0.5)]'
              }`}
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={onOpenDashboard}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase transition-all duration-200 cursor-pointer ${
              currentView === 'dashboard'
                ? 'bg-burgundy text-white shadow-md shadow-burgundy/40'
                : scrolled
                ? 'text-white/75 hover:text-white hover:bg-white/10'
                : 'text-burgundy-light font-bold hover:text-white'
            }`}
          >
            Dashboard
          </button>
        </div>

        {/* Desktop CTA & Liquid Menu Trigger */}
        <div className="relative z-10 flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => onOpenRoleModal?.('login')}
            className={`hidden sm:inline-block text-xs font-semibold uppercase tracking-wider transition-colors ${
              scrolled
                ? 'px-3 py-1.5 rounded-full text-white/75 hover:text-white hover:bg-white/10'
                : 'px-4 py-2 text-muted hover:text-white'
            }`}
          >
            Sign In
          </button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => onOpenRoleModal?.('onboard')}
            className={`hidden sm:inline-flex shadow-lg shadow-burgundy/40 border border-burgundy-light/40 hover:shadow-burgundy-light/40 group transition-all duration-300 ${
              scrolled ? 'px-3.5 py-1.5 text-xs' : 'px-4 py-2'
            }`}
          >
            <Sparkles size={13} className="text-burgundy-light transition group-hover:rotate-12" />
            <span>Join Marketplace</span>
          </Button>

          {/* Liquid Side Nav Trigger Pill */}
          <button
            onClick={onOpenNav}
            className={`flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/15 bg-white/[0.08] hover:bg-burgundy hover:border-burgundy-light text-xs font-bold uppercase tracking-wider text-white transition-all shadow-md group cursor-pointer ${
              scrolled ? 'px-3 py-1.5' : 'px-3.5 py-2'
            }`}
            aria-label="Open liquid navigation"
          >
            <Menu size={15} className="text-white group-hover:scale-110 transition-transform" />
            <span className="hidden md:inline">Menu</span>
          </button>
        </div>
      </motion.nav>
    </header>
  )
}
