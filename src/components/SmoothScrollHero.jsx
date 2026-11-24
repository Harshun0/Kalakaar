import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion'
import { Search, CheckCircle2, Sparkles } from 'lucide-react'
import { Button } from './Button'
import { creators, indianCities, niches } from '../data/mockData'
import { SketchUnderline } from './Doodles'
import { Spotlight } from './Spotlight'
import { TextAnimate } from './TextAnimate'

export function SmoothScrollHero({ onSearch, onOpenRoleModal }) {
  const containerRef = useRef(null)
  const [selectedCity, setSelectedCity] = useState('All Cities')
  const [selectedNiche, setSelectedNiche] = useState('All Niches')
  const [selectedBudget, setSelectedBudget] = useState('Any Budget')

  // Track scroll progress of the snappy hero container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // 1. Hover.dev Clip-path transformation: shrinks smoothly from inset to edge-to-edge
  const clipInsetY = useTransform(scrollYProgress, [0.08, 0.62], [16, 0])
  const clipInsetX = useTransform(scrollYProgress, [0.08, 0.62], [12, 0])
  const clipRadius = useTransform(scrollYProgress, [0.08, 0.62], [28, 0])
  const clipPath = useMotionTemplate`inset(${clipInsetY}% ${clipInsetX}% ${clipInsetY}% ${clipInsetX}% round ${clipRadius}px)`

  // 2. Parallax and Zoom for background cinematic stage
  const stageScale = useTransform(scrollYProgress, [0, 0.7], [1.1, 1])
  const stageOpacity = useTransform(scrollYProgress, [0, 0.2, 0.7, 1], [0.35, 0.85, 1, 0.95])

  // 3. Foreground Text fade & upward parallax exit
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 0.3], [0, -70])
  const textScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.92])

  // 4. Parallax flying creator cards (Hover.dev signature multi-column scroll offsets)
  // Left side cards:
  const card1Y = useTransform(scrollYProgress, [0, 0.6], [0, -220])
  const card1Rotate = useTransform(scrollYProgress, [0, 0.6], [-8, -16])
  const card1Opacity = useTransform(scrollYProgress, [0, 0.35, 0.55], [1, 0.75, 0])

  const card2Y = useTransform(scrollYProgress, [0, 0.6], [0, 190])
  const card2Rotate = useTransform(scrollYProgress, [0, 0.6], [6, 12])
  const card2Opacity = useTransform(scrollYProgress, [0, 0.35, 0.55], [1, 0.75, 0])

  // Right side cards:
  const card3Y = useTransform(scrollYProgress, [0, 0.6], [0, -190])
  const card3Rotate = useTransform(scrollYProgress, [0, 0.6], [7, 14])
  const card3Opacity = useTransform(scrollYProgress, [0, 0.35, 0.55], [1, 0.75, 0])

  const card4Y = useTransform(scrollYProgress, [0, 0.6], [0, 200])
  const card4Rotate = useTransform(scrollYProgress, [0, 0.6], [-6, -13])
  const card4Opacity = useTransform(scrollYProgress, [0, 0.35, 0.55], [1, 0.75, 0])

  // Center stage text reveal as the window expands
  const centerStageOpacity = useTransform(scrollYProgress, [0.38, 0.62], [0, 1])
  const centerStageScale = useTransform(scrollYProgress, [0.38, 0.62], [0.88, 1])

  // Bottom scroll indicator
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    onSearch?.({ city: selectedCity, niche: selectedNiche, budget: selectedBudget })
    const el = document.getElementById('creators')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div
      ref={containerRef}
      id="top"
      className="relative h-[125vh] bg-black text-white"
    >
      {/* Sticky Fullscreen Stage Viewport */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        {/* Volumetric Aceternity Ambient Lighting */}
        <Spotlight className="-top-36 left-0 md:left-36" fill="#6D001A" />
        <Spotlight className="top-24 right-0 opacity-70" fill="#D1294F" />

        {/* Ambient Glow Orbs */}
        <div className="pointer-events-none absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-burgundy/20 blur-[150px]" />
        <div className="pointer-events-none absolute bottom-10 -right-20 h-[500px] w-[500px] rounded-full bg-burgundy-light/15 blur-[160px]" />

        {/* ============================================================ */}
        {/* LAYER A: THE HOVER.DEV CLIP-PATH EXPANDING STAGE WINDOW     */}
        {/* ============================================================ */}
        <motion.div
          style={{ clipPath }}
          className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden border border-burgundy/40 bg-surface shadow-2xl shadow-burgundy/30"
        >
          {/* Zooming background image inside the expanding window */}
          <motion.div style={{ scale: stageScale, opacity: stageOpacity }} className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=2000&q=80"
              alt="Kalakaar Spotlight Stage"
              className="h-full w-full object-cover filter brightness-[0.45] contrast-110"
            />
            {/* Deep Burgundy & Black gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/80" />
            <div className="absolute inset-0 bg-radial-gradient from-burgundy/25 via-transparent to-black" />
          </motion.div>

          {/* Reveal content inside the expanded stage */}
          <motion.div
            style={{ opacity: centerStageOpacity, scale: centerStageScale }}
            className="relative z-10 max-w-4xl px-6 text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-burgundy-light/40 bg-burgundy/40 px-4 py-1 text-xs font-semibold text-white backdrop-blur-md mb-4 shadow-lg shadow-burgundy/30">
              <Sparkles size={14} className="text-burgundy-light" />
              <span>THE SPOTLIGHT IS YOURS</span>
              <span className="font-deva text-white">· मंच तैयार है</span>
            </div>

            <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-tight text-white mb-4">
              Direct Access to <span className="text-gradient">India’s Real Creators</span>
            </h2>

            <p className="mx-auto max-w-2xl text-sm sm:text-base text-white/80 leading-relaxed mb-8">
              No hidden agency fees. No middleman negotiations. Inspect live portfolios, transparent starting prices, and connect instantly.
            </p>

            {/* Quick action strip inside stage */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                variant="primary"
                size="lg"
                onClick={() => {
                  const el = document.getElementById('creators')
                  if (el) el.scrollIntoView({ behavior: 'smooth' })
                }}
                className="shadow-2xl shadow-burgundy/60 border border-burgundy-light/60 px-8"
              >
                Browse 500+ Verified Creators ↓
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => onOpenRoleModal?.('onboard')}
                className="border-white/20 hover:border-burgundy-light"
              >
                Join as Creator or Manager
              </Button>
            </div>
          </motion.div>
        </motion.div>

        {/* ============================================================ */}
        {/* LAYER B: FOREGROUND HERO HEADLINE & SEARCH BAR (Fades on Scroll) */}
        {/* ============================================================ */}
        <motion.div
          style={{ opacity: textOpacity, y: textY, scale: textScale }}
          className="relative z-10 max-w-4xl mx-auto px-5 text-center pointer-events-auto"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-burgundy/50 bg-burgundy/20 px-4 py-1.5 text-xs font-semibold text-white shadow-lg shadow-burgundy/25 mb-5 backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-burgundy-light animate-pulse" />
            <TextAnimate animation="blurInUp" by="character" duration={0.4} className="tracking-wide">
              India's Premier Creator Marketplace
            </TextAnimate>
            <span className="text-burgundy-light">✦</span>
            <span className="font-deva text-white font-bold">कलाकार मंच</span>
          </div>

          {/* Main Title */}
          <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-[78px] leading-[1.05] tracking-tight mb-5 text-white">
            Hire verified Indian creators with{' '}
            <span className="relative inline-block italic text-gradient">
              zero middlemen.
              <SketchUnderline className="absolute -bottom-3 left-0 w-full h-4 text-burgundy-light opacity-80" />
            </span>
          </h1>

          <div className="text-muted text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-7 leading-relaxed">
            <TextAnimate animation="blurInUp" by="word" duration={0.45} delay={0.15}>
              Discover Reels, YouTube, UGC, and Audio talent across 25+ cities. Transparent starting rates upfront. Direct contact with 0% commission.
            </TextAnimate>
          </div>

          {/* Search Bar Form */}
          <form
            onSubmit={handleSearchSubmit}
            className="mx-auto max-w-3xl rounded-2xl border border-white/15 bg-surface/90 p-2.5 shadow-2xl shadow-black/90 backdrop-blur-2xl flex flex-col sm:flex-row gap-2.5 mb-5"
          >
            <div className="flex-1 relative">
              <select
                value={selectedNiche}
                onChange={(e) => setSelectedNiche(e.target.value)}
                className="w-full appearance-none rounded-xl bg-white/5 px-4 py-3 text-xs sm:text-sm font-medium text-white focus:outline-none focus:ring-1 focus:ring-burgundy-light cursor-pointer"
              >
                <option value="All Niches" className="bg-surface text-white">All Niches & Categories</option>
                {niches.map((n) => (
                  <option key={n} value={n} className="bg-surface text-white">{n}</option>
                ))}
              </select>
            </div>

            <div className="flex-1 relative">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full appearance-none rounded-xl bg-white/5 px-4 py-3 text-xs sm:text-sm font-medium text-white focus:outline-none focus:ring-1 focus:ring-burgundy-light cursor-pointer"
              >
                {indianCities.map((c) => (
                  <option key={c} value={c} className="bg-surface text-white">{c}</option>
                ))}
              </select>
            </div>

            <div className="flex-1 relative">
              <select
                value={selectedBudget}
                onChange={(e) => setSelectedBudget(e.target.value)}
                className="w-full appearance-none rounded-xl bg-white/5 px-4 py-3 text-xs sm:text-sm font-medium text-white focus:outline-none focus:ring-1 focus:ring-burgundy-light cursor-pointer"
              >
                <option value="Any Budget" className="bg-surface text-white">Any Starting Budget</option>
                <option value="Under ₹5,000" className="bg-surface text-white">Under ₹5,000</option>
                <option value="₹5,000 – ₹12,000" className="bg-surface text-white">₹5,000 – ₹12,000</option>
                <option value="₹12,000 – ₹25,000" className="bg-surface text-white">₹12,000 – ₹25,000</option>
                <option value="₹25,000+" className="bg-surface text-white">₹25,000+ (Elite)</option>
              </select>
            </div>

            <Button variant="primary" type="submit" className="sm:px-7 justify-center shadow-lg shadow-burgundy/50">
              <Search size={16} />
              <span>Explore</span>
            </Button>
          </form>

          {/* Trust points */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted">
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 size={14} className="text-burgundy-light" />
              0% Agency Commission
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 size={14} className="text-burgundy-light" />
              Verified Media Kits
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 size={14} className="text-burgundy-light" />
              Direct WhatsApp / Email
            </span>
          </div>
        </motion.div>

        {/* ============================================================ */}
        {/* LAYER C: PARALLAX FLOATING CARDS (Larger Editorial Hero Flanks) */}
        {/* ============================================================ */}
        {/* Card 1: Top Left - Ananya Rao (Fashion) */}
        <motion.div
          style={{ y: card1Y, rotate: card1Rotate, opacity: card1Opacity }}
          className="pointer-events-none absolute left-0 md:left-4 lg:left-8 top-[8%] hidden md:block z-20 w-[240px] lg:w-[300px] xl:w-[330px]"
        >
          <div className="relative aspect-9/16 rounded-3xl overflow-hidden border border-white/20 bg-surface/95 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.95)] backdrop-blur-xl transition-all duration-300">
            <img src={creators[0].image} alt={creators[0].name} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
            <div className="absolute top-3.5 left-3.5 bg-black/75 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/15 shadow-lg">
              {creators[0].followers}
            </div>
            <div className="absolute bottom-4 left-4 right-4 text-left">
              <p className="font-display font-extrabold text-sm lg:text-base text-white leading-tight">{creators[0].name}</p>
              <p className="text-xs text-muted mt-0.5">{creators[0].niche}</p>
              <span className="inline-block mt-1.5 text-xs font-extrabold text-burgundy-light bg-burgundy/25 px-2 py-0.5 rounded-full border border-burgundy-light/40">From ₹8,000</span>
            </div>
          </div>
        </motion.div>

        {/* Card 2: Bottom Left - Vikram Sehgal (Tech) */}
        <motion.div
          style={{ y: card2Y, rotate: card2Rotate, opacity: card2Opacity }}
          className="pointer-events-none absolute left-4 md:left-10 lg:left-16 bottom-[5%] hidden md:block z-20 w-[230px] lg:w-[285px] xl:w-[310px]"
        >
          <div className="relative aspect-9/16 rounded-3xl overflow-hidden border border-white/20 bg-surface/95 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.95)] backdrop-blur-xl transition-all duration-300">
            <img src={creators[1].image} alt={creators[1].name} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
            <div className="absolute top-3.5 left-3.5 bg-black/75 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/15 shadow-lg">
              {creators[1].followers}
            </div>
            <div className="absolute bottom-4 left-4 right-4 text-left">
              <p className="font-display font-extrabold text-sm lg:text-base text-white leading-tight">{creators[1].name}</p>
              <p className="text-xs text-muted mt-0.5">{creators[1].niche}</p>
              <span className="inline-block mt-1.5 text-xs font-extrabold text-burgundy-light bg-burgundy/25 px-2 py-0.5 rounded-full border border-burgundy-light/40">From ₹15,000</span>
            </div>
          </div>
        </motion.div>

        {/* Card 3: Top Right - Aditya Nair (Gaming) */}
        <motion.div
          style={{ y: card3Y, rotate: card3Rotate, opacity: card3Opacity }}
          className="pointer-events-none absolute right-0 md:right-4 lg:right-8 top-[8%] hidden md:block z-20 w-[240px] lg:w-[300px] xl:w-[330px]"
        >
          <div className="relative aspect-9/16 rounded-3xl overflow-hidden border border-white/20 bg-surface/95 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.95)] backdrop-blur-xl transition-all duration-300">
            <img src={creators[5].image} alt={creators[5].name} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
            <div className="absolute top-3.5 left-3.5 bg-black/75 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/15 shadow-lg">
              {creators[5].followers}
            </div>
            <div className="absolute bottom-4 left-4 right-4 text-left">
              <p className="font-display font-extrabold text-sm lg:text-base text-white leading-tight">{creators[5].name}</p>
              <p className="text-xs text-muted mt-0.5">{creators[5].niche}</p>
              <span className="inline-block mt-1.5 text-xs font-extrabold text-burgundy-light bg-burgundy/25 px-2 py-0.5 rounded-full border border-burgundy-light/40">From ₹18,000</span>
            </div>
          </div>
        </motion.div>

        {/* Card 4: Bottom Right - Sanya Kapoor (Travel) */}
        <motion.div
          style={{ y: card4Y, rotate: card4Rotate, opacity: card4Opacity }}
          className="pointer-events-none absolute right-4 md:right-10 lg:right-16 bottom-[5%] hidden md:block z-20 w-[230px] lg:w-[285px] xl:w-[310px]"
        >
          <div className="relative aspect-9/16 rounded-3xl overflow-hidden border border-white/20 bg-surface/95 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.95)] backdrop-blur-xl transition-all duration-300">
            <img src={creators[6].image} alt={creators[6].name} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
            <div className="absolute top-3.5 left-3.5 bg-black/75 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/15 shadow-lg">
              {creators[6].followers}
            </div>
            <div className="absolute bottom-4 left-4 right-4 text-left">
              <p className="font-display font-extrabold text-sm lg:text-base text-white leading-tight">{creators[6].name}</p>
              <p className="text-xs text-muted mt-0.5">{creators[6].niche}</p>
              <span className="inline-block mt-1.5 text-xs font-extrabold text-burgundy-light bg-burgundy/25 px-2 py-0.5 rounded-full border border-burgundy-light/40">From ₹11,000</span>
            </div>
          </div>
        </motion.div>

        {/* ============================================================ */}
        {/* LAYER D: BOTTOM SCROLL INDICATOR                            */}
        {/* ============================================================ */}
        <motion.div
          style={{ opacity: indicatorOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-20"
        >
          <span className="text-[10px] uppercase tracking-widest text-muted font-medium">
            Scroll to expand stage
          </span>
          <div className="w-5 h-9 rounded-full border-2 border-white/20 flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
              className="w-1.5 h-1.5 rounded-full bg-burgundy-light shadow-sm shadow-burgundy-light"
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
