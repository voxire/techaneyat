'use client'
import React, { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'

// Live accent colour: reads CSS variable, updates on theme toggle
function useAccentColor(): string {
  const [color, setColor] = useState('#00C8FF')
  useEffect(() => {
    const read = () => {
      const raw = getComputedStyle(document.documentElement)
        .getPropertyValue('--tn-accent').trim()
      setColor(raw || '#00C8FF')
    }
    read()
    const obs = new MutationObserver(read)
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => obs.disconnect()
  }, [])
  return color
}

// ─── Layout: viewBox 1000 × 860 ──────────────────────────────────────────────
const HUB = { id: 'enterprise', cx: 500, cy: 420, r: 70 }

const SECTORS = [
  {
    id: 'education',
    label: 'Education',
    desc: 'Campus networks. Smart classrooms. Full surveillance coverage.',
    cx: 500, cy:  90, r: 52,
  },
  {
    id: 'healthcare',
    label: 'Healthcare',
    desc: 'Hospital-grade uptime. HIPAA-aligned network architecture.',
    cx: 840, cy: 230, r: 52,
  },
  {
    id: 'government',
    label: 'Government',
    desc: 'Secure. Compliant. Always available. Zero tolerance for downtime.',
    cx: 840, cy: 610, r: 52,
  },
  {
    id: 'retail',
    label: 'Retail',
    desc: 'POS networks, CCTV, and power continuity under one SLA.',
    cx: 500, cy: 750, r: 52,
  },
  {
    id: 'ngo',
    label: 'NGO',
    desc: 'Reliable connectivity for mission-critical field operations.',
    cx: 160, cy: 610, r: 52,
  },
  {
    id: 'finance',
    label: 'Financial Sector',
    desc: 'High-availability infrastructure for fintech and banking.',
    cx: 160, cy: 230, r: 52,
  },
]

// ─── Packet config ────────────────────────────────────────────────────────────
const PACKETS_PER_SPOKE  = 2
const PACKET_SPEED_NORM  = 2.6   // seconds hub → sector
const PACKET_SPEED_FAST  = 1.0   // seconds when hovered

// ─── Matrix scramble config ───────────────────────────────────────────────────
const MATRIX_CHARS    = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*|<>/\\[]{}^~'
const SCRAMBLE_FRAMES = 42
const RESOLVE_START   = 8
const FRAME_MS        = 28

// ─── Icons ────────────────────────────────────────────────────────────────────
const SectorIcons: Record<string, React.ReactNode> = {
  education: (
    <g stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M0 -9 L-11 -4 L0 1 L11 -4 Z" />
      <polyline points="-6,-.5 -6,6 0,9 6,6 6,-.5" />
    </g>
  ),
  healthcare: (
    <g stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M0 9C0 9-10 2-10-4a5 5 0 0 1 10-1 5 5 0 0 1 10 1C10 2 0 9 0 9z" />
      <line x1="0" y1="-1" x2="0" y2="5" />
      <line x1="-3" y1="2" x2="3" y2="2" />
    </g>
  ),
  government: (
    <g stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <line x1="-11" y1="9" x2="11" y2="9" />
      <polyline points="-11,-2 0,-9 11,-2" />
      <rect x="-8" y="-2" width="4" height="11" />
      <rect x="-2" y="-2" width="4" height="11" />
      <rect x="4"  y="-2" width="4" height="11" />
    </g>
  ),
  retail: (
    <g stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M-11-5 L-8 8 L8 8 L11-5 Z" />
      <circle cx="-3" cy="10.5" r="1.8" />
      <circle cx=" 3" cy="10.5" r="1.8" />
      <line x1="-9" y1="-5" x2="-11" y2="-9" />
    </g>
  ),
  ngo: (
    <g stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="0" cy="0" r="10" />
      <ellipse cx="0" cy="0" rx="4" ry="10" />
      <line x1="-10" y1="0" x2="10" y2="0" />
    </g>
  ),
  finance: (
    <g stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <line x1="0" y1="-10" x2="0" y2="-6" />
      <line x1="0" y1="6"   x2="0" y2="10" />
      <path d="M-5-6h6a3 3 0 0 1 0 6H-1a3 3 0 0 0 0 6h7" />
    </g>
  ),
}

const HubIcon = (
  <g stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <rect x="-13" y="-13" width="26" height="26" rx="3" />
    <line x1="-13" y1="-4" x2="13" y2="-4" />
    <line x1="-13" y1="4"  x2="13" y2="4"  />
    <line x1="-4"  y1="-4" x2="-4" y2="13" />
  </g>
)

// ─── Types ────────────────────────────────────────────────────────────────────
interface MatrixState {
  resolved:  string
  scrambled: string
  done:      boolean
}

// ─── Component ────────────────────────────────────────────────────────────────
export function NetworkMap() {
  const accentColor = useAccentColor()

  const [hovered, setHovered]       = useState<string | null>(null)
  const [matrix, setMatrix]         = useState<MatrixState | null>(null)
  const [overlayPos, setOverlayPos] = useState<{ x: number; y: number } | null>(null)
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null)

  const diagramRef   = useRef<HTMLDivElement>(null)
  const pulse1Ref    = useRef<SVGCircleElement>(null)
  const pulse2Ref    = useRef<SVGCircleElement>(null)
  const sectorRefs   = useRef<(SVGGElement | null)[]>([])
  const lineRefs     = useRef<(SVGLineElement | null)[]>([])
  // packetRefs[i][p]: 6 spokes × 2 packets each
  const packetRefs   = useRef<(SVGCircleElement | null)[][]>(
    Array.from({ length: SECTORS.length }, () => Array(PACKETS_PER_SPOKE).fill(null))
  )
  const packetTweens = useRef<gsap.core.Tween[][]>(
    Array.from({ length: SECTORS.length }, () => [])
  )
  const scrambleRef  = useRef<ReturnType<typeof setInterval> | null>(null)

  // ── Mount: start all looping animations ────────────────────────────────────
  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {

      // Double pulse rings on hub
      ;[pulse1Ref, pulse2Ref].forEach((ref, idx) => {
        if (!ref.current) return
        gsap.fromTo(
          ref.current,
          { attr: { r: HUB.r + 2, opacity: 0.55 } },
          {
            attr: { r: HUB.r + 52, opacity: 0 },
            duration: 3.2,
            ease: 'power1.out',
            repeat: -1,
            delay: idx * 1.6,
          }
        )
      })

      // Dashed line march
      lineRefs.current.forEach((el, i) => {
        if (!el) return
        gsap.to(el, {
          strokeDashoffset: -48,
          duration: 2.4,
          ease: 'none',
          repeat: -1,
          delay: i * 0.3,
        })
      })

      // Float: sector nodes bob up/down on staggered cycles
      sectorRefs.current.forEach((el, i) => {
        if (!el) return
        gsap.to(el, {
          y: i % 2 === 0 ? -6 : 6,
          duration: 3 + i * 0.45,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        })
      })

      // Data packets: travel hub → sector, fade in then out
      SECTORS.forEach((s, i) => {
        const tweens: gsap.core.Tween[] = []
        for (let p = 0; p < PACKETS_PER_SPOKE; p++) {
          const el = packetRefs.current[i][p]
          if (!el) continue
          const delay = p * (PACKET_SPEED_NORM / PACKETS_PER_SPOKE) + i * 0.28
          const tween = gsap.fromTo(
            el,
            { attr: { cx: HUB.cx, cy: HUB.cy }, opacity: 0 },
            {
              attr: { cx: s.cx, cy: s.cy },
              opacity: 0,
              duration: PACKET_SPEED_NORM,
              ease: 'none',
              repeat: -1,
              delay,
              repeatRefresh: true,
              onRepeat() {
                // ensure packet resets opacity for next cycle
                gsap.set(el, { opacity: 0 })
              },
              onUpdate(this: gsap.core.Tween) {
                // fade-in over first 15%, full for 70%, fade-out last 15%
                const prog = this.progress()
                let op = 0
                if (prog < 0.15)       op = prog / 0.15
                else if (prog < 0.85)  op = 1
                else                   op = (1 - prog) / 0.15
                gsap.set(el, { opacity: op * 0.9 })
              },
            }
          )
          tweens.push(tween)
        }
        packetTweens.current[i] = tweens
      })
    })

    return () => {
      packetTweens.current.flat().forEach(t => t.kill())
      mm.revert()
    }
  }, [])

  // ── Hover: dim/highlight sectors, lines, packets, scale ────────────────────
  useEffect(() => {
    const hovIdx = hovered ? SECTORS.findIndex(s => s.id === hovered) : -1

    sectorRefs.current.forEach((el, i) => {
      if (!el) return
      const active = hovered === null || hovered === SECTORS[i].id
      gsap.to(el, {
        opacity: active ? 1 : 0.15,
        scale: hovered === SECTORS[i].id ? 1.08 : 1,
        svgOrigin: `${SECTORS[i].cx} ${SECTORS[i].cy}`,
        duration: 0.28,
        ease: 'power2.out',
      })
    })

    lineRefs.current.forEach((el, i) => {
      if (!el) return
      const active = hovered === SECTORS[i].id
      gsap.to(el, {
        strokeOpacity: active ? 0.95 : hovered ? 0.06 : 0.32,
        strokeWidth:   active ? 3    : hovered ? 1    : 1.5,
        filter: active
          ? 'drop-shadow(0 0 6px rgba(0,200,255,0.9))'
          : 'none',
        duration: 0.28,
      })
    })

    // Speed up packets on hovered spoke, restore others
    packetTweens.current.forEach((tweens, i) => {
      const speed = (hovIdx !== -1 && i === hovIdx)
        ? PACKET_SPEED_NORM / PACKET_SPEED_FAST
        : 1
      tweens.forEach(t => t.timeScale(speed))
    })
  }, [hovered])

  // ── Matrix scramble ─────────────────────────────────────────────────────────
  const startScramble = useCallback((target: string) => {
    if (scrambleRef.current) clearInterval(scrambleRef.current)
    let frame = 0
    scrambleRef.current = setInterval(() => {
      frame++
      const resolvedCount = Math.max(
        0,
        Math.floor((frame - RESOLVE_START) / (SCRAMBLE_FRAMES - RESOLVE_START) * target.length)
      )
      const resolved  = target.slice(0, resolvedCount)
      const remaining = target.slice(resolvedCount)
      const scrambled = Array.from(remaining, ch =>
        ch === ' ' || ch === '.' ? ch
          : MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]
      ).join('')
      const done = frame >= SCRAMBLE_FRAMES
      setMatrix({ resolved: done ? target : resolved, scrambled: done ? '' : scrambled, done })
      if (done) clearInterval(scrambleRef.current!)
    }, FRAME_MS)
  }, [])

  const stopScramble = useCallback(() => {
    if (scrambleRef.current) { clearInterval(scrambleRef.current); scrambleRef.current = null }
    setMatrix(null)
  }, [])

  // ── Node event handlers ─────────────────────────────────────────────────────
  function handleEnter(id: string, i: number) {
    setHovered(id)
    const groupEl = sectorRefs.current[i]
    const diagEl  = diagramRef.current
    if (!groupEl || !diagEl) return
    const gr = groupEl.getBoundingClientRect()
    const dr = diagEl.getBoundingClientRect()
    setOverlayPos({
      x: gr.left - dr.left + gr.width  / 2,
      y: gr.top  - dr.top  + gr.height + 8,
    })
    startScramble(SECTORS[i].desc)
  }

  function handleLeave() {
    setHovered(null)
    setOverlayPos(null)
    stopScramble()
  }

  const activeSector = hovered ? SECTORS.find(s => s.id === hovered) : null

  return (
    <section
      style={{
        background: 'var(--tn-bg-2)',
        padding: 'clamp(64px, 10vw, 120px) 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* ── Radial atmosphere glow ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '900px',
          height: '900px',
          background:
            'radial-gradient(ellipse at center, rgba(0,200,255,0.065) 0%, rgba(0,200,255,0.02) 45%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <style>{`
        .nm2-wrap   { max-width: 1200px; margin: 0 auto; padding: 0 48px; position: relative; z-index: 1; }
        .nm2-header { text-align: center; margin-bottom: 64px; }

        .nm2-diagram {
          position: relative;
          max-width: 800px;
          margin: 0 auto;
          user-select: none;
        }
        .nm2-diagram svg { width: 100%; height: auto; display: block; overflow: visible; }

        .nm2-sector { cursor: pointer; }

        /* Matrix overlay */
        .nm2-matrix {
          position: absolute;
          transform: translateX(-50%);
          background: rgba(4, 8, 18, 0.94);
          border: 1px solid rgba(0, 200, 255, 0.35);
          border-radius: 6px;
          padding: 12px 18px;
          pointer-events: none;
          z-index: 20;
          backdrop-filter: blur(16px);
          min-width: 220px;
          max-width: 290px;
          text-align: center;
          animation: nm2-fade-in 0.15s ease forwards;
        }
        @keyframes nm2-fade-in {
          from { opacity: 0; transform: translateX(-50%) translateY(5px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0);   }
        }
        .nm2-matrix-label {
          font-family: var(--tn-font-mono);
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--tn-accent);
          margin-bottom: 8px;
          opacity: 0.75;
        }
        .nm2-matrix-text {
          font-family: var(--tn-font-mono);
          font-size: 11px;
          line-height: 1.65;
          letter-spacing: 0.04em;
          white-space: pre-wrap;
          word-break: break-word;
        }
        .nm2-matrix-resolved  { color: var(--tn-accent); }
        .nm2-matrix-scrambled { color: #00FF41; }
        .nm2-matrix-cursor {
          display: inline-block;
          width: 7px; height: 11px;
          background: #00FF41;
          margin-left: 1px;
          vertical-align: middle;
          animation: nm2-blink 0.5s step-end infinite;
        }
        @keyframes nm2-blink { 50% { opacity: 0; } }

        @media (max-width: 767px) {
          .nm2-wrap    { padding: 0 24px; }
          .nm2-diagram { max-width: 100%; }
          .nm2-matrix  { min-width: 180px; }
        }
        /* Touch devices: swap hint word */
        .nm2-hint-tap  { display: none; }
        .nm2-hint-hover { display: inline; }
        @media (hover: none) {
          .nm2-hint-hover { display: none; }
          .nm2-hint-tap   { display: inline; }
        }

        /* ── Mobile accordion ── */
        .nm2-mobile-grid { display: none; }

        @media (max-width: 767px) {
          /* Hide desktop diagram and hint on mobile */
          .nm2-diagram { display: none !important; }
          .nm2-hint-hover, .nm2-hint-tap,
          .nm2-hint-hover + span + span { display: none !important; }
          p[style*="marginTop: 32px"] { display: none !important; }

          /* Show mobile accordion */
          .nm2-mobile-grid {
            display: flex;
            flex-direction: column;
            gap: 8px;
            margin-top: 40px;
          }
          .nm2-mobile-card {
            border: 1px solid var(--tn-border);
            border-radius: 10px;
            background: var(--tn-bg-3);
            cursor: pointer;
            overflow: hidden;
            transition: border-color 0.2s, box-shadow 0.2s;
          }
          .nm2-mobile-card--open {
            border-color: var(--tn-border-accent);
            box-shadow: 0 0 20px rgba(0,200,255,0.10);
          }
          .nm2-mobile-card-header {
            display: flex;
            align-items: center;
            gap: 14px;
            padding: 16px;
          }
          .nm2-mobile-icon {
            width: 40px; height: 40px;
            border-radius: 8px;
            background: rgba(0,200,255,0.08);
            border: 1px solid rgba(0,200,255,0.20);
            display: flex; align-items: center; justify-content: center;
            flex-shrink: 0;
          }
          .nm2-mobile-label {
            flex: 1;
            font-family: var(--tn-font-display);
            font-size: 13px;
            font-weight: 600;
            color: var(--tn-text);
            letter-spacing: 0.03em;
          }
          .nm2-mobile-arrow {
            color: var(--tn-accent);
            font-size: 20px;
            font-weight: 300;
            line-height: 1;
            width: 24px;
            text-align: center;
            flex-shrink: 0;
          }
          .nm2-mobile-desc {
            padding: 0 16px 16px 70px;
            margin: 0;
            font-size: 14px;
            line-height: 1.65;
            color: var(--tn-text-2);
            animation: nm2-expand 0.18s ease;
          }
          @keyframes nm2-expand {
            from { opacity: 0; transform: translateY(-6px); }
            to   { opacity: 1; transform: translateY(0); }
          }
        }
      `}</style>

      <div className="nm2-wrap">
        {/* Header */}
        <div className="nm2-header">
          <p className="eyebrow" style={{ justifyContent: 'center', marginBottom: '16px' }}>
            Infrastructure Presence
          </p>
          <h2 style={{ marginBottom: '16px' }}>One SLA across every sector.</h2>
          <p style={{ color: 'var(--tn-text-2)', fontSize: '18px', maxWidth: '520px', margin: '0 auto' }}>
            From government ministries to school campuses. One partner handles the full infrastructure stack.
          </p>
        </div>

        {/* Diagram */}
        <div className="nm2-diagram" ref={diagramRef}>
          <svg
            viewBox="0 0 1000 860"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Techaneyat sector network diagram"
          >
            <defs>
              {/* ── 3D Sphere gradients ────────────────────────────────── */}

              {/* ── Sphere shading: directional light from upper-left ─────── */}
              {/* Diffuse: gradient centre is in the lit corner, r=62%       */}
              {/* so the shadow hemisphere (bottom-right) gets zero teal     */}

              <radialGradient id="nm2-sphere-diffuse" cx="24%" cy="16%" r="62%">
                <stop offset="0%"   stopColor={accentColor} stopOpacity="0.80" />
                <stop offset="40%"  stopColor={accentColor} stopOpacity="0.35" />
                <stop offset="75%"  stopColor={accentColor} stopOpacity="0.08" />
                <stop offset="100%" stopColor={accentColor} stopOpacity="0.00" />
              </radialGradient>

              <radialGradient id="nm2-sphere-diffuse-hov" cx="24%" cy="16%" r="62%">
                <stop offset="0%"   stopColor={accentColor} stopOpacity="1.00" />
                <stop offset="35%"  stopColor={accentColor} stopOpacity="0.50" />
                <stop offset="72%"  stopColor={accentColor} stopOpacity="0.12" />
                <stop offset="100%" stopColor={accentColor} stopOpacity="0.00" />
              </radialGradient>

              {/* Specular: tiny pinpoint at same lit corner */}
              <radialGradient id="nm2-sphere-spec" cx="27%" cy="17%" r="18%">
                <stop offset="0%"   stopColor="white" stopOpacity="0.95" />
                <stop offset="45%"  stopColor="white" stopOpacity="0.18" />
                <stop offset="100%" stopColor="white" stopOpacity="0.00" />
              </radialGradient>

              <radialGradient id="nm2-sphere-spec-hov" cx="27%" cy="17%" r="18%">
                <stop offset="0%"   stopColor="white" stopOpacity="1.00" />
                <stop offset="40%"  stopColor="white" stopOpacity="0.28" />
                <stop offset="100%" stopColor="white" stopOpacity="0.00" />
              </radialGradient>

              {/* Bounce light: small secondary highlight at bottom          */}
              {/* (reflected light from below: classic sphere cue)          */}
              <radialGradient id="nm2-sphere-bounce" cx="50%" cy="94%" r="24%">
                <stop offset="0%"   stopColor={accentColor} stopOpacity="0.40" />
                <stop offset="100%" stopColor={accentColor} stopOpacity="0.00" />
              </radialGradient>

              {/* Hub: same physics, stronger values */}
              <radialGradient id="nm2-hub-diffuse" cx="24%" cy="16%" r="62%">
                <stop offset="0%"   stopColor={accentColor} stopOpacity="1.00" />
                <stop offset="35%"  stopColor={accentColor} stopOpacity="0.50" />
                <stop offset="70%"  stopColor={accentColor} stopOpacity="0.12" />
                <stop offset="100%" stopColor={accentColor} stopOpacity="0.00" />
              </radialGradient>

              <radialGradient id="nm2-hub-spec" cx="25%" cy="15%" r="20%">
                <stop offset="0%"   stopColor="white" stopOpacity="1.00" />
                <stop offset="40%"  stopColor="white" stopOpacity="0.30" />
                <stop offset="100%" stopColor="white" stopOpacity="0.00" />
              </radialGradient>

              <radialGradient id="nm2-hub-bounce" cx="50%" cy="94%" r="30%">
                <stop offset="0%"   stopColor={accentColor} stopOpacity="0.55" />
                <stop offset="100%" stopColor={accentColor} stopOpacity="0.00" />
              </radialGradient>

              {/* ── Filters ───────────────────────────────────────────── */}

              {/* Drop shadow under nodes */}
              <filter id="nm2-drop-shadow" x="-50%" y="-50%" width="200%" height="300%">
                <feGaussianBlur stdDeviation="7" />
              </filter>

              {/* Rim glow on sector stroke */}
              <filter id="nm2-sector-glow" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Hub outer glow */}
              <filter id="nm2-hub-glow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="14" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Packet glow */}
              <filter id="nm2-packet-glow" x="-200%" y="-200%" width="500%" height="500%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* ── Connection lines ── */}
            {SECTORS.map((s, i) => (
              <line
                key={s.id}
                ref={el => { lineRefs.current[i] = el }}
                x1={HUB.cx} y1={HUB.cy}
                x2={s.cx}   y2={s.cy}
                stroke="var(--tn-accent)"
                strokeWidth="1.5"
                strokeOpacity="0.32"
                strokeDasharray="8 8"
                strokeDashoffset="0"
                style={{ vectorEffect: 'non-scaling-stroke' }}
              />
            ))}

            {/* ── Data packets: one group per spoke, two packets each ── */}
            {SECTORS.map((s, i) =>
              Array.from({ length: PACKETS_PER_SPOKE }, (_, p) => (
                <circle
                  key={`pkt-${i}-${p}`}
                  ref={el => { packetRefs.current[i][p] = el }}
                  cx={HUB.cx}
                  cy={HUB.cy}
                  r="3.5"
                  fill="var(--tn-accent)"
                  opacity="0"
                  filter="url(#nm2-packet-glow)"
                  style={{ pointerEvents: 'none' }}
                />
              ))
            )}

            {/* ── Sector nodes: 3D spheres ── */}
            {SECTORS.map((s, i) => {
              const active = hovered === s.id
              return (
                <g
                  key={s.id}
                  ref={el => { sectorRefs.current[i] = el }}
                  className="nm2-sector"
                  onMouseEnter={() => handleEnter(s.id, i)}
                  onMouseLeave={handleLeave}
                  onClick={() => hovered === s.id ? handleLeave() : handleEnter(s.id, i)}
                >
                  {/* Layer 0: drop shadow ellipse */}
                  <ellipse
                    cx={s.cx} cy={s.cy + s.r * 0.92}
                    rx={s.r * 0.80} ry={s.r * 0.20}
                    fill="var(--tn-bg)"
                    filter="url(#nm2-drop-shadow)"
                    style={{ pointerEvents: 'none' }}
                  />
                  {/* Layer 1: dark base, shadow hemisphere lives here */}
                  <circle cx={s.cx} cy={s.cy} r={s.r} fill="var(--tn-bg)" />
                  {/* Layer 2: directional teal diffuse, only covers lit side */}
                  <circle
                    cx={s.cx} cy={s.cy} r={s.r}
                    fill={active ? 'url(#nm2-sphere-diffuse-hov)' : 'url(#nm2-sphere-diffuse)'}
                  />
                  {/* Layer 3: bounce light from below */}
                  <circle cx={s.cx} cy={s.cy} r={s.r} fill="url(#nm2-sphere-bounce)" />
                  {/* Layer 5: rim stroke with soft glow */}
                  <circle
                    cx={s.cx} cy={s.cy} r={s.r}
                    fill="none"
                    stroke="var(--tn-accent)"
                    strokeWidth={active ? 2.0 : 1.2}
                    filter="url(#nm2-sector-glow)"
                  />
                  {/* Layer 6: specular hotspot */}
                  <circle
                    cx={s.cx} cy={s.cy} r={s.r}
                    fill={active ? 'url(#nm2-sphere-spec-hov)' : 'url(#nm2-sphere-spec)'}
                    style={{ pointerEvents: 'none' }}
                  />
                  {/* Icon */}
                  <g transform={`translate(${s.cx},${s.cy - 10})`} color="var(--tn-accent)">
                    {SectorIcons[s.id]}
                  </g>
                  {/* Label */}
                  <text
                    x={s.cx} y={s.cy + 16}
                    textAnchor="middle"
                    fill="var(--tn-text)"
                    fontSize="11"
                    fontFamily="var(--tn-font-mono)"
                    fontWeight="500"
                    letterSpacing="1"
                    style={{ textTransform: 'uppercase' }}
                  >
                    {s.label}
                  </text>
                </g>
              )
            })}

            {/* ── Hub node: 3D sphere, larger + more dramatic ── */}
            <g style={{ pointerEvents: 'none' }}>
              {/* Pulse rings (expand outward) */}
              <circle ref={pulse1Ref}
                cx={HUB.cx} cy={HUB.cy} r={HUB.r + 2}
                fill="none" stroke="var(--tn-accent)" strokeWidth="1.2" opacity="0"
              />
              <circle ref={pulse2Ref}
                cx={HUB.cx} cy={HUB.cy} r={HUB.r + 2}
                fill="none" stroke="var(--tn-accent)" strokeWidth="0.8" opacity="0"
              />

              {/* Drop shadow */}
              <ellipse
                cx={HUB.cx} cy={HUB.cy + HUB.r * 0.90}
                rx={HUB.r * 0.82} ry={HUB.r * 0.22}
                fill="var(--tn-bg)"
                filter="url(#nm2-drop-shadow)"
              />
              {/* Dark sphere base */}
              <circle cx={HUB.cx} cy={HUB.cy} r={HUB.r} fill="var(--tn-bg)" />
              {/* Hub diffuse (strong teal lit side) */}
              <circle cx={HUB.cx} cy={HUB.cy} r={HUB.r} fill="url(#nm2-hub-diffuse)" />
              {/* Hub bounce light */}
              <circle cx={HUB.cx} cy={HUB.cy} r={HUB.r} fill="url(#nm2-hub-bounce)" />
              {/* Rim stroke with big glow */}
              <circle
                cx={HUB.cx} cy={HUB.cy} r={HUB.r}
                fill="none" stroke="var(--tn-accent)" strokeWidth="2"
                filter="url(#nm2-hub-glow)"
              />
              {/* Hub specular */}
              <circle cx={HUB.cx} cy={HUB.cy} r={HUB.r} fill="url(#nm2-hub-spec)" />

              {/* Icon */}
              <g transform={`translate(${HUB.cx},${HUB.cy - 16})`} color="var(--tn-accent)">
                {HubIcon}
              </g>
              {/* Labels */}
              <text
                x={HUB.cx} y={HUB.cy + 16}
                textAnchor="middle"
                fill="var(--tn-accent)"
                fontSize="13" fontFamily="var(--tn-font-mono)" fontWeight="600" letterSpacing="2"
                style={{ textTransform: 'uppercase' }}
              >
                Techaneyat
              </text>
              <text
                x={HUB.cx} y={HUB.cy + 32}
                textAnchor="middle"
                fill="var(--tn-text-3)"
                fontSize="8.5" fontFamily="var(--tn-font-mono)" letterSpacing="1"
                style={{ textTransform: 'uppercase' }}
              >
                One SLA
              </text>
            </g>
          </svg>

          {/* ── Matrix scramble overlay ── */}
          {hovered && overlayPos && activeSector && matrix && (
            <div
              className="nm2-matrix"
              style={{ left: overlayPos.x, top: overlayPos.y }}
            >
              <div className="nm2-matrix-label">{activeSector.label}</div>
              <div className="nm2-matrix-text">
                <span className="nm2-matrix-resolved">{matrix.resolved}</span>
                <span className="nm2-matrix-scrambled">{matrix.scrambled}</span>
                {!matrix.done && <span className="nm2-matrix-cursor" />}
              </div>
            </div>
          )}
        </div>

        {/* Hint */}
        <p
          style={{
            textAlign: 'center',
            marginTop: '32px',
            fontFamily: 'var(--tn-font-mono)',
            fontSize: '10px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--tn-text-3)',
          }}
        >
          <span className="nm2-hint-hover">Hover</span>
          <span className="nm2-hint-tap">Tap</span>
          {' '}any sector to see what we deliver
        </p>

        {/* ── Mobile accordion (replaces SVG diagram on small screens) ── */}
        <div className="nm2-mobile-grid">
          {SECTORS.map((s) => {
            const isOpen = expandedMobile === s.id
            return (
              <div
                key={s.id}
                className={`nm2-mobile-card${isOpen ? ' nm2-mobile-card--open' : ''}`}
                onClick={() => setExpandedMobile(isOpen ? null : s.id)}
              >
                <div className="nm2-mobile-card-header">
                  <div className="nm2-mobile-icon">
                    <svg viewBox="-14 -14 28 28" width="22" height="22" color="var(--tn-accent)">
                      {SectorIcons[s.id]}
                    </svg>
                  </div>
                  <span className="nm2-mobile-label">{s.label}</span>
                  <span className="nm2-mobile-arrow" aria-hidden="true">
                    {isOpen ? '−' : '+'}
                  </span>
                </div>
                {isOpen && (
                  <p className="nm2-mobile-desc">{s.desc}</p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
