import { useState } from 'react'
import { X } from 'lucide-react'
import { Button } from './Button'

const budgetRanges = ['Under ₹5,000', '₹5,000 – ₹15,000', '₹15,000 – ₹30,000', '₹30,000+']

export function InquiryModal({ creator, onClose, onSuccess }) {
  const [form, setForm] = useState({ name: '', brand: '', budget: budgetRanges[0], message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSuccess(creator)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-black/70 backdrop-blur-sm p-0 md:p-4"
      onClick={onClose}
    >
      <div
        className="w-full md:max-w-md bg-surface border border-white/10 rounded-t-3xl md:rounded-2xl p-6 md:p-8 relative animate-fade-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted hover:text-text p-1"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <h3 className="font-display font-bold text-2xl mb-1">
          Contact <span className="text-gradient">{creator.name}</span>
        </h3>
        <p className="text-muted text-sm mb-6">Send a direct inquiry — no public email, ever.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-medium text-muted mb-1.5 block">Your name</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-text focus:outline-none focus:border-burgundy/50"
              placeholder="Riya Mehta"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-muted mb-1.5 block">Brand name</label>
            <input
              required
              value={form.brand}
              onChange={(e) => setForm({ ...form, brand: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-text focus:outline-none focus:border-burgundy/50"
              placeholder="Your brand"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-muted mb-1.5 block">Budget range</label>
            <select
              value={form.budget}
              onChange={(e) => setForm({ ...form, budget: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-text focus:outline-none focus:border-burgundy/50"
            >
              {budgetRanges.map((b) => (
                <option key={b} value={b} className="bg-surface">{b}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-muted mb-1.5 block">Message</label>
            <textarea
              required
              rows={3}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-text focus:outline-none focus:border-burgundy/50 resize-none"
              placeholder="Tell us about the collab you have in mind..."
            />
          </div>

          <Button type="submit" variant="primary" size="lg" className="w-full mt-2">
            Send inquiry
          </Button>
        </form>
      </div>
    </div>
  )
}
