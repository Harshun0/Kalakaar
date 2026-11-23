import { whyCards } from '../data/mockData'
import { BentoCard } from './BentoCard'
import { SectionHeading } from './SectionHeading'

export function WhyKalakaar() {
  return (
    <section id="why" className="relative py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <SectionHeading
          eyebrow="Why Kalakaar"
          hindi="क्यों कलाकार"
          title={<>Built different, <span className="text-gradient">on purpose</span></>}
        />

        <div className="grid md:grid-cols-2 gap-5">
          {whyCards.map((card) => (
            <BentoCard key={card.title} card={card} />
          ))}
        </div>
      </div>
    </section>
  )
}
