import { Check, Sparkles } from 'lucide-react'
import { Button } from './Button'
import { creators } from '../data/mockData'
import { useReveal } from '../lib/useReveal'
import { SketchArrow } from './Doodles'
import { TextAnimate } from './TextAnimate'

const previewCreator = creators[4]

const benefits = [
  'Zero commission on brand inquiries — keep 100% of your earnings',
  'Set your transparent starting prices for Reels, YouTube & UGC',
  'Get discovered by verified D2C brands, consumer apps & startups actively searching',
  'Official media kit share link with verified Instagram & YouTube metrics',
]

export function ForCreatorsCTA({ onOpenRoleModal }) {
  const ref = useReveal()

  return (
    <section id="for-creators" className="relative py-10 md:py-14">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <div
          ref={ref}
          className="reveal relative rounded-3xl p-[1.5px] bg-gradient-brand overflow-hidden shadow-2xl shadow-burgundy/20"
        >
          <div className="relative rounded-3xl bg-bg p-8 md:p-14 grid md:grid-cols-[1.2fr_0.8fr] gap-10 items-center overflow-hidden">
            <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-burgundy-light/25 blur-[100px]" />
            <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-burgundy/30 blur-[100px]" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full bg-burgundy/20 border border-burgundy/40 px-3 py-1 text-xs text-burgundy-light font-semibold mb-3">
                <Sparkles size={13} />
                <span className="font-deva text-white">अपना हुनर दिखाओ</span>
              </div>

              <h2 className="font-display font-black text-3xl md:text-5xl tracking-tight mb-5 text-white">
                <TextAnimate animation="blurInUp" by="word" duration={0.45}>
                  Your talent has a price.
                </TextAnimate>
                <br />
                <span className="text-gradient">
                  <TextAnimate animation="blurInUp" by="character" duration={0.4} delay={0.2}>
                    Publish your rate card.
                  </TextAnimate>
                </span>
              </h2>

              <ul className="flex flex-col gap-3.5 mb-8">
                {benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-muted text-sm md:text-base">
                    <Check size={18} className="text-burgundy-light shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="relative inline-flex items-center gap-3">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => onOpenRoleModal?.('creator')}
                  className="shadow-xl shadow-burgundy/40"
                >
                  Create Your Free Media Kit
                </Button>
                <SketchArrow className="hidden md:block w-10 h-8 text-burgundy-light -scale-x-100 -rotate-12" />
              </div>
            </div>

            <div className="relative flex justify-center">
              <div className="w-[240px] aspect-9/16 rounded-3xl overflow-hidden border border-white/15 shadow-2xl relative bg-surface">
                <img
                  src={previewCreator.image || previewCreator.avatar}
                  alt={previewCreator.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] text-white border border-white/10">
                  {previewCreator.type}
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="font-display font-extrabold text-white text-base">{previewCreator.name}</p>
                  <p className="text-xs text-muted">{previewCreator.niche} · {previewCreator.city}</p>
                  <span className="inline-block mt-2 bg-gradient-brand text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    Starting ₹{previewCreator.price.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
