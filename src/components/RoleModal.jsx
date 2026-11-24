import { useState } from 'react'
import { motion } from 'framer-motion'
import { X, Sparkles, Briefcase, Users, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react'
import confetti from 'canvas-confetti'
import { Button } from './Button'

const roles = [
  {
    id: 'creator',
    title: 'Creator / Artist / Kalakaar',
    subtitle: 'Reels, YouTube, UGC, Podcasts, Music & Photography',
    badge: 'Zero Commission',
    icon: Sparkles,
    color: 'from-burgundy to-burgundy-light',
    features: [
      'Publish your verified rate card & starting prices upfront',
      'Showcase high-res 9:16 reels, video work, and portfolios',
      'Direct brand inquiries straight into your private dashboard',
      'Keep 100% of your earnings — no hidden agency cuts',
    ],
  },
  {
    id: 'brand',
    title: 'Brand / Business / Marketer',
    subtitle: 'Direct discovery and hiring across 25+ Indian cities',
    badge: 'Direct Connect',
    icon: Briefcase,
    color: 'from-white/10 to-burgundy/30',
    features: [
      'Search hyperlocal creators by city, niche, and starting budget',
      'Compare transparent pricing without waiting days for agency quotes',
      'Send direct inquiries without agency markups or middlemen',
      'Bookmark and manage creator shortlists with your team',
    ],
  },
  {
    id: 'manager',
    title: 'Talent Manager / Agency',
    subtitle: 'Manage rosters, brand deals, and payout splits',
    badge: 'Agency Pro',
    icon: Users,
    color: 'from-burgundy/40 to-black',
    features: [
      'Manage multiple creator portfolios from one unified hub',
      'Configure automated payout splits (100% creator, or custom e.g. 70/30)',
      'Track brand campaign requests and inbound deal flow',
      'Verified manager badge on represented creator profiles',
    ],
  },
]

export function RoleModal({ isOpen, onClose, onOpenDashboard }) {
  const [selectedRole, setSelectedRole] = useState(null)
  const [step, setStep] = useState(1) // 1: Select Role, 2: Quick Info Form, 3: Success
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: 'Mumbai',
    handle: '',
    payoutSplit: 'creator', // 'creator' | 'manager' | 'custom'
    customSplitRate: 70,
  })

  if (!isOpen) return null

  const handleSelectRole = (roleId) => {
    setSelectedRole(roleId)
    setStep(2)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStep(3)
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6D001A', '#D1294F', '#FFFFFF', '#FFB703'],
      })
    } catch {
      // fallback if canvas not ready
    }
  }

  const resetAndClose = () => {
    setStep(1)
    setSelectedRole(null)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={resetAndClose}
        className="absolute inset-0 bg-black/85 backdrop-blur-xl"
      />

      {/* Modal Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative z-10 w-full max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-surface/95 p-6 shadow-2xl shadow-burgundy/20 md:p-8"
      >
        {/* Ambient Top Glow */}
        <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full bg-burgundy/40 blur-[80px]" />

        {/* Close Button */}
        <button
          onClick={resetAndClose}
          className="absolute right-5 top-5 rounded-full p-2 text-muted transition hover:bg-white/10 hover:text-white"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Step Indicator */}
        <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-burgundy text-xs font-bold text-white">
              {step}
            </span>
            <span className="text-xs uppercase tracking-wider text-muted">
              {step === 1 && 'Step 1 of 2: Choose Role'}
              {step === 2 && 'Step 2 of 2: Your Details'}
              {step === 3 && 'Access Granted'}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted">
            <ShieldCheck size={14} className="text-burgundy-light" />
            <span>Zero Middleman Guarantee</span>
          </div>
        </div>

        {/* STEP 1: CHOOSE ROLE */}
        {step === 1 && (
          <div>
            <div className="mb-6 text-center">
              <h2 className="font-display text-2xl font-extrabold text-white md:text-3xl">
                How do you want to join <span className="text-gradient">कलाकार</span>?
              </h2>
              <p className="mt-1 text-sm text-muted">
                Select your persona to unlock direct access, transparent pricing, and seamless collaboration.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {roles.map((r) => {
                const IconComponent = r.icon
                return (
                  <button
                    key={r.id}
                    onClick={() => handleSelectRole(r.id)}
                    className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-burgundy-light/60 hover:bg-white/[0.06] hover:shadow-xl hover:shadow-burgundy/20"
                  >
                    <div>
                      <div className="mb-3 flex items-center justify-between">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-burgundy/30 text-burgundy-light transition group-hover:bg-burgundy group-hover:text-white">
                          <IconComponent size={20} />
                        </div>
                        <span className="rounded-full bg-white/5 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted group-hover:border group-hover:border-burgundy-light/40 group-hover:text-white">
                          {r.badge}
                        </span>
                      </div>
                      <h3 className="font-display text-base font-bold text-white group-hover:text-burgundy-light">
                        {r.title}
                      </h3>
                      <p className="mt-1 text-xs text-muted leading-relaxed">
                        {r.subtitle}
                      </p>
                    </div>

                    <div className="mt-5 border-t border-white/5 pt-3">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-white group-hover:text-burgundy-light">
                        Continue <ArrowRight size={13} className="transition group-hover:translate-x-1" />
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* STEP 2: PROFILE DETAILS FORM */}
        {step === 2 && (
          <div>
            <div className="mb-5">
              <button
                onClick={() => setStep(1)}
                className="text-xs text-muted hover:text-white mb-2"
              >
                ← Back to roles
              </button>
              <h2 className="font-display text-2xl font-extrabold text-white">
                Create your{' '}
                <span className="text-gradient">
                  {selectedRole === 'creator' && 'Creator Profile'}
                  {selectedRole === 'brand' && 'Brand Account'}
                  {selectedRole === 'manager' && 'Talent Manager Hub'}
                </span>
              </h2>
              <p className="text-xs text-muted mt-0.5">
                Takes less than 60 seconds. No credit card required.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid gap-3.5 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-muted">
                    {selectedRole === 'brand' ? 'Company / Brand Name' : 'Full Name'} *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder={selectedRole === 'brand' ? 'e.g. Nykaa, Zomato, Boat' : 'e.g. Aryan Sharma'}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:border-burgundy-light focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-muted">Work Email *</label>
                  <input
                    required
                    type="email"
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:border-burgundy-light focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid gap-3.5 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-muted">WhatsApp / Phone *</label>
                  <input
                    required
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:border-burgundy-light focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-muted">Primary City *</label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-surface px-3.5 py-2.5 text-sm text-white focus:border-burgundy-light focus:outline-none"
                  >
                    <option value="Mumbai">Mumbai, Maharashtra</option>
                    <option value="Delhi">Delhi NCR</option>
                    <option value="Bengaluru">Bengaluru, Karnataka</option>
                    <option value="Chennai">Chennai, Tamil Nadu</option>
                    <option value="Pune">Pune, Maharashtra</option>
                    <option value="Hyderabad">Hyderabad, Telangana</option>
                    <option value="Jaipur">Jaipur, Rajasthan</option>
                    <option value="Kolkata">Kolkata, West Bengal</option>
                    <option value="Ahmedabad">Ahmedabad, Gujarat</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-muted">
                  {selectedRole === 'creator'
                    ? 'Instagram Handle or YouTube Channel URL *'
                    : selectedRole === 'brand'
                    ? 'Website or Brand Instagram Handle *'
                    : 'Agency Name / Represented Creator Roster *'}
                </label>
                <input
                  required
                  type="text"
                  placeholder={selectedRole === 'creator' ? '@yourhandle or youtube.com/@channel' : 'https://...'}
                  value={formData.handle}
                  onChange={(e) => setFormData({ ...formData, handle: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:border-burgundy-light focus:outline-none"
                />
              </div>

              {(selectedRole === 'creator' || selectedRole === 'manager') && (
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-3.5 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-white">
                      Payout Split Preference (Collebrity Standard)
                    </label>
                    <span className="text-[10px] text-burgundy-light font-medium">Automated Split</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, payoutSplit: 'creator' })}
                      className={`rounded-xl border p-2.5 text-left transition ${
                        formData.payoutSplit === 'creator'
                          ? 'border-burgundy-light bg-burgundy/25 text-white'
                          : 'border-white/10 bg-white/5 text-muted hover:text-white'
                      }`}
                    >
                      <div className="text-xs font-bold">100% to Artist</div>
                      <div className="text-[10px] opacity-75 mt-0.5">Direct to account</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, payoutSplit: 'manager' })}
                      className={`rounded-xl border p-2.5 text-left transition ${
                        formData.payoutSplit === 'manager'
                          ? 'border-burgundy-light bg-burgundy/25 text-white'
                          : 'border-white/10 bg-white/5 text-muted hover:text-white'
                      }`}
                    >
                      <div className="text-xs font-bold">100% to Manager</div>
                      <div className="text-[10px] opacity-75 mt-0.5">Manager settles</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, payoutSplit: 'custom' })}
                      className={`rounded-xl border p-2.5 text-left transition ${
                        formData.payoutSplit === 'custom'
                          ? 'border-burgundy-light bg-burgundy/25 text-white'
                          : 'border-white/10 bg-white/5 text-muted hover:text-white'
                      }`}
                    >
                      <div className="text-xs font-bold">Custom Split</div>
                      <div className="text-[10px] opacity-75 mt-0.5">
                        {formData.customSplitRate}/{100 - formData.customSplitRate}
                      </div>
                    </button>
                  </div>

                  {formData.payoutSplit === 'custom' && (
                    <div className="pt-2">
                      <div className="flex justify-between text-[11px] text-muted mb-1">
                        <span>Artist: {formData.customSplitRate}%</span>
                        <span>Manager: {100 - formData.customSplitRate}%</span>
                      </div>
                      <input
                        type="range"
                        min="50"
                        max="90"
                        step="5"
                        value={formData.customSplitRate}
                        onChange={(e) =>
                          setFormData({ ...formData, customSplitRate: Number(e.target.value) })
                        }
                        className="w-full accent-burgundy cursor-pointer"
                      />
                    </div>
                  )}
                </div>
              )}

              <div className="pt-2">
                <Button variant="primary" type="submit" className="w-full justify-center py-3 text-sm">
                  Complete Registration & Unlock Dashboard
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 3: SUCCESS STATE */}
        {step === 3 && (
          <div className="py-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-burgundy/30 text-burgundy-light">
              <CheckCircle2 size={36} />
            </div>
            <h2 className="font-display text-2xl font-bold text-white md:text-3xl">
              Welcome to the कलाकार Circle!
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted">
              We received your registration for <strong className="text-white">{formData.name}</strong> ({formData.city}). Your media kit & onboarding link has been dispatched to{' '}
              <strong className="text-white">{formData.email}</strong>.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button
                variant="primary"
                onClick={() => {
                  const role = selectedRole || 'creator'
                  resetAndClose()
                  onOpenDashboard?.(role)
                }}
                className="px-6 shadow-lg shadow-burgundy/40"
              >
                Launch Personal Dashboard →
              </Button>
              <Button variant="outline" onClick={resetAndClose} className="px-6 border-white/20">
                Explore Marketplace
              </Button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}
