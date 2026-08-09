import { useEffect, useRef } from 'react'
import { createCursorController } from '../controllers/CursorController'
import { createScrollTimeline } from '../controllers/ScrollTimeline'
import { transition } from '../content'
import { WordFragment } from './WordFragment'
import '../styles/scene2.css'

const particleCount = Array.from({ length: 42 }, (_, index) => index)

function Scene2() {
  const rootRef = useRef(null)
  const sceneRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    const scene = sceneRef.current
    if (!root || !scene) return undefined
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const stopCursor = createCursorController(scene, { reducedMotion })
    const stopScroll = createScrollTimeline({ stage: root.closest('.hero-stage'), scene, reducedMotion })
    return () => { stopCursor(); stopScroll() }
  }, [])

  return (
    <div className="scene2-host" ref={rootRef}>
      <div className="scene2" ref={sceneRef} aria-label={transition.id}>
        <div className="scene2-camera">
          <div className="scene2-world" aria-hidden="true" />
          <div className="scene2-sentence" aria-hidden="true">{transition.sentence.map((step) => <span className="scene2-sentence__step" key={step}>{step}</span>)}</div>
          <div className="scene2-fragments" aria-hidden="true">{transition.words.map((word, index) => <WordFragment key={word.id} word={word.label} tone={word.tone} entry={word.entry} index={index} className="scene2-word--ambient" style={{ left: word.left, top: word.top }} />)}</div>
          <div className="scene2-particles" aria-hidden="true">{particleCount.map((index) => { const angle = (index / particleCount.length) * Math.PI * 2; const radius = 12 + (index % 7) * 3; return <i className={`scene2-particle scene2-particle--${index % 2 ? 'cool' : 'warm'}`} key={index} style={{ '--particle-index': index, '--particle-left': `${Math.cos(angle) * radius}vw`, '--particle-top': `${Math.sin(angle) * radius}vh` }} /> })}</div>
          <div className="scene2-connections" aria-hidden="true"><i className="scene2-connection scene2-connection--one" /><i className="scene2-connection scene2-connection--two" /><i className="scene2-connection scene2-connection--three" /><i className="scene2-connection scene2-connection--four" /></div>
          <div className="scene2-handoff" aria-hidden="true"><span /><span /><span /></div>
        </div>
        <p className="sr-only">{transition.id}</p>
      </div>
    </div>
  )
}

export default Scene2
