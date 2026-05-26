'use client'

// ─── Service Illustrations ────────────────────────────────────────────────────
// Clean, geometric SVG illustrations for each service station in CableScrollStory.
// Uses CSS variables so they work in both dark and light mode without JS.
// Teal accents via currentColor / var(--tn-accent), structure lines via var(--tn-text-3).

export type ServiceIllustrationKey =
  | 'network'
  | 'cybersecurity'
  | 'smart-security'
  | 'cloud'
  | 'power'
  | 'hardware'

// ─── Network: Server Rack ─────────────────────────────────────────────────────
function NetworkIllus() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="100%" height="100%" style={{ display: 'block' }}>
      {/* Rack chassis */}
      <rect x="44" y="24" width="112" height="152" rx="4"
        stroke="var(--tn-text-3)" strokeWidth="1.5" fill="var(--tn-bg-3)" />
      {/* Rack ears */}
      <rect x="36" y="30" width="8" height="140" rx="2"
        stroke="var(--tn-text-3)" strokeWidth="1" fill="var(--tn-bg-3)" />
      <rect x="156" y="30" width="8" height="140" rx="2"
        stroke="var(--tn-text-3)" strokeWidth="1" fill="var(--tn-bg-3)" />

      {/* Unit 1 — teal accent server */}
      <rect x="50" y="34" width="100" height="24" rx="2"
        stroke="var(--tn-accent)" strokeWidth="1.2" fill="var(--tn-bg-2)" />
      <circle cx="130" cy="46" r="3" fill="var(--tn-accent)" opacity="0.9" />
      <circle cx="120" cy="46" r="3" fill="var(--tn-accent)" opacity="0.5" />
      <rect x="56" y="40" width="44" height="12" rx="2"
        stroke="var(--tn-text-3)" strokeWidth="1" fill="var(--tn-bg-3)" />

      {/* Unit 2 */}
      <rect x="50" y="64" width="100" height="24" rx="2"
        stroke="var(--tn-text-3)" strokeWidth="1" fill="var(--tn-bg-2)" />
      <circle cx="130" cy="76" r="3" fill="var(--tn-accent)" opacity="0.4" />
      <circle cx="120" cy="76" r="3" fill="var(--tn-accent)" opacity="0.6" />
      <rect x="56" y="70" width="44" height="12" rx="2"
        stroke="var(--tn-text-3)" strokeWidth="1" fill="var(--tn-bg-3)" />

      {/* Unit 3 */}
      <rect x="50" y="94" width="100" height="24" rx="2"
        stroke="var(--tn-text-3)" strokeWidth="1" fill="var(--tn-bg-2)" />
      <circle cx="130" cy="106" r="3" fill="var(--tn-accent)" opacity="0.7" />
      <circle cx="120" cy="106" r="3" fill="var(--tn-accent)" opacity="0.3" />
      <rect x="56" y="100" width="44" height="12" rx="2"
        stroke="var(--tn-text-3)" strokeWidth="1" fill="var(--tn-bg-3)" />

      {/* Patch panel */}
      <rect x="50" y="124" width="100" height="16" rx="2"
        stroke="var(--tn-text-3)" strokeWidth="1" fill="var(--tn-bg-2)" />
      {[0,1,2,3,4,5,6,7].map(i => (
        <rect key={i} x={56 + i * 11} y="129" width="7" height="6" rx="1"
          stroke="var(--tn-accent)" strokeWidth="0.8" fill="var(--tn-bg-3)" opacity="0.7" />
      ))}

      {/* Switch */}
      <rect x="50" y="146" width="100" height="18" rx="2"
        stroke="var(--tn-text-3)" strokeWidth="1" fill="var(--tn-bg-2)" />
      {[0,1,2,3,4,5,6,7,8,9,10,11].map(i => (
        <rect key={i} x={56 + i * 7} y="151" width="4" height="8" rx="1"
          stroke="var(--tn-text-3)" strokeWidth="0.7" fill="var(--tn-bg-3)" />
      ))}
      <circle cx="140" cy="155" r="2.5" fill="var(--tn-accent)" opacity="0.8" />

      {/* Glow behind teal unit */}
      <rect x="50" y="34" width="100" height="24" rx="2"
        fill="var(--tn-accent)" opacity="0.04" />
    </svg>
  )
}

