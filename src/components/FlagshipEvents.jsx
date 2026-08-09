import { useEffect, useRef } from 'react'
import { createFlagshipEventsTimeline } from '../controllers/FlagshipEventsTimeline'
import { flagshipEvents, flagshipEventsPage } from '../content'
import EventChapter from './EventChapter'
import '../styles/flagship-events.css'

function FlagshipEvents() {
  const sectionRef = useRef(null)
  useEffect(() => createFlagshipEventsTimeline(sectionRef.current), [])

  return (
    <section className="flagship-events" id="events" ref={sectionRef} aria-labelledby="flagship-events-title">
      <header className="flagship-events__header">
        <span className="flagship-events__index">{flagshipEventsPage.indexLabel}</span>
        <h2 id="flagship-events-title">{flagshipEventsPage.title[0]}<br /><em>{flagshipEventsPage.title[1]}</em></h2>
        <p>{flagshipEventsPage.intro}</p>
      </header>
      <div className="flagship-events__chapters">
        {flagshipEvents.map((event, index) => <EventChapter event={{ ...event, impactLabel: flagshipEventsPage.impactLabel, nextLabel: flagshipEventsPage.nextLabel, labels: flagshipEventsPage.labels }} index={index} isLast={index === flagshipEvents.length - 1} key={event.id} />)}
      </div>
    </section>
  )
}

export default FlagshipEvents
