import { useEffect, useRef, useState } from 'react'
import { gallery, galleryPage } from '../content'
import { createGalleryTimeline } from '../controllers/GalleryTimeline'
import MemoryFrame from './MemoryFrame'
import '../styles/gallery.css'

function Gallery() {
  const sectionRef = useRef(null)
  const [activeId, setActiveId] = useState(null)
  const memories = gallery.items.filter((memory) => memory.media || memory.video)

  useEffect(() => {
    if (!memories.length) return undefined
    return createGalleryTimeline(sectionRef.current)
  }, [memories.length])

  if (!memories.length) return null

  const activeMemory = memories.find((memory) => memory.id === activeId)
  const relatedIds = new Set(memories.filter((memory) => activeMemory && memory.eventId === activeMemory.eventId).map((memory) => memory.id))

  return (
    <section className="gallery" id="gallery" ref={sectionRef} aria-labelledby="gallery-title">
      <header className="gallery__header">
        <span className="gallery__index">{galleryPage.indexLabel}</span>
        <h2 id="gallery-title">{galleryPage.title[0]}<br /><em>{galleryPage.title[1]}</em></h2>
        <p>{galleryPage.intro}</p>
      </header>
      <div className="gallery__wall">
        {memories.map((memory, index) => <MemoryFrame key={memory.id} memory={memory} index={index} active={activeId === memory.id} related={relatedIds.has(memory.id)} labels={galleryPage.labels} onActivate={setActiveId} onDeactivate={() => setActiveId(null)} />)}
      </div>
      <div className="gallery__handoff" aria-labelledby="gallery-join-title">
        <div className="gallery__empty-frame" aria-hidden="true"><span /></div>
        <p>{galleryPage.joinHandoff}</p>
        <h3 id="gallery-join-title">{galleryPage.joinLabel}</h3>
        <a href="#join">Join IIC <span aria-hidden="true">↗</span></a>
      </div>
    </section>
  )
}

export default Gallery
