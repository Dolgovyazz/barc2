'use client'

import { useEffect } from 'react'

// Anonymous first-party ids. visitor_id persists across sessions (unique
// visitors); session_id lives for the browser-tab session (bounce logic).
function getId(key: string, storage: Storage): string {
  try {
    let v = storage.getItem(key)
    if (!v) {
      v = crypto.randomUUID?.() ?? `${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`
      storage.setItem(key, v)
    }
    return v
  } catch {
    return 'anon'
  }
}

function send(type: 'pageview' | 'click', target?: string) {
  try {
    // Don't record visits to the admin panel itself.
    if (window.location.pathname.startsWith('/admin')) return
    const payload = JSON.stringify({
      type,
      target,
      visitorId: getId('bc_vid', window.localStorage),
      sessionId: getId('bc_sid', window.sessionStorage),
      path: window.location.pathname,
    })
    const blob = new Blob([payload], { type: 'application/json' })
    if (navigator.sendBeacon?.('/api/track', blob)) return
    fetch('/api/track', {
      method: 'POST',
      body: payload,
      headers: { 'Content-Type': 'application/json' },
      keepalive: true,
    }).catch(() => {})
  } catch {
    // ignore
  }
}

// Mounted once (in layout). Fires a pageview, then tracks clicks on any element
// carrying a `data-track="..."` attribute via event delegation — so components
// only need the attribute, no per-button handlers.
export function AnalyticsTracker() {
  useEffect(() => {
    send('pageview')
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest?.('[data-track]')
      if (el) send('click', el.getAttribute('data-track') || undefined)
    }
    document.addEventListener('click', onClick, { capture: true })
    return () => document.removeEventListener('click', onClick, { capture: true })
  }, [])
  return null
}
