export type Service = {
  id: string
  slug: string
  nameKey: string
  descriptionKey: string
  shortDescKey: string
  icon: string
  illustrationType: 'server-rack' | 'firewall' | 'camera' | 'cloud' | 'ups' | 'desktop'
  keyBenefit: string
}

export const services: Service[] = [
  {
    id: 'network',
    slug: 'network',
    nameKey: 'services.network.name',
    descriptionKey: 'services.network.description',
    shortDescKey: 'services.network.short',
    icon: 'Network',
    illustrationType: 'server-rack',
    keyBenefit: 'Zero single points of failure',
  },
  {
    id: 'cybersecurity',
    slug: 'cybersecurity',
    nameKey: 'services.cybersecurity.name',
    descriptionKey: 'services.cybersecurity.description',
    shortDescKey: 'services.cybersecurity.short',
    icon: 'ShieldCheck',
    illustrationType: 'firewall',
    keyBenefit: 'Threat detection before impact',
  },
  {
    id: 'smart-security',
    slug: 'smart-security',
    nameKey: 'services.smartSecurity.name',
    descriptionKey: 'services.smartSecurity.description',
    shortDescKey: 'services.smartSecurity.short',
    icon: 'Camera',
    illustrationType: 'camera',
    keyBenefit: 'Full perimeter coverage',
  },
  {
    id: 'cloud',
    slug: 'cloud',
    nameKey: 'services.cloud.name',
    descriptionKey: 'services.cloud.description',
    shortDescKey: 'services.cloud.short',
    icon: 'Cloud',
    illustrationType: 'cloud',
    keyBenefit: 'Proactive, not reactive management',
  },
  {
    id: 'power',
    slug: 'power',
    nameKey: 'services.power.name',
    descriptionKey: 'services.power.description',
    shortDescKey: 'services.power.short',
    icon: 'Zap',
    illustrationType: 'ups',
    keyBenefit: 'Business continuity guaranteed',
  },
  {
    id: 'hardware',
    slug: 'hardware',
    nameKey: 'services.hardware.name',
    descriptionKey: 'services.hardware.description',
    shortDescKey: 'services.hardware.short',
    icon: 'Monitor',
    illustrationType: 'desktop',
    keyBenefit: 'Sourced, configured, deployed',
  },
]

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug)
}
