import { useState } from 'react'
import { steps } from '../data/mockData'
import { StepCard } from './StepCard'
import { SectionHeading } from './SectionHeading'
import { cn } from '../lib/utils'

export function HowItWorks() {
  const [audience, setAudience] = useState('brands')
  const currentSteps = steps[audience]

  return (
    <section id="how-it-works" className="relative py-24 md:py-32 bg-surface/20">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <SectionHeading
          align="center"
          eyebrow="Simple by design"
          hindi="कैसे काम करता है"
          title={<>How it <span className="text-gradient">works</span></>}
        />

        <div className="flex justify-center mb-14">
          <div className="inline-flex bg-white/5 border border-white/10 rounded-full p-1">
            {['brands', 'creators'].map((key) => (
              <button
                key={key}
                onClick={() => setAudience(key)}
                className={cn(
                  'px-6 py-2.5 rounded-full text-sm font-semibold transition-colors',
                  audience === key ? 'bg-gradient-brand text-white' : 'text-muted hover:text-text'
                )}
              >
                For {key === 'brands' ? 'Brands' : 'Creators'}
              </button>
            ))}
          </div>
        </div>

        <div className="relative grid md:grid-cols-3 gap-5">
          <div className="hidden md:block absolute top-[38px] left-[16%] right-[16%] border-t-2 border-dotted border-burgundy/30 -z-0" />
          {currentSteps.map((step) => (
            <StepCard key={step.number} step={step} />
          ))}
        </div>
      </div>
    </section>
  )
}
