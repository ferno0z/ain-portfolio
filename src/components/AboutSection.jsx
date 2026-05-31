import SectionLabel from './SectionLabel'
import './AboutSection.css'

function AboutSection({ years }) {
  return (
    <section className="about-section" id="about">
      <div className="about-section__left reveal" data-years-counter>
        <div className="about-section__number">{years}</div>
        <div className="about-section__number-label">years of visual storytelling</div>
      </div>

      <div className="about-section__right">
        <SectionLabel className="reveal">About me</SectionLabel>
        <h2 className="about-section__headline reveal reveal-delay-1">
         Creativity isn't just my job , it's how I’d like to move through the world.
        </h2>
        <p className="about-section__copy reveal reveal-delay-2">
          I came into the creative industry with my heart set on graphic and brand design, then discovered that video editing was where my eye for detail and love of storytelling truly clicked. 
        </p>
        <p className="about-section__copy reveal reveal-delay-3">
          Now 25, with a degree in Communications and over two years of agency experience, I've had the privilege of editing and producing video content for brands locally and internationally. 
        </p>
        <div className="about-section__tags reveal">
          {[ 'Videography',
              'Video Editing',
              'Photography',
              'Graphic Design',
              'Content Creation',].map((tag) => (
            <span className="about-section__tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AboutSection
