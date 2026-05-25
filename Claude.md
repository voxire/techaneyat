
> Source of truth for every AI session working on this codebase.
> Read this fully before touching any file. No exceptions.

> **This is a Voxire client project.** Quality bar: match or exceed the best enterprise IT company websites globally — think Presidio, NTT Data. Techaneyat must look like the most serious infrastructure company in the Lebanese market.

> **DESIGN DIRECTION: Command Layer.** Dark, technical, enterprise-premium. The entire scroll experience tells a story. Every section transition is intentional. Nothing bounces. Nothing is gratuitous.

---

## 1. PROJECT IDENTITY

| Field | Value |
|-------|-------|
| Client | Techaneyat (تكنيات) |
| Location | Beirut, Lebanon |
| Founded | 2015 |
| Website (current) | https://www.techaneyat.com/ (Framer — being replaced) |
| Website (target) | TBD |
| Repo | https://github.com/voxire/Techaneyat (create on first session) |
| Contact email | Sales@techaneyat.com |
| Contact phone | +961 76 100 766 |
| Point of contact | Ahmad Gherawi — via Voxire (do not contact client directly) |
| Built by | Voxire — Abed El-Fattah Amouneh & Mohammad Homsi |
| Voxire email | info@voxire.com |
| Voxire WhatsApp | +961 3 940 708 |

### Techaneyat's USP

One partner. One SLA. Every infrastructure system a business runs — network, cybersecurity, smart security, cloud, power continuity, and hardware — managed under a single contract. The client never hears "that's not our problem."

### Target clients

Enterprise, government institutions, hospitals, schools and universities, NGOs, financial sector, large retail.

### Pages in scope

| Page | Route (EN) | Route (AR) | Purpose |
|------|-----------|-----------|---------|
| Home | `/` | `/ar` | Brand entry — terminal hero, full narrative scroll |
| Services | `/services` | `/ar/services` | Services overview with cable story |
| Network & Infrastructure | `/services/network` | `/ar/services/network` | Service detail |
| Cybersecurity | `/services/cybersecurity` | `/ar/services/cybersecurity` | Service detail |
| Smart Security | `/services/smart-security` | `/ar/services/smart-security` | Service detail |
| Cloud & Managed Services | `/services/cloud` | `/ar/services/cloud` | Service detail |
| Energy & Power Continuity | `/services/power` | `/ar/services/power` | Service detail |
| Computing & Hardware | `/services/hardware` | `/ar/services/hardware` | Service detail |
| About | `/about` | `/ar/about` | Story, team, founded 2015 |
| Case Studies | `/case-studies` | `/ar/case-studies` | Client results |
| Case Study Detail | `/case-studies/[slug]` | `/ar/case-studies/[slug]` | Individual result |
| Blog | `/blog` | `/ar/blog` | Technical insights and news |
| Blog Post | `/blog/[slug]` | `/ar/blog/[slug]` | Individual article |
| Contact | `/contact` | `/ar/contact` | Get in touch |

---

## 2. GIT WORKFLOW

1. **No force pushes.** Ever.
2. **Atomic commits.** One component or logical unit per commit. Never batch unrelated changes.
3. **Commit message format:** short imperative, no conventional prefixes.
   - `Add hero terminal animation` not `feat: terminal animation`
   - `Fix cable SVG path on tablet` not `fix: cable`
4. **No `.md` files in commits** except `CLAUDE.md` itself.
5. **Never commit** `.env`, secrets, or API keys.
6. **Dependency order for commits:** types/data → components → animations → pages → i18n EN → i18n AR.
7. **Branch naming:** `feat/hero-terminal`, `fix/cable-mobile`, `chore/deps`

---

## 3. TECH STACK

