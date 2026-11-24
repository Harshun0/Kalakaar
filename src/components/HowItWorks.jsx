import { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Search, Bookmark, Send, UserPlus, Tag, Inbox, Sparkles, ShieldCheck } from 'lucide-react'
import { SectionHeading } from './SectionHeading'
import { cn } from '../lib/utils'

const icons = { Search, Bookmark, Send, UserPlus, Tag, Inbox }

const brandVisuals = [
  {
    badge: 'Hyperlocal Discovery',
    tags: ['Mumbai, MH', 'Bengaluru, KA', 'Fashion & Style', 'Tech & AI', 'Under ₹5,000'],
    stat: '25+ Cities',
    statSub: 'Filter by city, niche and upfront starting budget',
  },
  {
    badge: 'Verified 9:16 Media Kits',
    tags: ['Reels', 'YouTube Shorts', 'UGC Raw', 'Engagement Rate: 7.8%'],
    stat: '100% Verified',
    statSub: 'Real metrics, zero fake agency followers',
  },
  {
    badge: 'Direct WhatsApp & Email',
    tags: ['Direct Contract', '0% Middleman Cut', 'Instant DM'],
    stat: '₹0 Commission',
    statSub: 'What you agree is 100% between brand and creator',
  },
]

const creatorVisuals = [
  {
    badge: 'Custom Media Kit',
    tags: ['Link in Bio', 'Portfolio Reels', 'Verified Metrics'],
    stat: '2 Mins Setup',
    statSub: 'Publish your showcase once, share everywhere',
  },
  {
    badge: 'Transparent Rate Card',
    tags: ['Reels: ₹8,000', 'YouTube: ₹15,000', 'UGC: ₹4,500'],
    stat: 'Your Rates',
    statSub: 'No more lowball DMs asking "what is your budget?"',
  },
  {
    badge: 'Direct Inquiries Inbound',
    tags: ['WhatsApp Alert', 'Direct Email', 'Zero Agency Cut'],
    stat: 'Keep 100%',
    statSub: 'Keep all your earnings without third-party commission',
  },
]

