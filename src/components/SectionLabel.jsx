import './SectionLabel.css'

function SectionLabel({ children, className = '' }) {
  return <div className={`section-label ${className}`.trim()}>{children}</div>
}

export default SectionLabel
