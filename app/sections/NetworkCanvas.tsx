'use client'

import { useEffect, useRef, useCallback } from 'react'

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
  isHub: boolean
}

interface Edge {
  from: number
  to: number
  opacity: number
}

interface Packet {
  edgeIndex: number
  progress: number
  speed: number
}

interface NetworkCanvasProps {
  active: boolean
}

const MAX_EDGE_DIST = 200
const PACKET_COUNT = 18
const HUB_RADIUS = 10
const FPS_CAP = 45
const FRAME_INTERVAL = 1000 / FPS_CAP
const MOUSE_REPULSION_RADIUS = 150
const MOUSE_REPULSION_STRENGTH = 0.22
const CANVAS_OPACITY = 0.65

function buildGraph(
  width: number,
  height: number,
  nodeCount: number
): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = []
  const hubIndices = new Set<number>()

  // Pick 3 hub indices
  while (hubIndices.size < 3) {
    hubIndices.add(Math.floor(Math.random() * nodeCount))
  }

  for (let i = 0; i < nodeCount; i++) {
    const isHub = hubIndices.has(i)
    nodes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: isHub ? HUB_RADIUS : 3 + Math.random() * 3,
      opacity: isHub ? 1 : 0.6 + Math.random() * 0.3,
      isHub,
    })
  }

  const edges: Edge[] = []
  for (let i = 0; i < nodeCount; i++) {
    let connectionCount = 0
    for (let j = i + 1; j < nodeCount; j++) {
      const dx = nodes[i].x - nodes[j].x
      const dy = nodes[i].y - nodes[j].y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < MAX_EDGE_DIST && connectionCount < 6) {
        const opacityFactor = 1 - dist / MAX_EDGE_DIST
        edges.push({
          from: i,
          to: j,
          opacity: 0.15 + opacityFactor * 0.1,
        })
        connectionCount++
      }
    }
  }

  return { nodes, edges }
}

function buildPackets(edges: Edge[]): Packet[] {
  if (edges.length === 0) return []
  const packets: Packet[] = []
  for (let i = 0; i < PACKET_COUNT; i++) {
    packets.push({
      edgeIndex: Math.floor(Math.random() * edges.length),
      progress: Math.random(),
      speed: 0.003 + Math.random() * 0.004,
    })
  }
  return packets
}

// Returns [r, g, b] for the current theme accent
function getAccentRGB(): [number, number, number] {
  if (typeof document === 'undefined') return [0, 200, 255]
  return document.documentElement.getAttribute('data-theme') === 'light'
    ? [0, 128, 184]   // --tn-accent in light mode
    : [0, 200, 255]   // --tn-accent in dark mode
}

