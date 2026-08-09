import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const safeArray = (value) => Array.from(value || []).filter(Boolean)

export function createEventSceneTimeline({ scene, camera, poster, sweep, seam, photos, copy, background, reducedMotion }) {
  const photoNodes = safeArray(photos)
  const copyNodes = safeArray(copy)
  const timeline = gsap.timeline({ paused: true, defaults: { overwrite: 'auto' } })

  gsap.set([poster, sweep, seam, background, ...photoNodes, ...copyNodes].filter(Boolean), { clearProps: 'transform,opacity' })
  gsap.set(poster, { opacity: 0.12, scale: 0.98, xPercent: 0 })
  gsap.set(sweep, { opacity: 0, xPercent: -115 })
  gsap.set(seam, { opacity: 0, scaleY: 0.4 })
  gsap.set(photoNodes, { opacity: 0, yPercent: 7, scale: 0.985 })
  gsap.set(copyNodes, { opacity: 0, y: 20 })
  gsap.set(background, { opacity: 0, scale: 1.04 })
  gsap.set(camera, { scale: 1, xPercent: 0, yPercent: 0 })

  if (reducedMotion) {
    gsap.set([poster, ...photoNodes, ...copyNodes].filter(Boolean), { opacity: 1, y: 0, yPercent: 0, scale: 1, xPercent: 0 })
    gsap.set(seam, { opacity: 0.7, scaleY: 1 })
    gsap.set(background, { opacity: 0.06, scale: 1 })
    return { timeline, kill: () => timeline.kill() }
  }

  timeline
    .to(camera, { scale: 1.025, xPercent: 1.5, duration: 1.6, ease: 'power1.inOut' }, 0)
    .to(sweep, { opacity: 0.75, xPercent: 112, duration: 1.5, ease: 'expo.out' }, 1)
    .to(poster, { opacity: 1, duration: 1.25, ease: 'power2.out' }, 2.3)
    .to(seam, { opacity: 0.72, scaleY: 1, duration: 1.1, ease: 'power1.inOut' }, 4)
    .to(poster, { xPercent: -5, duration: 1.4, ease: 'power1.inOut' }, 5)
    .to(background, { opacity: 0.06, scale: 1, duration: 1.8, ease: 'power1.inOut' }, 4.4)

  photoNodes.forEach((photo, index) => {
    timeline.to(photo, { opacity: 1, yPercent: 0, scale: 1, duration: 1.3, ease: 'power2.out' }, 5.4 + index * 1.2)
  })

  copyNodes.forEach((node, index) => {
    timeline.to(node, { opacity: 1, y: 0, duration: 1.1, ease: 'power2.out' }, 9 + index * 0.55)
  })

  timeline.to(camera, { scale: 1, xPercent: 0, yPercent: 1, duration: 1.8, ease: 'power1.inOut' }, 11.5)

  const trigger = ScrollTrigger.create({ trigger: scene, start: 'top top', end: 'bottom bottom', scrub: 1, animation: timeline })
  return { timeline, kill: () => { trigger.kill(); timeline.kill() } }
}
