import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Nav } from '@/app/components/Nav'
import { Footer } from '@/app/components/Footer'
import { JsonLd } from '@/app/components/JsonLd'
import { services, getServiceBySlug } from '@/data/services'

type Props = {
  params: Promise<{ slug: string }>
}

type IncludedItem = { label: string; description: string }
type Step = { title: string; body: string }
type UseCase = { sector: string; detail: string }
type Problem = { title: string; body: string }
type RelatedService = { slug: string; name: string; short: string }

type ServiceContent = {
  name: string
  eyebrow: string
  headline: string
  description: string
  context: string
  keyMetric: { value: string; label: string }
  included: IncludedItem[]
  steps: Step[]
  technologies: string[]
  useCases: UseCase[]
  problems: Problem[]
  relatedServices: RelatedService[]
}

const serviceContent: Record<string, ServiceContent> = {
  network: {
    name: 'Network & Infrastructure',
    eyebrow: 'Network & Infrastructure',
    headline: 'The backbone everything runs on.',
    description:
      'A properly designed network is invisible — it just works. Structured cabling, managed switching, enterprise WiFi, and dual-ISP failover built to stay up when your team needs it most.',
    context:
      'Most networks in Lebanon were laid by whoever was cheapest at the time. No documentation. No redundancy. A single failed switch brings down a floor. A power cut from EDL kills the router and nobody knows the failover password. We have inherited hundreds of these environments. We know exactly what breaks and why — and we build yours so it does not.',
    keyMetric: { value: '99.9%', label: 'Network uptime across managed clients' },
    included: [
      {
        label: 'Structured cabling (Cat6A / fiber)',
        description:
          'Every cable run planned, labeled, and documented. Cat6A for high-density areas, single-mode fiber for inter-floor and inter-building links. Full as-built drawings handed over at completion.',
      },
      {
        label: 'Managed switches and routers',
        description:
          'Layer 2/3 switching with VLAN segmentation, QoS, and central management. We spec Cisco, Ubiquiti, or MikroTik depending on your scale and budget — no single vendor lock-in.',
      },
      {
        label: 'Enterprise WiFi with seamless roaming',
        description:
          'Access points placed for coverage, not convenience. Client density calculated per floor. Seamless roaming between APs so a VoIP call does not drop when you walk across the office.',
      },
      {
        label: 'Dual-ISP failover and SD-WAN',
        description:
          'Two ISP connections active simultaneously. If one drops, traffic shifts automatically in under a second. Your users notice nothing. Your critical applications stay connected.',
      },
      {
        label: '24/7 network monitoring and alerting',
        description:
          'Every device on your network is monitored. We know when a switch port goes down before your team does. Alerts, logs, and monthly performance reports included.',
      },
      {
        label: 'Full documentation and as-built drawings',
        description:
          'Cable schedules, rack diagrams, IP address plans, VLAN maps. Everything we build is documented. You own the documentation — not us.',
      },
    ],
    steps: [
      {
        title: 'Site survey and current-state audit',
        body: 'We walk every floor, test every port, and map every cable run. We document what exists, identify failure points, and measure coverage gaps before a single cable is touched.',
      },
      {
        title: 'Design, specification, and approval',
        body: 'We produce a full network design — cable routes, equipment list, VLAN topology, IP scheme. You approve the design and the budget before any procurement begins. No surprises.',
      },
      {
        title: 'Installation, testing, and handover',
        body: 'Structured installation with zero-tolerance testing on every run. We certify cables, configure every device, and run the network under load before handover. Your team gets trained. The documentation is yours.',
      },
    ],
    technologies: [
      'Cisco', 'Ubiquiti', 'MikroTik', 'Fortinet', 'Aruba',
      'Palo Alto Networks', 'Fluke Networks', 'Panduit',
    ],
    useCases: [
      {
        sector: 'Corporate offices',
        detail:
          'Multi-floor offices with 50 to 500+ users. VLAN separation between departments, guest WiFi isolated from internal traffic, meeting rooms with reliable AV connectivity.',
      },
      {
        sector: 'Schools and universities',
        detail:
          'High-density WiFi for lecture halls and labs. Separate student and faculty networks. Bandwidth policies to prevent abuse. Fiber links between buildings.',
      },
      {
        sector: 'Hospitals and clinics',
        detail:
          'Network segmentation between clinical, administrative, and guest zones. PoE for IP phones and medical devices. Redundant uplinks on critical wards.',
      },
      {
        sector: 'Warehouses and factories',
        detail:
          'Industrial-grade WiFi for barcode scanners and mobile devices. Coverage in RF-challenging environments with metal shelving and high ceilings.',
      },
    ],
    problems: [
      {
        title: 'WiFi drops in half the office',
        body: 'Consumer access points were placed without a site survey. Coverage is patchy and APs are overloaded. We redesign the AP placement and replace undersized hardware.',
      },
      {
        title: 'No failover when the primary ISP goes down',
        body: 'A single ISP connection with no fallback. Every outage halts operations. We implement dual-ISP failover so a provider outage becomes invisible.',
      },
      {
        title: 'No network documentation from the previous contractor',
        body: 'Nobody knows what VLAN is on which port or where a cable run terminates. We audit, map, and document your entire current state before touching anything.',
      },
      {
        title: 'Network bottlenecks during peak hours',
        body: 'Unmanaged switches, no QoS, and no traffic prioritization. Video calls degrade when everyone is in. We redesign the switching layer and implement QoS policies.',
      },
    ],
    relatedServices: [
      { slug: 'cybersecurity', name: 'Cybersecurity', short: 'Protect what runs on your network.' },
      { slug: 'power', name: 'Energy & Power Continuity', short: 'Keep the network running through power cuts.' },
    ],
  },

  cybersecurity: {
    name: 'Cybersecurity',
    eyebrow: 'Cybersecurity',
    headline: 'Protection before the breach. Not after.',
    description:
      'Firewalls, endpoint detection and response, threat monitoring, and staff training. We build a layered security posture that stops threats before they become incidents — and responds fast when they try.',
    context:
      'Lebanon-based organizations are targeted. Financial institutions, NGOs, hospitals, and government bodies have all faced ransomware, data exfiltration, and business email compromise in recent years. The pattern is always the same: no EDR, no monitoring, default firewall rules, and staff who clicked a link. We have seen the aftermath. We deploy the controls that would have prevented it.',
    keyMetric: { value: '< 1hr', label: 'Mean time to threat detection on monitored endpoints' },
    included: [
      {
        label: 'Next-generation firewall deployment',
        description:
          'Fortinet FortiGate or Cisco ASA with deep packet inspection, application control, and IPS enabled. Not just a packet filter — a policy-enforced perimeter with full traffic visibility.',
      },
      {
        label: 'Endpoint detection and response (EDR)',
        description:
          'Agent deployed on every workstation and server. Behavioral detection that catches threats traditional antivirus misses. Automated containment on confirmed threats.',
      },
      {
        label: '24/7 threat monitoring and alerting',
        description:
          'Your environment monitored continuously. Suspicious activity generates alerts with context — not just log noise. Critical alerts escalated to your team immediately.',
      },
      {
        label: 'Phishing simulation and staff training',
        description:
          'Your staff is your largest attack surface. We run simulated phishing campaigns to measure risk, then deliver targeted training. Most breaches start with a click.',
      },
      {
        label: 'Incident response planning',
        description:
          'A documented IR plan before you need it. Roles, communication trees, containment procedures, and recovery steps. We run a tabletop exercise with your team to validate the plan.',
      },
      {
        label: 'Security policy documentation',
        description:
          'Acceptable use policy, password policy, remote access policy, and data classification. Documented, approved, and distributed. Required for most compliance frameworks.',
      },
    ],
    steps: [
      {
        title: 'Security assessment and gap analysis',
        body: 'We audit your current posture: open ports, unpatched systems, weak credentials, missing MFA, shadow IT, and user behavior. You get a prioritized risk register before we recommend a single product.',
      },
      {
        title: 'Layered protection deployment',
        body: 'Firewall, EDR, and monitoring deployed in sequence with zero downtime. We configure policy, tune detection rules to reduce false positives, and validate coverage across every endpoint.',
      },
      {
        title: 'Ongoing monitoring and quarterly review',
        body: 'Continuous threat monitoring with monthly reports. Quarterly security reviews to assess new risks, review incidents, update policies, and verify your posture as your environment changes.',
      },
    ],
    technologies: [
      'Fortinet FortiGate', 'Cisco ASA', 'CrowdStrike Falcon',
      'Microsoft Defender for Endpoint', 'Cisco Umbrella',
      'Palo Alto Networks', 'KnowBe4', 'Splunk',
    ],
    useCases: [
      {
        sector: 'Financial institutions',
        detail:
          'Banks, exchange houses, and financial advisors under Banque du Liban regulatory requirements. Data protection, access controls, and audit trails for compliance.',
      },
      {
        sector: 'Healthcare providers',
        detail:
          'Hospitals and clinics with patient data obligations. Endpoint protection on medical workstations, network segmentation between clinical and admin zones, and data loss prevention.',
      },
      {
        sector: 'NGOs and international organizations',
        detail:
          'Organizations with sensitive beneficiary data and donor reporting requirements. Protecting communications, file storage, and remote access for distributed teams.',
      },
      {
        sector: 'Government and public sector',
        detail:
          'Ministries and public institutions with citizen data. Perimeter hardening, identity access management, and security awareness programs for large staff populations.',
      },
    ],
    problems: [
      {
        title: 'No visibility into what is happening on the network',
        body: 'No monitoring, no logs, no alerts. Attackers can sit inside your environment for weeks undetected. We deploy monitoring that gives you full visibility from day one.',
      },
      {
        title: 'Staff are regularly targeted by phishing',
        body: 'Email is the primary attack vector. Without simulated training and MFA, one click costs you. We reduce click rates by 70%+ with targeted simulation campaigns.',
      },
      {
        title: 'Unknown devices connecting to the network',
        body: 'No network access control means anyone who plugs in is inside. We implement NAC policies that authenticate devices before granting access.',
      },
      {
        title: 'Ransomware risk with no recovery plan',
        body: 'Backups exist but were never tested. No IR plan, no tested recovery procedure. We implement immutable backups and a validated recovery process before you need it.',
      },
    ],
    relatedServices: [
      { slug: 'network', name: 'Network & Infrastructure', short: 'Secure what the network is built on.' },
      { slug: 'cloud', name: 'Cloud & Managed Services', short: 'Managed security for your cloud workloads.' },
    ],
  },

  'smart-security': {
    name: 'Smart Security Systems',
    eyebrow: 'Smart Security',
    headline: 'Know who enters. Know when. Know why.',
    description:
      'IP CCTV, access control, intrusion detection, and video analytics. A fully integrated physical security layer that gives you real-time visibility, a complete audit trail, and remote control from anywhere.',
    context:
      'Physical security in Lebanon requires more than cameras. It requires cameras that record in low light, access control that logs every entry, and a system that can be monitored remotely when on-site staff are absent. We integrate surveillance, access control, and alarms into a single platform — so you are not watching three separate systems on three separate screens.',
    keyMetric: { value: '100%', label: 'Perimeter coverage on every installation we design' },
    included: [
      {
        label: 'IP CCTV — HD and 4K cameras',
        description:
          'Hikvision and Dahua IP cameras selected per location: dome, bullet, PTZ, and fisheye. Proper IR coverage for night-time recording. No blind spots by design.',
      },
      {
        label: 'Access control with full audit trail',
        description:
          'Card readers, biometric scanners, or mobile credentials on every controlled door. Every entry and exit logged with timestamp and identity. Integrates with HR for instant revocation.',
      },
      {
        label: 'Video management system (VMS)',
        description:
          'Milestone or Genetec VMS centralizing all cameras into one interface. Motion alerts, scheduled recording, and video search by time, zone, or event. Accessible from any device.',
      },
      {
        label: 'Alarm and intrusion detection',
        description:
          'Motion sensors, door contacts, glass break detectors, and panic buttons. Alarm events tied to camera footage for instant context. Escalation to your nominated response team.',
      },
      {
        label: 'Remote monitoring and mobile app',
        description:
          'View live and recorded footage, arm and disarm alarms, and manage access permissions from your phone. Full control without being on site.',
      },
      {
        label: 'Video analytics',
        description:
          'License plate recognition, people counting, loitering detection, and perimeter zone alerts. Applied where relevant — not sold as a bundle you will never configure.',
      },
    ],
    steps: [
      {
        title: 'Site assessment and threat modelling',
        body: 'We walk your premises with your security team. We map entry points, identify blind spots, assess lighting conditions, and document your specific risks — then design around them.',
      },
      {
        title: 'System design and procurement',
        body: 'Camera positions, cable routes, NVR/server spec, access control topology, and alarm zones — all documented in a design package before procurement. No surprises on installation day.',
      },
      {
        title: 'Installation, integration, and training',
        body: 'Professional installation with no exposed cabling where visibility matters. All systems integrated into one platform. Your team trained on day-to-day operation and incident response.',
      },
    ],
    technologies: [
      'Hikvision', 'Dahua', 'Milestone VMS', 'Genetec',
      'HID Global', 'Suprema', 'Honeywell', 'Bosch Security',
    ],
    useCases: [
      {
        sector: 'Corporate offices',
        detail:
          'Lobby, server room, and executive floor access control. Full camera coverage of common areas, car parks, and loading docks. Visitor management integration.',
      },
      {
        sector: 'Schools and campuses',
        detail:
          'Perimeter cameras on all entry gates. Access control limiting zones by role — staff, students, visitors. Panic buttons in classrooms. Incident logging for administration.',
      },
      {
        sector: 'Retail and hospitality',
        detail:
          'Loss prevention cameras at POS and stockroom access points. People counting analytics for footfall reporting. Back-of-house access control for staff.',
      },
      {
        sector: 'Government and critical infrastructure',
        detail:
          'High-security access control with biometrics and multi-factor authentication. Redundant NVR storage. Tamper-evident camera housings. GDPR-compliant data handling.',
      },
    ],
    problems: [
      {
        title: 'Camera blind spots that were never addressed',
        body: 'The original installer placed cameras for convenience, not coverage. We redesign placements based on an actual threat model — not where the cable was easiest to run.',
      },
      {
        title: 'No audit trail for door access',
        body: 'Staff share keys or PIN codes with no logging. When something goes missing, there is no way to know who entered. Access control solves this the same day it is deployed.',
      },
      {
        title: 'Cannot check cameras remotely',
        body: 'Old DVR systems with no remote access, or systems on a separate network from the internet connection. We migrate or reconfigure so you have full remote visibility.',
      },
      {
        title: 'Alarm system with no camera integration',
        body: 'An alarm triggers but the operator cannot see what caused it. We integrate alarms and cameras so every event comes with footage, not just a notification.',
      },
    ],
    relatedServices: [
      { slug: 'network', name: 'Network & Infrastructure', short: 'IP cameras need a network built for them.' },
      { slug: 'cybersecurity', name: 'Cybersecurity', short: 'Secure the systems that watch your premises.' },
    ],
  },

  cloud: {
    name: 'Cloud & Managed Services',
    eyebrow: 'Cloud & Managed Services',
    headline: 'Infrastructure that never stops working.',
    description:
      'Microsoft 365, Google Workspace, cloud backup, and 24/7 remote monitoring — all managed under a single SLA. Proactive support, not reactive firefighting. Your systems looked after so your team can focus.',
    context:
      'Most Lebanese businesses run on a mix of on-premise servers, personal Dropbox accounts, and unlicensed software — with no backup strategy and no IT support until something breaks. When it does break, the scramble for a technician costs hours and sometimes days. We manage your environment proactively: patches applied, backups verified, issues caught before users report them.',
    keyMetric: { value: '< 4hr', label: 'Mean response time across all managed clients' },
    included: [
      {
        label: 'Microsoft 365 and Google Workspace',
        description:
          'Licensing, migration, and full configuration. User accounts, shared drives, email policies, MFA, and Conditional Access. Properly deployed — not just accounts created and left alone.',
      },
      {
        label: 'Cloud backup and disaster recovery',
        description:
          '3-2-1 backup architecture: three copies, two media types, one offsite. Daily backup verification. Recovery time objectives documented and tested — not assumed.',
      },
      {
        label: 'Remote monitoring and management (RMM)',
        description:
          'Every managed server and workstation monitored for performance, disk health, memory, and availability. We see problems before your staff does. Most issues resolved without a site visit.',
      },
      {
        label: 'Patch management',
        description:
          'OS and application patches tested and deployed on schedule. No more machines running Windows with three years of missed updates. Patch status reported monthly.',
      },
      {
        label: 'SLA-driven helpdesk support',
        description:
          'A dedicated support channel for your team. Issues logged, triaged, and resolved within SLA. Response time targets agreed upfront and tracked monthly.',
      },
      {
        label: 'Monthly health reports',
        description:
          'Every managed device, backup status, patch coverage, open tickets, and incident summary. One document that tells you exactly how your environment performed last month.',
      },
    ],
    steps: [
      {
        title: 'Environment audit',
        body: 'We inventory every device, application, user account, and backup configuration. We document what exists, what is at risk, and what needs to change before we take responsibility for it.',
      },
      {
        title: 'Migration and configuration',
        body: 'We move your data, deploy your cloud platform, configure backup, and onboard your team. Migrations run outside business hours. Zero lost data, zero productivity interruption.',
      },
      {
        title: 'Ongoing management and monthly reporting',
        body: 'Once live, we manage everything. Monthly reports land in your inbox. Quarterly reviews align your IT environment to your business direction. One number to call.',
      },
    ],
    technologies: [
      'Microsoft 365', 'Google Workspace', 'Microsoft Azure',
      'Acronis', 'Veeam', 'N-able', 'ConnectWise',
      'Cloudflare',
    ],
    useCases: [
      {
        sector: 'NGOs with remote teams',
        detail:
          'Distributed staff across Lebanon and internationally. Microsoft 365 with Teams, SharePoint, and OneDrive replacing fragmented file sharing. Compliance documentation for donor reporting.',
      },
      {
        sector: 'Professional services firms',
        detail:
          'Law firms, accounting firms, and consultancies with confidential client data. Secure cloud storage, MFA on all accounts, data retention policies, and helpdesk support for staff.',
      },
      {
        sector: 'Businesses scaling headcount',
        detail:
          'Fast-growing companies where IT keeps falling behind hiring. We provision new users in under an hour. Hardware sourced, configured, and delivered ready to use.',
      },
      {
        sector: 'Organizations replacing on-premise servers',
        detail:
          'Aging servers with no support contract, held together by one person who might leave. We migrate workloads to the cloud and eliminate the single point of failure.',
      },
    ],
    problems: [
      {
        title: 'Files on personal laptops and USB drives with no backup',
        body: 'Critical business data living in places no backup policy reaches. One stolen laptop or failed drive and it is gone. We centralize and protect it from day one.',
      },
      {
        title: 'Servers never patched, running vulnerabilities from years ago',
        body: 'Patching got deprioritized. The server still works so nobody touches it. We establish a patching cadence and close the exposure before it is exploited.',
      },
      {
        title: 'No IT support when something breaks',
        body: 'Waiting on a freelance technician who may or may not answer the phone. We provide an SLA-backed helpdesk with documented response times.',
      },
      {
        title: 'Backup exists but has never been tested',
        body: 'Backups running to an external drive in the server room. No verification, no offsite copy, no tested restore. We replace this with a verified, tested, 3-2-1 architecture.',
      },
    ],
    relatedServices: [
      { slug: 'cybersecurity', name: 'Cybersecurity', short: 'Secure your cloud environment from day one.' },
      { slug: 'hardware', name: 'Computing & Hardware', short: 'We source and configure the devices your team uses.' },
    ],
  },

  power: {
    name: 'Energy & Power Continuity',
    eyebrow: 'Energy & Power',
    headline: 'No power cut stops your business.',
    description:
      'UPS systems, battery backup, generator integration, and solar. In Lebanon, power is not guaranteed. Your business continuity must be. We design power systems that keep your critical infrastructure running through every EDL cut.',
    context:
      'Lebanon averages 3 to 12 hours of EDL power per day depending on the region. Every business runs on a generator, but most generators take 10 to 30 seconds to start — long enough to crash a server, corrupt a database, or kill a VoIP call. Most UPS installations are undersized, uncharged, or running on batteries that were never replaced. We have found UPS units with batteries from 2009 still nominally "protecting" a server room.',
    keyMetric: { value: '0sec', label: 'Downtime during power transition on properly sized UPS' },
    included: [
      {
        label: 'UPS systems — sized to critical load',
        description:
          'APC or Eaton UPS spec\'d to your actual load, not a round number. Runtime calculated for your generator start time plus a safety margin. Battery health monitoring included.',
      },
      {
        label: 'Battery expansion and replacement',
        description:
          'Extended battery modules to increase runtime where needed. Battery replacement programme to eliminate the most common point of failure in any UPS system.',
      },
      {
        label: 'Generator ATS integration',
        description:
          'Automatic Transfer Switch wiring so the generator starts and takes load without manual intervention. UPS bridges the gap. Your equipment never sees the transition.',
      },
      {
        label: 'Solar PV and battery storage',
        description:
          'Rooftop or ground-mount solar with lithium battery storage. Reduces generator runtime, cuts fuel cost, and extends backup duration. Fully integrated with existing UPS and generator.',
      },
      {
        label: 'Power monitoring dashboard',
        description:
          'Real-time visibility of UPS load, battery health, generator runtime, and power consumption. Alerts before batteries fail. Monthly reports on power events and runtime.',
      },
      {
        label: 'Load calculation and power audit',
        description:
          'We measure your actual load before specifying anything. Overspecification wastes money. Underspecification causes exactly the problem you are trying to prevent.',
      },
    ],
    steps: [
      {
        title: 'Power audit and load measurement',
        body: 'We instrument your critical systems and measure actual power draw. We document your generator start time, test existing UPS runtime, and identify every single point of failure in your current power architecture.',
      },
      {
        title: 'System design and specification',
        body: 'UPS, batteries, ATS, and solar components specified to your exact load profile. Runtime targets agreed in advance. Equipment selected from brands with local warranty support.',
      },
      {
        title: 'Installation, commissioning, and failover testing',
        body: 'Professional installation with zero downtime on your critical systems. Full failover testing: we cut the mains and verify every component performs as designed. Runtime test run to full depletion.',
      },
    ],
    technologies: [
      'APC by Schneider Electric', 'Eaton', 'SMA Solar Technology',
      'Victron Energy', 'Pylontech', 'Huawei Solar',
      'ComAp', 'ABB',
    ],
    useCases: [
      {
        sector: 'Data centers and server rooms',
        detail:
          'Rack-mount UPS on every critical circuit. Extended battery modules for 30+ minute runtime. Redundant UPS in N+1 configuration for the most critical loads.',
      },
      {
        sector: 'Hospitals and clinics',
        detail:
          'Medical equipment, servers, and lighting on clean, conditioned power. Zero-transition UPS on life-critical circuits. Generator tied to ATS for unattended operation.',
      },
      {
        sector: 'Offices with remote or after-hours operations',
        detail:
          'Teams working late need systems available when EDL is off. UPS on network infrastructure and workstations. Solar reduces generator dependency and fuel cost during peak hours.',
      },
      {
        sector: 'Banks and financial offices',
        detail:
          'Transaction systems that cannot go down mid-operation. Continuous power on ATMs, core banking servers, and network infrastructure. Redundant UPS with monitored battery health.',
      },
    ],
    problems: [
      {
        title: 'Server crashes every time the power switches',
        body: 'The generator takes too long to start, or the UPS is undersized for the load. We specify and install the correct UPS with enough runtime to bridge the transition cleanly.',
      },
      {
        title: 'UPS batteries have never been replaced',
        body: 'Batteries degrade over 3 to 5 years. A UPS with dead batteries provides zero protection. We audit battery health and run a replacement programme before the next failure.',
      },
      {
        title: 'Generator runs all day at high fuel cost',
        body: 'Without solar, the generator carries the full load during EDL outages. We design solar and battery systems that shoulder the daytime load and reduce generator hours significantly.',
      },
      {
        title: 'No visibility into UPS load or battery status',
        body: 'If the UPS fails silently, you find out when the server goes down. We deploy power monitoring that alerts you before a battery event becomes an outage.',
      },
    ],
    relatedServices: [
      { slug: 'network', name: 'Network & Infrastructure', short: 'Keep your network online through every outage.' },
      { slug: 'cloud', name: 'Cloud & Managed Services', short: 'Monitor your power systems remotely.' },
    ],
  },

  hardware: {
    name: 'Computing & Hardware',
    eyebrow: 'Computing & Hardware',
    headline: 'The right hardware, properly deployed.',
    description:
      'Laptops, servers, NAS, and workstations sourced from authorized distributors, configured to a standard build, and deployed by us. No grey imports. No configuration left to chance. Warranty that actually works.',
    context:
      'Hardware sourcing in Lebanon is fragmented — grey imports with no warranty, consumer devices in business environments, and servers assembled without proper configuration. Most businesses have no standard hardware policy: staff use personal laptops, the "server" is a tower PC in a cupboard, and nobody knows what is installed on any machine. We change that with proper procurement, a standard build process, and real warranty coverage.',
    keyMetric: { value: '< 48hr', label: 'Hardware deployment turnaround from order to operational' },
    included: [
      {
        label: 'Laptops, desktops, and workstations',
        description:
          'Dell, HP, and Lenovo business-grade devices from authorized distributors. Proper warranty terms, no grey imports. Spec\'d to the role — not the cheapest option that passes.',
      },
      {
        label: 'Servers and NAS storage',
        description:
          'HPE ProLiant and Dell PowerEdge rack servers. Synology and QNAP NAS for file serving and backup. Correctly spec\'d, rack-mounted, and cabled — not sitting on the floor.',
      },
      {
        label: 'Standard OS image and configuration',
        description:
          'Every device pre-loaded with your standard image before it leaves our hands. Domain joined, policies applied, software installed. Unbox, plug in, work.',
      },
      {
        label: 'Printers, peripherals, and accessories',
        description:
          'Brother and HP business printers, UPS for workstations, monitors, docking stations, and IP phones. Everything your team needs to function from day one.',
      },
      {
        label: 'Deployment and user onboarding',
        description:
          'We deliver configured hardware to your site and complete the deployment. User profiles created, email configured, peripherals connected. Your team is productive from the first minute.',
      },
      {
        label: 'Warranty management',
        description:
          'We manage warranty claims with manufacturers on your behalf. If a device fails under warranty, we handle the replacement process — you do not have to chase anyone.',
      },
    ],
    steps: [
      {
        title: 'Requirements and specification',
        body: 'We interview department heads and review existing hardware inventory. We spec devices to the actual workload — design teams get GPU-capable machines, finance teams get reliable business laptops, not the same device for everyone.',
      },
      {
        title: 'Procurement and configuration',
        body: 'We source from authorized distributors, configure every device to your standard build, and test before deployment. Assets are tagged and entered into your inventory register.',
      },
      {
        title: 'Deployment and ongoing management',
        body: 'Scheduled deployment with zero productivity loss. Devices handed to users with email configured and applications installed. We manage the asset lifecycle, warranty renewals, and refresh cycles going forward.',
      },
    ],
    technologies: [
      'Dell', 'HP', 'Lenovo', 'HPE ProLiant',
      'Synology', 'QNAP', 'Brother', 'Cisco IP Phones',
      'Microsoft SCCM / Intune',
    ],
    useCases: [
      {
        sector: 'New office setups',
        detail:
          'Full hardware procurement for a new office: workstations, server, printers, networking, and UPS. We coordinate delivery and deployment so the office is ready on day one.',
      },
      {
        sector: 'Hardware refresh cycles',
        detail:
          'Planned replacement of aging hardware before it fails. We audit the fleet, identify at-risk devices by age and fault history, and produce a phased replacement plan.',
      },
      {
        sector: 'Remote team equipment',
        detail:
          'Laptops preconfigured and shipped to remote employees. Standard image, VPN client, and company policies applied before the device leaves our hands.',
      },
      {
        sector: 'Schools and training centers',
        detail:
          'Lab workstations with consistent specification. Software images deployed centrally. Keyboards and peripherals specified for heavy use. Warranty managed per device.',
      },
    ],
    problems: [
      {
        title: 'Staff using personal laptops with no management',
        body: 'Company data on personal devices with no encryption, no backup, and no way to wipe remotely. We procure business devices enrolled in your MDM from day one.',
      },
      {
        title: 'No standard hardware build across the fleet',
        body: 'Every machine is different — different OS version, different software, different settings. Support takes twice as long. We create and enforce a standard image.',
      },
      {
        title: 'No file server, everything on local drives',
        body: 'Collaboration is impossible. Data is not backed up. Someone leaves, their files go with them. We deploy a NAS or cloud file platform and migrate data properly.',
      },
      {
        title: 'Grey market hardware with no real warranty',
        body: 'Devices sourced from unofficial distributors fail with no warranty recourse. We source exclusively from authorized channels with documented warranty terms.',
      },
    ],
    relatedServices: [
      { slug: 'cloud', name: 'Cloud & Managed Services', short: 'Manage every device we deploy for you.' },
      { slug: 'network', name: 'Network & Infrastructure', short: 'The network your hardware runs on.' },
    ],
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
            padding: '100px 0 72px',
          }}
        >
          <div className="section-container">
            <p className="eyebrow" style={{ marginBottom: '24px' }}>{content.eyebrow}</p>
            <h1 style={{ marginBottom: '24px', maxWidth: '680px' }}>{content.headline}</h1>
            <p style={{ color: 'var(--tn-text-2)', fontSize: '18px', maxWidth: '560px', lineHeight: 1.7, marginBottom: '40px' }}>
              {content.description}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <a href="/contact" className="btn-primary">Talk to an Engineer</a>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 20px',
                  background: 'var(--tn-accent-dim)',
                  border: '1px solid var(--tn-border-accent)',
                  borderRadius: '4px',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--tn-font-display)',
                    fontSize: '20px',
                    fontWeight: 700,
                    color: 'var(--tn-accent)',
                  }}
                >
                  {content.keyMetric.value}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--tn-font-mono)',
                    fontSize: '11px',
                    color: 'var(--tn-text-3)',
                    letterSpacing: '0.04em',
                    maxWidth: '140px',
                    lineHeight: 1.4,
                  }}
                >
                  {content.keyMetric.label}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Lebanon context */}
        <section
          style={{
            background: 'var(--tn-bg-2)',
            borderTop: '1px solid var(--tn-border)',
            borderBottom: '1px solid var(--tn-border)',
            padding: '64px 0',
          }}
        >
          <div className="section-container" style={{ maxWidth: '760px' }}>
            <p
              style={{
                fontFamily: 'var(--tn-font-mono)',
                fontSize: '10px',
                fontWeight: 500,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--tn-accent)',
                marginBottom: '20px',
              }}
            >
              The reality in Lebanon
            </p>
            <p style={{ color: 'var(--tn-text-2)', fontSize: '17px', lineHeight: 1.85 }}>
              {content.context}
            </p>
          </div>
        </section>

        {/* What's included */}
        <section style={{ background: 'var(--tn-bg)', padding: '80px 0' }}>
          <div className="section-container">
            <p className="eyebrow" style={{ marginBottom: '16px' }}>What&apos;s Included</p>
            <h2 style={{ marginBottom: '8px' }}>Everything covered under one SLA.</h2>
            <p style={{ color: 'var(--tn-text-2)', fontSize: '16px', marginBottom: '48px', maxWidth: '520px' }}>
              No line items excluded. No surprises when something needs attention.
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '20px',
              }}
            >
              {content.included.map((item) => (
                <div
                  key={item.label}
                  className="glow-card"
                  style={{ padding: '28px 28px 32px' }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      marginBottom: '12px',
                    }}
                  >
                    <span
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        background: 'var(--tn-accent-dim)',
                        border: '1px solid var(--tn-border-accent)',
                        color: 'var(--tn-accent)',
                        fontSize: '10px',
                        flexShrink: 0,
                      }}
                    >
                      ✓
                    </span>
                    <p
                      style={{
                        fontFamily: 'var(--tn-font-display)',
                        fontSize: '14px',
                        fontWeight: 600,
                        color: 'var(--tn-text)',
                      }}
                    >
                      {item.label}
                    </p>
                  </div>
                  <p style={{ color: 'var(--tn-text-2)', fontSize: '14px', lineHeight: 1.7 }}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section style={{ background: 'var(--tn-bg-2)', padding: '80px 0' }}>
          <div className="section-container">
            <p className="eyebrow" style={{ marginBottom: '16px' }}>How It Works</p>
            <h2 style={{ marginBottom: '48px' }}>From first call to full operation.</h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '24px',
              }}
            >
              {content.steps.map((step, i) => (
                <div key={step.title} className="glow-card" style={{ padding: '32px' }}>
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
                    STEP {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3 style={{ marginBottom: '16px' }}>{step.title}</h3>
                  <p style={{ color: 'var(--tn-text-2)', fontSize: '15px', lineHeight: 1.7 }}>
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technologies */}
        <section style={{ background: 'var(--tn-bg)', padding: '60px 0', borderTop: '1px solid var(--tn-border)' }}>
          <div className="section-container">
            <p
              style={{
                fontFamily: 'var(--tn-font-mono)',
                fontSize: '10px',
                fontWeight: 500,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--tn-text-3)',
                marginBottom: '28px',
              }}
            >
              Technologies and vendors we work with
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {content.technologies.map((tech) => (
                <span
                  key={tech}
                  style={{
                    padding: '7px 14px',
                    background: 'var(--tn-bg-3)',
                    border: '1px solid var(--tn-border)',
                    borderRadius: '4px',
                    fontFamily: 'var(--tn-font-mono)',
                    fontSize: '12px',
                    color: 'var(--tn-text-2)',
                    letterSpacing: '0.02em',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Who benefits */}
        <section style={{ background: 'var(--tn-bg-2)', padding: '80px 0' }}>
          <div className="section-container">
            <p className="eyebrow" style={{ marginBottom: '16px' }}>Who Benefits</p>
            <h2 style={{ marginBottom: '48px' }}>Built for every sector.</h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '20px',
              }}
            >
              {content.useCases.map((uc) => (
                <div
                  key={uc.sector}
                  className="glow-card"
                  style={{ padding: '28px' }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--tn-font-mono)',
                      fontSize: '10px',
                      fontWeight: 500,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: 'var(--tn-accent)',
                      marginBottom: '12px',
                    }}
                  >
                    {uc.sector}
                  </p>
                  <p style={{ color: 'var(--tn-text-2)', fontSize: '14px', lineHeight: 1.7 }}>
                    {uc.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Problems we solve */}
        <section style={{ background: 'var(--tn-bg)', padding: '80px 0' }}>
          <div className="section-container">
            <p className="eyebrow" style={{ marginBottom: '16px' }}>Common Problems We Solve</p>
            <h2 style={{ marginBottom: '8px' }}>Sound familiar?</h2>
            <p style={{ color: 'var(--tn-text-2)', fontSize: '16px', marginBottom: '48px', maxWidth: '480px' }}>
              These are the situations we walk into most often. If any of these describes your environment, let us fix it.
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '20px',
              }}
            >
              {content.problems.map((p) => (
                <div
                  key={p.title}
                  style={{
                    padding: '28px',
                    background: 'var(--tn-bg-3)',
                    border: '1px solid var(--tn-border)',
                    borderRadius: '8px',
                    borderLeft: '3px solid var(--tn-accent)',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--tn-font-display)',
                      fontSize: '15px',
                      fontWeight: 600,
                      color: 'var(--tn-text)',
                      marginBottom: '10px',
                    }}
                  >
                    {p.title}
                  </p>
                  <p style={{ color: 'var(--tn-text-2)', fontSize: '14px', lineHeight: 1.7 }}>
                    {p.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related services */}
        <section style={{ background: 'var(--tn-bg-2)', padding: '60px 0', borderTop: '1px solid var(--tn-border)' }}>
          <div className="section-container">
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
              Often paired with
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              {content.relatedServices.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/services/${rel.slug}`}
                  className="glow-card"
                  style={{
                    padding: '20px 24px',
                    textDecoration: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    flex: '1 1 260px',
                    maxWidth: '360px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--tn-font-display)',
                      fontSize: '15px',
                      fontWeight: 600,
                      color: 'var(--tn-text)',
                    }}
                  >
                    {rel.name}
                  </span>
                  <span style={{ color: 'var(--tn-text-2)', fontSize: '13px' }}>
                    {rel.short}
                  </span>
                  <span
                    style={{
                      color: 'var(--tn-accent)',
                      fontFamily: 'var(--tn-font-mono)',
                      fontSize: '11px',
                      marginTop: '8px',
                    }}
                  >
                    Learn more →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          style={{
            background: 'var(--tn-bg)',
            padding: '80px 0',
            textAlign: 'center',
            borderTop: '1px solid var(--tn-border)',
          }}
        >
          <div className="section-container">
            <p className="eyebrow" style={{ justifyContent: 'center', marginBottom: '24px' }}>
              Get Started
            </p>
            <h2 style={{ marginBottom: '16px', maxWidth: '560px', margin: '0 auto 16px' }}>
              Get a quote for {content.name}.
            </h2>
            <p style={{ color: 'var(--tn-text-2)', marginBottom: '36px', maxWidth: '440px', margin: '0 auto 36px' }}>
              Tell us your current setup and what needs to change. We respond within 4 hours with a direct technical conversation — no sales script.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <a href="/contact" className="btn-primary">Talk to an Engineer</a>
              <a href="tel:+96176100766" className="btn-ghost">+961 76 100 766</a>
            </div>
          </div>
        </section>

      </main>
      <Footer locale="en" />
    </>
  )
}
