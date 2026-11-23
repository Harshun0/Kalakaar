import { cn } from '../lib/utils'

export function Button({ variant = 'primary', size = 'md', className, children, ...props }) {
  const base = 'inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-200 whitespace-nowrap select-none'

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  }

  const variants = {
    primary: 'bg-gradient-brand text-white hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_24px_rgba(109,0,26,0.25)]',
    ghost: 'bg-white/5 text-text border border-white/10 hover:bg-white/10',
    outline: 'bg-transparent text-text border border-white/15 hover:border-burgundy/50 hover:bg-white/5',
  }

  return (
    <button className={cn(base, sizes[size], variants[variant], className)} {...props}>
      {children}
    </button>
  )
}
