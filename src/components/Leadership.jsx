import { useEffect, useRef } from 'react'
import { createLeadershipTimeline } from '../controllers/LeadershipTimeline'
import { leadership, leadershipPage } from '../content'
import LeaderChapter from './LeaderChapter'
import '../styles/leadership.css'

function Leadership() {
  const sectionRef = useRef(null)
  const activeGroups = new Set(leadership.selectedGroups)
  const groups = leadership.groups.filter((group) => activeGroups.has(group.id)).sort((a, b) => a.order - b.order)
  const leaders = leadership.members.filter((member) => activeGroups.has(member.groupId)).map((member) => ({ ...member, photo: member.photo || null }))

  useEffect(() => {
    if (!leaders.length) return undefined
    return createLeadershipTimeline(sectionRef.current)
  }, [leaders.length])

  if (!leaders.length) return null

  return (
    <section className="leadership" id="leadership" ref={sectionRef} aria-labelledby="leadership-title">
      <header className="leadership__header">
        <span className="leadership__index">{leadershipPage.indexLabel}</span>
        <h2 id="leadership-title">{leadershipPage.title[0]}<br /><em>{leadershipPage.title[1]}</em></h2>
        <p>{leadershipPage.intro}</p>
      </header>
      <div className="leadership__chapters">
        {leaders.map((leader, index) => <LeaderChapter key={leader.id} leader={leader} group={groups.find((group) => group.id === leader.groupId) || { label: leader.groupId }} labels={leadershipPage.labels} index={index} />)}
      </div>
      <div className="leadership__gallery-handoff" aria-hidden="true"><span>{leadershipPage.opening}</span><i /></div>
    </section>
  )
}

export default Leadership
