'use client'

import Link from 'next/link'

type FooterProps = {
  locale?: string
}

const serviceLinks = [
  { label: 'Network & Infrastructure', labelAr: 'الشبكات والبنية التحتية', slug: 'network' },
  { label: 'Cybersecurity', labelAr: 'الأمن السيبراني', slug: 'cybersecurity' },
  { label: 'Smart Security Systems', labelAr: 'أنظمة الأمن الذكي', slug: 'smart-security' },
  { label: 'Cloud & Managed Services', labelAr: 'الخدمات السحابية', slug: 'cloud' },
  { label: 'Energy & Power Continuity', labelAr: 'الطاقة واستمرارية الأعمال', slug: 'power' },
  { label: 'Computing & Hardware', labelAr: 'الأجهزة والحوسبة', slug: 'hardware' },
]

export function Footer({ locale = 'en' }: FooterProps) {
  const isAr = locale === 'ar'
  const basePath = isAr ? '/ar' : ''

  return (
    <footer
      style={{
        background: 'var(--tn-bg-2)',
        borderTop: '1px solid var(--tn-border)',
        padding: '64px 0 32px',
      }}
    >
      <div className="section-container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '48px',
            marginBottom: '48px',
          }}
        >
          {/* Brand column */}
          <div>
            <Link
              href={basePath || '/'}
              style={{
                fontFamily: 'var(--tn-font-display)',
                fontWeight: 700,
                fontSize: '20px',
                color: 'var(--tn-text)',
                textDecoration: 'none',
                letterSpacing: '-0.02em',
                display: 'block',
                marginBottom: '16px',
              }}
            >
              Techaneyat
            </Link>
            <p
              style={{
                color: 'var(--tn-text-3)',
                fontSize: '14px',
                lineHeight: 1.6,
                maxWidth: '280px',
              }}
            >
              {isAr
                ? 'شريك واحد. اتفاقية خدمة واحدة. كل نظام تقني تشغله مؤسستك.'
                : 'One partner. One SLA. Every infrastructure system your organization runs.'}
            </p>

            {/* Contact info */}
            <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <a
                href="mailto:Sales@techaneyat.com"
                style={{
                  color: 'var(--tn-text-2)',
                  fontSize: '13px',
                  textDecoration: 'none',
                  fontFamily: 'var(--tn-font-mono)',
                }}
              >
                Sales@techaneyat.com
              </a>
              <a
                href="tel:+96176100766"
                style={{
                  color: 'var(--tn-text-2)',
                  fontSize: '13px',
                  textDecoration: 'none',
                  fontFamily: 'var(--tn-font-mono)',
                }}
              >
                +961 76 100 766
              </a>
              <span style={{ color: 'var(--tn-text-3)', fontSize: '13px', fontFamily: 'var(--tn-font-mono)' }}>
                {isAr ? 'بيروت، لبنان' : 'Beirut, Lebanon'}
              </span>
            </div>
          </div>

          {/* Services column */}
          <div>
            <p
              style={{
                fontFamily: 'var(--tn-font-mono)',
                fontSize: '10px',
                fontWeight: 500,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--tn-text-3)',
                marginBottom: '20px',
              }}
            >
              {isAr ? 'الخدمات' : 'Services'}
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {serviceLinks.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`${basePath}/services/${service.slug}`}
                    style={{
                      color: 'var(--tn-text-2)',
                      fontSize: '14px',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      ;(e.target as HTMLAnchorElement).style.color = 'var(--tn-text)'
                    }}
                    onMouseLeave={(e) => {
                      ;(e.target as HTMLAnchorElement).style.color = 'var(--tn-text-2)'
                    }}
                  >
                    {isAr ? service.labelAr : service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div>
            <p
              style={{
                fontFamily: 'var(--tn-font-mono)',
                fontSize: '10px',
                fontWeight: 500,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--tn-text-3)',
                marginBottom: '20px',
              }}
            >
              {isAr ? 'الشركة' : 'Company'}
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { label: 'About', labelAr: 'من نحن', href: '/about' },
                { label: 'Case Studies', labelAr: 'دراسات الحالة', href: '/case-studies' },
                { label: 'Blog', labelAr: 'المدونة', href: '/blog' },
                { label: 'Contact', labelAr: 'تواصل معنا', href: '/contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={`${basePath}${link.href}`}
                    style={{
                      color: 'var(--tn-text-2)',
                      fontSize: '14px',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      ;(e.target as HTMLAnchorElement).style.color = 'var(--tn-text)'
                    }}
                    onMouseLeave={(e) => {
                      ;(e.target as HTMLAnchorElement).style.color = 'var(--tn-text-2)'
                    }}
                  >
                    {isAr ? link.labelAr : link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid var(--tn-border)',
            paddingTop: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            alignItems: 'flex-start',
          }}
        >
          <p style={{ color: 'var(--tn-text-3)', fontSize: '13px' }}>
            © 2025 Techaneyat Solutions. {isAr ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
          </p>
          <a
            href="https://www.linkedin.com/company/techaneyat"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'var(--tn-text-3)',
              fontSize: '13px',
              textDecoration: 'none',
              fontFamily: 'var(--tn-font-mono)',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              ;(e.target as HTMLAnchorElement).style.color = 'var(--tn-accent)'
            }}
            onMouseLeave={(e) => {
              ;(e.target as HTMLAnchorElement).style.color = 'var(--tn-text-3)'
            }}
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  )
}
