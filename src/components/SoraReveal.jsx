import { useState, useRef, useEffect } from 'react'

/**
 * Interactive SORA word with a hover/tap reveal:
 * - Default state: shows "SORA"
 * - On hover (desktop) or tap (mobile): swaps to "STATS" with a small
 *   tooltip "50% off: REMIX" floating above
 * - Desktop: leaves on mouse-out
 * - Mobile: tap again on STATS to redirect to https://sorastats.com
 *           (or tap outside to dismiss)
 * - Desktop: clicking STATS (when revealed via hover) also redirects
 */
export default function SoraReveal() {
  const [active, setActive] = useState(false)
  const rootRef = useRef(null)

  const isHoverCapable = () =>
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(hover: hover)').matches

  const goToSorastats = () => {
    window.open('https://sorastats.com', '_blank', 'noopener,noreferrer')
  }

  const handleClick = (e) => {
    e.stopPropagation()
    if (active) {
      // Second click → navigate
      goToSorastats()
    } else {
      // First click → reveal STATS
      setActive(true)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick(e)
    }
  }

  const handleEnter = () => {
    if (isHoverCapable()) setActive(true)
  }
  const handleLeave = () => {
    if (isHoverCapable()) setActive(false)
  }

  // Dismiss on outside tap when active (mobile UX)
  useEffect(() => {
    if (!active) return
    const onDocClick = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setActive(false)
      }
    }
    document.addEventListener('pointerdown', onDocClick)
    return () => document.removeEventListener('pointerdown', onDocClick)
  }, [active])

  return (
    <span
      ref={rootRef}
      className={`sora-reveal${active ? ' is-active' : ''}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      role="button"
      tabIndex={0}
      aria-label={active ? 'STATS — 50% off: REMIX. Tap again to visit sorastats.com' : 'SORA'}
    >
      <span className="sora-reveal__tip" aria-hidden={!active}>
        50% off: REMIX
      </span>
      <span className="sora-reveal__word sora-reveal__word--default glow-green">SORA</span>
      <span className="sora-reveal__word sora-reveal__word--alt glow-green">STATS</span>
    </span>
  )
}
