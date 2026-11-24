import { motion } from 'framer-motion'
import { InstagramIcon, YoutubeIcon, XIcon, PodcastIcon } from './icons'

const platformStyles = {
  Instagram: {
    icon: InstagramIcon,
    bg: 'bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]',
    border: 'border-surface',
    label: 'Instagram',
    color: 'text-white',
  },
  YouTube: {
    icon: YoutubeIcon,
    bg: 'bg-[#FF0000]',
    border: 'border-surface',
    label: 'YouTube',
    color: 'text-white',
  },
  X: {
    icon: XIcon,
    bg: 'bg-[#181818]',
    border: 'border-surface',
    label: 'X (Twitter)',
    color: 'text-white',
  },
  Podcast: {
    icon: PodcastIcon,
    bg: 'bg-[#1DB954]',
    border: 'border-surface',
    label: 'Podcast / Spotify',
    color: 'text-white',
  },
}

export function SocialOverlapStack({
  platforms = ['Instagram', 'YouTube', 'Podcast', 'X'],
  size = 'md', // 'sm' | 'md' | 'lg'
  showAdd = true,
  showLabel = false,
  className = '',
}) {
  const sizeMap = {
    sm: { container: 'h-6 w-6', icon: 11, text: 'text-[9px]', overlap: '-space-x-1.5' },
    md: { container: 'h-8 w-8', icon: 14, text: 'text-[10px]', overlap: '-space-x-2.5' },
    lg: { container: 'h-10 w-10', icon: 18, text: 'text-xs', overlap: '-space-x-3' },
  }

  const currentSize = sizeMap[size] || sizeMap.md

  return (
    <div className={`flex items-center ${className}`}>
      <div className={`flex items-center ${currentSize.overlap}`}>
        {platforms.map((p, index) => {
          const config = platformStyles[p] || platformStyles.Instagram
          const Icon = config.icon

          return (
            <motion.div
              key={p}
              whileHover={{ scale: 1.18, zIndex: 30, y: -2 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              style={{ zIndex: 10 + index }}
              title={config.label}
              className={`relative flex ${currentSize.container} items-center justify-center rounded-full ${config.bg} ${config.color} border-2 border-surface shadow-md cursor-pointer transition-shadow`}
            >
              <Icon size={currentSize.icon} />
            </motion.div>
          )
        })}

        {showAdd && (
          <motion.div
            whileHover={{ scale: 1.15, zIndex: 30, y: -2 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            style={{ zIndex: 20 }}
            title="Connect more platforms"
            className={`relative flex ${currentSize.container} items-center justify-center rounded-full bg-white/10 hover:bg-burgundy text-white border-2 border-surface shadow-md cursor-pointer transition-colors ${currentSize.text} font-bold`}
          >
            +
          </motion.div>
        )}
      </div>

      {showLabel && (
        <span className="ml-3 text-[11px] font-semibold text-muted flex items-center gap-1.5">
          <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Verified Channels
        </span>
      )}
    </div>
  )
}

export default SocialOverlapStack
