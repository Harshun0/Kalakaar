import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

/**
 * ScrollBloom: Dynamic scroll bloom interaction
 * As the upcoming section/component scrolls into view, it enters slightly compact (scaled down)
 * and dissolved (lower opacity), blooming smoothly into full 1.0 scale and 1.0 opacity
 * as it reaches its natural reading position. Eliminates dead black space while keeping
 * scrolling cinematic and alive.
 */
export function ScrollBloom({
  children,
  className = '',
  scaleFrom = 0.92,
  opacityFrom = 0.45,
  yOffset = 40,
}) {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start 75%'],
  })

  const scale = useTransform(scrollYProgress, [0, 1], [scaleFrom, 1])
  const opacity = useTransform(scrollYProgress, [0, 1], [opacityFrom, 1])
  const y = useTransform(scrollYProgress, [0, 1], [yOffset, 0])

  return (
    <motion.div
      ref={ref}
      style={{
        scale,
        opacity,
        y,
        transformOrigin: 'top center',
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
