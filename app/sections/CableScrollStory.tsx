'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'

gsap.registerPlugin(ScrollTrigger)

// ─── Cable definitions — realistic cable colors ────────────────────────────────
// Each cable has a main jacket color, a darker rim, a bright highlight, and
// a small x-offset so they run as a bundle side-by-side.

const CABLE_DEFS = [
  { color: '#1A7FCC', rim: '#0A3A6A', hi: '#90D0FF', dx: -14, dy: -4 }, // blue
  { color: '#DD7700', rim: '#7A3500', hi: '#FFB870', dx: -7,  dy: -1 }, // orange
  { color: '#CCBB00', rim: '#665D00', hi: '#FFEC55', dx:  0,  dy:  0 }, // yellow
  { color: '#22AA50', rim: '#0A5022', hi: '#70EE98', dx:  7,  dy:  1 }, // green
  { color: '#BB2828', rim: '#5E1010', hi: '#FF7878', dx:  14, dy:  4 }, // red
]

// ─── Inline SVG Illustrations ─────────────────────────────────────────────────

function ServerRackIllus() {
  return (
    <svg viewBox="0 0 120 160" fill="none" aria-hidden="true"
      style={{ width: '100%', maxWidth: 120, height: 'auto' }}>
      <rect x="10" y="10" width="100" height="140" rx="4"
        stroke="var(--tn-accent)" strokeWidth="1.5" strokeOpacity="0.5" />
      <rect x="18" y="18" width="84" height="16" rx="2"
        stroke="var(--tn-accent)" strokeWidth="1" strokeOpacity="0.9" />
      <circle cx="94" cy="26" r="3" fill="var(--tn-accent)" fillOpacity="0.9" />
      <line x1="26" y1="26" x2="74" y2="26"
        stroke="var(--tn-accent)" strokeWidth="0.75" strokeOpacity="0.4" />
      {[42, 62, 82, 102, 122].map((y, i) => (
        <g key={i}>
          <rect x="18" y={y} width="84" height="14" rx="2"
            stroke="var(--tn-accent)" strokeWidth="1" strokeOpacity="0.3" />
          <circle cx="94" cy={y + 7} r="2.5"
            fill="var(--tn-accent)" fillOpacity={i === 0 ? 0.5 : 0.2} />
          <line x1="26" y1={y + 7} x2="68" y2={y + 7}
            stroke="var(--tn-accent)" strokeWidth="0.5" strokeOpacity="0.2" />
        </g>
      ))}
    </svg>
  )
}

function FirewallIllus() {
  return (
    <svg viewBox="0 0 120 140" fill="none" aria-hidden="true"
      style={{ width: '100%', maxWidth: 120, height: 'auto' }}>
      <path d="M60 8 L102 26 L102 72 C102 98 83 118 60 128 C37 118 18 98 18 72 L18 26 Z"
        stroke="var(--tn-accent)" strokeWidth="1.5" strokeOpacity="0.6" />
      <path d="M60 18 L92 32 L92 70 C92 90 76 106 60 114 C44 106 28 90 28 70 L28 32 Z"
        stroke="var(--tn-accent)" strokeWidth="0.75" strokeOpacity="0.2" />
      <rect x="46" y="68" width="28" height="22" rx="3"
        stroke="var(--tn-accent)" strokeWidth="1.5" strokeOpacity="0.9" />
      <path d="M50 68 L50 60 C50 51 70 51 70 60 L70 68"
        stroke="var(--tn-accent)" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.9" />
      <circle cx="60" cy="77" r="3" fill="var(--tn-accent)" fillOpacity="0.8" />
      <line x1="60" y1="80" x2="60" y2="86"
        stroke="var(--tn-accent)" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.8" />
    </svg>
  )
}

