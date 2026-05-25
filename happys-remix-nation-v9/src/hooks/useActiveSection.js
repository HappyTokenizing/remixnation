import { useEffect, useState } from 'react'

export default function useActiveSection(containerRef, sectionCount) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const sectionHeight = window.innerHeight
      const idx = Math.round(container.scrollTop / sectionHeight)
      setActive(Math.min(Math.max(idx, 0), sectionCount - 1))
    }

    handleScroll()
    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => container.removeEventListener('scroll', handleScroll)
  }, [containerRef, sectionCount])

  return active
}
