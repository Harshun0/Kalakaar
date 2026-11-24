import { useState } from 'react'
import { motion, useDragControls, useMotionValue, useTransform } from 'framer-motion'
import { Sparkles, MapPin, CheckCircle2, RotateCcw, Heart, X, Send } from 'lucide-react'
import { creators } from '../data/mockData'
import { SectionHeading } from './SectionHeading'

export function CreatorSwipeDeck({ onContact }) {
  const [cards, setCards] = useState(creators.slice(0, 8))
  const [lastAction, setLastAction] = useState(null)

  const handleReset = () => {
    setCards(creators.slice(0, 8))
    setLastAction(null)
  }

  const handleManualSwipe = (direction) => {
    if (cards.length === 0) return
    const topCard = cards[cards.length - 1]
    setLastAction(direction === 'right' ? `Shortlisted ${topCard.name}!` : `Passed ${topCard.name}`)
    if (direction === 'right') {
      onContact?.(topCard)
    }
    setCards((pv) => pv.slice(0, -1))
  }

  return (
    <section className="relative py-10 md:py-14 bg-black overflow-hidden border-b border-white/5">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[700px] rounded-full bg-burgundy/15 blur-[160px]" />

      <div className="relative max-w-6xl mx-auto px-5 md:px-8 text-center">
        <SectionHeading
          align="center"
          eyebrow="Interactive Discovery"
          hindi="कलाकार स्वाइप करें"
          title={
            <>
              Swipe to <span className="text-gradient">Shortlist Creators</span>
            </>
          }
          description="Drag cards left to pass, or right to shortlist and send a direct inquiry."
        />

        {/* Swipe Stage */}
        <div className="relative mt-10 flex flex-col items-center justify-center">
          <div className="grid h-[460px] w-full max-w-[320px] place-items-center">
            {cards.length > 0 ? (
              cards.map((card) => (
                <SwipeCardItem
                  key={card.id}
                  card={card}
                  cards={cards}
                  setCards={setCards}
                  onContact={onContact}
                  setLastAction={setLastAction}
                />
              ))
            ) : (
              <div className="flex h-96 w-72 flex-col items-center justify-center rounded-3xl border border-white/10 bg-surface/80 p-6 text-center backdrop-blur-xl">
                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-burgundy/30 text-burgundy-light">
                  <Sparkles size={24} />
                </div>
                <h4 className="font-display font-bold text-lg text-white mb-1">
                  You've reviewed the deck!
                </h4>
                <p className="text-xs text-muted mb-5 leading-relaxed">
                  Reset the stack to review creators again, or scroll down to explore all 500+ talent.
                </p>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 rounded-full bg-gradient-brand px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-burgundy/40"
                >
                  <RotateCcw size={14} />
                  <span>Reset Deck</span>
                </button>
              </div>
            )}
          </div>

          {/* Action Feedback Toast */}
          <div className="h-6 mt-4">
            {lastAction && (
              <span className="text-xs font-semibold text-burgundy-light animate-fade-up">
                ✦ {lastAction}
              </span>
            )}
          </div>

          {/* Controller Buttons Below Card */}
          {cards.length > 0 && (
            <div className="mt-4 flex items-center justify-center gap-4">
              <button
                onClick={() => handleManualSwipe('left')}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-surface text-muted hover:border-white/30 hover:text-white transition shadow-lg"
                aria-label="Pass"
              >
                <X size={20} />
              </button>

              <button
                onClick={handleReset}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-surface/50 text-muted hover:text-white transition"
                aria-label="Reset"
              >
                <RotateCcw size={16} />
              </button>

              <button
                onClick={() => handleManualSwipe('right')}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-burgundy-light/40 bg-burgundy text-white hover:bg-burgundy-light transition shadow-lg shadow-burgundy/40"
                aria-label="Shortlist"
              >
                <Heart size={20} className="fill-white" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function SwipeCardItem({ card, cards, setCards, onContact, setLastAction }) {
  const x = useMotionValue(0)
  const dragControls = useDragControls()

  const rotateRaw = useTransform(x, [-160, 160], [-18, 18])
  const opacity = useTransform(x, [-160, 0, 160], [0, 1, 0])

  const isFront = card.id === cards[cards.length - 1].id

  const rotate = useTransform(() => {
    const offset = isFront ? 0 : card.id % 2 ? 5 : -5
    return `${rotateRaw.get() + offset}deg`
  })

  const handleDragEnd = () => {
    const offset = x.get()
    if (Math.abs(offset) > 60) {
      if (offset > 60) {
        setLastAction?.(`Shortlisted ${card.name}!`)
        onContact?.(card)
      } else {
        setLastAction?.(`Passed ${card.name}`)
      }
      setCards((pv) => pv.filter((v) => v.id !== card.id))
    }
  }

  const handlePointerDown = (event) => {
    if (isFront) {
      dragControls.start(event, { distanceThreshold: 0 })
    }
  }

  return (
    <motion.div
      draggable={false}
      onPointerDown={handlePointerDown}
      className="relative h-[420px] w-[270px] sm:w-[290px] origin-bottom touch-none select-none rounded-3xl overflow-hidden border border-white/15 bg-surface hover:cursor-grab active:cursor-grabbing"
      style={{
        gridRow: 1,
        gridColumn: 1,
        zIndex: isFront ? cards.length : card.id,
        pointerEvents: isFront ? 'auto' : 'none',
        x,
        opacity,
        rotate,
        boxShadow: isFront
          ? '0 25px 35px -5px rgba(0, 0, 0, 0.8), 0 0 25px rgba(109, 0, 26, 0.35)'
          : undefined,
      }}
      animate={{
        scale: isFront ? 1 : 0.96,
      }}
      drag={isFront ? 'x' : false}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      dragSnapToOrigin
      onDragEnd={handleDragEnd}
    >
      {/* Creator Portrait Image */}
      <img
        src={card.image}
        alt={card.name}
        className="absolute inset-0 h-full w-full object-cover pointer-events-none"
      />

      {/* Cinematic Gradient Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />

      {/* Top Badges */}
      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
        <span className="rounded-full bg-black/60 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold text-white border border-white/10">
          {card.type}
        </span>
        <span className="rounded-full bg-burgundy/80 backdrop-blur-md px-2.5 py-1 text-[10px] font-extrabold text-white border border-burgundy-light/40">
          {card.followers}
        </span>
      </div>

      {/* Drag Direction Indicators */}
      <div className="absolute top-1/3 left-4 right-4 flex justify-between pointer-events-none z-20">
        <motion.div
          style={{ opacity: useTransform(x, [-80, -20], [1, 0]) }}
          className="rounded-xl border-2 border-red-500 bg-red-500/20 px-3 py-1 text-xs font-black text-red-400 rotate-[-12deg]"
        >
          PASS
        </motion.div>
        <motion.div
          style={{ opacity: useTransform(x, [20, 80], [0, 1]) }}
          className="rounded-xl border-2 border-emerald-400 bg-emerald-500/20 px-3 py-1 text-xs font-black text-emerald-300 rotate-[12deg]"
        >
          SHORTLIST
        </motion.div>
      </div>

      {/* Bottom Metadata */}
      <div className="absolute bottom-4 left-4 right-4 z-10 text-left pointer-events-none">
        <div className="flex items-center gap-1 text-[11px] text-muted mb-0.5">
          <MapPin size={11} className="text-burgundy-light" />
          <span>{card.city}, {card.state?.slice(0, 2).toUpperCase() || 'IN'}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <h3 className="font-display font-black text-lg text-white leading-tight">
            {card.name}
          </h3>
          <CheckCircle2 size={15} className="text-burgundy-light fill-burgundy" />
        </div>
        <p className="text-[11px] text-muted truncate mt-0.5">{card.tagline}</p>

        <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-2.5">
          <div>
            <span className="block text-[9px] uppercase tracking-wider text-muted font-medium">Starting from</span>
            <span className="text-xs font-black text-white">₹{card.price.toLocaleString('en-IN')}</span>
          </div>
          <span className="flex items-center gap-1 rounded-full bg-burgundy/80 px-2.5 py-1 text-[10px] font-bold text-white">
            <Send size={10} />
            <span>Swipe Right</span>
          </span>
        </div>
      </div>
    </motion.div>
  )
}
