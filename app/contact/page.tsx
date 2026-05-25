import type { Metadata } from 'next'
import { Nav } from '@/app/components/Nav'
import { Footer } from '@/app/components/Footer'
import { ContactForm } from './ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Techaneyat. We respond within 4 hours. Beirut, Lebanon. +961 76 100 766.',
  alternates: {
    canonical: 'https://techaneyat.com/contact',
    languages: { ar: 'https://techaneyat.com/ar/contact' },
  },
}

export default function ContactPage() {
  return (
    <>
      <Nav locale="en" />
      <main style={{ paddingTop: '64px' }}>
        <section
          style={{
            background: 'var(--tn-bg)',
            backgroundImage: 'var(--tn-gradient-hero)',
            padding: '80px 0',
          }}
        >
          <div className="section-container">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '64px',
                alignItems: 'start',
              }}
            >
              {/* Left: heading + details */}
              <div>
                <p className="eyebrow" style={{ marginBottom: '24px' }}>Get in Touch</p>
                <h1 style={{ marginBottom: '16px', maxWidth: '480px' }}>
                  Let&apos;s talk infrastructure.
                </h1>
                <p style={{ color: 'var(--tn-text-2)', fontSize: '18px', marginBottom: '48px', maxWidth: '420px' }}>
                  Tell us what you&apos;re running, what&apos;s breaking, or what you want to build. We&apos;ll respond within 4 hours.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {[
                    { label: 'Email', value: 'Sales@techaneyat.com', href: 'mailto:Sales@techaneyat.com' },
                    { label: 'Phone', value: '+961 76 100 766', href: 'tel:+96176100766' },
                    { label: 'Location', value: 'Beirut, Lebanon', href: undefined },
                    { label: 'Response time', value: 'Within 4 hours', href: undefined },
                  ].map((item) => (
                    <div key={item.label}>
                      <p
                        style={{
                          fontFamily: 'var(--tn-font-mono)',
                          fontSize: '10px',
                          fontWeight: 500,
                          letterSpacing: '0.18em',
                          textTransform: 'uppercase',
                          color: 'var(--tn-text-3)',
                          marginBottom: '4px',
                        }}
                      >
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          style={{
                            color: 'var(--tn-accent)',
                            fontFamily: 'var(--tn-font-mono)',
                            fontSize: '14px',
                            textDecoration: 'none',
                          }}
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p style={{ color: 'var(--tn-text-2)', fontFamily: 'var(--tn-font-mono)', fontSize: '14px' }}>
                          {item.value}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: form */}
              <div className="glow-card" style={{ padding: '40px' }}>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer locale="en" />
    </>
  )
}
