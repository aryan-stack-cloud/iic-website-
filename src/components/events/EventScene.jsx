import { useEffect, useRef } from 'react'
import { createEventSceneTimeline } from '../../controllers/events/EventSceneTimeline'
import '../../styles/events/event-scene.css'

function PhotoSlot({ photo, index, register }) {
  if (!photo) return null
  return <figure className={`event-scene__photo event-scene__photo--${index + 1}`} ref={register}><img src={photo.src} alt={photo.alt || 'Authentic IIC event photograph'} loading="lazy" /></figure>
}

export default function EventScene({ event, poster, photos = [], backgroundImage, lightingColor = '#f1a52b', onExplore }) {
  const sceneRef = useRef(null)
  const cameraRef = useRef(null)
  const posterRef = useRef(null)
  const sweepRef = useRef(null)
  const seamRef = useRef(null)
  const backgroundRef = useRef(null)
  const photoRefs = useRef([])
  const copyRefs = useRef([])

  useEffect(() => {
    const scene = sceneRef.current
    if (!scene) return undefined
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const controller = createEventSceneTimeline({ scene, camera: cameraRef.current, poster: posterRef.current, sweep: sweepRef.current, seam: seamRef.current, photos: photoRefs.current, copy: copyRefs.current, background: backgroundRef.current, reducedMotion })
    return () => controller.kill()
  }, [])

  const addCopyRef = (node) => { if (node && !copyRefs.current.includes(node)) copyRefs.current.push(node) }
  const addPhotoRef = (node) => { if (node && !photoRefs.current.includes(node)) photoRefs.current.push(node) }

  return <section className="event-scene" ref={sceneRef} style={{ '--event-light': lightingColor }} aria-labelledby={`event-scene-title-${event.id}`}>
    {backgroundImage && <div className="event-scene__background" ref={backgroundRef} style={{ backgroundImage: `url(${backgroundImage})` }} aria-hidden="true" />}
    <div className="event-scene__camera" ref={cameraRef}>
      <div className="event-scene__editorial">
        <p className="event-scene__year" ref={addCopyRef}>{event.year}</p>
        <h1 id={`event-scene-title-${event.id}`} ref={addCopyRef}>{event.title}</h1>
        <p className="event-scene__statement" ref={addCopyRef}>{event.theme}</p>
        <p className="event-scene__description" ref={addCopyRef}>{event.description}</p>
        <div className="event-scene__metadata" ref={addCopyRef}>{event.date && <span>{event.date}</span>}{event.venue && <span>{event.venue}</span>}{event.sourcePages?.length > 0 && <span>Report p. {event.sourcePages.join(', ')}</span>}</div>
        <a className="event-scene__explore" ref={addCopyRef} href={`/events/${event.slug || event.id}`} onClick={onExplore}>Explore event <span aria-hidden="true">↗</span></a>
      </div>
      <div className="event-scene__visual">
        <div className="event-scene__poster-wrap" ref={posterRef}><span className="event-scene__sweep" ref={sweepRef} aria-hidden="true" />{poster && <img className="event-scene__poster" src={poster.src} alt={poster.alt || `${event.title} official poster`} loading="eager" />}<span className="event-scene__seam" ref={seamRef} aria-hidden="true" /></div>
        <div className="event-scene__photos" aria-label={`${event.title} photographs`}><PhotoSlot photo={photos[0]} index={0} register={addPhotoRef} /><PhotoSlot photo={photos[1]} index={1} register={addPhotoRef} /><PhotoSlot photo={photos[2]} index={2} register={addPhotoRef} /></div>
      </div>
    </div>
  </section>
}
