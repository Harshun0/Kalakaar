import { useEffect } from 'react'
import { ReactLenis, useLenis } from 'lenis/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import 'lenis/dist/lenis.css'

gsap.registerPlugin(ScrollTrigger)

function LenisScrollSync() {
  useLenis(() => {
    ScrollTrigger.update()
  })

  useEffect(() => {
    // Refresh ScrollTrigger when layout or window mounts
    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  return null
}

export function LenisProvider({ children }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.5,
      }}
    >
      <LenisScrollSync />
      {children}
    </ReactLenis>
  )
}
