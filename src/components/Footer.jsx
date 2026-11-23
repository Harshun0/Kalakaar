import logo from '../assets/logo.png'
import { InstagramIcon, YoutubeIcon, LinkedinIcon, XIcon } from './icons'

const columns = [
  {
    title: 'Platform',
    links: ['Browse Creators', 'How it Works', 'For Brands', 'For Creators'],
  },
  {
    title: 'Company',
    links: ['About', 'Careers', 'Contact'],
  },
  {
    title: 'Legal',
    links: ['Privacy Policy', 'Terms of Service', 'Creator Agreement'],
  },
]

const socials = [
  { icon: InstagramIcon, label: 'Instagram' },
  { icon: YoutubeIcon, label: 'YouTube' },
  { icon: LinkedinIcon, label: 'LinkedIn' },
  { icon: XIcon, label: 'X' },
]

export function Footer() {
  return (
    <footer className="relative bg-surface/30">
      <div className="h-px w-full bg-gradient-brand opacity-50" />

      <div className="max-w-7xl mx-auto px-5 md:px-8 py-16 grid md:grid-cols-[1.4fr_2fr] gap-12">
        <div>
          <img src={logo} alt="Kalakaar" className="h-11 w-auto mb-4" />
          <p className="text-muted text-sm max-w-xs mb-1">
            India's marketplace for brands to discover and hire content creators — direct, transparent, zero middlemen.
          </p>
          <p className="font-deva text-muted text-sm max-w-xs mb-6">हर कलाकार की अपनी कीमत।</p>
          <div className="flex items-center gap-3">
            {socials.map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-muted hover:text-text hover:border-white/20 transition-colors"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-display font-semibold text-sm mb-4">{col.title}</h4>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-muted hover:text-text transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/5 py-6">
        <div className="max-w-7xl mx-auto px-5 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted">
          <span>© {new Date().getFullYear()} Kalakaar. All rights reserved.</span>
          <span className="font-deva">भारत में निर्मित 🇮🇳 Made in India</span>
        </div>
      </div>
    </footer>
  )
}
