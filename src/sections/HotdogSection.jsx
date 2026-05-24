import { forwardRef } from 'react'
import ZoneText from '../components/ZoneText'
import FitText from '../components/FitText'

const HotdogSection = forwardRef(function HotdogSection({ opacity = 1 }, ref) {
  return (
    <section ref={ref} id="hotdog" className="section zone-section">
      <div className="section__content">
        <ZoneText position="right" opacity={opacity}>
          <p className="marker zone-text__eyebrow glow-yellow">redefining media &amp; entertainment</p>
          <h2 className="display zone-text__title">
            <FitText minSize={28} maxSize={64}>
              {['PROMPTING', <span key="pink" className="glow-pink">THE FUTURE</span>]}
            </FitText>
          </h2>
          <p className="zone-text__desc">
            One Community. Going Viral Together.
          </p>
          <div className="callout callout--yellow">🔥 100M+ VIEWS CREATED</div>
        </ZoneText>
      </div>
    </section>
  )
})

export default HotdogSection
