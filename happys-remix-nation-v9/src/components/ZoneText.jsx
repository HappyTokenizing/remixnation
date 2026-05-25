/**
 * A floating text panel that fades in based on how close
 * the user is to its parent section.
 *
 * Props:
 *   - position: 'right' | 'left' | 'bottom' | 'top-left' | 'top-right'
 *   - opacity: 0-1, controlled by parent based on scroll
 *   - children: content
 */
export default function ZoneText({ position = 'right', opacity = 1, children }) {
  const style = {
    opacity,
    transform: `${getTransform(position)} translateY(${(1 - opacity) * 24}px)`
  }

  return (
    <div className={`zone-text zone-text--${position}`} style={style}>
      {children}
    </div>
  )
}

function getTransform(position) {
  switch (position) {
    case 'right':
    case 'left':
      return 'translateY(-50%)'
    case 'bottom':
    case 'top':
      return 'translateX(-50%)'
    default:
      return 'none'
  }
}
