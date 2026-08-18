import { useEffect, useState } from 'react'

/**
 * Continuous scroll progress driven by REAL section offsets, not an
 * assumed uniform section height. This matters because the team
 * section grows with its content (height: auto) and can be taller
 * than one viewport on mobile — with the old scrollTop/viewportHeight
 * math, every section after it drifted out of sync (banner camera and
 * text fades landed early).
 *
 * Model:
 * - Each section i has a "resting range" [top_i, max(top_i, bottom_i - vh)].
 *   While scrollTop is inside it, rawProgress === i exactly (plateau).
 *   For normal one-viewport sections the range collapses to a point,
 *   which reproduces the old behavior 1:1.
 * - Between the end of section i's resting range and the top of
 *   section i+1, rawProgress interpolates i -> i+1.
 *
 * Result: the banner holds its zone while you scroll through a tall
 * section, then glides to the next zone exactly at the boundary.
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
    let tops = []
    let heights = []

    const measure = () => {
      const sections = Array.from(container.querySelectorAll(':scope > .section'))
      tops = sections.map((s) => s.offsetTop)
      heights = sections.map((s) => s.offsetHeight)
    }

    const compute = () => {
      const n = Math.min(sectionCount, tops.length)
      if (n === 0) return
      const vh = container.clientHeight || window.innerHeight
      const scrollTop = container.scrollTop

      // Which section's territory are we in?
      let i = 0
      while (i < n - 1 && scrollTop >= tops[i + 1]) i++

      // Resting range end: where the section's bottom meets the viewport bottom
      const restEnd = Math.max(tops[i], tops[i] + heights[i] - vh)

      let raw = i
      if (i < n - 1 && scrollTop > restEnd) {
        const span = Math.max(1, tops[i + 1] - restEnd)
        raw = i + Math.min(1, (scrollTop - restEnd) / span)
      }

      const activeIndex = Math.max(0, Math.min(n - 1, Math.round(raw)))
      const sectionProgress = raw - Math.floor(raw)

      setState((prev) =>
        prev.rawProgress === raw && prev.activeIndex === activeIndex
          ? prev
          : { activeIndex, rawProgress: raw, sectionProgress }
      )
    }

    const schedule = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = null
        compute()
      })
    }

    const remeasure = () => {
      measure()
      schedule()
    }

    measure()
    compute()

    container.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', remeasure)
    window.addEventListener('orientationchange', remeasure)

    // Section heights shift as images/video load — remeasure when they do
    const ro = new ResizeObserver(remeasure)
    Array.from(container.querySelectorAll(':scope > .section')).forEach((s) =>
      ro.observe(s)
    )

    return () => {
      container.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', remeasure)
      window.removeEventListener('orientationchange', remeasure)
      ro.disconnect()
      if (raf) cancelAnimationFrame(raf)
    }
  }, [containerRef, sectionCount])

  return state
}
