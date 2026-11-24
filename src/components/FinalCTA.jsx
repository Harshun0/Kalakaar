import { Button } from './Button'
import { SketchStar } from './Doodles'
import { FlipLink } from './FlipLink'
import Text3DFlip from './Text3DFlip'

export function FinalCTA({ onOpenRoleModal }) {
  const scrollToCreators = () => {
    const el = document.getElementById('creators')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative py-12 md:py-16 overflow-hidden bg-black">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-brand opacity-[0.22] blur-[150px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-5 md:px-8 text-center">
        <span className="font-deva text-sm text-muted mb-3 block">चलो साथ काम करें</span>

        {/* Magic UI 3D Letter Flip Headline */}
        <div className="relative inline-block mb-8">
          <SketchStar className="hidden md:block absolute -top-8 -left-12 w-10 h-10 text-burgundy-light" />
          <Text3DFlip
            className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-tight text-white"
            textClassName="text-white"
            flipTextClassName="text-gradient"
            rotateDirection="top"
            staggerDuration={0.025}
            staggerFrom="center"
          >
            Ready to collab?
          </Text3DFlip>
          <SketchStar className="hidden md:block absolute -bottom-4 -right-12 w-7 h-7 text-burgundy-light" />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <Button
            variant="primary"
            size="lg"
            className="w-full sm:w-auto shadow-2xl shadow-burgundy/40 px-8 py-3.5"
            onClick={scrollToCreators}
          >
            Browse Marketplace
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto border-white/20 hover:border-burgundy-light px-8 py-3.5"
            onClick={() => onOpenRoleModal?.('onboard')}
          >
            Join as Creator or Manager
          </Button>
        </div>

        {/* Hover.dev Reveal Links Section */}
        <div className="pt-10 border-t border-white/10">
          <span className="text-xs uppercase tracking-widest text-muted block mb-6 font-bold">
            Connect Across Socials
          </span>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12">
            <FlipLink href="#" className="text-xl sm:text-3xl text-muted/70 hover:text-white">
              Instagram
            </FlipLink>
            <FlipLink href="#" className="text-xl sm:text-3xl text-muted/70 hover:text-white">
              YouTube
            </FlipLink>
            <FlipLink href="#" className="text-xl sm:text-3xl text-muted/70 hover:text-white">
              LinkedIn
            </FlipLink>
            <FlipLink href="#" className="text-xl sm:text-3xl text-muted/70 hover:text-white">
              Twitter
            </FlipLink>
          </div>
        </div>
      </div>
    </section>
  )
}
