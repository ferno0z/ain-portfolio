import { useEffect, useRef, useState } from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import Marquee from './components/Marquee'
import AboutSection from './components/AboutSection'
import WorkSection from './components/WorkSection'
import GraphicsSection from './components/GraphicsSection'
import ContactSection from './components/ContactSection'
import SiteFooter from './components/SiteFooter'
import {
  contactLinks,
  graphicsProjects,
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
    if (!cursor || window.matchMedia('(pointer: coarse)').matches) return undefined

    const moveCursor = ({ clientX, clientY }) => {
      cursor.style.left = `${clientX}px`
      cursor.style.top = `${clientY}px`
    }

    window.addEventListener('mousemove', moveCursor)
    return () => window.removeEventListener('mousemove', moveCursor)
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
      <div className={`custom-cursor${cursorLarge ? ' is-large' : ''}`} ref={cursorRef} />
      <div className="app-grain" aria-hidden="true" />

      <Navbar onCursorChange={setCursorLarge} />
      <main>
        <HeroSection onCursorChange={setCursorLarge} />
        <Marquee items={marqueeLoop} />
        <AboutSection years={years} />
        <WorkSection sections={workSections} onCursorChange={setCursorLarge} />
        <ContactSection links={contactLinks} onCursorChange={setCursorLarge} />
      </main>
      <SiteFooter />
    </div>
  )
}

export default App
