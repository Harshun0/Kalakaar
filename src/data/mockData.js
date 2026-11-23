// Mock data for the Kalakaar landing page.
// Swap this file for real API calls when the backend is ready — component props are shaped to match.

export const niches = [
  'Fashion', 'Food', 'Tech', 'Fitness', 'Travel', 'Comedy',
  'Hip-hop', 'Gaming', 'Beauty', 'Education', 'Lifestyle', 'Photography',
]

export const filterChips = ['All', 'Reels', 'YouTube', 'UGC', 'Photography', 'Podcast']

// Flat fills in the Black / Burgundy / White palette — no gradients, so placeholder
// avatars read as deliberate brand marks rather than generic AI-gradient blobs.
const avatarFills = ['#141414', '#6D001A', '#1A1A1A', '#6D001A']

function avatarDataUri(initials, bg) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
    <rect width="200" height="200" fill="${bg}"/>
    <rect width="200" height="200" fill="none" stroke="#FFFFFF" stroke-opacity="0.08" stroke-width="2"/>
    <text x="100" y="118" font-family="Inter, sans-serif" font-size="68" font-weight="700" fill="#FFFFFF" text-anchor="middle">${initials}</text>
  </svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

export const creators = [
  { id: 1, name: 'Ananya Rao', city: 'Mumbai', niche: 'Fashion', type: 'Reels', platform: 'Instagram', followers: '184K', price: 8000, initials: 'AR' },
  { id: 2, name: 'Vikram Sehgal', city: 'Delhi', niche: 'Tech', type: 'YouTube', platform: 'YouTube', followers: '320K', price: 15000, initials: 'VS' },
  { id: 3, name: 'Priya Deshmukh', city: 'Pune', niche: 'Food', type: 'Reels', platform: 'Instagram', followers: '96K', price: 5000, initials: 'PD' },
  { id: 4, name: 'Rohan Kulkarni', city: 'Nagpur', niche: 'Fitness', type: 'UGC', platform: 'Instagram', followers: '58K', price: 4000, initials: 'RK' },
  { id: 5, name: 'Meher Kaur', city: 'Jaipur', niche: 'Beauty', type: 'Photography', platform: 'Instagram', followers: '142K', price: 9500, initials: 'MK' },
  { id: 6, name: 'Aditya Nair', city: 'Bengaluru', niche: 'Gaming', type: 'YouTube', platform: 'YouTube', followers: '410K', price: 18000, initials: 'AN' },
  { id: 7, name: 'Sanya Kapoor', city: 'Mumbai', niche: 'Travel', type: 'Reels', platform: 'Instagram', followers: '220K', price: 11000, initials: 'SK' },
  { id: 8, name: 'Kabir Malhotra', city: 'Delhi', niche: 'Comedy', type: 'Podcast', platform: 'YouTube', followers: '88K', price: 7000, initials: 'KM' },
].map((c, i) => ({ ...c, avatar: avatarDataUri(c.initials, avatarFills[i % avatarFills.length]) }))

export const steps = {
  brands: [
    { number: '01', title: 'Search', description: 'Filter by niche, city and budget to find your fit.', icon: 'Search' },
    { number: '02', title: 'Shortlist', description: 'Save creators you like and compare profiles side by side.', icon: 'Bookmark' },
    { number: '03', title: 'Send inquiry', description: 'Reach out directly — no agency, no middlemen.', icon: 'Send' },
  ],
  creators: [
    { number: '01', title: 'Create profile', description: 'Showcase your work, niche and platforms in minutes.', icon: 'UserPlus' },
    { number: '02', title: 'Set your prices', description: 'List transparent pricing so brands know what to expect.', icon: 'Tag' },
    { number: '03', title: 'Receive inquiries', description: 'Brands come to you, direct in your inbox.', icon: 'Inbox' },
  ],
}

export const whyCards = [
  { title: 'Direct contact, zero commission on inquiries', description: 'Talk to brands and creators directly — Kalakaar never takes a cut.', icon: 'MessageCircle', size: 'lg' },
  { title: 'Transparent pricing', description: 'Every creator lists their starting price upfront.', icon: 'Tag', size: 'sm' },
  { title: 'Filter by niche, city, budget', description: 'Find exactly who you need in seconds.', icon: 'SlidersHorizontal', size: 'sm' },
  { title: 'Made for Indian creators and audiences', description: 'Built around how brands and creators actually work in India.', icon: 'MapPin', size: 'lg' },
]

export const stats = [
  { label: 'Creators', value: 500, suffix: '+' },
  { label: 'Cities', value: 25, suffix: '+' },
  { label: 'Niches', value: 20, suffix: '+' },
  { label: 'To join', value: 0, prefix: '₹' },
]

export const testimonials = [
  { name: 'Ritika Shah', role: 'Brand Manager, D2C skincare', quote: 'Found three perfect creators in a day. No back-and-forth with agencies, just direct conversations.', avatarInitials: 'RS' },
  { name: 'Devansh Oza', role: 'Reels creator, Pune', quote: 'My profile does the selling for me now. Brands message me knowing exactly what I charge.', avatarInitials: 'DO' },
  { name: 'Naina Bhatt', role: 'Marketing lead, travel startup', quote: 'The filters saved us hours. Niche, city, budget — exactly what we needed to shortlist fast.', avatarInitials: 'NB' },
]

export const faqs = [
  { question: 'Is Kalakaar free to use?', answer: 'Yes — it’s free for creators to list a profile, and free for brands to browse and send inquiries.' },
  { question: 'How do inquiries work?', answer: 'When a brand contacts a creator, we send the creator the brand’s details and message directly. No public email, no spam.' },
  { question: 'How are creators verified?', answer: 'We review profiles manually for authenticity — follower counts, platform links and sample work before they go live.' },
  { question: 'Is my email public?', answer: 'Never. Brands reach you through our inquiry form; your contact details stay private.' },
  { question: 'How do payments work?', answer: 'Payments happen directly between brand and creator for now — Kalakaar doesn’t process payments at this stage.' },
]
