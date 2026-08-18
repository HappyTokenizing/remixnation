import { useEffect } from 'react'

/**
 * Sets --vh = 1% of the viewport height.
 *
 * iOS-specific guard: Safari fires resize events as the URL bar
 * collapses/expands during scroll. Updating --vh then resizes every
 * section mid-scroll and makes the page visibly jump. So we only
 * update when the WIDTH changes (rotation / real window resize) —
 * height-only changes from browser chrome are ignored. The sections
 * are transparent overlays on a fixed full-screen banner, so a frozen
 * height never produces visible seams.
 */
export default function useViewportHeight() {
  useEffect(() => {
    let lastWidth = window.innerWidth

    const set = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }

    set()

    const onResize = () => {
      if (window.innerWidth !== lastWidth) {
        lastWidth = window.innerWidth
        set()
      }
    }

    const onOrientation = () => {
      lastWidth = window.innerWidth
      // Give the browser a beat to settle its new dimensions
      setTimeout(set, 250)
    }

    window.addEventListener('resize', onResize)
    window.addEventListener('orientationchange', onOrientation)
    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('orientationchange', onOrientation)
    }
  }, [])
}
