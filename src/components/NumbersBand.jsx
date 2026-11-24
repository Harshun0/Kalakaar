import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { stats } from '../data/mockData'
import { StatCounter } from './StatCounter'

export function NumbersBand() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  // Subtle scroll-driven elevation and scaling
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.93, 1, 0.97])
  const y = useTransform(scrollYProgress, [0, 1], [35, -35])

  return (
    <section ref={containerRef} className="relative py-10 md:py-14 bg-surface/40 border-y border-white/5 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <motion.div
        style={{ scale, y }}
        className="relative max-w-6xl mx-auto px-5 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6"
      >
        {stats.map((stat) => (
          <StatCounter key={stat.label} stat={stat} />
        ))}
      </motion.div>
    </section>
  )
}