| Layer | Tech | Notes |
|-------|------|-------|
| Framework | Next.js 15 (App Router) | `app/` directory only — never `pages/` |
| Language | TypeScript/TSX | `strict: true` |
| Styling | Tailwind CSS v4 | CSS variables for brand tokens, utility classes for layout |
| Animation | GSAP 3 + ScrollTrigger + DrawSVGPlugin | Core animation engine |
| Smooth scroll | Lenis v2 | Wired into GSAP ticker — see Section 8 |
| 3D / Canvas | Canvas API (no Three.js needed) | Network topology hero — custom canvas renderer |
| SVG animation | GSAP DrawSVGPlugin | For the cable scroll story between service sections |
| Package manager | pnpm | **Never `npm install <package>` — use `pnpm add`** |
| Icons | Lucide React | `pnpm add lucide-react` |
| Font loading | `next/font` | `display: 'swap'`, preloaded at root layout |
| i18n | next-intl | Arabic RTL + English LTR |
| Forms | React Hook Form + Zod | Contact form validation |
| SEO | Next.js Metadata API | Per-page, bilingual |

### Why Canvas API instead of Three.js

The network topology hero is a 2D animated canvas — nodes, edges, and moving data packets. Canvas API + requestAnimationFrame handles this perfectly without the Three.js overhead (~600KB). Use Three.js only if a genuine 3D element is required (and confirm with Abed first).

### Dev commands

```bash
pnpm install          # restore dependencies
pnpm dev              # dev server on localhost:3000
pnpm build            # production build
pnpm lint             # ESLint check
```

### Install all core dependencies at once

```bash
pnpm add gsap lenis next-intl react-hook-form zod lucide-react
pnpm add -D @types/node
```

> **Note on GSAP DrawSVGPlugin:** It requires a GSAP Club license. Check if the project has access — if not, implement cable drawing with CSS `stroke-dasharray`/`stroke-dashoffset` driven by a ScrollTrigger progress value. Same visual result, no license required.

### Package manager rules

| Action | Command |
|--------|---------|
| Add dependency | `pnpm add <package>` |
| Add devDependency | `pnpm add -D <package>` |
| Remove | `pnpm remove <package>` |

---

## 4. FOLDER STRUCTURE

```
Techaneyat/
├── app/
│   ├── layout.tsx                Root layout — fonts, Lenis + GSAP init, global meta
│   ├── page.tsx                  Home (EN)
│   ├── globals.css               CSS variables (brand tokens) + Tailwind base
│   ├── providers/
│   │   └── SmoothScrollProvider.tsx   Lenis + GSAP ScrollTrigger wiring
│   ├── components/
│   │   ├── Nav.tsx               Global nav — transparent on hero, solid on scroll
│   │   ├── Footer.tsx            Footer — contact, services list, social
│   │   └── ui/                   Atoms: Button, Tag, SectionLabel, GlowCard, etc.
│   ├── sections/
│   │   ├── HeroTerminal.tsx      Terminal typewriter → network canvas hero
│   │   ├── NetworkCanvas.tsx     Animated node/edge canvas background
│   │   ├── CableScrollStory.tsx  Scroll-driven SVG cable + service narrative
│   │   ├── NetworkMap.tsx        Interactive Lebanon/regional network map
│   │   ├── StatCounter.tsx       Viewport-triggered counting stats
│   │   ├── CaseStudiesGrid.tsx   Case study preview cards
│   │   └── ContactCTA.tsx        Full-bleed CTA section before footer
│   ├── services/
│   │   ├── page.tsx              Services overview
│   │   └── [slug]/
│   │       └── page.tsx          Service detail
│   ├── about/
│   │   └── page.tsx
│   ├── case-studies/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── blog/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   └── ar/                       Arabic mirror — same structure, RTL layout
│       └── ...
├── messages/
│   ├── en.json                   English copy — all UI strings
│   └── ar.json                   Arabic copy — all UI strings
├── data/
│   ├── services.ts               Service definitions — id, name, description, icon, slug
│   ├── caseStudies.ts            Case study data
│   └── team.ts                   Team member data
├── public/
│   ├── brand/                    Client-provided assets
│   └── og/
│       └── og-default.jpg        1200×630 OG image — dark, Techaneyat brand
├── CLAUDE.md
└── RESEARCH_NOTES.md             Fill after Phase 1 research
```

