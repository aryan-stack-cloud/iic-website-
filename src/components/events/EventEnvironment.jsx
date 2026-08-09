function EventEnvironment({ event, index, onOpen }) {
  const media = event.media[0]
  const profile = event.experience || {}
  return <article className={`event-environment event-environment--${profile.atmosphere || 'archive'}`} data-event-id={event.id} data-event-index={index}><div className="event-environment__number">{String(index + 1).padStart(2, '0')}</div><div className="event-environment__media">{media && <img src={media.src} alt={media.alt} loading="lazy" />}</div><div className="event-environment__copy"><span>{event.eventType} / {event.date || event.year}</span><h3>{event.title}</h3><p>{event.description}</p><button type="button" onClick={() => onOpen(event.id)}>Enter memory <span aria-hidden="true">↗</span></button></div></article>
}

export default EventEnvironment
