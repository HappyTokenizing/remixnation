import { forwardRef } from 'react'
import ZoneText from '../components/ZoneText'
import FitText from '../components/FitText'

const CatSection = forwardRef(function CatSection({ opacity = 1 }, ref) {
  return (
    <section ref={ref} id="cat" className="section zone-section">
      <div className="section__content">
        <ZoneText position="right" opacity={opacity}>
          <p className="marker zone-text__eyebrow glow-pink">become an AI creator</p>
          <h2 className="display zone-text__title">
            <FitText minSize={32} maxSize={72}>
              {['TAP IN']}
            </FitText>
          </h2>
          <p className="zone-text__desc">
            Learn from experts. Meet fellow creators.
          </p>
          <div className="callout callout--pink">LEVEL UP YOUR GAME</div>
        </ZoneText>
      </div>
    </section>
  )
})

export default CatSection