---

## 5. BRAND SYSTEM

### 5.1 Color Tokens

These go in `app/globals.css`. **Locked** — never approximate or substitute.

```css
:root {
  /* Backgrounds — layered dark navy */
  --tn-bg:          #070B14;   /* page background — deepest */
  --tn-bg-2:        #0A0E1A;   /* section alternate */
  --tn-bg-3:        #111827;   /* card / glass morphism surface */
  --tn-bg-4:        #1a2234;   /* card hover state */

  /* Accent — electric teal */
  --tn-accent:      #00C8FF;
  --tn-accent-dim:  rgba(0, 200, 255, 0.12);
  --tn-accent-glow: rgba(0, 200, 255, 0.25);

  /* Text */
  --tn-text:        #F0F4FF;                   /* primary — cold white */
  --tn-text-2:      rgba(240, 244, 255, 0.60); /* secondary */
  --tn-text-3:      rgba(240, 244, 255, 0.30); /* dim / labels */

  /* Borders */
  --tn-border:       rgba(255, 255, 255, 0.07);
  --tn-border-accent: rgba(0, 200, 255, 0.20);

  /* Gradients */
  --tn-gradient-hero: radial-gradient(ellipse 80% 60% at 50% -10%, rgba(0,200,255,0.10) 0%, transparent 70%);
  --tn-gradient-card: linear-gradient(135deg, rgba(0,200,255,0.05) 0%, transparent 60%);

  /* Semantic */
  --tn-success:  #22C55E;
  --tn-warning:  #F59E0B;
  --tn-error:    #EF4444;
}
```

### 5.2 Typography

```css
/* Fonts loaded via next/font in layout.tsx */
--tn-font-display: 'Space Grotesk', sans-serif;   /* headings, nav, labels */
--tn-font-body:    'Inter', sans-serif;           /* body text, descriptions */
--tn-font-mono:    'JetBrains Mono', monospace;   /* eyebrow labels, terminal, code */
```

**Typography scale:**

| Element | Size | Weight | Letter-spacing | Font |
|---------|------|--------|---------------|------|
| H1 (hero) | clamp(48px, 7vw, 96px) | 700 | -0.03em | Space Grotesk |
| H2 (section) | clamp(32px, 4vw, 52px) | 700 | -0.02em | Space Grotesk |
| H3 (card title) | 22px | 600 | -0.01em | Space Grotesk |
| Body | 16px | 400 | 0 | Inter |
| Body large | 18px | 400 | 0 | Inter |
| Caption | 13px | 400 | 0.01em | Inter |
| Mono label | 11px | 500 | 0.14em | JetBrains Mono |
| Mono label (uppercase) | 10px | 500 | 0.18em | JetBrains Mono |

### 5.3 Component Patterns

**GlowCard** — the standard card surface:
```css
background: var(--tn-bg-3);
border: 1px solid var(--tn-border);
border-radius: 12px;
transition: border-color 0.3s, box-shadow 0.3s;

/* Hover state */
border-color: var(--tn-border-accent);
box-shadow: 0 0 24px var(--tn-accent-glow), 0 20px 40px rgba(0,0,0,0.4);
```

**Eyebrow label** — section identifier above every heading:
```
Font: JetBrains Mono, 10px, 500, 0.18em tracking, uppercase
Color: var(--tn-accent)
Decoration: thin teal line before the text (::before pseudo, width 20px, height 1px)
```

**Primary button:**
```css
padding: 12px 28px;
background: var(--tn-accent);
color: var(--tn-bg);
border-radius: 4px;
font: 600 14px/1 'Space Grotesk';
letter-spacing: 0.02em;
transition: opacity 0.2s, box-shadow 0.2s;
/* Hover: opacity 0.88, box-shadow 0 0 20px var(--tn-accent-glow) */
```

