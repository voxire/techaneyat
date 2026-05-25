'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export type ServiceIconType =
  | 'network'
  | 'cybersecurity'
  | 'smart-security'
  | 'cloud'
  | 'power'
  | 'hardware'

interface ServiceIcon3DProps {
  type: ServiceIconType
}

// ─── Brand colours ────────────────────────────────────────────────────────────
const C_TEAL     = 0x00c8ff
const C_TEAL_DIM = 0x004466
const C_DARK     = 0x070b14
const C_SURFACE  = 0x111827
const C_SURFACE2 = 0x1a2234

// ─── Shared material factories ────────────────────────────────────────────────
const matSurface = () =>
  new THREE.MeshStandardMaterial({ color: C_SURFACE, metalness: 0.75, roughness: 0.35 })
const matSurface2 = () =>
  new THREE.MeshStandardMaterial({ color: C_SURFACE2, metalness: 0.6, roughness: 0.4 })
const matTeal = (emissiveIntensity = 0.6) =>
  new THREE.MeshStandardMaterial({
    color: C_TEAL, emissive: C_TEAL, emissiveIntensity, metalness: 0.3, roughness: 0.5,
  })
const matEdge = (opacity = 0.45) =>
  new THREE.LineBasicMaterial({ color: C_TEAL, transparent: true, opacity })

function addEdges(geom: THREE.BufferGeometry, parent: THREE.Object3D, opacity = 0.35) {
  const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geom, 15), matEdge(opacity))
  parent.add(edges)
}

// ─── Scene builders ───────────────────────────────────────────────────────────

function buildNetwork(group: THREE.Group) {
  // Rack enclosure
  const rackGeom = new THREE.BoxGeometry(1.4, 2.6, 0.9)
  const rack = new THREE.Mesh(rackGeom, matSurface())
  group.add(rack)
  addEdges(rackGeom, group, 0.25)

  // 5 server sleds
  for (let i = 0; i < 5; i++) {
    const sledGeom = new THREE.BoxGeometry(1.1, 0.34, 0.55)
    const sled = new THREE.Mesh(sledGeom, matSurface2())
    sled.position.set(0, 0.86 - i * 0.44, 0.2)
    group.add(sled)

    // LED strip per sled
    const stripGeom = new THREE.BoxGeometry(0.55, 0.04, 0.01)
    const stripMat = new THREE.MeshStandardMaterial({
      color: C_TEAL, emissive: C_TEAL, emissiveIntensity: i === 4 ? 0.2 : 0.9,
    })
    const strip = new THREE.Mesh(stripGeom, stripMat)
    strip.position.set(-0.15, 0.86 - i * 0.44, 0.48)
    group.add(strip)

    // Status dot
    const dotGeom = new THREE.SphereGeometry(0.04, 8, 8)
    const dotMat = new THREE.MeshStandardMaterial({
      color: i < 4 ? C_TEAL : 0x22c55e,
      emissive: i < 4 ? C_TEAL : 0x22c55e,
      emissiveIntensity: 1,
    })
    const dot = new THREE.Mesh(dotGeom, dotMat)
    dot.position.set(0.46, 0.86 - i * 0.44, 0.49)
    group.add(dot)
  }

  // Teal glow rim on the rack front
  const rimGeom = new THREE.EdgesGeometry(rackGeom, 15)
  const rim = new THREE.LineSegments(rimGeom, matEdge(0.6))
  group.add(rim)

  // Cable port cluster (bottom right)
  for (let j = 0; j < 4; j++) {
    const portGeom = new THREE.BoxGeometry(0.1, 0.1, 0.12)
    const port = new THREE.Mesh(portGeom, matSurface2())
    port.position.set(0.3 + j * 0.14, -1.1, 0.5)
    group.add(port)
    addEdges(portGeom, port, 0.5)
  }
}

