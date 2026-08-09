function LeaderChapter({ leader, group, labels, index }) {
  return (
    <article className={`leader-chapter leader-chapter--${leader.personality || 'balanced'}`} data-leader-id={leader.id} data-leader-index={index}>
      <div className="leader-chapter__portrait-wrap">
        <div className="leader-chapter__portrait-atmosphere" aria-hidden="true" />
        <div className="leader-chapter__portrait">
          {leader.photo && <img src={leader.photo.src} alt={leader.photo.alt || `${leader.name}, ${leader.role}`} loading="lazy" />}
          {!leader.photo && <span className="leader-chapter__portrait-signal" aria-hidden="true">IIC</span>}
        </div>
      </div>
      <div className="leader-chapter__copy">
        <p className="leader-chapter__group">{group.label}</p>
        <blockquote className="leader-chapter__quote"><span>“</span>{leader.quote}<cite>— {leader.name}</cite></blockquote>
        <div className="leader-chapter__identity"><h3>{leader.name}</h3><p>{leader.role}{leader.department && ` · ${leader.department}`}</p>{leader.term && <span><b>{labels.tenure}</b>{leader.term}</span>}</div>
        {leader.insight && <p className="leader-chapter__insight"><span>{labels.insight}</span>{leader.insight}</p>}
        {leader.featuredProject && <div className="leader-chapter__project"><span>{labels.featuredContribution}</span><strong>{leader.featuredProject.title}</strong><p>{leader.featuredProject.description}</p>{leader.featuredProject.link && <a href={leader.featuredProject.link}>Explore contribution <span aria-hidden="true">↗</span></a>}</div>}
        {(leader.linkedin || leader.email) && <div className="leader-chapter__links"><span>{labels.connect}</span>{leader.linkedin && <a href={leader.linkedin} aria-label={`${leader.name} on LinkedIn`}>LinkedIn</a>}{leader.email && <a href={`mailto:${leader.email}`} aria-label={`Email ${leader.name}`}>Email</a>}</div>}
      </div>
    </article>
  )
}

export default LeaderChapter
