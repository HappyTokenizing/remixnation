import { useEffect, useState } from 'react'

/**
 * Returns a continuous scroll progress value:
 * - activeIndex: which section is most in view (integer)
 * - rawProgress: total scroll progress across all sections (float, e.g. 2.34 = 34% through section 3)
 * - sectionProgress: progress within the active section (0 to 1)
 *
 * This lets the banner zoom interpolate smoothly between zones
 * instead of jumping on scroll-snap.
 */
export default function useScrollProgress(containerRef, sectionCount) {
  const [state, setState] = useState({
    activeIndex: 0,
    rawProgress: 0,
    sectionProgress: 0
  })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let raf = null

    const update = () => {
      const sectionHeight = container.clientHeight || window.innerHeight
      const scrollTop = container.scrollTop
      const rawProgress = scrollTop / sectionHeight
      const activeIndex = Math.min(
        Math.max(Math.round(rawProgress), 0),
        sectionCount - 1
      )
      const sectionProgress = Math.max(0, Math.min(1, rawProgress - activeIndex + 0.5))
      setState({ activeIndex, rawProgress, sectionProgress })
    }

    const handleScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = null
        update()
      })
    }

    update()
    container.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      container.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', update)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [containerRef, sectionCount])

  return state
}
