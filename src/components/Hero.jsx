import { Search } from 'lucide-react'
import { Button } from './Button'
import { creators } from '../data/mockData'
import { SketchUnderline, SketchArrow } from './Doodles'

const heroCreators = creators.slice(0, 4)
const cardOffsets = [
  { tilt: -8, x: -260, y: -10 },
  { tilt: -3, x: -90, y: 20 },
  { tilt: 3, x: 80, y: -4 },
  { tilt: 8, x: 250, y: 24 },
]

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-16 pb-28 md:pt-24 md:pb-36">
      {/* spotlight glows */}
      <div className="absolute -top-40 -left-40 w-[560px] h-[560px] rounded-full bg-burgundy/20 blur-[120px] pointer-events-none" />
      <div className="absolute top-10 right-0 w-[560px] h-[560px] rounded-full bg-burgundy-light/20 blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8 grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
        {/* left */}
        <div>
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs font-medium text-muted mb-6">
            <span>India's creator marketplace</span>
            <span className="text-burgundy-light">✦</span>
            <span className="font-deva text-text">कलाकार</span>
          </div>

          <h1 className="font-display font-extrabold text-[44px] leading-[1.05] md:text-[72px] lg:text-[84px] tracking-tight mb-6">
            Find the creators your brand{' '}
            <span className="relative inline-block italic text-gradient">
              deserves.
              <SketchUnderline className="absolute -bottom-3 left-0 w-full h-4 text-burgundy-light" />
            </span>
          </h1>

          <p className="text-muted text-base md:text-lg max-w-xl mb-8">
            Browse hundreds of Indian creators, see their prices upfront, and reach out directly.
            No agencies, no middlemen.
          </p>

          {/* search bar */}
          <div className="relative">
          <span className="hidden md:flex items-center gap-1.5 absolute -top-8 right-2 text-xs font-deva text-muted">
            यहाँ खोजें
            <SketchArrow className="w-8 h-6 text-burgundy-light rotate-[20deg]" />
          </span>
          <div className="bg-surface/80 backdrop-blur-xl border border-white/10 rounded-2xl p-2.5 flex flex-col md:flex-row gap-2 mb-6">
            <select className="flex-1 bg-white/5 rounded-xl px-4 py-3 text-sm text-text focus:outline-none">
              <option className="bg-surface">All niches</option>
              <option className="bg-surface">Fashion</option>
              <option className="bg-surface">Food</option>
              <option className="bg-surface">Tech</option>
              <option className="bg-surface">Comedy</option>
            </select>
            <select className="flex-1 bg-white/5 rounded-xl px-4 py-3 text-sm text-text focus:outline-none">
              <option className="bg-surface">All cities</option>
              <option className="bg-surface">Mumbai</option>
              <option className="bg-surface">Delhi</option>
              <option className="bg-surface">Bengaluru</option>
              <option className="bg-surface">Pune</option>
            </select>
            <select className="flex-1 bg-white/5 rounded-xl px-4 py-3 text-sm text-text focus:outline-none">
              <option className="bg-surface">Any budget</option>
              <option className="bg-surface">Under ₹5,000</option>
              <option className="bg-surface">₹5,000 – ₹15,000</option>
              <option className="bg-surface">₹15,000+</option>
            </select>
            <Button variant="primary" className="md:px-8">
              <Search size={16} />
              Search
            </Button>
          </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-burgundy" /> Free for creators
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-burgundy-light" /> Direct inquiries
            </span>
          </div>
        </div>

        {/* right: fan of cards */}
        <div className="relative h-[420px] md:h-[520px] hidden lg:block">
          <div className="absolute inset-0 rounded-full bg-gradient-brand opacity-20 blur-[100px]" />
          {heroCreators.map((c, i) => {
            const o = cardOffsets[i]
            return (
              <div
                key={c.id}
                style={{
                  transform: `translate(calc(-50% + ${o.x}px), calc(-50% + ${o.y}px)) rotate(${o.tilt}deg)`,
                }}
                className="absolute top-1/2 left-1/2 w-[190px]"
              >
                <div
                  style={{ animationDelay: `${i * 0.4}s` }}
                  className="relative aspect-9/16 rounded-2xl overflow-hidden border border-white/10 shadow-2xl animate-float"
                >
                  <img src={c.avatar} alt={c.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="font-display font-bold text-sm">{c.name}</p>
                    <p className="text-[11px] text-muted">{c.niche} · {c.followers}</p>
                    <span className="inline-block mt-1 bg-gradient-brand text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                      from ₹{c.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
