import type { Metadata } from 'next'
import Link from 'next/link'
import { Nav } from '@/app/components/Nav'
import { Footer } from '@/app/components/Footer'
import { JsonLd } from '@/app/components/JsonLd'
import { services } from '@/data/services'

export const metadata: Metadata = {
  title: 'Infrastructure Services | Techaneyat Lebanon',
  description:
    'Network, cybersecurity, smart security, cloud, power continuity, and hardware: all under one SLA. Techaneyat, Beirut Lebanon.',
  alternates: {
    canonical: 'https://techaneyat.com/services',
    languages: { ar: 'https://techaneyat.com/ar/services' },
  },
}

const servicesSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Techaneyat Infrastructure Services',
  url: 'https://techaneyat.com/services',
  numberOfItems: 6,
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      item: {
        '@type': 'Service',
        name: 'Network & Infrastructure',
        description:
          'Structured cabling, switches, routers, WiFi, and fiber. We build networks that do not slow you down or let you down.',
        url: 'https://techaneyat.com/services/network',
        provider: { '@id': 'https://techaneyat.com/#organization' },
      },
    },
    {
      '@type': 'ListItem',
      position: 2,
      item: {
        '@type': 'Service',
        name: 'Cybersecurity',
        description:
          'Firewalls, endpoint protection, EDR, and threat monitoring. We protect your data before the problem happens.',
        url: 'https://techaneyat.com/services/cybersecurity',
        provider: { '@id': 'https://techaneyat.com/#organization' },
      },
    },
    {
      '@type': 'ListItem',
      position: 3,
      item: {
        '@type': 'Service',
        name: 'Smart Security Systems',
        description:
          'CCTV, access control, alarms, and facial recognition. Full perimeter visibility.',
        url: 'https://techaneyat.com/services/smart-security',
        provider: { '@id': 'https://techaneyat.com/#organization' },
      },
    },
    {
      '@type': 'ListItem',
      position: 4,
      item: {
        '@type': 'Service',
        name: 'Cloud & Managed Services',
        description:
          'Microsoft 365, Google Workspace, cloud backup, and remote monitoring under SLA.',
        url: 'https://techaneyat.com/services/cloud',
        provider: { '@id': 'https://techaneyat.com/#organization' },
      },
    },
    {
      '@type': 'ListItem',
      position: 5,
      item: {
        '@type': 'Service',
        name: 'Energy & Power Continuity',
        description:
          'UPS systems, battery backup, and solar. In Lebanon, power is not guaranteed. Your business continuity should be.',
        url: 'https://techaneyat.com/services/power',
        provider: { '@id': 'https://techaneyat.com/#organization' },
      },
    },
    {
      '@type': 'ListItem',
      position: 6,
      item: {
        '@type': 'Service',
        name: 'Computing & Hardware',
        description:
          'Laptops, servers, NAS, and workstations. Sourced, configured, and deployed by us.',
        url: 'https://techaneyat.com/services/hardware',
        provider: { '@id': 'https://techaneyat.com/#organization' },
      },
    },
  ],
}

type ServiceCard = {
  slug: string
  name: string
  tagline: string
  description: string
  keyPoints: string[]
  metric: { value: string; label: string }
}

