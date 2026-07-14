'use client'

import { useEffect } from 'react'

/**
 * Progressive scroll-reveal. Adds `.reveal-ready` to <html> only after JS runs,
 * so elements marked with `.reveal` stay fully visible without JS (no content
 * ever gets stuck hidden). Each `.reveal` fades/slides in once when scrolled
 * into view. Animations always play — reduced-motion gating removed per client
 * request (заказчик хочет анимации всегда, в т.ч. в энергосбережении/Яндексе).
 */
export function ScrollReveal() {
  useEffect(() => {
    const root = document.documentElement
    // Client wants animations to always run: we no longer skip reveal for
    // prefers-reduced-motion. Only bail if IntersectionObserver isn't available.
    if (!('IntersectionObserver' in window)) return

    root.classList.add('reveal-ready')
    const els = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-in')
            io.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )

    els.forEach((el) => io.observe(el))

    return () => {
      io.disconnect()
      root.classList.remove('reveal-ready')
    }
  }, [])

  return null
}
