'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const BG   = '#070B14'
const TEAL = '#00C8FF'

function easeOut(t: number)   { return 1 - (1 - t) * (1 - t) }

// ─── Component ────────────────────────────────────────────────────────────────
export function BlackoutReveal() {
  const sectionRef  = useRef<HTMLElement>(null)
  const canvasRef   = useRef<HTMLCanvasElement>(null)
  const progressRef = useRef(0)
  const rafRef      = useRef<number>(0)
  // Logical (CSS) dimensions tracked separately from physical canvas dimensions
  const logWRef     = useRef(0)
  const logHRef     = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 3)
      logWRef.current = window.innerWidth
      logHRef.current = window.innerHeight
      canvas.width  = window.innerWidth  * dpr
      canvas.height = window.innerHeight * dpr
    }
    resize()
    window.addEventListener('resize', resize)

    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start:   'top top',
        end:     'bottom bottom',
        scrub:   1.4,
        onUpdate: (self) => { progressRef.current = self.progress },
      })
      return () => st.kill()
    })

    mm.add('(prefers-reduced-motion: reduce)', () => {
      progressRef.current = 1
    })

    // ── Draw loop ──────────────────────────────────────────────────────────
    const draw = () => {
      const p   = progressRef.current
      // Use logical (CSS) dimensions for all coordinate math
      const W   = logWRef.current || window.innerWidth
      const H   = logHRef.current || window.innerHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 3)
      const ctx = canvas.getContext('2d')!

      // Apply DPR transform every frame — keeps coordinates in logical pixels
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // Theme-aware colors — re-read every frame so live switching works
      const isLight = document.documentElement.getAttribute('data-theme') === 'light'
      const BG_FRAME      = isLight ? '#EBF0FA' : BG
      const TEAL_FRAME    = isLight ? '#0080B8' : TEAL
      const headingColor  = isLight ? 'rgba(7,11,20,0.88)' : 'rgba(240,244,255,0.92)'
      const subColor      = isLight ? 'rgba(7,11,20,0.55)' : 'rgba(240,244,255,0.45)'
      const ledText       = isLight ? 'rgba(0,128,184,0.55)' : 'rgba(0,200,255,0.45)'

      // Base fill
      ctx.fillStyle = BG_FRAME
      ctx.fillRect(0, 0, W, H)

      // ── Underlying content (revealed beneath the blackout) ──────────────
      if (p > 0.28) {
        const rp = easeOut((p - 0.28) / 0.72)
        ctx.save()

        // Subtle node mesh
        const meshNodes: [number, number][] = [
          [0.12, 0.3], [0.25, 0.6], [0.38, 0.25], [0.5, 0.5],
          [0.62, 0.75], [0.75, 0.4], [0.88, 0.65],
          [0.2, 0.8], [0.5, 0.15], [0.8, 0.2],
        ]
        const meshEdges: [number, number][] = [
          [0,1],[1,3],[2,3],[3,4],[3,5],[4,6],[5,6],[0,2],[7,1],[8,2],[9,5],
        ]
        meshEdges.forEach(([a, b]) => {
          const na = meshNodes[a], nb = meshNodes[b]
          ctx.beginPath()
          ctx.moveTo(na[0] * W, na[1] * H)
          ctx.lineTo(nb[0] * W, nb[1] * H)
          ctx.strokeStyle = isLight
            ? `rgba(0,128,184,${rp * 0.18})`
            : `rgba(0,200,255,${rp * 0.12})`
          ctx.lineWidth   = 0.6
          ctx.stroke()
        })
        meshNodes.forEach(([rx, ry], i) => {
          const np = Math.max(0, Math.min(1, rp * 2 - i * 0.12))
          ctx.beginPath()
          ctx.arc(rx * W, ry * H, i === 3 ? 5 : 2.5, 0, Math.PI * 2)
          ctx.fillStyle   = i === 3 ? TEAL_FRAME : `rgba(0,128,184,${np * 0.6})`
          if (i === 3) { ctx.shadowColor = TEAL_FRAME; ctx.shadowBlur = rp * 14 }
          ctx.globalAlpha = np
          ctx.fill()
          ctx.shadowBlur  = 0
        })

        // Eyebrow — larger minimum for mobile readability
        ctx.globalAlpha = rp
        const eyebrowSize = Math.max(10, Math.round(Math.min(W * 0.026, 11)))
        ctx.font         = `500 ${eyebrowSize}px 'JetBrains Mono', monospace`
        ctx.fillStyle    = TEAL_FRAME
        ctx.textAlign    = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText('24/7 MONITORING', W / 2, H / 2 - 64)

        // Main heading — mobile-safe minimum of 28px
        const headSize = Math.max(28, Math.round(Math.min(W * 0.075, 56)))
        ctx.font      = `700 ${headSize}px 'Space Grotesk', sans-serif`
        ctx.fillStyle = headingColor
        ctx.fillText('We see it', W / 2, H / 2 - 16)
        ctx.fillText('before you do.', W / 2, H / 2 + headSize * 1.1 - 16)

        // Sub — wrap to two lines on narrow screens
        const subSize = Math.max(13, Math.round(Math.min(W * 0.030, 16)))
        ctx.font      = `400 ${subSize}px 'Inter', sans-serif`
        ctx.fillStyle = subColor
        const subY = H / 2 + headSize * 2.4 - 16
        if (W < 520) {
          ctx.fillText('Every system. Every layer.', W / 2, subY)
          ctx.fillText('Round the clock.', W / 2, subY + subSize * 1.6)
        } else {
          ctx.fillText('Every system. Every layer. Round the clock.', W / 2, subY)
        }

        ctx.restore()
      }

      // ── Blackout mask with radial hole ─────────────────────────────────
      if (p < 0.97) {
        const maxR  = Math.sqrt(W * W + H * H)
        const holep = p < 0.05 ? 0 : easeOut((p - 0.05) / 0.92)
        const radius = holep * maxR * 0.84

        ctx.save()
        ctx.fillStyle = '#000000'
        ctx.beginPath()
        ctx.rect(0, 0, W, H)
        if (radius > 1) {
          ctx.arc(W / 2, H / 2, radius, 0, Math.PI * 2, true) // anticlockwise = hole
        }
        ctx.fill('evenodd')
        ctx.restore()
      }

      // ── LED pulse (visible in the dark, before reveal) ──────────────────
      const ledAlpha = Math.max(0, (0.1 - p) / 0.1)
      if (ledAlpha > 0) {
        const pulse = Math.sin(Date.now() / 420) * 0.4 + 0.6
        ctx.save()
        ctx.globalAlpha  = ledAlpha * pulse
        ctx.shadowColor  = TEAL_FRAME
        ctx.shadowBlur   = 22 * pulse
        ctx.beginPath()
        ctx.arc(W / 2, H / 2, 5, 0, Math.PI * 2)
        ctx.fillStyle = TEAL_FRAME
        ctx.fill()
        ctx.shadowBlur = 0

        ctx.font         = '400 11px monospace'
        ctx.fillStyle    = ledText
        ctx.textAlign    = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText('POWER LOST', W / 2, H / 2 + 28)
        ctx.restore()
      }

      // ── Shockwave ring (at moment power restores) ───────────────────────
      if (p > 0.04 && p < 0.32) {
        const wp = easeOut((p - 0.04) / 0.28)
        ctx.save()
        ctx.globalAlpha   = (1 - wp) * 0.55
        ctx.strokeStyle   = TEAL_FRAME
        ctx.lineWidth     = 1.8
        ctx.beginPath()
        ctx.arc(W / 2, H / 2, wp * Math.min(W, H) * 0.6, 0, Math.PI * 2)
        ctx.stroke()
        ctx.restore()
      }

      // Second ring (slightly delayed)
      if (p > 0.09 && p < 0.38) {
        const wp2 = easeOut((p - 0.09) / 0.29)
        ctx.save()
        ctx.globalAlpha = (1 - wp2) * 0.28
        ctx.strokeStyle = TEAL_FRAME
        ctx.lineWidth   = 1
        ctx.beginPath()
        ctx.arc(W / 2, H / 2, wp2 * Math.min(W, H) * 0.65, 0, Math.PI * 2)
        ctx.stroke()
        ctx.restore()
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafRef.current)
      mm.revert()
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      aria-hidden="true"
      style={{ height: '250vh', position: 'relative' }}
    >
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
        <canvas
          ref={canvasRef}
          style={{ display: 'block', width: '100%', height: '100%' }}
        />
      </div>
    </section>
  )
}
