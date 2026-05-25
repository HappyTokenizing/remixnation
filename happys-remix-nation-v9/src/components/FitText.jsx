import { useLayoutEffect, useRef, useState } from 'react'

/**
 * Auto-shrinks its content's font-size until it fits within the parent
 * container on a single line per `<br>`-separated row. Keeps words
 * intact (never wraps mid-word).
 *
 * Default behavior: each child line is rendered with `white-space: nowrap`
 * and the whole component's font-size is shrunk until every line fits.
 */
export default function FitText({ children, className = '', minSize = 18, maxSize = 72 }) {
  const containerRef = useRef(null)
  const measureRef = useRef(null)
  const [fontSize, setFontSize] = useState(maxSize)

  useLayoutEffect(() => {
    const measureEl = measureRef.current
    const containerEl = containerRef.current
    if (!measureEl || !containerEl) return

    let raf = null

    const fit = () => {
      const parent = containerEl.parentElement
      if (!parent) return

      // Available width = parent inner width
      const cs = getComputedStyle(parent)
      const padX = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight)
      const availableWidth = parent.clientWidth - padX

      // Binary search for the largest size that fits
      let low = minSize
      let high = maxSize
      let best = minSize

      while (low <= high) {
        const mid = Math.floor((low + high) / 2)
        measureEl.style.fontSize = `${mid}px`
        // Find the widest line in the measure element
        const lines = measureEl.querySelectorAll('.fit-text__line')
        let widest = 0
        lines.forEach((line) => {
          if (line.scrollWidth > widest) widest = line.scrollWidth
        })
        if (widest <= availableWidth) {
          best = mid
          low = mid + 1
        } else {
          high = mid - 1
        }
      }

      setFontSize(best)
    }

    fit()

    const ro = new ResizeObserver(() => {
      if (raf) cancelAnimationFrame(raf)
      raf = requestAnimationFrame(fit)
    })
    if (containerEl.parentElement) ro.observe(containerEl.parentElement)

    return () => {
      ro.disconnect()
      if (raf) cancelAnimationFrame(raf)
    }
  }, [children, minSize, maxSize])

  // Split children into lines based on <br/> markers.
  // We accept either an array of strings/elements or a single child.
  // Lines are wrapped in nowrap spans for measurement and display.
  const lines = Array.isArray(children) ? children : [children]

  return (
    <span ref={containerRef} className={`fit-text ${className}`} style={{ display: 'block', fontSize: `${fontSize}px`, lineHeight: 1 }}>
      {/* Hidden measure copy — always at the candidate size, used to compute scrollWidth */}
      <span
        ref={measureRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          visibility: 'hidden',
          pointerEvents: 'none',
          left: '-9999px',
          top: 0,
          whiteSpace: 'nowrap'
        }}
      >
        {lines.map((line, i) => (
          <span key={i} className="fit-text__line" style={{ display: 'block', whiteSpace: 'nowrap' }}>
            {line}
          </span>
        ))}
      </span>

      {/* Actual rendered content */}
      {lines.map((line, i) => (
        <span key={i} style={{ display: 'block', whiteSpace: 'nowrap' }}>
          {line}
        </span>
      ))}
    </span>
  )
}
