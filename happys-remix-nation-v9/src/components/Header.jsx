import Logo from './Logo'

export default function Header() {
  return (
    <header className="header">
      <a href="/" className="header__logo" aria-label="Happy's Remix Nation home">
        <Logo />
      </a>

      <div className="header__right">
        <span className="header__live">
          <span className="header__live-dot" /> LIVE
        </span>
        <a
          href="https://discord.gg/Fw3pb3YT"
          target="_blank"
          rel="noopener noreferrer"
          className="header__cta"
        >
          <span>JOIN THE NATION</span>
          <span className="header__cta-icon" aria-hidden="true">→</span>
        </a>
      </div>
    </header>
  )
}
