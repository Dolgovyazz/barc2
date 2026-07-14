import Link from 'next/link'
import {
  getMetrics,
  getSeries,
  RANGES,
  METRIC_LABELS,
  type Range,
  type MetricKey,
  type Metrics,
  type SeriesPoint,
} from '@/lib/db'
import { LogoutButton } from './logout-button'
import { MetricChart } from './metric-chart'
import { ResetButton } from './reset-button'

export const dynamic = 'force-dynamic'

const RANGE_KEYS = new Set<Range>(RANGES.map((r) => r.key))
const METRIC_KEYS = new Set<MetricKey>(['visits', 'unique', 'bounces', 'subscribe'])

const COLORS: Record<MetricKey, string> = {
  visits: '#3d8bff',
  unique: '#35c2ff',
  bounces: '#ff8f6b',
  subscribe: '#4fd08a',
}

function fmt(n: number): string {
  return n.toLocaleString('ru-RU')
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ range?: string; metric?: string }>
}) {
  const sp = await searchParams
  const range: Range = RANGE_KEYS.has(sp.range as Range) ? (sp.range as Range) : '7d'
  const metric: MetricKey | null = METRIC_KEYS.has(sp.metric as MetricKey)
    ? (sp.metric as MetricKey)
    : null

  let metrics: Metrics | null = null
  let series: SeriesPoint[] | null = null
  let dbError = false
  try {
    metrics = await getMetrics(range)
    if (metric) series = await getSeries(metric, range)
  } catch {
    dbError = true
  }

  const cards: { key: MetricKey; label: string; value: number; hint: string }[] = metrics
    ? [
        { key: 'visits', label: 'Всего посещений', value: metrics.totalVisits, hint: 'все загрузки страницы' },
        { key: 'unique', label: 'Без повторных заходов', value: metrics.uniqueVisitors, hint: 'уникальные посетители' },
        { key: 'bounces', label: 'Отказы', value: metrics.bounces, hint: `${metrics.bounceRate}% — зашли и ушли` },
        { key: 'subscribe', label: 'Клики «Перейти к оплате»', value: metrics.subscribeClicks, hint: 'отправлено на оплату Tribute' },
      ]
    : []

  const rangeQ = (r: Range) => `/admin?range=${r}${metric ? `&metric=${metric}` : ''}`
  const selected = cards.find((c) => c.key === metric)

  return (
    <main
      style={{
        minHeight: '100dvh',
        padding: '32px 20px 64px',
        background: 'var(--bg-base, #000)',
        color: 'var(--text-primary, #fff)',
      }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: '.admin-card{cursor:pointer}.admin-card:hover{transform:translateY(-3px)}',
        }}
      />
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
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

        {/* Range tabs (keep the selected metric) */}
        <nav style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
          {RANGES.map((r) => {
            const active = r.key === range
            return (
              <Link
                key={r.key}
                href={rangeQ(r.key)}
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
            Не удалось прочитать базу. Проверь переменные <code>TURSO_DATABASE_URL</code> и{' '}
            <code>TURSO_AUTH_TOKEN</code> и что таблица создана (
            <code>node --env-file=.env.local scripts/init-db.mjs</code>).
          </div>
        ) : (
          <>
            {/* Clickable metric cards — click to toggle the chart below */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '16px',
              }}
            >
              {cards.map((c) => {
                const isSel = c.key === metric
                const color = COLORS[c.key]
                return (
                  <Link
                    key={c.key}
                    href={isSel ? `/admin?range=${range}` : `/admin?range=${range}&metric=${c.key}`}
                    className="admin-card"
                    style={{
                      display: 'block',
                      textDecoration: 'none',
                      color: 'inherit',
                      padding: '22px',
                      borderRadius: '16px',
                      background: 'rgba(10, 22, 46, 0.55)',
                      border: `1px solid ${isSel ? color : 'rgba(120,170,255,0.18)'}`,
                      boxShadow: isSel ? `0 0 0 1px ${color}, 0 8px 30px rgba(0,0,0,0.35)` : 'none',
                      transition: 'transform 0.15s ease, border-color 0.15s ease',
                    }}
                  >
                    <div style={{ fontSize: '13px', color: 'var(--text-muted, #7a9cc4)' }}>{c.label}</div>
                    <div style={{ fontSize: '34px', fontWeight: 800, margin: '6px 0 4px', lineHeight: 1.1 }}>
                      {fmt(c.value)}
                    </div>
                    <div style={{ fontSize: '12px', color: isSel ? color : 'var(--text-label, #3a5a8a)' }}>
                      {isSel ? '▲ скрыть график' : `${c.hint} · ▾ график`}
                    </div>
                  </Link>
                )
              })}
            </div>

            {/* Chart for the selected metric */}
            {metric && selected && series && (
              <section
                style={{
                  marginTop: '20px',
                  padding: '20px 20px 12px',
                  borderRadius: '16px',
                  background: 'rgba(10, 22, 46, 0.55)',
                  border: '1px solid rgba(120,170,255,0.18)',
                }}
              >
                <header
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                    gap: '12px',
                    marginBottom: '14px',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '12px', color: 'var(--text-label, #3a5a8a)' }}>
                      График по времени · {RANGES.find((r) => r.key === range)?.label.toLowerCase()}
                    </div>
                    <div style={{ fontSize: '16px', fontWeight: 700, marginTop: '2px' }}>
                      {METRIC_LABELS[metric]}{' '}
                      <span style={{ color: COLORS[metric] }}>· {fmt(selected.value)}</span>
                    </div>
                  </div>
                  <Link
                    href={`/admin?range=${range}`}
                    aria-label="Закрыть график"
                    style={{
                      flexShrink: 0,
                      width: '30px',
                      height: '30px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      color: 'var(--text-muted, #7a9cc4)',
                      border: '1px solid rgba(120,170,255,0.22)',
                      fontSize: '16px',
                      lineHeight: 1,
                    }}
                  >
                    ✕
                  </Link>
                </header>
                <MetricChart data={series} color={COLORS[metric]} />
                <p
                  style={{
                    fontSize: '11px',
                    color: 'var(--text-label, #3a5a8a)',
                    margin: '6px 0 0',
                  }}
                >
                  {range === 'today' ? 'по часам (UTC)' : 'по дням (UTC)'} · наведи на столбик, чтобы
                  увидеть точное число
                </p>
              </section>
            )}

            <p style={{ fontSize: '12px', color: 'var(--text-label, #3a5a8a)', marginTop: '20px', lineHeight: 1.6 }}>
              «Клики к оплате» — сколько раз нажали «Перейти к оплате» (отправка на Tribute), а не
              число реальных оплат: оплату подтверждает только Tribute/бот. «Отказ» — уникальный
              посетитель, который зашёл, но не кликнул ни по одной ссылке наружу.
            </p>

            <div
              style={{
                marginTop: '28px',
                paddingTop: '18px',
                borderTop: '1px solid rgba(120,170,255,0.12)',
              }}
            >
              <ResetButton />
            </div>
          </>
        )}
      </div>
    </main>
  )
}
