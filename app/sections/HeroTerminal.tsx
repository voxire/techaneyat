'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import Link from 'next/link'
import { NetworkCanvas } from './NetworkCanvas'

const TERMINAL_LINES = [
  '> Establishing secure connection...',
  '> Scanning infrastructure endpoints...',
  '> Running diagnostics...',
  '> All systems operational. ✓',
]

const CHAR_MS    = 30   // ms per character; setInterval fires independently of React
const LINE_MS    = 260  // ms pause between lines
const START_MS   = 180  // ms before typing begins
const DONE_MS    = 480  // ms after last line before exit

// ─── Typewriter ──────────────────────────────────────────────────────────────
// setInterval drives per-character pacing; completely detached from React renders.
// DOM writes go directly through activeLineRef.current.textContent.
// React state only updates once per completed line (4 renders total for 4 lines).
// ─────────────────────────────────────────────────────────────────────────────
function useTypewriter(
  lines: string[],
  activeLineRef: React.RefObject<HTMLSpanElement | null>,
  onComplete: () => void,
) {
  const [completedLines, setCompletedLines] = useState<string[]>([])
  const [isDone, setIsDone] = useState(false)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    let cancelled = false
    let intervalId: ReturnType<typeof setInterval> | null = null

    const startTimer = setTimeout(() => {
      if (cancelled) return

      let lineIdx = 0
      let charIdx = 0
      let transitioning = false // pausing between lines; skip interval ticks

      intervalId = setInterval(() => {
        if (cancelled || transitioning) return
        if (lineIdx >= lines.length) return

        const line = lines[lineIdx]

        // Direct DOM write: zero React overhead
        if (activeLineRef.current) {
          activeLineRef.current.textContent = line.slice(0, charIdx)
        }

        charIdx++

        if (charIdx > line.length) {
          transitioning = true
          const completedLine = line
          const isLast = lineIdx + 1 >= lines.length

          setTimeout(() => {
            if (cancelled) return
            // One React render per completed line
            setCompletedLines(prev => [...prev, completedLine])
            if (activeLineRef.current) activeLineRef.current.textContent = ''
            lineIdx++
            charIdx = 0

            if (isLast) {
              if (intervalId) clearInterval(intervalId)
              setTimeout(() => {
                if (!cancelled) {
                  setIsDone(true)
                  onCompleteRef.current()
                }
              }, DONE_MS)
            } else {
              transitioning = false
            }
          }, LINE_MS)
        }
      }, CHAR_MS)
    }, START_MS)

    return () => {
      cancelled = true
      clearTimeout(startTimer)
      if (intervalId) clearInterval(intervalId)
    }
  }, [lines, activeLineRef]) // stable refs; runs once on mount

  return { completedLines, isDone }
}

