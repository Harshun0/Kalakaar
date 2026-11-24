import { motion } from 'framer-motion'

const DURATION = 0.25
const STAGGER = 0.02

export function FlipLink({ children, href = '#', className = '', onClick }) {
  const text = String(children)

  return (
    <motion.a
      initial="initial"
      whileHover="hovered"
      href={href}
      onClick={onClick}
      className={`relative inline-block overflow-hidden whitespace-nowrap font-display font-black uppercase leading-tight cursor-pointer ${className}`}
    >
      <div>
        {text.split('').map((l, i) => (
          <motion.span
            variants={{
              initial: { y: 0 },
              hovered: { y: '-100%' },
            }}
            transition={{
              duration: DURATION,
              ease: 'easeInOut',
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}
          >
            {l === ' ' ? '\u00A0' : l}
          </motion.span>
        ))}
      </div>
      <div className="absolute inset-0 text-burgundy-light">
        {text.split('').map((l, i) => (
          <motion.span
            variants={{
              initial: { y: '100%' },
              hovered: { y: 0 },
            }}
            transition={{
              duration: DURATION,
              ease: 'easeInOut',
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}
          >
            {l === ' ' ? '\u00A0' : l}
          </motion.span>
        ))}
      </div>
    </motion.a>
  )
}
