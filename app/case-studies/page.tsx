import type { Metadata } from 'next'
import Link from 'next/link'
import { Nav } from '@/app/components/Nav'
import { Footer } from '@/app/components/Footer'
import { caseStudies } from '@/data/caseStudies'

export const metadata: Metadata = {
  title: 'Case Studies',
  description:
    'Real infrastructure results from real clients. Hospitals, universities, NGOs, and enterprises across Lebanon.',
  alternates: {
    canonical: 'https://techaneyat.com/case-studies',
    languages: { ar: 'https://techaneyat.com/ar/case-studies' },
  },
}

const sectorLabels: Record<string, string> = {
  enterprise: 'Enterprise',
  education: 'Education',
  healthcare: 'Healthcare',
  government: 'Government',
  ngo: 'NGO',
  retail: 'Retail',
}

export default function CaseStudiesPage() {
  return (
    <>
      <Nav locale="en" />
      <main style={{ paddingTop: '64px' }}>
        <section
          style={{
            background: 'var(--tn-bg)',
            backgroundImage: 'var(--tn-gradient-hero)',
            padding: '120px 0 80px',
          }}
        >
          <div className="section-container">
            <p className="eyebrow" style={{ marginBottom: '24px' }}>Client Results</p>
            <h1 style={{ marginBottom: '16px', maxWidth: '640px' }}>Real results. Real clients.</h1>
            <p style={{ color: 'var(--tn-text-2)', fontSize: '18px', maxWidth: '520px' }}>
              We measure success in uptime, speed of recovery, and problems that never happen.
            </p>
          </div>
        </section>

        <section style={{ background: 'var(--tn-bg-2)', padding: '80px 0' }}>
          <div className="section-container">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '24px',
              }}
            >
              {caseStudies.map((cs) => (
                <Link
                  key={cs.id}
                  href={`/case-studies/${cs.slug}`}
                  className="glow-card"
                  style={{ padding: '32px', textDecoration: 'none', display: 'block' }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--tn-font-mono)',
                      fontSize: '10px',
                      fontWeight: 500,
                      letterSpacing: '0.18em',
                      color: 'var(--tn-accent)',
                      textTransform: 'uppercase',
                      marginBottom: '8px',
                    }}
                  >
                    {sectorLabels[cs.sector]} · {cs.clientType}
                  </p>
                  <h3 style={{ color: 'var(--tn-text)', marginBottom: '12px' }}>
                    {cs.challengeHeadline}
                  </h3>
                  <p style={{ color: 'var(--tn-text-2)', fontSize: '15px', marginBottom: '20px' }}>
                    {cs.resultDetail}
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--tn-font-display)',
                      fontSize: '28px',
                      fontWeight: 700,
                      color: 'var(--tn-accent)',
                    }}
                  >
                    {cs.resultMetric}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer locale="en" />
    </>
  )
}
