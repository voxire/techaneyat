'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const differentiators = [
  {
    number: '01',
    heading: 'One SLA. Not seven.',
    body: 'Most Lebanese businesses manage separate contracts for network, security, cloud, and hardware. When something breaks, vendors point at each other. We own the entire stack: network to cloud, under one contract. One call resolves anything.',
  },
  {
    number: '02',
    heading: 'Built for Lebanon\'s reality.',
    body: 'Power cuts, ISP instability, and limited local vendor support are facts here, not edge cases. We design for them from the start: dual-ISP failover, UPS architecture, and systems that stay up when the grid does not.',
  },
  {
    number: '03',
    heading: 'Engineers on the phone, not account managers.',
    body: 'When you call, you reach the engineer who built your system. Not a relay. Not a ticket queue that reaches someone else. Direct technical conversation from the first call to the last.',
  },
  {
    number: '04',
    heading: 'We design it before we sell it.',
    body: 'Every engagement starts with a site survey and a written design. You approve the design and the budget before we procure a single item. No surprises on installation day.',
  },
  {
    number: '05',
    heading: 'Documentation you actually own.',
    body: 'Cable schedules, rack diagrams, IP plans, VLAN maps, access control logs: all documented and handed to you at project close. If you ever move to another provider, you take your documentation with you.',
  },
  {
    number: '06',
    heading: 'Proactive monitoring, not reactive firefighting.',
    body: 'We know about most issues before your team does. Disk health, battery depletion, interface errors, failed backups: our monitoring catches them before they become incidents.',
  },
]

export function WhyTechaneyat() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      if (headingRef.current) {
        gsap.from(headingRef.current.children, {
          y: 32,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
          },
        })
      }
      if (cardsRef.current) {
        gsap.from(cardsRef.current.children, {
          y: 28,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 85%',
          },
        })
      }
    })
    return () => mm.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'var(--tn-bg)',
        padding: 'clamp(56px, 8vw, 100px) 0',
        borderTop: '1px solid var(--tn-border)',
      }}
    >
      <div className="section-container">
        {/* Heading */}
        <div ref={headingRef} style={{ marginBottom: '64px', maxWidth: '680px' }}>
          <p className="eyebrow" style={{ marginBottom: '20px' }}>Why Techaneyat</p>
          <h2 style={{ marginBottom: '20px' }}>
            There are other IT companies in Lebanon. Here is why clients choose us.
          </h2>
          <p style={{ color: 'var(--tn-text-2)', fontSize: '17px', lineHeight: 1.8 }}>
            Ten years. Over 500 projects. Enterprise, government, healthcare, education, and NGOs across Lebanon. The difference is not a product list. It is how we approach the work.
          </p>
        </div>

        {/* Differentiators grid */}
        <div
          ref={cardsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px',
            marginBottom: '56px',
          }}
        >
          {differentiators.map((d) => (
            <div
              key={d.number}
              className="glow-card"
              style={{ padding: '32px' }}
            >
              <p
                style={{
                  fontFamily: 'var(--tn-font-mono)',
                  fontSize: '11px',
                  fontWeight: 500,
                  letterSpacing: '0.18em',
                  color: 'var(--tn-accent)',
                  marginBottom: '16px',
                  opacity: 0.7,
                }}
              >
                {d.number}
              </p>
              <h3 style={{ marginBottom: '14px', fontSize: '18px' }}>{d.heading}</h3>
              <p style={{ color: 'var(--tn-text-2)', fontSize: '14px', lineHeight: 1.75 }}>{d.body}</p>
            </div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px',
            padding: '32px',
            background: 'var(--tn-bg-3)',
            border: '1px solid var(--tn-border-accent)',
            borderRadius: '12px',
          }}
        >
          <div>
            <p
              style={{
                fontFamily: 'var(--tn-font-display)',
                fontSize: '18px',
                fontWeight: 600,
                color: 'var(--tn-text)',
                marginBottom: '6px',
              }}
            >
              Ready to consolidate your infrastructure?
            </p>
            <p style={{ color: 'var(--tn-text-2)', fontSize: '14px' }}>
              We respond within 4 hours. No sales script. Just a direct technical conversation.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', width: '100%' }}>
            <Link href="/contact" className="btn-primary" style={{ flex: '1 1 auto', textAlign: 'center' }}>Talk to an Engineer</Link>
            <Link href="/about" className="btn-ghost" style={{ flex: '1 1 auto', textAlign: 'center' }}>About Us</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
