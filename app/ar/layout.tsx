// Arabic locale layout: RTL wrapper
// Note: <html> and <body> are in the root app/layout.tsx.
// RTL direction is applied via a wrapper div here.
// The root layout lang/dir attributes will be updated properly in Phase 7
// when we complete the full next-intl locale routing refactor.

export default function ArabicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div lang="ar" dir="rtl" style={{ fontFamily: 'var(--tn-font-body)' }}>
      {children}
    </div>
  )
}