function buildCybersecurity(group: THREE.Group) {
  // Shield shape via ShapeGeometry
  const shield = new THREE.Shape()
  shield.moveTo(0, 1.4)
  shield.bezierCurveTo(0.9, 1.4, 1.3, 0.8, 1.3, 0.2)
  shield.bezierCurveTo(1.3, -0.7, 0.65, -1.2, 0, -1.5)
  shield.bezierCurveTo(-0.65, -1.2, -1.3, -0.7, -1.3, 0.2)
  shield.bezierCurveTo(-1.3, 0.8, -0.9, 1.4, 0, 1.4)

  const extSettings: THREE.ExtrudeGeometryOptions = { depth: 0.3, bevelEnabled: true, bevelThickness: 0.06, bevelSize: 0.06, bevelSegments: 3 }
  const shieldGeom = new THREE.ExtrudeGeometry(shield, extSettings)
  const shieldMat = new THREE.MeshStandardMaterial({ color: C_SURFACE, metalness: 0.8, roughness: 0.25 })
  const shieldMesh = new THREE.Mesh(shieldGeom, shieldMat)
  shieldMesh.position.set(-0.02, -0.05, -0.15)
  group.add(shieldMesh)

  // Teal shield border glow (thin outline plane)
  const outline = new THREE.Mesh(
    new THREE.ExtrudeGeometry(shield, { ...extSettings, depth: 0.05 }),
    new THREE.MeshStandardMaterial({ color: C_TEAL, emissive: C_TEAL, emissiveIntensity: 0.5, transparent: true, opacity: 0.7 }),
  )
  outline.position.set(-0.02, -0.05, 0.15)
  group.add(outline)

  // Lock body
  const bodyGeom = new THREE.BoxGeometry(0.55, 0.5, 0.22)
  const lockBody = new THREE.Mesh(bodyGeom, matTeal(0.6))
  lockBody.position.set(0, -0.22, 0.32)
  group.add(lockBody)
  addEdges(bodyGeom, lockBody, 0.8)

  // Lock shackle (half-torus)
  const shackleGeom = new THREE.TorusGeometry(0.22, 0.06, 8, 16, Math.PI)
  const shackle = new THREE.Mesh(shackleGeom, matTeal(0.5))
  shackle.position.set(0, 0.22, 0.32)
  shackle.rotation.z = Math.PI
  group.add(shackle)
}

function buildCamera(group: THREE.Group) {
  // Camera housing (main body)
  const bodyGeom = new THREE.CylinderGeometry(0.5, 0.55, 1.1, 24)
  const body = new THREE.Mesh(bodyGeom, matSurface())
  body.rotation.z = Math.PI / 2
  body.position.set(0, 0.15, 0)
  group.add(body)
  addEdges(bodyGeom, body, 0.25)

  // Lens barrel
  const barrelGeom = new THREE.CylinderGeometry(0.35, 0.4, 0.45, 24)
  const barrel = new THREE.Mesh(barrelGeom, matSurface2())
  barrel.rotation.z = Math.PI / 2
  barrel.position.set(0.77, 0.15, 0)
  group.add(barrel)
  addEdges(barrelGeom, barrel, 0.35)

  // Lens glass
  const lensGeom = new THREE.CircleGeometry(0.28, 32)
  const lensMat = new THREE.MeshStandardMaterial({ color: C_TEAL, emissive: C_TEAL, emissiveIntensity: 0.7, transparent: true, opacity: 0.85 })
  const lens = new THREE.Mesh(lensGeom, lensMat)
  lens.rotation.y = Math.PI / 2
  lens.position.set(1.01, 0.15, 0)
  group.add(lens)

  // Lens ring
  const ringGeom = new THREE.TorusGeometry(0.3, 0.045, 8, 32)
  const ring = new THREE.Mesh(ringGeom, matTeal(0.5))
  ring.rotation.y = Math.PI / 2
  ring.position.set(0.99, 0.15, 0)
  group.add(ring)

  // Mount bracket
  const mountGeom = new THREE.BoxGeometry(0.2, 0.8, 0.2)
  const mount = new THREE.Mesh(mountGeom, matSurface())
  mount.position.set(-0.1, -0.6, 0)
  group.add(mount)
  addEdges(mountGeom, mount, 0.4)

  // Wall/ceiling plate
  const plateGeom = new THREE.BoxGeometry(0.7, 0.14, 0.5)
  const plate = new THREE.Mesh(plateGeom, matSurface2())
  plate.position.set(0, -0.98, 0)
  group.add(plate)
  addEdges(plateGeom, plate, 0.45)

  // IR LEDs around lens
  for (let k = 0; k < 6; k++) {
    const angle = (k / 6) * Math.PI * 2
    const ledGeom = new THREE.SphereGeometry(0.045, 8, 8)
    const ledMat = new THREE.MeshStandardMaterial({ color: C_TEAL, emissive: C_TEAL, emissiveIntensity: 0.8 })
    const led = new THREE.Mesh(ledGeom, ledMat)
    led.position.set(0.97, 0.15 + Math.sin(angle) * 0.38, Math.cos(angle) * 0.38)
    group.add(led)
  }
}

