import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Star, Quote, CheckCircle2 } from 'lucide-react'
import { testimonials } from '../data/mockData'
import { SectionHeading } from './SectionHeading'

function DynamicStickyTestimonialCard({ t, index, total, activeCardIndex, onSelectCard }) {
  const cardRef = useRef(null)

  // Track the approach of the testimonial card to its deck dock
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'start 15%'],
  })

  // DECK OF CARDS ARRANGEMENT:
  // Fanned deck of testimonial cards collected into one spot with angle tilts and compact 38px offsets
  const deckRotations = [-2.4, 2.0, -0.4]
  const deckOffsetsX = [-7, 7, 0]
  const targetRotation = deckRotations[index] || 0
  const targetX = deckOffsetsX[index] || 0
  const deckTopOffset = `calc(4.75rem + ${index * 38}px)`
  const isSelected = activeCardIndex === index
  const isCovered = activeCardIndex !== null ? !isSelected : false

  // 1. Enters smoothly from below: y: 35 -> 0
  const y = useTransform(scrollYProgress, [0, 0.75, 1], [40, 0, 0])
  const rotate = useTransform(scrollYProgress, [0, 0.75, 1], [index % 2 === 0 ? -5 : 5, 0, targetRotation])
  const x = useTransform(scrollYProgress, [0, 0.75, 1], [index % 2 === 0 ? -16 : 16, 0, targetX])
  // 2. Scale: starts slightly compact (0.94) -> blooms up to 1.0 as it docks into the deck
  const scale = useTransform(scrollYProgress, [0, 0.75, 1], [0.93, 1, 1 - (total - index - 1) * 0.02])
  // 3. Opacity: starts dissolved (0.4) -> full opacity (1.0)
  const opacity = useTransform(scrollYProgress, [0, 0.65], [0.4, 1])
  // 4. Brightness: crisp -> subtle pocket depth dimming as later cards dock
  const brightness = useTransform(scrollYProgress, [0, 0.85, 1], [1, 1, 0.88])

  return (
    <div
      ref={cardRef}
      className="sticky w-full max-w-4xl mx-auto mb-8 sm:mb-10 last:mb-0"
      style={{
        top: deckTopOffset,
        zIndex: isSelected ? 40 : 10 + index,
      }}
    >
      <motion.div
        style={{
          y,
          x,
          rotate: isSelected ? 0 : rotate,
          scale: isSelected ? 1.02 : scale,
          opacity,
          filter: `brightness(${isCovered ? 0.82 : brightness})`,
          transformOrigin: 'top center',
        }}
        whileHover={{
          y: -14,
          rotate: 0,
          scale: 1.02,
          filter: 'brightness(1)',
          zIndex: 45,
          transition: { type: 'spring', stiffness: 350, damping: 22 },
        }}
        onClick={() => onSelectCard?.(index)}
        className="w-full rounded-3xl border border-white/15 border-t-2 border-t-burgundy-light/80 bg-surface/95 backdrop-blur-3xl p-5 sm:p-8 shadow-[-0px_-10px_25px_rgba(0,0,0,0.9),0_25px_60px_rgba(0,0,0,0.95)] relative overflow-hidden group cursor-pointer hover:border-burgundy-light transition-colors duration-300"
      >
        {/* Ambient Top Glow */}
        <div className="pointer-events-none absolute -top-28 -left-28 h-72 w-72 rounded-full bg-burgundy/25 blur-[90px]" />

        {/* Card Deck Corner Marker */}
        <div className="absolute top-2.5 right-3.5 flex items-center gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
          <span className="text-[10px] font-mono tracking-widest text-burgundy-light">STORY 0{index + 1}</span>
          <span className="text-burgundy-light text-xs">✦</span>
        </div>

        {/* ======================================================== */}
        {/* DECK HEADER TAB: VISIBLE WHEN CARDS ARE COLLECTED        */}
        {/* ======================================================== */}
        <div className="relative z-10 flex items-center justify-between pb-3 mb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-burgundy text-white font-display font-black text-sm shadow-md shadow-burgundy/40 shrink-0">
              {t.avatarInitials}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="font-display font-extrabold text-white text-sm sm:text-base leading-tight">
                  {t.name}
                </h4>
                <CheckCircle2 size={13} className="text-burgundy-light fill-burgundy" />
              </div>
              <p className="text-[11px] sm:text-xs text-muted mt-0.5">{t.role}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-burgundy-light">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="fill-burgundy-light" />
              ))}
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-burgundy/30 border border-burgundy-light/30 text-burgundy-light shadow-sm">
              <Quote size={15} />
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* DECK CARD BODY: TESTIMONIAL QUOTE                        */}
        {/* ======================================================== */}
        <div className="relative z-10">
          <p className="font-display font-bold text-lg sm:text-xl md:text-2xl text-white leading-relaxed mb-5">
            “{t.quote}”
          </p>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-muted">
            <span className="flex items-center gap-1.5 text-burgundy-light font-medium">
              <CheckCircle2 size={13} className="text-burgundy-light" />
              Verified Deal on Kalakaar
            </span>
            <span className="rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 text-[11px] text-white/80">
              0% Commission Collaboration
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export function Testimonials() {
  const [activeCardIndex, setActiveCardIndex] = useState(null)

  const handleSelectCard = (index) => {
    setActiveCardIndex((prev) => (prev === index ? null : index))
  }

  return (
    <section className="relative py-10 md:py-14 bg-black overflow-hidden">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute top-1/2 right-1/4 h-[650px] w-[650px] rounded-full bg-burgundy/15 blur-[180px]" />

      <div className="relative max-w-6xl mx-auto px-5 md:px-8">
        <SectionHeading
          align="center"
          eyebrow="Dynamic Social Proof"
          hindi="समीक्षा डेक · लोगों की राय"
          title={
            <>
              Loved by brands and <span className="text-gradient">creators alike</span>
            </>
          }
          description="Read verified testimonials collected in a 3-card deck — hover or click any card to inspect."
        />

        {/* Deck Indicator */}
        <div className="flex items-center justify-center gap-2 text-[11px] text-muted mt-3 mb-2">
          <span className="h-1.5 w-1.5 rounded-full bg-burgundy-light animate-pulse" />
          <span>Fanned Deck of 3 Stories · Hover to peek, click to bring to front</span>
        </div>

        {/* Dynamic Sticky Stacking Testimonial Cards: Collected Deck */}
        <div className="relative mt-4 pb-6">
          {testimonials.map((t, index) => (
            <DynamicStickyTestimonialCard
              key={t.name}
              t={t}
              index={index}
              total={testimonials.length}
              activeCardIndex={activeCardIndex}
              onSelectCard={handleSelectCard}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
