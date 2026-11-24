// Mock data for the Kalakaar landing page.
// Calibrated to match real Indian creator ecosystem & direct brand discovery.

export const niches = [
  'Fashion & Style',
  'Food & Culinary',
  'Tech & AI',
  'Fitness & Wellness',
  'Travel & Cinematic',
  'Standup & Comedy',
  'Hip-hop & Music',
  'Gaming & Esports',
  'Beauty & Skincare',
  'Finance & Career',
  'Lifestyle & Daily Vlogs',
  'Commercial Photography',
]

export const filterChips = ['All', 'Reels', 'YouTube', 'UGC', 'Photography', 'Podcast']

export const indianCities = [
  'All Cities',
  'Mumbai, MH',
  'Delhi NCR',
  'Bengaluru, KA',
  'Chennai, TN',
  'Hyderabad, TS',
  'Pune, MH',
  'Jaipur, RJ',
  'Kolkata, WB',
  'Ahmedabad, GJ',
  'Chandigarh, PB',
]

export const popularSearches = [
  { label: 'Tech creators in Chennai', query: 'Tech', city: 'Chennai, TN' },
  { label: 'Fashion creators in Mumbai', query: 'Fashion', city: 'Mumbai, MH' },
  { label: 'Food creators in Pune', query: 'Food', city: 'Pune, MH' },
  { label: 'Cinematographers in Delhi', query: 'Travel', city: 'Delhi NCR' },
  { label: 'Music artists in Bengaluru', query: 'Music', city: 'Bengaluru, KA' },
]

// Real curated creator profiles representing the 4 pillars:
// Camera (Photography/UGC), Pen (Storytelling), Mic (Podcast/Music), Film Strip (Reels/Video)
export const creators = [
  {
    id: 1,
    name: 'Ananya Rao',
    city: 'Mumbai',
    state: 'Maharashtra',
    niche: 'Fashion & Style',
    type: 'Reels',
    platform: 'Instagram',
    followers: '184K',
    engagement: '5.2%',
    price: 8000,
    initials: 'AR',
    verified: true,
    tagline: 'High-street & luxury editorial styling',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    tags: ['Luxury', 'Reels', 'Streetwear'],
  },
  {
    id: 2,
    name: 'Vikram Sehgal',
    city: 'Delhi',
    state: 'Delhi NCR',
    niche: 'Tech & AI',
    type: 'YouTube',
    platform: 'YouTube',
    followers: '320K',
    engagement: '7.8%',
    price: 15000,
    initials: 'VS',
    verified: true,
    tagline: 'Deep teardowns, AI workflows & flagship reviews',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    tags: ['Gadgets', 'Long-form', 'AI Tools'],
  },
  {
    id: 3,
    name: 'Priya Deshmukh',
    city: 'Pune',
    state: 'Maharashtra',
    niche: 'Food & Culinary',
    type: 'Reels',
    platform: 'Instagram',
    followers: '96K',
    engagement: '8.4%',
    price: 5000,
    initials: 'PD',
    verified: true,
    tagline: 'Authentic Maharashtrian & indie cafe tours',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    tags: ['Recipes', 'Cafe Reviews', 'ASMR'],
  },
  {
    id: 4,
    name: 'Rohan Kulkarni',
    city: 'Bengaluru',
    state: 'Karnataka',
    niche: 'Fitness & Wellness',
    type: 'UGC',
    platform: 'Instagram',
    followers: '58K',
    engagement: '6.1%',
    price: 4500,
    initials: 'RK',
    verified: true,
    tagline: 'Calisthenics athlete & clean supplement testing',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    tags: ['UGC Raw', 'Fitness', 'Home Workouts'],
  },
  {
    id: 5,
    name: 'Meher Kaur',
    city: 'Jaipur',
    state: 'Rajasthan',
    niche: 'Beauty & Skincare',
    type: 'Photography',
    platform: 'Instagram',
    followers: '142K',
    engagement: '4.9%',
    price: 9500,
    initials: 'MK',
    verified: true,
    tagline: 'Ayurvedic routines & bridal aesthetics',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    tags: ['Skincare', 'Clean Beauty', 'High-res'],
  },
  {
    id: 6,
    name: 'Aditya Nair',
    city: 'Chennai',
    state: 'Tamil Nadu',
    niche: 'Tech & Gaming',
    type: 'YouTube',
    platform: 'YouTube',
    followers: '410K',
    engagement: '9.2%',
    price: 18000,
    initials: 'AN',
    verified: true,
    tagline: 'South India gaming rigs & benchmark breakdowns',
    image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=80',
    tags: ['Gaming', 'Tamil & English', 'Streaming'],
  },
  {
    id: 7,
    name: 'Sanya Kapoor',
    city: 'Mumbai',
    state: 'Maharashtra',
    niche: 'Travel & Cinematic',
    type: 'Reels',
    platform: 'Instagram',
    followers: '220K',
    engagement: '6.7%',
    price: 11000,
    initials: 'SK',
    verified: true,
    tagline: 'Cinematic 4K drone reels across the Himalayas',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80',
    tags: ['Cinematic', 'Drone 4K', 'Hotels'],
  },
  {
    id: 8,
    name: 'Kabir Malhotra',
    city: 'Delhi',
    state: 'Delhi NCR',
    niche: 'Standup & Comedy',
    type: 'Podcast',
    platform: 'YouTube',
    followers: '88K',
    engagement: '11.3%',
    price: 7000,
    initials: 'KM',
    verified: true,
    tagline: 'Satirical culture podcast & comedy reels',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
    tags: ['Podcast', 'Hinglish', 'Comedy'],
  },
]

