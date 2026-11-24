import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Sparkles, Compass } from 'lucide-react'
import { creators, filterChips, indianCities, popularSearches } from '../data/mockData'
import { CreatorCard } from './CreatorCard'
import { CreatorProfileModal } from './CreatorProfileModal'
import { NicheChip } from './NicheChip'
import { SectionHeading } from './SectionHeading'

export function FeaturedCreators({ onContact, externalFilters }) {
  const [activePlatformFilter, setActivePlatformFilter] = useState('All')
  const [selectedCity, setSelectedCity] = useState('All Cities')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('recommended') // 'recommended' | 'price-asc' | 'followers-desc'
  const [selectedProfileCreator, setSelectedProfileCreator] = useState(null)

  const effectiveCity = externalFilters?.city || selectedCity
  const effectiveQuery = (externalFilters?.niche && externalFilters.niche !== 'All Niches') ? externalFilters.niche : searchQuery

  const filteredCreators = useMemo(() => {
    return creators
      .filter((c) => {
        // Platform filter
        if (activePlatformFilter !== 'All' && c.type !== activePlatformFilter) return false
        // City filter
        if (effectiveCity !== 'All Cities' && !effectiveCity.toLowerCase().includes(c.city.toLowerCase())) return false
        // Search query
        if (effectiveQuery.trim()) {
          const q = effectiveQuery.toLowerCase()
          const matchName = c.name.toLowerCase().includes(q)
          const matchNiche = c.niche.toLowerCase().includes(q)
          const matchCity = c.city.toLowerCase().includes(q)
          const matchTags = c.tags?.some((t) => t.toLowerCase().includes(q))
          if (!matchName && !matchNiche && !matchCity && !matchTags) return false
        }
        return true
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price
        if (sortBy === 'followers-desc') {
          const numA = parseInt(a.followers)
          const numB = parseInt(b.followers)
          return numB - numA
        }
        return a.id - b.id
      })
  }, [activePlatformFilter, effectiveCity, effectiveQuery, sortBy])

  return (
    <section id="creators" className="relative py-10 md:py-14 overflow-hidden">
      {/* Background radial spotlight */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[900px] rounded-full bg-burgundy/10 blur-[160px]" />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8">
        <SectionHeading
          eyebrow="Marketplace Discovery"
          hindi="कलाकार चुनें"
          title={
            <>
              Explore verified <span className="text-gradient">Indian Creators</span>
            </>
          }
          description="Direct access to top creators across Instagram Reels, YouTube, UGC & Podcasts. Zero agency markup."
        />

        {/* Filter Controls Bar */}
        <div className="mt-8 mb-8 rounded-2xl border border-white/10 bg-surface/60 p-4 backdrop-blur-xl flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Platform Pills */}
          <div className="flex gap-2 overflow-x-auto scrollbar-none w-full lg:w-auto pb-1 lg:pb-0">
            {filterChips.map((chip) => (
              <NicheChip
                key={chip}
                label={chip}
                active={activePlatformFilter === chip}
                onClick={() => setActivePlatformFilter(chip)}
              />
            ))}
          </div>

          {/* City & Search & Sort */}
          <div className="flex flex-wrap sm:flex-nowrap gap-2.5 w-full lg:w-auto items-center">
            {/* Quick search input */}
            <div className="relative flex-1 sm:w-48">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="text"
                placeholder="Search niche, tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 pl-8 pr-3 py-2 text-xs text-white placeholder-white/40 focus:border-burgundy-light focus:outline-none"
              />
            </div>

            {/* City selector */}
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="rounded-xl border border-white/10 bg-surface px-3 py-2 text-xs text-white focus:border-burgundy-light focus:outline-none cursor-pointer"
            >
              {indianCities.map((city) => (
                <option key={city} value={city} className="bg-surface text-white">
                  {city}
                </option>
              ))}
            </select>

            {/* Sort selector */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-xl border border-white/10 bg-surface px-3 py-2 text-xs text-white focus:border-burgundy-light focus:outline-none cursor-pointer"
            >
              <option value="recommended">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="followers-desc">Followers: High to Low</option>
            </select>
          </div>
        </div>

        {/* Popular Searches Strip (Replicating Collebrity Market Standard) */}
        <div className="mb-6 flex flex-wrap items-center gap-2 text-xs">
          <span className="flex items-center gap-1 font-semibold text-muted text-[11px] uppercase tracking-wider">
            <Compass size={13} className="text-burgundy-light" />
            Popular searches:
          </span>
          {popularSearches.map((ps) => (
            <button
              key={ps.label}
              onClick={() => {
                setSearchQuery(ps.query)
                setSelectedCity(ps.city)
              }}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80 transition hover:border-burgundy-light hover:bg-burgundy/20 hover:text-white"
            >
              {ps.label}
            </button>
          ))}
          {(searchQuery || selectedCity !== 'All Cities') && (
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCity('All Cities')
              }}
              className="text-xs text-burgundy-light underline ml-2"
            >
              Clear
            </button>
          )}
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-muted mb-6">
          <span>
            Showing <strong className="text-white">{filteredCreators.length}</strong> verified creators
            {selectedCity !== 'All Cities' && ` in ${selectedCity}`}
          </span>
          <span className="flex items-center gap-1.5 text-burgundy-light font-medium">
            <Sparkles size={12} />
            Live rates verified by Kalakaar
          </span>
        </div>

        {/* 3D Creators Responsive Grid */}
        {filteredCreators.length > 0 ? (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredCreators.map((creator, i) => (
                <motion.div
                  key={creator.id}
                  layout
                  initial={{ opacity: 0, y: 45, scale: 0.93 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-30px' }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.45, delay: (i % 4) * 0.08, ease: 'easeOut' }}
                >
                  <CreatorCard
                    creator={creator}
                    onContact={onContact}
                    onSelectProfile={setSelectedProfileCreator}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="py-16 text-center border border-dashed border-white/15 rounded-3xl bg-surface/30">
            <p className="text-muted text-sm mb-3">No creators match your exact filter selection.</p>
            <button
              onClick={() => {
                setActivePlatformFilter('All')
                setSelectedCity('All Cities')
                setSearchQuery('')
              }}
              className="text-xs font-semibold text-burgundy-light hover:underline"
            >
              Reset all filters
            </button>
          </div>
        )}
        {/* Creator Detailed Profile & Media Kit Modal */}
        <CreatorProfileModal
          creator={selectedProfileCreator}
          isOpen={!!selectedProfileCreator}
          onClose={() => setSelectedProfileCreator(null)}
          onInquire={onContact}
        />
      </div>
    </section>
  )
}
