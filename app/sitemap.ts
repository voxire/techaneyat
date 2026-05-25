import type { MetadataRoute } from 'next'
import { services } from '@/data/services'
import { caseStudies } from '@/data/caseStudies'

const BASE = 'https://techaneyat.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '',
    '/services',
    '/about',
    '/case-studies',
    '/blog',
    '/contact',
  ]

  const staticEntries = staticRoutes.flatMap((route) => [
    {
      url: `${BASE}${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1 : 0.8,
      alternates: {
        languages: { ar: `${BASE}/ar${route}` },
      },
    },
  ])

  const serviceEntries = services.flatMap((s) => [
    {
      url: `${BASE}/services/${s.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      alternates: {
        languages: { ar: `${BASE}/ar/services/${s.slug}` },
      },
    },
  ])

  const caseStudyEntries = caseStudies.flatMap((cs) => [
    {
      url: `${BASE}/case-studies/${cs.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
      alternates: {
        languages: { ar: `${BASE}/ar/case-studies/${cs.slug}` },
      },
    },
  ])

  return [...staticEntries, ...serviceEntries, ...caseStudyEntries]
}
