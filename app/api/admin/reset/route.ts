import { NextResponse, type NextRequest } from 'next/server'
import { SESSION_COOKIE, isValidSession } from '@/lib/auth'
import { resetEvents } from '@/lib/db'

export const runtime = 'nodejs'

// Wipe all analytics events. Gated by the admin session cookie (middleware only
// guards /admin pages, not /api, so we verify here).
export async function POST(req: NextRequest): Promise<Response> {
  const ok = await isValidSession(req.cookies.get(SESSION_COOKIE)?.value)
  if (!ok) return NextResponse.json({ ok: false }, { status: 401 })
  try {
    await resetEvents()
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