function buildCloud(group: THREE.Group) {
  // Cloud made of 5 spheres in organic arrangement
  const cloudNodes: [number, number, number, number][] = [
    [0,    0.3,  0, 0.7],
    [-0.7, -0.1, 0, 0.55],
    [ 0.7, -0.1, 0, 0.55],
    [-0.35, 0.6, 0, 0.45],
    [ 0.35, 0.6, 0, 0.45],
  ]

  const cloudMat = new THREE.MeshStandardMaterial({ color: C_SURFACE, metalness: 0.6, roughness: 0.4 })
  const glowMat  = new THREE.MeshStandardMaterial({ color: C_TEAL, emissive: C_TEAL, emissiveIntensity: 0.3, transparent: true, opacity: 0.15 })

  cloudNodes.forEach(([x, y, z, r]) => {
    const geom = new THREE.SphereGeometry(r, 24, 24)
    const sphere = new THREE.Mesh(geom, cloudMat)
    sphere.position.set(x, y, z)
    group.add(sphere)

    // Glow halo around each node
    const haloGeom = new THREE.SphereGeometry(r * 1.22, 16, 16)
    const halo = new THREE.Mesh(haloGeom, glowMat)
    halo.position.set(x, y, z)
    group.add(halo)
  })

  // Connection lines between nodes
  const linePairs: [number, number][] = [[0,1],[0,2],[0,3],[0,4],[1,3],[2,4]]
  linePairs.forEach(([a, b]) => {
    const [ax, ay, az] = cloudNodes[a]
    const [bx, by, bz] = cloudNodes[b]
    const points = [new THREE.Vector3(ax, ay, az), new THREE.Vector3(bx, by, bz)]
    const lineGeom = new THREE.BufferGeometry().setFromPoints(points)
    const line = new THREE.Line(lineGeom, new THREE.LineBasicMaterial({ color: C_TEAL, transparent: true, opacity: 0.4 }))
    group.add(line)
  })

  // Orbiting data packets (small spheres)
  const packetPositions: [number, number, number][] = [
    [-1.15, 0.15, 0.3],
    [ 1.1, -0.25, -0.2],
    [ 0.1,  1.15, 0.1],
  ]
  packetPositions.forEach(([x, y, z]) => {
    const pGeom = new THREE.SphereGeometry(0.08, 8, 8)
    const pMat = new THREE.MeshStandardMaterial({ color: C_TEAL, emissive: C_TEAL, emissiveIntensity: 1 })
    const packet = new THREE.Mesh(pGeom, pMat)
    packet.position.set(x, y, z)
    group.add(packet)
  })
}

function buildPower(group: THREE.Group) {
  // UPS main chassis
  const chassisGeom = new THREE.BoxGeometry(1.6, 2.2, 0.85)
  const chassis = new THREE.Mesh(chassisGeom, matSurface())
  group.add(chassis)
  addEdges(chassisGeom, group, 0.3)

  // Ventilation grill (rows of thin boxes)
  for (let r = 0; r < 5; r++) {
    const grillGeom = new THREE.BoxGeometry(1.0, 0.045, 0.06)
    const grill = new THREE.Mesh(grillGeom, matSurface2())
    grill.position.set(0, -0.55 + r * 0.12, 0.46)
    group.add(grill)
  }

  // Battery level bars (glowing)
  const barCount = 4
  const barColors = [C_TEAL, C_TEAL, C_TEAL, 0x22c55e]
  for (let b = 0; b < barCount; b++) {
    const barGeom = new THREE.BoxGeometry(1.0, 0.17, 0.06)
    const barMat = new THREE.MeshStandardMaterial({ color: barColors[b], emissive: barColors[b], emissiveIntensity: b < 3 ? 0.8 : 0.6 })
    const bar = new THREE.Mesh(barGeom, barMat)
    bar.position.set(0, 0.52 - b * 0.24, 0.46)
    group.add(bar)
  }

  // Lightning bolt (power symbol) — composed of boxes
  const boltMat = new THREE.MeshStandardMaterial({ color: C_TEAL, emissive: C_TEAL, emissiveIntensity: 0.7 })
  const topGeom = new THREE.BoxGeometry(0.14, 0.5, 0.05)
  const topBolt = new THREE.Mesh(topGeom, boltMat)
  topBolt.position.set(0.08, 1.1, 0.46)
  topBolt.rotation.z = -0.4
  group.add(topBolt)

  const botGeom = new THREE.BoxGeometry(0.14, 0.5, 0.05)
  const botBolt = new THREE.Mesh(botGeom, boltMat)
  botBolt.position.set(-0.08, 0.72, 0.46)
  botBolt.rotation.z = -0.4
  group.add(botBolt)

  // Power status LED
  const ledGeom = new THREE.SphereGeometry(0.065, 12, 12)
  const ledMat = new THREE.MeshStandardMaterial({ color: 0x22c55e, emissive: 0x22c55e, emissiveIntensity: 1 })
  const led = new THREE.Mesh(ledGeom, ledMat)
  led.position.set(0.64, -0.95, 0.46)
  group.add(led)
}

