# RESEARCH NOTES — Techaneyat Website Redesign
*Session: May 2026 — Phase 1 audit*

---

## Current Site Audit (techaneyat.com)

Built on Framer. Being replaced entirely.

### Meta / SEO (current)
- **Title:** Techaneyat Solutions
- **Description:** "Techaneyat Solutions is a smart infrastructure integrator based in Beirut, Lebanon. We design, build, and manage networks, cybersecurity, cloud, and smart systems for schools, SMBs, and NGOs under one SLA since 2015."
- **OG image:** framerusercontent.com/assets/TLFJn5MUBGGvBUhB0MtBafodB1g.jpg (needs downloading if we want to reference it)

### Hero / Positioning
- **Current H1:** "We Take Ownership of Your Technology"
- **Core message:** "Most organizations in Lebanon have IT built piece by piece — different vendors, no one accountable. Techaneyat designs, builds, and manages your entire technology backbone under one SLA. One partner. Full responsibility."
- **Three pillars:** We Build It / We Secure It / We Own It

### Services (all 6 confirmed, with exact copy from current site)

| Service | Current copy |
|---------|-------------|
| Network & Infrastructure | "Structured cabling, switches, routers, WiFi, and fiber. We build networks that do not slow you down or let you down." |
| Cybersecurity | "Firewalls, endpoint protection, EDR, and threat monitoring. We protect your data before the problem happens — not after." |
| Smart Security Systems | "CCTV, access control, alarms, and facial recognition. Know who enters your premises and respond before it becomes an incident." |
| Cloud & Managed Services | "Microsoft 365, Google Workspace, cloud backup, and remote monitoring under SLA. Your systems managed proactively, not reactively." |
| Energy & Power Continuity | "UPS systems, battery backup, and solar. In Lebanon, power is not guaranteed — your business continuity should be." |
| Computing & Hardware | "Laptops, servers, NAS, and workstations. Sourced, configured, and deployed by us." |

### Contact Info
- Email: Sales@techaneyat.com
- Phone: +961 76 100 766
- WhatsApp: https://wa.me/96176100766
- Location: Beirut, Lebanon
- LinkedIn: https://www.linkedin.com/company/techaneyat
- Instagram: https://www.instagram.com/techaneyat/

### What is NOT on the current site
- No team names or photos
- No case studies or client results
- No certifications or partner badges visible
- No blog content
- No pricing
- No testimonials (nav link exists but content not rendered/visible)
- No statistics (years in business, projects delivered, etc.)

---

## Brand Assets Status
- **Logo:** Not yet received. Source from Instagram: https://www.instagram.com/techaneyat/
- **Photography:** Not yet received.
- **Client logos:** Not yet received.
- **Partner badges:** Not yet received.
- **Action:** Extract logo from Instagram profile manually. Ask Ahmad for SVG version.

---

## Confirmed Decisions (from Abed, May 2026)

| Decision | Answer |
|----------|--------|
| Brand assets | None yet — extract from Instagram, use placeholders |
| Case studies | Real client results — Ahmad to provide |
| Contact form destination | Sales@techaneyat.com |
| Arabic copy | To be confirmed (assume placeholder AR for now) |
| Design direction | Command Layer — locked, do not revisit |
| GSAP DrawSVGPlugin | No club license — use stroke-dasharray/dashoffset via ScrollTrigger |

---

## Open Questions (unresolved)

1. What is the target domain? techaneyat.com (replacing Framer) or a staging subdomain?
2. Logo SVG file — Ahmad needs to provide or we extract from Instagram
3. Real case study data — Ahmad to supply (client type, challenge, result metric)
4. Are there Cisco / Microsoft / other partner certifications to display?
5. Who reviews Arabic translations before go-live?
6. Launch deadline?
7. Contact form: does Techaneyat also want WhatsApp integration (they use it currently)?
8. Blog: start empty, or carry over any content from current site (none found)?

---

## Stats to Use (CLAUDE.md spec — verify with Ahmad)

| Value | Label |
|-------|-------|
| 10+ | Years in Lebanon |
| 500+ | Projects Delivered |
| 99.9% | Network Uptime |
| 24/7 | Support Coverage |

*These are from the design spec. Confirm accuracy with Ahmad before launch.*

---

## Copy Notes for New Site

The current site's writing is already solid and direct — "We Take Ownership of Your Technology" is a strong differentiator. Preserve the "one partner, one SLA, full responsibility" angle. The new copy should sharpen it further:

- Remove passive phrasing
- Make target industries more prominent (enterprise, government, hospitals, schools, NGOs)
- Add specifics: years, project count, uptime SLA numbers
- Hero copy (new): per CLAUDE.md Section 7.1 — "Your infrastructure. Always online. Always secure."
