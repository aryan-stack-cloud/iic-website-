import { useEffect, useRef } from 'react'
import { createEntranceTimeline } from '../../controllers/events/EntranceTimeline'
import '../../styles/events/exhibition-entrance.css'

/**
 * The Events page's opening room. It deliberately accepts all copy and media
 * from the content layer so its visual treatment is independent of the event.
 */
export default function ExhibitionEntrance({ entrance, featuredEvent }) {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const statementRef = useRef(null)
  const metadataRef = useRef(null)
  const posterRef = useRef(null)

  useEffect(() => {
    const timeline = createEntranceTimeline({
      section: sectionRef.current,
      heading: headingRef.current,
      statement: statementRef.current,
      metadata: metadataRef.current,
      poster: posterRef.current,
    })

    return () => timeline?.revert?.()
  }, [])

  const poster = featuredEvent?.media?.[0]

  return (
    <main className="exhibition-entrance" ref={sectionRef} aria-labelledby="exhibition-title">
      <div className="exhibition-entrance__room">
        <div className="exhibition-entrance__grid">
          <header className="exhibition-entrance__editorial">
            <h1 id="exhibition-title" ref={headingRef}>{entrance.title}</h1>
            <p className="exhibition-entrance__statement" ref={statementRef}>{entrance.statement}</p>
            <p className="exhibition-entrance__metadata" ref={metadataRef}>
              {entrance.institution.map((line) => <span key={line}>{line}</span>)}
            </p>
          </header>

          {poster && (
            <figure className="exhibition-entrance__poster" ref={posterRef}>
              <img src={poster.src} alt={poster.alt} fetchPriority="high" />
            </figure>
          )}
        </div>
      </div>
    </main>
  )
}
