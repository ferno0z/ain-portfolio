import SectionLabel from './SectionLabel'
import './WorkSection.css'

function WorkSection({ projects, onCursorChange }) {
  return (
    <section className="work-section" id="work">
      <div className="work-section__header">
        <div className="reveal">
          <SectionLabel>Selected Work</SectionLabel>
          <div className="work-section__title">
            Selected
            <span>Films</span>
          </div>
        </div>
        <div className="work-section__count reveal">0{projects.length} Projects</div>
      </div>

      <div className="work-section__grid">
        {projects.map((project) => (
          <article
            className="work-card reveal"
            key={project.number}
            onMouseEnter={() => onCursorChange(true)}
            onMouseLeave={() => onCursorChange(false)}
          >
            <div className="work-card__inner">
              <div className="work-card__placeholder">
                <div className="work-card__play">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>

              <div className="work-card__overlay">
                <div className="work-card__meta">{project.number}</div>
                <div className="work-card__title">{project.title}</div>
                <div className="work-card__type">{project.type}</div>
              </div>
              <div className="work-card__hover">Preview</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default WorkSection
