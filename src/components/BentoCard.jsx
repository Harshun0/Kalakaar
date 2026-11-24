import { useState, useRef } from 'react'
import { MessageCircle, Tag, SlidersHorizontal, MapPin } from 'lucide-react'
import { cn } from '../lib/utils'

const icons = { MessageCircle, Tag, SlidersHorizontal, MapPin }

export function BentoCard({ card }) {
  const Icon = icons[card.icon] || MessageCircle
  const cardRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        'group relative rounded-3xl p-7 md:p-9 border border-white/10 bg-surface/70 backdrop-blur-2xl overflow-hidden transition-all duration-300 hover:border-burgundy-light/60 hover:-translate-y-1 hover:shadow-2xl hover:shadow-burgundy/20',
        card.size === 'lg' ? 'md:col-span-2' : ''
      )}
    >
      {/* Aceternity Interactive Radial Spotlight on Card */}
      {isHovered && (
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(209,41,79,0.18), transparent 80%)`,
          }}
        />
      )}

      {/* Top Bar with Icon & Stat Badge */}
      <div className="relative z-10 flex items-center justify-between mb-6">
        <div className="w-12 h-12 rounded-2xl bg-burgundy/40 border border-burgundy-light/30 flex items-center justify-center text-burgundy-light group-hover:bg-burgundy group-hover:text-white transition-colors duration-300 shadow-lg shadow-burgundy/30">
          <Icon size={22} />
        </div>
        {card.stat && (
          <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs font-bold text-white uppercase tracking-wider group-hover:border-burgundy-light/40 group-hover:text-burgundy-light transition-colors">
            {card.stat}
          </span>
        )}
      </div>

      {/* Text Content */}
      <div className="relative z-10">
        <h3 className="font-display font-black text-2xl text-white mb-2 group-hover:text-white transition-colors">
          {card.title}
        </h3>
        <p className="text-muted text-sm md:text-base leading-relaxed">
          {card.description}
        </p>
      </div>
    </div>
  )
}
