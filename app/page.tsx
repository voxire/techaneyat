import type { Metadata } from 'next'
import { Nav } from '@/app/components/Nav'
import { Footer } from '@/app/components/Footer'
import { HeroTerminal } from '@/app/sections/HeroTerminal'
import { CableScrollStory } from '@/app/sections/CableScrollStory'
import { NetworkMap } from '@/app/sections/NetworkMap'
import { StatCounter } from '@/app/sections/StatCounter'
import { CaseStudiesGrid } from '@/app/sections/CaseStudiesGrid'
import { ContactCTA } from '@/app/sections/ContactCTA'

export const metadata: Metadata = {
  title: 'Techaneyat | Smart Infrastructure Partner — Lebanon',
  description:
    'Techaneyat designs, builds, and manages the full technology backbone of your organization under one SLA. Network, cybersecurity, cloud, power, and hardware — Beirut, Lebanon.',
  alternates: {
    canonical: 'https://techaneyat.com/',
    languages: { ar: 'https://techaneyat.com/ar' },
  },
}

export default function HomePage() {
  return (
    <>
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
