import { StrictMode, useEffect, useMemo, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import AboutIIC from './components/AboutIIC'
import Scene2 from './components/Scene2'
import WhatWeDo from './components/WhatWeDo'
import FlagshipEvents from './components/FlagshipEvents'
import Leadership from './components/Leadership'
import Gallery from './components/Gallery'
import JoinIIC from './components/JoinIIC'
import EventDetailPage from './pages/EventDetailPage'
import EventsPage from './pages/EventsPage'
import { hero, navigation } from './content'
import { social } from './config'
import './styles.css'
import './styles/what-we-do.css'

const navItems = navigation.items.slice(1)

function Arrow({ direction = '↗' }) {
  return <span className="arrow" aria-hidden="true">{direction}</span>
}

function SignalMark() {
  return (
    <span className="signal-mark" aria-hidden="true">
      <i /><i /><i /><i />
    </span>
  )
}

/** The badge stays vector-based so it remains sharp at every viewport size. */
function InnovationBadge() {
  return (
    <div className="innovation-badge" aria-label="Institution's Innovation Council mark" role="img">
      <svg viewBox="0 0 220 220" aria-hidden="true">
        <defs>
          <linearGradient id="badgeWarm" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffb14d" />
            <stop offset="1" stopColor="#d6321f" />
          </linearGradient>
          <linearGradient id="badgeCool" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#9dc8ff" />
            <stop offset="1" stopColor="#1b2a6b" />
          </linearGradient>
          <filter id="badgeGlow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <circle className="badge-ring badge-ring--outer" cx="110" cy="110" r="90" />
        <circle className="badge-ring badge-ring--inner" cx="110" cy="110" r="74" />
        <path className="badge-orbit badge-orbit--warm" d="M 36 110 C 57 64, 91 46, 110 46 C 139 46, 164 69, 183 110" />
        <path className="badge-orbit badge-orbit--cool" d="M 37 110 C 58 156, 92 174, 110 174 C 140 174, 164 150, 183 110" />
        <g className="badge-signal" filter="url(#badgeGlow)">
          <path d="M 71 119 L 71 102 L 82 102 L 82 119" />
          <path d="M 89 119 L 89 83 L 100 83 L 100 119" />
          <path d="M 107 119 L 107 64 L 118 64 L 118 119" />
          <path d="M 125 119 L 125 92 L 136 92 L 136 119" />
          <path d="M 143 119 L 143 76 L 154 76 L 154 119" />
          <path d="M 68 132 C 85 143, 137 143, 157 132" />
        </g>
        <text x="110" y="151" textAnchor="middle">IIC</text>
      </svg>
      <span className="badge-scan" aria-hidden="true" />
    </div>
  )
}

function EnergySystem() {
  const warmPaths = useMemo(() => Array.from({ length: 34 }, (_, index) => {
    const end = 800 - (index * 21)
    const spread = index * 28
    return `M 800 188 C ${800 - spread * 0.1} 320, ${800 - spread * 0.42} 500, ${end} 760`
  }), [])

  const coolPaths = useMemo(() => Array.from({ length: 34 }, (_, index) => {
    const end = 800 + (index * 21)
    const spread = index * 28
    return `M 800 188 C ${800 + spread * 0.1} 320, ${800 + spread * 0.42} 500, ${end} 760`
  }), [])

  return (
    <svg className="energy-system" viewBox="0 0 1600 760" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="warmEnergy" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffcf77" stopOpacity="0" />
          <stop offset=".48" stopColor="#f5a623" stopOpacity=".8" />
          <stop offset="1" stopColor="#d6321f" />
        </linearGradient>
        <linearGradient id="coolEnergy" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d7ebff" stopOpacity="0" />
          <stop offset=".48" stopColor="#6e9fe0" stopOpacity=".8" />
          <stop offset="1" stopColor="#1b2a6b" />
        </linearGradient>
        <filter id="energyGlow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="2.4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="energyAura" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
      </defs>
      <g className="energy-aura" filter="url(#energyAura)">
        <path d="M 800 185 C 760 340, 560 530, 180 760" stroke="url(#warmEnergy)" />
        <path d="M 800 185 C 840 340, 1040 530, 1420 760" stroke="url(#coolEnergy)" />
      </g>
      <g className="energy-lines" filter="url(#energyGlow)">
        <g className="energy-lines__warm">
          {warmPaths.map((d, index) => <path className="energy-line energy-line--warm" style={{ '--line-index': index }} d={d} key={`warm-${index}`} pathLength="1" />)}
        </g>
        <g className="energy-lines__cool">
          {coolPaths.map((d, index) => <path className="energy-line energy-line--cool" style={{ '--line-index': index }} d={d} key={`cool-${index}`} pathLength="1" />)}
        </g>
      </g>
      <g className="energy-core" filter="url(#energyGlow)">
        <path d="M 800 188 C 785 340, 770 520, 752 760" stroke="url(#warmEnergy)" />
        <path d="M 800 188 C 815 340, 830 520, 848 760" stroke="url(#coolEnergy)" />
      </g>
    </svg>
  )
}

/** The short hand-off aperture between the locked Hero and the About scene. */
function HeroTransition() {
  return (
    <div className="hero-transition" aria-hidden="true">
      <Scene2 />
      <div className="hero-transition__aperture" />
      <span className="hero-transition__signal">signal received</span>
    </div>
  )
}

function HeroNav({ menuOpen, onMenuToggle, scrolled, activeSection }) {
  const isTargetActive = (target) => {
    const id = target.replace('#', '')
    if (id === 'hero' && (!activeSection || activeSection === 'hero')) return true
    return activeSection === id
  }

  const handleNavClick = (e, target) => {
    if (target.startsWith('#')) {
      e.preventDefault()
      const element = document.querySelector(target)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
        if (menuOpen) onMenuToggle()
      }
    } else if (target.startsWith('/')) {
      e.preventDefault()
      window.history.pushState({}, '', target)
      window.dispatchEvent(new Event('popstate'))
      if (menuOpen) onMenuToggle()
    }
  }

  return (
    <>
      <header className={`hero-nav ${scrolled ? 'hero-nav--scrolled' : ''}`}>
        <a className="hero-brand" href="#hero" onClick={(e) => handleNavClick(e, '#hero')} aria-label="IIC JSS Noida home">
          <SignalMark />
          <span className="hero-brand__copy"><strong>IIC</strong><small>JSS NOIDA</small></span>
        </a>
        <nav className="hero-nav__links" aria-label="Primary navigation">
          <a className={isTargetActive('#hero') ? 'is-active' : ''} href="#hero" onClick={(e) => handleNavClick(e, '#hero')} aria-current={isTargetActive('#hero') ? 'page' : undefined}><span>00</span>Home</a>
          {navItems.map((item, index) => {
            const active = isTargetActive(item.target)
            return (
              <a
                className={active ? 'is-active' : ''}
                href={item.target}
                key={item.label}
                onClick={(e) => handleNavClick(e, item.target)}
                aria-current={active ? 'page' : undefined}
              >
                <span>0{index + 1}</span>{item.label}
              </a>
            )
          })}
        </nav>
        <a className="hero-nav__cta" href={hero.primaryCta.href}>{hero.primaryCta.label} <Arrow /></a>
        <button className={`menu-toggle ${menuOpen ? 'is-open' : ''}`} onClick={onMenuToggle} aria-expanded={menuOpen} aria-label="Toggle navigation"><span /><span /></button>
      </header>
      <div className={`mobile-nav ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        <a className={isTargetActive('#hero') ? 'is-active' : ''} href="#hero" onClick={(e) => handleNavClick(e, '#hero')}>Home <Arrow /></a>
        {navItems.map((item) => {
          const active = isTargetActive(item.target)
          return (
            <a
              className={active ? 'is-active' : ''}
              href={item.target}
              onClick={(e) => handleNavClick(e, item.target)}
              key={item.label}
            >
              {item.label} <Arrow />
            </a>
          )
        })}
        <a className="mobile-nav__action" href={hero.primaryCta.href} onClick={onMenuToggle}>{hero.primaryCta.label} <Arrow /></a>
      </div>
    </>
  )
}

function Hero() {
  const stageRef = useRef(null)
  const heroRef = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(query.matches)
    update()
    query.addEventListener?.('change', update)
    return () => query.removeEventListener?.('change', update)
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll('section[id], div[id="hero"]')
    if (!sections.length) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.35 }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return undefined
    let frame = 0
    const update = () => {
      frame = 0
      const rect = stage.getBoundingClientRect()
      const maxScroll = Math.max(stage.offsetHeight - window.innerHeight, 1)
      const progress = Math.min(1, Math.max(0, -rect.top / maxScroll))
      stage.style.setProperty('--scroll-progress', progress.toFixed(4))
      setScrolled(window.scrollY > 24)
    }
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    if (reducedMotion) return undefined
    const hero = heroRef.current
    if (!hero) return undefined
    let frame = 0
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0
    const render = () => {
      currentX += (targetX - currentX) * 0.08
      currentY += (targetY - currentY) * 0.08
      hero.style.setProperty('--pointer-x', `${currentX.toFixed(2)}px`)
      hero.style.setProperty('--pointer-y', `${currentY.toFixed(2)}px`)
      frame = window.requestAnimationFrame(render)
    }
    const onPointerMove = (event) => {
      targetX = (event.clientX / window.innerWidth - 0.5) * 18
      targetY = (event.clientY / window.innerHeight - 0.5) * 12
      hero.style.setProperty('--cursor-x', `${event.clientX}px`)
      hero.style.setProperty('--cursor-y', `${event.clientY}px`)
    }
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    frame = window.requestAnimationFrame(render)
    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      window.cancelAnimationFrame(frame)
    }
  }, [reducedMotion])

  return (
    <div className="hero-stage" ref={stageRef} id="hero">
      <HeroNav menuOpen={menuOpen} onMenuToggle={() => setMenuOpen((open) => !open)} scrolled={scrolled} activeSection={activeSection} />
      <section className="hero" ref={heroRef} aria-labelledby="hero-title">
        <div className="hero-atmosphere" aria-hidden="true" />
        <div className="hero-orbits" aria-hidden="true"><span /><span /><span /></div>
        <div className="hero-cursor" aria-hidden="true" />
        <EnergySystem />
        <div className="hero-content">
          <p className="hero-eyebrow">JSS Academy of Technical Education, Noida <span>—</span> EST. 2018</p>
          <InnovationBadge />
          <h1 className="hero-title" id="hero-title">
            <span className="hero-title__line hero-title__line--one"><span className="hero-title__accent">I</span>{hero.title[0].slice(1)}</span>
            <span className="hero-title__line hero-title__line--two"><span className="hero-title__accent">I</span>{hero.title[1].slice(1)}</span>
            <span className="hero-title__line hero-title__line--three"><span className="hero-title__accent">C</span>{hero.title[2].slice(1)} <small>{hero.year}</small></span>
          </h1>
          <p className="hero-tagline">{hero.tagline[0]} {hero.tagline[1]} <span>{hero.tagline[2]}</span></p>
          <div className="hero-actions">
            <a className="hero-button hero-button--warm magnetic" href={hero.primaryCta.href}>{hero.primaryCta.label} <Arrow /></a>
            <a className="hero-button hero-button--cool magnetic" href={hero.secondaryCta.href}>{hero.secondaryCta.label} <Arrow /></a>
          </div>
        </div>
        <div className="hero-meta hero-meta--left" aria-hidden="true"><span>01</span><i /><span>04</span></div>
        <div className="hero-meta hero-meta--right" aria-hidden="true"><span>28.5355° N</span><span>77.3910° E</span></div>
        <a className="hero-scroll-cue" href="#events"><span>Scroll to explore</span><i /></a>
        <div className="hero-social" aria-label="Social links">
          {social.links.map((link) => <a href={link.url} aria-label={link.label} key={link.id}>{link.shortLabel}</a>)}
        </div>
        <HeroTransition />
      </section>
    </div>
  )
}

function App() {
  const [path, setPath] = useState(window.location.pathname)

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  if (path === '/events') return <EventsPage />
  if (path.startsWith('/events/')) return <EventDetailPage eventId={path.split('/')[2]} />
  return <main aria-label="IIC JSS Noida homepage"><Hero /><AboutIIC /><WhatWeDo /><FlagshipEvents /><Leadership /><Gallery /><JoinIIC /></main>
}

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>)
