import { useState } from 'react'
import { Search, MapPin, CheckCircle2 } from 'lucide-react'
import { Button } from './Button'
import { creators, indianCities, niches } from '../data/mockData'
import { SketchUnderline, SketchArrow } from './Doodles'
import { Spotlight } from './Spotlight'
import { CardContainer } from './Card3D'

const heroCreators = creators.slice(0, 4)

const cardAngles = [
  { tilt: -10, x: -200, y: 15, z: 20 },
  { tilt: -3, x: -70, y: 35, z: 40 },
  { tilt: 4, x: 70, y: 5, z: 30 },
  { tilt: 11, x: 205, y: 25, z: 10 },
]

export function Hero({ onSearch, onOpenRoleModal }) {
  const [selectedCity, setSelectedCity] = useState('All Cities')
  const [selectedNiche, setSelectedNiche] = useState('All Niches')
  const [selectedBudget, setSelectedBudget] = useState('Any Budget')

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    onSearch?.({ city: selectedCity, niche: selectedNiche, budget: selectedBudget })
    const el = document.getElementById('creators')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const handleQuickTag = (tag) => {
    if (tag.includes('Mumbai')) setSelectedCity('Mumbai, MH')
    if (tag.includes('Bengaluru')) setSelectedCity('Bengaluru, KA')
    if (tag.includes('Delhi')) setSelectedCity('Delhi NCR')
    if (tag.includes('₹5K')) setSelectedBudget('Under ₹5,000')
    const el = document.getElementById('creators')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="top" className="relative min-h-[90vh] overflow-hidden pt-12 pb-24 md:pt-20 md:pb-32">
      {/* 1. Aceternity Cinematic Volumetric Spotlights */}
      <Spotlight className="-top-40 left-0 md:left-40 md:-top-20" fill="#6D001A" />
      <Spotlight className="top-10 left-full -translate-x-full opacity-60" fill="#D1294F" />

      {/* Ambient background glows */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-burgundy/25 blur-[140px]" />
      <div className="pointer-events-none absolute top-40 right-10 h-[500px] w-[500px] rounded-full bg-burgundy-light/15 blur-[160px]" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8 grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-8 items-center">
        {/* Left Column: Headline, Value Prop & Marketplace Search */}
        <div>
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-burgundy/50 bg-burgundy/15 px-4 py-1.5 text-xs font-semibold text-white/90 shadow-lg shadow-burgundy/20 mb-6 backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-burgundy-light animate-pulse" />
            <span className="tracking-wide">India's Premier Creator Marketplace</span>
            <span className="text-burgundy-light">✦</span>
            <span className="font-deva text-white font-bold">कलाकार मंच</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-display font-black text-4xl sm:text-5xl md:text-7xl lg:text-[76px] leading-[1.04] tracking-tight mb-6 text-white">
            Hire verified Indian creators with{' '}
            <span className="relative inline-block italic text-gradient">
              zero middlemen.
              <SketchUnderline className="absolute -bottom-3 left-0 w-full h-4 text-burgundy-light opacity-80" />
            </span>
          </h1>

          <p className="text-muted text-base sm:text-lg max-w-xl mb-8 leading-relaxed">
            Discover Reels, YouTube, UGC, and Audio creators across 25+ cities. See verified follower counts and transparent starting rates upfront.
          </p>

          {/* Search Box with Real Indian Cities & Filters */}
          <div className="relative mb-4">
            <span className="hidden md:flex items-center gap-1.5 absolute -top-8 right-2 text-xs font-deva text-muted">
              यहाँ खोजें (Search here)
              <SketchArrow className="w-8 h-6 text-burgundy-light rotate-[20deg]" />
            </span>

            <form
              onSubmit={handleSearchSubmit}
              className="rounded-2xl border border-white/15 bg-surface/90 p-3 shadow-2xl shadow-black/80 backdrop-blur-2xl flex flex-col md:flex-row gap-2.5 transition-all focus-within:border-burgundy-light/60"
            >
              {/* Niche Dropdown */}
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

              {/* Indian City Dropdown */}
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

              {/* Budget Dropdown */}
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

              {/* Search Button */}
              <Button variant="primary" type="submit" className="md:px-7 justify-center shadow-lg shadow-burgundy/40">
                <Search size={16} />
                <span>Explore</span>
              </Button>
            </form>
          </div>

          {/* Quick Filter Tag Chips (Collebrity inspiration) */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <span className="text-xs text-muted font-medium">Popular:</span>
            {['🔥 Trending in Mumbai', 'Tech in Bengaluru', 'Fashion in Delhi', 'Reels under ₹5K'].map((tag) => (
              <button
                key={tag}
                onClick={() => handleQuickTag(tag)}
                className="text-xs rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-muted hover:border-burgundy-light/50 hover:bg-burgundy/20 hover:text-white transition-all"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Value Props Band */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-muted">
            <button
              onClick={() => onOpenRoleModal?.('creator')}
              className="flex items-center gap-2 font-medium text-muted hover:text-white transition-colors cursor-pointer"
            >
              <CheckCircle2 size={15} className="text-burgundy-light" />
              0% Agency Commission
            </button>
            <span className="flex items-center gap-2 font-medium">
              <CheckCircle2 size={15} className="text-burgundy-light" />
              Verified Media Kits
            </span>
            <span className="flex items-center gap-2 font-medium">
              <CheckCircle2 size={15} className="text-burgundy-light" />
              Direct WhatsApp / Email
            </span>
          </div>
        </div>

        {/* Right Column: 3D Interactive Card Fan-Out */}
        <div className="relative h-[480px] sm:h-[540px] hidden md:flex items-center justify-center">
          {/* Circular Stage Glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-brand opacity-20 blur-[120px] pointer-events-none" />

          {/* 3D Cards Fan */}
          <div className="relative w-full h-full flex items-center justify-center">
            {heroCreators.map((c, i) => {
              const ang = cardAngles[i]
              return (
                <div
                  key={c.id}
                  style={{
                    transform: `translate(${ang.x}px, ${ang.y}px) rotate(${ang.tilt}deg)`,
                    zIndex: i + 10,
                  }}
                  className="absolute w-[210px] transition-transform duration-500 ease-out hover:scale-105 hover:z-50"
                >
                  <CardContainer className="w-full">
                    <div className="relative aspect-9/16 w-full rounded-2xl overflow-hidden border border-white/15 bg-surface shadow-2xl shadow-black/90">
                      {/* Image */}
                      <img
                        src={c.image}
                        alt={c.name}
                        className="h-full w-full object-cover brightness-95 transition-transform duration-500 hover:scale-105"
                      />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                        <span className="rounded-full bg-black/60 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-semibold text-white border border-white/10">
                          {c.type}
                        </span>
                        <span className="flex items-center gap-1 rounded-full bg-burgundy/80 backdrop-blur-md px-2 py-0.5 text-[10px] font-bold text-white border border-burgundy-light/40">
                          <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                          {c.followers}
                        </span>
                      </div>

                      {/* Gradient Backdrop */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                      {/* Card Bottom Meta */}
                      <div className="absolute bottom-3.5 left-3.5 right-3.5">
                        <div className="flex items-center gap-1 text-[11px] text-muted mb-0.5">
                          <MapPin size={11} className="text-burgundy-light" />
                          <span>{c.city}, {c.state.slice(0, 2).toUpperCase()}</span>
                        </div>
                        <h4 className="font-display font-extrabold text-white text-base leading-tight">
                          {c.name}
                        </h4>
                        <p className="text-[11px] text-muted truncate mt-0.5">
                          {c.niche}
                        </p>

                        <div className="mt-2.5 flex items-center justify-between border-t border-white/10 pt-2">
                          <div>
                            <span className="block text-[9px] uppercase tracking-wider text-muted">Starts from</span>
                            <span className="text-xs font-bold text-white">₹{c.price.toLocaleString('en-IN')}</span>
                          </div>
                          <span className="rounded-full bg-white/10 px-2 py-1 text-[10px] font-semibold text-white hover:bg-burgundy transition">
                            Direct Inquiry
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContainer>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
