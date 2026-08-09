/**
 * Keeps pointer response off layout and on the compositor. The controller
 * writes only CSS variables, allowing Scene 2 to own its visual language.
 */
export function createCursorController(root, { reducedMotion = false } = {}) {
  if (!root || reducedMotion || !window.matchMedia('(pointer: fine)').matches) return () => {}

  const fragments = [...root.querySelectorAll('[data-word-fragment]')]
  let pointerX = window.innerWidth / 2
  let pointerY = window.innerHeight / 2
  let frame = 0

  const update = () => {
    frame = 0
    fragments.forEach((fragment) => {
      const rect = fragment.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const distance = Math.hypot(pointerX - centerX, pointerY - centerY)
      const influence = Math.max(0, 1 - distance / 240)
      const attractX = (pointerX - centerX) * influence * 0.12
      const attractY = (pointerY - centerY) * influence * 0.12
      fragment.style.setProperty('--attract-x', `${attractX.toFixed(2)}px`)
      fragment.style.setProperty('--attract-y', `${attractY.toFixed(2)}px`)
      fragment.style.setProperty('--proximity', influence.toFixed(3))
    })
  }

  const onMove = (event) => {
    pointerX = event.clientX
    pointerY = event.clientY
    if (!frame) frame = window.requestAnimationFrame(update)
  }

  window.addEventListener('pointermove', onMove, { passive: true })
  update()

  return () => {
    window.removeEventListener('pointermove', onMove)
    if (frame) window.cancelAnimationFrame(frame)
  }
}
