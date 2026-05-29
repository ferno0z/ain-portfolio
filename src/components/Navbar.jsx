import './Navbar.css'

function Navbar({ onCursorChange }) {
  return (
    <nav className="site-nav">
      <a
        className="site-nav__name"
        href="#hero"
        onMouseEnter={() => onCursorChange(true)}
        onMouseLeave={() => onCursorChange(false)}
      >
        Nik Nurain
      </a>

      <div className="site-nav__links">
        {[
          { href: '#about', label: 'About' },
          { href: '#work', label: 'My Work' },
          { href: '#contact', label: 'Reach Me' },
        ].map((link) => (
          <a
            key={link.href}
            href={link.href}
            onMouseEnter={() => onCursorChange(true)}
            onMouseLeave={() => onCursorChange(false)}
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  )
}

export default Navbar