export const steps = {
  brands: [
    { number: '01', title: 'Filter by City & Budget', description: 'Search creators across Mumbai, Delhi, Bengaluru, Chennai with upfront pricing.', icon: 'Search' },
    { number: '02', title: 'Inspect Real Portfolio Reels', description: 'Review 9:16 vertical reels, follower metrics, and previous brand collaborations.', icon: 'Bookmark' },
    { number: '03', title: 'Send Direct Inquiry', description: 'Reach creators straight to their inbox with 0% agency markup or commission.', icon: 'Send' },
  ],
  creators: [
    { number: '01', title: 'Claim Your Media Kit', description: 'Build your custom profile with verified Instagram & YouTube metrics in 2 minutes.', icon: 'UserPlus' },
    { number: '02', title: 'Set Transparent Rates', description: 'List your starting prices for Reels, Stories, or Dedicated Videos on your terms.', icon: 'Tag' },
    { number: '03', title: 'Direct Brand Deals', description: 'Receive direct inquiries without paying any middleman fee.', icon: 'Inbox' },
  ],
}

export const whyCards = [
  {
    title: 'Zero Commission Marketplace',
    description: 'Brands pay creators directly. Kalakaar never takes a cut of your earnings or project fees.',
    icon: 'MessageCircle',
    size: 'lg',
    stat: '0% fee',
  },
  {
    title: 'Transparent Upfront Pricing',
    description: 'Every creator states their starting rate. No endless DMs asking "budget kitna hai?".',
    icon: 'Tag',
    size: 'sm',
    stat: 'from ₹4,500',
  },
  {
    title: 'Hyperlocal Indian Reach',
    description: 'Filter creators by city, state, and native language across 25+ cities in India.',
    icon: 'MapPin',
    size: 'sm',
    stat: '25+ Cities',
  },
  {
    title: 'The 4 Artistic Pillars',
    description: 'Dedicated homes for Photography (Camera), Storytelling (Pen), Audio/Podcasts (Mic), and Video (Film).',
    icon: 'SlidersHorizontal',
    size: 'lg',
    stat: '4 Pillars',
  },
]

export const stats = [
  { label: 'Active Creators', value: 500, suffix: '+' },
  { label: 'Indian Cities', value: 25, suffix: '+' },
  { label: 'Niches & Verticals', value: 20, suffix: '+' },
  { label: 'Platform Fee to Connect', value: 0, prefix: '₹' },
]

export const testimonials = [
  {
    name: 'Ritika Shah',
    role: 'Brand Manager, D2C Skincare',
    quote: 'Found three exceptional beauty creators in Mumbai & Pune within a day. No agency back-and-forth, just direct transparent negotiations.',
    avatarInitials: 'RS',
  },
  {
    name: 'Devansh Oza',
    role: 'Reels Creator, Pune (140K)',
    quote: 'My Kalakaar media kit closes deals automatically. Brands message me knowing my exact starting rate for a reel. No more lowball agency DMs.',
    avatarInitials: 'DO',
  },
  {
    name: 'Naina Bhatt',
    role: 'Growth Lead, Travel Tech',
    quote: 'The city & language filters saved our team 20+ hours. Shortlisted creators across Himachal & Uttarakhand in minutes.',
    avatarInitials: 'NB',
  },
]

export const faqs = [
  {
    question: 'How is Kalakaar different from traditional influencer agencies or Collebrity?',
    answer: 'Traditional agencies take 20-30% cuts and hide creator pricing. Platforms like Collebrity use sterile generic dashboards. Kalakaar provides an Awwwards-grade cinematic stage with 100% direct brand-to-creator communication, transparent upfront rates, and zero commission.',
  },
  {
    question: 'How do inquiries and communications work?',
    answer: 'When a brand submits an inquiry on a creator’s profile, the details, deliverables, and budget are routed directly to the creator’s verified WhatsApp/Email. Kalakaar never hides contact info behind agency paywalls.',
  },
  {
    question: 'How are creator profiles and follower stats verified?',
    answer: 'Every creator profile is cross-verified with official platform handles (Instagram, YouTube) checking authentic engagement rates, audience quality, and real portfolio history.',
  },
  {
    question: 'Can Talent Managers and Agencies register their roster?',
    answer: 'Yes! Kalakaar offers a dedicated Talent Manager Hub where agencies can represent multiple creators, organize media kits, and configure custom payout splits.',
  },
  {
    question: 'Is it completely free for creators to join?',
    answer: 'Yes, 100% free. Creators set their own rates, keep 100% of brand payouts, and never pay a listing fee.',
  },
]