**Ghost button:**
```css
padding: 12px 28px;
border: 1px solid var(--tn-border-accent);
color: var(--tn-accent);
border-radius: 4px;
font: 500 14px/1 'Space Grotesk';
transition: background 0.2s, border-color 0.2s;
/* Hover: background var(--tn-accent-dim) */
```

---

## 6. CREATIVE INTERACTIONS — REQUIRED

These four interactions are **non-negotiable** — they are the soul of the design. Every one must ship.

### 6.1 Terminal Hero (`HeroTerminal.tsx`)

**What it does:** The page loads dark. A terminal window fades in. Text types out line by line like a command being run. When the sequence completes, the terminal scales down, the full hero layout fades in, and the network canvas begins rendering behind it.

**Sequence:**
```
Line 1 (0.2s delay):  > Establishing secure connection...
Line 2 (1.2s):        > Scanning infrastructure endpoints...
Line 3 (2.1s):        > Running diagnostics...
Line 4 (3.0s):        > All systems operational. ✓
                                                (0.6s pause)
→ Terminal fades + scales to 0.95, opacity 0 (0.4s)
→ Hero heading + sub + CTA fade up (0.5s stagger)
→ Network canvas begins animating
```

**Terminal window style:**
- Glass morphism panel, 480px wide, centered
- Background: rgba(7,11,20,0.85), backdrop-filter: blur(20px)
- Border: 1px solid var(--tn-border-accent)
- Top bar: three dots (red/yellow/green) + monospace URL bar reading `techaneyat.com`
- Text: JetBrains Mono, 13px, var(--tn-accent) for typed text, var(--tn-text-3) for the prompt prefix
- Blinking cursor: `|` that blinks at 0.5s interval during typing, stops when done

**Implementation note:** Use a `useTypewriter` hook — character-by-character with a 30–40ms delay between characters, 300ms delay between lines. GSAP for the entrance/exit transitions.

**Mobile behavior:** Terminal still shows but is 90vw wide, font 11px. Animation plays the same.

---

### 6.2 Animated Network Canvas (`NetworkCanvas.tsx`)

**What it does:** A full-viewport canvas that renders a live network topology — nodes (circles), edges (lines), and tiny "data packets" (dots) that travel along connections. This lives behind all hero content.

**Rendering spec:**
- ~40 nodes on desktop, ~20 on mobile
- Nodes: 3–6px radius circles, var(--tn-accent) at 0.6–0.9 opacity, randomly positioned
- 4–6 edges per node (short connections only — max distance 180px)
- Edges: 0.5px lines, var(--tn-accent) at 0.15–0.25 opacity
- Data packets: 2px dots, var(--tn-accent) at 0.8 opacity, travel edge to edge on loop
- 3 "hub" nodes (larger, 8px, full opacity) — these are the main connection points
- Canvas opacity: 0.45 overall so it doesn't compete with text
- Mouse repulsion: nodes within 120px of cursor gently drift away (subtle, not dramatic)
- No Three.js — pure Canvas 2D API + requestAnimationFrame

**Performance:**
- `willReadFrequently: false` on canvas context
- Throttle to 45fps on low-power devices
- `prefers-reduced-motion`: static snapshot — no animation

---

### 6.3 Cable Scroll Story (`CableScrollStory.tsx`)

**What it does:** The services section is a vertical narrative. Each service sits in its own "station" — hardware illustration on the right, service content on the left. An SVG cable path draws itself as the user scrolls, connecting Station 1 → Station 2 → Station 3... through all 6 services.

**Layout:**
```
┌─────────────────────────────────────┐
│  [Service Content]    [Server Illus.]│  ← Station 1: Network
│                           │          │
│                    ═══════╧═══════   │  ← Cable enters from below server
│                           │          │
│  [Server Illus.]   [Service Content] │  ← Station 2: Cybersecurity
│                           │          │
│                    ═══════╧═══════   │  ← Cable continues
│                           │          │
│  [Service Content]    [Server Illus.]│  ← Station 3: Smart Security
...and so on for all 6 services
```

