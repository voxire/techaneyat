import type { Metadata } from 'next'
import Link from 'next/link'
import { Nav } from '@/app/components/Nav'
import { Footer } from '@/app/components/Footer'
import { services } from '@/data/services'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Network, cybersecurity, smart security, cloud, power continuity, and hardware — all under one SLA. Techaneyat, Beirut Lebanon.',
  alternates: {
    canonical: 'https://techaneyat.com/services',
    languages: { ar: 'https://techaneyat.com/ar/services' },
  },
}

const serviceNames: Record<string, string> = {
  network: 'Network & Infrastructure',
  cybersecurity: 'Cybersecurity',
  'smart-security': 'Smart Security Systems',
  cloud: 'Cloud & Managed Services',
  power: 'Energy & Power Continuity',
  hardware: 'Computing & Hardware',
}

const serviceDescs: Record<string, string> = {
  network: 'Structured cabling, switches, routers, WiFi, and fiber. We build networks that do not slow you down or let you down.',
  cybersecurity: 'Firewalls, endpoint protection, EDR, and threat monitoring. We protect your data before the problem happens.',
  'smart-security': 'CCTV, access control, alarms, and facial recognition. Full perimeter visibility.',
  cloud: 'Microsoft 365, Google Workspace, cloud backup, and remote monitoring under SLA.',
  power: 'UPS systems, battery backup, and solar. In Lebanon, power is not guaranteed — your business continuity should be.',
  hardware: 'Laptops, servers, NAS, and workstations. Sourced, configured, and deployed by us.',
}

export default function ServicesPage() {
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
            <p className="eyebrow" style={{ marginBottom: '24px' }}>What We Do</p>
            <h1 style={{ marginBottom: '16px', maxWidth: '600px' }}>
              Every Technology Problem. One Partner.
            </h1>
            <p style={{ color: 'var(--tn-text-2)', fontSize: '18px', maxWidth: '520px' }}>
              From the cable in the wall to the cloud above it — we design, build, and manage the full technology backbone of your organization.
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
              {services.map((service) => (
                <Link
                  key={service.id}
                  href={`/services/${service.slug}`}
                  className="glow-card"
                  style={{
                    padding: '32px',
                    textDecoration: 'none',
                    display: 'block',
                  }}
                >
                  <h3 style={{ color: 'var(--tn-text)', marginBottom: '12px' }}>
                    {serviceNames[service.slug]}
                  </h3>
                  <p style={{ color: 'var(--tn-text-2)', fontSize: '15px', lineHeight: 1.6, marginBottom: '20px' }}>
                    {serviceDescs[service.slug]}
                  </p>
                  <span
                    style={{
                      color: 'var(--tn-accent)',
                      fontSize: '13px',
                      fontFamily: 'var(--tn-font-mono)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    Learn more →
                  </span>
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