const serviceCards: ServiceCard[] = [
  {
    slug: 'network',
    name: 'Network & Infrastructure',
    tagline: 'The backbone everything runs on.',
    description:
      'Structured cabling, managed switching, enterprise WiFi, and dual-ISP failover. We design and build networks that stay up, with full documentation handed over at completion.',
    keyPoints: ['Cat6A and fiber cabling', 'Enterprise WiFi with seamless roaming', 'Dual-ISP failover', '24/7 monitoring'],
    metric: { value: '99.9%', label: 'uptime' },
  },
  {
    slug: 'cybersecurity',
    name: 'Cybersecurity',
    tagline: 'Protection before the breach. Not after.',
    description:
      'Next-gen firewall, EDR on every endpoint, threat monitoring, and staff training. We build a layered security posture tuned for the threats Lebanese organizations actually face.',
    keyPoints: ['Fortinet / Cisco firewall', 'Endpoint detection and response', '24/7 threat monitoring', 'Phishing simulation training'],
    metric: { value: '< 1hr', label: 'threat detection' },
  },
  {
    slug: 'smart-security',
    name: 'Smart Security Systems',
    tagline: 'Know who enters. Know when. Know why.',
    description:
      'HD and 4K IP CCTV, access control with full audit trail, intrusion alarms, and video analytics: all integrated into one platform you can manage from your phone.',
    keyPoints: ['4K IP CCTV systems', 'Access control with audit log', 'Video management system', 'Remote monitoring app'],
    metric: { value: '100%', label: 'perimeter coverage' },
  },
  {
    slug: 'cloud',
    name: 'Cloud & Managed Services',
    tagline: 'Infrastructure that never stops working.',
    description:
      'Microsoft 365, Google Workspace, cloud backup, and remote monitoring under SLA. We manage your environment proactively so your team never has to think about IT.',
    keyPoints: ['Microsoft 365 / Google Workspace', '3-2-1 cloud backup', 'Remote monitoring and patching', 'SLA-backed helpdesk'],
    metric: { value: '< 4hr', label: 'response time' },
  },
  {
    slug: 'power',
    name: 'Energy & Power Continuity',
    tagline: 'No power cut stops your business.',
    description:
      'UPS systems sized to your actual load, battery expansion, generator ATS integration, and solar. Built for Lebanon: where reliable power is the exception, not the rule.',
    keyPoints: ['Load-calculated UPS', 'Generator ATS integration', 'Solar PV and battery storage', 'Power monitoring dashboard'],
    metric: { value: '0sec', label: 'downtime on transition' },
  },
  {
    slug: 'hardware',
    name: 'Computing & Hardware',
    tagline: 'The right hardware, properly deployed.',
    description:
      'Business laptops, rack servers, NAS, and workstations sourced from authorized distributors, configured to your standard image, and deployed by us. No grey imports. No surprises.',
    keyPoints: ['Authorized distributor sourcing', 'Standard OS image and configuration', 'Servers and NAS storage', 'Warranty management'],
    metric: { value: '< 48hr', label: 'deployment turnaround' },
  },
]

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={servicesSchema} />
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
            <p className="eyebrow" style={{ marginBottom: '24px' }}>What We Do</p>
            <h1 style={{ marginBottom: '20px', maxWidth: '640px' }}>
              Every Technology Problem. One Partner.
            </h1>
            <p style={{ color: 'var(--tn-text-2)', fontSize: '18px', maxWidth: '560px', lineHeight: 1.8 }}>
              From the cable in the wall to the cloud above it: we design, build, and manage the full technology backbone of your organization. Network, cybersecurity, physical security, cloud, power, and hardware. All under one SLA.
            </p>
          </div>
        </section>

        {/* One SLA callout */}
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
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '32px',
              }}
            >
              {[
                { value: '1', label: 'SLA for everything', detail: 'One contract, one point of accountability, regardless of which system needs attention.' },
                { value: '4hr', label: 'Response time', detail: 'Our committed response time across all managed clients. Not a target. An SLA.' },
                { value: '10+', label: 'Years in Lebanon', detail: 'Operating since 2015. We understand the local environment deeply.' },
                { value: '500+', label: 'Projects delivered', detail: 'Enterprise, government, healthcare, education, and NGOs across Lebanon.' },
              ].map((item) => (
                <div key={item.label}>
                  <p
                    style={{
                      fontFamily: 'var(--tn-font-display)',
                      fontSize: 'clamp(28px, 3.5vw, 42px)',
                      fontWeight: 700,
                      color: 'var(--tn-accent)',
                      lineHeight: 1,
                      marginBottom: '8px',
                    }}
                  >
                    {item.value}
                  </p>
                  <p style={{ color: 'var(--tn-text)', fontSize: '14px', fontWeight: 500, marginBottom: '6px' }}>
                    {item.label}
                  </p>
                  <p style={{ color: 'var(--tn-text-3)', fontSize: '13px', lineHeight: 1.5 }}>
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services grid */}
        <section style={{ background: 'var(--tn-bg)', padding: '80px 0' }}>
          <div className="section-container">
            <p className="eyebrow" style={{ marginBottom: '16px' }}>Six Services</p>
            <h2 style={{ marginBottom: '48px' }}>Complete infrastructure coverage.</h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                gap: '24px',
              }}
            >
              {serviceCards.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="glow-card"
                  style={{
                    padding: '32px',
                    textDecoration: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0',
                  }}
                >
                  {/* Metric badge */}
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '20px',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--tn-font-mono)',
                        fontSize: '13px',
                        fontWeight: 700,
                        color: 'var(--tn-accent)',
                      }}
                    >
                      {service.metric.value}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--tn-font-mono)',
                        fontSize: '10px',
                        color: 'var(--tn-text-3)',
                        letterSpacing: '0.08em',
                      }}
                    >
                      {service.metric.label}
                    </span>
                  </div>

                  <h3 style={{ color: 'var(--tn-text)', marginBottom: '8px' }}>{service.name}</h3>
                  <p
                    style={{
                      color: 'var(--tn-accent)',
                      fontSize: '13px',
                      fontFamily: 'var(--tn-font-mono)',
                      marginBottom: '16px',
                    }}
                  >
                    {service.tagline}
                  </p>
                  <p style={{ color: 'var(--tn-text-2)', fontSize: '14px', lineHeight: 1.7, marginBottom: '24px', flex: 1 }}>
                    {service.description}
                  </p>

                  {/* Key points */}
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '24px' }}>
                    {service.keyPoints.map((point) => (
                      <li
                        key={point}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontSize: '13px',
                          color: 'var(--tn-text-2)',
                        }}
                      >
                        <span style={{ color: 'var(--tn-accent)', fontSize: '10px' }}>▸</span>
                        {point}
                      </li>
                    ))}
                  </ul>

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
                    Full service details →
                  </span>
                </Link>
              ))}
            </div>
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
              One Partner for All of It
            </p>
            <h2 style={{ marginBottom: '16px' }}>Not sure where to start?</h2>
            <p style={{ color: 'var(--tn-text-2)', maxWidth: '480px', margin: '0 auto 36px', fontSize: '16px', lineHeight: 1.8 }}>
              Tell us what you are running and what is not working. We will do the assessment and come back with a prioritized plan. No commitment required.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn-primary">Talk to an Engineer</Link>
              <Link href="/about" className="btn-ghost">About Techaneyat</Link>
            </div>
          </div>
        </section>

      </main>
      <Footer locale="en" />
    </>
  )
}
