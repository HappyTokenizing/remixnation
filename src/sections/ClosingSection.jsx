import { forwardRef } from 'react'
import FitText from '../components/FitText'

const ClosingSection = forwardRef(function ClosingSection({ opacity = 1 }, ref) {
  return (
    <section ref={ref} id="join" className="section closing">
      <div className="section__content">
        <div className="closing__inner" style={{ opacity, transform: `translateY(${(1 - opacity) * 24}px)` }}>
          <p className="display closing__above glow-yellow">
            <FitText minSize={16} maxSize={36}>
              {['WHAT ARE YOU WAITING FOR?']}
            </FitText>
          </p>

          <h2 className="display closing__headline readable">
            <FitText minSize={48} maxSize={140}>
              {[
                <span key="join" className="chrome-text">JOIN</span>,
                <span key="nation" className="glow-yellow">THE NATION</span>
              ]}
            </FitText>
          </h2>

          <p className="closing__sub readable">
            vibes, tips, success — teamwork dreamwork
          </p>

          <div className="closing__buttons">
            <a
              href="https://discord.gg/Fw3pb3YT"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn social-btn--discord"
            >
              <span>💬</span> DISCORD
            </a>
          </div>

          <p className="closing__footer marker">
            © {new Date().getFullYear()} happy's remix nation · made with chaos &amp; gpus
          </p>
        </div>
      </div>
    </section>
  )
})

export default ClosingSection