// ─── Cybersecurity: Shield + Circuit ─────────────────────────────────────────
function CybersecurityIllus() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="100%" height="100%" style={{ display: 'block' }}>
      {/* Shield outline */}
      <path
        d="M100 22 L152 44 L152 100 C152 136 126 160 100 172 C74 160 48 136 48 100 L48 44 Z"
        stroke="var(--tn-accent)" strokeWidth="2" fill="var(--tn-bg-2)" strokeLinejoin="round"
      />
      {/* Shield inner edge */}
      <path
        d="M100 34 L142 52 L142 100 C142 128 122 148 100 158 C78 148 58 128 58 100 L58 52 Z"
        stroke="var(--tn-text-3)" strokeWidth="1" fill="none" strokeLinejoin="round"
      />

      {/* Circuit traces inside shield */}
      {/* Horizontal trace top */}
      <line x1="74" y1="80" x2="94" y2="80" stroke="var(--tn-accent)" strokeWidth="1.2" opacity="0.7" />
      <line x1="106" y1="80" x2="126" y2="80" stroke="var(--tn-accent)" strokeWidth="1.2" opacity="0.7" />
      {/* Vertical */}
      <line x1="100" y1="68" x2="100" y2="80" stroke="var(--tn-accent)" strokeWidth="1.2" opacity="0.7" />
      <line x1="100" y1="120" x2="100" y2="132" stroke="var(--tn-accent)" strokeWidth="1.2" opacity="0.7" />
      {/* Horizontal trace bottom */}
      <line x1="74" y1="120" x2="94" y2="120" stroke="var(--tn-accent)" strokeWidth="1.2" opacity="0.7" />
      <line x1="106" y1="120" x2="126" y2="120" stroke="var(--tn-accent)" strokeWidth="1.2" opacity="0.7" />
      {/* Side traces */}
      <line x1="74" y1="80" x2="74" y2="120" stroke="var(--tn-accent)" strokeWidth="1.2" opacity="0.5" />
      <line x1="126" y1="80" x2="126" y2="120" stroke="var(--tn-accent)" strokeWidth="1.2" opacity="0.5" />

      {/* Circuit nodes */}
      {[
        [74, 80], [100, 80], [126, 80],
        [74, 120], [100, 120], [126, 120],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" fill="var(--tn-accent)" opacity="0.9" />
      ))}

      {/* Lock icon at center */}
      <rect x="88" y="94" width="24" height="18" rx="3"
        stroke="var(--tn-accent)" strokeWidth="1.5" fill="var(--tn-bg-3)" />
      <path d="M92 94 L92 89 C92 84 108 84 108 89 L108 94"
        stroke="var(--tn-accent)" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
      <circle cx="100" cy="103" r="3" fill="var(--tn-accent)" opacity="0.9" />

      {/* Corner accent dots on shield edge */}
      <circle cx="100" cy="25" r="2.5" fill="var(--tn-accent)" opacity="0.6" />
      <circle cx="152" cy="44" r="2" fill="var(--tn-accent)" opacity="0.5" />
      <circle cx="48" cy="44" r="2" fill="var(--tn-accent)" opacity="0.5" />
    </svg>
  )
}

