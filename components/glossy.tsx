'use client'

import { useId } from 'react'
import type { CSSProperties } from 'react'

/* Glossy 3D-looking sparkle/star — blue gradient body with a top-left
   sheen highlight. Glow + float come from globals.css (.glossy-star). */
export function GlossyStar({
  size = 80,
  className = '',
  style,
}: {
  size?: number
  className?: string
  style?: CSSProperties
}) {
  const uid = useId().replace(/:/g, '')
  const body = `body-${uid}`
  const sheen = `sheen-${uid}`
  const star =
    'M50 3 C53 33 67 47 97 50 C67 53 53 67 50 97 C47 67 33 53 3 50 C33 47 47 33 50 3Z'
  return (
    <svg
      className={`glossy-star ${className}`}
      style={style}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={body} x1="0.15" y1="0.1" x2="0.85" y2="0.95">
          <stop offset="0%" stopColor="#e2efff" />
          <stop offset="32%" stopColor="#5f9dff" />
          <stop offset="66%" stopColor="#1a6fff" />
          <stop offset="100%" stopColor="#0a2a6e" />
        </linearGradient>
        <radialGradient id={sheen} cx="0.36" cy="0.3" r="0.5">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="55%" stopColor="#ffffff" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path d={star} fill={`url(#${body})`} />
      <path d={star} fill={`url(#${sheen})`} />
    </svg>
  )
}
