import { useMemo, useState } from 'react'

function EventExplorer({ events, categories, stages, page, onSelect }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [stage, setStage] = useState('all')
  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return events.filter((event) => (!normalized || [event.title, event.eventType, event.year, event.category, event.theme, ...event.keywords, ...event.activities].filter(Boolean).join(' ').toLowerCase().includes(normalized)) && (category === 'all' || event.category === category) && (stage === 'all' || event.stages.includes(stage)))
  }, [events, query, category, stage])
  return <section className="event-explorer" id="explore"><header><span className="events-page__eyebrow">{page.explorer.eyebrow}</span><h2>{page.explorer.title[0]}<br /><em>{page.explorer.title[1]}</em></h2></header><div className="event-explorer__controls"><label><span className="sr-only">{page.explorer.searchPlaceholder}</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={page.explorer.searchPlaceholder} /></label><select aria-label="Filter by category" value={category} onChange={(event) => setCategory(event.target.value)}><option value="all">All categories</option>{categories.map((item) => <option value={item.id} key={item.id}>{item.label}</option>)}</select><select aria-label="Filter by growth stage" value={stage} onChange={(event) => setStage(event.target.value)}><option value="all">All stages</option>{stages.map((item) => <option value={item.id} key={item.id}>{item.label}</option>)}</select></div><div className="event-explorer__results">{results.map((event) => <button type="button" key={event.id} onClick={() => onSelect(event.id)}><span>{event.year || '—'} / {event.eventType}</span><strong>{event.title}</strong><small>{event.theme}</small></button>)}{!results.length && <p className="event-explorer__empty">{page.explorer.empty}</p>}</div></section>
}

export default EventExplorer
