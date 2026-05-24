import { forwardRef } from 'react'
import ZoneText from '../components/ZoneText'
import FitText from '../components/FitText'

const GpuSection = forwardRef(function GpuSection({ opacity = 1 }, ref) {
  return (
    <section ref={ref} id="gpu" className="section zone-section">
      <div className="section__content">
        <ZoneText position="left" opacity={opacity}>
          <p className="marker zone-text__eyebrow glow-blue">take the leap</p>
          <h2 className="display zone-text__title">
            <FitText minSize={26} maxSize={56}>
              {['SHARE IDEAS.', <span key="blue" className="glow-blue">GROW TOGETHER.</span>]}
            </FitText>
          </h2>
          <div className="zone-text__stats">
            <div className="stat-mini">
              <span className="stat-mini__num glow-green">∞</span>
              <span className="stat-mini__label">SUPPORT</span>
            </div>
            <div className="stat-mini">
              <span className="stat-mini__num glow-pink">24/7</span>
              <span className="stat-mini__label">PROMPTING</span>
            </div>
            <div className="stat-mini">
              <span className="stat-mini__num glow-blue">100%</span>
              <span className="stat-mini__label">WINNING</span>
            </div>
          </div>
        </ZoneText>
      </div>
    </section>
  )
})

export default GpuSection
