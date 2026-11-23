import { Button } from './Button'
import { SketchStar } from './Doodles'

export function FinalCTA() {
  return (
    <section className="relative py-28 md:py-40 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-brand opacity-[0.15] blur-[140px] pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-5 md:px-8 text-center">
        <span className="font-deva text-sm text-muted mb-3 block">चलो साथ काम करें</span>
        <h2 className="relative inline-block font-display font-extrabold text-4xl md:text-7xl tracking-tight mb-8">
          <SketchStar className="hidden md:block absolute -top-6 -left-10 w-10 h-10 text-burgundy-light" />
          Ready to <span className="text-gradient italic">collab?</span>
          <SketchStar className="hidden md:block absolute -bottom-2 -right-10 w-7 h-7 text-burgundy-light" />
        </h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="primary" size="lg" className="w-full sm:w-auto">
            Browse Creators
          </Button>
          <Button variant="outline" size="lg" className="w-full sm:w-auto">
            Join as Creator
          </Button>
        </div>
      </div>
    </section>
  )
}