**Cable implementation:**
```tsx
// Single <svg> that spans the full section height
// One continuous <path> that snakes through all stations
// stroke-dasharray = total path length
// stroke-dashoffset animated by ScrollTrigger scrub:
//   0% scroll into section = full offset (invisible)
//   100% scroll through section = 0 offset (fully drawn)

const cablePath = useRef<SVGPathElement>(null)

useEffect(() => {
  const length = cablePath.current!.getTotalLength()
  gsap.set(cablePath.current, { strokeDasharray: length, strokeDashoffset: length })

  ScrollTrigger.create({
    trigger: sectionRef.current,
    start: 'top center',
    end: 'bottom center',
    scrub: 1.2,
    onUpdate: (self) => {
      gsap.set(cablePath.current, {
        strokeDashoffset: length * (1 - self.progress)
      })
    }
  })
}, [])
```

**Cable style:** 2px stroke, var(--tn-accent), no fill. Add a subtle glow: `filter: drop-shadow(0 0 4px rgba(0,200,255,0.5))`

**Hardware illustrations:** SVG illustrations of:
- Station 1: Server rack (simple geometric, line-art style)
- Station 2: Firewall / shield icon
- Station 3: Security camera
- Station 4: Cloud / server hybrid
- Station 5: UPS / battery unit
- Station 6: Desktop computer + monitor

These should be SVG — clean, monochrome with teal accent strokes. Not photographic.

**Content per station:** Service name (H3), 2-line description, one key benefit, "Learn more →" link

---

### 6.4 Live Network Map (`NetworkMap.tsx`)

**What it does:** A section that visualizes "Our infrastructure presence" — an abstract network diagram (not a geographic map) with labeled nodes representing client types. Nodes pulse. Connections animate. Hovering a node shows a tooltip.

**Nodes:**
- "Enterprise" (center, largest)
- "School & University"
- "Healthcare"
- "Government"
- "Retail"
- "NGO"

**Visual:**
- Dark background section (var(--tn-bg-2))
- SVG-based diagram — positioned absolutely, responsive
- Each node: circle with an icon inside, glowing border
- Connections: dashed lines with animated `stroke-dashoffset` loop
- Hover: node brightens, connections to it highlight, tooltip appears above
- Section heading: "The infrastructure that connects Lebanon" or "One SLA across every sector"

**Animation:** All animations run on a loop — no scroll trigger. Nodes pulse (scale 1 → 1.04 → 1, 3s ease-in-out, staggered). Connection dashes travel continuously.

---

### 6.5 Stat Counters (`StatCounter.tsx`)

**What it does:** Four key stats that count up from 0 when they enter the viewport. Clean, surgical animation.

**Stats:**
| Value | Label |
|-------|-------|
| 10+ | Years in Lebanon |
| 500+ | Projects Delivered |
| 99.9% | Network Uptime |
| 24/7 | Support Coverage |

**Implementation:**
```tsx
// IntersectionObserver triggers once per stat
// GSAP counter tween: { counter: 0 } → { counter: targetValue }
// ease: 'power2.out', duration: 2.2
// Display: Math.round(obj.counter) + suffix ('+' or '%')
```

**Style:** Large Space Grotesk bold number (60px on desktop), teal color for the suffix, white for the number, dim Inter caption below. Four columns on desktop, 2×2 grid on mobile.

---

## 7. PAGE-BY-PAGE SPEC

### 7.1 Home Page (`/`)

**Section order:**
1. `HeroTerminal` — terminal sequence → full hero with H1, subheading, 2 CTAs
2. `NetworkCanvas` — persistent canvas behind hero
3. Trust bar — logo strip: client logos or certifications
4. `CableScrollStory` — all 6 services narrative
5. `NetworkMap` — sector presence visualization
6. `StatCounter` — 4 key stats
7. Case studies preview — 3 featured results, GlowCards
8. `ContactCTA` — dark full-bleed: "Ready to secure your infrastructure?"
9. Footer

