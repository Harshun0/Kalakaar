import { useState } from 'react'
import { MapPin, Star, CheckCircle2, TrendingUp, Send } from 'lucide-react'
import { Button } from './Button'
import { InstagramIcon, YoutubeIcon, PodcastIcon } from './icons'
import { CardContainer } from './Card3D'

const platformIcon = {
  Instagram: InstagramIcon,
  YouTube: YoutubeIcon,
  Podcast: PodcastIcon,
}

export function CreatorCard({ creator, onContact, onSelectProfile }) {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const Icon = platformIcon[creator.platform] || InstagramIcon

  return (
    <CardContainer containerClassName="w-full">
      <div
        onClick={() => onSelectProfile?.(creator)}
        className="group relative w-full aspect-9/16 rounded-3xl overflow-hidden border border-white/10 bg-surface transition-all duration-500 hover:border-burgundy-light/60 hover:shadow-2xl hover:shadow-burgundy/30 cursor-pointer"
      >
        {/* Background Image / Reel Poster */}
        <img
          src={creator.image || creator.avatar}
          alt={creator.name}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
        />

        {/* Cinematic Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/60 pointer-events-none" />

        {/* Top Badges Bar */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
          {/* Platform & Follower Metric */}
          <div className="flex items-center gap-1.5 rounded-full bg-black/70 backdrop-blur-md px-3 py-1 text-xs font-semibold text-white border border-white/10 shadow-lg">
            <Icon size={13} className="text-burgundy-light" />
            <span>{creator.followers}</span>
          </div>

          {/* Shortlist / Star Button (Collebrity Feature) */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              setIsBookmarked(!isBookmarked)
            }}
            className={`flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-md transition-all ${
              isBookmarked
                ? 'bg-burgundy text-white shadow-lg shadow-burgundy/50'
                : 'bg-black/60 text-white/70 hover:bg-black/90 hover:text-white border border-white/10'
            }`}
            aria-label="Save to shortlist"
          >
            <Star size={14} className={isBookmarked ? 'fill-white' : ''} />
          </button>
        </div>

        {/* Mid-Card Badges on Hover */}
        <div className="absolute top-14 left-3.5 flex flex-wrap gap-1.5 z-10">
          {creator.engagement && (
            <span className="flex items-center gap-1 rounded-full bg-white/10 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-bold text-white border border-white/10">
              <TrendingUp size={11} className="text-burgundy-light" />
              {creator.engagement} ER
            </span>
          )}
          <span className="rounded-full bg-burgundy/60 backdrop-blur-md px-2 py-0.5 text-[10px] font-semibold text-white border border-burgundy-light/30">
            {creator.type}
          </span>
        </div>

        {/* Bottom Content Area */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 flex flex-col gap-2.5 z-10">
          <div>
            {/* Location & Niche */}
            <div className="flex items-center gap-1.5 text-xs text-muted mb-1">
              <MapPin size={12} className="text-burgundy-light shrink-0" />
              <span className="font-medium text-white/80">{creator.city}, {creator.state?.slice(0, 2).toUpperCase() || 'IN'}</span>
              <span>•</span>
              <span className="truncate">{creator.niche}</span>
            </div>

            {/* Creator Name + Verified Check */}
            <div className="flex items-center gap-1.5">
              <h3 className="font-display font-black text-xl text-white tracking-tight leading-tight">
                {creator.name}
              </h3>
              {creator.verified && (
                <CheckCircle2 size={16} className="text-burgundy-light fill-burgundy shrink-0" />
              )}
            </div>

            {/* Tagline / Vibe */}
            {creator.tagline && (
              <p className="text-[11px] text-muted line-clamp-1 mt-0.5">
                {creator.tagline}
              </p>
            )}
          </div>

          {/* Pricing & Inquiry CTA */}
          <div className="border-t border-white/10 pt-2.5 flex items-center justify-between gap-3">
            <div>
              <span className="block text-[9px] uppercase tracking-wider text-muted font-medium">Starting Rate</span>
              <span className="text-base font-extrabold text-white">
                ₹{creator.price.toLocaleString('en-IN')}
              </span>
            </div>

            <Button
              size="sm"
              variant="primary"
              className="px-4 py-2 text-xs shadow-md shadow-burgundy/40 border border-burgundy-light/40 group/btn"
              onClick={(e) => {
                e.stopPropagation()
                onContact?.(creator)
              }}
            >
              <span>Inquire</span>
              <Send size={12} className="transition group-hover/btn:translate-x-0.5" />
            </Button>
          </div>
        </div>
      </div>
    </CardContainer>
  )
}