function CameraIllus() {
  return (
    <svg viewBox="0 0 148 108" fill="none" aria-hidden="true"
      style={{ width: '100%', maxWidth: 148, height: 'auto' }}>
      <rect x="58" y="4" width="20" height="10" rx="2"
        stroke="var(--tn-accent)" strokeWidth="1" strokeOpacity="0.4" />
      <line x1="68" y1="14" x2="68" y2="30"
        stroke="var(--tn-accent)" strokeWidth="1.5" strokeOpacity="0.5" />
      <path d="M24 30 L108 30 C112 30 116 33 116 38 L116 74 C116 78 112 82 108 82 L24 82 C20 82 16 78 16 74 L16 38 C16 33 20 30 24 30 Z"
        stroke="var(--tn-accent)" strokeWidth="1.5" strokeOpacity="0.7" />
      <circle cx="52" cy="56" r="18" stroke="var(--tn-accent)" strokeWidth="1.5" strokeOpacity="0.9" />
      <circle cx="52" cy="56" r="11" stroke="var(--tn-accent)" strokeWidth="1" strokeOpacity="0.5" />
      <circle cx="52" cy="56" r="5" fill="var(--tn-accent)" fillOpacity="0.7" />
      <rect x="110" y="38" width="8" height="30" rx="4"
        stroke="var(--tn-accent)" strokeWidth="1" strokeOpacity="0.4" />
      <circle cx="98" cy="44" r="3" fill="var(--tn-accent)" fillOpacity="0.9" />
      <circle cx="98" cy="56" r="3" fill="var(--tn-accent)" fillOpacity="0.25" />
    </svg>
  )
}

function CloudIllus() {
  return (
    <svg viewBox="0 0 148 140" fill="none" aria-hidden="true"
      style={{ width: '100%', maxWidth: 148, height: 'auto' }}>
      <path d="M36 72 C24 72 14 62 14 50 C14 39 22 30 32 28 C32 16 42 6 56 6 C66 6 74 12 78 22 C82 18 90 16 98 16 C112 16 124 28 124 42 C132 44 138 52 138 62 C138 72 130 80 120 80 L36 80"
        stroke="var(--tn-accent)" strokeWidth="1.5" strokeOpacity="0.7" />
      <line x1="52" y1="80" x2="52" y2="98"
        stroke="var(--tn-accent)" strokeWidth="1" strokeOpacity="0.35" strokeDasharray="3 3" />
      <line x1="76" y1="80" x2="76" y2="98"
        stroke="var(--tn-accent)" strokeWidth="1" strokeOpacity="0.35" strokeDasharray="3 3" />
      <line x1="100" y1="80" x2="100" y2="98"
        stroke="var(--tn-accent)" strokeWidth="1" strokeOpacity="0.35" strokeDasharray="3 3" />
      <rect x="22" y="98" width="104" height="20" rx="3"
        stroke="var(--tn-accent)" strokeWidth="1.5" strokeOpacity="0.7" />
      <line x1="34" y1="108" x2="96" y2="108"
        stroke="var(--tn-accent)" strokeWidth="0.75" strokeOpacity="0.35" />
      <circle cx="118" cy="108" r="3" fill="var(--tn-accent)" fillOpacity="0.8" />
      <rect x="22" y="124" width="104" height="12" rx="3"
        stroke="var(--tn-accent)" strokeWidth="1" strokeOpacity="0.4" />
    </svg>
  )
}

