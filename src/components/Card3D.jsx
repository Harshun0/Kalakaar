import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { cn } from '../lib/utils'

export function CardContainer({
  children,
  className = '',
  containerClassName = '',
}) {
  const containerRef = useRef(null)
  const [isMouseEntered, setIsMouseEntered] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Spring physics for buttery smooth tilt
  const springConfig = { damping: 20, stiffness: 300 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springConfig)

  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const clientX = e.clientX - rect.left
    const clientY = e.clientY - rect.top
    const x = clientX / width - 0.5
    const y = clientY / height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseEnter = () => {
    setIsMouseEntered(true)
  }

  const handleMouseLeave = () => {
    setIsMouseEntered(false)
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn('flex items-center justify-center [perspective:1000px]', containerClassName)}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className={cn('relative transition-all duration-200 ease-linear', className)}
      >
        {children}
        {/* Subtle radial glare */}
        {isMouseEntered && (
          <div
            className="pointer-events-none absolute inset-0 z-50 rounded-2xl opacity-40 mix-blend-overlay transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle 240px at ${((mouseX.get() + 0.5) * 100).toFixed(1)}% ${((mouseY.get() + 0.5) * 100).toFixed(1)}%, rgba(255,255,255,0.35), transparent 70%)`,
            }}
          />
        )}
      </motion.div>
    </div>
  )
}

export function CardItem({
  as: Tag = 'div',
  children,
  className = '',
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...rest
}) {
  return (
    <Tag
      style={{
        transform: `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`,
        transformStyle: 'preserve-3d',
      }}
      className={cn('w-fit transition duration-200 ease-linear', className)}
      {...rest}
    >
      {children}
    </Tag>
  )
}