**Hero copy (EN):**
```
Eyebrow: SMART INFRASTRUCTURE PARTNER
H1: Your infrastructure.
    Always online.
    Always secure.
Subheading: One SLA. One partner. Network, cybersecurity, cloud, power,
            and hardware — all managed so your team never has to.
CTA 1: Talk to an Engineer  (primary button)
CTA 2: See Our Work  (ghost button)
```

**Hero copy (AR):**
```
[Fill after Ahmad provides Arabic copy or translate professionally]
H1: بنيتك التحتية
    متاحة دائماً
    آمنة دائماً
```

### 7.2 Services Page (`/services`)

Not a separate page — the services section IS the home page cable story. `/services` leads back to the home services section OR shows a full grid of all 6 services with individual "Learn more" links to the detail pages.

### 7.3 Service Detail Pages

Standard layout per service:
1. Hero: service name (H1), description, key icon
2. What's included: feature list with icons
3. How it works: 3-step process
4. Use cases: which industries benefit
5. Case study snippet: a relevant result
6. CTA: Get a quote for this service

### 7.4 Case Studies

**List page:** Filterable by sector. GlowCards with: client type, challenge headline, result metric (e.g. "99.9% uptime restored"), image if available.

**Detail page:** Full case study layout — challenge, solution, results, technologies used, client quote.

### 7.5 About

Sections: founded in 2015, team, the "one SLA" philosophy, certifications and partnerships, why Techaneyat.

### 7.6 Contact

Simple and fast. Form: Name, Company, Email, Phone, Message. Plus: address, phone, email displayed with accent icons. Response time SLA: "We respond within 4 hours."

---

## 8. ANIMATION SYSTEM

### Lenis + GSAP Setup

```tsx
// app/providers/SmoothScrollProvider.tsx
'use client'
import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)
    return () => {
      lenis.destroy()
      gsap.ticker.remove((time) => lenis.raf(time * 1000))
    }
  }, [])
  return <>{children}</>
}
```

### Standard Section Reveal

```tsx
useEffect(() => {
  const mm = gsap.matchMedia()
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    gsap.from(headingRef.current, {
      y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: headingRef.current, start: 'top 85%' }
    })
  })
  return () => mm.revert()
}, [])
```

### Animation Vocabulary — Stick to These

| Element | Entrance | Duration | Ease |
|---------|----------|----------|------|
| H1 / H2 | y: 40 → 0, opacity 0 → 1 | 0.8s | power3.out |
| Body text | y: 24 → 0, opacity 0 → 1 | 0.6s | power2.out |
| Cards (stagger) | y: 32 → 0, opacity 0 → 1, stagger 0.1s | 0.6s | power2.out |
| Stat counters | opacity 0 → 1 + count up | 2.2s | power2.out |
| Cable drawing | stroke-dashoffset scrub | — | scrub: 1.2 |
| Nav on scroll | background opacity 0 → 1 | 0.3s | none |

**Never use:** bounce, elastic, back eases. Never autoplay animations without scroll trigger. Never run animations before page is interactive.

---

## 9. BILINGUAL (Arabic / English)

### Setup

Use `next-intl` for all string management. Language toggle in nav (EN / ع).

**RTL rules:**
- `<html dir="rtl" lang="ar">` on AR routes
- Tailwind: use `rtl:` prefix for directional overrides
- Space Grotesk does not have Arabic glyphs — use **Noto Kufi Arabic** or **IBM Plex Arabic** for AR headings
- JetBrains Mono is Latin only — AR eyebrow labels use IBM Plex Arabic at equivalent weight
- Cable scroll story: left/right positions swap in RTL
- Nav logo moves to right side

**Copy source:** All Arabic copy must be reviewed by a native speaker before going live. Do not rely on machine translation for headlines — ask Ahmad to provide or approve.

### i18n file structure

