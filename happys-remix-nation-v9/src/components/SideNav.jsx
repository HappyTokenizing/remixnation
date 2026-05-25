const ICONS = ['👀', '🐱', '🌭', '🎤', '🤖', '💀', '🚀']

export default function SideNav({ count, active, onNavigate }) {
  const icons = ICONS.slice(0, count)

  return (
    <nav className="sidenav" aria-label="Section navigation">
      <ul className="sidenav__list">
        {icons.map((icon, i) => (
          <li key={i} className="sidenav__item">
            <button
              type="button"
              className={`sidenav__dot${i === active ? ' is-active' : ''}`}
              aria-label={`Go to section ${i + 1}`}
              aria-current={i === active ? 'true' : 'false'}
              onClick={() => onNavigate(i)}
            >
              <span aria-hidden="true">{icon}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
