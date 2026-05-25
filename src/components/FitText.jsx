import { useLayoutEffect, useRef, useState } from 'react'

/**
 * Auto-shrinks its content's font-size until each line fits the
 * available width on a single line per `<br>`-separated row.
 * Words are kept intact (never wraps mid-word).
 *
 * Strategy: render an invisible measurement copy *inside* the same
 * container (so it inherits the real constrained width), set candidate
 * font sizes on it, measure each line's natural width by giving it
 * `white-space: nowrap` and reading scrollWidth, and binary-search for
 * the largest size where every line stays under the container's width.
 */
export default function FitText({ children, className = '', minSize = 14, maxSize = 96 }) {
  const containerRef = useRef(null)
  const measureRef = useRef(null)
  const [fontSize, setFontSize] = useState(maxSize)

  useLayoutEffect(() => {
    const measureEl = measureRef.current
    const containerEl = containerRef.current
    if (!measureEl || !containerEl) return

    let raf = null

    const fit = () => {
      // The container is display: block so its clientWidth is the
      // real width we have to fit text into.
      const availableWidth = containerEl.clientWidth
      if (availableWidth <= 0) return

      let low = minSize
      let high = maxSize
      let best = minSize

      // Binary search: largest font size where every nowrap line fits
      while (low <= high) {
        const mid = Math.floor((low + high) / 2)
        measureEl.style.fontSize = `${mid}px`
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

    // Re-fit when the container's width changes (rotation, resize, etc.)
    const ro = new ResizeObserver(() => {
      if (raf) cancelAnimationFrame(raf)
      raf = requestAnimationFrame(fit)
    })
    ro.observe(containerEl)

    return () => {
      ro.disconnect()
      if (raf) cancelAnimationFrame(raf)
    }
  }, [children, minSize, maxSize])

  const lines = Array.isArray(children) ? children : [children]

  return (
    <span
      ref={containerRef}
      className={`fit-text ${className}`}
      style={{
        display: 'block',
        width: '100%',
        fontSize: `${fontSize}px`,
        lineHeight: 1,
        position: 'relative'
      }}
    >
      {/* Measure copy — invisible, but lives INSIDE the constrained
          container so its lines wrap against the same width.
          We give each line nowrap so scrollWidth reports the natural
          width the line would want at the candidate font size. */}
      <span
        ref={measureRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          visibility: 'hidden',
          pointerEvents: 'none',
          top: 0,
          left: 0,
          width: 'auto',
          maxWidth: 'none',
          whiteSpace: 'nowrap'
        }}
      >
        {lines.map((line, i) => (
          <span
            key={i}
            className="fit-text__line"
            style={{ display: 'block', whiteSpace: 'nowrap' }}
          >
            {line}
          </span>
        ))}
      </span>

      {/* Actual rendered content at the resolved size */}
      {lines.map((line, i) => (
        <span key={i} style={{ display: 'block', whiteSpace: 'nowrap' }}>
          {line}
        </span>
      ))}
    </span>
  )
}
