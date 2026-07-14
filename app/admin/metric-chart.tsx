import type { SeriesPoint } from '@/lib/db'

// Round a max value up to a "nice" axis top (1/2/5 × 10ⁿ).
function niceCeil(v: number): number {
  if (v <= 0) return 1
  const pow = 10 ** Math.floor(Math.log10(v))
  const f = v / pow
  const nice = f <= 1 ? 1 : f <= 2 ? 2 : f <= 5 ? 5 : 10
  return nice * pow
}

// Dependency-free SVG bar chart: count (y) over time (x). Bars carry a native
// <title> tooltip. Baseline is always 0 so heights read honestly.
export function MetricChart({ data, color }: { data: SeriesPoint[]; color: string }) {
  const W = 720
  const H = 250
  const padL = 34
  const padR = 10
  const padT = 14
  const padB = 30
  const innerW = W - padL - padR
  const innerH = H - padT - padB

  const total = data.reduce((s, d) => s + d.count, 0)
  const rawMax = Math.max(0, ...data.map((d) => d.count))
  const top = niceCeil(rawMax)
  const n = Math.max(1, data.length)
  const gap = n > 45 ? 1 : n > 22 ? 2 : 4
  const barW = Math.max(1, (innerW - gap * (n - 1)) / n)
  const labelEvery = Math.ceil(n / 8)
  const gid = `bar-${color.replace('#', '')}`

  const yTicks = [0, top / 2, top]

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      role="img"
      aria-label="График метрики по времени"
      style={{ display: 'block', overflow: 'visible' }}
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.95" />
          <stop offset="100%" stopColor={color} stopOpacity="0.4" />
        </linearGradient>
      </defs>

      {/* horizontal gridlines + y labels */}
      {yTicks.map((t, i) => {
        const y = padT + innerH - (t / top) * innerH
        return (
          <g key={i}>
            <line
              x1={padL}
              y1={y}
              x2={W - padR}
              y2={y}
              stroke="rgba(120,170,255,0.14)"
              strokeWidth="1"
            />
            <text
              x={padL - 6}
              y={y + 3}
              textAnchor="end"
              fontSize="10"
              fill="#3a5a8a"
            >
              {Math.round(t)}
            </text>
          </g>
        )
      })}

      {/* bars */}
      {data.map((d, i) => {
        const h = d.count > 0 ? Math.max(2, (d.count / top) * innerH) : 0
        const x = padL + i * (barW + gap)
        const y = padT + innerH - h
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width={barW}
            height={h}
            rx={Math.min(2, barW / 2)}
            fill={`url(#${gid})`}
          >
            <title>
              {d.label}: {d.count}
            </title>
          </rect>
        )
      })}

      {/* x labels (thinned to avoid crowding) */}
      {data.map((d, i) =>
        i % labelEvery === 0 ? (
          <text
            key={`l${i}`}
            x={padL + i * (barW + gap) + barW / 2}
            y={H - padB + 16}
            textAnchor="middle"
            fontSize="10"
            fill="#3a5a8a"
          >
            {d.label}
          </text>
        ) : null,
      )}

      {total === 0 && (
        <text x={W / 2} y={padT + innerH / 2} textAnchor="middle" fontSize="13" fill="#3a5a8a">
          Нет данных за выбранный период
        </text>
      )}
    </svg>
  )
}
