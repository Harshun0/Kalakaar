import { Quote } from 'lucide-react'

export function TestimonialCard({ testimonial }) {
  return (
    <div className="bg-surface/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-7 flex flex-col gap-5">
      <Quote size={24} className="text-burgundy-light/60" />
      <p className="text-text text-sm md:text-base leading-relaxed">"{testimonial.quote}"</p>
      <div className="flex items-center gap-3 mt-auto pt-2">
        <div className="w-10 h-10 rounded-full bg-gradient-brand flex items-center justify-center font-display font-bold text-sm text-white shrink-0">
          {testimonial.avatarInitials}
        </div>
        <div>
          <p className="font-semibold text-sm">{testimonial.name}</p>
          <p className="text-xs text-muted">{testimonial.role}</p>
        </div>
      </div>
    </div>
  )
}
