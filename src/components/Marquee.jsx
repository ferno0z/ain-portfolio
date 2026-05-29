import './Marquee.css'

function Marquee({ items }) {
  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {items.map((item, index) => (
          <span className="marquee-item" key={`${item}-${index}`}>
            {item} <span className="marquee-dot">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default Marquee
