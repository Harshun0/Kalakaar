import { MapPin } from 'lucide-react'
import { Button } from './Button'
import { InstagramIcon, YoutubeIcon, PodcastIcon } from './icons'

const platformIcon = {
  Instagram: InstagramIcon,
  YouTube: YoutubeIcon,
  Podcast: PodcastIcon,
}

export function CreatorCard({ creator, onContact }) {
  const Icon = platformIcon[creator.platform] || InstagramIcon

  return (
    <div className="group relative shrink-0 w-[260px] md:w-[280px] aspect-9/16 rounded-2xl overflow-hidden border border-white/10 bg-surface hover:border-burgundy-light/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(109,0,26,0.2)]">
      <img
        src={creator.avatar}
        alt={creator.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

      <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm rounded-full px-2.5 py-1 text-xs text-muted">
        <Icon size={12} />
        <span>{creator.followers}</span>
      </div>

      <div className="absolute top-3 right-3 bg-gradient-brand rounded-full px-2.5 py-1 text-xs font-semibold text-white">
        From ₹{creator.price.toLocaleString('en-IN')}
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col gap-2">
        <div>
          <h3 className="font-display font-bold text-lg leading-tight">{creator.name}</h3>
          <div className="flex items-center gap-1.5 text-xs text-muted mt-1">
            <MapPin size={12} />
            <span>{creator.city}</span>
            <span>·</span>
            <span>{creator.niche}</span>
          </div>
        </div>
        <Button
          size="sm"
          variant="primary"
          className="w-full"
          onClick={() => onContact?.(creator)}
        >
          Contact
        </Button>
      </div>
    </div>
  )
}
