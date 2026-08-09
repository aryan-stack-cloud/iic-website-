import { useEffect, useRef, useState } from 'react'
import { join } from '../content'
import { createJoinTimeline } from '../controllers/JoinTimeline'
import '../styles/join.css'

function JoinIIC() {
  const sectionRef = useRef(null)
  const [activePrinciple, setActivePrinciple] = useState(null)
  const [frameCaptured, setFrameCaptured] = useState(false)

  useEffect(() => createJoinTimeline(sectionRef.current), [])

  return (
    <section className="join-iic" id="join" ref={sectionRef} aria-labelledby="join-title">
      <div className={`join-iic__frame ${frameCaptured ? 'is-captured' : ''}`} aria-hidden="true"><span /></div>
      <div className="join-iic__content">
        <span className="join-iic__index">{join.indexLabel}</span>
        <p className="join-iic__line join-iic__line--first">{join.openingLine}</p>
        <h2 id="join-title" className="join-iic__line join-iic__line--second">{join.secondLine}</h2>
        <div className="join-iic__principles" aria-label="IIC principles">
          {join.principles.map((principle) => <button type="button" className={`join-principle ${activePrinciple === principle.id ? 'is-active' : ''}`} key={principle.id} onMouseEnter={() => setActivePrinciple(principle.id)} onMouseLeave={() => setActivePrinciple(null)} onFocus={() => setActivePrinciple(principle.id)} onBlur={() => setActivePrinciple(null)}><span>{principle.label}</span><small>{principle.whisper}</small></button>)}
        </div>
        <a className="join-iic__cta" href={join.cta.href} onMouseEnter={() => setFrameCaptured(true)} onFocus={() => setFrameCaptured(true)} onClick={() => setFrameCaptured(true)}>{join.cta.label}<span aria-hidden="true">↗</span></a>
      </div>
    </section>
  )
}

export default JoinIIC
