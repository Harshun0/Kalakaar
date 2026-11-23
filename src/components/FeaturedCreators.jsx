import { useState } from 'react'
import { creators, filterChips } from '../data/mockData'
import { CreatorCard } from './CreatorCard'
import { NicheChip } from './NicheChip'
import { SectionHeading } from './SectionHeading'

export function FeaturedCreators({ onContact }) {
  const [filter, setFilter] = useState('All')

  const filtered = filter === 'All' ? creators : creators.filter((c) => c.type === filter)

  return (
    <section id="creators" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionHeading
          eyebrow="Browse"
          hindi="कलाकार चुनें"
          title={<>Featured <span className="text-gradient">creators</span></>}
          description="Hand-picked talent across every platform and niche."
        />

        <div className="flex gap-2.5 overflow-x-auto scrollbar-none pb-2 mb-8 -mx-5 px-5 md:mx-0 md:px-0">
          {filterChips.map((chip) => (
            <NicheChip
              key={chip}
              label={chip}
              active={filter === chip}
              onClick={() => setFilter(chip)}
            />
          ))}
        </div>

        <div className="flex md:grid md:grid-cols-4 gap-5 overflow-x-auto scrollbar-none -mx-5 px-5 md:mx-0 md:px-0 pb-4">
          {filtered.map((creator) => (
            <CreatorCard key={creator.id} creator={creator} onContact={onContact} />
          ))}
        </div>
      </div>
    </section>
  )
}