function buildHardware(group: THREE.Group) {
  // Monitor — outer bezel
  const bezelGeom = new THREE.BoxGeometry(2.2, 1.5, 0.14)
  const bezel = new THREE.Mesh(bezelGeom, matSurface())
  bezel.position.set(0.25, 0.45, 0)
  group.add(bezel)
  addEdges(bezelGeom, bezel, 0.3)

  // Monitor — screen (inset, glowing)
  const screenGeom = new THREE.BoxGeometry(2.0, 1.3, 0.05)
  const screenMat = new THREE.MeshStandardMaterial({ color: 0x001122, emissive: C_TEAL, emissiveIntensity: 0.22, roughness: 0.05, metalness: 0.1 })
  const screen = new THREE.Mesh(screenGeom, screenMat)
  screen.position.set(0.25, 0.45, 0.08)
  group.add(screen)

  // Screen content lines (UI mockup)
  const lineMat = new THREE.LineBasicMaterial({ color: C_TEAL, transparent: true, opacity: 0.6 })
  const lineWidths = [1.1, 0.7, 0.9, 0.5]
  lineWidths.forEach((w, i) => {
    const pts = [
      new THREE.Vector3(-w / 2, 0.3 - i * 0.22, 0.12),
      new THREE.Vector3( w / 2, 0.3 - i * 0.22, 0.12),
    ]
    const lg = new THREE.BufferGeometry().setFromPoints(pts)
    group.add(new THREE.Line(lg, lineMat))
  })

  // Monitor stand neck
  const neckGeom = new THREE.BoxGeometry(0.14, 0.45, 0.14)
  const neck = new THREE.Mesh(neckGeom, matSurface2())
  neck.position.set(0.25, -0.36, 0)
  group.add(neck)

  // Monitor stand base
  const baseGeom = new THREE.BoxGeometry(0.8, 0.1, 0.45)
  const base = new THREE.Mesh(baseGeom, matSurface2())
  base.position.set(0.25, -0.62, 0.1)
  group.add(base)
  addEdges(baseGeom, base, 0.4)

  // Tower — chassis
  const towerGeom = new THREE.BoxGeometry(0.7, 1.8, 0.6)
  const tower = new THREE.Mesh(towerGeom, matSurface())
  tower.position.set(-1.05, -0.12, 0)
  group.add(tower)
  addEdges(towerGeom, tower, 0.3)

  // Tower — drive bay
  for (let d = 0; d < 2; d++) {
    const bayGeom = new THREE.BoxGeometry(0.46, 0.14, 0.08)
    const bay = new THREE.Mesh(bayGeom, matSurface2())
    bay.position.set(-1.05, 0.55 - d * 0.22, 0.32)
    group.add(bay)
  }

  // Tower — power button
  const btnGeom = new THREE.CylinderGeometry(0.07, 0.07, 0.04, 16)
  const btnMat = new THREE.MeshStandardMaterial({ color: C_TEAL, emissive: C_TEAL, emissiveIntensity: 0.8 })
  const btn = new THREE.Mesh(btnGeom, btnMat)
  btn.rotation.x = Math.PI / 2
  btn.position.set(-1.05, 0.12, 0.33)
  group.add(btn)

  // Status LED
  const ledGeom = new THREE.SphereGeometry(0.04, 8, 8)
  const ledMat = new THREE.MeshStandardMaterial({ color: 0x22c55e, emissive: 0x22c55e, emissiveIntensity: 1 })
  const led = new THREE.Mesh(ledGeom, ledMat)
  led.position.set(-0.85, -0.15, 0.33)
  group.add(led)
}

