import SectionLabel from './SectionLabel'
import './ContactSection.css'
import { contactLinks } from '../data'

function ContactSection({ links, onCursorChange }) {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-section__left reveal">
        <SectionLabel>Get in Touch</SectionLabel>
        <h2 className="contact-section__heading">
          Let&apos;s make
          <span>something real.</span>
        </h2>
        <div className='social-wrapper'>
               <a
          className="contact-section__email"
          href="mailto:niknurain940@gmail.com"
          onMouseEnter={() => onCursorChange(true)}
          onMouseLeave={() => onCursorChange(false)}
        >
          niknurain940@gmail.com
        </a>
          <a
          className="contact-section__email"
          href="tel:+60149204674"
          onMouseEnter={() => onCursorChange(true)}
          onMouseLeave={() => onCursorChange(false)}
        >
          +60 14-9204674
        </a>
        </div>
      </div>

      <div className="contact-section__right reveal reveal-delay-1">
        <ul className="contact-section__links">
          {contactLinks.map((social) => (
            <li key={social.link}>
              <a
                href={social.link}
                onMouseEnter={() => onCursorChange(true)}
                onMouseLeave={() => onCursorChange(false)}
              >
                {social.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default ContactSection
