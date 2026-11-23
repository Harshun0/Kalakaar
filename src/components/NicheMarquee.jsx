import { niches } from '../data/mockData'

export function NicheMarquee() {
  const doubled = [...niches, ...niches]

  return (
    <div className="relative py-8 border-y border-white/5 overflow-hidden bg-surface/30">
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-bg to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bg to-transparent z-10" />

      <div className="flex gap-4 w-max animate-marquee">
        {doubled.map((n, i) => (
          <span
            key={`${n}-${i}`}
            className="px-5 py-2.5 rounded-full border border-white/10 bg-white/5 text-sm font-medium text-muted whitespace-nowrap"
          >
            {n}
          </span>
        ))}
      </div>
    </div>
  )
}
