import { useReveal } from '../lib/useReveal'
import { SketchUnderline } from './Doodles'
import { TextAnimate } from './TextAnimate'

export function SectionHeading({ eyebrow, hindi, title, description, align = 'left' }) {
  const ref = useReveal()

  return (
    <div
      ref={ref}
      className={`reveal mb-12 md:mb-16 ${align === 'center' ? 'text-center mx-auto max-w-2xl' : ''}`}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-burgundy-light mb-3">
          {typeof eyebrow === 'string' ? (
            <TextAnimate animation="blurInUp" by="character" duration={0.35}>
              {eyebrow}
            </TextAnimate>
          ) : (
            eyebrow
          )}
          {hindi && <span className="font-deva normal-case tracking-normal text-muted">· {hindi}</span>}
        </span>
      )}
      <h2 className="relative inline-block font-display font-extrabold text-3xl md:text-5xl tracking-tight mb-3">
        {typeof title === 'string' ? (
          <TextAnimate animation="blurInUp" by="word" duration={0.4}>
            {title}
          </TextAnimate>
        ) : (
          title
        )}
        <SketchUnderline className="absolute -bottom-2 left-0 w-24 h-3 text-burgundy hidden md:block" />
      </h2>
      {description && (
        <div className="text-muted text-base md:text-lg">
          {typeof description === 'string' ? (
            <TextAnimate animation="blurInUp" by="word" duration={0.4} delay={0.1}>
              {description}
            </TextAnimate>
          ) : (
            description
          )}
        </div>
      )}
    </div>
  )
}
