import Link from 'next/link'
import { getMetrics, RANGES, type Range, type Metrics } from '@/lib/db'
import { LogoutButton } from './logout-button'

export const dynamic = 'force-dynamic'

const RANGE_KEYS = new Set<Range>(RANGES.map((r) => r.key))

function fmt(n: number): string {
  return n.toLocaleString('ru-RU')
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ range?: string }>
}) {
  const sp = await searchParams
  const range: Range = RANGE_KEYS.has(sp.range as Range) ? (sp.range as Range) : '7d'

  let metrics: Metrics | null = null
  let dbError = false
  try {
    metrics = await getMetrics(range)
  } catch {
    dbError = true
  }

  const cards = metrics
    ? [
        { label: 'Всего посещений', value: metrics.totalVisits, hint: 'все загрузки страницы' },
        { label: 'Без повторных заходов', value: metrics.uniqueVisitors, hint: 'уникальные посетители' },
        {
          label: 'Отказы',
          value: metrics.bounces,
          hint: `${metrics.bounceRate}% — зашли и ушли, никуда не перейдя`,
        },
        {
          label: 'Клики «Перейти к оплате»',
          value: metrics.subscribeClicks,
          hint: 'отправлено на оплату Tribute',
        },
      ]
    : []

  return (
    <main
      style={{
        minHeight: '100dvh',
        padding: '32px 20px 64px',
        background: 'var(--bg-base, #000)',
        color: 'var(--text-primary, #fff)',
      }}
    >
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        {/* Header */}
        <header
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            marginBottom: '24px',
            flexWrap: 'wrap',
          }}
        >
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 800 }}>BARCODE · Аналитика</h1>
            <p style={{ fontSize: '13px', color: 'var(--text-muted, #7a9cc4)', marginTop: '2px' }}>
              Статистика лендинга
            </p>
          </div>
          <LogoutButton />
        </header>

        {/* Range tabs */}
        <nav style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
          {RANGES.map((r) => {
            const active = r.key === range
            return (
              <Link
                key={r.key}
                href={`/admin?range=${r.key}`}
                style={{
                  padding: '8px 16px',
                  fontSize: '13px',
                  borderRadius: '999px',
                  textDecoration: 'none',
                  border: `1px solid ${active ? 'var(--accent-primary, #1a6fff)' : 'rgba(120,170,255,0.22)'}`,
                  background: active ? 'rgba(26,111,255,0.18)' : 'transparent',
                  color: active ? '#fff' : 'var(--text-muted, #7a9cc4)',
                }}
              >
                {r.label}
              </Link>
            )
          })}
        </nav>

        {dbError ? (
          <div
            style={{
              padding: '20px',
              borderRadius: '14px',
              border: '1px solid rgba(255,107,107,0.4)',
              background: 'rgba(255,107,107,0.08)',
              fontSize: '14px',
              lineHeight: 1.6,
            }}
          >
            Не удалось прочитать базу. Проверь, что заданы переменные окружения{' '}
            <code>TURSO_DATABASE_URL</code> и <code>TURSO_AUTH_TOKEN</code>, и что таблица создана
            (<code>node --env-file=.env.local scripts/init-db.mjs</code>).
          </div>
        ) : (
          <>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '16px',
              }}
            >
              {cards.map((c) => (
                <div
                  key={c.label}
                  style={{
                    padding: '22px',
                    borderRadius: '16px',
                    background: 'rgba(10, 22, 46, 0.55)',
                    border: '1px solid rgba(120,170,255,0.18)',
                  }}
                >
                  <div style={{ fontSize: '13px', color: 'var(--text-muted, #7a9cc4)' }}>{c.label}</div>
                  <div style={{ fontSize: '34px', fontWeight: 800, margin: '6px 0 4px', lineHeight: 1.1 }}>
                    {fmt(c.value)}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-label, #3a5a8a)' }}>{c.hint}</div>
                </div>
              ))}
            </div>

            <p style={{ fontSize: '12px', color: 'var(--text-label, #3a5a8a)', marginTop: '20px', lineHeight: 1.6 }}>
              «Клики к оплате» — сколько раз нажали «Перейти к оплате» (отправка на Tribute), а не
              число реальных оплат: оплату подтверждает только Tribute/бот. «Отказ» — сессия, где
              человек зашёл, но не кликнул ни по одной ссылке наружу.
            </p>
          </>
        )}
      </div>
    </main>
  )
}
