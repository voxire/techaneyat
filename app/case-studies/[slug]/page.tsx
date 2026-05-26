import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Nav } from '@/app/components/Nav'
import { Footer } from '@/app/components/Footer'
import { getCaseStudyBySlug, caseStudies } from '@/data/caseStudies'

type Props = { params: Promise<{ slug: string }> }

const sectorLabels: Record<string, string> = {
  enterprise: 'Enterprise',
  education: 'Education',
  healthcare: 'Healthcare',
  government: 'Government',
  ngo: 'NGO',
  retail: 'Retail',
}

const serviceLabels: Record<string, string> = {
  network: 'Network & Infrastructure',
  cybersecurity: 'Cybersecurity',
  'smart-security': 'Smart Security',
  cloud: 'Cloud & Managed Services',
  power: 'Energy & Power Continuity',
  hardware: 'Computing & Hardware',
}

export async function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const cs = getCaseStudyBySlug(slug)
  if (!cs) return {}
  return {
    title: `${cs.challengeHeadline} | Techaneyat Case Study`,
    description: `${cs.clientType}: ${cs.resultDetail}`,
    alternates: {
      canonical: `https://techaneyat.com/case-studies/${cs.slug}`,
    },
  }
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params
  const cs = getCaseStudyBySlug(slug)
  if (!cs) notFound()

  const related = caseStudies.filter((c) => c.slug !== slug).slice(0, 2)

  return (
    <>
      <Nav locale="en" />
      <main style={{ paddingTop: '64px' }}>

        {/* Hero */}
        <section style={{
          background: 'var(--tn-bg)',
          backgroundImage: 'var(--tn-gradient-hero)',
          padding: 'clamp(72px, 10vw, 112px) 0 0',
          borderBottom: '1px solid var(--tn-border)',
        }}>
          <div className="section-container">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Link href="/case-studies" style={{
                fontFamily: 'var(--tn-font-mono)',
                fontSize: '11px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--tn-text-3)',
                textDecoration: 'none',
              }}>
                Case Studies
              </Link>
              <span style={{ color: 'var(--tn-text-3)', fontSize: '11px' }}>/</span>
              <span style={{
                fontFamily: 'var(--tn-font-mono)',
                fontSize: '11px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--tn-accent)',
              }}>
                {sectorLabels[cs.sector]}
              </span>
            </nav>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
              <span style={{
                fontFamily: 'var(--tn-font-mono)',
                fontSize: '10px',
                fontWeight: 500,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--tn-accent)',
                background: 'var(--tn-accent-dim)',
                border: '1px solid var(--tn-border-accent)',
                borderRadius: '4px',
                padding: '4px 10px',
              }}>
                {sectorLabels[cs.sector]}
              </span>
              <span style={{
                fontFamily: 'var(--tn-font-mono)',
                fontSize: '10px',
                fontWeight: 500,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--tn-text-3)',
                background: 'var(--tn-bg-3)',
                border: '1px solid var(--tn-border)',
                borderRadius: '4px',
                padding: '4px 10px',
              }}>
                {cs.clientType}
              </span>
            </div>

            <h1 style={{
              fontFamily: 'var(--tn-font-display)',
              fontSize: 'clamp(28px, 4.5vw, 52px)',
              fontWeight: 700,
              color: 'var(--tn-text)',
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              maxWidth: '780px',
              marginBottom: '32px',
            }}>
              {cs.challengeHeadline}
            </h1>

            {/* Stats bar */}
            <style>{`
              .cs-stats-grid {
                display: grid;
                grid-template-columns: repeat(${cs.stats.length}, 1fr);
                gap: 1px;
                background: var(--tn-border);
                border-top: 1px solid var(--tn-border);
                margin-top: 8px;
              }
              .cs-stat-cell {
                background: var(--tn-bg);
                padding: 24px 28px;
              }
              @media (max-width: 600px) {
                .cs-stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
              }
              .cs-body {
                display: grid;
                grid-template-columns: 1fr 320px;
                gap: 64px;
                align-items: start;
              }
              @media (max-width: 960px) {
                .cs-body { grid-template-columns: 1fr; gap: 40px; }
                .cs-sidebar { order: -1; }
              }
              .cs-prose p {
                color: var(--tn-text-2);
                font-size: 16px;
                line-height: 1.85;
                margin-bottom: 18px;
              }
              .cs-section {
                margin-bottom: 56px;
              }
              .cs-section:last-child { margin-bottom: 0; }
              .cs-section-heading {
                font-family: var(--tn-font-display);
                font-size: clamp(20px, 2.4vw, 26px);
                font-weight: 700;
                color: var(--tn-text);
                letter-spacing: -0.02em;
                margin-bottom: 20px;
                padding-bottom: 14px;
                border-bottom: 1px solid var(--tn-border);
              }
              .cs-related-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 20px;
                margin-top: 32px;
              }
              @media (max-width: 600px) {
                .cs-related-grid { grid-template-columns: 1fr; }
              }
              .cs-related-card {
                background: var(--tn-bg-3);
                border: 1px solid var(--tn-border);
                border-radius: 10px;
                padding: 28px;
                text-decoration: none;
                display: block;
                transition: border-color 0.25s, box-shadow 0.25s;
              }
              .cs-related-card:hover {
                border-color: var(--tn-border-accent);
                box-shadow: 0 0 24px var(--tn-accent-glow);
              }
            `}</style>

            <div className="cs-stats-grid">
              {cs.stats.map((stat, i) => (
                <div key={i} className="cs-stat-cell">
                  <p style={{
                    fontFamily: 'var(--tn-font-display)',
                    fontSize: 'clamp(24px, 3vw, 36px)',
                    fontWeight: 700,
                    color: 'var(--tn-accent)',
                    lineHeight: 1,
                    marginBottom: '6px',
                  }}>
                    {stat.value}
                  </p>
                  <p style={{
                    fontFamily: 'var(--tn-font-mono)',
                    fontSize: '10px',
                    fontWeight: 500,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--tn-text-3)',
                  }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Body content */}
        <section style={{ background: 'var(--tn-bg)', padding: 'clamp(56px, 8vw, 96px) 0' }}>
          <div className="section-container">
            <div className="cs-body">
              {/* Main prose */}
              <div>
                <div className="cs-section">
                  <p className="eyebrow" style={{ marginBottom: '16px' }}>The challenge</p>
                  <h2 className="cs-section-heading">What we walked into</h2>
                  <div className="cs-prose">
                    {cs.challenge.split('\n\n').map((para, i) => (
                      <p key={i}>{para.trim()}</p>
                    ))}
                  </div>
                </div>

                <div className="cs-section">
                  <p className="eyebrow" style={{ marginBottom: '16px' }}>The solution</p>
                  <h2 className="cs-section-heading">What we built</h2>
                  <div className="cs-prose">
                    {cs.solution.split('\n\n').map((para, i) => (
                      <p key={i}>{para.trim()}</p>
                    ))}
                  </div>
                </div>

                <div className="cs-section">
                  <p className="eyebrow" style={{ marginBottom: '16px' }}>The results</p>
                  <h2 className="cs-section-heading">What changed</h2>
                  <div className="cs-prose">
                    {cs.results.split('\n\n').map((para, i) => (
                      <p key={i}>{para.trim()}</p>
                    ))}
                  </div>
                </div>

                {cs.clientQuote && (
                  <div style={{
                    background: 'var(--tn-bg-3)',
                    border: '1px solid var(--tn-border-accent)',
                    borderLeft: '3px solid var(--tn-accent)',
                    borderRadius: '0 8px 8px 0',
                    padding: '28px 32px',
                  }}>
                    <p style={{
                      fontFamily: 'var(--tn-font-display)',
                      fontSize: '17px',
                      fontWeight: 500,
                      color: 'var(--tn-text)',
                      lineHeight: 1.65,
                      fontStyle: 'italic',
                      marginBottom: '14px',
                    }}>
                      &ldquo;{cs.clientQuote}&rdquo;
                    </p>
                    <p style={{
                      fontFamily: 'var(--tn-font-mono)',
                      fontSize: '10px',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: 'var(--tn-text-3)',
                    }}>
                      {cs.clientType}
                    </p>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="cs-sidebar" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                <div style={{
                  background: 'var(--tn-bg-3)',
                  border: '1px solid var(--tn-border)',
                  borderRadius: '10px',
                  padding: '24px',
                }}>
                  <p style={{
                    fontFamily: 'var(--tn-font-mono)',
                    fontSize: '10px',
                    fontWeight: 500,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'var(--tn-text-3)',
                    marginBottom: '16px',
                  }}>
                    Services delivered
                  </p>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {cs.servicesUsed.map((s) => (
                      <li key={s} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          background: 'var(--tn-accent)',
                          flexShrink: 0,
                        }} />
                        <Link
                          href={`/services/${s}`}
                          style={{
                            color: 'var(--tn-text-2)',
                            fontSize: '14px',
                            textDecoration: 'none',
                          }}
                        >
                          {serviceLabels[s] ?? s}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{
                  background: 'var(--tn-bg-3)',
                  border: '1px solid var(--tn-border)',
                  borderRadius: '10px',
                  padding: '24px',
                }}>
                  <p style={{
                    fontFamily: 'var(--tn-font-mono)',
                    fontSize: '10px',
                    fontWeight: 500,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'var(--tn-text-3)',
                    marginBottom: '16px',
                  }}>
                    Technologies
                  </p>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {cs.technologies.map((tech) => (
                      <li key={tech} style={{
                        fontFamily: 'var(--tn-font-mono)',
                        fontSize: '12px',
                        color: 'var(--tn-text-2)',
                        background: 'var(--tn-bg-2)',
                        border: '1px solid var(--tn-border)',
                        borderRadius: '4px',
                        padding: '6px 10px',
                      }}>
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{
                  background: 'var(--tn-accent-dim)',
                  border: '1px solid var(--tn-border-accent)',
                  borderRadius: '10px',
                  padding: '24px',
                  textAlign: 'center',
                }}>
                  <p style={{
                    fontFamily: 'var(--tn-font-display)',
                    fontSize: '15px',
                    fontWeight: 600,
                    color: 'var(--tn-text)',
                    marginBottom: '16px',
                    lineHeight: 1.4,
                  }}>
                    Similar challenges in your organization?
                  </p>
                  <Link href="/contact" className="btn-primary" style={{ display: 'block', textAlign: 'center' }}>
                    Talk to an Engineer
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section style={{
            background: 'var(--tn-bg-2)',
            borderTop: '1px solid var(--tn-border)',
            padding: 'clamp(48px, 6vw, 72px) 0',
          }}>
            <div className="section-container">
              <p className="eyebrow">More case studies</p>
              <div className="cs-related-grid">
                {related.map((c) => (
                  <Link key={c.id} href={`/case-studies/${c.slug}`} className="cs-related-card">
                    <p style={{
                      fontFamily: 'var(--tn-font-mono)',
                      fontSize: '10px',
                      fontWeight: 500,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: 'var(--tn-accent)',
                      marginBottom: '10px',
                    }}>
                      {sectorLabels[c.sector]} · {c.clientType}
                    </p>
                    <h3 style={{
                      fontFamily: 'var(--tn-font-display)',
                      fontSize: '18px',
                      fontWeight: 600,
                      color: 'var(--tn-text)',
                      lineHeight: 1.3,
                      marginBottom: '12px',
                    }}>
                      {c.challengeHeadline}
                    </h3>
                    <p style={{
                      fontFamily: 'var(--tn-font-display)',
                      fontSize: '24px',
                      fontWeight: 700,
                      color: 'var(--tn-accent)',
                    }}>
                      {c.resultMetric}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

      </main>
      <Footer locale="en" />
    </>
  )
}
