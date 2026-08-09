import { useEffect, useRef } from 'react'
import { createEventDetailTimeline } from '../controllers/events/EventDetailTimeline'
import { events, page } from '../content/events'
import '../styles/events/event-detail.css'

function EventDetailPage({ eventId }) {
  const ref = useRef(null)
  const event = events.find((item) => item.id === eventId)
  useEffect(() => createEventDetailTimeline(ref.current), [])
  if (!event) return <main className="event-detail"><a href="/events">{page.detail.backLabel}</a><h1>Event not found.</h1></main>
  const media = event.media[0]
  return <main className={`event-detail event-detail--${event.experience?.atmosphere || 'archive'}`} ref={ref}><a className="event-detail__back" href="/events">← {page.detail.backLabel}</a><div className="event-detail__camera"><div className="event-detail__media">{media && <img src={media.src} alt={media.alt} />}</div><div className="event-detail__copy"><span>{event.eventType} / {event.date || event.year}</span><h1>{event.title}</h1><p>{event.description}</p><dl>{event.venue && <><dt>Venue</dt><dd>{event.venue}</dd></>}{event.activities.length > 0 && <><dt>Documented activities</dt><dd>{event.activities.join(' · ')}</dd></>}</dl><small>{page.detail.sourceLabel} / pages {event.sourcePages.join(', ')}</small></div></div></main>
}

export default EventDetailPage
