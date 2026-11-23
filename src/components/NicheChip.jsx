import { cn } from '../lib/utils'

export function NicheChip({ label, active, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'px-4 py-2 rounded-full text-sm font-medium border whitespace-nowrap transition-colors',
        active
          ? 'bg-gradient-brand text-white border-transparent'
          : 'bg-white/5 text-muted border-white/10 hover:text-text hover:border-white/20',
        className
      )}
    >
      {label}
    </button>
  )
}
