function MemoryFrame({ memory, index, active, related, labels, onActivate, onDeactivate }) {
  const media = memory.video || memory.media
  const isVideo = Boolean(memory.video)

  return (
    <article className={`memory-frame memory-frame--${memory.depth || 'mid'} ${active ? 'is-active' : ''} ${related ? 'is-related' : ''}`} data-memory-id={memory.id} data-event-id={memory.eventId} data-memory-index={index} tabIndex="0" onMouseEnter={() => onActivate(memory.id)} onMouseLeave={onDeactivate} onFocus={() => onActivate(memory.id)} onBlur={onDeactivate}>
      <div className="memory-frame__media-wrap">
        {isVideo ? <video autoPlay muted loop playsInline preload="metadata" poster={memory.media?.src} aria-label={memory.alt || memory.caption}><source src={media.src} type={media.type || 'video/mp4'} /></video> : <img src={media.src} alt={memory.alt || memory.caption} loading="lazy" />}
      </div>
      <div className="memory-frame__caption">
        <span className="memory-frame__context">{memory.event}{memory.year && ` • ${memory.year}`}</span>
        <p>{memory.caption}</p>
        {memory.photographer && <small>{labels.photographer} — {memory.photographer}</small>}
      </div>
    </article>
  )
}

export default MemoryFrame
