import { NextResponse, type NextRequest } from 'next/server'
import { SESSION_COOKIE, isValidSession } from '@/lib/auth'

export async function middleware(req: NextRequest) {
  // The login page must stay reachable without a session.
  if (req.nextUrl.pathname.startsWith('/admin/login')) return NextResponse.next()

  const ok = await isValidSession(req.cookies.get(SESSION_COOKIE)?.value)
  if (!ok) {
    return NextResponse.redirect(new URL('/admin/login', req.url))
  }
  return NextResponse.next()
}

export const config = { matcher: ['/admin', '/admin/:path*'] }
