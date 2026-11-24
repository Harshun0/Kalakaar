import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { MessageCircle, Tag, SlidersHorizontal, MapPin, Sparkles, ShieldCheck, CheckCircle2 } from 'lucide-react'
import { Logo3D } from './Logo3D'

const whyCardsData = [
  {
    number: '01',
    title: 'Zero Commission Marketplace',
    description: 'Brands pay creators directly. Kalakaar never takes a cut of your earnings or project fees. What you negotiate is 100% yours to keep.',
    icon: MessageCircle,
    stat: '0% Platform Cut',
    subtext: 'Direct deals, zero agency markups',
  },
  {
    number: '02',
    title: 'Transparent Upfront Rates',
    description: 'Every creator lists their authentic starting rate for Reels, YouTube videos, and UGC. No more endless DMs asking "What is your budget?".',
    icon: Tag,
    stat: 'From ₹4,500',
    subtext: 'Visible pricing before the first message',
  },
  {
    number: '03',
    title: 'Hyperlocal Indian Discovery',
    description: 'Filter verified creators across 25+ cities including Mumbai, Delhi NCR, Bengaluru, Chennai, and Pune in regional languages and authentic local contexts.',
    icon: MapPin,
    stat: '25+ Indian Cities',
    subtext: 'Local creators who speak your audience’s language',
  },
  {
    number: '04',
    title: 'The 4 Creative Pillars',
    description: 'Purpose-built for modern Indian artists: Camera (Photography/UGC), Pen (Storytelling), Mic (Podcasts/Audio), and Film Strip (Reels & Cinema).',
    icon: SlidersHorizontal,
    stat: '4 Pillars in 1',
    subtext: 'Camera · Pen · Mic · Film Strip',
  },
]