// ─── Component ───────────────────────────────────────────────────────────────
export function HeroTerminal() {
  const [canvasActive, setCanvasActive] = useState(false)
  const [heroVisible, setHeroVisible]   = useState(false)

  const terminalRef    = useRef<HTMLDivElement>(null)
  const heroContentRef = useRef<HTMLDivElement>(null)
  const activeLineRef  = useRef<HTMLSpanElement>(null)
  const cursorRef      = useRef<HTMLSpanElement>(null)
  const cursorTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const stopCursor = useCallback(() => {
    if (cursorTimerRef.current) { clearInterval(cursorTimerRef.current); cursorTimerRef.current = null }
    if (cursorRef.current) cursorRef.current.style.opacity = '0'
  }, [])

  const handleComplete = useCallback(() => {
    stopCursor()
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      if (terminalRef.current) terminalRef.current.style.display = 'none'
      setCanvasActive(true); setHeroVisible(true)
      return
    }
    gsap.to(terminalRef.current, {
      opacity: 0, scale: 0.96, duration: 0.38, ease: 'power2.in',
      onComplete: () => {
        if (terminalRef.current) terminalRef.current.style.display = 'none'
        setCanvasActive(true); setHeroVisible(true)
      },
    })
  }, [stopCursor])

  // Stagger hero children in once visible
  useEffect(() => {
    if (!heroVisible || !heroContentRef.current) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const kids = Array.from(heroContentRef.current.children) as HTMLElement[]
    if (reduced) { kids.forEach(el => { el.style.opacity = '1' }); return }
    gsap.fromTo(kids,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.75, stagger: 0.11, ease: 'power3.out' }
    )
  }, [heroVisible])

  // Cursor blink
  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return
    let v = true
    cursorTimerRef.current = setInterval(() => {
      v = !v
      cursor.style.opacity = v ? '1' : '0'
    }, 500)
    return () => stopCursor()
  }, [stopCursor])

  const { completedLines, isDone } = useTypewriter(TERMINAL_LINES, activeLineRef, handleComplete)

  // Fallback: show hero if tab was in background during animation (Chrome
  // throttles all timers in inactive tabs). Two triggers:
  // 1. visibilitychange: fires the instant user switches back to this tab
  // 2. setTimeout at 8s for when tab stays active but animation stalls
  useEffect(() => {
    if (heroVisible) return // already shown — nothing to do

    const showHero = () => {
      if (heroVisible) return
      if (terminalRef.current) terminalRef.current.style.display = 'none'
      setCanvasActive(true)
      setHeroVisible(true)
    }

    const onVisibility = () => {
      if (document.visibilityState === 'visible') showHero()
    }

    const fallback = setTimeout(showHero, 8000)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      clearTimeout(fallback)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [heroVisible])

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        background: 'var(--tn-bg)',
        backgroundImage: 'var(--tn-gradient-hero)',
        overflow: 'hidden',
        paddingTop: 'calc(64px + clamp(32px, 5vh, 64px))',
        paddingBottom: 'clamp(48px, 8vh, 80px)',
      }}
    >
      <NetworkCanvas active={canvasActive} />

      {/* ── Terminal ── */}
      <div
        ref={terminalRef}
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
        }}
      >
        <div
          style={{
            width: 'min(480px, 90vw)',
            background: 'rgba(7, 11, 20, 0.85)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid var(--tn-border-accent)',
            borderRadius: '10px',
            overflow: 'hidden',
            boxShadow: '0 24px 64px rgba(0,0,0,0.6), 0 0 40px rgba(0,200,255,0.06)',
          }}
        >
          {/* Title bar */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '10px 16px',
            borderBottom: '1px solid var(--tn-border)',
            background: 'rgba(255,255,255,0.03)',
          }}>
            <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
              {(['#FF5F57', '#FFBD2E', '#28CA41'] as const).map(c => (
                <div key={c} style={{ width: 12, height: 12, borderRadius: '50%', background: c, opacity: 0.9 }} />
              ))}
            </div>
            <div style={{
              flex: 1, textAlign: 'center',
              fontFamily: 'var(--tn-font-mono)', fontSize: '11px',
              color: 'var(--tn-text-3)', letterSpacing: '0.04em',
            }}>
              techaneyat.com
            </div>
          </div>

          {/* Body */}
          <div style={{ padding: '24px 28px 28px', minHeight: '148px' }}>
            {completedLines.map((line, i) => (
              <div key={i} style={{
                fontFamily: 'var(--tn-font-mono)',
                fontSize: 'clamp(11px, 1.8vw, 13px)',
                lineHeight: 1.7,
              }}>
                <span style={{ color: line.includes('✓') ? '#28CA41' : 'var(--tn-accent)' }}>
                  {line}
                </span>
              </div>
            ))}

            {!isDone && (
              <div style={{
                fontFamily: 'var(--tn-font-mono)',
                fontSize: 'clamp(11px, 1.8vw, 13px)',
                lineHeight: 1.7,
                display: 'flex',
                alignItems: 'center',
              }}>
                <span ref={activeLineRef} style={{ color: 'var(--tn-accent)' }} />
                <span
                  ref={cursorRef}
                  aria-hidden="true"
                  style={{
                    display: 'inline-block',
                    width: '2px', height: '13px',
                    background: 'var(--tn-accent)',
                    marginLeft: '2px',
                    verticalAlign: 'middle',
                    borderRadius: '1px',
                    flexShrink: 0,
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Hero content ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 5,
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 clamp(24px, 5vw, 80px)',
          display: heroVisible ? 'block' : 'none',
        }}
      >
        <div ref={heroContentRef}>
          <p className="eyebrow" style={{ marginBottom: '36px', fontSize: '11px', letterSpacing: '0.22em' }}>
            Smart Infrastructure Partner · Lebanon
          </p>

          <h1 style={{
            marginBottom: '8px',
            maxWidth: '820px',
            letterSpacing: '-0.04em',
            lineHeight: 1.0,
            color: 'var(--tn-text)',
          }}>
            Your infrastructure.
          </h1>
          <h1 style={{
            marginBottom: '8px',
            maxWidth: '820px',
            letterSpacing: '-0.04em',
            lineHeight: 1.0,
            background: 'linear-gradient(90deg, var(--tn-accent) 0%, rgba(0,200,255,0.75) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Always online.
          </h1>
          <h1 style={{
            marginBottom: '48px',
            maxWidth: '820px',
            letterSpacing: '-0.04em',
            lineHeight: 1.0,
            background: 'linear-gradient(90deg, rgba(0,200,255,0.75) 0%, rgba(0,150,220,0.6) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Always secure.
          </h1>

          <p style={{
            color: 'var(--tn-text-2)',
            fontSize: 'clamp(16px, 1.6vw, 19px)',
            lineHeight: 1.75,
            maxWidth: '500px',
            marginBottom: '52px',
            fontWeight: 400,
          }}>
            One partner. One SLA. Network, cybersecurity, cloud, power,
            and hardware: managed end-to-end so your team never has to.
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '64px' }}>
            <Link href="/contact" className="btn-primary">Talk to an Engineer</Link>
            <Link href="/case-studies" className="btn-ghost">See Our Work</Link>
          </div>

          {/* Trust micro-stats */}
          <div className="hero-stat-bar" style={{
            display: 'flex',
            gap: 'clamp(24px, 4vw, 48px)',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
          }}>
            {[
              { value: '10+', label: 'Years in Lebanon' },
              { value: '500+', label: 'Projects delivered' },
              { value: '99.9%', label: 'Network uptime SLA' },
              { value: '24/7', label: 'Support coverage' },
            ].map(({ value, label }) => (
              <div key={label}>
                <div style={{
                  fontFamily: 'var(--tn-font-display)',
                  fontSize: 'clamp(20px, 2vw, 28px)',
                  fontWeight: 700,
                  color: 'var(--tn-text)',
                  letterSpacing: '-0.02em',
                }}>
                  {value}
                </div>
                <div style={{
                  fontFamily: 'var(--tn-font-mono)',
                  fontSize: '10px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--tn-text-3)',
                  marginTop: '2px',
                }}>
                  {label}
                </div>
              </div>
            ))}

            {/* Google rating */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '2px' }}>
                {[1,2,3,4,5].map(i => (
                  <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M7 1L8.545 5.09H13L9.545 7.41L10.91 11.5L7 9.18L3.09 11.5L4.455 7.41L1 5.09H5.455Z"
                      fill={i <= 4 ? 'var(--tn-accent)' : 'none'}
                      stroke="var(--tn-accent)"
                      strokeWidth="0.8"
                    />
                  </svg>
                ))}
                <span style={{
                  fontFamily: 'var(--tn-font-display)',
                  fontSize: '14px',
                  fontWeight: 700,
                  color: 'var(--tn-text)',
                  marginLeft: '2px',
                }}>4.9</span>
              </div>
              <div style={{
                fontFamily: 'var(--tn-font-mono)',
                fontSize: '10px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--tn-text-3)',
              }}>
                Google · 15 reviews
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      {heroVisible && (
        <div aria-hidden="true" style={{
          position: 'absolute',
          bottom: '28px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          zIndex: 5,
        }}>
          <span style={{
            fontFamily: 'var(--tn-font-mono)',
            fontSize: '9px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--tn-text-3)',
          }}>
            Scroll
          </span>
          <div style={{
            width: '1px', height: '40px',
            background: 'linear-gradient(to bottom, var(--tn-accent), transparent)',
            opacity: 0.45,
          }} />
        </div>
      )}
    </section>
  )
}
