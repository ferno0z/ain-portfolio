import { useEffect, useRef, useState } from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import Marquee from './components/Marquee'
import AboutSection from './components/AboutSection'
import WorkSection from './components/WorkSection'
import SocialMediaDesign from './components/SocialMediaDesign.tsx'
import ContactSection from './components/ContactSection'
import SiteFooter from './components/SiteFooter'
import {
  contactLinks,
  marqueeLoop,
  workSections,
  yearsOfStorytelling,
} from './data'
import './App.css'

function App() {
  const cursorRef = useRef(null)
  const [cursorLarge, setCursorLarge] = useState(false)
  const [years, setYears] = useState(0)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return undefined

    const mouseAvailable = window.matchMedia('(any-hover: hover) and (any-pointer: fine)')

    const hideCursor = () => {
      cursor.style.visibility = 'hidden'
      document.documentElement.classList.remove('has-custom-cursor')
      setCursorLarge(false)
    }

    const moveCursor = ({ clientX, clientY, pointerType }) => {
      if (pointerType !== 'mouse' || !mouseAvailable.matches) {
        hideCursor()
        return
      }
      cursor.style.left = `${clientX}px`
      cursor.style.top = `${clientY}px`
      cursor.style.visibility = 'visible'
      document.documentElement.classList.add('has-custom-cursor')
    }

    window.addEventListener('pointermove', moveCursor, true)
    window.addEventListener('pointerover', moveCursor, true)
    window.addEventListener('pointerdown', moveCursor, true)
    document.documentElement.addEventListener('pointerleave', hideCursor)
    window.addEventListener('blur', hideCursor)
    document.addEventListener('visibilitychange', hideCursor)
    mouseAvailable.addEventListener('change', hideCursor)

    return () => {
      window.removeEventListener('pointermove', moveCursor, true)
      window.removeEventListener('pointerover', moveCursor, true)
      window.removeEventListener('pointerdown', moveCursor, true)
      document.documentElement.removeEventListener('pointerleave', hideCursor)
      window.removeEventListener('blur', hideCursor)
      document.removeEventListener('visibilitychange', hideCursor)
      mouseAvailable.removeEventListener('change', hideCursor)
      hideCursor()
    }
  }, [])

  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal')
    const yearsElement = document.querySelector('[data-years-counter]')

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.14 },
    )

    revealElements.forEach((element) => revealObserver.observe(element))

    let frameId = 0
    let hasAnimatedYears = false

    const yearsObserver = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || hasAnimatedYears) return

        hasAnimatedYears = true
        const duration = 1600
        const start = performance.now()

        const animateYears = (time) => {
          const progress = Math.min((time - start) / duration, 1)
          setYears(Math.floor(progress * yearsOfStorytelling))

          if (progress < 1) {
            frameId = window.requestAnimationFrame(animateYears)
          } else {
            setYears(yearsOfStorytelling)
          }
        }

        frameId = window.requestAnimationFrame(animateYears)
        yearsObserver.disconnect()
      },
      { threshold: 0.55 },
    )

    if (yearsElement) yearsObserver.observe(yearsElement)

    return () => {
      revealObserver.disconnect()
      yearsObserver.disconnect()
      if (frameId) window.cancelAnimationFrame(frameId)
    }
  }, [])

  return (
    <div className="app-shell">
      <div className={`custom-cursor${cursorLarge ? ' is-large' : ''}`} ref={cursorRef} aria-hidden="true" />
      <div className="app-grain" aria-hidden="true" />

      <Navbar onCursorChange={setCursorLarge} />
      <main>
        <HeroSection onCursorChange={setCursorLarge} />
        <WorkSection sections={workSections} onCursorChange={setCursorLarge} />
        <SocialMediaDesign onCursorChange={setCursorLarge} />
        <Marquee items={marqueeLoop} />
        <AboutSection years={years} />
        <ContactSection links={contactLinks} onCursorChange={setCursorLarge} />
      </main>
      <SiteFooter />
    </div>
  )
}

export default App
