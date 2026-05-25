import { forwardRef } from 'react'

const FOUNDERS = [
  { name: 'HappyRemixing', img: '/mentors/happyremixing.jpeg', hoverEmoji: '😃' },
  { name: 'JonJonJovi',     img: '/mentors/jonjonjovi.gif',     hoverEmoji: '☠️' },
  { name: 'V1nmon',         img: '/mentors/v1nmon.gif',         hoverEmoji: '🦜' },
  { name: 'Meeksipoo',      img: '/mentors/meeks.gif',          hoverEmoji: '💩' },
]

const MENTORS = [
  { name: 'Allie Ranae',   img: '/mentors/AllieRanae.webp',  hoverEmoji: '👑', role: 'Mentor' },
  { name: 'RoRoTuck',      img: '/mentors/roro.webp',        hoverEmoji: '🍄', role: 'Mentor' },
  { name: 'Eva Caridad',   img: '/mentors/Eva.webp',         hoverEmoji: '🎨', role: 'Mentor' },
  { name: 'Tiffany Nisbet',img: '/mentors/tiffany.jpg',      hoverEmoji: '👠', role: 'Mentor' },
  { name: 'ZapbyZZMyth',   img: '/mentors/zap.webp',         hoverEmoji: '🎬', role: 'Mentor' },
  { name: 'MichaelTV',     img: '/mentors/Michaeltv.webp',   hoverEmoji: '📺', role: 'Mentor' },
  { name: 'JesiWicks',     img: '/mentors/jesiwick.jpeg',    hoverEmoji: '☀️', role: 'Mentor' },
  { name: 'TannerManor',   img: '/mentors/Andrewtanner.webp',hoverEmoji: '🦆', role: 'Mentor' },
  { name: 'SandyZL',       img: '/mentors/SandyZl.jpeg',     hoverEmoji: '😺', role: 'Mentor' },
  { name: 'Weird Rocket J',img: '/mentors/weirdrocket.jpeg', hoverEmoji: '🚀', role: 'Mentor' },
  { name: 'SloppyYolk',    img: '/mentors/sloppy.jpeg',      hoverEmoji: '🥚', role: 'Mentor' },
  { name: 'Erin Nicole',   img: '/mentors/Erin.webp',        hoverEmoji: '🍜', role: 'Mentor' },
  { name: 'Steve Johnson', img: '/mentors/stevejohnson.webp',hoverEmoji: '🍉', role: 'Mentor' },
  { name: 'Ken Jones',     img: '/mentors/kenjones.jpg',     hoverEmoji: '🦅', role: 'Community Ambassador' },
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
            <span>{member.hoverEmoji}</span>
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
          <div className="team__row team__row--founders">
            {FOUNDERS.map((m, i) => (
              <MemberCard key={m.name} member={m} role="Founder" index={i} eager={true} />
            ))}
          </div>
          <div className="team__row team__row--mentors">
            {MENTORS.map((m, i) => (
              <MemberCard
                key={m.name}
                member={m}
                role={m.role || 'Mentor'}
                index={i + 100}
                eager={false}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
})

export default TeamSection