function DynamicStickyStepCard({ step, index, total, audience, activeCardIndex, onSelectCard }) {
  const cardContainerRef = useRef(null)

  // Track the approach of the card to its deck dock
  const { scrollYProgress } = useScroll({
    target: cardContainerRef,
    offset: ['start end', 'start 15%'],
  })

  // DECK OF CARDS ARRANGEMENT:
  // Cards are collected together into a physical fanned deck.
  // Each card has a slight tilt angle and small offset so the top tab and fanned corners peek out like playing cards.
  const deckRotations = [-2.6, 2.2, -0.6]
  const deckOffsetsX = [-7, 7, 0]
  const targetRotation = deckRotations[index] || 0
  const targetX = deckOffsetsX[index] || 0
  const deckTopOffset = `calc(4.75rem + ${index * 38}px)`
  const isSelected = activeCardIndex === index
  const isCovered = activeCardIndex !== null ? !isSelected : false

  // 1. Enters smoothly from below: y: 40 -> 0
  const y = useTransform(scrollYProgress, [0, 0.75, 1], [45, 0, 0])
  // 2. Rotates into deck fanning angle as it lands
  const rotate = useTransform(scrollYProgress, [0, 0.75, 1], [index % 2 === 0 ? -6 : 6, 0, targetRotation])
  const x = useTransform(scrollYProgress, [0, 0.75, 1], [index % 2 === 0 ? -18 : 18, 0, targetX])
  // 3. Scale: starts slightly compact (0.94) -> blooms up to 1.0 as it docks into the deck
  const scale = useTransform(scrollYProgress, [0, 0.75, 1], [0.93, 1, 1 - (total - index - 1) * 0.02])
  // 4. Opacity: starts dissolved (0.4) -> full crisp opacity (1.0)
  const opacity = useTransform(scrollYProgress, [0, 0.65], [0.4, 1])
  // 5. Brightness: crisp -> subtle realistic deck shadow as later cards dock over it
  const brightness = useTransform(scrollYProgress, [0, 0.85, 1], [1, 1, 0.88])

  // Parallax movement for inner graphic preview box
  const graphicY = useTransform(scrollYProgress, [0, 0.7], [18, 0])
  const graphicScale = useTransform(scrollYProgress, [0, 0.7], [0.97, 1])

  const Icon = icons[step.icon] || Search
  const visual = (audience === 'brands' ? brandVisuals : creatorVisuals)[index]

  return (
    <div
      ref={cardContainerRef}
      className="sticky w-full mb-8 sm:mb-10 last:mb-0"
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
        className="w-full rounded-3xl border border-white/15 border-t-2 border-t-burgundy-light/80 bg-surface/95 backdrop-blur-3xl p-5 sm:p-8 shadow-[-0px_-10px_25px_rgba(0,0,0,0.9),0_25px_60px_rgba(0,0,0,0.95)] overflow-hidden relative group cursor-pointer hover:border-burgundy-light transition-colors duration-300"
      >
        {/* Ambient Corner Flare */}
        <div className="pointer-events-none absolute -top-28 -right-28 h-72 w-72 rounded-full bg-burgundy/30 blur-[90px]" />

        {/* Card Deck Corner Foil Marker */}
        <div className="absolute top-2.5 right-3.5 flex items-center gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
          <span className="text-[10px] font-mono tracking-widest text-burgundy-light">CARD {step.number}</span>
          <span className="text-burgundy-light text-xs">✦</span>
        </div>

        {/* ======================================================== */}
        {/* DECK HEADER TAB: VISIBLE WHEN CARDS ARE COLLECTED        */}
        {/* ======================================================== */}
        <div className="relative z-10 flex items-center justify-between pb-3 mb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-burgundy/40 border border-burgundy-light/40 text-gradient font-display font-black text-xl sm:text-2xl shadow-md shadow-burgundy/30 shrink-0">
              {step.number}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <Icon size={17} className="text-burgundy-light shrink-0" />
                <h3 className="font-display font-black text-base sm:text-xl md:text-2xl text-white tracking-tight">
                  {step.title}
                </h3>
              </div>
              <span className="font-deva text-[11px] sm:text-xs text-muted block mt-0.5">
                {index === 0 && 'चरण ०१ · खोज और सटीक बजट'}
                {index === 1 && 'चरण ०२ · सत्यापित आंकड़े व रील्स'}
                {index === 2 && 'चरण ०३ · सीधा WhatsApp व ईमेल'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="rounded-full bg-burgundy/30 border border-burgundy-light/40 px-3 py-1 text-[10px] sm:text-xs font-bold text-burgundy-light uppercase tracking-wider shadow-sm shadow-burgundy/30">
              {visual?.badge || 'Step'}
            </span>
          </div>
        </div>

        {/* ======================================================== */}
        {/* CARD BODY: FEATURES & PREVIEW                            */}
        {/* ======================================================== */}
        <div className="relative z-10 grid lg:grid-cols-[1.1fr_0.9fr] gap-6 lg:gap-10 items-center">
          {/* Left Column: Description & Feature Pills */}
          <div>
            <p className="text-muted text-sm sm:text-base leading-relaxed mb-4">
              {step.description}
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-2 pt-3 border-t border-white/10">
              {visual?.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-white/[0.05] border border-white/10 px-3 py-1 text-xs text-white/90 font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Dynamic Parallax Graphic Showcase */}
          <motion.div
            style={{
              y: graphicY,
              scale: graphicScale,
            }}
            className="relative rounded-2xl border border-white/15 bg-black/70 p-5 sm:p-6 flex flex-col justify-between min-h-[190px] sm:min-h-[210px] shadow-2xl backdrop-blur-md"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs uppercase tracking-wider text-muted font-bold">
                {audience === 'brands' ? 'Brand Workflow Preview' : 'Creator Experience Preview'}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-burgundy-light font-bold">
                <Sparkles size={14} className="text-burgundy-light" />
                Active Stage
              </span>
            </div>

            <div className="py-3 text-center">
              <div className="font-display font-black text-3xl sm:text-4xl text-white mb-1 tracking-tight">
                {visual?.stat}
              </div>
              <p className="text-xs sm:text-sm text-muted max-w-xs mx-auto leading-relaxed">
                {visual?.statSub}
              </p>
            </div>

            <div className="flex items-center justify-between text-xs text-white/80 pt-3 border-t border-white/10">
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldCheck size={15} className="text-burgundy-light" />
                Kalakaar Verified Protocol
              </span>
              <span className="font-deva text-burgundy-light font-bold">
                {index === 0 && 'चरण ०१'}
                {index === 1 && 'चरण ०२'}
                {index === 2 && 'सीधा संपर्क'}
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export function HowItWorks() {
  const [audience, setAudience] = useState('brands')
  const [activeCardIndex, setActiveCardIndex] = useState(null)

  const stepsList = audience === 'brands' ? [
    { number: '01', title: 'Filter by City, Niche & Budget', description: 'Filter creators across Mumbai, Delhi, Bengaluru, Chennai with upfront pricing in seconds.', icon: 'Search' },
    { number: '02', title: 'Inspect Real Portfolio Reels', description: 'Review verified 9:16 vertical reels, genuine follower metrics, and past brand work with zero guesswork.', icon: 'Bookmark' },
    { number: '03', title: 'Send Direct Inquiry with 0% Cut', description: 'Reach creators directly on WhatsApp or Email with zero agency markups or hidden commissions.', icon: 'Send' },
  ] : [
    { number: '01', title: 'Claim Your Custom Media Kit', description: 'Showcase your best 9:16 reels, YouTube metrics, and platforms in minutes under your own brand link.', icon: 'UserPlus' },
    { number: '02', title: 'Publish Transparent Rates', description: 'List your starting rates for Reels, Stories, and Dedicated Videos so brands know exactly what to expect.', icon: 'Tag' },
    { number: '03', title: 'Receive Direct Brand Inquiries', description: 'Inbound brand collaborations arrive directly in your inbox. Keep 100% of your earnings.', icon: 'Inbox' },
  ]

  const handleSelectCard = (index) => {
    setActiveCardIndex((prev) => (prev === index ? null : index))
  }

  return (
    <section id="how-it-works" className="relative py-10 md:py-14 bg-black overflow-hidden">
      {/* Background stage lighting */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 h-[650px] w-[850px] rounded-full bg-burgundy/15 blur-[160px]" />

      <div className="relative max-w-5xl mx-auto px-5 md:px-8">
        <SectionHeading
          align="center"
          eyebrow="Dynamic Scroll Choreography"
          hindi="ताश का डेक · कैसे काम करता है"
          title={
            <>
              How Kalakaar <span className="text-gradient">works</span>
            </>
          }
          description="A frictionless workflow collected like a deck of cards — scroll to deal, hover to peek."
        />

        {/* Brand vs Creator Toggle */}
        <div className="flex flex-col items-center justify-center mb-6 mt-3 gap-2.5">
          <div className="inline-flex bg-surface/85 border border-white/10 rounded-full p-1.5 backdrop-blur-2xl shadow-2xl shadow-black/80">
            {['brands', 'creators'].map((key) => (
              <button
                key={key}
                onClick={() => {
                  setAudience(key)
                  setActiveCardIndex(null)
                }}
                className={cn(
                  'px-7 py-2 rounded-full text-xs sm:text-sm font-bold tracking-wide uppercase transition-all duration-300',
                  audience === key
                    ? 'bg-gradient-brand text-white shadow-xl shadow-burgundy/40'
                    : 'text-muted hover:text-white'
                )}
              >
                For {key === 'brands' ? 'Brands & Marketers' : 'Creators & Artists'}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-[11px] text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-burgundy-light animate-pulse" />
            <span>Fanned Deck of 3 Cards · Scroll to collect, hover or click to draw</span>
          </div>
        </div>

        {/* Dynamic Sticky Stacking Cards Container */}
        <div className="relative pb-6">
          {stepsList.map((step, index) => (
            <DynamicStickyStepCard
              key={`${audience}-${step.number}`}
              step={step}
              index={index}
              total={stepsList.length}
              audience={audience}
              activeCardIndex={activeCardIndex}
              onSelectCard={handleSelectCard}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
