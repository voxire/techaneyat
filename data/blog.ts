export type BlogPost = {
  slug: string
  title: string
  category: string
  date: string
  readTime: string
  excerpt: string
  body: string
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'dual-isp-failover-lebanon',
    title: 'Why Every Business in Lebanon Needs Dual-ISP Failover',
    category: 'Network Infrastructure',
    date: '2026-04-15',
    readTime: '6 min',
    excerpt:
      'A single ISP connection in Lebanon is a liability. Here is how dual-ISP failover works and what it takes to implement it correctly.',
    body: `
<p>Lebanon has two types of businesses: those that have experienced a total internet outage and those that will. A single ISP connection, whether through Ogero or one of the licensed private operators, is not a redundancy strategy. It is a single point of failure.</p>

<h2>What dual-ISP failover actually means</h2>
<p>Dual-ISP failover means your network maintains two active connections to different internet service providers. When one fails, traffic switches to the other automatically. Done correctly, the switchover happens in under 30 seconds. Done incorrectly, it requires someone to manually reconfigure routes while your team sits idle.</p>
<p>There are two ways to implement this:</p>
<ul>
  <li><strong>Active-passive:</strong> One ISP carries all traffic. The second sits idle and activates only when the primary drops. Simpler to configure, slightly slower failover.</li>
  <li><strong>Active-active with load balancing:</strong> Both ISPs carry traffic simultaneously. You get redundancy and better throughput. Requires a more capable firewall and careful routing policy.</li>
</ul>

<h2>Why Lebanon specifically makes this non-negotiable</h2>
<p>Most countries treat ISP outages as rare events. In Lebanon, they are scheduled. Ogero line quality degrades during peak hours in certain regions. Private ISPs experience their own congestion and infrastructure issues. Power cuts affect ISP nodes directly. If your office is on a single connection and that node goes down, you have no recourse.</p>
<p>The cost of four hours of downtime for a team of 20 people exceeds the annual cost of a second ISP connection. This is not a complex calculation.</p>

<h2>What a correct implementation requires</h2>
<p>You need three things: a firewall that supports dual-WAN with policy-based routing, two physically separate ISP connections, and correct configuration of failover detection.</p>
<p>The detection piece is where most deployments fail. If your firewall checks gateway availability by pinging the ISP's own router, it will miss outages where the router is up but upstream is unreachable. You need DNS or HTTP probes to external endpoints. We configure probes to multiple targets so a single failed probe does not trigger a false failover.</p>

<h2>What to watch for after deployment</h2>
<p>Asymmetric routing is the most common issue post-deployment. If your outbound traffic leaves on ISP A but the response comes back through ISP B, stateful firewall inspection drops the packet. Proper NAT and routing policy configuration prevents this. Test both paths independently before declaring the system live.</p>
<p>Also: make sure your DNS TTLs are low enough that clients can reach you during a failover if you are hosting anything internally. A TTL of 3600 means 60 minutes of potential disruption even after your network is back.</p>

<h2>The bottom line</h2>
<p>Dual-ISP failover is not a luxury feature. In Lebanon's infrastructure environment, it is the minimum viable connectivity standard for any business that cannot afford downtime. The hardware cost is marginal. The configuration complexity is manageable. The alternative is waiting for the next outage and counting the cost after.</p>
    `.trim(),
  },
  {
    slug: 'unmanaged-switches-hidden-cost',
    title: 'The Hidden Cost of Unmanaged Switches',
    category: 'Network Infrastructure',
    date: '2026-03-28',
    readTime: '5 min',
    excerpt:
      'Most Lebanese offices run on unmanaged switches bought from Hamra Street. It works until it does not. Here is what you are giving up.',
    body: `
<p>Walk into almost any Lebanese SME and you will find the same thing: a pile of unmanaged 8-port or 16-port switches daisy-chained together, bought from the nearest computer shop, plugged in and forgotten. The network works. Until it does not.</p>

<h2>What an unmanaged switch actually is</h2>
<p>An unmanaged switch connects devices on a network. That is all it does. It forwards packets, it does not think. There is no configuration interface, no visibility into what is happening, and no ability to control traffic. Plug it in and it runs.</p>
<p>A managed switch does the same thing plus: VLANs, QoS, port mirroring, SNMP monitoring, spanning tree protocol, link aggregation, and access control lists. These are not premium features. They are the tools that make a network controllable.</p>

<h2>What you lose without VLANs</h2>
<p>Without VLANs, every device on your network can talk to every other device. Your CEO's laptop is on the same broadcast domain as the CCTV cameras and the warehouse tablets. If one device is compromised, every other device is reachable. This is not a theoretical risk.</p>
<p>VLANs let you segment: staff devices on one network, guest WiFi on another, IoT and cameras on a third, servers on a fourth. Traffic between segments is controlled by firewall rules. A ransomware infection on one laptop does not automatically reach your file server.</p>

<h2>Broadcast storms and why they happen</h2>
<p>Unmanaged switches have no spanning tree protocol enforcement. If you accidentally create a loop in your cabling, or someone plugs in a second switch carelessly, you get a broadcast storm. Every device on the network starts broadcasting, the switches forward everything everywhere, and your network becomes unusable in seconds. Managed switches detect and block loops automatically.</p>

<h2>VoIP quality and QoS</h2>
<p>If you run VoIP phones or video calls over a network with unmanaged switches, you have no way to prioritize that traffic. A large file transfer by one user can degrade call quality for everyone. QoS on managed switches marks and prioritizes voice and video packets. The difference is audible.</p>

<h2>The real cost calculation</h2>
<p>A decent unmanaged 24-port switch costs around $40. A managed equivalent costs $200 to $400. The difference is $160 to $360 per switch.</p>
<p>A broadcast storm that takes your network down for half a day costs a 10-person office roughly $800 to $1,200 in lost productivity. One incident pays for the upgrade. And unlike the unmanaged switch, when something goes wrong with a managed switch, you can log in, look at port statistics, identify the problem, and fix it. With an unmanaged switch, you unplug cables until something works.</p>

<h2>When unmanaged switches are acceptable</h2>
<p>Small home offices. Single-purpose isolated networks with no security requirements. Temporary deployments. Anywhere that downtime costs nothing and security is not a concern. For a business with more than five people handling any sensitive data, unmanaged switches are the wrong tool.</p>
    `.trim(),
  },
  {
    slug: 'ups-vs-generator-lebanon',
    title: 'UPS vs. Generator: What Your Business Actually Needs',
    category: 'Power Continuity',
    date: '2026-03-10',
    readTime: '7 min',
    excerpt:
      'Lebanon averages 12 or more hours of power cuts per day in some regions. UPS and generators solve different problems. Most businesses need both, but not always in the way they think.',
    body: `
<p>Power continuity planning in Lebanon is not optional. The grid is not reliable and has not been for decades. The question is not whether you will experience a power cut, but how long it will last and whether your systems will survive it cleanly.</p>
<p>UPS and generators are the two main tools. They are not interchangeable. They solve different parts of the problem.</p>

<h2>What a UPS does</h2>
<p>A UPS, Uninterruptible Power Supply, sits between the grid and your equipment. When grid power cuts, the UPS switches to battery in milliseconds. That switchover time, typically 0 to 20 milliseconds depending on the topology, is what protects your servers and network equipment from the hard power loss that causes data corruption and hardware failure.</p>
<p>A UPS does not run your business through a long outage. A correctly sized UPS for a server rack might give you 15 to 45 minutes of runtime. That is enough time to gracefully shut down systems, or enough time for a generator to start and stabilize before taking the load.</p>

<h2>What a generator does</h2>
<p>A generator produces power from fuel. It can run for hours or days. It is your long-duration solution. The problem: generators take 10 to 30 seconds to start and stabilize. During that window, your equipment is on nothing. That is why you need both: the UPS bridges the gap between the grid dropping and the generator taking over.</p>

<h2>The gap nobody plans for</h2>
<p>Most businesses in Lebanon either have a UPS with no generator, a generator with no UPS, or both but not properly integrated. Without a UPS, the generator transition causes a hard power event every time. Without a generator, the UPS runs flat after 20 minutes and everything crashes anyway.</p>
<p>The correct architecture: grid power feeds through the UPS to your critical equipment. When the grid drops, the UPS takes the load immediately. The generator starts. When the generator stabilizes at the correct voltage and frequency, typically after 15 to 30 seconds, the transfer switch hands off the load from battery to generator. Your equipment never felt a thing.</p>

<h2>How to size a UPS correctly</h2>
<p>Most businesses undersize their UPS. They buy a 1kVA unit for a server that actually draws 800 watts. At 80% load, the UPS runs hot, degrades faster, and delivers less runtime than rated. Size at 60% of rated capacity for healthy runtime and battery longevity.</p>
<p>Add up the wattage of everything connected: servers, network switches, patch panels with PoE, NAS, access points. That total plus 40% headroom is your minimum UPS size. Do this calculation before you buy.</p>

<h2>Common mistakes</h2>
<ul>
  <li><strong>Generator without AVR:</strong> Generators produce dirty power with voltage fluctuations. Sensitive electronics, especially servers, need an Automatic Voltage Regulator. Without one, you are trading grid problems for generator problems.</li>
  <li><strong>UPS batteries past their service life:</strong> Lead-acid UPS batteries last 3 to 5 years. Most businesses discover their batteries are dead when they actually need the UPS. Test under load annually. Replace on schedule.</li>
  <li><strong>Protecting servers but not networking:</strong> A server on UPS is useless if the firewall and switches are on grid power. The whole network layer needs to be protected.</li>
  <li><strong>Undersized generator:</strong> A generator sized for your current load with no headroom will struggle when you add equipment. Size for growth.</li>
</ul>

<h2>The right approach</h2>
<p>Map your critical load. Size a UPS for at least 20 minutes of runtime covering all network and compute equipment. Install a generator with an automatic transfer switch and AVR. Test the full failover sequence before you need it. Document the configuration. Then verify the battery health every year.</p>
<p>Power continuity is not a product. It is a design. Buying a UPS and a generator without integrating them correctly gives you false confidence and the same risk of failure.</p>
    `.trim(),
  },
  {
    slug: 'cctv-buyer-guide-lebanon',
    title: 'What to Look for in a CCTV System That Actually Works',
    category: 'Smart Security',
    date: '2026-02-18',
    readTime: '5 min',
    excerpt:
      'Most CCTV systems installed in Lebanon are underspecified, misconfigured, or storing footage locally with no offsite backup. Here is what a real deployment looks like.',
    body: `
<p>CCTV is one of the most misunderstood categories in business IT. Most installations are driven by price, not specification. The result: cameras that produce unusable footage at night, storage that fills up in four days, remote access that has been broken since installation, and no one who knows the admin password.</p>

<h2>Resolution matters less than placement</h2>
<p>A 4K camera pointed at the wrong angle is worth less than a 1080p camera positioned correctly. Before specifying hardware, define what you need to capture: faces at an entrance, license plates at a gate, overview of a warehouse floor. Each use case has different focal length, field of view, and positioning requirements. A camera audit and site survey before procurement prevents buying the wrong hardware entirely.</p>
<p>That said: 1080p is the minimum acceptable resolution for any camera that needs to identify individuals. 4MP or 4K is appropriate for wide scenes where you will crop in post.</p>

<h2>Night vision and IR range</h2>
<p>Consumer-grade cameras advertise "night vision" with an IR range that does not match the space they are covering. A camera with 15-meter IR range covering a 40-meter parking lot produces nothing useful after dark. Check the IR range against the actual distance to your subject. For outdoor areas with complete darkness, white-light cameras or external IR illuminators are more reliable than built-in IR.</p>

<h2>Storage: NVR vs. cloud</h2>
<p>An NVR, Network Video Recorder, stores footage on-site. A cloud-managed system stores footage remotely or in a hybrid configuration. Both have a place:</p>
<ul>
  <li><strong>NVR:</strong> Higher storage capacity, lower recurring cost, footage stays local. Risk: if the NVR is stolen or destroyed, footage is gone. Requires local power and network continuity.</li>
  <li><strong>Cloud:</strong> Off-site storage survives a physical incident at your premises. Higher bandwidth consumption. Recurring cost. Better for remote multi-site management.</li>
</ul>
<p>For most businesses, the right answer is a local NVR with at least 30 days of retention plus cloud backup of critical camera streams. Do not rely on a single local storage device with no offsite copy.</p>

<h2>Remote access security</h2>
<p>Most CCTV systems are configured for remote access via port forwarding on the router. This exposes the NVR directly to the internet. NVR firmware is notoriously slow to update and frequently has unpatched vulnerabilities. A more secure approach: VPN access to the network, with the NVR accessible only from within the VPN. It takes more setup but removes direct internet exposure.</p>

<h2>What professional installation gives you that plug-and-play does not</h2>
<p>Camera positioning based on a coverage map. Correct cable management with labeled runs. Proper weatherproofing on outdoor installations. Configured motion zones so you receive relevant alerts, not 400 notifications per day. A tested and documented system with credentials you actually have. And someone who picks up the phone when something stops working.</p>
<p>A CCTV system that is not working when you need it is not a security asset. It is a liability that gives false confidence.</p>
    `.trim(),
  },
  {
    slug: 'firewall-not-enough',
    title: 'A Firewall Is Not Enough: What Endpoint Security Actually Requires',
    category: 'Cybersecurity',
    date: '2026-01-30',
    readTime: '6 min',
    excerpt:
      'Lebanese businesses treat a firewall as a security strategy. It is not. It is one layer. Here is what a complete endpoint security posture looks like.',
    body: `
<p>Every business we visit has a firewall. Most of them believe that means they are secure. A firewall is a perimeter control. It inspects traffic at the network boundary. It does nothing about the laptop that got infected via a phishing email. It does nothing about the employee who brought in a USB drive. It does nothing about the attacker who already has valid credentials.</p>

<h2>What a firewall actually does</h2>
<p>A next-generation firewall inspects inbound and outbound traffic, blocks known malicious destinations, enforces application control, and can decrypt and inspect SSL traffic. This is valuable. It stops a category of threats. It does not stop threats that originate inside the network, that arrive via email, or that use legitimate protocols to exfiltrate data.</p>

<h2>Endpoint detection and response</h2>
<p>EDR software runs on every endpoint: laptops, desktops, servers. It monitors process behavior, file access patterns, network connections, and registry changes. When it sees a process doing something unusual, like a Word document spawning a PowerShell process, it can kill it automatically and alert your team.</p>
<p>Traditional antivirus matches against a database of known malware signatures. EDR looks at behavior, which means it catches new threats that have no signature yet. For businesses in 2026, EDR is not a nice-to-have. It is the difference between catching ransomware in the first 30 seconds and finding out about it when files start disappearing.</p>

<h2>The human layer</h2>
<p>Phishing is still the most common initial access vector for cyberattacks. Not because businesses have not heard of it, but because the emails keep getting better. Spear phishing targeted at a specific person, using real context from their LinkedIn and email history, is difficult to recognize even for technical staff.</p>
<p>The controls here are: multi-factor authentication on every account so that a stolen password alone is not enough, email filtering that catches known phishing domains and suspicious attachments, and regular simulated phishing exercises so staff recognize and report attempts rather than clicking.</p>

<h2>Patch management</h2>
<p>Unpatched software is one of the most exploited attack surfaces in corporate networks. Most organizations have a mix of operating systems and applications at different patch levels, with some machines that have not received updates in months. Attackers use publicly disclosed vulnerabilities that have patches available but have not been applied.</p>
<p>Patch management does not need to be complex: a policy that defines how quickly critical patches are applied, a tool that reports compliance, and someone accountable for the numbers. The specific tool matters less than the discipline.</p>

<h2>Network segmentation</h2>
<p>Even with EDR deployed, assume that an endpoint will eventually be compromised. Segmentation limits the blast radius. A ransomware infection on a staff laptop should not be able to reach the accounting server or the backup storage. VLANs and firewall rules between segments mean that lateral movement, once inside the network, is restricted.</p>

<h2>What a minimum viable security stack looks like</h2>
<ul>
  <li>Next-generation firewall with IPS and SSL inspection</li>
  <li>EDR on all endpoints and servers</li>
  <li>MFA on all accounts, especially email and VPN</li>
  <li>Email filtering and anti-phishing</li>
  <li>Network segmentation by device class and function</li>
  <li>Defined patch management cycle with accountability</li>
  <li>Offsite or cloud backup that is tested quarterly</li>
</ul>
<p>None of these items is exotic. None of them requires a dedicated security team to operate. They require configuration, discipline, and someone who reviews the alerts. That is what managed security services provide: the configuration, the discipline, and the review, without requiring you to hire a full-time security engineer.</p>
    `.trim(),
  },
]

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}

export function getRecentPosts(count = 3): BlogPost[] {
  return blogPosts.slice(0, count)
}
