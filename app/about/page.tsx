import type { Metadata } from 'next'
import { Nav } from '@/app/components/Nav'
import { Footer } from '@/app/components/Footer'
import { JsonLd } from '@/app/components/JsonLd'

export const metadata: Metadata = {
  title: 'About Techaneyat | Smart Infrastructure Partner, Lebanon',
  description:
    'Founded in 2015, Techaneyat is a smart infrastructure partner based in Beirut, Lebanon. One partner, one SLA, full accountability.',
  alternates: {
    canonical: 'https://techaneyat.com/about',
    languages: { ar: 'https://techaneyat.com/ar/about' },
  },
}

const aboutPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': 'https://techaneyat.com/about#webpage',
  url: 'https://techaneyat.com/about',
  name: 'About Techaneyat',
  description:
    'Founded in 2015, Techaneyat is a smart infrastructure partner based in Beirut, Lebanon. One partner, one SLA, full accountability.',
  publisher: { '@id': 'https://techaneyat.com/#organization' },
  inLanguage: 'en',
}

export default function AboutPage() {
  return (
    <>
      <JsonLd data={aboutPageSchema} />
      <Nav locale="en" />
      <main style={{ paddingTop: '64px' }}>
        {/* Hero */}
        <section
          style={{
            background: 'var(--tn-bg)',
            backgroundImage: 'var(--tn-gradient-hero)',
            padding: '120px 0 80px',
          }}
        >
          <div className="section-container">
            <p className="eyebrow" style={{ marginBottom: '24px' }}>About Techaneyat</p>
            <h1 style={{ maxWidth: '680px', marginBottom: '24px' }}>
              Built to own your technology problem.
            </h1>
            <p style={{ color: 'var(--tn-text-2)', fontSize: '18px', maxWidth: '520px' }}>
              Founded in 2015. Beirut, Lebanon. One principle: the client should never hear &ldquo;that&rsquo;s not our problem.&rdquo;
            </p>
          </div>
        </section>

        {/* Philosophy */}
        <section style={{ background: 'var(--tn-bg-2)', padding: '80px 0' }}>
          <div className="section-container" style={{ maxWidth: '760px' }}>
            <p className="eyebrow" style={{ marginBottom: '16px' }}>The One-SLA Philosophy</p>
            <h2 style={{ marginBottom: '32px' }}>One contract. Every system.</h2>
            <p
              style={{
                color: 'var(--tn-text-2)',
                fontSize: '18px',
                lineHeight: 1.8,
                marginBottom: '24px',
              }}
            >
              Most IT environments in Lebanon are stitched together from different vendors. When something breaks, everyone points at each other.
            </p>
            <p style={{ color: 'var(--tn-text-2)', fontSize: '18px', lineHeight: 1.8 }}>
              Techaneyat eliminates that. We design, build, and manage your entire technology backbone: network, cybersecurity, smart security, cloud, power continuity, and hardware. One SLA. One number to call. One team accountable.
            </p>
          </div>
        </section>

        {/* Three pillars */}
        <section style={{ background: 'var(--tn-bg)', padding: '80px 0' }}>
          <div className="section-container">
            <p className="eyebrow" style={{ marginBottom: '16px' }}>How We Work</p>
            <h2 style={{ marginBottom: '48px' }}>Three commitments.</h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '24px',
              }}
            >
              {[
                {
                  label: 'WE BUILD IT',
                  heading: 'We Build It',
                  body: 'From structured cabling and WiFi to servers, cloud, and power systems. We design and install your entire technology backbone properly from day one.',
                },
                {
                  label: 'WE SECURE IT',
                  heading: 'We Secure It',
                  body: 'Cybersecurity, CCTV, access control, firewalls, and endpoint protection. Every solution we build has security at its core. Never bolted on after the fact.',
                },
                {
                  label: 'WE OWN IT',
                  heading: 'We Own It',
                  body: 'Proactive monitoring, SLA-driven support, and a team that picks up the phone. We do not disappear after the project. We stay accountable.',
                },
              ].map((pillar) => (
                <div key={pillar.label} className="glow-card" style={{ padding: '32px' }}>
                  <p
                    style={{
                      fontFamily: 'var(--tn-font-mono)',
                      fontSize: '10px',
                      fontWeight: 500,
                      letterSpacing: '0.18em',
                      color: 'var(--tn-accent)',
                      marginBottom: '16px',
                    }}
                  >
                    {pillar.label}
                  </p>
                  <h3 style={{ marginBottom: '12px' }}>{pillar.heading}</h3>
                  <p style={{ color: 'var(--tn-text-2)', fontSize: '15px', lineHeight: 1.7 }}>{pillar.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team placeholder */}
        <section style={{ background: 'var(--tn-bg-2)', padding: '80px 0', textAlign: 'center' }}>
          <div className="section-container">
            <p className="eyebrow" style={{ justifyContent: 'center', marginBottom: '16px' }}>Our Team</p>
            <h2 style={{ marginBottom: '16px' }}>The people behind the SLA.</h2>
            <p style={{ color: 'var(--tn-text-3)', fontFamily: 'var(--tn-font-mono)', fontSize: '12px' }}>
              Team profiles: to be added (waiting on Ahmad)
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
            <h2 style={{ marginBottom: '16px' }}>Ready to work together?</h2>
            <p style={{ color: 'var(--tn-text-2)', marginBottom: '32px' }}>
              We respond within 4 hours.
            </p>
            <a href="/contact" className="btn-primary">Talk to an Engineer</a>
          </div>
        </section>
      </main>
      <Footer locale="en" />
    </>
  )
}