export function NetworkCanvas({ active }: NetworkCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const stateRef = useRef<{
    nodes: Node[]
    edges: Edge[]
    packets: Packet[]
    mouse: { x: number; y: number } | null
    rafId: number
    lastTime: number
    opacity: number
    targetOpacity: number
    reducedMotion: boolean
    accentRGB: [number, number, number]
    isLight: boolean
  }>({
    nodes: [],
    edges: [],
    packets: [],
    mouse: null,
    rafId: 0,
    lastTime: 0,
    opacity: 0,
    targetOpacity: 0,
    reducedMotion: false,
    accentRGB: [0, 200, 255],
    isLight: false,
  })

  const drawStatic = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const { nodes, edges, accentRGB: [r, g, b] } = stateRef.current
    ctx.clearRect(0, 0, width, height)

    // Draw edges
    for (const edge of edges) {
      const from = nodes[edge.from]
      const to = nodes[edge.to]
      ctx.beginPath()
      ctx.moveTo(from.x, from.y)
      ctx.lineTo(to.x, to.y)
      ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${edge.opacity})`
      ctx.lineWidth = 0.5
      ctx.stroke()
    }

    // Draw nodes
    for (const node of nodes) {
      ctx.beginPath()
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${node.opacity})`
      ctx.fill()
      if (node.isHub) {
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius + 4, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.25)`
        ctx.lineWidth = 1
        ctx.stroke()
      }
    }
  }, [])

  const animate = useCallback((timestamp: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const state = stateRef.current

    // FPS cap
    const elapsed = timestamp - state.lastTime
    if (elapsed < FRAME_INTERVAL) {
      state.rafId = requestAnimationFrame(animate)
      return
    }
    state.lastTime = timestamp - (elapsed % FRAME_INTERVAL)

    const { width, height } = canvas

    // Ease canvas opacity
    const opacityDiff = state.targetOpacity - state.opacity
    state.opacity += opacityDiff * 0.04
    canvas.style.opacity = String(state.opacity)

    ctx.clearRect(0, 0, width, height)

    // Update node positions
    for (const node of state.nodes) {
      node.x += node.vx
      node.y += node.vy

      // Bounce off walls
      if (node.x < node.radius || node.x > width - node.radius) node.vx *= -1
      if (node.y < node.radius || node.y > height - node.radius) node.vy *= -1
      node.x = Math.max(node.radius, Math.min(width - node.radius, node.x))
      node.y = Math.max(node.radius, Math.min(height - node.radius, node.y))

      // Mouse repulsion (desktop only)
      if (state.mouse) {
        const dx = node.x - state.mouse.x
        const dy = node.y - state.mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < MOUSE_REPULSION_RADIUS && dist > 0) {
          const force = ((MOUSE_REPULSION_RADIUS - dist) / MOUSE_REPULSION_RADIUS) * MOUSE_REPULSION_STRENGTH
          node.vx += (dx / dist) * force
          node.vy += (dy / dist) * force
          // Dampen velocity
          node.vx *= 0.96
          node.vy *= 0.96
        }
      }

      // Gentle velocity damping to prevent runaway
      node.vx *= 0.999
      node.vy *= 0.999
      // Minimum velocity
      const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy)
      if (speed < 0.1) {
        node.vx += (Math.random() - 0.5) * 0.05
        node.vy += (Math.random() - 0.5) * 0.05
      }
      // Max velocity cap
      if (speed > 1.2) {
        node.vx = (node.vx / speed) * 1.2
        node.vy = (node.vy / speed) * 1.2
      }
    }

    const [r, g, b] = state.accentRGB
    const isLight = state.isLight

    // Draw edges dynamically (recalculate based on current positions)
    for (const node of state.nodes) {
      for (const other of state.nodes) {
        if (node === other) continue
        const dx = node.x - other.x
        const dy = node.y - other.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < MAX_EDGE_DIST) {
          const opacity = (1 - dist / MAX_EDGE_DIST) * (isLight ? 0.45 : 0.35)
          ctx.beginPath()
          ctx.moveTo(node.x, node.y)
          ctx.lineTo(other.x, other.y)
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`
          ctx.lineWidth = node.isHub || other.isHub ? 1 : 0.6
          ctx.stroke()
        }
      }
    }

    // Draw nodes
    for (const node of state.nodes) {
      // Node fill
      ctx.beginPath()
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${node.opacity})`
      ctx.fill()

      if (node.isHub) {
        // Large ambient glow
        const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius + 24)
        glow.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.30)`)
        glow.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, 0.12)`)
        glow.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius + 24, 0, Math.PI * 2)
        ctx.fillStyle = glow
        ctx.fill()
        // Bright ring
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius + 4, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.45)`
        ctx.lineWidth = 1.5
        ctx.stroke()
      } else {
        // Subtle glow on regular nodes
        const smallGlow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius + 8)
        smallGlow.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.15)`)
        smallGlow.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius + 8, 0, Math.PI * 2)
        ctx.fillStyle = smallGlow
        ctx.fill()
      }
    }

    // Move and draw packets — bright travelling dots
    // Packet core: white in dark mode, dark teal in light mode (white invisible on light bg)
    const packetCoreColor = isLight ? `rgba(0, 60, 120, 0.95)` : `rgba(255, 255, 255, 0.95)`

    for (const packet of state.packets) {
      packet.progress += packet.speed
      if (packet.progress >= 1) {
        packet.progress = 0
        packet.edgeIndex = Math.floor(Math.random() * state.edges.length)
      }

      const edge = state.edges[packet.edgeIndex]
      if (!edge) continue
      const fromNode = state.nodes[edge.from]
      const toNode = state.nodes[edge.to]
      if (!fromNode || !toNode) continue

      const px = fromNode.x + (toNode.x - fromNode.x) * packet.progress
      const py = fromNode.y + (toNode.y - fromNode.y) * packet.progress

      // Packet glow
      const pGlow = ctx.createRadialGradient(px, py, 0, px, py, 6)
      pGlow.addColorStop(0, `rgba(${r}, ${Math.min(g + 20, 255)}, ${b}, 1)`)
      pGlow.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)
      ctx.beginPath()
      ctx.arc(px, py, 6, 0, Math.PI * 2)
      ctx.fillStyle = pGlow
      ctx.fill()

      // Bright core
      ctx.beginPath()
      ctx.arc(px, py, 2.5, 0, Math.PI * 2)
      ctx.fillStyle = packetCoreColor
      ctx.fill()
    }

    state.rafId = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    stateRef.current.reducedMotion = reducedMotion

    // Initialise theme-aware colors
    stateRef.current.accentRGB = getAccentRGB()
    stateRef.current.isLight = document.documentElement.getAttribute('data-theme') === 'light'

    // Watch for theme toggles and update colors live
    const themeObserver = new MutationObserver(() => {
      stateRef.current.accentRGB = getAccentRGB()
      stateRef.current.isLight = document.documentElement.getAttribute('data-theme') === 'light'
    })
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    const isMobile = window.innerWidth < 768
    const nodeCount = isMobile ? 20 : 40

    const resize = () => {
      if (!canvas) return
      const parent = canvas.parentElement
      if (!parent) return
      canvas.width = parent.offsetWidth
      canvas.height = parent.offsetHeight

      const { nodes, edges } = buildGraph(canvas.width, canvas.height, nodeCount)
      stateRef.current.nodes = nodes
      stateRef.current.edges = edges
      stateRef.current.packets = buildPackets(edges)

      if (reducedMotion) {
        const ctx = canvas.getContext('2d')
        if (ctx) drawStatic(ctx, canvas.width, canvas.height)
      }
    }

    resize()
    window.addEventListener('resize', resize)

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      stateRef.current.mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const onMouseLeave = () => { stateRef.current.mouse = null }

    if (!reducedMotion) {
      window.addEventListener('mousemove', onMouseMove)
      canvas.addEventListener('mouseleave', onMouseLeave)
      // rAF loop starts only when active; don't burn CPU during typewriter
    }

    return () => {
      themeObserver.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('mouseleave', onMouseLeave)
      cancelAnimationFrame(stateRef.current.rafId)
    }
  }, [animate, drawStatic])

  // Start / stop rAF loop when active changes
  useEffect(() => {
    const state = stateRef.current
    state.targetOpacity = active ? CANVAS_OPACITY : 0

    if (active && !state.reducedMotion) {
      // Kick off animation loop when hero becomes visible
      cancelAnimationFrame(state.rafId)
      state.rafId = requestAnimationFrame(animate)
    } else if (active && state.reducedMotion) {
      const canvas = canvasRef.current
      if (canvas) canvas.style.opacity = String(CANVAS_OPACITY)
    } else {
      // Not yet active: cancel any stray loop
      cancelAnimationFrame(state.rafId)
    }
  }, [active, animate])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        opacity: 0,
        pointerEvents: 'none',
      }}
    />
  )
}
