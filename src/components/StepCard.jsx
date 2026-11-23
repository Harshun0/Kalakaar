import { Search, Bookmark, Send, UserPlus, Tag, Inbox } from 'lucide-react'

const icons = { Search, Bookmark, Send, UserPlus, Tag, Inbox }

export function StepCard({ step }) {
  const Icon = icons[step.icon]

  return (
    <div className="relative flex-1 bg-surface/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-7 hover:border-burgundy/30 transition-colors">
      <span className="font-display font-extrabold text-4xl text-gradient block mb-4">
        {step.number}
      </span>
      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
        <Icon size={18} className="text-burgundy-light" />
      </div>
      <h3 className="font-display font-bold text-lg mb-1.5">{step.title}</h3>
      <p className="text-muted text-sm leading-relaxed">{step.description}</p>
    </div>
  )
}
