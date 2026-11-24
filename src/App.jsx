import { useState } from 'react'
import { Navbar } from './components/Navbar'
import { LiquidSideNav } from './components/LiquidSideNav'
import { Dashboard } from './components/Dashboard'
import { SmoothScrollHero } from './components/SmoothScrollHero'
import { NicheMarquee } from './components/NicheMarquee'
import { CreatorSwipeDeck } from './components/CreatorSwipeDeck'
import { FeaturedCreators } from './components/FeaturedCreators'
import { NicheImageLinks } from './components/NicheImageLinks'
import { HowItWorks } from './components/HowItWorks'
import { WhyKalakaar } from './components/WhyKalakaar'
import { NumbersBand } from './components/NumbersBand'
import { ForCreatorsCTA } from './components/ForCreatorsCTA'
import { Testimonials } from './components/Testimonials'
import { FAQ } from './components/FAQ'
import { FinalCTA } from './components/FinalCTA'
import { Footer } from './components/Footer'
import { InquiryModal } from './components/InquiryModal'
import { RoleModal } from './components/RoleModal'
import { Toast } from './components/Toast'
import { LenisProvider } from './components/LenisProvider'
import { ScrollBloom } from './components/ScrollBloom'

function App() {
  const [currentView, setCurrentView] = useState('home') // 'home' | 'dashboard'
  const [dashboardRole, setDashboardRole] = useState('creator')
  const [activeCreator, setActiveCreator] = useState(null)
  const [toastMessage, setToastMessage] = useState(null)
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false)
  const [isSideNavOpen, setIsSideNavOpen] = useState(false)
  const [heroSearchFilters, setHeroSearchFilters] = useState(null)

  const handleOpenDashboard = (role = 'creator') => {
    setDashboardRole(role)
    setCurrentView('dashboard')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSuccess = (creator) => {
    setToastMessage(`Direct inquiry sent to ${creator.name}! They will reach out via WhatsApp/Email shortly.`)
  }

  const handleHeroSearch = (filters) => {
    setHeroSearchFilters(filters)
  }

  return (
    <LenisProvider>
      <div className="relative min-h-screen bg-bg text-text selection:bg-burgundy selection:text-white">
        {/* Subtle cinematic grain overlay */}
        <div className="grain-overlay" />

        {/* Global Navigation */}
        <Navbar
          currentView={currentView}
          onOpenRoleModal={() => setIsRoleModalOpen(true)}
          onOpenNav={() => setIsSideNavOpen(true)}
          onOpenDashboard={() => handleOpenDashboard('creator')}
        />

        {/* Hover.dev Liquid Side Nav Drawer */}
        <LiquidSideNav
          isOpen={isSideNavOpen}
          onClose={() => setIsSideNavOpen(false)}
          onOpenRoleModal={() => setIsRoleModalOpen(true)}
          onOpenDashboard={() => handleOpenDashboard('creator')}
        />

        {currentView === 'dashboard' ? (
          <Dashboard
            initialRole={dashboardRole}
            onBackToHome={() => {
              setCurrentView('home')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          />
        ) : (
          <>
            {/* Main Content Sections */}
            <main>
              <SmoothScrollHero
                onSearch={handleHeroSearch}
                onOpenRoleModal={() => setIsRoleModalOpen(true)}
              />

              <NicheMarquee />

              {/* Interactive Drag & Swipe Creator Showcase (Hover.dev SwipeCards) */}
              <ScrollBloom scaleFrom={0.92} opacityFrom={0.4} yOffset={35}>
                <CreatorSwipeDeck onContact={setActiveCreator} />
              </ScrollBloom>

              <ScrollBloom scaleFrom={0.93} opacityFrom={0.4} yOffset={35}>
                <FeaturedCreators
                  onContact={setActiveCreator}
                  externalFilters={heroSearchFilters}
                />
              </ScrollBloom>

              {/* Cursor Spring Image Reveal Links (Hover.dev HoverImageLinks) */}
              <ScrollBloom scaleFrom={0.93} opacityFrom={0.4} yOffset={35}>
                <NicheImageLinks />
              </ScrollBloom>

              {/* Sticky Stacking Cards On Scroll (Hover.dev Sticky Cards) */}
              <HowItWorks />

              {/* Sticky Split Stacking Deck */}
              <WhyKalakaar />

              <ScrollBloom scaleFrom={0.95} opacityFrom={0.5} yOffset={25}>
                <NumbersBand />
              </ScrollBloom>

              <ScrollBloom scaleFrom={0.93} opacityFrom={0.4} yOffset={35}>
                <ForCreatorsCTA onOpenRoleModal={() => setIsRoleModalOpen(true)} />
              </ScrollBloom>

              {/* Sticky Stacking Social Proof */}
              <Testimonials />

              <ScrollBloom scaleFrom={0.94} opacityFrom={0.4} yOffset={30}>
                <FAQ />
              </ScrollBloom>

              {/* Final CTA with FlipLinks */}
              <ScrollBloom scaleFrom={0.92} opacityFrom={0.4} yOffset={35}>
                <FinalCTA onOpenRoleModal={() => setIsRoleModalOpen(true)} />
              </ScrollBloom>
            </main>

        {/* Global Footer */}
        <Footer />
        </>
      )}

      {/* Direct Inquiry Modal (Brand to Creator) */}
      {activeCreator && (
        <InquiryModal
          creator={activeCreator}
          onClose={() => setActiveCreator(null)}
          onSuccess={handleSuccess}
        />
      )}

      {/* 3-Role Onboarding Modal (Creator / Brand / Talent Manager) */}
      <RoleModal
        isOpen={isRoleModalOpen}
        onClose={() => setIsRoleModalOpen(false)}
        onOpenDashboard={handleOpenDashboard}
      />

        {/* Notification Toast */}
        {toastMessage && (
          <Toast message={toastMessage} onDismiss={() => setToastMessage(null)} />
        )}
      </div>
    </LenisProvider>
  )
}

export default App
