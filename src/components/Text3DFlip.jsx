import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../lib/utils'

export default function Text3DFlip({
  children,
  className = '',
  textClassName = '',
  flipTextClassName = '',
  rotateDirection = 'top',
  staggerDuration = 0.03,
  staggerFrom = 'first',
  transition = { type: 'spring', damping: 25, stiffness: 160 },
  as: Component = 'div',
}) {
  const [isHovered, setIsHovered] = useState(false)
  const text = typeof children === 'string' ? children : String(children)
  const letters = text.split('')
  const total = letters.length

  const getStaggerDelay = (index) => {
    switch (staggerFrom) {
      case 'last':
        return (total - 1 - index) * staggerDuration
      case 'center':
        return Math.abs(Math.floor(total / 2) - index) * staggerDuration
      case 'first':
      default:
        return index * staggerDuration
    }
  }


  const getFrontVariants = () => {
    if (rotateDirection === 'top') {
      return {
        initial: { rotateX: 0, y: '0%', opacity: 1 },
        flipped: { rotateX: 90, y: '-50%', opacity: 0 },
      }
    }
    if (rotateDirection === 'bottom') {
      return {
        initial: { rotateX: 0, y: '0%', opacity: 1 },
        flipped: { rotateX: -90, y: '50%', opacity: 0 },
      }
    }
    if (rotateDirection === 'left') {
      return {
        initial: { rotateY: 0, x: '0%', opacity: 1 },
        flipped: { rotateY: -90, x: '-50%', opacity: 0 },
      }
    }
    return {
      initial: { rotateY: 0, x: '0%', opacity: 1 },
      flipped: { rotateY: 90, x: '50%', opacity: 0 },
    }
  }

  const getBackVariants = () => {
    if (rotateDirection === 'top') {
      return {
        initial: { rotateX: -90, y: '50%', opacity: 0 },
        flipped: { rotateX: 0, y: '0%', opacity: 1 },
      }
    }
    if (rotateDirection === 'bottom') {
      return {
        initial: { rotateX: 90, y: '-50%', opacity: 0 },
        flipped: { rotateX: 0, y: '0%', opacity: 1 },
      }
    }
    if (rotateDirection === 'left') {
      return {
        initial: { rotateY: 90, x: '50%', opacity: 0 },
        flipped: { rotateY: 0, x: '0%', opacity: 1 },
      }
    }
    return {
      initial: { rotateY: -90, x: '-50%', opacity: 0 },
      flipped: { rotateY: 0, x: '0%', opacity: 1 },
    }
  }

  const frontVariants = getFrontVariants()
  const backVariants = getBackVariants()

  return (
    <Component
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        'inline-flex flex-wrap items-center justify-center cursor-pointer select-none [perspective:1000px]',
        className
      )}
    >
      {letters.map((char, index) => {
        const delay = getStaggerDelay(index)

        return (
          <span
            key={index}
            className="relative inline-block overflow-hidden [transform-style:preserve-3d]"
          >
            {/* Front Letter */}
            <motion.span
              initial="initial"
              animate={isHovered ? 'flipped' : 'initial'}
              variants={frontVariants}
              transition={{ ...transition, delay }}
              className={cn(
                'inline-block origin-center will-change-transform',
                textClassName
              )}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>

            {/* Flipped 3D Back Letter */}
            <motion.span
              aria-hidden
              initial="initial"
              animate={isHovered ? 'flipped' : 'initial'}
              variants={backVariants}
              transition={{ ...transition, delay }}
              className={cn(
                'absolute inset-0 inline-block origin-center will-change-transform',
                flipTextClassName
              )}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          </span>
        )
      })}
    </Component>
  )
}
