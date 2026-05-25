'use client'
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'

const STATS = [
  { value: 10,   suffix: '+',  label: 'Years in Lebanon',     prefix: '' },
  { value: 500,  suffix: '+',  label: 'Projects Delivered',   prefix: '' },
  { value: 99.9, suffix: '%',  label: 'Network Uptime',       prefix: '', decimals: 1 },
  { value: 24,   suffix: '/7', label: 'Support Coverage',     prefix: '' },
]

export function StatCounter() {
  const containerRef = useRef<HTMLDivElement>(null)
  const numRefs      = useRef<(HTMLSpanElement | null)[]>([])
  const triggered    = useRef(false)

  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (!entries[0].isIntersecting || triggered.current) return
          triggered.current = true
          observer.disconnect()

          STATS.forEach((stat, i) => {
            const el = numRefs.current[i]
            if (!el) return
            const obj = { val: 0 }
            gsap.to(obj, {
              val: stat.value,
              duration: 2.2,
              ease: 'power2.out',
              delay: i * 0.12,
              onUpdate() {
                const decimals = stat.decimals ?? 0
                el.textContent = obj.val.toFixed(decimals)
              },
              onComplete() {
                el.textContent = stat.value.toFixed(stat.decimals ?? 0)
              },
            })
          })
        },
        { threshold: 0.4 },
      )
      if (containerRef.current) observer.observe(containerRef.current)
      return () => observer.disconnect()
    })

    // Reduced-motion fallback: show final values immediately
    mm.add('(prefers-reduced-motion: reduce)', () => {
      STATS.forEach((stat, i) => {
        const el = numRefs.current[i]
        if (el) el.textContent = stat.value.toFixed(stat.decimals ?? 0)
      })
    })

    return () => mm.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      style={{ background: 'var(--tn-bg-2)', padding: '80px 0', borderTop: '1px solid var(--tn-border)' }}
    >
      <style>{`
        .sc-grid {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 48px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 40px;
        }
        .sc-item {
          text-align: center;
          padding: 48px 24px;
          border-right: 1px solid var(--tn-border);
        }
        .sc-item:last-child { border-right: none; }
        .sc-number-row {
          display: flex;
          align-items: baseline;
          justify-content: center;
          gap: 2px;
          line-height: 1;
          margin-bottom: 16px;
        }
        .sc-num {
          font-family: var(--tn-font-display);
          font-size: clamp(40px, 5vw, 64px);
          font-weight: 700;
          color: var(--tn-text);
          letter-spacing: -0.03em;
          line-height: 1;
        }
        .sc-suffix {
          font-family: var(--tn-font-display);
          font-size: clamp(24px, 3vw, 36px);
          font-weight: 700;
          color: var(--tn-accent);
          line-height: 1;
          letter-spacing: -0.02em;
        }
        .sc-label {
          font-family: var(--tn-font-body);
          font-size: 14px;
          color: var(--tn-text-3);
          letter-spacing: 0.02em;
        }
        @media (max-width: 767px) {
          .sc-grid {
            grid-template-columns: repeat(2, 1fr);
            padding: 0 24px;
            gap: 0;
          }
          .sc-item {
            border-right: 1px solid var(--tn-border);
            border-bottom: 1px solid var(--tn-border);
            padding: 36px 16px;
          }
          .sc-item:nth-child(2n) { border-right: none; }
          .sc-item:nth-child(3),
          .sc-item:nth-child(4) { border-bottom: none; }
        }
      `}</style>

      <div className="sc-grid">
        {STATS.map((stat, i) => (
          <div className="sc-item" key={i}>
            <div className="sc-number-row">
              {stat.prefix && (
                <span className="sc-suffix" style={{ color: 'var(--tn-text-3)' }}>{stat.prefix}</span>
              )}
              <span className="sc-num" ref={el => { numRefs.current[i] = el }}>
                {stat.value.toFixed(stat.decimals ?? 0)}
              </span>
              <span className="sc-suffix">{stat.suffix}</span>
            </div>
            <p className="sc-label">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