function UPSIllus() {
  return (
    <svg viewBox="0 0 100 156" fill="none" aria-hidden="true"
      style={{ width: '100%', maxWidth: 100, height: 'auto' }}>
      <rect x="8" y="14" width="84" height="128" rx="6"
        stroke="var(--tn-accent)" strokeWidth="1.5" strokeOpacity="0.7" />
      <rect x="18" y="24" width="64" height="20" rx="3"
        stroke="var(--tn-accent)" strokeWidth="1" strokeOpacity="0.5" />
      <rect x="20" y="26" width="48" height="16" rx="2"
        fill="var(--tn-accent)" fillOpacity="0.18" />
      <rect x="20" y="26" width="48" height="16" rx="2"
        stroke="var(--tn-accent)" strokeWidth="0.5" strokeOpacity="0.3" />
      <path d="M56 30 L50 42 L56 42 L50 52 L64 36 L58 36 Z"
        fill="var(--tn-accent)" fillOpacity="0.9" />
      <rect x="16" y="54" width="30" height="20" rx="2"
        stroke="var(--tn-accent)" strokeWidth="1" strokeOpacity="0.45" />
      <rect x="54" y="54" width="30" height="20" rx="2"
        stroke="var(--tn-accent)" strokeWidth="1" strokeOpacity="0.45" />
      <rect x="16" y="98" width="68" height="30" rx="3"
        stroke="var(--tn-accent)" strokeWidth="1" strokeOpacity="0.5" />
      <line x1="24" y1="108" x2="76" y2="108"
        stroke="var(--tn-accent)" strokeWidth="0.75" strokeOpacity="0.4" />
      <circle cx="50" cy="140" r="6"
        stroke="var(--tn-accent)" strokeWidth="1" strokeOpacity="0.5" />
    </svg>
  )
}

function DesktopIllus() {
  return (
    <svg viewBox="0 0 168 136" fill="none" aria-hidden="true"
      style={{ width: '100%', maxWidth: 168, height: 'auto' }}>
      <rect x="8" y="6" width="108" height="78" rx="5"
        stroke="var(--tn-accent)" strokeWidth="1.5" strokeOpacity="0.7" />
      <rect x="14" y="12" width="96" height="66" rx="2"
        stroke="var(--tn-accent)" strokeWidth="0.75" strokeOpacity="0.2" />
      <line x1="22" y1="24" x2="58" y2="24"
        stroke="var(--tn-accent)" strokeWidth="1.2" strokeOpacity="0.55" />
      <line x1="22" y1="33" x2="74" y2="33"
        stroke="var(--tn-accent)" strokeWidth="1.2" strokeOpacity="0.4" />
      <line x1="28" y1="42" x2="62" y2="42"
        stroke="var(--tn-accent)" strokeWidth="1.2" strokeOpacity="0.35" />
      <line x1="22" y1="51" x2="70" y2="51"
        stroke="var(--tn-accent)" strokeWidth="1.2" strokeOpacity="0.45" />
      <line x1="28" y1="60" x2="52" y2="60"
        stroke="var(--tn-accent)" strokeWidth="1.2" strokeOpacity="0.3" />
      <rect x="84" y="56" width="2" height="12" rx="1"
        fill="var(--tn-accent)" fillOpacity="0.8" />
      <line x1="62" y1="84" x2="62" y2="100"
        stroke="var(--tn-accent)" strokeWidth="2" strokeOpacity="0.5" />
      <line x1="44" y1="100" x2="80" y2="100"
        stroke="var(--tn-accent)" strokeWidth="1.5" strokeOpacity="0.5" />
      <rect x="128" y="42" width="32" height="52" rx="4"
        stroke="var(--tn-accent)" strokeWidth="1.5" strokeOpacity="0.7" />
      <circle cx="144" cy="54" r="3" fill="var(--tn-accent)" fillOpacity="0.7" />
      <rect x="132" y="70" width="20" height="10" rx="2"
        stroke="var(--tn-accent)" strokeWidth="0.75" strokeOpacity="0.3" />
    </svg>
  )
}

// ─── Service Data ─────────────────────────────────────────────────────────────

interface Service {
  id: string
  eyebrow: string
  heading: string
  description: string
  benefit: string
  href: string
  side: 'left' | 'right'
  Illus: () => React.ReactElement
}

