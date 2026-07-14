import type { NextRequest } from 'next/server'
import { insertEvent } from '@/lib/db'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const VALID_TYPES = new Set(['pageview', 'click'])
const VALID_TARGETS = new Set(['pay', 'telegram', 'instagram', 'contact', 'learn', 'more'])

// Fire-and-forget analytics sink. Always answers 204 — a tracking beacon must
// never surface an error to the visitor, and we don't leak whether it stored.
export async function POST(req: NextRequest): Promise<Response> {
  try {
    const body = await req.json().catch(() => null)
    if (!body || !VALID_TYPES.has(body.type)) return new Response(null, { status: 204 })

    const visitorId = String(body.visitorId || '').slice(0, 64)
    const sessionId = String(body.sessionId || '').slice(0, 64)
    if (!visitorId || !sessionId) return new Response(null, { status: 204 })

    const target =
      body.type === 'click'
        ? VALID_TARGETS.has(body.target)
          ? String(body.target)
          : 'other'
        : null
    const path = typeof body.path === 'string' ? body.path.slice(0, 200) : null

    await insertEvent({ type: body.type, target, visitorId, sessionId, path })
  } catch {
    // swallow
  }
  return new Response(null, { status: 204 })
}
