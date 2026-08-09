import { useEffect, useRef } from 'react'
import { about } from '../content'
import '../styles/about.css'

function ForceWords({ force, tone }) {
  return (
    <div className={`about-force about-force--${tone}`} aria-hidden="true">
      <span className="about-force__label">{force.label}</span>
      {force.words.map((word, index) => <span className="about-force__word" style={{ '--word-index': index }} key={word}>{word}</span>)}
    </div>
  )
}

function AboutIIC() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined
    const observer = new IntersectionObserver(([entry]) => section.classList.toggle('is-visible', entry.isIntersecting), { threshold: 0.28 })
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="about-iic" id="about" ref={sectionRef} aria-labelledby="about-title">
      <div className="about-iic__noise" aria-hidden="true" />
      <div className="about-iic__header">
        <span className="about-iic__index">{about.indexLabel}</span>
        <span className="about-iic__rule" />
        <span className="about-iic__mic">{about.micLine}</span>
      </div>
      <div className="about-iic__content">
        <div className="about-iic__copy">
          <p className="about-iic__eyebrow">{about.eyebrow}</p>
          <h2 id="about-title">{about.title[0]}<br /><em>{about.title[1]}</em></h2>
          <p className="about-iic__intro">{about.intro}</p>
        </div>
        <div className="about-iic__visual" aria-hidden="true">
          <ForceWords force={about.forces.cool} tone="cool" />
          <div className="about-connection"><span className="about-connection__core">IIC</span><i /><i /><i /></div>
          <ForceWords force={about.forces.warm} tone="warm" />
          <span className="about-iic__equation">{about.equation.map((part, index) => index % 2 ? <b key={`${part}-${index}`}>{part}</b> : index === about.equation.length - 1 ? <strong key={`${part}-${index}`}>{part}</strong> : <span key={`${part}-${index}`}>{part}</span>)}</span>
        </div>
      </div>
    </section>
  )
}

export default AboutIIC
