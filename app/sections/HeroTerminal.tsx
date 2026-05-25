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

const CHAR_MS    = 30   // ms per character — setInterval fires independently of React
const LINE_MS    = 260  // ms pause between lines
const START_MS   = 180  // ms before typing begins
const DONE_MS    = 480  // ms after last line before exit

// ─── Typewriter ──────────────────────────────────────────────────────────────
// setInterval drives per-character pacing — completely detached from React renders.
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
      let transitioning = false // pausing between lines — skip interval ticks

      intervalId = setInterval(() => {
        if (cancelled || transitioning) return
        if (lineIdx >= lines.length) return

        const line = lines[lineIdx]

        // Direct DOM write — zero React overhead
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
  }, [lines, activeLineRef]) // stable refs — runs once on mount

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
          padding: '0 clamp(20px, 5vw, 60px)',
          display: heroVisible ? 'block' : 'none',
        }}
      >
        <div ref={heroContentRef}>
          <p className="eyebrow" style={{ marginBottom: '28px' }}>
            Smart Infrastructure Partner
          </p>

          <h1 style={{ marginBottom: '24px', maxWidth: '760px' }}>
            Your infrastructure.
            <br />
            Always online.
            <br />
            Always secure.
          </h1>

          <p style={{
            color: 'var(--tn-text-2)',
            fontSize: 'clamp(16px, 1.8vw, 18px)',
            lineHeight: 1.7,
            maxWidth: '520px',
            marginBottom: '44px',
          }}>
            One SLA. One partner. Network, cybersecurity, cloud, power,
            and hardware: all managed so your team never has to.
          </p>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Link href="/contact" className="btn-primary">Talk to an Engineer</Link>
            <Link href="/case-studies" className="btn-ghost">See Our Work</Link>
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
