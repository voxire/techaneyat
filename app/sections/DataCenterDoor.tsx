'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const BG   = '#070B14'
const TEAL = '#00C8FF'

function easeInOut(t: number) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t }
function easeOut(t: number)   { return 1 - (1 - t) * (1 - t) }

// ─── Component ────────────────────────────────────────────────────────────────
export function DataCenterDoor() {
  const sectionRef  = useRef<HTMLElement>(null)
  const canvasRef   = useRef<HTMLCanvasElement>(null)
  const progressRef = useRef(0)
  const rafRef      = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
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
      const ep  = easeInOut(p)
      const W   = canvas.width
      const H   = canvas.height
      const ctx = canvas.getContext('2d')!

      // Theme-aware: outer bg adapts to light/dark; server room stays dark (it IS a server room)
      const isLight    = document.documentElement.getAttribute('data-theme') === 'light'
      const BG_OUTER   = isLight ? '#EBF0FA' : BG
      const TEAL_FRAME = isLight ? '#0080B8' : TEAL

      ctx.fillStyle = BG_OUTER
      ctx.fillRect(0, 0, W, H)

      // ── Server room (always drawn, revealed as door swings open) ─────────
      if (ep > 0) {
        ctx.save()
        ctx.globalAlpha = ep

        // Room background — stays dark; server rooms are dark regardless of page theme
        ctx.fillStyle = '#060910'
        ctx.fillRect(0, 0, W, H)

        // Ambient ceiling glow
        const glowGrad = ctx.createRadialGradient(W / 2, 0, 0, W / 2, 0, H * 0.55)
        glowGrad.addColorStop(0, `rgba(0,200,255,${ep * 0.09})`)
        glowGrad.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = glowGrad
        ctx.fillRect(0, 0, W, H)

        // Floor grid (perspective lines to vanishing point)
        ctx.strokeStyle = `rgba(0,200,255,${ep * 0.07})`
        ctx.lineWidth = 0.5
        const vx = W / 2, vy = H * 0.54
        for (let i = 0; i <= 10; i++) {
          const fx = W * (i / 10)
          ctx.beginPath(); ctx.moveTo(fx, H); ctx.lineTo(vx, vy); ctx.stroke()
        }
        for (let i = 1; i <= 6; i++) {
          const t  = i / 6
          const fy = vy + (H - vy) * t
          const fw = (W / 2) * (1 - (1 - t) * 0.95)
          ctx.beginPath()
          ctx.moveTo(vx - fw, fy)
          ctx.lineTo(vx + fw, fy)
          ctx.stroke()
        }

        // Ceiling lighting strips
        const stripCount = 4
        for (let s = 0; s < stripCount; s++) {
          const sx = W * (0.15 + s * 0.23)
          const lightGrad = ctx.createLinearGradient(sx, 0, sx + W * 0.08, 0)
          lightGrad.addColorStop(0, 'rgba(0,0,0,0)')
          lightGrad.addColorStop(0.5, `rgba(0,200,255,${ep * 0.18})`)
          lightGrad.addColorStop(1, 'rgba(0,0,0,0)')
          ctx.fillStyle = lightGrad
          ctx.fillRect(sx, 0, W * 0.08, 3)
        }

        // Server racks — 3 columns
        const rackDefs = [
          { cx: 0.22 }, { cx: 0.50 }, { cx: 0.78 },
        ]
        const rackW = Math.min(W * 0.13, 90)
        const rackH = H * 0.62
        const rackY = H * 0.13

        rackDefs.forEach((rack) => {
          const rx = rack.cx * W - rackW / 2

          // Rack body
          ctx.fillStyle = `rgba(8,12,22,0.95)`
          ctx.fillRect(rx, rackY, rackW, rackH)
          ctx.strokeStyle = `rgba(0,200,255,${ep * 0.28})`
          ctx.lineWidth = 1
          ctx.strokeRect(rx, rackY, rackW, rackH)

          // Top label bar
          ctx.fillStyle = `rgba(0,200,255,${ep * 0.08})`
          ctx.fillRect(rx + 1, rackY + 1, rackW - 2, 14)

          // Unit rows
          const units  = 10
          const unitH  = (rackH - 20) / units
          for (let u = 0; u < units; u++) {
            const uy    = rackY + 17 + u * unitH
            const litP  = Math.max(0, Math.min(1, (ep * units - u) * 1.2))
            if (litP <= 0) continue

            // Unit bg
            ctx.fillStyle = `rgba(0,200,255,${litP * 0.05})`
            ctx.fillRect(rx + 3, uy + 1, rackW - 6, unitH - 2)

            // Drive bays
            for (let b = 0; b < 2; b++) {
              ctx.fillStyle = `rgba(0,200,255,${litP * 0.35})`
              ctx.fillRect(rx + 5 + b * 12, uy + unitH / 2 - 3, 9, 6)
            }

            // Status LED
            ctx.beginPath()
            ctx.arc(rx + rackW - 9, uy + unitH / 2, 2.5, 0, Math.PI * 2)
            ctx.fillStyle   = litP > 0.5 ? TEAL_FRAME : `rgba(0,200,255,${litP * 0.3})`
            ctx.shadowColor = TEAL_FRAME
            ctx.shadowBlur  = litP > 0.5 ? 8 : 0
            ctx.fill()
            ctx.shadowBlur = 0

            // Activity bar
            if (litP > 0.6) {
              const barX = rx + 30
              const barW = rackW - 44
              ctx.fillStyle = `rgba(0,200,255,0.1)`
              ctx.fillRect(barX, uy + unitH / 2 - 2, barW, 3)
              const act = (Date.now() / 700 + u * 0.4) % 1
              ctx.fillStyle = `rgba(0,200,255,${litP * 0.7})`
              ctx.fillRect(barX + act * barW * 0.7, uy + unitH / 2 - 2, barW * 0.3, 3)
            }
          }
        })

        // ── Text in back of room ──────────────────────────────────────────
        if (p > 0.72) {
          const ta = easeOut((p - 0.72) / 0.28)
          ctx.save()
          ctx.globalAlpha = ep * ta

          const eyeSize  = Math.round(Math.min(W * 0.013, 11))
          ctx.font       = `500 ${eyeSize}px 'JetBrains Mono', monospace`
          ctx.fillStyle  = TEAL
          ctx.textAlign  = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText('SIX SERVICES. ONE CONTRACT.', W / 2, H * 0.46)

          const headSize = Math.round(Math.min(W * 0.038, 40))
          ctx.font       = `700 ${headSize}px 'Space Grotesk', sans-serif`
          ctx.fillStyle  = 'rgba(240,244,255,0.88)'
          ctx.fillText('Your infrastructure,', W / 2, H * 0.46 + eyeSize + headSize)
          ctx.fillText('managed end-to-end.', W / 2, H * 0.46 + eyeSize + headSize * 2.15)

          ctx.restore()
        }

        ctx.restore()
      }

      // ── Door ─────────────────────────────────────────────────────────────
      const doorAngle = ep * 0.88         // 0 = closed, 0.88 rad ~50deg = open
      const doorW = Math.min(W * 0.72, 620)
      const doorH = Math.min(H * 0.88, 720)
      const doorX = (W - doorW) / 2
      const doorY = (H - doorH) / 2

      // Perspective compression: door width shrinks as it swings open
      const skewW = doorW * Math.cos(doorAngle)

      if (skewW > 2) {
        ctx.save()

        // Door face
        ctx.beginPath()
        ctx.moveTo(doorX, doorY)
        ctx.lineTo(doorX + skewW, doorY)
        ctx.lineTo(doorX + skewW, doorY + doorH)
        ctx.lineTo(doorX, doorY + doorH)
        ctx.closePath()

        const base = 14 + Math.round(ep * 5)
        ctx.fillStyle   = `rgb(${base}, ${base + 4}, ${Math.round(base * 1.9)})`
        ctx.fill()
        ctx.strokeStyle = `rgba(0,200,255,${0.45 - ep * 0.22})`
        ctx.lineWidth   = 1.5
        ctx.stroke()

        // ── Door surface details ──────────────────────────────────────────
        const faceAlpha = Math.max(0, Math.cos(doorAngle))
        ctx.globalAlpha = faceAlpha

        // Recessed panels
        const panelPad = skewW * 0.06
        ctx.strokeStyle = 'rgba(0,200,255,0.1)'
        ctx.lineWidth   = 0.8
        // Left panel
        ctx.strokeRect(
          doorX + panelPad,
          doorY + doorH * 0.05,
          skewW * 0.41,
          doorH * 0.9
        )
        // Right panel
        ctx.strokeRect(
          doorX + skewW * 0.53,
          doorY + doorH * 0.05,
          skewW * 0.41,
          doorH * 0.9
        )

        // Ventilation slots (left panel)
        const slotCount = 8
        for (let s = 0; s < slotCount; s++) {
          const sy = doorY + doorH * 0.12 + s * (doorH * 0.68 / slotCount)
          ctx.fillStyle = `rgba(0,0,0,0.4)`
          ctx.fillRect(doorX + panelPad + 4, sy, skewW * 0.41 - 8, 4)
        }

        // Access panel (right panel — keypad area)
        const kx = doorX + skewW * 0.58
        const ky = doorY + doorH * 0.42
        const kw = skewW * 0.32
        const kh = doorH * 0.16
        ctx.fillStyle   = 'rgba(0,0,0,0.5)'
        ctx.fillRect(kx, ky, kw, kh)
        ctx.strokeStyle = `rgba(0,200,255,0.2)`
        ctx.lineWidth   = 0.6
        ctx.strokeRect(kx, ky, kw, kh)

        // Keypad dots
        for (let r = 0; r < 3; r++) {
          for (let col = 0; col < 3; col++) {
            ctx.beginPath()
            ctx.arc(kx + kw * (0.2 + col * 0.3), ky + kh * (0.25 + r * 0.28), 3, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(0,200,255,0.35)`
            ctx.fill()
          }
        }

        // Handle (right side of door)
        const hx = doorX + skewW * 0.9
        const hy = doorY + doorH * 0.5
        ctx.beginPath(); ctx.arc(hx, hy, 7, 0, Math.PI * 2)
        ctx.fillStyle   = `rgba(0,200,255,0.65)`
        ctx.shadowColor = TEAL_FRAME; ctx.shadowBlur = 10
        ctx.fill(); ctx.shadowBlur = 0
        ctx.beginPath(); ctx.arc(hx, hy, 7, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(0,200,255,0.9)`; ctx.lineWidth = 1; ctx.stroke()

        // Door label
        if (skewW > 120 && faceAlpha > 0.25) {
          const fs = Math.round(Math.min(skewW * 0.055, 14))
          ctx.font         = `500 ${fs}px 'JetBrains Mono', monospace`
          ctx.fillStyle    = `rgba(0,200,255,0.28)`
          ctx.textAlign    = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText('DATA CENTER', doorX + skewW * 0.45, doorY + doorH * 0.5)
          ctx.font      = `400 ${Math.round(fs * 0.72)}px 'JetBrains Mono', monospace`
          ctx.fillStyle = `rgba(0,200,255,0.15)`
          ctx.fillText('AUTHORIZED ACCESS ONLY', doorX + skewW * 0.45, doorY + doorH * 0.5 + fs + 5)
        }

        ctx.globalAlpha = 1
        ctx.restore()
      }

      // ── Light bleed at the gap (where door has swung away from frame) ──
      const gapX = doorX + skewW
      const gapW = doorW - skewW
      if (gapW > 1) {
        ctx.save()
        const bleedAlpha = Math.min(1, gapW / 70) * ep * 0.9
        ctx.globalAlpha  = bleedAlpha
        const lightGrad  = ctx.createLinearGradient(gapX, 0, gapX + Math.min(gapW * 1.5, 140), 0)
        lightGrad.addColorStop(0, `rgba(0,200,255,0.7)`)
        lightGrad.addColorStop(0.4, `rgba(0,200,255,0.15)`)
        lightGrad.addColorStop(1, `rgba(0,200,255,0)`)
        ctx.fillStyle = lightGrad
        ctx.fillRect(gapX, doorY, Math.min(gapW * 2, W - gapX), doorH)
        ctx.restore()
      }

      // ── Door frame ────────────────────────────────────────────────────────
      ctx.strokeStyle = `rgba(0,200,255,${0.3 - ep * 0.12})`
      ctx.lineWidth   = 2
      ctx.strokeRect(doorX - 3, doorY - 3, doorW + 6, doorH + 6)

      // Frame bolts (corners)
      const boltPositions: [number, number][] = [
        [doorX - 3, doorY - 3],
        [doorX + doorW + 3, doorY - 3],
        [doorX - 3, doorY + doorH + 3],
        [doorX + doorW + 3, doorY + doorH + 3],
      ]
      boltPositions.forEach(([bx, by]) => {
        ctx.beginPath()
        ctx.arc(bx, by, 4, 0, Math.PI * 2)
        ctx.fillStyle   = `rgba(0,200,255,${0.3 - ep * 0.1})`
        ctx.fill()
      })

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
      style={{ height: '300vh', position: 'relative' }}
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
