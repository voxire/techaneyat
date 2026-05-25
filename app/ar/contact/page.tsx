import type { Metadata } from 'next'
import { Nav } from '@/app/components/Nav'
import { Footer } from '@/app/components/Footer'
import { ContactForm } from '@/app/contact/ContactForm'

export const metadata: Metadata = {
  title: 'تواصل معنا | تكنيات',
  description: 'تواصل مع تكنيات. نرد خلال 4 ساعات. بيروت، لبنان.',
  alternates: {
    canonical: 'https://techaneyat.com/ar/contact',
    languages: { en: 'https://techaneyat.com/contact' },
  },
}

export default function ArabicContactPage() {
  return (
    <>
      <Nav locale="ar" />
      <main style={{ paddingTop: '64px' }}>
        <section
          style={{
            background: 'var(--tn-bg)',
            backgroundImage: 'var(--tn-gradient-hero)',
            padding: '80px 0',
          }}
        >
          <div className="section-container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '64px' }}>
              <div>
                <p className="eyebrow" style={{ marginBottom: '24px' }}>تواصل معنا</p>
                <h1 style={{ marginBottom: '16px', maxWidth: '480px' }}>
                  لنتحدث عن البنية التحتية.
                </h1>
                <p style={{ color: 'var(--tn-text-2)', fontSize: '18px', marginBottom: '48px' }}>
                  أخبرنا بما تشغله، وما يعطل، أو ما تريد بناءه. سنرد خلال 4 ساعات.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <a href="mailto:Sales@techaneyat.com" style={{ color: 'var(--tn-accent)', fontFamily: 'var(--tn-font-mono)', fontSize: '14px', textDecoration: 'none' }}>
                    Sales@techaneyat.com
                  </a>
                  <a href="tel:+96176100766" style={{ color: 'var(--tn-accent)', fontFamily: 'var(--tn-font-mono)', fontSize: '14px', textDecoration: 'none' }}>
                    +961 76 100 766
                  </a>
                </div>
              </div>
              <div className="glow-card" style={{ padding: '40px' }}>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer locale="ar" />
    </>
  )
}
