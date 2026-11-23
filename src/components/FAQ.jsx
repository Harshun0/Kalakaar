import { useState } from 'react'
import { faqs } from '../data/mockData'
import { FAQItem } from './FAQItem'
import { SectionHeading } from './SectionHeading'

export function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="relative py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-5 md:px-8">
        <SectionHeading
          align="center"
          eyebrow="Questions"
          hindi="सवाल-जवाब"
          title={<>Frequently <span className="text-gradient">asked</span></>}
        />
        <div>
          {faqs.map((faq, i) => (
            <FAQItem
              key={faq.question}
              faq={faq}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
