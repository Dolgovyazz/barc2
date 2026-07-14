import { createClient, type Client } from '@libsql/client/web'

// Lazy singleton so importing this module never throws at build time (env is
// only guaranteed at request time on Vercel). The `/web` entry is the pure-HTTP
// libSQL client — no native deps, works in Node serverless functions.
let _db: Client | null = null

function getDb(): Client {
  if (_db) return _db
  const url = process.env.TURSO_DATABASE_URL
  if (!url) throw new Error('TURSO_DATABASE_URL is not set')
  _db = createClient({ url, authToken: process.env.TURSO_AUTH_TOKEN })
  return _db
}

// A single analytics event. `type='pageview'` has no target; `type='click'`
// carries which outbound link was clicked (pay/telegram/instagram/contact).
export type EventType = 'pageview' | 'click'

// Clicks that count as "the visitor went somewhere" (i.e. NOT a bounce).
export const OUTBOUND_TARGETS = ['pay', 'telegram', 'instagram', 'contact'] as const

export async function insertEvent(e: {
  type: EventType
  target?: string | null
  visitorId: string
  sessionId: string
  path?: string | null
}): Promise<void> {
  await getDb().execute({
    sql: `INSERT INTO events (type, target, visitor_id, session_id, path, created_at)
          VALUES (?, ?, ?, ?, ?, ?)`,
    args: [e.type, e.target ?? null, e.visitorId, e.sessionId, e.path ?? null, Date.now()],
  })
}

export type Range = 'today' | '7d' | '30d' | 'all'
export const RANGES: { key: Range; label: string }[] = [
  { key: 'today', label: 'Сегодня' },
  { key: '7d', label: '7 дней' },
  { key: '30d', label: '30 дней' },
  { key: 'all', label: 'Всё время' },
]

function sinceMs(range: Range): number {
  const now = Date.now()
  if (range === 'today') {
    const d = new Date()
    d.setUTCHours(0, 0, 0, 0)
    return d.getTime()
  }
  if (range === '7d') return now - 7 * 86_400_000
  if (range === '30d') return now - 30 * 86_400_000
  return 0
}

function num(v: unknown): number {
  return typeof v === 'number' ? v : Number(v ?? 0)
}

export type Metrics = {
  totalVisits: number
  uniqueVisitors: number
  sessions: number
  bounces: number
  bounceRate: number
  subscribeClicks: number
}

export async function getMetrics(range: Range): Promise<Metrics> {
  const db = getDb()
  const since = sinceMs(range)
  const outPlaceholders = OUTBOUND_TARGETS.map(() => '?').join(',')

  const [totals, uniques, sessions, bounces, subs] = await Promise.all([
    db.execute({
      sql: `SELECT COUNT(*) AS n FROM events WHERE type='pageview' AND created_at >= ?`,
      args: [since],
    }),
    db.execute({
      sql: `SELECT COUNT(DISTINCT visitor_id) AS n FROM events WHERE type='pageview' AND created_at >= ?`,
      args: [since],
    }),
    db.execute({
      sql: `SELECT COUNT(DISTINCT session_id) AS n FROM events WHERE type='pageview' AND created_at >= ?`,
      args: [since],
    }),
    // Bounce = a session that had a pageview but never clicked any outbound link
    // ("зашли, никуда не перешли").
    db.execute({
      sql: `SELECT COUNT(*) AS n FROM (
              SELECT DISTINCT session_id FROM events
              WHERE type='pageview' AND created_at >= ?
            ) pv
            WHERE pv.session_id NOT IN (
              SELECT session_id FROM events
              WHERE type='click' AND target IN (${outPlaceholders}) AND created_at >= ?
            )`,
      args: [since, ...OUTBOUND_TARGETS, since],
    }),
    db.execute({
      sql: `SELECT COUNT(*) AS n FROM events WHERE type='click' AND target='pay' AND created_at >= ?`,
      args: [since],
    }),
  ])

  const sessionCount = num(sessions.rows[0].n)
  const bounceCount = num(bounces.rows[0].n)
  return {
    totalVisits: num(totals.rows[0].n),
    uniqueVisitors: num(uniques.rows[0].n),
    sessions: sessionCount,
    bounces: bounceCount,
    bounceRate: sessionCount ? Math.round((bounceCount / sessionCount) * 100) : 0,
    subscribeClicks: num(subs.rows[0].n),
  }
}
