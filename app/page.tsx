import type { Metadata } from 'next'
import { Nav } from '@/app/components/Nav'
import { Footer } from '@/app/components/Footer'
import { JsonLd } from '@/app/components/JsonLd'
import { HeroTerminal } from '@/app/sections/HeroTerminal'
import { CableScrollStory } from '@/app/sections/CableScrollStory'
import { NetworkMap } from '@/app/sections/NetworkMap'
import { StatCounter } from '@/app/sections/StatCounter'
import { CaseStudiesGrid } from '@/app/sections/CaseStudiesGrid'
import { ContactCTA } from '@/app/sections/ContactCTA'

export const metadata: Metadata = {
  title: 'Techaneyat | Smart Infrastructure Partner, Lebanon',
  description:
    'Techaneyat designs, builds, and manages the full technology backbone of your organization under one SLA. Network, cybersecurity, cloud, power, and hardware. Based in Beirut, Lebanon.',
  alternates: {
    canonical: 'https://techaneyat.com/',
    languages: { ar: 'https://techaneyat.com/ar' },
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'LocalBusiness'],
  '@id': 'https://techaneyat.com/#organization',
  name: 'Techaneyat',
  alternateName: 'تكنيات',
  url: 'https://techaneyat.com',
  logo: 'https://techaneyat.com/brand/logo.svg',
  foundingDate: '2015',
  description:
    'Techaneyat designs, builds, and manages the full technology backbone of organizations under one SLA. Network, cybersecurity, smart security, cloud, power continuity, and hardware. Based in Beirut, Lebanon.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Beirut',
    addressCountry: 'LB',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+961-76-100-766',
      contactType: 'sales',
      email: 'Sales@techaneyat.com',
      availableLanguage: ['English', 'Arabic'],
    },
  ],
  sameAs: ['https://www.linkedin.com/company/techaneyat'],
  areaServed: {
    '@type': 'Country',
    name: 'Lebanon',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Infrastructure Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Network & Infrastructure' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Cybersecurity' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Smart Security Systems' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Cloud & Managed Services' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Energy & Power Continuity' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Computing & Hardware' } },
    ],
  },
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://techaneyat.com/#website',
  url: 'https://techaneyat.com',
  name: 'Techaneyat',
  publisher: { '@id': 'https://techaneyat.com/#organization' },
  inLanguage: ['en', 'ar'],
}

export default function HomePage() {
  return (
    <>
      <JsonLd data={[organizationSchema, websiteSchema]} />
      <Nav locale="en" />
      <main>
        <HeroTerminal />

        <CableScrollStory />

        <NetworkMap />

        <StatCounter />

        <CaseStudiesGrid />

        <ContactCTA />
      </main>
      <Footer locale="en" />
    </>
  )
}
