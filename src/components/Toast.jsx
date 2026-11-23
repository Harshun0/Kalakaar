import { useEffect } from 'react'
import { CheckCircle2 } from 'lucide-react'

export function Toast({ message, onDismiss }) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 3500)
    return () => clearTimeout(t)
  }, [onDismiss])

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[110] flex items-center gap-3 bg-surface border border-white/10 rounded-full px-5 py-3.5 shadow-2xl animate-fade-up">
      <CheckCircle2 size={18} className="text-burgundy-light shrink-0" />
      <span className="text-sm font-medium text-text">{message}</span>
    </div>
  )
}