// ─── Smart Security: IP Camera ────────────────────────────────────────────────
function SmartSecurityIllus() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="100%" height="100%" style={{ display: 'block' }}>
      {/* Ceiling mount bracket */}
      <rect x="88" y="24" width="24" height="12" rx="3"
        stroke="var(--tn-text-3)" strokeWidth="1.2" fill="var(--tn-bg-2)" />
      <line x1="100" y1="36" x2="100" y2="52" stroke="var(--tn-text-3)" strokeWidth="1.2" />

      {/* Swivel joint */}
      <circle cx="100" cy="55" r="7" stroke="var(--tn-accent)" strokeWidth="1.5" fill="var(--tn-bg-3)" />
      <circle cx="100" cy="55" r="3" fill="var(--tn-accent)" opacity="0.7" />

      {/* Camera arm */}
      <line x1="100" y1="62" x2="100" y2="76" stroke="var(--tn-text-3)" strokeWidth="2" />

      {/* Camera body */}
      <rect x="58" y="76" width="84" height="50" rx="6"
        stroke="var(--tn-accent)" strokeWidth="1.5" fill="var(--tn-bg-2)" />
      {/* Body detail line */}
      <line x1="124" y1="76" x2="124" y2="126" stroke="var(--tn-text-3)" strokeWidth="1" opacity="0.5" />

      {/* Lens housing */}
      <circle cx="88" cy="101" r="20" stroke="var(--tn-accent)" strokeWidth="1.5" fill="var(--tn-bg-3)" />
      <circle cx="88" cy="101" r="14" stroke="var(--tn-text-3)" strokeWidth="1" fill="var(--tn-bg-2)" />
      <circle cx="88" cy="101" r="8" fill="var(--tn-bg-3)" stroke="var(--tn-accent)" strokeWidth="1" />
      <circle cx="88" cy="101" r="4" fill="var(--tn-accent)" opacity="0.8" />
      {/* Lens highlight */}
      <circle cx="85" cy="98" r="2" fill="var(--tn-text)" opacity="0.2" />

      {/* IR LEDs */}
      {[0,1,2].map(i => (
        <circle key={i} cx={132} cy={88 + i * 12} r="3"
          fill="var(--tn-accent)" opacity={0.4 + i * 0.2} />
      ))}

      {/* Status LED */}
      <circle cx="132" cy="88" r="3" fill="var(--tn-accent)" opacity="0.9" />

      {/* Vision cone */}
      <path
        d="M68 121 L30 155 L146 155 L108 121 Z"
        fill="var(--tn-accent)" fillOpacity="0.05"
        stroke="var(--tn-accent)" strokeWidth="0.8" strokeOpacity="0.15"
      />

      {/* Motion detection grid dots */}
      {[
        [45, 144], [70, 144], [95, 144], [120, 144],
        [55, 160], [80, 160], [105, 160], [130, 160],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.5" fill="var(--tn-accent)" opacity="0.3" />
      ))}
    </svg>
  )
}

// ─── Cloud: Server + Cloud Hybrid ────────────────────────────────────────────
function CloudIllus() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="100%" height="100%" style={{ display: 'block' }}>
      {/* Cloud shape */}
      <path
        d="M68 88 C58 88 50 80 50 70 C50 60 58 52 68 52 C70 44 78 38 88 38 C94 38 100 41 104 46 C108 40 116 36 126 36 C142 36 156 50 156 66 C156 78 148 88 138 88 Z"
        stroke="var(--tn-accent)" strokeWidth="1.5" fill="var(--tn-bg-2)"
      />
      {/* Cloud glow */}
      <path
        d="M68 88 C58 88 50 80 50 70 C50 60 58 52 68 52 C70 44 78 38 88 38 C94 38 100 41 104 46 C108 40 116 36 126 36 C142 36 156 50 156 66 C156 78 148 88 138 88 Z"
        fill="var(--tn-accent)" opacity="0.05"
      />

      {/* Connection lines cloud → server */}
      <line x1="88" y1="88" x2="88" y2="108" stroke="var(--tn-accent)" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
      <line x1="100" y1="88" x2="100" y2="108" stroke="var(--tn-accent)" strokeWidth="1" strokeDasharray="3 3" opacity="0.8" />
      <line x1="112" y1="88" x2="112" y2="108" stroke="var(--tn-accent)" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />

      {/* Upload packet dots */}
      <circle cx="88" cy="98" r="2.5" fill="var(--tn-accent)" opacity="0.7" />
      <circle cx="112" cy="94" r="2.5" fill="var(--tn-accent)" opacity="0.5" />

      {/* On-prem server */}
      <rect x="52" y="108" width="96" height="64" rx="4"
        stroke="var(--tn-text-3)" strokeWidth="1.2" fill="var(--tn-bg-2)" />

      {/* Server unit 1 */}
      <rect x="58" y="114" width="84" height="18" rx="2"
        stroke="var(--tn-accent)" strokeWidth="1.2" fill="var(--tn-bg-3)" />
      <circle cx="128" cy="123" r="2.5" fill="var(--tn-accent)" opacity="0.9" />
      <circle cx="120" cy="123" r="2.5" fill="var(--tn-accent)" opacity="0.5" />
      <rect x="64" y="118" width="36" height="10" rx="1.5"
        stroke="var(--tn-text-3)" strokeWidth="0.8" fill="var(--tn-bg-2)" />

      {/* Server unit 2 */}
      <rect x="58" y="138" width="84" height="18" rx="2"
        stroke="var(--tn-text-3)" strokeWidth="1" fill="var(--tn-bg-3)" />
      <circle cx="128" cy="147" r="2.5" fill="var(--tn-accent)" opacity="0.4" />
      <circle cx="120" cy="147" r="2.5" fill="var(--tn-accent)" opacity="0.6" />
      <rect x="64" y="142" width="36" height="10" rx="1.5"
        stroke="var(--tn-text-3)" strokeWidth="0.8" fill="var(--tn-bg-2)" />

      {/* Port row at bottom */}
      {[0,1,2,3,4,5].map(i => (
        <rect key={i} x={58 + i * 12} y="162" width="8" height="6" rx="1"
          stroke="var(--tn-accent)" strokeWidth="0.8" fill="var(--tn-bg-3)" opacity="0.6" />
      ))}
    </svg>
  )
}

