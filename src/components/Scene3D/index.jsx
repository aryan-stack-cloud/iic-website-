import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Html, Icosahedron, Stars } from '@react-three/drei'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'
import '../../styles/scene3d.css'

gsap.registerPlugin(ScrollTrigger)

function webGLAvailable() {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')))
  } catch {
    return false
  }
}

function normalizeSteps(events) {
  const groups = new Map()
  events.forEach((event) => {
    const key = event.clusterId || event.cluster || event.id
    if (!groups.has(key)) groups.set(key, [])
    groups.get(key).push(event)
  })
  return Array.from(groups.values()).map((group, index) => ({
    id: group[0].id,
    event: group[0],
    events: group,
    index,
    satellites: group.length > 1,
    position: [Math.sin(index * .62) * 2.1, index * 1.18, -index * 1.7],
  }))
}

function chapterColor(year) {
  if (String(year) === '2024') return '#ef6d38'
  if (String(year) === '2025') return '#9a6de0'
  return '#4b9de8'
}

function CrystalMaterial({ color, active }) {
  return <meshPhysicalMaterial color={color} emissive={color} emissiveIntensity={active ? .42 : .16} roughness={.16} metalness={.22} transmission={.26} thickness={.55} transparent opacity={active ? .94 : .7} flatShading />
}

function StepCard({ step, active }) {
  const event = step.event
  return <Html position={[step.index % 2 ? -2.5 : 2.5, .38, 0]} center distanceFactor={8} style={{ pointerEvents: active ? 'auto' : 'none' }}><article className={`scene3d-card ${active ? 'is-active' : ''}`} style={{ '--chapter-color': chapterColor(event.year) }} aria-hidden={!active}><p>{event.year} / {event.eventType || event.category}</p><h2>{event.title}</h2><span>{event.description}</span></article></Html>
}

function CrystalStep({ step, activeIndex }) {
  const group = useRef(null)
  const active = step.index === activeIndex
  const color = chapterColor(step.event.year)
  useFrame((_, delta) => {
    if (!group.current) return
    const targetScale = active ? 1.18 : .92
    const targetY = active ? .08 : 0
    group.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 1 - Math.pow(.001, delta))
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, step.position[1] + targetY, 1 - Math.pow(.001, delta))
  })
  return <group ref={group} position={step.position}>
    <Icosahedron args={[1.35, 1]} scale={[1.35, .28, .92]}><CrystalMaterial color={color} active={active} /></Icosahedron>
    <Icosahedron args={[.46, 1]} position={[0, .28, 0]} scale={[1, .38, .8]}><CrystalMaterial color={color} active={active} /></Icosahedron>
    {step.satellites && Array.from({ length: 6 }, (_, index) => { const angle = index * Math.PI / 3; return <Icosahedron key={index} args={[.16, 1]} position={[Math.cos(angle) * 1.3, .3 + Math.sin(angle) * .18, Math.sin(angle) * .8]}><CrystalMaterial color={color} active={active} /></Icosahedron> })}
    <StepCard step={step} active={active} />
  </group>
}

function CameraRig({ steps, progressRef }) {
  const { camera } = useThree()
  const position = useMemo(() => new THREE.Vector3(), [])
  const lookAt = useMemo(() => new THREE.Vector3(), [])
  const targetPosition = useMemo(() => new THREE.Vector3(), [])
  const targetLookAt = useMemo(() => new THREE.Vector3(), [])
  useFrame((_, delta) => {
    const scaled = progressRef.current * Math.max(0, steps.length - 1)
    const fromIndex = Math.min(steps.length - 1, Math.floor(scaled))
    const toIndex = Math.min(steps.length - 1, fromIndex + 1)
    const blend = scaled - fromIndex
    const from = steps[fromIndex]?.position || [0, 0, 0]
    const to = steps[toIndex]?.position || from
    targetPosition.set(THREE.MathUtils.lerp(from[0], to[0], blend) + 5.2, THREE.MathUtils.lerp(from[1], to[1], blend) + 2.8, THREE.MathUtils.lerp(from[2], to[2], blend) + 6.4)
    targetLookAt.set(THREE.MathUtils.lerp(from[0], to[0], blend), THREE.MathUtils.lerp(from[1], to[1], blend) + .25, THREE.MathUtils.lerp(from[2], to[2], blend))
    position.lerp(targetPosition, 1 - Math.pow(.001, delta))
    lookAt.lerp(targetLookAt, 1 - Math.pow(.001, delta))
    camera.position.copy(position)
    camera.lookAt(lookAt)
  })
  return null
}

function World({ steps, progressRef, activeIndex }) {
  return <><color attach="background" args={['#050609']} /><ambientLight intensity={.18} /><pointLight position={[4, 8, 5]} intensity={8} distance={20} color="#fff1d2" /><Stars radius={80} depth={42} count={900} factor={1.3} saturation={.1} fade speed={.16} /><Environment preset="night" /><CameraRig steps={steps} progressRef={progressRef} />{steps.map((step) => <CrystalStep key={step.id} step={step} activeIndex={activeIndex} />)}</>
}

function SceneFallback({ steps }) {
  return <div className="scene3d-fallback" aria-label="IIC event journey"><div className="scene3d-fallback__rail" />{steps.map((step, index) => <article className="scene3d-fallback__card" key={step.id}><span>{String(index + 1).padStart(2, '0')} / {step.event.year}</span><h2>{step.event.title}</h2><p>{step.event.description}</p><a href={`/events/${step.event.slug || step.event.id}`}>Explore event ↗</a></article>)}</div>
}

export default function Scene3D({ events = [] }) {
  const steps = useMemo(() => normalizeSteps(events), [events])
  const scrollRef = useRef(null)
  const progressRef = useRef(0)
  const [fallback, setFallback] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const updateMode = () => setFallback(window.innerWidth < 768 || reduced || !webGLAvailable())
    updateMode()
    window.addEventListener('resize', updateMode)
    return () => window.removeEventListener('resize', updateMode)
  }, [])

  useEffect(() => {
    if (fallback || !scrollRef.current) return undefined
    const context = gsap.context(() => { ScrollTrigger.create({ trigger: scrollRef.current, start: 'top top', end: 'bottom bottom', scrub: 1, onUpdate: ({ progress }) => { progressRef.current = progress; setActiveIndex(Math.min(steps.length - 1, Math.round(progress * Math.max(0, steps.length - 1)))) } }) }, scrollRef)
    return () => context.revert()
  }, [fallback, steps.length])

  if (fallback) return <SceneFallback steps={steps} />
  return <main className="scene3d" ref={scrollRef} style={{ minHeight: `${Math.max(220, steps.length * 70)}vh` }}><div className="scene3d__canvas"><Canvas dpr={[1, 1.5]} camera={{ position: [5, 2.8, 6.4], fov: 42, near: .1, far: 120 }} gl={{ antialias: true, powerPreference: 'high-performance' }}><Suspense fallback={null}><World steps={steps} progressRef={progressRef} activeIndex={activeIndex} /></Suspense></Canvas></div><div className="scene3d__hud" aria-live="polite"><span>{steps[activeIndex]?.event.year} · {String(activeIndex + 1).padStart(2, '0')}/{String(steps.length).padStart(2, '0')}</span><b>{steps[activeIndex]?.event.title}</b></div></main>
}
