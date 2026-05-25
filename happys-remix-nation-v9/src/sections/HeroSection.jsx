import { forwardRef } from 'react'

const HeroSection = forwardRef(function HeroSection({ opacity = 1 }, ref) {
  return (
    <section ref={ref} id="hero" className="section hero">
      <div className="section__content">
        <div className="hero__bottom" style={{ opacity }}>
          <p className="hero__tagline">
            <span className="glow-blue">AI.</span>{' '}
            <span className="glow-pink">SLOP.</span>{' '}
            <span className="glow-green">ART.</span>{' '}
            <span className="chrome-text">REMIXED.</span>
          </p>
          <p className="hero__scroll anim-float">▼ SCROLL TO MEET THE NATION ▼</p>
        </div>
      </div>
    </section>
  )
})

export default HeroSection
