import { useEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ainHero from '../assets/ain-hero.png'
import flower from '../assets/flower.png'
import './HeroSection.css'

gsap.registerPlugin(ScrollTrigger)

function HeroSection({ onCursorChange }) {
  const heroRef = useRef(null)
  const curtainRef = useRef(null)
  const flowerRef = useRef(null)
  const curtainId = useMemo(
    () => `hero-curtain-mask-${Math.random().toString(36).slice(2, 9)}`,
    [],
  )

  useEffect(() => {
    const context = gsap.context(() => {
      gsap.set(curtainRef.current, { yPercent: -100 })
      gsap.set(flowerRef.current, { yPercent: -14, rotate: -6, scale: 1.05 })

      const heroTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '+=140%',
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      })

      heroTimeline.to(curtainRef.current, {
        yPercent: 0,
        ease: 'none',
      })

      heroTimeline.to(
        flowerRef.current,
        {
          yPercent: 10,
          rotate: 6,
          scale: 1,
          ease: 'none',
        },
        0,
      )
    }, heroRef)

    return () => context.revert()
  }, [])

  return (
    <section className="hero-section" id="hero" ref={heroRef}>
      <div className="hero-section__image-wrap">
        <img className="hero-section__image" src={ainHero} alt="Nik Nurain portrait" />
      </div>

      <div className="hero-section__curtain" ref={curtainRef}>
        <img className="hero-section__flower" ref={flowerRef} src={flower} alt="" aria-hidden="true" />
        <svg
          aria-hidden="true"
          className="hero-section__curtain-svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <mask id={curtainId}>
              <rect width="100" height="100" fill="white" />
              <text
                x="50"
                y="54"
                textAnchor="middle"
                dominantBaseline="middle"
                textLength="84"
                lengthAdjust="spacingAndGlyphs"
                fill="black"
              >
                creative portfolio
              </text>
            </mask>
          </defs>
          <rect width="100" height="100" fill="var(--color-curtain)" mask={`url(#${curtainId})`} />
        </svg>
      </div>

      <div className="hero-section__shade" aria-hidden="true" />
      <div className="hero-section__year">25</div>
      <div className="hero-section__vertical">Videographer — Creative Director — KL</div>

      <div className="hero-section__content">
        <p className="hero-section__eyebrow">Creative Portfolio — Est. 2019</p>
        <h1 className="hero-section__title">
          <span className="hero-section__line">NIK</span>
          <span className="hero-section__line hero-section__line--accent">Nurain</span>
        </h1>
        <div className="hero-section__bottom">
          <p className="hero-section__desc">
            Crafting cinematic narratives through the lens. Based in Kuala Lumpur.
          </p>
          <a
            className="hero-section__scroll"
            href="#about"
            onMouseEnter={() => onCursorChange(true)}
            onMouseLeave={() => onCursorChange(false)}
          >
            Scroll to explore
          </a>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
