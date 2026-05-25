import type { Metadata } from 'next'
import { Nav } from '@/app/components/Nav'
import { Footer } from '@/app/components/Footer'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Technical insights on network infrastructure, cybersecurity, cloud, and power continuity. From the Techaneyat team.',
  alternates: {
    canonical: 'https://techaneyat.com/blog',
    languages: { ar: 'https://techaneyat.com/ar/blog' },
  },
}

export default function BlogPage() {
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
            <p className="eyebrow" style={{ marginBottom: '24px' }}>Technical Insights</p>
            <h1 style={{ marginBottom: '16px' }}>Infrastructure intelligence.</h1>
            <p style={{ color: 'var(--tn-text-2)', fontSize: '18px', maxWidth: '520px' }}>
              Practical knowledge on the systems that keep businesses running.
            </p>
          </div>
        </section>

        <section style={{ background: 'var(--tn-bg-2)', padding: '80px 0', textAlign: 'center' }}>
          <div className="section-container">
            <p style={{ color: 'var(--tn-text-3)', fontFamily: 'var(--tn-font-mono)', fontSize: '13px' }}>
              Articles coming soon.
            </p>
          </div>
        </section>
      </main>
      <Footer locale="en" />
    </>
  )
}
