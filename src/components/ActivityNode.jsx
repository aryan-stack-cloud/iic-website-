function Evidence({ evidence }) {
  if (!evidence) return null
  return <span className="activity-node__evidence"><b>{evidence.label}</b>{evidence.value}</span>
}

export function ActivityNode({ activity, active, related, onActivate, onDeactivate }) {
  return (
    <button
      type="button"
      className={`activity-node activity-node--${activity.tone} activity-node--${activity.personality} ${active ? 'is-active' : ''} ${related ? 'is-related' : ''}`}
      data-activity-id={activity.id}
      aria-pressed={active}
      onMouseEnter={() => onActivate(activity.id)}
      onMouseLeave={onDeactivate}
      onFocus={() => onActivate(activity.id)}
      onBlur={onDeactivate}
      onClick={() => onActivate(activity.id)}
    >
      <span className="activity-node__halo" aria-hidden="true" />
      <span className="activity-node__orbit activity-node__orbit--one" aria-hidden="true" />
      <span className="activity-node__orbit activity-node__orbit--two" aria-hidden="true" />
      <span className="activity-node__name">{activity.name}</span>
      <span className="activity-node__detail">{activity.description}</span>
      <Evidence evidence={activity.evidence} />
      <span className="activity-node__continue" aria-hidden="true">continue ↗</span>
    </button>
  )
}