function DynamicWhyStackCard({ card, index, total, activeCardIndex, onSelectCard }) {
  const cardRef = useRef(null)

  // Track the approach of the card to its deck dock
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'start 15%'],
  })

  // DECK OF CARDS ARRANGEMENT:
  // Fanned deck of 4 cards collecting into one spot with subtle angle offsets and compact 36px top steps
  const deckRotations = [-2.8, 2.2, -1.6, 0.6]
  const deckOffsetsX = [-7, 6, -4, 0]
  const targetRotation = deckRotations[index] || 0
  const targetX = deckOffsetsX[index] || 0
  const deckTopOffset = `calc(4.75rem + ${index * 36}px)`
  const isSelected = activeCardIndex === index
  const isCovered = activeCardIndex !== null ? !isSelected : false

  // 1. Enters smoothly from below: y: 35 -> 0
  const y = useTransform(scrollYProgress, [0, 0.75, 1], [40, 0, 0])
  const rotate = useTransform(scrollYProgress, [0, 0.75, 1], [index % 2 === 0 ? -6 : 6, 0, targetRotation])
  const x = useTransform(scrollYProgress, [0, 0.75, 1], [index % 2 === 0 ? -16 : 16, 0, targetX])
  // 2. Scale: starts slightly compact (0.94) -> blooms up to 1.0 as it docks into the deck
  const scale = useTransform(scrollYProgress, [0, 0.75, 1], [0.93, 1, 1 - (total - index - 1) * 0.02])
  // 3. Opacity: starts dissolved (0.4) -> full opacity (1.0)
  const opacity = useTransform(scrollYProgress, [0, 0.65], [0.4, 1])
  // 4. Brightness: crisp -> subtle pocket depth dimming as later cards dock
  const brightness = useTransform(scrollYProgress, [0, 0.85, 1], [1, 1, 0.88])

  const IconComponent = card.icon

  return (
    <div
      ref={cardRef}
      className="sticky w-full mb-7 sm:mb-9 last:mb-0"
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
        className="w-full rounded-3xl border border-white/15 border-t-2 border-t-burgundy-light/80 bg-surface/95 backdrop-blur-3xl p-5 sm:p-7 shadow-[-0px_-10px_25px_rgba(0,0,0,0.9),0_25px_60px_rgba(0,0,0,0.95)] overflow-hidden relative group cursor-pointer hover:border-burgundy-light transition-colors duration-300"
      >
        {/* Ambient Corner Glow */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-60 w-60 rounded-full bg-burgundy/30 blur-[80px]" />

        {/* Card Deck Corner Foil Marker */}
        <div className="absolute top-2.5 right-3.5 flex items-center gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
          <span className="text-[10px] font-mono tracking-widest text-burgundy-light">CARD {card.number}</span>
          <span className="text-burgundy-light text-xs">✦</span>
        </div>

        {/* ======================================================== */}
        {/* DECK HEADER TAB: VISIBLE WHEN CARDS ARE COLLECTED        */}
        {/* ======================================================== */}
        <div className="relative z-10 flex items-center justify-between pb-3 mb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-burgundy/40 border border-burgundy-light/40 text-gradient font-display font-black text-lg sm:text-xl shadow-md shadow-burgundy/30 shrink-0">
              {card.number}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <IconComponent size={16} className="text-burgundy-light shrink-0" />
                <h3 className="font-display font-black text-base sm:text-lg md:text-xl text-white tracking-tight">
                  {card.title}
                </h3>
              </div>
              <span className="text-[10px] sm:text-xs uppercase tracking-wider text-muted font-bold block mt-0.5">
                {card.subtext}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="rounded-full bg-burgundy/30 border border-burgundy-light/30 px-3 py-1 text-[10px] sm:text-xs font-bold text-white shadow-sm">
              {card.stat}
            </span>
          </div>
        </div>

        {/* ======================================================== */}
        {/* DECK CARD BODY: DESCRIPTION & GUARANTEE                  */}
        {/* ======================================================== */}
        <div className="relative z-10">
          <p className="text-muted text-sm sm:text-base leading-relaxed mb-4">
            {card.description}
          </p>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs text-burgundy-light font-semibold">
              <ShieldCheck size={14} className="text-burgundy-light" />
              कलाकार गारंटी Protocol
            </span>
            <span className="text-xs text-muted">
              100% Verified
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export function WhyKalakaar() {
  const [activeCardIndex, setActiveCardIndex] = useState(null)

  const handleSelectCard = (index) => {
    setActiveCardIndex((prev) => (prev === index ? null : index))
  }

  return (
    <section id="why" className="relative py-10 md:py-14 bg-black overflow-hidden">
      {/* Background radial spotlight */}
      <div className="pointer-events-none absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 h-[650px] w-[650px] rounded-full bg-burgundy/15 blur-[160px]" />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-8 lg:gap-14 items-start">
          {/* Pinned Left Column (Sticky Sidebar as right cards stack) */}
          <div className="lg:sticky lg:top-24">
            <div className="inline-flex items-center gap-2 rounded-full border border-burgundy/50 bg-burgundy/20 px-3.5 py-1.5 text-xs font-semibold text-white shadow-md shadow-burgundy/25 mb-4 backdrop-blur-md">
              <Sparkles size={13} className="text-burgundy-light" />
              <span className="font-deva text-white">क्यों कलाकार</span>
              <span className="text-burgundy-light">✦</span>
              <span>4-Card Deck</span>
            </div>

            <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white mb-5">
              Built on purpose, <br />
              <span className="text-gradient">for Indian creators.</span>
            </h2>

            <p className="text-muted text-base leading-relaxed mb-6 max-w-md">
              Influencer marketing in India is broken by opaque agency fees, delayed payouts, and endless DM friction. Kalakaar re-engineers both sides.
            </p>

            {/* Emblem Feature Box with 3D Logo */}
            <div className="rounded-2xl border border-white/10 bg-surface/70 p-5 backdrop-blur-xl max-w-md shadow-xl flex items-center gap-4">
              <Logo3D size="lg" />
              <div>
                <h4 className="font-display font-bold text-sm text-white">4 Pillars of Artistry</h4>
                <p className="text-xs text-muted mt-0.5">
                  Camera · Pen · Mic · Film Strip integrated into one unified marketplace.
                </p>
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-2.5 max-w-md">
              <div className="flex items-center gap-2 text-xs text-muted">
                <CheckCircle2 size={15} className="text-burgundy-light" />
                <span>100% Direct Brand-to-Creator Inquiries</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted">
                <CheckCircle2 size={15} className="text-burgundy-light" />
                <span>Zero Listing or Inquiry Commission Fees</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted">
                <CheckCircle2 size={15} className="text-burgundy-light" />
                <span>Verified Follower Metrics & Authentic Media Kits</span>
              </div>
            </div>
          </div>

          {/* Sticky Stacking Right Column: Collected Deck */}
          <div className="relative pb-6">
            <div className="flex items-center gap-2 text-[11px] text-muted mb-3 justify-end lg:justify-start">
              <span className="h-1.5 w-1.5 rounded-full bg-burgundy-light animate-pulse" />
              <span>Collected Deck of 4 Cards · Hover or click to draw</span>
            </div>
            {whyCardsData.map((card, index) => (
              <DynamicWhyStackCard
                key={card.number}
                card={card}
                index={index}
                total={whyCardsData.length}
                activeCardIndex={activeCardIndex}
                onSelectCard={handleSelectCard}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
