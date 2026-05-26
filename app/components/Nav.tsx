'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTheme } from '@/app/providers/ThemeProvider'

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
  const { theme, toggle } = useTheme()

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
          ? theme === 'dark'
            ? 'rgba(7,11,20,0.92)'
            : 'rgba(242,245,252,0.92)'
          : 'transparent',
        borderBottom: scrolled
          ? '1px solid var(--tn-border)'
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
          style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}
          aria-label="Techaneyat — Home"
        >
          <Image
            src="/brand/logo.png"
            alt="Techaneyat"
            width={240}
            height={38}
            style={{
              height: '38px',
              width: 'auto',
              objectFit: 'contain',
              // Dark mode: logo is dark charcoal — invert to white
              // Light mode: logo is dark charcoal — perfect as-is
              filter: theme === 'dark' ? 'brightness(0) invert(1)' : 'none',
              transition: 'filter 0.25s ease',
            }}
            priority
          />
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

            {/* Theme toggle: sun / moon */}
            <button
              onClick={toggle}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              style={{
                background: 'none',
                border: '1px solid var(--tn-border)',
                borderRadius: '4px',
                cursor: 'pointer',
                padding: '6px 8px',
                color: 'var(--tn-text-3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'color 0.2s ease, border-color 0.2s ease',
                lineHeight: 1,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget
                el.style.color = 'var(--tn-text)'
                el.style.borderColor = 'var(--tn-border-accent)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget
                el.style.color = 'var(--tn-text-3)'
                el.style.borderColor = 'var(--tn-border)'
              }}
            >
              {theme === 'dark' ? (
                /* Sun icon */
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4"/>
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
                </svg>
              ) : (
                /* Moon icon */
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>

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
