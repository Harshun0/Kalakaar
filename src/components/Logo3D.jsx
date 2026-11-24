import { useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import logoDeva from '../assets/logo-devanagari.jpg'

export function Logo3D({
  size = 'md', // 'sm' | 'md' | 'lg' | 'xl'
  className = '',
  enableSpinOnClick = true,
  enableAmbientFloat = true,
}) {
  const cardRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const [clickSpins, setClickSpins] = useState(0)

  // Motion values for cursor tracking
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth spring physics for rotation
  const springConfig = { damping: 18, stiffness: 220, mass: 0.6 }
  const rotateXSpring = useSpring(useTransform(mouseY, [-0.5, 0.5], [22, -22]), springConfig)
  const rotateYSpring = useSpring(useTransform(mouseX, [-0.5, 0.5], [-22, 22]), springConfig)
  const glareX = useSpring(useTransform(mouseX, [-0.5, 0.5], ['0%', '100%']), springConfig)
  const glareY = useSpring(useTransform(mouseY, [-0.5, 0.5], ['0%', '100%']), springConfig)

  const sizeClasses = {
    sm: 'h-9 w-9 rounded-lg',
    md: 'h-11 w-11 rounded-xl',
    lg: 'h-14 w-14 rounded-2xl',
    xl: 'h-20 w-20 rounded-3xl',
  }

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const currentMouseX = (e.clientX - rect.left) / width - 0.5
    const currentMouseY = (e.clientY - rect.top) / height - 0.5

    mouseX.set(currentMouseX)
    mouseY.set(currentMouseY)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    mouseX.set(0)
    mouseY.set(0)
  }

  const handleClick = (e) => {
    if (enableSpinOnClick) {
      e.stopPropagation()
      setClickSpins((prev) => prev + 1)
    }
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={`relative inline-block cursor-pointer select-none [perspective:900px] ${className}`}
    >
      <motion.div
        animate={{
          rotateY: enableAmbientFloat && !isHovered ? [0, 10, -10, 0] : undefined,
          rotateX: enableAmbientFloat && !isHovered ? [0, -6, 6, 0] : undefined,
        }}
        transition={{
          rotateY: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
          rotateX: { duration: 4.5, repeat: Infinity, ease: 'easeInOut' },
        }}
        style={{
          rotateX: isHovered ? rotateXSpring : 0,
          rotateY: isHovered ? rotateYSpring : undefined,
          transformStyle: 'preserve-3d',
        }}
        className={`relative ${sizeClasses[size] || sizeClasses.md} border border-burgundy/50 bg-black shadow-lg shadow-burgundy/30 transition-shadow duration-300 hover:shadow-2xl hover:shadow-burgundy/60 hover:border-burgundy-light`}
      >
        {/* 3D Depth Layer 1: Image Face */}
        <motion.div
          animate={{
            rotateY: clickSpins * 360,
          }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
          style={{
            transformStyle: 'preserve-3d',
            transform: 'translateZ(14px)',
          }}
          className="absolute inset-0 h-full w-full overflow-hidden rounded-[inherit]"
        >
          <img
            src={logoDeva}
            alt="कलाकार Emblem"
            className="h-full w-full object-cover transition-transform duration-300"
          />

          {/* 3D Dynamic Specular Glare */}
          <motion.div
            style={{
              background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.45) 0%, rgba(209,41,79,0.2) 40%, transparent 80%)`,
              opacity: isHovered ? 1 : 0,
            }}
            className="pointer-events-none absolute inset-0 transition-opacity duration-300 mix-blend-overlay"
          />
        </motion.div>

        {/* 3D Rim Ring Glow */}
        <div
          style={{ transform: 'translateZ(-6px)' }}
          className="absolute -inset-[2px] rounded-[inherit] bg-gradient-to-tr from-burgundy via-burgundy-light to-transparent opacity-40 blur-[2px] -z-10"
        />
      </motion.div>
    </div>
  )
}

export default Logo3D
