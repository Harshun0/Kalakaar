import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  MessageSquare,
  Briefcase,
  Sliders,
  DollarSign,
  ArrowLeft,
  CheckCircle2,
  TrendingUp,
  Share2,
  Plus,
  Trash2,
  Eye,
  ShieldCheck,
  Radio,
  Sparkles,
  MapPin,
  Clock,
  Phone,
  Mail,
  UploadCloud,
} from 'lucide-react'
import { Logo3D } from './Logo3D'
import { Button } from './Button'
import { SocialOverlapStack } from './SocialOverlapStack'
import { InstagramIcon, YoutubeIcon } from './icons'

export function Dashboard({ onBackToHome, initialRole = 'creator' }) {
  const [activeRole, setActiveRole] = useState(initialRole) // 'creator' | 'brand' | 'manager'
  const [activeTab, setActiveTab] = useState('overview') // 'overview' | 'inquiries' | 'profile' | 'platforms' | 'payouts'
  const [isAcceptingCollabs, setIsAcceptingCollabs] = useState(true)
  const [copiedLink, setCopiedLink] = useState(false)

  // Creator Profile State (Editable)
  const [profile, setProfile] = useState({
    name: 'Ananya Rao',
    handle: '@ananyarao.style',
    city: 'Mumbai, Maharashtra',
    category: 'Fashion & Luxury Lifestyle',
    bio: 'High-street styling, luxury brand integrations, and viral 9:16 reel campaigns with authentic aesthetic storytelling.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    collabStatus: true,
  })

  // Deliverables & Rate Card
  const [services, setServices] = useState([
    { id: 1, name: '1x Dedicated Instagram Reel (9:16)', price: 25000, turnaround: '4-5 Days', active: true },
    { id: 2, name: '2x 24h Story Slides with Link Sticker', price: 9000, turnaround: '24-48 Hours', active: true },
    { id: 3, name: '1x UGC Video Creation for Brand Ads', price: 18000, turnaround: '3-4 Days', active: true },
    { id: 4, name: '1x YouTube Dedicated Integration (60s)', price: 45000, turnaround: '7-10 Days', active: false },
  ])

  // New Service inputs
  const [newServiceName, setNewServiceName] = useState('')
  const [newServicePrice, setNewServicePrice] = useState('')

  // Talent Manager & Payout Split State (Matching Collebrity Screenshot 1)
  const [payoutOption, setPayoutOption] = useState('creator') // 'creator' | 'manager' | 'custom'
  const [customSplitRate, setCustomSplitRate] = useState(75) // 75% artist / 25% manager
  const [managerEmail, setManagerEmail] = useState('roster@vibetalent.in')
  const [isEmailSent, setIsEmailSent] = useState(false)

  // Inquiries / Brand Deals CRM
  const [inquiries, _setInquiries] = useState([
    {
      id: 101,
      brand: 'Nykaa Beauty',
      contactPerson: 'Ria Kapoor',
      email: 'ria@nykaa.com',
      phone: '+91 98201 12345',
      deliverable: '1x Dedicated Reel (Hydra Glow Launch)',
      budget: '₹28,000',
      status: 'In Discussion',
      date: 'Today, 2:15 PM',
      badgeColor: 'border-amber-500/40 bg-amber-500/10 text-amber-400',
    },
    {
      id: 102,
      brand: 'boAt Lifestyle',
      contactPerson: 'Sameer Sen',
      email: 'collabs@boat-lifestyle.com',
      phone: '+91 98112 55432',
      deliverable: '2x Reel + Story Campaign',
      budget: '₹45,000',
      status: 'Escrow Secured',
      date: 'Yesterday',
      badgeColor: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
    },
    {
      id: 103,
      brand: 'Snitch Streetwear',
      contactPerson: 'Kabir V.',
      email: 'marketing@snitch.co.in',
      phone: '+91 99000 88776',
      deliverable: '1x Try-on Lookbook Reel',
      budget: '₹22,000',
      status: 'Completed & Paid',
      date: 'Nov 20, 2026',
      badgeColor: 'border-blue-500/40 bg-blue-500/10 text-blue-400',
    },
  ])

  const handleAddService = (e) => {
    e.preventDefault()
    if (!newServiceName || !newServicePrice) return
    const newService = {
      id: Date.now(),
      name: newServiceName,
      price: Number(newServicePrice),
      turnaround: '3-5 Days',
      active: true,
    }
    setServices([...services, newService])
    setNewServiceName('')
    setNewServicePrice('')
  }

  const handleDeleteService = (id) => {
    setServices(services.filter((s) => s.id !== id))
  }

  const handleShareProfile = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(window.location.origin)
      setCopiedLink(true)
      setTimeout(() => setCopiedLink(false), 2000)
    }
  }

  return (
    <div className="min-h-screen bg-bg text-text pt-24 pb-16 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto">
      {/* Top Header & Role Switcher */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToHome}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-muted hover:text-white hover:bg-white/10 transition cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span>Marketplace</span>
          </button>

          <div className="flex items-center gap-2.5">
            <Logo3D size="sm" />
            <div>
              <h1 className="font-display font-extrabold text-xl text-white tracking-tight flex items-center gap-2">
                Kalakaar Studio
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-burgundy/40 text-burgundy-light border border-burgundy-light/40">
                  Live
                </span>
              </h1>
              <p className="text-xs text-muted">0% Commission Creator Hub</p>
            </div>
          </div>
        </div>

        {/* Persona Role Switcher */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end">
          <div className="flex items-center gap-1 rounded-2xl border border-white/10 bg-white/5 p-1 text-xs">
            <button
              onClick={() => setActiveRole('creator')}
              className={`px-3 py-1.5 rounded-xl font-bold transition cursor-pointer ${
                activeRole === 'creator'
                  ? 'bg-burgundy text-white shadow-md shadow-burgundy/40'
                  : 'text-muted hover:text-white'
              }`}
            >
              Creator Studio
            </button>
            <button
              onClick={() => setActiveRole('brand')}
              className={`px-3 py-1.5 rounded-xl font-bold transition cursor-pointer ${
                activeRole === 'brand'
                  ? 'bg-burgundy text-white shadow-md shadow-burgundy/40'
                  : 'text-muted hover:text-white'
              }`}
            >
              Brand Portal
            </button>
            <button
              onClick={() => setActiveRole('manager')}
              className={`px-3 py-1.5 rounded-xl font-bold transition cursor-pointer ${
                activeRole === 'manager'
                  ? 'bg-burgundy text-white shadow-md shadow-burgundy/40'
                  : 'text-muted hover:text-white'
              }`}
            >
              Talent Manager
            </button>
          </div>

          <button
            onClick={handleShareProfile}
            className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-semibold text-white hover:bg-white/10 transition cursor-pointer shrink-0"
          >
            <Share2 size={13} />
            <span className="hidden sm:inline">Share Media Kit</span>
          </button>
        </div>
      </div>

      {copiedLink && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="my-3 rounded-xl bg-burgundy px-4 py-2 text-xs text-white font-medium text-center shadow-lg"
        >
          Public Media Kit link copied to clipboard!
        </motion.div>
      )}

      {/* Profile Completion Warning Banner (Matching Collebrity Screenshot 1) */}
      <div className="mt-5 rounded-2xl border border-burgundy/30 bg-burgundy/10 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-burgundy/30 text-burgundy-light shrink-0">
            <Sparkles size={18} />
          </div>
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-2">
              <span>80% of your media kit is complete</span>
              <span className="text-[10px] text-muted font-normal">• Step 4 of 5 (Verification Active)</span>
            </div>
            <div className="w-48 sm:w-64 bg-white/10 h-1.5 rounded-full mt-1.5 overflow-hidden">
              <div className="bg-gradient-brand h-full w-[80%] rounded-full" />
            </div>
          </div>
        </div>

        {/* Collab Status Toggle */}
        <div
          onClick={() => setIsAcceptingCollabs(!isAcceptingCollabs)}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold cursor-pointer transition select-none ${
            isAcceptingCollabs
              ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
              : 'border-red-500/40 bg-red-500/10 text-red-400'
          }`}
        >
          <Radio size={12} className={isAcceptingCollabs ? 'animate-pulse' : ''} />
          <span>{isAcceptingCollabs ? 'Collab Status: Accepting Deals' : 'Collab Status: Fully Booked'}</span>
        </div>
      </div>

      {/* Main Grid: Sidebar Tabs + Content Area */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6">
        {/* Navigation Sidebar */}
        <div className="flex lg:flex-col gap-1.5 overflow-x-auto scrollbar-none pb-2 lg:pb-0">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl text-xs font-bold transition w-full text-left cursor-pointer whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-white/10 text-white border border-white/15 shadow-md'
                : 'text-muted hover:text-white hover:bg-white/5'
            }`}
          >
            <LayoutDashboard size={16} className={activeTab === 'overview' ? 'text-burgundy-light' : ''} />
            <span>Overview & Stats</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`flex items-center justify-between gap-2.5 px-4 py-3 rounded-2xl text-xs font-bold transition w-full text-left cursor-pointer whitespace-nowrap ${
              activeTab === 'inquiries'
                ? 'bg-white/10 text-white border border-white/15 shadow-md'
                : 'text-muted hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <MessageSquare size={16} className={activeTab === 'inquiries' ? 'text-burgundy-light' : ''} />
              <span>Inbound Deals</span>
            </div>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-burgundy text-[10px] text-white font-black">
              {inquiries.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl text-xs font-bold transition w-full text-left cursor-pointer whitespace-nowrap ${
              activeTab === 'profile'
                ? 'bg-white/10 text-white border border-white/15 shadow-md'
                : 'text-muted hover:text-white hover:bg-white/5'
            }`}
          >
            <Briefcase size={16} className={activeTab === 'profile' ? 'text-burgundy-light' : ''} />
            <span>Rates & Services</span>
          </button>

          <button
            onClick={() => setActiveTab('platforms')}
            className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl text-xs font-bold transition w-full text-left cursor-pointer whitespace-nowrap ${
              activeTab === 'platforms'
                ? 'bg-white/10 text-white border border-white/15 shadow-md'
                : 'text-muted hover:text-white hover:bg-white/5'
            }`}
          >
            <InstagramIcon size={16} className={activeTab === 'platforms' ? 'text-burgundy-light' : ''} />
            <span>Social Platforms</span>
          </button>

          <button
            onClick={() => setActiveTab('payouts')}
            className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl text-xs font-bold transition w-full text-left cursor-pointer whitespace-nowrap ${
              activeTab === 'payouts'
                ? 'bg-white/10 text-white border border-white/15 shadow-md'
                : 'text-muted hover:text-white hover:bg-white/5'
            }`}
          >
            <Sliders size={16} className={activeTab === 'payouts' ? 'text-burgundy-light' : ''} />
            <span>Manager & Payouts</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="space-y-6">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stat Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="rounded-2xl border border-white/10 bg-surface/80 p-4 backdrop-blur-md">
                  <div className="flex items-center justify-between text-muted text-xs mb-2">
                    <span>Profile Views</span>
                    <Eye size={15} className="text-burgundy-light" />
                  </div>
                  <div className="font-display font-extrabold text-2xl text-white">4,820</div>
                  <div className="text-[11px] text-emerald-400 font-medium flex items-center gap-1 mt-1">
                    <TrendingUp size={12} />
                    +24% this week
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-surface/80 p-4 backdrop-blur-md">
                  <div className="flex items-center justify-between text-muted text-xs mb-2">
                    <span>Active Inquiries</span>
                    <MessageSquare size={15} className="text-burgundy-light" />
                  </div>
                  <div className="font-display font-extrabold text-2xl text-white">3 Deals</div>
                  <div className="text-[11px] text-muted mt-1">₹95,000 in pipeline</div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-surface/80 p-4 backdrop-blur-md">
                  <div className="flex items-center justify-between text-muted text-xs mb-2">
                    <span>Total Payouts</span>
                    <DollarSign size={15} className="text-burgundy-light" />
                  </div>
                  <div className="font-display font-extrabold text-2xl text-white">₹1,42,000</div>
                  <div className="text-[11px] text-emerald-400 font-medium flex items-center gap-1 mt-1">
                    <ShieldCheck size={12} />
                    100% direct kept
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-surface/80 p-4 backdrop-blur-md">
                  <div className="flex items-center justify-between text-muted text-xs mb-2">
                    <span>Saved Commission</span>
                    <Sparkles size={15} className="text-burgundy-light" />
                  </div>
                  <div className="font-display font-extrabold text-2xl text-gradient">₹28,400</div>
                  <div className="text-[11px] text-muted mt-1">0% middleman cut</div>
                </div>
              </div>

              {/* Quick Profile Summary Card */}
              <div className="rounded-3xl border border-white/10 bg-surface/60 p-6 backdrop-blur-xl">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="relative h-16 w-16 rounded-2xl overflow-hidden border-2 border-burgundy shadow-xl shrink-0">
                      <img src={profile.avatar} alt={profile.name} className="h-full w-full object-cover" />
                      <div className="absolute bottom-0 right-0 rounded-full bg-burgundy p-0.5 text-white">
                        <CheckCircle2 size={12} />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-display font-extrabold text-lg text-white">{profile.name}</h3>
                        <span className="text-xs text-muted font-medium">{profile.handle}</span>
                      </div>
                      <p className="text-xs text-muted flex items-center gap-1.5 mt-0.5">
                        <MapPin size={12} className="text-burgundy-light" />
                        {profile.city} • {profile.category}
                      </p>

                      {/* Circular Overlapping Social Profiles Badges */}
                      <SocialOverlapStack size="sm" showLabel className="mt-2" />
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveTab('profile')}
                    className="border-white/15 text-xs"
                  >
                    Edit Media Kit
                  </Button>
                </div>

                <div className="mt-4 pt-4 border-t border-white/5 text-xs text-muted leading-relaxed">
                  {profile.bio}
                </div>
              </div>

              {/* Recent Inquiries Snippet */}
              <div className="rounded-3xl border border-white/10 bg-surface/60 p-6 backdrop-blur-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-bold text-sm text-white">Latest Brand Opportunities</h3>
                  <button
                    onClick={() => setActiveTab('inquiries')}
                    className="text-xs text-burgundy-light hover:underline font-semibold cursor-pointer"
                  >
                    View All Deals →
                  </button>
                </div>

                <div className="space-y-3">
                  {inquiries.slice(0, 2).map((inq) => (
                    <div
                      key={inq.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl border border-white/5 bg-white/[0.02]"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-white">{inq.brand}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${inq.badgeColor}`}>
                            {inq.status}
                          </span>
                        </div>
                        <p className="text-xs text-muted mt-0.5">{inq.deliverable}</p>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-3">
                        <span className="font-extrabold text-sm text-white">{inq.budget}</span>
                        <a
                          href={`https://wa.me/?text=Hi%20${inq.contactPerson},%20regarding%20the%20${inq.deliverable}%20campaign`}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 rounded-xl bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 px-3 py-1.5 text-xs font-semibold hover:bg-emerald-600/50 transition cursor-pointer"
                        >
                          <Phone size={12} />
                          WhatsApp
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: INQUIRIES & DEALS CRM */}
          {activeTab === 'inquiries' && (
            <div className="rounded-3xl border border-white/10 bg-surface/70 p-6 backdrop-blur-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
                <div>
                  <h3 className="font-display font-bold text-base text-white">Direct Brand Inquiries</h3>
                  <p className="text-xs text-muted mt-0.5">
                    Brands contact you directly with zero agency markup or platform commission.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted">
                  <ShieldCheck size={14} className="text-burgundy-light" />
                  <span>Verified Inbound Only</span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                {inquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-burgundy-light/40 transition"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5">
                        <h4 className="font-display font-bold text-base text-white">{inq.brand}</h4>
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${inq.badgeColor}`}>
                          {inq.status}
                        </span>
                      </div>
                      <p className="text-xs font-medium text-white/90">{inq.deliverable}</p>
                      <div className="flex flex-wrap items-center gap-3 text-[11px] text-muted">
                        <span>Contact: {inq.contactPerson}</span>
                        <span>•</span>
                        <span>Email: {inq.email}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock size={11} /> {inq.date}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:flex-col md:items-end gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-white/5">
                      <div className="text-left md:text-right">
                        <span className="text-[10px] uppercase text-muted block">Budget Offered</span>
                        <span className="text-lg font-black text-white">{inq.budget}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <a
                          href={`mailto:${inq.email}?subject=Collaboration%20with%20${encodeURIComponent(profile.name)}`}
                          className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-muted hover:text-white hover:bg-white/10 transition"
                        >
                          <Mail size={12} />
                          Email
                        </a>
                        <a
                          href={`https://wa.me/?text=Hi%20${inq.contactPerson},%20regarding%20the%20${inq.deliverable}%20campaign`}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 rounded-xl bg-burgundy/80 hover:bg-burgundy text-white px-3.5 py-1.5 text-xs font-semibold shadow-md shadow-burgundy/40 transition"
                        >
                          <Phone size={12} />
                          WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: PROFILE & RATE CARD (Collebrity Screen 2 & 3 Standard) */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="rounded-3xl border border-white/10 bg-surface/70 p-6 backdrop-blur-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 border-b border-white/10 pb-4">
                  <div>
                    <h3 className="font-display font-bold text-base text-white">Edit Profile & Brand Identity</h3>
                    <p className="text-xs text-muted">Update your public presence, verified channels & bio.</p>
                  </div>
                  <SocialOverlapStack size="sm" showLabel />
                </div>

                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold text-muted mb-1.5">Full Artist / Creator Name</label>
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-xs text-white focus:border-burgundy-light focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-muted mb-1.5">Instagram / Public Handle</label>
                      <input
                        type="text"
                        value={profile.handle}
                        onChange={(e) => setProfile({ ...profile, handle: e.target.value })}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-xs text-white focus:border-burgundy-light focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold text-muted mb-1.5">City & State</label>
                      <input
                        type="text"
                        value={profile.city}
                        onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-xs text-white focus:border-burgundy-light focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-muted mb-1.5">Niche / Domain</label>
                      <input
                        type="text"
                        value={profile.category}
                        onChange={(e) => setProfile({ ...profile, category: e.target.value })}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-xs text-white focus:border-burgundy-light focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-muted mb-1.5">
                      Introduce yourself! (What vibes do you bring, what brands excite you?)
                    </label>
                    <textarea
                      rows={3}
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white focus:border-burgundy-light focus:outline-none resize-none leading-relaxed"
                    />
                  </div>
                </div>
              </div>

              {/* Rate Card & Services Builder */}
              <div className="rounded-3xl border border-white/10 bg-surface/70 p-6 backdrop-blur-xl">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-display font-bold text-base text-white">Deliverables & Rate Card</h3>
                    <p className="text-xs text-muted">
                      Set starting rates for each deliverable format. Transparent rates reduce DM negotiation by 80%.
                    </p>
                  </div>
                </div>

                {/* Existing Services List */}
                <div className="space-y-3 mb-5">
                  {services.map((srv) => (
                    <div
                      key={srv.id}
                      className="flex items-center justify-between p-3.5 rounded-2xl border border-white/10 bg-white/[0.02]"
                    >
                      <div>
                        <h4 className="font-bold text-xs text-white">{srv.name}</h4>
                        <span className="text-[10px] text-muted">Est. Turnaround: {srv.turnaround}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="font-extrabold text-sm text-white">
                          ₹{srv.price.toLocaleString('en-IN')}
                        </span>
                        <button
                          onClick={() => handleDeleteService(srv.id)}
                          className="text-muted hover:text-red-400 p-1.5 rounded-lg transition cursor-pointer"
                          title="Delete service"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add New Service Form */}
                <form
                  onSubmit={handleAddService}
                  className="rounded-2xl border border-dashed border-white/15 bg-white/[0.01] p-4 flex flex-col sm:flex-row gap-3 items-center"
                >
                  <input
                    type="text"
                    placeholder="Deliverable e.g. 1x Podcast Sponsorship segment"
                    value={newServiceName}
                    onChange={(e) => setNewServiceName(e.target.value)}
                    className="w-full sm:flex-1 rounded-xl border border-white/10 bg-surface px-3 py-2 text-xs text-white focus:border-burgundy-light focus:outline-none"
                  />
                  <input
                    type="number"
                    placeholder="Rate in ₹"
                    value={newServicePrice}
                    onChange={(e) => setNewServicePrice(e.target.value)}
                    className="w-full sm:w-32 rounded-xl border border-white/10 bg-surface px-3 py-2 text-xs text-white focus:border-burgundy-light focus:outline-none"
                  />
                  <Button variant="primary" size="sm" type="submit" className="w-full sm:w-auto text-xs shrink-0">
                    <Plus size={14} />
                    <span>Add Service</span>
                  </Button>
                </form>
              </div>

              {/* Portfolio Drag & Drop Showcase */}
              <div className="rounded-3xl border border-white/10 bg-surface/70 p-6 backdrop-blur-xl">
                <h3 className="font-display font-bold text-base text-white mb-1">Portfolio & Campaign Videos</h3>
                <p className="text-xs text-muted mb-4">
                  Drag and drop recent 9:16 reels or campaign case studies to display on your public rate card.
                </p>

                <div className="rounded-2xl border-2 border-dashed border-white/15 bg-white/[0.01] p-8 text-center hover:border-burgundy-light/60 transition cursor-pointer">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-burgundy/20 text-burgundy-light mb-3">
                    <UploadCloud size={24} />
                  </div>
                  <p className="text-xs font-semibold text-white">Click or drag & drop video files here</p>
                  <p className="text-[11px] text-muted mt-1">Supports MP4, MOV up to 100MB (9:16 vertical preferred)</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SOCIAL PLATFORMS (Instagram & YouTube API Connect) */}
          {activeTab === 'platforms' && (
            <div className="rounded-3xl border border-white/10 bg-surface/70 p-6 backdrop-blur-xl space-y-5">
              <div>
                <h3 className="font-display font-bold text-base text-white">Connected Platforms</h3>
                <p className="text-xs text-muted mt-0.5">
                  Kalakaar connects securely using official Meta and Google APIs to verify follower counts and engagement metrics.
                </p>
              </div>

              {/* Instagram Card */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white shadow-lg shrink-0">
                    <InstagramIcon size={24} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-display font-bold text-sm text-white">Instagram Account</h4>
                      <span className="rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5">
                        Connected & Verified
                      </span>
                    </div>
                    <p className="text-xs text-muted mt-0.5">184,000 Followers • 5.2% Avg. Engagement Rate</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-muted hover:text-white transition">
                    Sync Metrics
                  </button>
                  <button className="rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 px-3 py-1.5 text-xs transition">
                    Disconnect
                  </button>
                </div>
              </div>

              {/* YouTube Card */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-600 text-white shadow-lg shrink-0">
                    <YoutubeIcon size={24} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-display font-bold text-sm text-white">YouTube Channel</h4>
                      <span className="rounded-full bg-white/10 text-muted text-[10px] font-bold px-2 py-0.5">
                        Not Connected
                      </span>
                    </div>
                    <p className="text-xs text-muted mt-0.5">
                      Connect your channel to showcase video metrics, watch time, and subscriber demographics.
                    </p>
                  </div>
                </div>

                <Button variant="secondary" size="sm" className="text-xs shrink-0">
                  <span>Connect Channel</span>
                </Button>
              </div>
            </div>
          )}

          {/* TAB 5: TALENT MANAGER & PAYOUT SPLITS (Direct Collebrity Screen 1) */}
          {activeTab === 'payouts' && (
            <div className="rounded-3xl border border-white/10 bg-surface/70 p-6 backdrop-blur-xl space-y-6">
              <div>
                <h3 className="font-display font-bold text-base text-white">Link Talent Manager & Payout Split</h3>
                <p className="text-xs text-muted mt-0.5">
                  Configure who receives payments from brand collaborations. Kalakaar automates escrow splits with zero delay.
                </p>
              </div>

              {/* Payout Split Cards */}
              <div className="grid gap-4 sm:grid-cols-3">
                <button
                  type="button"
                  onClick={() => setPayoutOption('creator')}
                  className={`p-4 rounded-2xl border text-left transition cursor-pointer ${
                    payoutOption === 'creator'
                      ? 'border-burgundy-light bg-burgundy/20 shadow-lg shadow-burgundy/20'
                      : 'border-white/10 bg-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="font-bold text-sm text-white">100% to Celebrity / Artist</div>
                  <p className="text-xs text-muted mt-1 leading-relaxed">
                    All earnings will be sent directly to your registered bank account.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setPayoutOption('manager')}
                  className={`p-4 rounded-2xl border text-left transition cursor-pointer ${
                    payoutOption === 'manager'
                      ? 'border-burgundy-light bg-burgundy/20 shadow-lg shadow-burgundy/20'
                      : 'border-white/10 bg-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="font-bold text-sm text-white">100% to Manager</div>
                  <p className="text-xs text-muted mt-1 leading-relaxed">
                    Your certified manager will receive all earnings on your behalf.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setPayoutOption('split')}
                  className={`p-4 rounded-2xl border text-left transition cursor-pointer ${
                    payoutOption === 'split'
                      ? 'border-burgundy-light bg-burgundy/20 shadow-lg shadow-burgundy/20'
                      : 'border-white/10 bg-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="font-bold text-sm text-white">Custom Split</div>
                  <p className="text-xs text-muted mt-1 leading-relaxed">
                    Set a percentage to split earnings between you and your manager (e.g. 70/30).
                  </p>
                </button>
              </div>

              {/* Slider for Custom Split */}
              {payoutOption === 'split' && (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 space-y-3">
                  <div className="flex justify-between text-xs font-bold text-white">
                    <span>Artist Share: {customSplitRate}%</span>
                    <span>Manager Share: {100 - customSplitRate}%</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="90"
                    step="5"
                    value={customSplitRate}
                    onChange={(e) => setCustomSplitRate(Number(e.target.value))}
                    className="w-full accent-burgundy cursor-pointer h-2 bg-white/10 rounded-lg"
                  />
                  <div className="text-[11px] text-muted flex items-center justify-between">
                    <span>50% Minimum</span>
                    <span>90% Maximum</span>
                  </div>
                </div>
              )}

              {/* Link Talent Manager Email Form */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
                <label className="block text-xs font-semibold text-white">
                  Link Talent Manager Email *
                </label>
                <div className="flex flex-col sm:flex-row gap-3 items-center">
                  <input
                    type="email"
                    value={managerEmail}
                    onChange={(e) => setManagerEmail(e.target.value)}
                    placeholder="Enter manager or agency email..."
                    className="w-full rounded-xl border border-white/10 bg-surface px-4 py-2.5 text-xs text-white focus:border-burgundy-light focus:outline-none"
                  />
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      setIsEmailSent(true)
                      setTimeout(() => setIsEmailSent(false), 3000)
                    }}
                    className="w-full sm:w-auto shrink-0 text-xs shadow-md shadow-burgundy/40"
                  >
                    Send Verification Email
                  </Button>
                </div>

                {isEmailSent && (
                  <p className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5 pt-1">
                    <CheckCircle2 size={14} /> Verification invitation sent to {managerEmail}!
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
