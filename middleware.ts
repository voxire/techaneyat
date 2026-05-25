import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Passthrough middleware — no locale routing yet.
// Phase 7 will replace this with next-intl's createMiddleware
// when all routes are unified under app/[locale]/.
export function middleware(_request: NextRequest) {
  return NextResponse.next()
}

// Only run on app routes — skip static files and API
export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)'],
}
