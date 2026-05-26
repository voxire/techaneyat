'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { ServiceIllustration, type ServiceIllustrationKey } from './ServiceIllustrations'

gsap.registerPlugin(ScrollTrigger)

// ─── Cable definitions: realistic cable colors ────────────────────────────────
// Each cable has a main jacket color, a darker rim, a bright highlight, and
// a small x-offset so they run as a bundle side-by-side.

const CABLE_DEFS = [
  { color: '#1A7FCC', rim: '#0A3A6A', hi: '#90D0FF', dx: -14, dy: -4 }, // blue
  { color: '#DD7700', rim: '#7A3500', hi: '#FFB870', dx: -7,  dy: -1 }, // orange
  { color: '#CCBB00', rim: '#665D00', hi: '#FFEC55', dx:  0,  dy:  0 }, // yellow
  { color: '#22AA50', rim: '#0A5022', hi: '#70EE98', dx:  7,  dy:  1 }, // green
  { color: '#BB2828', rim: '#5E1010', hi: '#FF7878', dx:  14, dy:  4 }, // red
]

// ─── Service Data ─────────────────────────────────────────────────────────────

interface Service {
  id: string
  eyebrow: string
  heading: string
  description: string
  benefit: string
  href: string
  side: 'left' | 'right'
  icon: ServiceIllustrationKey
}

const SERVICES: Service[] = [
  {
    id: 'network',
    eyebrow: 'Network & Infrastructure',
    heading: 'The backbone everything runs on.',
    description:
      'Structured cabling, switches, routers, WiFi, and fiber. We build networks that do not slow you down or let you down. Designed from the start for zero single points of failure.',
    benefit: 'Redundant topology. Every link.',
    href: '/services/network',
    side: 'right',
    icon: 'network',
  },
  {
    id: 'cybersecurity',
    eyebrow: 'Cybersecurity',
    heading: 'Defense built into your infrastructure.',
    description:
      'Firewalls, endpoint protection, EDR, and threat monitoring. We protect your data before the problem happens. Security is the foundation, not a bolt-on.',
    benefit: '24/7 threat monitoring. Zero exceptions.',
    href: '/services/cybersecurity',
    side: 'left',
    icon: 'cybersecurity',
  },
  {
    id: 'smart-security',
    eyebrow: 'Smart Security',
    heading: 'Know exactly who enters your premises.',
    description:
      'CCTV, access control, alarms, and facial recognition integrated into a single management layer. Know who enters and respond before it becomes an incident.',
    benefit: 'Every entry point. Fully logged.',
    href: '/services/smart-security',
    side: 'right',
    icon: 'smart-security',
  },
  {
    id: 'cloud',
    eyebrow: 'Cloud & Managed Services',
    heading: 'Your workloads. Our responsibility.',
    description:
      'Microsoft 365, Google Workspace, cloud backup, and remote monitoring under SLA. Your systems managed proactively, not reactively.',
    benefit: '99.9% uptime. No asterisks.',
    href: '/services/cloud',
    side: 'left',
    icon: 'cloud',
  },
  {
    id: 'power',
    eyebrow: 'Energy & Power Continuity',
    heading: 'No downtime. Not for any reason.',
    description:
      'UPS systems, battery backup, and solar. In Lebanon, power is not guaranteed. Your business continuity should be. We design for the grid as it actually is.',
    benefit: 'Continuous power. Full documentation.',
    href: '/services/power',
    side: 'right',
    icon: 'power',
  },
  {
    id: 'hardware',
    eyebrow: 'Computing & Hardware',
    heading: 'Procurement, deployment, lifecycle.',
    description:
      'Laptops, servers, NAS, and workstations: sourced, configured, and deployed by us. One vendor. Full accountability from purchase order to end of life.',
    benefit: 'Configured. Delivered. Supported.',
    href: '/services/hardware',
    side: 'left',
    icon: 'hardware',
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

  // Tip circle: rides at the front of the drawn cable
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
              // Tip just reached this card: pulse the border
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
                  borderColor: 'var(--tn-border)',
                  duration: 1.8,
                  ease: 'power2.inOut',
                })
            } else if (progress < threshold && hitRef.current[i]) {
              // Scrolled back above this card: reset so it can re-fire
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
            {/* Tip glow: bright halo for the traveling signal dot */}
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
              {/* 1. Dark rim: gives depth, slightly thicker */}
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
              {/* 3. Highlight: thin bright stroke simulating cylindrical gloss */}
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

          {/* ── Traveling signal tip: glowing dot at the cable front ── */}
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
                style={{ position: 'relative', overflow: 'hidden', minHeight: '280px' }}
              >
                <div style={{ position: 'absolute', inset: 0, background: 'var(--tn-gradient-card)', borderRadius: 'inherit', pointerEvents: 'none', zIndex: 1 }} />
                <div style={{ position: 'absolute', inset: 0, zIndex: 2 }}>
                  <ServiceIllustration type={svc.icon} />
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
