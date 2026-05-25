// Arabic locale layout: RTL direction wrapper
// Wraps all /ar routes with dir="rtl" lang="ar" so RTL CSS overrides apply.
// Root <html> and <body> remain in app/layout.tsx. This is a nested layout.
// ArabicDirProvider sets dir="rtl" on <html> client-side for full browser RTL.

import { ArabicDirProvider } from './ArabicDirProvider'

export default function ArabicLayout({ children }: { children: React.ReactNode }) {
  return (
    <ArabicDirProvider>
      <div
        lang="ar"
        dir="rtl"
        style={{
          fontFamily: 'var(--tn-font-arabic)',
          textAlign: 'right',
        }}
      >
        {children}
      </div>
    </ArabicDirProvider>
  )
}