// ─── Power: UPS Unit ──────────────────────────────────────────────────────────
function PowerIllus() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="100%" height="100%" style={{ display: 'block' }}>
      {/* UPS body */}
      <rect x="42" y="44" width="116" height="130" rx="6"
        stroke="var(--tn-text-3)" strokeWidth="1.5" fill="var(--tn-bg-2)" />

      {/* Display panel */}
      <rect x="52" y="54" width="96" height="44" rx="4"
        stroke="var(--tn-accent)" strokeWidth="1.2" fill="var(--tn-bg-3)" />
      {/* Display screen */}
      <rect x="58" y="60" width="84" height="32" rx="2"
        fill="var(--tn-bg)" opacity="0.8" />

      {/* Waveform on display */}
      <polyline
        points="62,82 68,72 74,78 80,66 86,76 92,70 98,76 104,66 110,72 116,76 122,68 128,76 134,76 138,76"
        stroke="var(--tn-accent)" strokeWidth="1.5" fill="none"
      />

      {/* Status indicators */}
      <circle cx="64" cy="106" r="4" fill="var(--tn-accent)" opacity="0.9" />
      <circle cx="78" cy="106" r="4" fill="var(--tn-accent)" opacity="0.4" />
      <circle cx="92" cy="106" r="4" fill="var(--tn-accent)" opacity="0.6" />

      {/* Battery bars section */}
      <rect x="116" y="100" width="26" height="14" rx="2"
        stroke="var(--tn-text-3)" strokeWidth="1" fill="var(--tn-bg-3)" />
      {/* Battery bars — 4 bars, 3 filled */}
      {[0,1,2,3].map(i => (
        <rect key={i} x={119 + i * 5} y="103" width="3" height="8" rx="1"
          fill={i < 3 ? 'var(--tn-accent)' : 'none'}
          stroke={i < 3 ? 'none' : 'var(--tn-text-3)'}
          strokeWidth="0.8"
          opacity={i < 3 ? 0.8 - i * 0.1 : 0.4}
        />
      ))}
      {/* Battery nub */}
      <rect x="142" y="104" width="3" height="6" rx="1" fill="var(--tn-text-3)" opacity="0.5" />

      {/* Lightning bolt */}
      <path
        d="M103 116 L96 134 L101 134 L97 152 L111 130 L105 130 L111 116 Z"
        fill="var(--tn-accent)" opacity="0.85"
      />

      {/* Outlet row */}
      <rect x="52" y="158" width="96" height="10" rx="2"
        stroke="var(--tn-text-3)" strokeWidth="1" fill="var(--tn-bg-3)" />
      {[0,1,2,3,4].map(i => (
        <g key={i}>
          <rect x={56 + i * 18} y="161" width="5" height="4" rx="0.5"
            stroke="var(--tn-text-3)" strokeWidth="0.8" fill="var(--tn-bg)" opacity="0.6" />
          <rect x={63 + i * 18} y="161" width="5" height="4" rx="0.5"
            stroke="var(--tn-text-3)" strokeWidth="0.8" fill="var(--tn-bg)" opacity="0.6" />
        </g>
      ))}

      {/* Cooling vents */}
      {[0,1,2,3,4].map(i => (
        <line key={i} x1="52" y1={144 + i * 3} x2="90" y2={144 + i * 3}
          stroke="var(--tn-text-3)" strokeWidth="0.8" opacity="0.3" />
      ))}
    </svg>
  )
}

