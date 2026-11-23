import { useEffect, useRef, useState } from 'react'

export function StatCounter({ stat }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          if (prefersReduced || stat.value === 0) {
            setCount(stat.value)
            return
          }
          const duration = 1200
          const start = performance.now()
          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1)
            setCount(Math.floor(progress * stat.value))
            if (progress < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [stat.value])

  return (
    <div ref={ref} className="text-center">
      <div className="font-display font-extrabold text-4xl md:text-6xl text-gradient mb-2">
        {stat.prefix}{count}{stat.suffix}
      </div>
      <div className="text-muted text-sm md:text-base">{stat.label}</div>
    </div>
  )
}
