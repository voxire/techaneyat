'use client'
import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─── Case study data ──────────────────────────────────────────────────────────
// Placeholder results until Ahmad provides real client details.
// Copy locked to Techaneyat brand voice: authoritative, specific, no fluff.

const CASES = [
  {
    slug:      'hospital-network',
    sector:    'Healthcare',
    client:    'Regional Hospital Group',
    challenge: 'Critical systems going offline during Lebanese grid failures.',
    metric:    '99.9%',
    metricLabel: 'Network uptime across 3 facilities',
    services:  ['Network & Infrastructure', 'Power Continuity'],
    quote:     'We have not had a single unplanned outage since Techaneyat took over.',
    bg:        'linear-gradient(135deg, rgba(0,200,255,0.06) 0%, transparent 55%)',
  },
  {
    slug:      'campus-security',
    sector:    'Education',
    client:    'International School Campus',
    challenge: 'Four disconnected buildings, no unified access control or surveillance.',
    metric:    '18mo',
    metricLabel: 'Zero unplanned downtime',
    services:  ['Network & Infrastructure', 'Smart Security', 'Cloud'],
    quote:     'One call. One team. Every building covered.',
    bg:        'linear-gradient(135deg, rgba(0,200,255,0.06) 0%, transparent 55%)',
  },
  {
    slug:      'fintech-security',
    sector:    'Financial Sector',
    client:    'Beirut-based Fintech Firm',
    challenge: 'Aging infrastructure exposed to targeted cyberattacks.',
    metric:    '0',
    metricLabel: 'Breaches since deployment',
    services:  ['Cybersecurity', 'Network & Infrastructure'],
    quote:     'They found vulnerabilities our previous vendor had missed for two years.',
    bg:        'linear-gradient(135deg, rgba(0,200,255,0.06) 0%, transparent 55%)',
  },
]

// ─── Component ────────────────────────────────────────────────────────────────

export function CaseStudiesGrid() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      cardRefs.current.forEach((el, i) => {
        if (!el) return
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.7,
          ease: 'power2.out',
          delay: i * 0.12,
          scrollTrigger: { trigger: el, start: 'top 85%' },
        })
      })
    })
    return () => mm.revert()
  }, [])

  return (
    <section style={{ background: 'var(--tn-bg)', padding: 'clamp(64px, 10vw, 120px) 0' }}>
      <style>{`
        .cs-wrap { max-width: 1200px; margin: 0 auto; padding: 0 48px; }
        .cs-header { text-align: center; margin-bottom: 64px; }
        .cs-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }
        .cs-card {
          background: var(--tn-bg-3);
          border: 1px solid var(--tn-border);
          border-radius: 12px;
          padding: 36px 32px;
          display: flex;
          flex-direction: column;
          gap: 0;
          transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
          position: relative;
          overflow: hidden;
        }
        .cs-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          pointer-events: none;
          opacity: 0;
          background: var(--tn-gradient-card);
          transition: opacity 0.3s;
        }
        .cs-card:hover {
          border-color: var(--tn-border-accent);
          box-shadow: 0 0 32px var(--tn-accent-glow), 0 24px 48px rgba(0,0,0,0.4);
          transform: translateY(-4px);
        }
        .cs-card:hover::before { opacity: 1; }

        .cs-sector {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--tn-font-mono);
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--tn-accent);
          margin-bottom: 20px;
        }
        .cs-sector::before {
          content: '';
          display: block;
          width: 20px;
          height: 1px;
          background: var(--tn-accent);
          flex-shrink: 0;
        }

        .cs-challenge {
          font-family: var(--tn-font-display);
          font-size: 17px;
          font-weight: 600;
          line-height: 1.35;
          color: var(--tn-text);
          margin-bottom: 32px;
          letter-spacing: -0.01em;
          min-height: calc(1.35em * 3);
        }

        .cs-metric-block {
          border-top: 1px solid var(--tn-border);
          padding-top: 24px;
          margin-bottom: 24px;
        }
        .cs-metric-number {
          font-family: var(--tn-font-display);
          font-size: clamp(40px, 4vw, 56px);
          font-weight: 700;
          color: var(--tn-accent);
          letter-spacing: -0.04em;
          line-height: 1;
          margin-bottom: 6px;
        }
        .cs-metric-label {
          font-family: var(--tn-font-body);
          font-size: 13px;
          color: var(--tn-text-2);
          line-height: 1.4;
        }

        .cs-quote {
          font-family: var(--tn-font-body);
          font-size: 13px;
          font-style: italic;
          color: var(--tn-text-3);
          line-height: 1.6;
          margin-bottom: 28px;
          padding-left: 12px;
          border-left: 2px solid var(--tn-border-accent);
          min-height: calc(1.6em * 2);
        }

        .cs-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 28px;
          margin-top: auto;
        }
        .cs-tag {
          font-family: var(--tn-font-mono);
          font-size: 9px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--tn-text-3);
          border: 1px solid var(--tn-border);
          border-radius: 3px;
          padding: 4px 8px;
        }

        .cs-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--tn-font-display);
          font-size: 13px;
          font-weight: 500;
          color: var(--tn-accent);
          text-decoration: none;
          border-bottom: 1px solid rgba(0,200,255,0.28);
          padding-bottom: 2px;
          width: fit-content;
          transition: border-color 0.2s, gap 0.2s;
        }
        .cs-link:hover {
          border-color: var(--tn-accent);
          gap: 12px;
        }

        @media (max-width: 991px) {
          .cs-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 639px) {
          .cs-wrap { padding: 0 24px; }
          .cs-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="cs-wrap">
        {/* Header */}
        <div className="cs-header">
          <p className="eyebrow" style={{ justifyContent: 'center', marginBottom: '16px' }}>
            Client Results
          </p>
          <h2 style={{ marginBottom: '16px' }}>Real results. Real clients.</h2>
          <p style={{ color: 'var(--tn-text-2)', fontSize: '18px', maxWidth: '480px', margin: '0 auto' }}>
            Numbers from live deployments across healthcare, education, and financial sectors.
          </p>
        </div>

        {/* Cards */}
        <div className="cs-grid">
          {CASES.map((c, i) => (
            <div
              key={c.slug}
              ref={el => { cardRefs.current[i] = el }}
              className="cs-card"
            >
              {/* Sector */}
              <div className="cs-sector">{c.sector}</div>

              {/* Challenge */}
              <p className="cs-challenge">{c.challenge}</p>

              {/* Metric */}
              <div className="cs-metric-block">
                <div className="cs-metric-number">{c.metric}</div>
                <div className="cs-metric-label">{c.metricLabel}</div>
              </div>

              {/* Quote */}
              <p className="cs-quote">"{c.quote}"</p>

              {/* Service tags */}
              <div className="cs-tags">
                {c.services.map(s => (
                  <span key={s} className="cs-tag">{s}</span>
                ))}
              </div>

              {/* CTA */}
              <Link href={`/case-studies/${c.slug}`} className="cs-link">
                Read case study
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          ))}
        </div>

        {/* View all */}
        <div style={{ textAlign: 'center', marginTop: '56px' }}>
          <Link href="/case-studies" className="btn-ghost">
            View all case studies
          </Link>
        </div>
      </div>
    </section>
  )
}
