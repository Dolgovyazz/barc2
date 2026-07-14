'use client'

import { useState, useEffect } from 'react'

const navLinks: { label: string; href: string }[] = [
  { label: 'Главная', href: '#hero' },
  { label: 'О нас', href: '#about' },
  { label: 'Для кого', href: '#for-whom' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Тарифы', href: '#pricing' },
]

function SocialLinks() {
  return (
    <div className="flex items-center gap-3" style={{ color: 'var(--text-primary)' }}>
      <a href="https://www.instagram.com/barcode_community" target="_blank" rel="noopener noreferrer" aria-label="Instagram" data-track="instagram" className="transition-opacity hover:opacity-70">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
        </svg>
      </a>
      <a href="https://telegram.dog/+-gl1xcnOGwFmOWEy" target="_blank" rel="noopener noreferrer" aria-label="Telegram" data-track="telegram" className="transition-opacity hover:opacity-70">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
      </a>
    </div>
  )
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // Scroll-aware background: transparent over the hero, blurred bar after scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu on Escape
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  return (
    <nav
      className="sticky top-0 z-50 transition-colors duration-300"
      style={{
        background: scrolled || menuOpen ? 'rgba(2, 8, 20, 0.72)' : 'transparent',
        backdropFilter: scrolled || menuOpen ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled || menuOpen ? 'blur(16px)' : 'none',
        borderBottom: scrolled || menuOpen ? '1px solid var(--border-subtle)' : '1px solid transparent',
      }}
    >
      <div className="relative mx-auto flex max-w-[1200px] items-center justify-between px-5 py-3 md:py-3.5">
        <a href="#hero" className="relative inline-block text-[22px] font-bold md:text-[28px]" style={{ color: 'var(--text-primary)' }}>
          BC
          {/* Small glossy blue star badge at the top-right — same star as the
              favicon / hero GlossyStar, replacing the placeholder red dot. */}
          <svg
            aria-hidden="true"
            viewBox="0 0 100 100"
            className="absolute"
            style={{
              width: '18px',
              height: '18px',
              top: '0px',
              right: '-7px',
              filter: 'drop-shadow(0 0 4px rgba(26,111,255,0.65))',
            }}
          >
            <defs>
              <linearGradient id="bcstar-body" x1="0.15" y1="0.1" x2="0.85" y2="0.95">
                <stop offset="0%" stopColor="#e2efff" />
                <stop offset="32%" stopColor="#5f9dff" />
                <stop offset="66%" stopColor="#1a6fff" />
                <stop offset="100%" stopColor="#0e47a0" />
              </linearGradient>
              <radialGradient id="bcstar-sheen" cx="0.36" cy="0.3" r="0.5">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                <stop offset="55%" stopColor="#ffffff" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </radialGradient>
            </defs>
            <path d="M50 3 C53 33 67 47 97 50 C67 53 53 67 50 97 C47 67 33 53 3 50 C33 47 47 33 50 3Z" fill="url(#bcstar-body)" />
            <path d="M50 3 C53 33 67 47 97 50 C67 53 53 67 50 97 C47 67 33 53 3 50 C33 47 47 33 50 3Z" fill="url(#bcstar-sheen)" />
          </svg>
        </a>

        {/* Desktop links — absolutely centred on the bar so the logo/social width
            difference can't shove them off-centre (they'd otherwise drift with
            justify-between). The block is centred, but the left links (Главная+О нас)
            are ~8.5px wider than the right (FAQ+Тарифы), which pushes the MIDDLE link
            "Для кого" ~4px right of centre. A -4px nudge (md:-ml-1) re-centres that
            middle link under the hero star's spike (viewport-independent: link widths
            are fixed, so the correction is constant at every width). */}
        <div
          className="hidden items-center gap-7 text-[16px] font-medium md:flex md:absolute md:left-1/2 md:top-1/2 md:-ml-1 md:-translate-x-1/2 md:-translate-y-1/2"
          style={{ color: 'var(--text-muted)' }}
        >
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="rounded-full border px-5 py-2 transition-colors hover:border-white hover:bg-white/10 hover:text-white"
              style={{
                borderColor: label === 'Тарифы' ? 'var(--accent-primary)' : 'white',
                color: label === 'Тарифы' ? 'var(--accent-primary)' : 'white',
                fontFamily: 'inherit',
              }}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Desktop social */}
        <div className="hidden md:block">
          <SocialLinks />
        </div>

        {/* Mobile burger */}
        <button
          type="button"
          className="flex md:hidden"
          aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((v) => !v)}
          style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-primary)', padding: 4 }}
        >
          {menuOpen ? (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="5" y1="5" x2="19" y2="19" />
              <line x1="19" y1="5" x2="5" y2="19" />
            </svg>
          ) : (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="7" x2="21" y2="7" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="17" x2="21" y2="17" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown menu — absolutely positioned so opening/closing it does
          NOT change the sticky nav's in-flow height. Previously it was a static,
          in-flow child: an open menu grew the nav by ~356px and pushed the hero
          (which sits under the bar via -mt-[60px]) and every section down. Clicking
          a link then closed the menu (0.35s collapse) WHILE the browser was
          smooth-scrolling to the anchor, so the target slid out from under the
          scroll and it landed in the wrong section. As an overlay it never shifts
          layout, so smooth anchor scrolling lands correctly. It needs its own
          background now (the bar no longer boxes it). */}
      <div
        id="mobile-menu"
        className="md:hidden"
        style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          overflow: 'hidden',
          maxHeight: menuOpen ? '360px' : '0',
          opacity: menuOpen ? 1 : 0,
          transition: 'max-height 0.35s ease, opacity 0.3s ease',
          background: 'rgba(2, 8, 20, 0.92)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: menuOpen ? '1px solid var(--border-subtle)' : '1px solid transparent',
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
      >
        <div className="flex flex-col gap-2 px-5 pb-6 pt-1">
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="rounded-xl border px-4 py-3 text-[16px] font-medium transition-colors hover:bg-white/10"
              style={{
                borderColor: label === 'Тарифы' ? 'var(--accent-primary)' : 'var(--border-subtle)',
                color: label === 'Тарифы' ? 'var(--accent-primary)' : 'white',
              }}
            >
              {label}
            </a>
          ))}
          <div className="mt-2 flex justify-center">
            <SocialLinks />
          </div>
        </div>
      </div>
    </nav>
  )
}
