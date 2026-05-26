'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'

const BG   = '#070B14'
const TEAL = '#00C8FF'

// ─── Types ────────────────────────────────────────────────────────────────────
interface MeshNode {
  x: number; y: number; r: number; hub: boolean
  spawnAt: number; vx: number; vy: number
}
interface MeshEdge { a: number; b: number }
interface Packet   { edgeIdx: number; t: number; dir: number; spawnAt: number }

// ─── Component ────────────────────────────────────────────────────────────────
export function Preloader() {
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const rafRef     = useRef<number>(0)
  const startRef   = useRef<number>(0)
  const exitedRef  = useRef(false)
  const nodesRef   = useRef<MeshNode[]>([])
  const edgesRef   = useRef<MeshEdge[]>([])
  const packetsRef = useRef<Packet[]>([])
  const [visible, setVisible] = useState(true)

  const buildMesh = useCallback((W: number, H: number) => {
    const nodes: MeshNode[] = []
    for (let i = 0; i < 28; i++) {
      nodes.push({
        x: Math.random() * W * 0.88 + W * 0.06,
        y: Math.random() * H * 0.78 + H * 0.11,
        r: i < 3 ? 6 : Math.random() * 2 + 2.5,
        hub: i < 3,
        spawnAt: Math.random() * 1.8,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
      })
    }
    const edges: MeshEdge[] = []
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x
        const dy = nodes[i].y - nodes[j].y
        if (Math.sqrt(dx * dx + dy * dy) < 155) edges.push({ a: i, b: j })
      }
    }
    const packets: Packet[] = []
    if (edges.length > 0) {
      for (let k = 0; k < 9; k++) {
        packets.push({
          edgeIdx: Math.floor(Math.random() * edges.length),
          t: Math.random(),
          dir: 1,
          spawnAt: k * 0.3 + 1,
        })
      }
    }
    nodesRef.current   = nodes
    edgesRef.current   = edges
    packetsRef.current = packets
  }, [])

  const exit = useCallback(() => {
    if (exitedRef.current) return
    exitedRef.current = true
    cancelAnimationFrame(rafRef.current)
    try { sessionStorage.setItem('tn-preloader', '1') } catch { /* safari private */ }
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.55,
      ease: 'power2.in',
      onComplete: () => setVisible(false),
    })
  }, [])

  useEffect(() => {
    // Once-per-session guard
    try {
      if (sessionStorage.getItem('tn-preloader')) { setVisible(false); return }
    } catch { /* ignore */ }

    // Reduced-motion: skip straight to page
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      try { sessionStorage.setItem('tn-preloader', '1') } catch { /* ignore */ }
      setVisible(false)
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return
    canvas.width  = window.innerWidth
    canvas.height = window.innerHeight
    buildMesh(canvas.width, canvas.height)

    const ctx = canvas.getContext('2d')!

    const draw = (ts: number) => {
      if (!startRef.current) startRef.current = ts
      const t  = (ts - startRef.current) / 1000
      const W  = canvas.width
      const H  = canvas.height
      const nodes   = nodesRef.current
      const edges   = edgesRef.current
      const packets = packetsRef.current

      ctx.clearRect(0, 0, W, H)
      ctx.fillStyle = BG
      ctx.fillRect(0, 0, W, H)

      // ── Edges ──
      for (const { a, b } of edges) {
        const na = nodes[a], nb = nodes[b]
        const ep = Math.min(Math.max(0, (t - Math.min(na.spawnAt, nb.spawnAt)) / 0.6), 1)
        if (ep <= 0) continue
        ctx.save()
        ctx.globalAlpha  = ep * 0.22
        ctx.strokeStyle  = TEAL
        ctx.lineWidth    = 0.5
        ctx.beginPath()
        ctx.moveTo(na.x, na.y)
        ctx.lineTo(nb.x, nb.y)
        ctx.stroke()
        ctx.restore()
      }

      // ── Nodes ──
      for (const n of nodes) {
        const ep = Math.min(Math.max(0, (t - n.spawnAt) / 0.4), 1)
        if (ep <= 0) continue
        ctx.save()
        ctx.globalAlpha = ep * (n.hub ? 0.95 : 0.75)
        if (n.hub) { ctx.shadowColor = TEAL; ctx.shadowBlur = 14 }
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fillStyle = TEAL
        ctx.fill()
        ctx.restore()
        n.x += n.vx; n.y += n.vy
        if (n.x < 8  || n.x > W - 8)  n.vx *= -1
        if (n.y < 8  || n.y > H - 8)  n.vy *= -1
      }

      // ── Data packets ──
      if (edges.length > 0) {
        for (const p of packets) {
          if (t < p.spawnAt) continue
          p.t += 0.008 * p.dir
          if (p.t > 1) { p.t = 0; p.edgeIdx = Math.floor(Math.random() * edges.length) }
          if (p.t < 0) { p.t = 1; p.edgeIdx = Math.floor(Math.random() * edges.length) }
          const { a, b } = edges[p.edgeIdx]
          const na = nodes[a], nb = nodes[b]
          const px = na.x + (nb.x - na.x) * p.t
          const py = na.y + (nb.y - na.y) * p.t
          ctx.save()
          ctx.shadowColor = TEAL; ctx.shadowBlur = 8
          ctx.beginPath()
          ctx.arc(px, py, 2, 0, Math.PI * 2)
          ctx.fillStyle   = TEAL
          ctx.globalAlpha = 0.9
          ctx.fill()
          ctx.restore()
        }
      }

      // ── Logo materialise at 3.3s ──
      if (t > 3.3) {
        const fa = Math.min((t - 3.3) / 0.55, 1)
        ctx.save()
        ctx.globalAlpha = fa
        ctx.textAlign   = 'center'
        ctx.textBaseline = 'middle'

        // Wordmark
        ctx.font      = `700 72px 'JetBrains Mono', monospace`
        ctx.fillStyle = TEAL
        ctx.fillText('TECHANEYAT', W / 2, H / 2 - 28)

        // Subline
        ctx.font      = `400 16px 'JetBrains Mono', monospace`
        ctx.fillStyle = 'rgba(0,200,255,0.5)'
        ctx.fillText('INFRASTRUCTURE ONLINE', W / 2, H / 2 + 28)

        ctx.restore()
      }

      // ── Exit at 4.8s ──
      if (t > 4.8) { exit(); return }

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(rafRef.current)
  }, [buildMesh, exit])

  if (!visible) return null

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: BG,
        pointerEvents: 'none',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ display: 'block', width: '100%', height: '100%' }}
      />
    </div>
  )
}
