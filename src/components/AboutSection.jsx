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
        <SectionLabel className="reveal">Who I Am</SectionLabel>
        <h2 className="about-section__headline reveal reveal-delay-1">
          A filmmaker who finds beauty in the ordinary, tension in the quiet, and stories in a
          single frame.
        </h2>
        <p className="about-section__copy reveal reveal-delay-2">
          Based in Kuala Lumpur, I work with brands, artists, and organisations to create films
          that don&apos;t just communicate — they linger. My work lives at the intersection of
          documentary truth and editorial precision.
        </p>
        <p className="about-section__copy reveal reveal-delay-3">
          From intimate portrait work to large-scale commercial productions, every project is
          treated as its own world.
        </p>
        <div className="about-section__tags reveal">
          {['Brand Films', 'Documentaries', 'Commercial', 'Editorial', 'Motion Graphics', 'Art Direction'].map((tag) => (
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
