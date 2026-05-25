import { forwardRef } from 'react'

const FOUNDERS = [
  { name: 'Happy Remixing', img: '/mentors/happyremixing.jpeg', hoverEmoji: '😊' },
  { name: 'JonJonJovi',     img: '/mentors/jovimon.webp',       hoverEmoji: '☠️' },
  { name: 'V1nmon',         img: '/mentors/v1n.webp',           hoverEmoji: '🦜' },
  { name: 'Meeksipoo',      img: '/mentors/meeks.webp',         hoverEmoji: '💩' },
]

const MENTORS = [
  { name: 'AllieRanae',    img: '/mentors/AllieRanae.webp' },
  { name: 'RoRoTuck',      img: '/mentors/roro.webp' },
  { name: 'Eva Caridad',   img: '/mentors/Eva.webp' },
  { name: 'Tiffany Nisbet',img: '/mentors/tiffany.webp' },
  { name: 'ZapbyZZMyth',   img: '/mentors/zap.webp' },
  { name: 'MichaelTV',     img: '/mentors/Michaeltv.webp' },
  { name: 'JesiWicks',     img: '/mentors/jesiwick.jpeg' },
  { name: 'TannerManor',   img: '/mentors/Andrewtanner.webp' },
  { name: 'Byeson',        img: '/mentors/byeson.webp' },
  { name: 'SandyZL',       img: '/mentors/SandyZl.jpeg' },
  { name: 'Weird Rocket J',img: '/mentors/weirdrocket.jpeg' },
  { name: 'SloppyYolk',    img: '/mentors/sloppy.jpeg' },
  { name: 'Erin Nicole',   img: '/mentors/Erin.webp' },
  { name: 'Steve Johnson', img: '/mentors/stevejohnson.webp' },
]

function getWobble(i) {
  const seed = i * 137
  const tilt = ((seed % 7) - 3) * 0.8
  const duration = 3 + (seed % 4)
  const delay = (seed % 10) * 0.15
  return { tilt, duration, delay }
}

function MemberCard({ member, role, index, eager }) {
  const { tilt, duration, delay } = getWobble(index)
  const style = {
    animationDuration: `${duration}s`,
    animationDelay: `${delay}s`,
    '--tilt': `${tilt}deg`
  }
  return (
    <div className="member" style={style}>
      <div className="member__frame">
        <img
          src={member.img}
          alt={member.name}
          loading={eager ? 'eager' : 'lazy'}
          decoding={eager ? 'sync' : 'async'}
        />
        {member.hoverEmoji && (
          <div className="member__hover-emoji" aria-hidden="true">
            {member.hoverEmoji}
          </div>
        )}
      </div>
      <p className="member__name">{member.name}</p>
      <p className="member__role marker">{role}</p>
    </div>
  )
}

const TeamSection = forwardRef(function TeamSection({ opacity = 1 }, ref) {
  return (
    <section ref={ref} id="team" className="section team-section">
      <div className="team-section__content" style={{ opacity }}>
        <p className="marker team__eyebrow glow-green">meet the nation</p>
        <h2 className="display display--md team__heading">
          <span className="chrome-text">THE</span>{' '}
          <span className="glow-pink">CREW</span>
        </h2>

        <div className="team__grid">
          {/* Founders always render first, loaded eagerly */}
          <div className="team__row team__row--founders">
            {FOUNDERS.map((m, i) => (
              <MemberCard key={m.name} member={m} role="Founder" index={i} eager={true} />
            ))}
          </div>
          {/* Mentors load lazily after */}
          <div className="team__row team__row--mentors">
            {MENTORS.map((m, i) => (
              <MemberCard key={m.name} member={m} role="Mentor" index={i + 100} eager={false} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
})

export default TeamSection