// ─── Scene dispatch ───────────────────────────────────────────────────────────

function buildScene(type: ServiceIconType, group: THREE.Group) {
  switch (type) {
    case 'network':       buildNetwork(group);      break
    case 'cybersecurity': buildCybersecurity(group); break
    case 'smart-security': buildCamera(group);      break
    case 'cloud':         buildCloud(group);         break
    case 'power':         buildPower(group);         break
    case 'hardware':      buildHardware(group);      break
  }
}

// Per-type camera positions and initial rotations for the best angle
const CAMERA_CONFIG: Record<ServiceIconType, { z: number; ry: number; rx: number }> = {
  'network':        { z: 6.0, ry:  0.35, rx:  0.1 },
  'cybersecurity':  { z: 6.5, ry:  0.15, rx:  0.05 },
  'smart-security': { z: 6.0, ry: -0.3,  rx:  0.15 },
  'cloud':          { z: 6.5, ry:  0.2,  rx:  0.1 },
  'power':          { z: 6.5, ry:  0.35, rx:  0.1 },
  'hardware':       { z: 6.8, ry:  0.25, rx:  0.08 },
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ServiceIcon3D({ type }: ServiceIcon3DProps) {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = mountRef.current
    if (!el) return

    // Bail on reduced-motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const W = el.clientWidth  || 300
    const H = el.clientHeight || 220

    // ── Renderer ──────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.1
    el.appendChild(renderer.domElement)
    Object.assign(renderer.domElement.style, { width: '100%', height: '100%', display: 'block' })

    // ── Scene ─────────────────────────────────────────────────────────────────
    const scene = new THREE.Scene()

    const cfg = CAMERA_CONFIG[type]
    const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 100)
    camera.position.z = cfg.z

    // ── Lighting ──────────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 0.45))

    const key = new THREE.DirectionalLight(0x80e0ff, 1.6)
    key.position.set(3, 5, 4)
    scene.add(key)

    const fill = new THREE.DirectionalLight(0xffffff, 0.4)
    fill.position.set(-3, -2, 3)
    scene.add(fill)

    const rim = new THREE.DirectionalLight(0x00c8ff, 0.8)
    rim.position.set(-2, 3, -5)
    scene.add(rim)

    // Subtle point light for glow on front face
    const pointLight = new THREE.PointLight(0x00c8ff, 0.9, 8)
    pointLight.position.set(0.5, 0.5, 3)
    scene.add(pointLight)

    // ── Geometry group ────────────────────────────────────────────────────────
    const group = new THREE.Group()
    group.rotation.y = cfg.ry
    group.rotation.x = cfg.rx
    buildScene(type, group)
    scene.add(group)

    // ── Mouse hover tilt ──────────────────────────────────────────────────────
    const mouse = { x: 0, y: 0 }
    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      mouse.x = ((e.clientX - rect.left) / rect.width  - 0.5) * 2
      mouse.y = ((e.clientY - rect.top)  / rect.height - 0.5) * 2
    }
    el.addEventListener('mousemove', onMouseMove)

    // ── IntersectionObserver: pause when off-screen ───────────────────────────
    let isVisible = false
    const observer = new IntersectionObserver(
      entries => { isVisible = entries[0].isIntersecting },
      { threshold: 0.1 },
    )
    observer.observe(el)

    // ── Animation loop ────────────────────────────────────────────────────────
    let rafId: number
    let lastTime = 0

    const animate = (t: number) => {
      rafId = requestAnimationFrame(animate)
      if (!isVisible) return

      // Cap at ~50fps
      if (t - lastTime < 20) return
      lastTime = t

      const elapsed = t * 0.001

      // Slow auto-rotation
      group.rotation.y = cfg.ry + elapsed * 0.28 + mouse.x * 0.18
      group.rotation.x = cfg.rx + mouse.y * -0.12

      // Gentle float
      group.position.y = Math.sin(elapsed * 0.7) * 0.06

      // Breathe emissive on point light
      pointLight.intensity = 0.7 + Math.sin(elapsed * 1.2) * 0.2

      renderer.render(scene, camera)
    }
    rafId = requestAnimationFrame(animate)

    // ── Cleanup ───────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafId)
      observer.disconnect()
      el.removeEventListener('mousemove', onMouseMove)
      renderer.dispose()
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement)
    }
  }, [type])

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      style={{ width: '100%', height: '100%', minHeight: '180px' }}
    />
  )
}
