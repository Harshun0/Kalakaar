import { MessageCircle, Tag, SlidersHorizontal, MapPin } from 'lucide-react'
import { cn } from '../lib/utils'

const icons = { MessageCircle, Tag, SlidersHorizontal, MapPin }

export function BentoCard({ card }) {
  const Icon = icons[card.icon]

  return (
    <div
      className={cn(
        'relative rounded-2xl p-6 md:p-8 border border-white/10 bg-surface/60 backdrop-blur-xl overflow-hidden group hover:-translate-y-1 transition-transform duration-300',
        card.size === 'lg' ? 'md:col-span-2' : ''
      )}
    >
      <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-brand opacity-0 group-hover:opacity-10 blur-2xl transition-opacity" />
      <div className="w-11 h-11 rounded-xl bg-gradient-brand flex items-center justify-center mb-5">
        <Icon size={20} className="text-white" />
      </div>
      <h3 className="font-display font-bold text-xl mb-2">{card.title}</h3>
      <p className="text-muted text-sm leading-relaxed">{card.description}</p>
    </div>
  )
}
