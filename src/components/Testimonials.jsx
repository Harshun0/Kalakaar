import { testimonials } from '../data/mockData'
import { TestimonialCard } from './TestimonialCard'
import { SectionHeading } from './SectionHeading'

export function Testimonials() {
  return (
    <section className="relative py-24 md:py-32 bg-surface/20">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <SectionHeading
          align="center"
          eyebrow="Loved by both sides"
          hindi="लोगों की राय"
          title={<>What people <span className="text-gradient">are saying</span></>}
        />
        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <TestimonialCard key={t.name} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  )
}
