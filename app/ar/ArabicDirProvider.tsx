'use client'

import { useEffect } from 'react'

// Sets dir="rtl" and lang="ar" on <html> while on any /ar route.
// Restores defaults on unmount so EN routes are unaffected.
export function ArabicDirProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const html = document.documentElement
    html.setAttribute('dir', 'rtl')
    html.setAttribute('lang', 'ar')
    return () => {
      html.setAttribute('dir', 'ltr')
      html.setAttribute('lang', 'en')
    }
  }, [])
  return <>{children}</>
}
