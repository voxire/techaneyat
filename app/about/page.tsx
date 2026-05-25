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

const vendors = [
  { name: 'Cisco', category: 'Networking' },
  { name: 'Fortinet', category: 'Cybersecurity' },
  { name: 'Microsoft', category: 'Cloud' },
  { name: 'HPE', category: 'Servers' },
  { name: 'Ubiquiti', category: 'Networking' },
  { name: 'Hikvision', category: 'Security' },
  { name: 'APC', category: 'Power' },
  { name: 'Dell', category: 'Hardware' },
  { name: 'CrowdStrike', category: 'Endpoint' },
  { name: 'Milestone', category: 'VMS' },
  { name: 'Synology', category: 'Storage' },
  { name: 'Eaton', category: 'Power' },
]

const commitments = [
  {
    label: 'WE DESIGN IT RIGHT',
    heading: 'Proper design before the first cable is touched.',
    body: 'Every engagement starts with a site survey, a current-state audit, and a documented design. We do not guess at cable lengths or spec hardware from a phone call. You approve the design before procurement. No surprises on installation day.',
  },
  {
    label: 'WE BUILD IT TO LAST',
    heading: 'Installed to run for a decade, not until the next contractor.',
    body: 'Structured cabling, rack management, labeling, and documentation. Everything we install is built to a standard that the engineer who comes after us will respect. Not all contractors work that way. We do.',
  },
  {
    label: 'WE SECURE IT BY DEFAULT',
    heading: 'Security is not an optional add-on.',
    body: 'Every network we build includes VLAN segmentation, firewall policy, and access controls. Every cloud environment includes MFA and backup verification. Security is part of the design — not sold separately after you get breached.',
  },
  {
    label: 'WE STAY ACCOUNTABLE',
    heading: 'One number to call. One team that answers.',
    body: 'We do not disappear after the project closes. We monitor, maintain, and respond. If something breaks, you call us — not a different vendor, not a different SLA, not a different conversation. One contract covers it all.',
  },
]

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
            padding: '100px 0 80px',
          }}
        >
          <div className="section-container">
            <p className="eyebrow" style={{ marginBottom: '24px' }}>About Techaneyat</p>
            <h1 style={{ maxWidth: '720px', marginBottom: '28px' }}>
              Built to own your technology problem.
            </h1>
            <p style={{ color: 'var(--tn-text-2)', fontSize: '18px', maxWidth: '560px', lineHeight: 1.8 }}>
              Founded in 2015. Beirut, Lebanon. Built around one principle: the client should never hear &ldquo;that&apos;s not our problem.&rdquo; One partner. One contract. Full accountability.
            </p>
          </div>
        </section>

        {/* Stats row */}
        <section
          style={{
            background: 'var(--tn-bg-2)',
            borderTop: '1px solid var(--tn-border)',
            borderBottom: '1px solid var(--tn-border)',
            padding: '48px 0',
          }}
        >
          <div className="section-container">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                gap: '32px',
              }}
            >
              {[
                { value: '10+', label: 'Years in Lebanon', sub: 'Since 2015' },
                { value: '500+', label: 'Projects delivered', sub: 'Across all sectors' },
                { value: '99.9%', label: 'Network uptime', sub: 'Managed clients' },
                { value: '24/7', label: 'Support coverage', sub: 'Always reachable' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p
                    style={{
                      fontFamily: 'var(--tn-font-display)',
                      fontSize: 'clamp(32px, 4vw, 48px)',
                      fontWeight: 700,
                      color: 'var(--tn-accent)',
                      lineHeight: 1,
                      marginBottom: '8px',
                    }}
                  >
                    {stat.value}
                  </p>
                  <p style={{ color: 'var(--tn-text)', fontSize: '14px', fontWeight: 500, marginBottom: '4px' }}>
                    {stat.label}
                  </p>
                  <p style={{ color: 'var(--tn-text-3)', fontSize: '12px', fontFamily: 'var(--tn-font-mono)' }}>
                    {stat.sub}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The challenge in Lebanon */}
        <section style={{ background: 'var(--tn-bg)', padding: '80px 0' }}>
          <div className="section-container">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '64px',
                alignItems: 'start',
              }}
            >
              <div>
                <p className="eyebrow" style={{ marginBottom: '20px' }}>The Context</p>
                <h2 style={{ marginBottom: '28px' }}>Infrastructure in Lebanon is harder.</h2>
                <p style={{ color: 'var(--tn-text-2)', fontSize: '16px', lineHeight: 1.85, marginBottom: '20px' }}>
                  Power cuts up to 20 hours a day in some regions. An ISP market where uptime guarantees mean little. A contracting ecosystem where documentation is rare and proper design is rarer.
                </p>
                <p style={{ color: 'var(--tn-text-2)', fontSize: '16px', lineHeight: 1.85 }}>
                  We have operated in this environment since 2015. We have built networks that survive power cuts, designed security systems for facilities on three generators, and migrated organizations to cloud platforms during the 2019 financial crisis and the pandemic. The environment makes us better engineers.
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { label: 'Power', detail: 'We engineer for Lebanon\'s power reality. Every critical system has a power continuity plan.' },
                  { label: 'Connectivity', detail: 'Dual-ISP failover is standard on every network we manage. Single-ISP is a single point of failure.' },
                  { label: 'Vendor fragmentation', detail: 'Most IT environments here are patched together from 10 different vendors with no single point of accountability.' },
                  { label: 'Documentation gaps', detail: 'We have never taken over a network that had complete documentation. We always leave one behind.' },
                ].map((item) => (
                  <div
                    key={item.label}
                    style={{
                      padding: '20px 24px',
                      background: 'var(--tn-bg-3)',
                      border: '1px solid var(--tn-border)',
                      borderRadius: '8px',
                      borderLeft: '3px solid var(--tn-accent)',
                    }}
                  >
                    <p
                      style={{
                        fontFamily: 'var(--tn-font-mono)',
                        fontSize: '10px',
                        fontWeight: 500,
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        color: 'var(--tn-accent)',
                        marginBottom: '8px',
                      }}
                    >
                      {item.label}
                    </p>
                    <p style={{ color: 'var(--tn-text-2)', fontSize: '14px', lineHeight: 1.7 }}>
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* One-SLA philosophy */}
        <section style={{ background: 'var(--tn-bg-2)', padding: '80px 0' }}>
          <div className="section-container">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '64px',
                alignItems: 'start',
              }}
            >
              <div>
                <p className="eyebrow" style={{ marginBottom: '20px' }}>The One-SLA Philosophy</p>
                <h2 style={{ marginBottom: '28px' }}>One contract. Every system.</h2>
                <p style={{ color: 'var(--tn-text-2)', fontSize: '16px', lineHeight: 1.85, marginBottom: '20px' }}>
                  Most IT environments in Lebanon are stitched together from different vendors. The network is one company. The cybersecurity is another. The cameras are a third. The cloud is wherever it ended up.
                </p>
                <p style={{ color: 'var(--tn-text-2)', fontSize: '16px', lineHeight: 1.85, marginBottom: '20px' }}>
                  When something breaks, everyone points at each other. The network vendor says it is a firewall issue. The firewall vendor says check the ISP. The ISP says the router is not their device. Your staff wait. Your business stops.
                </p>
                <p style={{ color: 'var(--tn-text-2)', fontSize: '16px', lineHeight: 1.85 }}>
                  Techaneyat eliminates that. We design, build, and manage your entire technology backbone — network, cybersecurity, smart security, cloud, power, and hardware — under a single SLA. One number to call. One team accountable for everything.
                </p>
              </div>
              <div>
                <div
                  style={{
                    background: 'var(--tn-bg-3)',
                    border: '1px solid var(--tn-border-accent)',
                    borderRadius: '12px',
                    padding: '36px',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--tn-font-mono)',
                      fontSize: '10px',
                      fontWeight: 500,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: 'var(--tn-text-3)',
                      marginBottom: '24px',
                    }}
                  >
                    Without Techaneyat
                  </p>
                  {[
                    'Network vendor',
                    'Firewall vendor',
                    'Camera/security vendor',
                    'Cloud / Microsoft partner',
                    'Power/UPS supplier',
                    'Hardware supplier',
                    'Helpdesk provider',
                  ].map((vendor) => (
                    <div
                      key={vendor}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '10px 0',
                        borderBottom: '1px solid var(--tn-border)',
                      }}
                    >
                      <span
                        style={{
                          width: '16px',
                          height: '16px',
                          borderRadius: '50%',
                          background: 'rgba(239,68,68,0.15)',
                          border: '1px solid rgba(239,68,68,0.3)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '9px',
                          color: '#EF4444',
                          flexShrink: 0,
                        }}
                      >
                        ✕
                      </span>
                      <span style={{ color: 'var(--tn-text-2)', fontSize: '14px' }}>{vendor}</span>
                    </div>
                  ))}
                  <p
                    style={{
                      marginTop: '20px',
                      fontFamily: 'var(--tn-font-mono)',
                      fontSize: '12px',
                      color: '#EF4444',
                    }}
                  >
                    7 vendors. 7 contracts. 7 conversations when something breaks.
                  </p>
                </div>
                <div
                  style={{
                    marginTop: '16px',
                    background: 'var(--tn-bg-3)',
                    border: '1px solid var(--tn-border-accent)',
                    borderRadius: '12px',
                    padding: '36px',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--tn-font-mono)',
                      fontSize: '10px',
                      fontWeight: 500,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: 'var(--tn-text-3)',
                      marginBottom: '24px',
                    }}
                  >
                    With Techaneyat
                  </p>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px 0',
                    }}
                  >
                    <span
                      style={{
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        background: 'var(--tn-accent-dim)',
                        border: '1px solid var(--tn-border-accent)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '9px',
                        color: 'var(--tn-accent)',
                        flexShrink: 0,
                      }}
                    >
                      ✓
                    </span>
                    <span style={{ color: 'var(--tn-text)', fontSize: '14px', fontWeight: 500 }}>
                      Techaneyat — one contract, all services
                    </span>
                  </div>
                  <p
                    style={{
                      marginTop: '20px',
                      fontFamily: 'var(--tn-font-mono)',
                      fontSize: '12px',
                      color: 'var(--tn-accent)',
                    }}
                  >
                    1 vendor. 1 contract. 1 call when something needs attention.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How we work */}
        <section style={{ background: 'var(--tn-bg)', padding: '80px 0' }}>
          <div className="section-container">
            <p className="eyebrow" style={{ marginBottom: '16px' }}>How We Work</p>
            <h2 style={{ marginBottom: '48px' }}>Four commitments. Every engagement.</h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '24px',
              }}
            >
              {commitments.map((c) => (
                <div key={c.label} className="glow-card" style={{ padding: '32px' }}>
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
                    {c.label}
                  </p>
                  <h3 style={{ marginBottom: '16px', fontSize: '18px' }}>{c.heading}</h3>
                  <p style={{ color: 'var(--tn-text-2)', fontSize: '14px', lineHeight: 1.75 }}>{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technology partners */}
        <section
          style={{
            background: 'var(--tn-bg-2)',
            borderTop: '1px solid var(--tn-border)',
            padding: '64px 0',
          }}
        >
          <div className="section-container">
            <p
              style={{
                fontFamily: 'var(--tn-font-mono)',
                fontSize: '10px',
                fontWeight: 500,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--tn-text-3)',
                marginBottom: '32px',
              }}
            >
              Technology partners and platforms
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {vendors.map((v) => (
                <div
                  key={v.name}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    padding: '12px 18px',
                    background: 'var(--tn-bg-3)',
                    border: '1px solid var(--tn-border)',
                    borderRadius: '6px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--tn-font-display)',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: 'var(--tn-text)',
                    }}
                  >
                    {v.name}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--tn-font-mono)',
                      fontSize: '10px',
                      color: 'var(--tn-text-3)',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {v.category}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section style={{ background: 'var(--tn-bg)', padding: '80px 0' }}>
          <div className="section-container">
            <p className="eyebrow" style={{ marginBottom: '16px' }}>Our Team</p>
            <h2 style={{ marginBottom: '16px' }}>Engineers, not account managers.</h2>
            <p style={{ color: 'var(--tn-text-2)', fontSize: '16px', maxWidth: '560px', marginBottom: '48px', lineHeight: 1.8 }}>
              Every client engagement is led by an engineer who understands the full stack — from structured cabling to cloud configuration. You talk to the person who built your system, not a relay.
            </p>
            <p style={{ color: 'var(--tn-text-3)', fontFamily: 'var(--tn-font-mono)', fontSize: '12px' }}>
              Team profiles coming soon.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section
          style={{
            background: 'var(--tn-bg-2)',
            padding: '80px 0',
            textAlign: 'center',
            borderTop: '1px solid var(--tn-border)',
          }}
        >
          <div className="section-container">
            <p className="eyebrow" style={{ justifyContent: 'center', marginBottom: '24px' }}>
              Work With Us
            </p>
            <h2 style={{ marginBottom: '16px' }}>Ready to consolidate your infrastructure?</h2>
            <p style={{ color: 'var(--tn-text-2)', marginBottom: '36px', maxWidth: '440px', margin: '0 auto 36px' }}>
              Tell us what you are running and what needs to change. We will respond within 4 hours.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <a href="/contact" className="btn-primary">Talk to an Engineer</a>
              <a href="/services" className="btn-ghost">See Our Services</a>
            </div>
          </div>
        </section>

      </main>
      <Footer locale="en" />
    </>
  )
}
