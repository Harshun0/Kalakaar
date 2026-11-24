import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react'
import { Logo3D } from './Logo3D'

const navLinks = [
  { label: 'Home', href: '#top', deva: 'मुख्य पृष्ठ' },
  { label: 'Creators', href: '#creators', deva: 'कलाकार सूची' },
  { label: 'Dashboard', href: 'dashboard', deva: 'व्यक्तिगत डैशबोर्ड' },
  { label: 'How It Works', href: '#how-it-works', deva: 'प्रक्रिया' },
  { label: 'Why Kalakaar', href: '#why', deva: 'विशेषताएँ' },
  { label: 'For Creators', href: '#for-creators', deva: 'कलाकारों के लिए' },
  { label: 'FAQs', href: '#faq', deva: 'सवाल-जवाब' },
]

function LiquidNavLinkItem({ link, index, isHovered, onHover, onClick }) {
  const itemRef = useRef(null)
  const [offset, setOffset] = useState({ x: 0, y: 0, rotate: 0 })

  const handleMouseMove = (e) => {
    if (!itemRef.current) return
    const rect = itemRef.current.getBoundingClientRect()
    // calculate mouse position normalized from center (-1 to 1)
    const normX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)
    const normY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)

    // Liquid translation: drifts with cursor, tilts -7deg (matching Hover.dev screenshot)
    setOffset({
      x: normX * 22,
      y: normY * 12,
      rotate: -7 + normX * 4,
    })
  }

  const handleMouseEnter = () => {
    onHover(index)
    setOffset({ x: 10, y: -2, rotate: -7 })
  }

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0, rotate: 0 })
  }

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{
        delay: index * 0.05 + 0.1,
        type: 'spring',
        stiffness: 300,
        damping: 26,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex items-center py-1 sm:py-2"
    >
      <button
        onClick={onClick}
        className="relative z-10 w-full text-left py-2 px-1 flex items-center justify-between cursor-pointer group"
      >
        <motion.span
          className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-[76px] tracking-tight inline-block select-none leading-[1.1]"
          animate={{
            x: isHovered ? offset.x : 0,
            y: isHovered ? offset.y : 0,
            rotate: isHovered ? offset.rotate : 0,
            color: isHovered ? '#D1294F' : 'rgba(255, 255, 255, 0.75)',
          }}
          transition={{
            type: 'spring',
            stiffness: 240,
            damping: 14,
            mass: 0.5,
          }}
          style={{
            originX: 0.05,
            originY: 0.5,
          }}
        >
          {link.label}
        </motion.span>

        <div className="flex items-center gap-3">
          <span
            className={`font-deva text-sm sm:text-base md:text-lg font-semibold transition-all duration-300 ${
              isHovered
                ? 'text-[#D1294F] opacity-100 translate-x-0'
                : 'text-muted/30 opacity-0 -translate-x-4'
            }`}
          >
            {link.deva}
          </span>
          {isHovered && (
            <motion.div
              initial={{ scale: 0, x: -12 }}
              animate={{ scale: 1, x: 0 }}
              transition={{ type: 'spring', stiffness: 340, damping: 20 }}
            >
              <ArrowRight size={28} className="text-[#D1294F]" />
            </motion.div>
          )}
        </div>
      </button>
    </motion.div>
  )
}

export function LiquidSideNav({ isOpen, onClose, onOpenRoleModal, onOpenDashboard }) {
  const [hoveredIndex, setHoveredIndex] = useState(1) // Default to Creators or active

  const handleLinkClick = (href) => {
    onClose()
    if (href === 'dashboard') {
      onOpenDashboard?.()
      return
    }
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-2xl"
          />

          {/* Full Page Liquid Nav (Sliding in quickly from Right to Left, NO ruler/border) */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: '0%' }}
            exit={{ x: '100%' }}
            transition={{
              type: 'spring',
              damping: 32,
              stiffness: 300,
              mass: 0.85,
            }}
            className="fixed inset-0 h-full w-full bg-black/95 backdrop-blur-3xl px-6 sm:px-14 md:px-20 py-8 sm:py-12 flex flex-col justify-between shadow-2xl z-50 overflow-y-auto scrollbar-none"
          >
            {/* Ambient Background Flares */}
            <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-burgundy/30 blur-[130px]" />
            <div className="pointer-events-none absolute -bottom-40 right-10 h-96 w-96 rounded-full bg-burgundy-light/20 blur-[150px]" />

            {/* Header: Logo & Close Button (Top right X, no dividing ruler line) */}
            <div className="relative z-10 flex items-center justify-between pb-4">
              <div className="flex items-center gap-3">
                <Logo3D size="md" />
                <div>
                  <span className="font-display font-black text-xl text-white tracking-tight">Kalakaar</span>
                  <span className="font-deva text-xs text-muted block -mt-1">कलाकार मंच</span>
                </div>
              </div>

              {/* Close Button X (Top Right as in Hover.dev Screenshot) */}
              <button
                onClick={onClose}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-white hover:bg-burgundy hover:border-burgundy-light transition-all duration-200 shadow-xl cursor-pointer"
                aria-label="Close navigation"
              >
                <X size={26} />
              </button>
            </div>

            {/* Main Links Body (Full page majestic typography, tilts -7deg, turns red, drifts with cursor) */}
            <div className="relative z-10 my-auto py-6 max-w-4xl flex flex-col gap-1">
              {navLinks.map((link, index) => (
                <LiquidNavLinkItem
                  key={link.label}
                  link={link}
                  index={index}
                  isHovered={hoveredIndex === index}
                  onHover={setHoveredIndex}
                  onClick={() => handleLinkClick(link.href)}
                />
              ))}
            </div>

            {/* Bottom Actions Bar (Clean, no horizontal ruler line) */}
            <div className="relative z-10 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-muted">
                <ShieldCheck size={18} className="text-burgundy-light" />
                <span>Zero Commission Direct Creator Marketplace</span>
              </div>

              <div className="flex items-center gap-4 w-full sm:w-auto">
                <button
                  onClick={() => {
                    onClose()
                    onOpenRoleModal?.('login')
                  }}
                  className="flex-1 sm:flex-none text-xs sm:text-sm font-bold uppercase tracking-wider px-5 py-2.5 rounded-full text-muted hover:text-white transition cursor-pointer"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    onClose()
                    onOpenRoleModal?.('onboard')
                  }}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-full bg-white text-black px-6 py-3 text-xs sm:text-sm font-black uppercase tracking-wider hover:bg-neutral-200 transition shadow-xl cursor-pointer"
                >
                  <Sparkles size={14} className="text-burgundy" />
                  <span>Join Platform</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