const SERVICES: Service[] = [
  {
    id: 'network',
    eyebrow: 'Network & Infrastructure',
    heading: 'The backbone everything runs on.',
    description:
      'Structured cabling, fiber, wireless, and managed switches. Designed for zero single points of failure across your entire site.',
    benefit: 'Redundant topology. Every link.',
    href: '/services/network',
    side: 'right',
    Illus: ServerRackIllus,
  },
  {
    id: 'cybersecurity',
    eyebrow: 'Cybersecurity',
    heading: 'Defense built into your infrastructure.',
    description:
      'Firewalls, endpoint protection, SIEM, and incident response. Security is not bolted on after the fact: it is the foundation.',
    benefit: '24/7 threat monitoring. Zero exceptions.',
    href: '/services/cybersecurity',
    side: 'left',
    Illus: FirewallIllus,
  },
  {
    id: 'smart-security',
    eyebrow: 'Smart Security',
    heading: 'Surveillance with real intelligence.',
    description:
      'IP cameras, access control, and video analytics integrated into a single management layer.',
    benefit: 'Every entry point. Fully logged.',
    href: '/services/smart-security',
    side: 'right',
    Illus: CameraIllus,
  },
  {
    id: 'cloud',
    eyebrow: 'Cloud & Managed Services',
    heading: 'Your workloads. Our responsibility.',
    description:
      'Cloud migration, hybrid architecture, and day-to-day managed IT. Performance SLAs you can hold us to.',
    benefit: '99.9% uptime. No asterisks.',
    href: '/services/cloud',
    side: 'left',
    Illus: CloudIllus,
  },
  {
    id: 'power',
    eyebrow: 'Energy & Power Continuity',
    heading: 'No downtime. Not for any reason.',
    description:
      'UPS systems, generators, and power conditioning designed for Lebanese grid conditions. Your operations run through everything.',
    benefit: 'Continuous power. Full documentation.',
    href: '/services/power',
    side: 'right',
    Illus: UPSIllus,
  },
  {
    id: 'hardware',
    eyebrow: 'Computing & Hardware',
    heading: 'Procurement, deployment, lifecycle.',
    description:
      'Servers, workstations, and peripherals sourced, configured, and warranted by us. One vendor. Full accountability.',
    benefit: 'Configured. Delivered. Supported.',
    href: '/services/hardware',
    side: 'left',
    Illus: DesktopIllus,
  },
]

// ─── Path builder ─────────────────────────────────────────────────────────────
// Builds one SVG path string for a given cable, applying its x/y offset to
// each illustration node before computing the S-curves.

function buildCablePath(
  pts: Array<{ vx: number; vy: number }>,
  dx: number,
  dy: number,
): string {
  if (pts.length === 0) return ''
  const shifted = pts.map(p => ({ vx: p.vx + dx, vy: p.vy + dy }))
  const first = shifted[0]
  let d = `M ${first.vx},0 L ${first.vx},${first.vy}`
  for (let i = 0; i < shifted.length - 1; i++) {
    const from = shifted[i]
    const to   = shifted[i + 1]
    const midY = (from.vy + to.vy) / 2
    d += ` C ${from.vx},${midY} ${to.vx},${midY} ${to.vx},${to.vy}`
  }
  const last = shifted[shifted.length - 1]
  d += ` L ${last.vx},1000`
  return d
}

// ─── Utility: find path length closest to a viewBox point ─────────────────────
// Samples the path at N intervals and returns the length at which the path
// is closest to (tx, ty). Used to compute per-card progress thresholds.

function findLengthAtPoint(
  path: SVGPathElement,
  tx: number, ty: number,
  totalLength: number,
): number {
  const SAMPLES = 300
  let best = 0
  let bestDist = Infinity
  for (let j = 0; j <= SAMPLES; j++) {
    const len = (j / SAMPLES) * totalLength
    const p = path.getPointAtLength(len)
    const d = Math.hypot(p.x - tx, p.y - ty)
    if (d < bestDist) { bestDist = d; best = len }
  }
  return best
}

// ─── Component ────────────────────────────────────────────────────────────────

