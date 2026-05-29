import SectionLabel from './SectionLabel'
import './GraphicsSection.css'

function GraphicPattern({ type }) {
  if (type === 'frames') {
    return (
      <svg className="graphics-card__pattern" viewBox="0 0 300 400" aria-hidden="true">
        <rect x="40" y="40" width="220" height="320" />
        <rect x="70" y="70" width="160" height="260" />
        <line x1="40" y1="200" x2="260" y2="200" />
      </svg>
    )
  }

  if (type === 'triangle') {
    return (
      <svg className="graphics-card__pattern" viewBox="0 0 400 300" aria-hidden="true">
        <polygon points="200,30 370,270 30,270" />
        <polygon points="200,90 310,250 90,250" />
      </svg>
    )
  }

  if (type === 'organic') {
    return (
      <svg className="graphics-card__pattern" viewBox="0 0 300 300" aria-hidden="true">
        <path d="M150 20 C230 20 280 80 280 150 C280 230 200 280 150 280 C80 280 20 220 20 150 C20 80 70 20 150 20Z" />
        <path d="M150 60 C210 60 240 100 240 150 C240 210 190 240 150 240 C100 240 60 200 60 150 C60 100 90 60 150 60Z" />
      </svg>
    )
  }

  if (type === 'grid') {
    return (
      <svg className="graphics-card__pattern" viewBox="0 0 400 320" aria-hidden="true">
        <line x1="0" y1="80" x2="400" y2="80" />
        <line x1="0" y1="160" x2="400" y2="160" />
        <line x1="0" y1="240" x2="400" y2="240" />
        <line x1="100" y1="0" x2="100" y2="320" />
        <line x1="200" y1="0" x2="200" y2="320" />
        <line x1="300" y1="0" x2="300" y2="320" />
      </svg>
    )
  }

  if (type === 'hex') {
    return (
      <svg className="graphics-card__pattern" viewBox="0 0 300 400" aria-hidden="true">
        <path d="M150 30 L270 90 L270 310 L150 370 L30 310 L30 90 Z" />
        <path d="M150 80 L230 120 L230 280 L150 320 L70 280 L70 120 Z" />
      </svg>
    )
  }

  return (
    <svg className="graphics-card__pattern" viewBox="0 0 400 400" aria-hidden="true">
      <circle cx="200" cy="200" r="160" />
      <circle cx="200" cy="200" r="100" />
      <line x1="40" y1="200" x2="360" y2="200" />
      <line x1="200" y1="40" x2="200" y2="360" />
    </svg>
  )
}

function GraphicsSection({ projects, onCursorChange }) {
  return (
    <section className="graphics-section" id="graphics">
      <div className="graphics-section__header">
        <div className="reveal">
          <SectionLabel>Visual Design</SectionLabel>
          <h2 className="graphics-section__title">
            Graphic
            <em>&amp; Design</em>
          </h2>
        </div>
        <p className="graphics-section__desc reveal reveal-delay-1">
          Beyond the moving image — print, identity, and visual systems that give brands a
          language of their own.
        </p>
      </div>

      <div className="graphics-section__grid">
        {projects.map((project, index) => (
          <article
            className={`graphics-card reveal reveal-delay-${(index % 3) + 1}`}
            key={project.title}
            onMouseEnter={() => onCursorChange(true)}
            onMouseLeave={() => onCursorChange(false)}
          >
            <div className="graphics-card__inner">
              <div className="graphics-card__bg" />
              <GraphicPattern type={project.pattern} />
              <div className="graphics-card__label">
                <div className="graphics-card__title">{project.title}</div>
                <div className="graphics-card__subtitle">{project.subtitle}</div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default GraphicsSection
