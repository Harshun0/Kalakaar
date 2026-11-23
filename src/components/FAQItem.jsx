import { ChevronDown } from 'lucide-react'

export function FAQItem({ faq, open, onToggle }) {
  return (
    <div className="border-b border-white/10">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
      >
        <span className="font-display font-semibold text-base md:text-lg">{faq.question}</span>
        <ChevronDown
          size={20}
          className={`shrink-0 text-burgundy-light transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className="grid transition-all duration-300 ease-out"
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <p className="text-muted text-sm md:text-base pb-5 pr-8">{faq.answer}</p>
        </div>
      </div>
    </div>
  )
}
