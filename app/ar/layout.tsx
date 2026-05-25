// Arabic locale layout: RTL direction wrapper
// Wraps all /ar routes with dir="rtl" lang="ar" so RTL CSS overrides apply.
// Root <html> and <body> remain in app/layout.tsx — this is a nested layout.

export default function ArabicLayout({ children }: { children: React.ReactNode }) {
  return (
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
  )
}
