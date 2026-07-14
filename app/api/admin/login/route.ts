import { NextResponse, type NextRequest } from 'next/server'
import { SESSION_COOKIE, createSessionToken } from '@/lib/auth'

export const runtime = 'nodejs'

export async function POST(req: NextRequest): Promise<Response> {
  const { password } = (await req.json().catch(() => ({}))) as { password?: string }
  if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ ok: false }, { status: 401 })
  }
  const res = NextResponse.json({ ok: true })
  res.cookies.set(SESSION_COOKIE, await createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 days
  })
  return res
}
