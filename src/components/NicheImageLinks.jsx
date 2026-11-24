import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { SectionHeading } from './SectionHeading'

const creativeDomains = [
  {
    heading: 'Fashion & Style',
    subheading: 'High-street, ethnic, and luxury editorial reels',
    imgSrc: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=700&q=80',
    count: '140+ Creators',
  },
  {
    heading: 'Tech & Gadgets',
    subheading: 'Deep teardowns, AI workflows & flagship reviews',
    imgSrc: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=700&q=80',
    count: '95+ Creators',
  },
  {
    heading: 'Food & Culinary',
    subheading: 'Indie cafe crawls, regional recipes & ASMR shorts',
    imgSrc: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=700&q=80',
    count: '110+ Creators',
  },
  {
    heading: 'Travel & Cinematic',
    subheading: '4K drone perspectives across the Himalayas & coasts',
    imgSrc: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=700&q=80',
    count: '80+ Creators',
  },
  {
    heading: 'Standup & Comedy',
    subheading: 'Viral Hinglish reels, sketches & cultural satire',
    imgSrc: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?auto=format&fit=crop&w=700&q=80',
    count: '65+ Creators',
  },
  {
    heading: 'Hip-Hop & Audio',
    subheading: 'Original beats, cyphers, and podcast soundscapes',
    imgSrc: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=700&q=80',
    count: '50+ Creators',
  },
]

export function NicheImageLinks() {
  const scrollToCreators = () => {
    const el = document.getElementById('creators')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative py-10 md:py-14 bg-black overflow-hidden border-b border-white/5">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/2 right-1/4 h-[600px] w-[600px] rounded-full bg-burgundy/15 blur-[160px]" />

      <div className="relative max-w-6xl mx-auto px-5 md:px-8">
        <SectionHeading
          eyebrow="Interactive Hover Stage"
          hindi="हुनर की श्रेणियाँ"
          title={
            <>
              Explore by <span className="text-gradient">Creative Domain</span>
            </>
          }
          description="Hover over each discipline to preview sample aesthetics and talent across India."
        />

        <div className="mt-12 divide-y divide-white/10 border-t border-b border-white/10">
          {creativeDomains.map((domain) => (
            <DomainHoverLink
              key={domain.heading}
              heading={domain.heading}
              subheading={domain.subheading}
              imgSrc={domain.imgSrc}
              count={domain.count}
              onClick={scrollToCreators}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function DomainHoverLink({ heading, subheading, imgSrc, count, onClick }) {
  const linkRef = useRef(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Spring physics for butter-smooth cursor tracking
  const springConfig = { damping: 18, stiffness: 220 }
  const mouseXSpring = useSpring(x, springConfig)
  const mouseYSpring = useSpring(y, springConfig)

  const top = useTransform(mouseYSpring, [0.5, -0.5], ['35%', '65%'])
  const left = useTransform(mouseXSpring, [0.5, -0.5], ['55%', '72%'])

  const handleMouseMove = (e) => {
    if (!linkRef.current) return
    const rect = linkRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  return (
    <motion.div
      ref={linkRef}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      initial="initial"
      whileHover="whileHover"
      className="group relative flex items-center justify-between py-6 md:py-8 cursor-pointer transition-colors duration-300 hover:border-burgundy-light/60"
    >
      <div className="relative z-10">
        {/* Kinetic letter-stagger heading */}
        <motion.div
          variants={{
            initial: { x: 0 },
            whileHover: { x: 12 },
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="flex items-center gap-3"
        >
          <span className="font-display font-black text-2xl sm:text-4xl md:text-5xl text-muted group-hover:text-white transition-colors duration-300">
            {heading}
          </span>
          <span className="rounded-full bg-burgundy/30 border border-burgundy-light/30 px-2.5 py-0.5 text-[10px] font-bold text-burgundy-light uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {count}
          </span>
        </motion.div>

        <span className="relative z-10 mt-1.5 block text-xs sm:text-sm text-muted group-hover:text-white/80 transition-colors duration-300">
          {subheading}
        </span>
      </div>

      {/* Floating Spring Image Reveal that follows cursor */}
      <motion.img
        style={{
          top,
          left,
          translateX: '-50%',
          translateY: '-50%',
        }}
        variants={{
          initial: { scale: 0, rotate: '-10deg', opacity: 0 },
          whileHover: { scale: 1, rotate: '8deg', opacity: 1 },
        }}
        transition={{ type: 'spring', damping: 16, stiffness: 200 }}
        src={imgSrc}
        alt={heading}
        className="pointer-events-none absolute z-20 h-32 w-48 sm:h-44 sm:w-64 rounded-2xl object-cover border-2 border-burgundy-light/60 shadow-2xl shadow-black/90"
      />

      {/* Trailing arrow indicator */}
      <motion.div
        variants={{
          initial: { x: 20, opacity: 0.3 },
          whileHover: { x: 0, opacity: 1 },
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        className="relative z-10 p-2 text-muted group-hover:text-burgundy-light transition-colors"
      >
        <ArrowRight className="h-6 w-6 sm:h-8 sm:w-8" />
      </motion.div>
    </motion.div>
  )
}
