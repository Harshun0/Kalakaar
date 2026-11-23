import { Check } from 'lucide-react'
import { Button } from './Button'
import { creators } from '../data/mockData'
import { useReveal } from '../lib/useReveal'
import { SketchArrow } from './Doodles'

const previewCreator = creators[4]

const benefits = [
  'Free forever, no commission on inquiries',
  'Set your own prices, change anytime',
  'Get discovered by brands actively searching your niche',
]

export function ForCreatorsCTA() {
  const ref = useReveal()

  return (
    <section id="for-creators" className="relative py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <div
          ref={ref}
          className="reveal relative rounded-3xl p-[1.5px] bg-gradient-brand overflow-hidden"
        >
          <div className="relative rounded-3xl bg-bg p-8 md:p-14 grid md:grid-cols-[1.2fr_0.8fr] gap-10 items-center overflow-hidden">
            <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-burgundy-light/20 blur-[100px]" />
            <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-burgundy/20 blur-[100px]" />

            <div className="relative">
              <span className="font-deva text-sm text-muted mb-2 block">अपना हुनर दिखाओ</span>
              <h2 className="font-display font-extrabold text-3xl md:text-5xl tracking-tight mb-5">
                Your talent has a price.<br />
                <span className="text-gradient">Show it.</span>
              </h2>
              <ul className="flex flex-col gap-3 mb-8">
                {benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-muted text-sm md:text-base">
                    <Check size={18} className="text-burgundy-light shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="relative inline-flex items-center gap-3">
                <Button variant="primary" size="lg">Create your profile</Button>
                <SketchArrow className="hidden md:block w-10 h-8 text-burgundy-light -scale-x-100 -rotate-12" />
              </div>
            </div>

            <div className="relative flex justify-center">
              <div className="w-[220px] aspect-9/16 rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative">
                <img src={previewCreator.avatar} alt={previewCreator.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="font-display font-bold">{previewCreator.name}</p>
                  <p className="text-xs text-muted">{previewCreator.niche} · {previewCreator.city}</p>
                  <span className="inline-block mt-2 bg-gradient-brand text-white text-xs font-semibold px-2.5 py-1 rounded-full">
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
