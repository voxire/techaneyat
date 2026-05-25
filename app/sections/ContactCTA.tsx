'use client'
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function ContactCTA() {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subRef     = useRef<HTMLParagraphElement>(null)
  const btnsRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: headingRef.current, start: 'top 85%' },
      })
      tl.from(headingRef.current, { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out' })
        .from(subRef.current,     { y: 24, opacity: 0, duration: 0.6, ease: 'power2.out' }, '-=0.5')
        .from(btnsRef.current,    { y: 20, opacity: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4')
    })
    return () => mm.revert()
  }, [])

  return (
    <section
      style={{
        background: 'var(--tn-bg-2)',
        padding: '140px 0',
        textAlign: 'center',
        borderTop: '1px solid var(--tn-border)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Radial glow behind content */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '300px',
          background: 'radial-gradient(ellipse at center, rgba(0,200,255,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="section-container" style={{ position: 'relative' }}>
        <p className="eyebrow" style={{ justifyContent: 'center', marginBottom: '24px' }}>
          Get Started
        </p>

        <h2
          ref={headingRef}
          style={{ marginBottom: '20px', maxWidth: '600px', margin: '0 auto 20px' }}
        >
          Ready to secure your infrastructure?
        </h2>

        <p
          ref={subRef}
          style={{
            color: 'var(--tn-text-2)',
            fontSize: '18px',
            maxWidth: '460px',
            margin: '0 auto 48px',
            lineHeight: 1.7,
          }}
        >
          We respond within 4 hours. No sales pitch. A direct conversation about your infrastructure.
        </p>

        <div
          ref={btnsRef}
          style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <a href="/contact" className="btn-primary">
            Talk to an Engineer
          </a>
          <a href="tel:+96176100766" className="btn-ghost">
            Call +961 76 100 766
          </a>
        </div>

        {/* Response time note */}
        <p
          style={{
            fontFamily: 'var(--tn-font-mono)',
            fontSize: '10px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--tn-text-3)',
            marginTop: '40px',
          }}
        >
          Sales@techaneyat.com
        </p>
      </div>
    </section>
  )
}
