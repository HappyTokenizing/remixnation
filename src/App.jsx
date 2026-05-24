import { useRef } from 'react'
import BannerStage from './components/BannerStage'
import Header from './components/Header'
import SideNav from './components/SideNav'
import HeroSection from './sections/HeroSection'
import CatSection from './sections/CatSection'
import HotdogSection from './sections/HotdogSection'
import TeamSection from './sections/TeamSection'
import GpuSection from './sections/GpuSection'
import TombstoneSection from './sections/TombstoneSection'
import ClosingSection from './sections/ClosingSection'
import useViewportHeight from './hooks/useViewportHeight'
import useScrollProgress from './hooks/useScrollProgress'

import './styles/header.css'
import './styles/sidenav.css'
import './styles/sections.css'

const SECTION_COUNT = 7

function computeSectionOpacity(i, rawProgress) {
  const distance = Math.abs(rawProgress - i)
  if (distance >= 0.5) return 0
  if (distance <= 0.15) return 1
  const t = (0.5 - distance) / (0.5 - 0.15)
  return Math.max(0, Math.min(1, t))
}

export default function App() {
  useViewportHeight()

  const containerRef = useRef(null)
  const { activeIndex, rawProgress } = useScrollProgress(containerRef, SECTION_COUNT)

  const handleNavigate = (i) => {
    if (!containerRef.current) return
    containerRef.current.scrollTo({
      top: i * window.innerHeight,
      behavior: 'smooth'
    })
  }

  const op = (i) => computeSectionOpacity(i, rawProgress)

  return (
    <>
      <BannerStage rawProgress={rawProgress} />
      <Header />
      <SideNav count={SECTION_COUNT} active={activeIndex} onNavigate={handleNavigate} />

      <main ref={containerRef} className="scroll-container">
        <HeroSection opacity={op(0)} />
        <CatSection opacity={op(1)} />
        <HotdogSection opacity={op(2)} />
        <TeamSection opacity={op(3)} />
        <GpuSection opacity={op(4)} />
        <TombstoneSection opacity={op(5)} />
        <ClosingSection opacity={op(6)} />
      </main>
    </>
  )
}
