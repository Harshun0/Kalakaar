import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  CheckCircle2,
  MapPin,
  TrendingUp,
  Send,
  ShieldCheck,
  Share2,
  Radio,
  Sliders,
  DollarSign,
  Briefcase,
  Play,
} from 'lucide-react'
import { Button } from './Button'
import { SocialOverlapStack } from './SocialOverlapStack'
import { InstagramIcon, YoutubeIcon } from './icons'

export function CreatorProfileModal({ creator, isOpen, onClose, onInquire }) {
  const [activeTab, setActiveTab] = useState('services') // 'services' | 'portfolio' | 'payout'
  const [isAcceptingCollabs, setIsAcceptingCollabs] = useState(true)
  const [payoutOption, setPayoutOption] = useState('creator') // 'creator' | 'manager' | 'split'
  const [splitPercent, setSplitPercent] = useState(80) // 80% to creator, 20% to manager
  const [copiedLink, setCopiedLink] = useState(false)

  if (!isOpen || !creator) return null

  const handleShare = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(window.location.href)
      setCopiedLink(true)
      setTimeout(() => setCopiedLink(false), 2000)
    }
  }

  const deliverableRates = [
    {
      title: '1x Dedicated 9:16 Reel / Short',
      description: 'Scripting, filming, dynamic captions & brand product placement',
      price: creator.price,
      turnaround: '4-6 Days',
      badge: 'Most Popular',
    },
    {
      title: '2x Story Slides with Swipe-up Link',
      description: 'Authentic 24h story sequence with direct CTA link sticker and UTM tracking',
      price: Math.round(creator.price * 0.45),
      turnaround: '24-48 Hours',
    },
    {
      title: '1x Integrated Video Feature (60-90s)',
      description: 'High-retention dedicated segment within a high-traffic long-form piece',
      price: Math.round(creator.price * 1.8),
      turnaround: '7-10 Days',
    },
  ]

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-2xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 25 }}
          transition={{ type: 'spring', damping: 26, stiffness: 280 }}
          className="relative z-10 w-full max-w-3xl rounded-3xl border border-white/10 bg-surface/98 shadow-2xl shadow-burgundy/30 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        >
          {/* Header Banner */}
          <div className="relative h-32 sm:h-44 w-full bg-gradient-to-r from-burgundy via-black to-burgundy-light/40 overflow-hidden shrink-0">
            {/* Ambient texture */}
            <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/70" />
            <div className="pointer-events-none absolute -top-10 -right-10 h-64 w-64 rounded-full bg-burgundy-light/30 blur-[90px]" />

            {/* Top Navigation in Banner */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-2 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-xs text-white border border-white/10">
                <ShieldCheck size={14} className="text-burgundy-light" />
                <span className="font-medium">Verified Media Kit • 0% Middleman Cut</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-black/60 backdrop-blur-md text-white/80 hover:text-white border border-white/10 transition"
                  title="Share profile"
                >
                  <Share2 size={15} />
                </button>
                <button
                  onClick={onClose}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-burgundy border border-white/10 transition"
                  title="Close"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {copiedLink && (
              <div className="absolute bottom-2 right-4 rounded-lg bg-burgundy px-3 py-1 text-xs text-white shadow-lg">
                Profile link copied to clipboard!
              </div>
            )}
          </div>

          {/* Profile Overview Strip */}
          <div className="relative px-6 sm:px-8 pb-4 pt-0 border-b border-white/10 bg-surface shrink-0">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-12 sm:-mt-16">
              {/* Avatar + Main Info */}
              <div className="flex items-end gap-4">
                <div className="relative h-24 w-24 sm:h-28 sm:w-28 rounded-2xl overflow-hidden border-2 border-burgundy shadow-2xl shrink-0 bg-black">
                  <img
                    src={creator.image || creator.avatar}
                    alt={creator.name}
                    className="h-full w-full object-cover"
                  />
                  {creator.verified && (
                    <div className="absolute bottom-1 right-1 rounded-full bg-burgundy p-1 text-white shadow-md">
                      <CheckCircle2 size={14} />
                    </div>
                  )}
                </div>

                <div className="mb-1">
                  <div className="flex items-center gap-2">
                    <h2 className="font-display font-extrabold text-xl sm:text-2xl text-white">
                      {creator.name}
                    </h2>
                    <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-burgundy-light">
                      {creator.type}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted mt-1">
                    <span className="flex items-center gap-1 text-white/90 font-medium">
                      <MapPin size={12} className="text-burgundy-light" />
                      {creator.city}, {creator.state || 'India'}
                    </span>
                    <span>•</span>
                    <span className="text-muted">{creator.niche}</span>
                  </div>

                  {/* Circular Overlapping Social Profile Logos */}
                  <SocialOverlapStack size="sm" showLabel className="mt-2" />
                </div>
              </div>

              {/* Collab Status Toggle (Collebrity Feature) */}
              <div className="flex items-center gap-3">
                <div
                  onClick={() => setIsAcceptingCollabs(!isAcceptingCollabs)}
                  className={`flex cursor-pointer items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
                    isAcceptingCollabs
                      ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
                      : 'border-red-500/40 bg-red-500/10 text-red-400'
                  }`}
                >
                  <Radio size={12} className={isAcceptingCollabs ? 'animate-pulse' : ''} />
                  <span>{isAcceptingCollabs ? 'Accepting Collabs' : 'Fully Booked'}</span>
                </div>

                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    onClose()
                    onInquire?.(creator)
                  }}
                  className="shadow-lg shadow-burgundy/40"
                >
                  <span>Book Collab</span>
                  <Send size={13} />
                </Button>
              </div>
            </div>

            {/* Tagline / Bio Quote */}
            <div className="mt-4 rounded-xl border border-white/5 bg-white/[0.02] p-3 text-xs text-muted leading-relaxed">
              <span className="text-white/80 font-medium">About & Vibe: </span>
              {creator.tagline ||
                'Creating high-retention cinematic storytelling and viral social creative tailored for modern forward-thinking consumer brands.'}
            </div>

            {/* Platform Metrics Chips */}
            <div className="mt-3 flex flex-wrap gap-2.5">
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs">
                {creator.platform === 'YouTube' ? (
                  <YoutubeIcon size={14} className="text-burgundy-light" />
                ) : (
                  <InstagramIcon size={14} className="text-burgundy-light" />
                )}
                <span className="font-bold text-white">{creator.followers}</span>
                <span className="text-muted">Followers</span>
              </div>

              {creator.engagement && (
                <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs">
                  <TrendingUp size={14} className="text-emerald-400" />
                  <span className="font-bold text-white">{creator.engagement}</span>
                  <span className="text-muted">Avg. Engagement</span>
                </div>
              )}

              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs">
                <DollarSign size={14} className="text-burgundy-light" />
                <span className="text-muted">From</span>
                <span className="font-bold text-white">₹{creator.price.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Tabs Bar */}
            <div className="mt-4 flex gap-4 border-t border-white/10 pt-3">
              <button
                onClick={() => setActiveTab('services')}
                className={`flex items-center gap-1.5 pb-2 text-xs font-semibold transition border-b-2 ${
                  activeTab === 'services'
                    ? 'border-burgundy-light text-white'
                    : 'border-transparent text-muted hover:text-white'
                }`}
              >
                <Briefcase size={14} />
                <span>Deliverables & Rates</span>
              </button>

              <button
                onClick={() => setActiveTab('portfolio')}
                className={`flex items-center gap-1.5 pb-2 text-xs font-semibold transition border-b-2 ${
                  activeTab === 'portfolio'
                    ? 'border-burgundy-light text-white'
                    : 'border-transparent text-muted hover:text-white'
                }`}
              >
                <Play size={14} />
                <span>Portfolio Reels</span>
              </button>

              <button
                onClick={() => setActiveTab('payout')}
                className={`flex items-center gap-1.5 pb-2 text-xs font-semibold transition border-b-2 ${
                  activeTab === 'payout'
                    ? 'border-burgundy-light text-white'
                    : 'border-transparent text-muted hover:text-white'
                }`}
              >
                <Sliders size={14} />
                <span>Manager & Payout Split</span>
              </button>
            </div>
          </div>

          {/* Modal Tab Body (Scrollable) */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-4">
            {/* TAB 1: DELIVERABLES & RATES */}
            {activeTab === 'services' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-muted mb-2">
                  <span>Transparent starting rates (No surprise agency fee markups)</span>
                  <span className="text-burgundy-light font-medium">100% Direct Payout</span>
                </div>

                {deliverableRates.map((rate, i) => (
                  <div
                    key={i}
                    className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-burgundy-light/40 hover:bg-white/[0.05]"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-display font-bold text-sm text-white">{rate.title}</h4>
                        {rate.badge && (
                          <span className="rounded-full bg-burgundy/50 px-2 py-0.5 text-[10px] font-semibold text-white border border-burgundy-light/30">
                            {rate.badge}
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-xs text-muted">{rate.description}</p>
                      <span className="mt-2 inline-block text-[11px] font-medium text-white/50">
                        Avg. Turnaround: {rate.turnaround}
                      </span>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between shrink-0 border-t sm:border-t-0 border-white/5 pt-2 sm:pt-0">
                      <span className="text-base font-extrabold text-white">
                        ₹{rate.price.toLocaleString('en-IN')}
                      </span>
                      <button
                        onClick={() => {
                          onClose()
                          onInquire?.(creator)
                        }}
                        className="mt-1 text-xs font-semibold text-burgundy-light hover:underline"
                      >
                        Request This →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB 2: PORTFOLIO SHOWCASE */}
            {activeTab === 'portfolio' && (
              <div>
                <p className="text-xs text-muted mb-4">
                  Recent 9:16 reels and high-engagement commercial campaigns by {creator.name}.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className="group relative aspect-9/16 rounded-2xl overflow-hidden border border-white/10 bg-black"
                    >
                      <img
                        src={creator.image}
                        alt="Portfolio"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-burgundy/80 text-white shadow-lg backdrop-blur-md transition group-hover:scale-110">
                          <Play size={18} className="ml-0.5" />
                        </div>
                      </div>
                      <div className="absolute bottom-2 left-2 right-2 text-center text-[10px] font-semibold text-white/90">
                        {item === 1 ? 'Viral Reel • 1.2M Views' : item === 2 ? 'Brand UGC • 450K Views' : 'Product Review • 800K'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: TALENT MANAGER & PAYOUT SPLIT (Direct from Collebrity Screenshot 1) */}
            {activeTab === 'payout' && (
              <div className="space-y-4">
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                  <h4 className="font-display font-bold text-sm text-white mb-1">
                    Link Talent Manager & Automated Payout Splits
                  </h4>
                  <p className="text-xs text-muted mb-4">
                    As seen in our verified agency framework, creators can direct payments straight to their personal account or split automated shares with their certified talent agency.
                  </p>

                  <div className="grid gap-3 sm:grid-cols-3">
                    <button
                      onClick={() => setPayoutOption('creator')}
                      className={`p-3.5 rounded-xl border text-left transition ${
                        payoutOption === 'creator'
                          ? 'border-burgundy-light bg-burgundy/20'
                          : 'border-white/10 bg-white/5 hover:border-white/20'
                      }`}
                    >
                      <div className="font-bold text-xs text-white">100% to Artist</div>
                      <div className="text-[11px] text-muted mt-1">
                        All campaign revenue deposited directly to creator bank account.
                      </div>
                    </button>

                    <button
                      onClick={() => setPayoutOption('manager')}
                      className={`p-3.5 rounded-xl border text-left transition ${
                        payoutOption === 'manager'
                          ? 'border-burgundy-light bg-burgundy/20'
                          : 'border-white/10 bg-white/5 hover:border-white/20'
                      }`}
                    >
                      <div className="font-bold text-xs text-white">100% to Manager</div>
                      <div className="text-[11px] text-muted mt-1">
                        Talent agency receives full settlement on behalf of represented roster.
                      </div>
                    </button>

                    <button
                      onClick={() => setPayoutOption('split')}
                      className={`p-3.5 rounded-xl border text-left transition ${
                        payoutOption === 'split'
                          ? 'border-burgundy-light bg-burgundy/20'
                          : 'border-white/10 bg-white/5 hover:border-white/20'
                      }`}
                    >
                      <div className="font-bold text-xs text-white">Custom Split</div>
                      <div className="text-[11px] text-muted mt-1">
                        Automated smart-split e.g. {splitPercent}% Creator / {100 - splitPercent}% Manager.
                      </div>
                    </button>
                  </div>

                  {payoutOption === 'split' && (
                    <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4">
                      <div className="flex justify-between text-xs font-semibold text-white mb-2">
                        <span>Artist Share: {splitPercent}%</span>
                        <span>Manager Share: {100 - splitPercent}%</span>
                      </div>
                      <input
                        type="range"
                        min="50"
                        max="95"
                        step="5"
                        value={splitPercent}
                        onChange={(e) => setSplitPercent(Number(e.target.value))}
                        className="w-full accent-burgundy cursor-pointer"
                      />
                    </div>
                  )}

                  <div className="mt-4 flex flex-col sm:flex-row items-center gap-3">
                    <input
                      type="email"
                      placeholder="Enter verified manager email..."
                      className="w-full rounded-xl border border-white/10 bg-surface px-3.5 py-2.5 text-xs text-white placeholder-white/40 focus:border-burgundy-light focus:outline-none"
                    />
                    <Button variant="secondary" size="sm" className="w-full sm:w-auto shrink-0 text-xs">
                      Send Verification Email
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="border-t border-white/10 bg-surface/90 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2 text-xs text-muted">
              <ShieldCheck size={16} className="text-burgundy-light" />
              <span>Escrow protected deals • Direct WhatsApp & Email connect</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Button variant="ghost" size="sm" onClick={onClose} className="w-1/2 sm:w-auto text-xs">
                Close
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  onClose()
                  onInquire?.(creator)
                }}
                className="w-1/2 sm:w-auto text-xs shadow-lg shadow-burgundy/40"
              >
                <span>Direct Inquiry</span>
                <Send size={12} />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
