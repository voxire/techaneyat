export type CaseStudy = {
  id: string
  slug: string
  clientType: string
  sector: 'enterprise' | 'education' | 'healthcare' | 'government' | 'ngo' | 'retail'
  challengeHeadline: string
  resultMetric: string
  resultDetail: string
  servicesUsed: string[]
  featured: boolean
  // Full case study fields (optional: only filled when content is confirmed)
  challenge?: string
  solution?: string
  results?: string
  technologies?: string[]
  clientQuote?: string
}

// Placeholder data: replace with real client results from Ahmad
export const caseStudies: CaseStudy[] = [
  {
    id: 'hospital-network',
    slug: 'hospital-network-overhaul',
    clientType: 'Private Hospital',
    sector: 'healthcare',
    challengeHeadline: 'Network failure during critical operations',
    resultMetric: '99.9% uptime',
    resultDetail: 'Restored in 72 hours. Zero incidents in 18 months since.',
    servicesUsed: ['network', 'cybersecurity', 'power'],
    featured: true,
  },
  {
    id: 'university-wifi',
    slug: 'university-campus-wifi',
    clientType: 'Lebanese University',
    sector: 'education',
    challengeHeadline: '2,000 students on a network built for 200',
    resultMetric: '10x capacity',
    resultDetail: 'Deployed across 6 buildings in 3 weeks.',
    servicesUsed: ['network', 'smart-security'],
    featured: true,
  },
  {
    id: 'ngo-cloud',
    slug: 'ngo-cloud-migration',
    clientType: 'International NGO',
    sector: 'ngo',
    challengeHeadline: 'Field teams unable to access data during crises',
    resultMetric: '100% remote access',
    resultDetail: 'Migrated to Microsoft 365 and cloud backup in 2 weeks.',
    servicesUsed: ['cloud', 'cybersecurity'],
    featured: true,
  },
]

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug)
}

export function getFeaturedCaseStudies(): CaseStudy[] {
  return caseStudies.filter((cs) => cs.featured)
}
