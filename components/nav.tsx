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
      <a href="#" aria-label="Instagram" className="transition-opacity hover:opacity-70">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
        </svg>
      </a>
      <a href="#" aria-label="Telegram" className="transition-opacity hover:opacity-70">
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
        <a href="#hero" className="text-[22px] font-bold md:text-[28px]" style={{ color: 'var(--text-primary)' }}>
          BC
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

      {/* Mobile dropdown menu */}
      <div
        id="mobile-menu"
        className="md:hidden"
        style={{
          overflow: 'hidden',
          maxHeight: menuOpen ? '360px' : '0',
          opacity: menuOpen ? 1 : 0,
          transition: 'max-height 0.35s ease, opacity 0.3s ease',
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
