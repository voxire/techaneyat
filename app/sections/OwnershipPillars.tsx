'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PILLARS = [
  {
    label: 'We Build It',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect x="4" y="18" width="24" height="10" rx="2" stroke="var(--tn-accent)" strokeWidth="1.5" fill="none" />
        <rect x="4" y="10" width="24" height="6" rx="1.5" stroke="var(--tn-accent)" strokeWidth="1.2" fill="none" opacity="0.6" />
        <rect x="4" y="4" width="24" height="4" rx="1.5" stroke="var(--tn-accent)" strokeWidth="1" fill="none" opacity="0.35" />
        <circle cx="24" cy="23" r="2" fill="var(--tn-accent)" />
        <circle cx="19" cy="23" r="2" fill="var(--tn-accent)" opacity="0.5" />
        <line x1="8" y1="23" x2="13" y2="23" stroke="var(--tn-accent)" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      </svg>
    ),
    heading: 'We Build It',
    body: 'From structured cabling and WiFi to servers, cloud, and power systems. We design and install your entire technology backbone properly from day one. Not patched together over time.',
    items: ['Network & cabling', 'Cloud infrastructure', 'Power continuity', 'Computing & hardware'],
  },
  {
    label: 'We Secure It',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M16 3 L27 7.5 L27 16 C27 22.5 22 27.5 16 29.5 C10 27.5 5 22.5 5 16 L5 7.5 Z"
          stroke="var(--tn-accent)" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
        <path d="M11 16 L14.5 19.5 L21 13" stroke="var(--tn-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    heading: 'We Secure It',
    body: 'Cybersecurity, CCTV, access control, firewalls, and endpoint protection. Every solution we build has security at its core. Not added as an afterthought when something goes wrong.',
    items: ['Firewalls & EDR', 'CCTV & access control', 'Threat monitoring 24/7', 'Incident response'],
  },
  {
    label: 'We Own It',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <circle cx="16" cy="16" r="12" stroke="var(--tn-accent)" strokeWidth="1.5" fill="none" />
        <circle cx="16" cy="16" r="4" fill="var(--tn-accent)" opacity="0.9" />
        <line x1="16" y1="4" x2="16" y2="9" stroke="var(--tn-accent)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="16" y1="23" x2="16" y2="28" stroke="var(--tn-accent)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="4" y1="16" x2="9" y2="16" stroke="var(--tn-accent)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="23" y1="16" x2="28" y2="16" stroke="var(--tn-accent)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    heading: 'We Own It',
    body: 'Proactive monitoring, SLA-driven support, and a team that picks up the phone. We do not disappear after the project. We stay accountable for everything we build.',
    items: ['Proactive monitoring', 'SLA-backed support', 'Engineer on the line', 'Full documentation'],
  },
]

export function OwnershipPillars() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef   = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      if (headingRef.current) {
        gsap.from(headingRef.current.children, {
          y: 28, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.1,
          scrollTrigger: { trigger: headingRef.current, start: 'top 86%' },
        })
      }
      if (cardsRef.current) {
        gsap.from(cardsRef.current.children, {
          y: 36, opacity: 0, duration: 0.65, ease: 'power2.out', stagger: 0.12,
          scrollTrigger: { trigger: cardsRef.current, start: 'top 85%' },
        })
      }
    })
    return () => mm.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'var(--tn-bg-2)',
        padding: 'clamp(56px, 8vw, 100px) 0',
        borderTop: '1px solid var(--tn-border)',
        borderBottom: '1px solid var(--tn-border)',
      }}
    >
      <div className="section-container">
        <div ref={headingRef} style={{ textAlign: 'center', marginBottom: '64px' }}>
          <p className="eyebrow" style={{ justifyContent: 'center', marginBottom: '20px' }}>
            How We Work
          </p>
          <h2 style={{ marginBottom: '16px' }}>
            We Take Ownership of Your Technology
          </h2>
          <p style={{ color: 'var(--tn-text-2)', fontSize: '18px', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
            Design, build, secure, and manage. One contract. One call resolves anything.
          </p>
        </div>

        <div
          ref={cardsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}
        >
          {PILLARS.map((pillar) => (
            <div
              key={pillar.label}
              className="glow-card"
              style={{ padding: '40px 36px' }}
            >
              {/* Icon */}
              <div style={{ marginBottom: '24px' }}>
                {pillar.icon}
              </div>

              {/* Heading */}
              <h3 style={{ marginBottom: '16px', fontSize: '22px', fontWeight: 700, letterSpacing: '-0.01em' }}>
                {pillar.heading}
              </h3>

              {/* Body */}
              <p style={{ color: 'var(--tn-text-2)', fontSize: '15px', lineHeight: 1.8, marginBottom: '28px' }}>
                {pillar.body}
              </p>

              {/* Item list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {pillar.items.map((item) => (
                  <div
                    key={item}
                    style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                  >
                    <div style={{
                      width: '4px', height: '4px', borderRadius: '50%',
                      background: 'var(--tn-accent)', flexShrink: 0,
                    }} />
                    <span style={{
                      fontFamily: 'var(--tn-font-mono)',
                      fontSize: '11px',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--tn-text-3)',
                    }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
