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
  challenge: string
  solution: string
  results: string
  technologies: string[]
  stats: { value: string; label: string }[]
  clientQuote?: string
}

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
    stats: [
      { value: '72h', label: 'Full restoration' },
      { value: '99.9%', label: 'Uptime since' },
      { value: '18mo', label: 'Zero incidents' },
      { value: '3', label: 'ISP failover paths' },
    ],
    challenge: `A 180-bed private hospital in Beirut was operating its entire network on a single aging core switch — no redundancy, no segmentation, no monitoring. When that switch failed during a surgical scheduling window, clinical staff lost access to the HIS, radiology images could not load, and the ICU monitoring software dropped its server connection.

The outage lasted six hours before a local vendor replaced the switch with the same model. Three weeks later, a power surge killed the replacement. The hospital needed a permanent solution, not another patch.

They also had a secondary problem: the network was flat. Every department — clinical, administrative, billing, and the guest WiFi — sat on the same broadcast domain. A ransomware attack on one unpatched workstation in billing would have had direct access to clinical systems. The IT manager knew this. He had raised it three times. No one had acted.`,

    solution: `Techaneyat conducted a full site survey across all four floors and the basement server room. We documented every switch, every cable run, every IP address in use — most of which were undocumented.

The architecture we designed had three layers. At the core: two enterprise-grade managed switches in active-passive configuration, connected by a direct fiber link. At the distribution layer: a managed switch per floor, connected to the core by redundant uplinks. At the access layer: PoE switches for IP phones, nurse call stations, and access points.

Network segmentation divided the hospital into six VLANs: clinical systems, administrative, radiology (isolated — DICOM traffic is heavy), guest WiFi, building management, and server infrastructure. Firewall rules between VLANs permitted only specific, documented traffic flows.

For power continuity, we installed a centralized UPS covering the server room and all core network equipment, sized at 150% of peak load to give 45 minutes of runtime, enough for the diesel generator to start and stabilize. We also replaced the aging AVR on the generator.

On the cybersecurity side: next-generation firewall with IPS, EDR deployed on all clinical workstations, and MFA enforced on every remote access account.

The entire deployment ran over three weekends to avoid disrupting clinical operations. We coordinated with the IT manager and department heads to migrate each floor individually.`,

    results: `The network has been live for 18 months without a single unplanned outage. During that period, Lebanon experienced two major grid failures lasting more than 12 hours — on both occasions, the hospital's clinical systems continued operating without interruption.

The cybersecurity posture change is more significant than the uptime number. Within the first 60 days of EDR deployment, the system flagged and blocked four attempted infections — two from USB drives brought in by staff, two from phishing emails that bypassed the previous email filter. None reached clinical systems.

The IT manager now has a live dashboard showing every device, every interface, and every alert. For the first time, the hospital has visibility into its own infrastructure.`,

    technologies: [
      'Cisco Catalyst 9000 Series',
      'Fortinet FortiGate NGFW',
      'CrowdStrike Falcon EDR',
      'Eaton 93PM UPS',
      'Cisco Meraki Access Points',
      'Microsoft 365 with MFA',
    ],
    clientQuote: `We had been patching the same problems for years. Techaneyat came in, documented everything we didn't know we had, and built something we can actually rely on.`,
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
    stats: [
      { value: '10x', label: 'Network capacity' },
      { value: '3wk', label: 'Full deployment' },
      { value: '6', label: 'Buildings covered' },
      { value: '120+', label: 'Access points' },
    ],
    challenge: `A university with 2,000 enrolled students had wireless infrastructure designed for the 200 students it served when it opened in 2009. The original access points were consumer-grade units bolted to ceilings without a coverage plan. High-density lecture halls had one access point covering 200 seats. The library had no coverage on the upper floor.

The complaints were daily: dropped video calls during online lectures, inability to submit assignments through the university portal during peak hours, 30-second page loads in the library. Students began using mobile data instead of university WiFi — which meant the university's own lecture recording and LMS platforms were competing with 4G on student devices.

The university had attempted to fix it twice before: once by adding more consumer access points, which made the problem worse (channel interference), and once by upgrading the internet connection from 100Mbps to 500Mbps, which did nothing because the bottleneck was internal.

There was also a smart security requirement: the university needed camera coverage across all parking areas and main corridors, with footage retained for 30 days and accessible to security staff from a central station.`,

    solution: `We started with a wireless site survey using spectrum analysis tools to map existing interference, signal strength, and channel utilization. The results confirmed what the students already knew: overlapping channels, co-channel interference between adjacent access points, and zero quality-of-service configuration.

The replacement design placed enterprise-grade access points at calculated positions for each space type: high-density APs in lecture halls and the cafeteria, standard APs in corridors and offices, outdoor APs for courtyard coverage. Total: 124 access points across 6 buildings, all managed from a central wireless controller.

We configured separate SSIDs for students, staff, and IoT devices (smart projectors, printers), each on its own VLAN. QoS policies prioritized video conferencing and LMS traffic. A captive portal for guest access required authentication before internet use.

For the cabling infrastructure, we ran new Cat6A trunk cables between buildings and upgraded all distribution switches to PoE+ capable managed units. Every access point is powered and managed over the same cable.

The smart security installation covered 48 cameras: 32 outdoor units for parking and building perimeters, 16 indoor units for corridors and main entrances. All connected to an NVR with 30-day retention and accessible over the university's internal network via VPN for authorized staff.`,

    results: `Student WiFi complaints dropped to near zero within the first week of the new system going live. The IT helpdesk tracked a 94% reduction in network-related tickets in the following month.

During final exam period, which historically maxed out the old network, the new infrastructure handled the peak without degradation. 2,000 concurrent connections across campus — the controller showed average throughput per device at 18Mbps, against 0.3Mbps under the old system.

The smart security system has already contributed to two resolved incidents: one vehicle break-in where footage was used to identify the suspect, and one unauthorized entry where the real-time alert allowed security to respond within four minutes.`,

    technologies: [
      'Cisco Catalyst Center (DNA)',
      'Cisco Meraki MR57 Access Points',
      'Cisco 9300 PoE+ Switches',
      'Hikvision DS-2CD Series IP Cameras',
      'Milestone XProtect VMS',
      'Cambium cnMaestro Controller',
    ],
    clientQuote: `The difference is immediate. Students stay connected through three-hour lectures. The library works. The IT team is not spending every morning on WiFi complaints.`,
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
    stats: [
      { value: '2wk', label: 'Migration timeline' },
      { value: '100%', label: 'Remote accessibility' },
      { value: '0', label: 'Data loss events' },
      { value: '3', label: 'Countries covered' },
    ],
    challenge: `An international NGO operating across Lebanon, Syria, and Jordan had built its IT infrastructure around a single physical server in its Beirut office. All files, the donor database, field reports, and beneficiary records lived on that server. Access outside the office required a VPN that was configured years ago by a volunteer and had not been maintained since.

When the Beirut office became inaccessible for three weeks due to local security conditions, field teams in the Bekaa and in Jordan lost access to everything. Staff were rebuilding spreadsheets from memory. Donor reports were delayed. A funding disbursement was held up because the finance team could not access the contracts.

The server itself was a 6-year-old tower PC running an unlicensed version of Windows Server 2012. Backups ran to an external hard drive in the same room as the server. There was no off-site copy of anything.

The NGO's leadership understood the risk in theory. The three-week blackout made it a board-level priority.`,

    solution: `The migration had three phases, designed to minimize disruption during active operations.

Phase 1 was data inventory and preparation. We catalogued every file share on the server — 340GB of data across 6 departments. We cleaned up duplicate and obsolete files in coordination with each department head, reducing the actual migration target to 180GB. We identified the critical datasets: donor database, beneficiary records, finance files, and field reports.

Phase 2 was Microsoft 365 deployment. We provisioned the tenant, configured Exchange Online for email (migrating from a self-hosted mail server), set up SharePoint document libraries matching the existing folder structure, and configured OneDrive for individual staff. MFA was enforced on every account from day one. Conditional access policies restricted sign-ins from high-risk locations. Azure Backup was configured for the SharePoint environment.

Phase 3 was the migration itself. We ran a parallel period of 10 days where staff accessed files in both locations. We then cut over on a Friday evening and monitored the following week closely. Total downtime during cutover: zero.

We also replaced the failing VPN with Microsoft's Always-On VPN for the small number of resources that still required on-premises access, and documented the entire setup in a runbook so the NGO's in-house coordinator could manage routine tasks without external support.`,

    results: `Within 48 hours of cutover, staff in all three countries confirmed access to all files from any device. The field coordinator in Tripoli, who had been emailing documents to herself as a workaround, was able to access the live SharePoint library from her phone.

Fourteen months later, the NGO has experienced no data loss events and no access outages that affected operations. During a subsequent period when the Beirut office was closed for two weeks, field operations continued without disruption.

The NGO's finance team can now generate donor reports directly from SharePoint without requesting files from Beirut. The board approved a follow-on engagement to migrate the legacy donor database to Microsoft Dataverse.`,

    technologies: [
      'Microsoft 365 Business Premium',
      'Microsoft SharePoint Online',
      'Microsoft Exchange Online',
      'Azure Backup',
      'Microsoft Entra ID (MFA + Conditional Access)',
      'Microsoft Always-On VPN',
    ],
    clientQuote: `We lost three weeks of operational capacity because everything was on one server in one building. That will not happen again. The migration was faster and cleaner than we expected.`,
  },
]

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug)
}

export function getFeaturedCaseStudies(): CaseStudy[] {
  return caseStudies.filter((cs) => cs.featured)
}
