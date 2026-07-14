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

// ── Time series (per-day, or per-hour for the "today" range) for one metric ──

export type MetricKey = 'visits' | 'unique' | 'bounces' | 'subscribe'

export const METRIC_LABELS: Record<MetricKey, string> = {
  visits: 'Всего посещений',
  unique: 'Без повторных заходов',
  bounces: 'Отказы',
  subscribe: 'Клики «Перейти к оплате»',
}

export type SeriesPoint = { label: string; count: number }

function floorToDay(ms: number): number {
  const d = new Date(ms)
  d.setUTCHours(0, 0, 0, 0)
  return d.getTime()
}
function floorToHour(ms: number): number {
  const d = new Date(ms)
  d.setUTCMinutes(0, 0, 0)
  return d.getTime()
}

export async function getSeries(metric: MetricKey, range: Range): Promise<SeriesPoint[]> {
  const db = getDb()
  const byHour = range === 'today'
  const fmt = byHour ? '%Y-%m-%dT%H' : '%Y-%m-%d'
  const bucket = (col: string) => `strftime('${fmt}', ${col} / 1000, 'unixepoch')`

  let since = sinceMs(range)
  if (range === 'all') {
    const min = await db.execute(`SELECT MIN(created_at) AS m FROM events`)
    const m = min.rows[0]?.m
    since = m ? Number(m) : Date.now()
    const cap = Date.now() - 90 * 86_400_000 // keep at most ~90 daily bars
    if (since < cap) since = cap
  }

  let raw: { bucket: string; n: number }[]
  if (metric === 'bounces') {
    const out = OUTBOUND_TARGETS.map(() => '?').join(',')
    const r = await db.execute({
      sql: `SELECT ${bucket('first_ts')} AS bucket, COUNT(*) AS n FROM (
              SELECT session_id, MIN(created_at) AS first_ts
              FROM events WHERE type='pageview' AND created_at >= ?
              GROUP BY session_id
            )
            WHERE session_id NOT IN (
              SELECT session_id FROM events
              WHERE type='click' AND target IN (${out}) AND created_at >= ?
            )
            GROUP BY bucket`,
      args: [since, ...OUTBOUND_TARGETS, since],
    })
    raw = r.rows.map((x) => ({ bucket: String(x.bucket), n: num(x.n) }))
  } else {
    const where = metric === 'subscribe' ? `type='click' AND target='pay'` : `type='pageview'`
    const agg = metric === 'unique' ? `COUNT(DISTINCT visitor_id)` : `COUNT(*)`
    const r = await db.execute({
      sql: `SELECT ${bucket('created_at')} AS bucket, ${agg} AS n
            FROM events WHERE ${where} AND created_at >= ? GROUP BY bucket`,
      args: [since],
    })
    raw = r.rows.map((x) => ({ bucket: String(x.bucket), n: num(x.n) }))
  }

  // Fill empty buckets with 0 so the time axis has no gaps.
  const counts = new Map(raw.map((r) => [r.bucket, r.n]))
  const step = byHour ? 3_600_000 : 86_400_000
  const start = byHour ? floorToHour(since) : floorToDay(since)
  const points: SeriesPoint[] = []
  for (let t = start; t <= Date.now() && points.length < 200; t += step) {
    const iso = new Date(t).toISOString()
    const key = byHour ? iso.slice(0, 13) : iso.slice(0, 10)
    const label = byHour ? `${iso.slice(11, 13)}:00` : `${iso.slice(8, 10)}.${iso.slice(5, 7)}`
    points.push({ label, count: counts.get(key) ?? 0 })
  }
  return points
}
