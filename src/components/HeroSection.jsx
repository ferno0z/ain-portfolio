import { useEffect, useRef } from 'react'
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

  useEffect(() => {
    const context = gsap.context(() => {
      const media = gsap.matchMedia()

      media.add('(min-width: 56.26rem)', () => {
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
      })

      media.add('(max-width: 56.25rem)', () => {
        gsap.set(curtainRef.current, { yPercent: -100, force3D: true })
        gsap.set(flowerRef.current, { yPercent: 0, rotate: 0, scale: 1, force3D: true })

        const heroTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: '+=85%',
            scrub: true,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })

        heroTimeline.to(curtainRef.current, {
          yPercent: 0,
          ease: 'none',
        })
      })

      return () => media.revert()
    }, heroRef)

    return () => context.revert()
  }, [])

  return (
    <section className="hero-section" id="hero" ref={heroRef}>
      <div className="hero-section__image-wrap">
        <img className="hero-section__image" src={ainHero} alt="Nik Nurain portrait" />
      </div>

      <div className="hero-section__curtain" ref={curtainRef}>
        <svg
          aria-hidden="true"
          className="hero-section__curtain-svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <rect width="100" height="100" fill="var(--color-curtain)" />
        </svg>
        <img className="hero-section__flower" ref={flowerRef} src={flower} alt="" aria-hidden="true" />
        <div className="hero-section__curtain-text" aria-hidden="true">
          creative portfolio
        </div>
      </div>

      <div className="hero-section__shade" aria-hidden="true" />
      <div className="hero-section__vertical">Videographer — Content Creator — KL</div>

      <div className="hero-section__content">
        <p className="hero-section__eyebrow">Creative Portfolio</p>
        <h1 className="hero-section__title">
          <span className="hero-section__line">NIK</span>
          <span className="hero-section__line hero-section__line--accent">Nurain</span>
        </h1>
        <div className="hero-section__bottom">
          <p className="hero-section__desc">
            Pouring care into creativity. Based in Kuala Lumpur.
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
