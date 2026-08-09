import { useEffect, useRef, useState } from 'react'
import { ActivityNode } from './ActivityNode'
import { createWhatWeDoTimeline } from '../controllers/WhatWeDoTimeline'
import { whatWeDo } from '../content'

function WhatWeDo() {
  const sectionRef = useRef(null)
  const [activeId, setActiveId] = useState(null)
  useEffect(() => createWhatWeDoTimeline(sectionRef.current), [])

  const relatedIds = new Set(whatWeDo.connections.flatMap(([from, to]) => from === activeId ? [to] : to === activeId ? [from] : []))

  return (
    <section className="what-we-do" id="what-we-do" ref={sectionRef} aria-labelledby="what-we-do-title">
      <span className="what-we-do__entry" aria-hidden="true" />
      <div className="what-we-do__header">
        <p className="what-we-do__eyebrow">{whatWeDo.eyebrow}</p>
        <h2 className="what-we-do__title" id="what-we-do-title">{whatWeDo.title[0]}<br /><em>{whatWeDo.title[1]}</em></h2>
        <p className="what-we-do__intro">{whatWeDo.intro}</p>
      </div>
      <div className="what-we-do__body">
        <aside className="what-we-do__statement"><p>{whatWeDo.statement[0]}<br />{whatWeDo.statement[1]}<br />{whatWeDo.statement[2]}</p><div className="what-we-do__legend"><span className="is-cool"><i />{whatWeDo.legend.cool}</span><span className="is-warm"><i />{whatWeDo.legend.warm}</span><span className="is-bridge"><i />{whatWeDo.legend.bridge}</span></div></aside>
        <div className="what-we-do__ecosystem">
          <svg className="what-we-do__edges" viewBox="0 0 1000 620" preserveAspectRatio="none" aria-hidden="true">
            <defs><filter id="currentGlow" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="3" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter></defs>
            {whatWeDo.graphEdges.map((edge, index) => {
              const edgeActive = edge.from === activeId || edge.to === activeId
              const edgeRelated = relatedIds.has(edge.from) || relatedIds.has(edge.to)
              return <path className={`what-we-do__edge what-we-do__edge--${edge.tone} ${edgeActive ? 'is-active' : ''} ${edgeRelated ? 'is-related' : ''}`} data-edge-from={edge.from} data-edge-to={edge.to} d={edge.d} id={`what-edge-${index}`} pathLength="1" key={`${edge.from}-${edge.to}-${index}`} />
            })}
            {whatWeDo.graphEdges.map((edge, index) => <circle className={`what-we-do__flow what-we-do__flow--${edge.tone}`} filter="url(#currentGlow)" r="2.3" key={`flow-${index}`}><animateMotion dur={`${5.2 + (index % 4) * .8}s`} begin={`${(index % 5) * -.7}s`} repeatCount="indefinite" rotate="auto"><mpath href={`#what-edge-${index}`} /></animateMotion></circle>)}
          </svg>
          {whatWeDo.activities.map((activity) => <ActivityNode key={activity.id} activity={activity} active={activeId === activity.id} related={relatedIds.has(activity.id)} onActivate={setActiveId} onDeactivate={() => setActiveId(null)} />)}
        </div>
      </div>
    </section>
  )
}

export default WhatWeDo
