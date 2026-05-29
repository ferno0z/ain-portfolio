import SectionLabel from './SectionLabel'
import './ContactSection.css'

function ContactSection({ links, onCursorChange }) {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-section__left reveal">
        <SectionLabel>Get in Touch</SectionLabel>
        <h2 className="contact-section__heading">
          Let&apos;s make
          <span>something real.</span>
        </h2>
        <a
          className="contact-section__email"
          href="mailto:hello@niknurain.com"
          onMouseEnter={() => onCursorChange(true)}
          onMouseLeave={() => onCursorChange(false)}
        >
          hello@niknurain.com
        </a>
      </div>

      <div className="contact-section__right reveal reveal-delay-1">
        <ul className="contact-section__links">
          {links.map((link) => (
            <li key={link}>
              <a
                href="#"
                onMouseEnter={() => onCursorChange(true)}
                onMouseLeave={() => onCursorChange(false)}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default ContactSection