export function CableScrollStory() {
  const sectionRef  = useRef<HTMLElement>(null)
  const svgRef      = useRef<SVGSVGElement>(null)
  const stationRefs = useRef<(HTMLDivElement | null)[]>([])
  const illusRefs   = useRef<(HTMLDivElement | null)[]>([])

  // One ref per cable × 3 layers (rim, body, highlight)
  const rimRefs  = useRef<(SVGPathElement | null)[]>([])
  const bodyRefs = useRef<(SVGPathElement | null)[]>([])
  const hiRefs   = useRef<(SVGPathElement | null)[]>([])

  // Tip circle — rides at the front of the drawn cable
  const tipRef = useRef<SVGCircleElement>(null)

  // Per-card: what scroll progress (0-1) does the tip reach that card?
  const thresholdsRef = useRef<number[]>([])
  // Which cards have already been hit (to avoid re-firing on same scroll dir)
  const hitRef = useRef<boolean[]>(SERVICES.map(() => false))

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const mm = gsap.matchMedia()

    const buildAndAnimate = () => {
      const sH = section.offsetHeight
      const sW = section.offsetWidth
      const sectionTop = section.getBoundingClientRect().top + window.scrollY

      const pts = illusRefs.current.map(el => {
        if (!el) return null
        const r = el.getBoundingClientRect()
        const yRel = (r.top + window.scrollY - sectionTop) + r.height / 2
        const xRel = (r.left - section.getBoundingClientRect().left) + r.width / 2
        return {
          vx: (xRel / sW) * 1000,
          vy: (yRel / sH) * 1000,
        }
      }).filter(Boolean) as Array<{ vx: number; vy: number }>

      if (pts.length === 0) return false

      // Build and assign path data for each cable
      const totals: number[] = []
      CABLE_DEFS.forEach((def, ci) => {
        const d = buildCablePath(pts, def.dx, def.dy)
        const rim  = rimRefs.current[ci]
        const body = bodyRefs.current[ci]
        const hi   = hiRefs.current[ci]
        if (rim)  rim.setAttribute('d', d)
        if (body) body.setAttribute('d', d)
        if (hi)   hi.setAttribute('d', d)
        totals[ci] = body ? body.getTotalLength() : 0
      })

      // Compute per-card progress thresholds using the center cable (index 2, no offset)
      const centerBody = bodyRefs.current[2]
      if (centerBody && totals[2]) {
        thresholdsRef.current = pts.map(pt =>
          findLengthAtPoint(centerBody, pt.vx, pt.vy, totals[2]) / totals[2]
        )
      }
      // Reset hit state whenever paths are rebuilt
      hitRef.current = SERVICES.map(() => false)

      return totals
    }

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const totals = buildAndAnimate()
      if (!totals) return

      // Hide all cables initially
      ;[rimRefs, bodyRefs, hiRefs].forEach(group => {
        group.current.forEach((el, i) => {
          if (!el || !totals[i]) return
          gsap.set(el, { strokeDasharray: totals[i], strokeDashoffset: totals[i] })
        })
      })

      // Scrub draw on scroll
      ScrollTrigger.create({
        trigger: section,
        start:   'top 70%',
        end:     'bottom 30%',
        scrub:   1.4,
        onUpdate(self) {
          const progress = self.progress

          // ── Draw all cable layers ──────────────────────────────────────
          ;[rimRefs, bodyRefs, hiRefs].forEach(group => {
            group.current.forEach((el, i) => {
              if (!el || !totals[i]) return
              el.style.strokeDashoffset = String(totals[i] * (1 - progress))
            })
          })

          // ── Move glowing tip along center cable ────────────────────────
          const centerBody = bodyRefs.current[2]
          const tip = tipRef.current
          if (centerBody && tip && totals[2]) {
            const drawnLength = totals[2] * progress
            if (progress > 0.01 && progress < 0.99) {
              const p = centerBody.getPointAtLength(drawnLength)
              tip.setAttribute('cx', String(p.x))
              tip.setAttribute('cy', String(p.y))
              tip.setAttribute('opacity', '1')
            } else {
              tip.setAttribute('opacity', '0')
            }
          }

          // ── Card hit: fire glow when tip reaches each card ─────────────
          thresholdsRef.current.forEach((threshold, i) => {
            const card = illusRefs.current[i]
            if (!card) return
            if (progress >= threshold && !hitRef.current[i]) {
              // Tip just reached this card — pulse the border
              hitRef.current[i] = true
              gsap.timeline()
                .to(card, {
                  boxShadow: '0 0 36px rgba(0,200,255,0.45), 0 0 0 1px rgba(0,200,255,0.6)',
                  borderColor: 'rgba(0,200,255,0.6)',
                  duration: 0.3,
                  ease: 'power2.out',
                })
                .to(card, {
                  boxShadow: '0 0 8px rgba(0,200,255,0.08)',
                  borderColor: 'rgba(255,255,255,0.07)',
                  duration: 1.8,
                  ease: 'power2.inOut',
                })
            } else if (progress < threshold && hitRef.current[i]) {
              // Scrolled back above this card — reset so it can re-fire
              hitRef.current[i] = false
              gsap.set(card, {
                boxShadow: '',
                borderColor: '',
              })
            }
          })
        },
      })

      // Stagger stations in
      stationRefs.current.forEach(el => {
        if (!el) return
        gsap.from(el, {
          y: 36, opacity: 0, duration: 0.72, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 84%' },
        })
      })

      // Rebuild on resize
      let resizeTimer: ReturnType<typeof setTimeout>
      const onResize = () => {
        clearTimeout(resizeTimer)
        resizeTimer = setTimeout(() => {
          ScrollTrigger.getAll().forEach(st => st.kill())
          buildAndAnimate()
        }, 200)
      }
      window.addEventListener('resize', onResize)
      return () => {
        clearTimeout(resizeTimer)
        window.removeEventListener('resize', onResize)
      }
    })

    mm.add('(prefers-reduced-motion: reduce)', () => {
      const totals = buildAndAnimate()
      if (!totals) return
      ;[rimRefs, bodyRefs, hiRefs].forEach(group => {
        group.current.forEach((el, i) => {
          if (!el || !totals[i]) return
          gsap.set(el, { strokeDasharray: totals[i], strokeDashoffset: 0 })
        })
      })
    })

    return () => mm.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="services"
      style={{ position: 'relative', background: 'var(--tn-bg-2)', padding: '120px 0', overflow: 'hidden' }}
    >
      {/* ── Section header ── */}
      <div className="section-container" style={{ textAlign: 'center', marginBottom: '80px' }}>
        <p className="eyebrow" style={{ justifyContent: 'center', marginBottom: '20px' }}>
          What We Do
        </p>
        <h2 style={{ marginBottom: '16px' }}>Every Technology Problem. One Partner.</h2>
        <p style={{ color: 'var(--tn-text-2)', maxWidth: '520px', margin: '0 auto', fontSize: '18px', lineHeight: 1.7 }}>
          Six capability areas. One contract. One team. One number to call.
        </p>
      </div>

      {/* ── Cable bundle SVG ── */}
      <div
        aria-hidden="true"
        className="cable-overlay"
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}
      >
        <svg
          ref={svgRef}
          viewBox="0 0 1000 1000"
          preserveAspectRatio="none"
          style={{ width: '100%', height: '100%', overflow: 'visible' }}
        >
          <defs>
            {CABLE_DEFS.map((def, ci) => (
              <React.Fragment key={ci}>
                {/* Outer ambient glow per cable */}
                <filter id={`glow-${ci}`} x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </React.Fragment>
            ))}
            {/* Tip glow — bright halo for the traveling signal dot */}
            <filter id="tip-glow" x="-400%" y="-400%" width="900%" height="900%">
              <feGaussianBlur stdDeviation="10" result="blur1" />
              <feGaussianBlur stdDeviation="4"  result="blur2" in="SourceGraphic" />
              <feMerge>
                <feMergeNode in="blur1" />
                <feMergeNode in="blur2" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Render cables back-to-front so blues appear under reds */}
          {CABLE_DEFS.map((def, ci) => (
            <g key={ci}>
              {/* 1. Dark rim — gives depth, slightly thicker */}
              <path
                ref={el => { rimRefs.current[ci] = el }}
                d=""
                stroke={def.rim}
                strokeWidth="9"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                opacity="0.9"
              />
              {/* 2. Main jacket color */}
              <path
                ref={el => { bodyRefs.current[ci] = el }}
                d=""
                stroke={def.color}
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                filter={`url(#glow-${ci})`}
              />
              {/* 3. Highlight — thin bright stroke simulating cylindrical gloss */}
              <path
                ref={el => { hiRefs.current[ci] = el }}
                d=""
                stroke={def.hi}
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                opacity="0.45"
                transform="translate(0,-2)"
              />
            </g>
          ))}

          {/* ── Traveling signal tip — glowing dot at the cable front ── */}
          <circle
            ref={tipRef}
            cx="0" cy="0" r="6"
            fill="var(--tn-accent)"
            filter="url(#tip-glow)"
            opacity="0"
            style={{ pointerEvents: 'none' }}
          />
        </svg>
      </div>

      {/* ── Service stations ── */}
      <div className="section-container" style={{ position: 'relative', zIndex: 2 }}>
        {SERVICES.map((svc, i) => {
          const isRight = svc.side === 'right'
          const { Illus } = svc
          return (
            <div
              key={svc.id}
              ref={el => { stationRefs.current[i] = el }}
              className={`service-station ${isRight ? 'illus-right' : 'illus-left'}`}
              style={{ marginBottom: i < SERVICES.length - 1 ? '80px' : 0 }}
            >
              <div className="station-content">
                <p className="eyebrow" style={{ marginBottom: '18px' }}>{svc.eyebrow}</p>
                <h3 style={{ marginBottom: '14px', fontSize: 'clamp(20px, 2vw, 26px)', lineHeight: 1.2 }}>
                  {svc.heading}
                </h3>
                <p style={{ color: 'var(--tn-text-2)', fontSize: '16px', lineHeight: 1.75, marginBottom: '14px', maxWidth: '400px' }}>
                  {svc.description}
                </p>
                <p style={{ fontFamily: 'var(--tn-font-mono)', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--tn-accent)', marginBottom: '28px' }}>
                  {svc.benefit}
                </p>
                <Link
                  href={svc.href}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--tn-font-display)', fontSize: '13px', fontWeight: 500, color: 'var(--tn-accent)', textDecoration: 'none', borderBottom: '1px solid rgba(0,200,255,0.28)', paddingBottom: '2px' }}
                >
                  Learn more
                  <span aria-hidden="true" style={{ fontSize: '15px' }}>→</span>
                </Link>
              </div>

              <div
                ref={el => { illusRefs.current[i] = el }}
                className="glow-card station-illus-card"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 32px', minHeight: '220px', position: 'relative', overflow: 'hidden' }}
              >
                <div style={{ position: 'absolute', inset: 0, background: 'var(--tn-gradient-card)', borderRadius: 'inherit', pointerEvents: 'none' }} />
                <div style={{ position: 'relative', width: '100%', maxWidth: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Illus />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <style>{`
        .service-station {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }
        .service-station.illus-right { grid-template-areas: "content illus"; }
        .service-station.illus-left  { grid-template-areas: "illus content"; }
        .station-illus-card { grid-area: illus; }
        .station-content    { grid-area: content; }
        @media (max-width: 767px) {
          .service-station {
            grid-template-columns: 1fr !important;
            grid-template-areas: "illus" "content" !important;
            gap: 28px !important;
          }
          .cable-overlay { display: none !important; }
        }
      `}</style>
    </section>
  )
}
