// One-time schema setup for the Turso analytics DB.
// Run once (creates the `events` table + indexes in the remote DB, which all
// Vercel environments share):
//   node --env-file=.env.local scripts/init-db.mjs
import { createClient } from '@libsql/client/web'

const url = process.env.TURSO_DATABASE_URL
const authToken = process.env.TURSO_AUTH_TOKEN

if (!url || url.includes('PASTE_')) {
  console.error('✖ TURSO_DATABASE_URL is missing (fill web/.env.local first).')
  process.exit(1)
}

const db = createClient({ url, authToken })

await db.batch(
  [
    `CREATE TABLE IF NOT EXISTS events (
       id         INTEGER PRIMARY KEY AUTOINCREMENT,
       type       TEXT    NOT NULL,          -- 'pageview' | 'click'
       target     TEXT,                      -- for clicks: pay/telegram/instagram/contact
       visitor_id TEXT    NOT NULL,          -- anonymous, first-party (localStorage)
       session_id TEXT    NOT NULL,          -- per tab session (sessionStorage)
       path       TEXT,
       created_at INTEGER NOT NULL           -- epoch ms (UTC)
     )`,
    `CREATE INDEX IF NOT EXISTS idx_events_created ON events (created_at)`,
    `CREATE INDEX IF NOT EXISTS idx_events_type_created ON events (type, created_at)`,
    `CREATE INDEX IF NOT EXISTS idx_events_session ON events (session_id)`,
  ],
  'write',
)

const { rows } = await db.execute('SELECT COUNT(*) AS n FROM events')
console.log(`✓ Schema ready. events rows: ${rows[0].n}`)
