import { stats } from '../data/mockData'
import { StatCounter } from './StatCounter'

export function NumbersBand() {
  return (
    <section className="relative py-20 md:py-24 bg-surface/40 border-y border-white/5 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <div className="relative max-w-6xl mx-auto px-5 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
        {stats.map((stat) => (
          <StatCounter key={stat.label} stat={stat} />
        ))}
      </div>
    </section>
  )
}
