'use client'

import type { CSSProperties } from 'react'
import { GlossyStar } from '@/components/glossy'

/* Background decorations:
   1) Ambient aurora — soft drifting blue glows, fixed to the viewport.
   2) Bar-themed line icons — subtle, scattered down the side gutters.
      Each icon's content-facing edge is anchored just OUTSIDE the 1100px
      content column via `calc(50% + …px)`, so they live in the gutters and
      can never overlap the centred frames at any width. Varied gaps, sizes,
      rotations and irregular vertical rhythm keep it organic (not two lines).
      The whole layer is hidden on phones (no gutter there — see globals.css). */
export function Decorations() {
  return (
    <>
      {/* ─── Aurora glow (fixed to viewport) ─── */}
      <div
        aria-hidden="true"
        className="aurora-layer pointer-events-none fixed inset-0 z-0 overflow-hidden"
        style={{ background: 'var(--bg-base)' }}
      >
        <div className="aurora aurora-1" />
        <div className="aurora aurora-2" />
        <div className="aurora aurora-3" />
        <div className="aurora aurora-4" />
        <div className="aurora aurora-5" />
        <div className="aurora-grain" />
        <div className="aurora-vignette" />
      </div>

      {/* ─── Bar-themed line icons (organic scatter in the side gutters) ─── */}
      <div
        aria-hidden="true"
        className="bar-icons pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        {/* ===== LEFT gutter — every icon placed as a FRACTION of the left gutter.
            `(50vw - 550px)` is the gutter width (viewport half minus half the 1100px
            content column); multiplying by a 0–1 fraction spreads the icons across
            the whole gutter, so they fill wide screens and scale consistently at any
            width. `max(16px, …)` keeps them on-screen when the gutter is tiny. ===== */}
        <Star style={{ top: '6%', left: 'max(16px, calc((50vw - 550px) * 0.72))', opacity: 0.16, transform: 'rotate(-8deg)' }} size={15} color="#1a6fff" />
        <CocktailGlass style={{ top: '12%', left: 'max(16px, calc((50vw - 550px) * 0.4))', opacity: 0.12, transform: 'rotate(6deg)' }} w={34} h={42} />
        <Plus style={{ top: '20%', left: 'max(16px, calc((50vw - 550px) * 0.87))', opacity: 0.15, fontSize: 17, color: '#a8d4ff' }} />
        <Bottle style={{ top: '31%', left: 'max(16px, calc((50vw - 550px) * 0.55))', opacity: 0.10, transform: 'rotate(-5deg)' }} w={26} h={54} />
        <Star style={{ top: '44%', left: 'max(16px, calc((50vw - 550px) * 0.24))', opacity: 0.13, transform: 'rotate(12deg)' }} size={12} color="#a8d4ff" />
        <Shaker style={{ top: '57%', left: 'max(16px, calc((50vw - 550px) * 0.67))', opacity: 0.11, transform: 'rotate(7deg)' }} w={26} h={48} />
        <Citrus style={{ top: '71%', left: 'max(16px, calc((50vw - 550px) * 0.38))', opacity: 0.10 }} size={30} />
        <Star style={{ top: '85%', left: 'max(16px, calc((50vw - 550px) * 0.8))', opacity: 0.14, transform: 'rotate(-10deg)' }} size={14} color="#1a6fff" />
        <Plus style={{ top: '94%', left: 'max(16px, calc((50vw - 550px) * 0.52))', opacity: 0.13, fontSize: 15, color: '#a8d4ff' }} />

        {/* ===== RIGHT gutter — mirror of the left, spread across `(50vw - 550px)`. ===== */}
        <CocktailGlass style={{ top: '9%', right: 'max(16px, calc((50vw - 550px) * 0.46))', opacity: 0.12, transform: 'rotate(-6deg)' }} w={36} h={44} />
        <Plus style={{ top: '17%', right: 'max(16px, calc((50vw - 550px) * 0.83))', opacity: 0.15, fontSize: 18, color: '#1a6fff' }} />
        <WineGlass style={{ top: '27%', right: 'max(16px, calc((50vw - 550px) * 0.29))', opacity: 0.11, transform: 'rotate(5deg)' }} w={28} h={48} />
        <Star style={{ top: '40%', right: 'max(16px, calc((50vw - 550px) * 0.64))', opacity: 0.16, transform: 'rotate(8deg)' }} size={15} color="#a8d4ff" />
        <Bottle style={{ top: '53%', right: 'max(16px, calc((50vw - 550px) * 0.4))', opacity: 0.10, transform: 'rotate(-4deg)' }} w={26} h={54} />
        <Citrus style={{ top: '66%', right: 'max(16px, calc((50vw - 550px) * 0.86))', opacity: 0.10, transform: 'rotate(6deg)' }} size={30} />
        <Star style={{ top: '79%', right: 'max(16px, calc((50vw - 550px) * 0.5))', opacity: 0.13, transform: 'rotate(-8deg)' }} size={13} color="#1a6fff" />
        <Shaker style={{ top: '91%', right: 'max(16px, calc((50vw - 550px) * 0.72))', opacity: 0.11, transform: 'rotate(-7deg)' }} w={26} h={46} />

        {/* ===== Glossy 3D stars — two subtle premium accents in empty bands ===== */}
        <GlossyStar className="glossy-bg glossy-float absolute" size={46} style={{ top: '13%', right: 'max(16px, calc((50vw - 550px) * 0.34))', opacity: 0.5 }} />
        <GlossyStar className="glossy-bg glossy-float-2 absolute" size={42} style={{ top: '62%', left: 'max(16px, calc((50vw - 550px) * 0.32))', opacity: 0.5 }} />

        {/* ===== MOBILE set (.bar-mobile, hidden ≥768px). The desktop gutter scatter
            is hidden on phones (globals.css), so this IS the whole mobile decor layer.
            Two deliberate groups instead of the old collide-prone scatter:
              1) a balanced frame of bar silhouettes around the hero's empty bands, and
              2) small ambient sparkles hugging the side margins down the rest of the page.
            Every icon is edge-anchored (left/right ≤ ~18px), so nothing lands on the
            centred content or overflows on narrow (≤320px) phones. ===== */}

        {/* 1 — Hero frame: two top corners, two mid-edge stars, two bottom corners.
            px tops (the hero is always page-top); x hugs the screen edges. */}
        <Bottle className="bar-mobile" style={{ top: '94px', left: '14px', opacity: 0.14, transform: 'rotate(-8deg)' }} w={20} h={42} />
        <CocktailGlass className="bar-mobile" style={{ top: '104px', right: '16px', opacity: 0.14, transform: 'rotate(7deg)' }} w={26} h={32} />
        <Star className="bar-mobile" style={{ top: '300px', left: '12px', opacity: 0.16, transform: 'rotate(-10deg)' }} size={14} color="#a8d4ff" />
        <Star className="bar-mobile" style={{ top: '332px', right: '12px', opacity: 0.15, transform: 'rotate(8deg)' }} size={13} color="#1a6fff" />
        <WineGlass className="bar-mobile" style={{ top: '600px', left: '18px', opacity: 0.13, transform: 'rotate(6deg)' }} w={24} h={40} />
        <Shaker className="bar-mobile" style={{ top: '584px', right: '18px', opacity: 0.13, transform: 'rotate(-7deg)' }} w={24} h={42} />

        {/* 2 — Ambient sparkles down the page, alternating margins (left/right ≤10px
            keeps them in the ~20px padding gutter, clear of text at any phone width). */}
        <Star className="bar-mobile" style={{ top: '19%', right: '9px', opacity: 0.15, transform: 'rotate(-8deg)' }} size={13} color="#a8d4ff" />
        <Bottle className="bar-mobile" style={{ top: '27%', left: '8px', opacity: 0.12, transform: 'rotate(-5deg)' }} w={13} h={28} />
        <Plus className="bar-mobile" style={{ top: '35%', right: '10px', opacity: 0.15, fontSize: 15, color: '#1a6fff' }} />
        <Star className="bar-mobile" style={{ top: '44%', left: '9px', opacity: 0.13 }} size={12} color="#1a6fff" />
        <CocktailGlass className="bar-mobile" style={{ top: '53%', right: '8px', opacity: 0.12, transform: 'rotate(6deg)' }} w={16} h={20} />
        <Plus className="bar-mobile" style={{ top: '62%', left: '10px', opacity: 0.14, fontSize: 14, color: '#a8d4ff' }} />
        <Star className="bar-mobile" style={{ top: '71%', right: '9px', opacity: 0.14, transform: 'rotate(6deg)' }} size={13} color="#a8d4ff" />
        <WineGlass className="bar-mobile" style={{ top: '80%', left: '8px', opacity: 0.11, transform: 'rotate(-5deg)' }} w={15} h={24} />
        <Star className="bar-mobile" style={{ top: '89%', right: '9px', opacity: 0.13 }} size={12} color="#1a6fff" />
      </div>
    </>
  )
}

