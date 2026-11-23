import { useState } from 'react'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { NicheMarquee } from './components/NicheMarquee'
import { FeaturedCreators } from './components/FeaturedCreators'
import { HowItWorks } from './components/HowItWorks'
import { WhyKalakaar } from './components/WhyKalakaar'
import { NumbersBand } from './components/NumbersBand'
import { ForCreatorsCTA } from './components/ForCreatorsCTA'
import { Testimonials } from './components/Testimonials'
import { FAQ } from './components/FAQ'
import { FinalCTA } from './components/FinalCTA'
import { Footer } from './components/Footer'
import { InquiryModal } from './components/InquiryModal'
import { Toast } from './components/Toast'

function App() {
  const [activeCreator, setActiveCreator] = useState(null)
  const [toastMessage, setToastMessage] = useState(null)

  const handleSuccess = (creator) => {
    setToastMessage(`Inquiry sent to ${creator.name}! They'll get back to you soon.`)
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div className="grain-overlay" />

      <Navbar />
      <main>
        <Hero />
        <NicheMarquee />
        <FeaturedCreators onContact={setActiveCreator} />
        <HowItWorks />
        <WhyKalakaar />
        <NumbersBand />
        <ForCreatorsCTA />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />

      {activeCreator && (
        <InquiryModal
          creator={activeCreator}
          onClose={() => setActiveCreator(null)}
          onSuccess={handleSuccess}
        />
      )}

      {toastMessage && (
        <Toast message={toastMessage} onDismiss={() => setToastMessage(null)} />
      )}
    </div>
  )
}

export default App
