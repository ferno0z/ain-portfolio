import ainHero from '../assets/ain-hero.png'
import './HeroSection.css'

function HeroSection({ onCursorChange }) {
  return (
    <section className="hero-section" id="hero">
      <div className="hero-section__image-wrap">
        <img className="hero-section__image" src={ainHero} alt="Nik Nurain portrait" />
      </div>

      <div className="hero-section__shade" aria-hidden="true" />
      <div className="hero-section__vertical">Videographer — Content Creator — KL</div>

      <div className="hero-section__content">
        <p className="hero-section__eyebrow">Nik Nurain</p>
        <h1 className="hero-section__title">
          <span className="hero-section__line">Creative</span>
          <span className="hero-section__line hero-section__line--accent">Portfolio</span>
        </h1>
        <div className="hero-section__bottom">
          <p className="hero-section__desc">
            Pouring care into creativity. Based in Kuala Lumpur.
          </p>
          <a
            className="hero-section__scroll"
            href="#work"
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