/* ── Icon primitives ─────────────────────────────────────── */
type Pos = CSSProperties

function Star({ style, size, color, className = '' }: { style: Pos; size: number; color: string; className?: string }) {
  const s = size
  return (
    <svg className={`bar-icon absolute ${className}`} style={style} width={s} height={s} viewBox="0 0 18 18" fill="none">
      <path d="M9 1 C9 1 10 7.5 17 9 C10 10.5 9 17 9 17 C9 17 8 10.5 1 9 C8 7.5 9 1 9 1Z" fill={color} />
    </svg>
  )
}

export function Plus({ style, className = '' }: { style: Pos; className?: string }) {
  return (
    <span className={`bar-icon absolute font-bold ${className}`} style={style}>
      +
    </span>
  )
}

export function CocktailGlass({ style, w, h, className = '' }: { style: Pos; w: number; h: number; className?: string }) {
  return (
    <svg className={`bar-icon absolute ${className}`} style={style} width={w} height={h} viewBox="0 0 38 46" fill="none">
      <path d="M2 2h34L19 24 2 2Z" stroke="#a8d4ff" strokeWidth="1.3" strokeLinejoin="round" />
      <line x1="19" y1="24" x2="19" y2="40" stroke="#a8d4ff" strokeWidth="1.3" />
      <line x1="10" y1="43" x2="28" y2="43" stroke="#a8d4ff" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

function WineGlass({ style, w, h, className = '' }: { style: Pos; w: number; h: number; className?: string }) {
  return (
    <svg className={`bar-icon absolute ${className}`} style={style} width={w} height={h} viewBox="0 0 30 50" fill="none">
      <path d="M5 4h20L22 22 C22 29 17 33 15 33 C13 33 8 29 8 22L5 4Z" stroke="#a8d4ff" strokeWidth="1.3" strokeLinejoin="round" />
      <line x1="15" y1="33" x2="15" y2="44" stroke="#a8d4ff" strokeWidth="1.3" />
      <line x1="8" y1="46" x2="22" y2="46" stroke="#a8d4ff" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

export function Bottle({ style, w, h, className = '' }: { style: Pos; w: number; h: number; className?: string }) {
  return (
    <svg className={`bar-icon absolute ${className}`} style={style} width={w} height={h} viewBox="0 0 28 58" fill="none">
      <path d="M10 2h8v8c0 3 5 7 5 13v29a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V23c0-6 5-10 5-13V2Z" stroke="#a8d4ff" strokeWidth="1.3" strokeLinejoin="round" />
      <line x1="5" y1="28" x2="23" y2="28" stroke="#a8d4ff" strokeWidth="0.9" />
    </svg>
  )
}

function Shaker({ style, w, h, className = '' }: { style: Pos; w: number; h: number; className?: string }) {
  return (
    <svg className={`bar-icon absolute ${className}`} style={style} width={w} height={h} viewBox="0 0 26 48" fill="none">
      <rect x="5" y="8" width="16" height="30" rx="5" stroke="#a8d4ff" strokeWidth="1.3" />
      <line x1="5" y1="18" x2="21" y2="18" stroke="#a8d4ff" strokeWidth="1.3" />
      <rect x="8" y="2" width="10" height="7" rx="2" stroke="#a8d4ff" strokeWidth="1.2" />
    </svg>
  )
}

function Citrus({ style, size, className = '' }: { style: Pos; size: number; className?: string }) {
  return (
    <svg className={`bar-icon absolute ${className}`} style={style} width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="14" stroke="#a8d4ff" strokeWidth="1.3" />
      <circle cx="16" cy="16" r="9" stroke="#a8d4ff" strokeWidth="1" />
      <line x1="16" y1="2" x2="16" y2="30" stroke="#a8d4ff" strokeWidth="1" />
      <line x1="2" y1="16" x2="30" y2="16" stroke="#a8d4ff" strokeWidth="1" />
      <line x1="6" y1="6" x2="26" y2="26" stroke="#a8d4ff" strokeWidth="0.8" />
      <line x1="26" y1="6" x2="6" y2="26" stroke="#a8d4ff" strokeWidth="0.8" />
    </svg>
  )
}

function IceCube({ style, size, className = '' }: { style: Pos; size: number; className?: string }) {
  return (
    <svg className={`bar-icon absolute ${className}`} style={style} width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M16 2L30 10V22L16 30L2 22V10Z" stroke="#a8d4ff" strokeWidth="1.3" />
      <line x1="16" y1="2" x2="16" y2="30" stroke="#a8d4ff" strokeWidth="0.8" />
      <line x1="2" y1="10" x2="30" y2="10" stroke="#a8d4ff" strokeWidth="0.8" />
      <line x1="2" y1="22" x2="30" y2="22" stroke="#a8d4ff" strokeWidth="0.8" />
    </svg>
  )
}
