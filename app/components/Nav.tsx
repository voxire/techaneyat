'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type NavProps = {
  locale?: string
}

const navLinks = [
  { label: 'Services', labelAr: 'الخدمات', href: '/services' },
  { label: 'Case Studies', labelAr: 'دراسات الحالة', href: '/case-studies' },
  { label: 'About', labelAr: 'من نحن', href: '/about' },
  { label: 'Contact', labelAr: 'تواصل معنا', href: '/contact' },
]

export function Nav({ locale = 'en' }: NavProps) {
  const navRef = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const isAr = locale === 'ar'
  const basePath = isAr ? '/ar' : ''

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const linkLabel = (link: (typeof navLinks)[0]) =>
    isAr ? link.labelAr : link.label

  const hrefWithLocale = (href: string) => `${basePath}${href}`

  return (
    <header
      ref={navRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'background 0.3s ease, border-color 0.3s ease',
        background: scrolled
          ? 'rgba(7,11,20,0.92)'
          : 'transparent',
        borderBottom: scrolled
          ? '1px solid rgba(255,255,255,0.07)'
          : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
      }}
    >
      <div
        className="section-container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '64px',
        }}
      >
        {/* Logo */}
        <Link
          href={basePath || '/'}
          style={{
            fontFamily: 'var(--tn-font-display)',
            fontWeight: 700,
            fontSize: '18px',
            color: 'var(--tn-text)',
            textDecoration: 'none',
            letterSpacing: '-0.02em',
          }}
        >
          Techaneyat
        </Link>

        {/* Desktop nav */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
          }}
          aria-label="Main navigation"
        >
          <ul
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '28px',
              listStyle: 'none',
            }}
            className="hidden-mobile"
          >
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={hrefWithLocale(link.href)}
                  style={{
                    fontFamily: 'var(--tn-font-display)',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: 'var(--tn-text-2)',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    ;(e.target as HTMLAnchorElement).style.color =
                      'var(--tn-text)'
                  }}
                  onMouseLeave={(e) => {
                    ;(e.target as HTMLAnchorElement).style.color =
                      'var(--tn-text-2)'
                  }}
                >
                  {linkLabel(link)}
                </Link>
              </li>
            ))}
          </ul>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Language toggle */}
            <Link
              href={isAr ? '/' : '/ar'}
              style={{
                fontFamily: 'var(--tn-font-mono)',
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.1em',
                color: 'var(--tn-text-3)',
                textDecoration: 'none',
                padding: '6px 10px',
                border: '1px solid var(--tn-border)',
                borderRadius: '4px',
                transition: 'color 0.2s ease, border-color 0.2s ease',
              }}
            >
              {isAr ? 'EN' : 'ع'}
            </Link>

            {/* CTA */}
            <Link
              href={`${basePath}/contact`}
              className="btn-primary hidden-mobile"
              style={{ padding: '10px 20px', fontSize: '13px' }}
            >
              {isAr ? 'احصل على عرض' : 'Get a Quote'}
            </Link>

            {/* Mobile menu button */}
            <button
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px',
                color: 'var(--tn-text)',
                display: 'flex',
                flexDirection: 'column',
                gap: '5px',
              }}
              className="show-mobile"
            >
              <span
                style={{
                  display: 'block',
                  width: '22px',
                  height: '1.5px',
                  background: 'currentColor',
                  transition: 'transform 0.2s ease, opacity 0.2s ease',
                  transform: menuOpen
                    ? 'translateY(6.5px) rotate(45deg)'
                    : 'none',
                }}
              />
              <span
                style={{
                  display: 'block',
                  width: '22px',
                  height: '1.5px',
                  background: 'currentColor',
                  transition: 'opacity 0.2s ease',
                  opacity: menuOpen ? 0 : 1,
                }}
              />
              <span
                style={{
                  display: 'block',
                  width: '22px',
                  height: '1.5px',
                  background: 'currentColor',
                  transition: 'transform 0.2s ease',
                  transform: menuOpen
                    ? 'translateY(-6.5px) rotate(-45deg)'
                    : 'none',
                }}
              />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            background: 'rgba(7,11,20,0.97)',
            backdropFilter: 'blur(20px)',
            borderTop: '1px solid var(--tn-border)',
            padding: '24px',
          }}
        >
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={hrefWithLocale(link.href)}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontFamily: 'var(--tn-font-display)',
                    fontSize: '18px',
                    fontWeight: 600,
                    color: 'var(--tn-text)',
                    textDecoration: 'none',
                  }}
                >
                  {linkLabel(link)}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={`${basePath}/contact`}
                className="btn-primary"
                onClick={() => setMenuOpen(false)}
                style={{ display: 'inline-flex', marginTop: '8px' }}
              >
                {isAr ? 'احصل على عرض' : 'Get a Quote'}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
