import SectionLabel from './SectionLabel'
import createWithYourHands from '../assets/social-media-design-thumbnail/Mossery Instagram Carousel - Create with Your Hands.png'
import artKit from '../assets/social-media-design-thumbnail/Mossery Instagram Carousel - Art Kit.png'
import bizDeals from '../assets/social-media-design-thumbnail/Swipey Instagram Carousel - Biz Deals.png'
import chaosToClarity from '../assets/social-media-design-thumbnail/Swipey Instagram Carousel - From Chaos to Clarity.png'
import multiCard from '../assets/social-media-design-thumbnail/Swipey Instagram Carousel - Swipey’s Multi-Card.png'
import billPayment from '../assets/social-media-design-thumbnail/Swipey Instagram Carousel - Bill Payment Guide.png'
import budget2024 from '../assets/social-media-design-thumbnail/Swipey Instagram Carousel - Budget 2024.png'
import './SocialMediaDesign.css'

const projects = [
  { brand: 'Mossery', title: 'Create with Your Hands', image: createWithYourHands, href: 'https://www.instagram.com/p/Dd5KxLDiV4p/?img_index=1', height: 1440 },
  { brand: 'Mossery', title: 'Art Kit', image: artKit, href: 'https://www.instagram.com/p/DdI55S8jEVI/?img_index=1', height: 1440 },
  { brand: 'Swipey', title: 'Biz Deals', image: bizDeals, href: 'https://www.instagram.com/p/CzppwfypYgN/', height: 1080 },
  { brand: 'Swipey', title: 'From Chaos to Clarity', image: chaosToClarity, href: 'https://www.instagram.com/p/Czn-4DjMWhs/?img_index=1', height: 1080 },
  { brand: 'Swipey', title: 'Swipey’s Multi-Card', image: multiCard, href: 'https://www.instagram.com/p/Cye2c4erGAG/?img_index=1', height: 1080 },
  { brand: 'Swipey', title: 'Bill Payment Guide', image: billPayment, href: 'https://www.instagram.com/p/CyvVIiOpaqw/?img_index=1', height: 1080 },
  { brand: 'Swipey', title: 'Budget 2024', image: budget2024, href: 'https://www.instagram.com/p/Cy0Nb5ORXyC/?img_index=1', height: 1080 },
]

function SocialMediaDesign({ onCursorChange = () => {} }) {
  return (
    <section className="social-design" id="social-media-design" aria-labelledby="social-design-title">
      <div className="social-design__header">
        <div className="reveal">
          <SectionLabel>Visual storytelling</SectionLabel>
          <h2 className="social-design__title" id="social-design-title">
            Social Media
            <span>Design</span>
          </h2>
        </div>
        <p className="social-design__intro reveal reveal-delay-1">
          Stories made to swipe through. A selection of carousel designs for Mossery and Swipey.
        </p>
      </div>

      <div className="social-design__grid">
        {projects.map((project, index) => (
          <a
            className={`social-design__card reveal reveal-delay-${(index % 3) + 1}`}
            key={project.href}
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.brand} — ${project.title} (opens Instagram in a new tab)`}
            onMouseEnter={() => onCursorChange(true)}
            onMouseLeave={() => onCursorChange(false)}
          >
            <div className="social-design__image-wrap">
              <img
                className="social-design__image"
                src={project.image}
                alt={`${project.brand} Instagram carousel — ${project.title}`}
                width={1080}
                height={project.height}
                loading="lazy"
                decoding="async"
              />
              <span className="social-design__cta" aria-hidden="true">View carousel ↗</span>
            </div>
            <div className="social-design__caption">
              <div>
                <span className="social-design__brand">{project.brand}</span>
                <h3 className="social-design__project-title">{project.title}</h3>
              </div>
              <span className="social-design__arrow" aria-hidden="true">↗</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}

export default SocialMediaDesign
