import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Nav } from '@/app/components/Nav'
import { Footer } from '@/app/components/Footer'
import { caseStudies, getCaseStudyBySlug } from '@/data/caseStudies'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const cs = getCaseStudyBySlug(slug)
  if (!cs) return { title: 'Not Found' }

  return {
    title: `${cs.challengeHeadline} | Case Study`,
    description: `${cs.clientType}: ${cs.resultDetail}`,
    alternates: {
      canonical: `https://techaneyat.com/case-studies/${slug}`,
      languages: { ar: `https://techaneyat.com/ar/case-studies/${slug}` },
    },
  }
}

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }))
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params
  const cs = getCaseStudyBySlug(slug)
  if (!cs) notFound()

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
            <p className="eyebrow" style={{ marginBottom: '24px' }}>
              {cs.clientType}
            </p>
            <h1 style={{ maxWidth: '700px', marginBottom: '32px' }}>
              {cs.challengeHeadline}
            </h1>
            <p
              style={{
                fontFamily: 'var(--tn-font-display)',
                fontSize: '48px',
                fontWeight: 700,
                color: 'var(--tn-accent)',
              }}
            >
              {cs.resultMetric}
            </p>
          </div>
        </section>

        <section style={{ background: 'var(--tn-bg-2)', padding: '80px 0' }}>
          <div className="section-container" style={{ maxWidth: '760px' }}>
            <p style={{ color: 'var(--tn-text-2)', fontSize: '18px', lineHeight: 1.8, marginBottom: '32px' }}>
              {cs.resultDetail}
            </p>
            <p style={{ color: 'var(--tn-text-3)', fontFamily: 'var(--tn-font-mono)', fontSize: '12px' }}>
              Full case study content — to be added when Ahmad provides details.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section
          style={{
            background: 'var(--tn-bg)',
            padding: '80px 0',
            textAlign: 'center',
            borderTop: '1px solid var(--tn-border)',
          }}
        >
          <div className="section-container">
            <h2 style={{ marginBottom: '32px' }}>Want a result like this?</h2>
            <a href="/contact" className="btn-primary">Talk to an Engineer</a>
          </div>
        </section>
      </main>
      <Footer locale="en" />
    </>
  )
}
