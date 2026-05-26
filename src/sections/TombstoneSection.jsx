import { forwardRef } from 'react'
import ZoneText from '../components/ZoneText'
import FitText from '../components/FitText'
import SoraReveal from '../components/SoraReveal'

const TombstoneSection = forwardRef(function TombstoneSection({ opacity = 1 }, ref) {
  return (
    <section ref={ref} id="tombstone" className="section zone-section">
      <div className="section__content">
        <ZoneText position="right" opacity={opacity}>
          <p className="marker zone-text__eyebrow glow-pink">in memory of</p>
          <h2 className="display zone-text__title">
            <FitText minSize={32} maxSize={72}>
              {[<>R.I.P. <SoraReveal /></>]}
            </FitText>
          </h2>
          <p className="zone-text__desc">
            Viral hits come and go. Creations last forever.
          </p>
          <div className="callout callout--green">"THANKS FOR THE FREE GENS, SAM ALTMAN." — REMIX NATION</div>
        </ZoneText>
      </div>
    </section>
  )
})

export default TombstoneSection