// ─── Hardware: Workstation + Monitor ─────────────────────────────────────────
function HardwareIllus() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="100%" height="100%" style={{ display: 'block' }}>
      {/* Monitor */}
      <rect x="50" y="22" width="100" height="72" rx="4"
        stroke="var(--tn-accent)" strokeWidth="1.5" fill="var(--tn-bg-2)" />
      {/* Screen */}
      <rect x="56" y="28" width="88" height="60" rx="2"
        fill="var(--tn-bg)" />
      {/* Screen content — terminal lines */}
      <line x1="62" y1="40" x2="108" y2="40" stroke="var(--tn-accent)" strokeWidth="1" opacity="0.7" />
      <line x1="62" y1="50" x2="96" y2="50" stroke="var(--tn-text-3)" strokeWidth="1" opacity="0.6" />
      <line x1="62" y1="60" x2="114" y2="60" stroke="var(--tn-text-3)" strokeWidth="1" opacity="0.4" />
      <line x1="62" y1="70" x2="88" y2="70" stroke="var(--tn-accent)" strokeWidth="1" opacity="0.6" />
      {/* Cursor blink */}
      <rect x="90" y="66" width="6" height="8" rx="1" fill="var(--tn-accent)" opacity="0.8" />

      {/* Monitor stand neck */}
      <rect x="94" y="94" width="12" height="16" rx="2"
        stroke="var(--tn-text-3)" strokeWidth="1" fill="var(--tn-bg-2)" />
      {/* Stand base */}
      <rect x="74" y="110" width="52" height="8" rx="3"
        stroke="var(--tn-text-3)" strokeWidth="1" fill="var(--tn-bg-2)" />

      {/* Tower case */}
      <rect x="56" y="122" width="40" height="60" rx="4"
        stroke="var(--tn-text-3)" strokeWidth="1.2" fill="var(--tn-bg-2)" />

      {/* Power button */}
      <circle cx="76" cy="132" r="5" stroke="var(--tn-accent)" strokeWidth="1.2" fill="var(--tn-bg-3)" />
      <path d="M76 128 L76 132" stroke="var(--tn-accent)" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M73 129.5 C71 131 70 133 70 135.5 C70 139 73 142 76 142 C79 142 82 139 82 135.5 C82 133 81 131 79 129.5"
        stroke="var(--tn-accent)" strokeWidth="1.2" strokeLinecap="round" fill="none" />

      {/* Drive bays */}
      <rect x="62" y="146" width="28" height="8" rx="1.5"
        stroke="var(--tn-text-3)" strokeWidth="0.8" fill="var(--tn-bg-3)" />
      <rect x="62" y="158" width="28" height="8" rx="1.5"
        stroke="var(--tn-text-3)" strokeWidth="0.8" fill="var(--tn-bg-3)" />
      <rect x="62" y="170" width="28" height="6" rx="1.5"
        stroke="var(--tn-text-3)" strokeWidth="0.8" fill="var(--tn-bg-3)" />

      {/* Vents */}
      {[0,1,2,3].map(i => (
        <line key={i} x1="96" y1={130 + i * 6} x2="140" y2={130 + i * 6}
          stroke="var(--tn-text-3)" strokeWidth="0.8" opacity="0.3" />
      ))}

      {/* USB ports */}
      <rect x="96" y="154" width="8" height="5" rx="1"
        stroke="var(--tn-accent)" strokeWidth="0.8" fill="var(--tn-bg-3)" opacity="0.7" />
      <rect x="108" y="154" width="8" height="5" rx="1"
        stroke="var(--tn-accent)" strokeWidth="0.8" fill="var(--tn-bg-3)" opacity="0.5" />

      {/* Status LED */}
      <circle cx="104" cy="168" r="3" fill="var(--tn-accent)" opacity="0.85" />
    </svg>
  )
}

// ─── Illustration map ─────────────────────────────────────────────────────────

const ILLUSTRATION_MAP: Record<ServiceIllustrationKey, () => React.ReactElement> = {
  'network':        NetworkIllus,
  'cybersecurity':  CybersecurityIllus,
  'smart-security': SmartSecurityIllus,
  'cloud':          CloudIllus,
  'power':          PowerIllus,
  'hardware':       HardwareIllus,
}

interface ServiceIllustrationProps {
  type: ServiceIllustrationKey
  className?: string
}

export function ServiceIllustration({ type, className }: ServiceIllustrationProps) {
  const Component = ILLUSTRATION_MAP[type]
  return (
    <div
      className={className}
      style={{
        width: '100%',
        height: '100%',
        padding: '20px',
        boxSizing: 'border-box',
      }}
    >
      <Component />
    </div>
  )
}