```json
// messages/en.json
{
  "nav": {
    "services": "Services",
    "caseStudies": "Case Studies",
    "about": "About",
    "contact": "Contact",
    "cta": "Get a Quote"
  },
  "hero": {
    "eyebrow": "Smart Infrastructure Partner",
    "h1Line1": "Your infrastructure.",
    "h1Line2": "Always online.",
    "h1Line3": "Always secure.",
    "sub": "One SLA. One partner. Network, cybersecurity, cloud, power, and hardware — all managed.",
    "cta1": "Talk to an Engineer",
    "cta2": "See Our Work"
  },
  "terminal": {
    "line1": "Establishing secure connection...",
    "line2": "Scanning infrastructure endpoints...",
    "line3": "Running diagnostics...",
    "line4": "All systems operational."
  },
  "services": { ... },
  "stats": { ... },
  "contact": { ... }
}
```

---

## 10. SEO

### Per-page metadata

Every page exports full Next.js Metadata. Template:

```tsx
export const metadata: Metadata = {
  title: 'Network & Infrastructure Solutions Lebanon | Techaneyat',
  description: 'Techaneyat delivers enterprise network infrastructure, managed services, and IT solutions across Lebanon. One partner, one SLA.',
  alternates: {
    canonical: 'https://techaneyat.com/services/network/',
    languages: { 'ar': 'https://techaneyat.com/ar/services/network/' }
  },
  openGraph: { ... },
  twitter: { ... }
}
```

### Schema.org

| Page | Schema |
|------|--------|
| Home | `Organization` + `LocalBusiness` + `WebSite` |
| Services | `Service` per service + `ItemList` |
| Case Studies | `CreativeWork` per case study |
| About | `Organization` + `AboutPage` |
| Contact | `ContactPage` + `LocalBusiness` |
| Blog posts | `Article` |

### Target keywords

- `IT infrastructure company Lebanon`
- `network solutions Beirut`
- `cybersecurity company Lebanon`
- `managed IT services Lebanon`
- `smart security systems Lebanon`
- `CCTV installation Lebanon`
- `cloud managed services Lebanon`
- `UPS power solutions Lebanon`

---

## 11. MOBILE-FIRST RULES

All CSS is mobile-first. `min-width` queries only. Never `max-width` for new code.

**Breakpoints:**
```css
@media (min-width: 480px) { }   /* sm */
@media (min-width: 768px) { }   /* md */
@media (min-width: 992px) { }   /* lg */
@media (min-width: 1280px) { }  /* xl */
```

**Mobile-specific adjustments for creative sections:**
- Terminal hero: 90vw wide, 11px font, same animation
- Network canvas: 20 nodes (vs 40), no mouse repulsion
- Cable story: single column — illustrations stack above content, cable path simplified
- Network map: smaller SVG, same interaction
- Stats: 2×2 grid

**Touch targets:** All interactive elements min 44×44px.

**`prefers-reduced-motion`:** All GSAP animations wrapped in `mm.add('(prefers-reduced-motion: no-preference)', ...)`. Static fallback for all creative sections.

---

## 12. WRITING RULES (apply to all copy, JSX, CSS comments)

- **Never use em dashes (—). Never replace with a hyphen (-).** Restructure or use a colon.
- No corporate fluff: never "leverage", "synergy", "cutting-edge", "world-class"
- Direct and technical. Short sentences. Numbers beat prose.
- Voxire company name always capitalized: **Techaneyat** (not TECHANEYAT or techaneyat in body text)

---

## 13. SESSION STARTUP CHECKLIST

Before writing any code:

```bash
git pull origin main
pnpm install
pnpm dev
```

Then read:
1. This CLAUDE.md fully
2. Any `RESEARCH_NOTES.md` in the repo from prior sessions
3. `messages/en.json` to understand current copy state

---

*CLAUDE.md v1.0 — Techaneyat Website Redesign*
*Created: May 2026 — Abed El-Fattah Amouneh, Voxire*
*Design direction: Command Layer (Direction 01)*
*Point of contact: Ahmad Gherawi*