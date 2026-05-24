import { useEffect, useRef } from 'react'

/**
 * Each zone describes where the "camera" is focused for that section.
 * BannerStage interpolates BETWEEN zones based on continuous scroll
 * progress, so the video glides smoothly as you scroll rather than
 * jumping when a section snaps into view.
 */
const BANNER_ZONES = [
  // 0 — HERO: full view
  { scale: 1.0, originX: 50, originY: 50, vignetteOpacity: 0.45,
    tint: [255, 255, 255, 0], saturate: 1.0, brightness: 1.0 },
  // 1 — CAT: upper-left of center. Text goes RIGHT.
  { scale: 2.4, originX: 32, originY: 28, vignetteOpacity: 0.65,
    tint: [255, 45, 149, 0.12], saturate: 1.15, brightness: 1.0 },
  // 2 — HOTDOG: lower-left. Text goes RIGHT.
  { scale: 2.5, originX: 28, originY: 70, vignetteOpacity: 0.7,
    tint: [255, 217, 61, 0.14], saturate: 1.2, brightness: 1.0 },
  // 3 — TEAM: pull back to a slightly dimmed wide shot so the team grid is the focus
  { scale: 1.05, originX: 50, originY: 50, vignetteOpacity: 0.85,
    tint: [0, 0, 0, 0.2], saturate: 0.85, brightness: 0.55 },
  // 4 — GPU: far-right. Text goes LEFT.
  { scale: 2.4, originX: 82, originY: 55, vignetteOpacity: 0.7,
    tint: [0, 191, 255, 0.15], saturate: 1.2, brightness: 1.0 },
  // 5 — TOMBSTONE: far-left. Text goes RIGHT (far away from grave).
  { scale: 2.6, originX: 8, originY: 38, vignetteOpacity: 0.78,
    tint: [120, 80, 200, 0.22], saturate: 0.7, brightness: 0.85 },
  // 6 — CLOSING: pull back, slight darken
  { scale: 1.15, originX: 50, originY: 50, vignetteOpacity: 0.75,
    tint: [255, 255, 255, 0], saturate: 1.05, brightness: 0.9 }
]

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

function lerp(a, b, t) { return a + (b - a) * t }

function lerpRgba(a, b, t) {
  return [
    Math.round(lerp(a[0], b[0], t)),
    Math.round(lerp(a[1], b[1], t)),
    Math.round(lerp(a[2], b[2], t)),
    lerp(a[3], b[3], t)
  ]
}

export default function BannerStage({ rawProgress }) {
  const videoRef = useRef(null)

  // Make sure video actually plays. Some mobile browsers need
  // an explicit .play() call after mount, and we want to recover
  // gracefully if autoplay was blocked.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const tryPlay = () => {
      const playPromise = video.play()
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {
          // Autoplay blocked — attach a one-shot listener to start
          // on the first user interaction.
          const start = () => {
            video.play().catch(() => {})
            window.removeEventListener('pointerdown', start)
            window.removeEventListener('keydown', start)
          }
          window.addEventListener('pointerdown', start, { once: true })
          window.addEventListener('keydown', start, { once: true })
        })
      }
    }

    if (video.readyState >= 2) {
      tryPlay()
    } else {
      video.addEventListener('loadeddata', tryPlay, { once: true })
    }
  }, [])

  const maxIdx = BANNER_ZONES.length - 1
  const clamped = Math.max(0, Math.min(maxIdx, rawProgress))
  const lower = Math.floor(clamped)
  const upper = Math.min(maxIdx, lower + 1)
  const t = easeInOutCubic(clamped - lower)

  const a = BANNER_ZONES[lower]
  const b = BANNER_ZONES[upper]

  const scale = lerp(a.scale, b.scale, t)
  const originX = lerp(a.originX, b.originX, t)
  const originY = lerp(a.originY, b.originY, t)
  const vignetteOpacity = lerp(a.vignetteOpacity, b.vignetteOpacity, t)
  const tint = lerpRgba(a.tint, b.tint, t)
  const saturate = lerp(a.saturate, b.saturate, t)
  const brightness = lerp(a.brightness, b.brightness, t)

  const style = {
    '--banner-scale': scale.toFixed(3),
    '--banner-origin-x': `${originX.toFixed(2)}%`,
    '--banner-origin-y': `${originY.toFixed(2)}%`,
    '--banner-vignette': `radial-gradient(ellipse at center, rgba(10,10,31,0) 25%, rgba(10,10,31,${vignetteOpacity.toFixed(3)}) 85%)`,
    '--banner-tint': `rgba(${tint[0]}, ${tint[1]}, ${tint[2]}, ${tint[3].toFixed(3)})`,
    '--banner-filter': `saturate(${saturate.toFixed(2)}) brightness(${brightness.toFixed(2)})`
  }

  return (
    <div className="banner-stage" style={style} aria-hidden="true">
      <video
        ref={videoRef}
        className="banner-stage__media"
        src="/images/banner.mp4"
        poster="/images/banner.png"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />
      <div className="banner-stage__tint" />
      <div className="banner-stage__vignette" />
    </div>
  )
}

export { BANNER_ZONES }
