import type { Metadata } from 'next'
import { Nav } from '@/app/components/Nav'
import { Footer } from '@/app/components/Footer'
import { JsonLd } from '@/app/components/JsonLd'
import { ContactForm } from './ContactForm'

export const metadata: Metadata = {
  title: 'Contact Techaneyat | Infrastructure Partner, Lebanon',
  description:
    'Get in touch with Techaneyat. We respond within 4 hours. Beirut, Lebanon. +961 76 100 766.',
  alternates: {
    canonical: 'https://techaneyat.com/contact',
    languages: { ar: 'https://techaneyat.com/ar/contact' },
  },
}

const contactPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  '@id': 'https://techaneyat.com/contact#webpage',
  url: 'https://techaneyat.com/contact',
  name: 'Contact Techaneyat',
  description: 'Get in touch with Techaneyat. We respond within 4 hours.',
  publisher: { '@id': 'https://techaneyat.com/#organization' },
  inLanguage: 'en',
  mainEntity: {
    '@type': 'LocalBusiness',
    '@id': 'https://techaneyat.com/#organization',
    name: 'Techaneyat',
    telephone: '+961-76-100-766',
    email: 'Sales@techaneyat.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Block C, 3rd Floor, Rome Street',
      addressLocality: 'Beirut',
      addressCountry: 'LB',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '00:00',
      closes: '23:59',
    },
  },
}

export default function ContactPage() {
  return (
    <>
      <JsonLd data={contactPageSchema} />
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
            <div className="contact-grid">
              {/* Left: heading + details */}
              <div>
                <p className="eyebrow" style={{ marginBottom: '24px' }}>Get in Touch</p>
                <h1 className="contact-heading">
                  Let&apos;s talk infrastructure.
                </h1>
                <p style={{ color: 'var(--tn-text-2)', fontSize: '18px', marginBottom: '48px', maxWidth: '420px' }}>
                  Tell us what you&apos;re running, what&apos;s breaking, or what you want to build. We&apos;ll respond within 4 hours.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {[
                    { label: 'Email', value: 'Sales@techaneyat.com', href: 'mailto:Sales@techaneyat.com' },
                    { label: 'Phone', value: '+961 76 100 766', href: 'tel:+96176100766' },
                    { label: 'Location', value: 'Block C, 3rd Floor, Rome Street, Beirut', href: 'https://maps.google.com/?q=Techaneyat+Beirut' },
                    { label: 'Response time', value: 'Within 4 hours', href: undefined },
                    { label: 'Google rating', value: '4.9★ · 15 reviews', href: 'https://maps.google.com/?q=Techaneyat+Beirut' },
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
