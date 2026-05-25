import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Nav } from '@/app/components/Nav'
import { Footer } from '@/app/components/Footer'
import { JsonLd } from '@/app/components/JsonLd'
import { services, getServiceBySlug } from '@/data/services'

type Props = {
  params: Promise<{ slug: string }>
}

const serviceContent: Record<string, {
  name: string
  description: string
  keyBenefit: string
  included: string[]
  steps: { title: string; body: string }[]
  useCases: string[]
}> = {
  network: {
    name: 'Network & Infrastructure',
    description: 'Structured cabling, switches, routers, WiFi, and fiber. We build networks that do not slow you down or let you down.',
    keyBenefit: 'Zero single points of failure',
    included: ['Structured cabling (Cat6/Cat6A, fiber)', 'Managed switches and routers', 'Enterprise WiFi (Cisco, Ubiquiti)', 'Network monitoring and SLA support', 'Firewall integration'],
    steps: [
      { title: 'Site survey', body: 'We assess your premises, map cable runs, and identify coverage gaps.' },
      { title: 'Design and procurement', body: 'We spec the right hardware for your scale and budget. No over-engineering.' },
      { title: 'Installation and handover', body: 'Full installation, testing, and documentation. Your team gets trained.' },
    ],
    useCases: ['Office buildings', 'Schools and universities', 'Hospitals and clinics', 'Warehouses and factories'],
  },
  cybersecurity: {
    name: 'Cybersecurity',
    description: 'Firewalls, endpoint protection, EDR, and threat monitoring. We protect your data before the problem happens.',
    keyBenefit: 'Threat detection before impact',
    included: ['Next-gen firewall deployment', 'Endpoint detection and response (EDR)', 'Threat monitoring and alerting', 'Security awareness training', 'Incident response planning'],
    steps: [
      { title: 'Security assessment', body: 'We audit your current exposure: open ports, unpatched systems, weak credentials.' },
      { title: 'Layered protection', body: 'We deploy firewalls, endpoint agents, and monitoring tools in sequence.' },
      { title: 'Ongoing monitoring', body: 'Our team watches your environment. Threats are flagged before they become incidents.' },
    ],
    useCases: ['Financial institutions', 'Healthcare providers', 'Government agencies', 'Any organization with sensitive data'],
  },
  'smart-security': {
    name: 'Smart Security Systems',
    description: 'CCTV, access control, alarms, and facial recognition. Know who enters your premises and respond before it becomes an incident.',
    keyBenefit: 'Full perimeter coverage',
    included: ['IP CCTV systems (HD/4K)', 'Access control and card readers', 'Alarm and intrusion detection', 'Facial recognition (enterprise)', 'Remote viewing and alerts'],
    steps: [
      { title: 'Premises assessment', body: 'We map entry points, blind spots, and coverage requirements.' },
      { title: 'System design', body: 'Cameras, access control, and alarms designed for your layout.' },
      { title: 'Installation and integration', body: 'All systems connect to a single monitoring platform.' },
    ],
    useCases: ['Corporate offices', 'Schools and campuses', 'Retail stores', 'Government facilities'],
  },
  cloud: {
    name: 'Cloud & Managed Services',
    description: 'Microsoft 365, Google Workspace, cloud backup, and remote monitoring under SLA.',
    keyBenefit: 'Proactive, not reactive management',
    included: ['Microsoft 365 and Google Workspace deployment', 'Cloud backup and disaster recovery', 'Remote monitoring and management (RMM)', 'SLA-driven support', 'Patch management'],
    steps: [
      { title: 'Environment audit', body: 'We assess your current setup: on-premise, cloud, or hybrid.' },
      { title: 'Migration and configuration', body: 'We move your data and configure your cloud environment correctly.' },
      { title: 'Ongoing management', body: 'Monthly reports, proactive monitoring, and a team that picks up the phone.' },
    ],
    useCases: ['NGOs with remote teams', 'SMBs scaling fast', 'Organizations with compliance requirements'],
  },
  power: {
    name: 'Energy & Power Continuity',
    description: 'UPS systems, battery backup, and solar. In Lebanon, power is not guaranteed. Your business continuity should be.',
    keyBenefit: 'Business continuity guaranteed',
    included: ['UPS and battery backup systems', 'Generator integration', 'Solar power systems', 'Power monitoring', 'Load balancing'],
    steps: [
      { title: 'Power audit', body: 'We measure your load, identify critical systems, and calculate runtime requirements.' },
      { title: 'System design', body: 'UPS, batteries, and backup sources sized for your actual needs.' },
      { title: 'Installation and testing', body: 'Full installation with failover testing. Your team knows exactly what to expect.' },
    ],
    useCases: ['Data centers and server rooms', 'Hospitals and clinics', 'Banks and financial offices', 'Any business in Lebanon'],
  },
  hardware: {
    name: 'Computing & Hardware',
    description: 'Laptops, servers, NAS, and workstations. Sourced, configured, and deployed by us.',
    keyBenefit: 'Sourced, configured, deployed',
    included: ['Laptops and workstations', 'Servers and NAS storage', 'Printers and peripherals', 'Configuration and deployment', 'Warranty and support management'],
    steps: [
      { title: 'Requirements', body: 'We spec hardware to your workload. No over-buying, no under-spec.' },
      { title: 'Procurement', body: 'We source from trusted suppliers with warranty coverage.' },
      { title: 'Deployment', body: 'Pre-configured, tested, and delivered ready to use.' },
    ],
    useCases: ['New office setups', 'Hardware refresh cycles', 'Remote team equipment', 'Schools and training centers'],
  },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const content = serviceContent[slug]
  if (!content) return { title: 'Not Found' }

  return {
    title: `${content.name} | Techaneyat Lebanon`,
    description: content.description,
    alternates: {
      canonical: `https://techaneyat.com/services/${slug}`,
      languages: { ar: `https://techaneyat.com/ar/services/${slug}` },
    },
  }
}

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params
  const content = serviceContent[slug]
  if (!content) notFound()

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: content.name,
    description: content.description,
    url: `https://techaneyat.com/services/${slug}`,
    provider: { '@id': 'https://techaneyat.com/#organization' },
    areaServed: { '@type': 'Country', name: 'Lebanon' },
  }

  return (
    <>
      <JsonLd data={serviceSchema} />
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
            <p className="eyebrow" style={{ marginBottom: '24px' }}>Services</p>
            <h1 style={{ marginBottom: '16px', maxWidth: '640px' }}>{content.name}</h1>
            <p style={{ color: 'var(--tn-text-2)', fontSize: '18px', maxWidth: '520px', marginBottom: '40px' }}>
              {content.description}
            </p>
            <a href="/contact" className="btn-primary">Get a Quote</a>
          </div>
        </section>

        {/* What's included */}
        <section style={{ background: 'var(--tn-bg-2)', padding: '80px 0' }}>
          <div className="section-container">
            <p className="eyebrow" style={{ marginBottom: '16px' }}>What&apos;s Included</p>
            <h2 style={{ marginBottom: '40px' }}>Everything covered.</h2>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {content.included.map((item) => (
                <li
                  key={item}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    color: 'var(--tn-text-2)',
                    fontSize: '16px',
                  }}
                >
                  <span
                    style={{
                      color: 'var(--tn-accent)',
                      fontFamily: 'var(--tn-font-mono)',
                      fontSize: '12px',
                      marginTop: '4px',
                      flexShrink: 0,
                    }}
                  >
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* How it works */}
        <section style={{ background: 'var(--tn-bg)', padding: '80px 0' }}>
          <div className="section-container">
            <p className="eyebrow" style={{ marginBottom: '16px' }}>How It Works</p>
            <h2 style={{ marginBottom: '48px' }}>Three steps.</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
              {content.steps.map((step, i) => (
                <div key={step.title} className="glow-card" style={{ padding: '32px' }}>
                  <p
                    style={{
                      fontFamily: 'var(--tn-font-mono)',
                      fontSize: '10px',
                      fontWeight: 500,
                      letterSpacing: '0.18em',
                      color: 'var(--tn-accent)',
                      marginBottom: '12px',
                    }}
                  >
                    STEP {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3 style={{ marginBottom: '12px' }}>{step.title}</h3>
                  <p style={{ color: 'var(--tn-text-2)', fontSize: '15px' }}>{step.body}</p>
                </div>
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
            <h2 style={{ marginBottom: '16px' }}>Get a quote for this service.</h2>
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
