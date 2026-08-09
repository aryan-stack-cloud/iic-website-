import { useEffect, useRef } from 'react'

export function WordFragment({ word, tone = 'neutral', index = 0, entry = 0.12, className = '', style = {} }) {
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined
    const onEnter = () => node.dataset.active = 'true'
    const onLeave = () => delete node.dataset.active
    node.addEventListener('pointerenter', onEnter)
    node.addEventListener('pointerleave', onLeave)
    return () => {
      node.removeEventListener('pointerenter', onEnter)
      node.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <span
      ref={ref}
      className={`scene2-word scene2-word--${tone} ${className}`}
      data-word-fragment="true"
      data-index={index}
      data-entry={entry}
      style={{ '--fragment-entry': entry, '--fragment-index': index, ...style }}
    >
      {word}
    </span>
  )
}
