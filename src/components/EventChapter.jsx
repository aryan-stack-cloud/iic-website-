function EventMedia({ event }) {
  const image = event.gallery?.[0]
  const video = event.videos?.[0]
  return (
    <div className="event-chapter__media" data-empty={!image && !video ? 'true' : undefined}>
      <div className="event-chapter__media-wash" aria-hidden="true" />
      {video && <video autoPlay muted loop playsInline preload="metadata" poster={video.poster || image?.src} aria-label={`${event.title} video`}><source src={video.src} type={video.type || 'video/mp4'} /></video>}
      {!video && image && <img src={image.src} alt={image.alt || `${event.title} at IIC JSS Noida`} loading="lazy" />}
      <span className="event-chapter__media-index" aria-hidden="true">{event.id}</span>
    </div>
  )
}

function EventEvidence({ event }) {
  const facts = [event.year && { label: 'Year', value: event.year }, event.participation && { label: 'Participation', value: event.participation }, ...(event.verifiedStats || []).map((stat) => ({ label: stat.label, value: stat.value }))].filter(Boolean)
  if (!facts.length) return null
  return <div className="event-chapter__evidence" aria-label={event.labels.verifiedDetails}>{facts.map((fact) => <div className="event-chapter__fact" key={`${event.id}-${fact.label}`}><span>{fact.label}</span><strong>{fact.value}</strong></div>)}</div>
}

function EventChapter({ event, index, isLast }) {
  return (
    <article className={`event-chapter event-chapter--${event.rhythm}`} data-event-id={event.id} data-event-index={index}>
      <div className="event-chapter__inner">
        <div className="event-chapter__copy">
          <div className="event-chapter__meta"><span>{String(index + 1).padStart(2, '0')} / {event.eventType}</span><span>{event.theme}</span></div>
          <p className="event-chapter__opening">{event.opening}</p>
          <h3>{event.title}</h3>
          <p className="event-chapter__description">{event.description}</p>
          <EventEvidence event={event} />
          {event.quote && <blockquote className="event-chapter__quote"><span>“</span>{event.quote.text}<cite>— {event.quote.author}</cite></blockquote>}
          <div className="event-chapter__details">
            {[[event.labels.venue, event.venue], [event.labels.duration, event.duration], [event.labels.status, event.status]].filter(([, value]) => value).map(([label, value]) => <span key={label}><b>{label}</b>{value}</span>)}
          </div>
          {event.registrationLink && <a className="event-chapter__link" href={event.registrationLink}>{event.labels.register} <span aria-hidden="true">↗</span></a>}
        </div>
        <EventMedia event={event} />
        <p className="event-chapter__closing">{event.closing}</p>
      </div>
      {isLast && <div className="event-impact-bridge" aria-hidden="true"><span>{event.impactLabel}</span><i /><strong>{event.nextLabel}</strong></div>}
    </article>
  )
}

export default EventChapter
