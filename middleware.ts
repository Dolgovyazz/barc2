import { NextResponse, type NextRequest } from 'next/server'
import { SESSION_COOKIE, isValidSession } from '@/lib/auth'

const BYPASS_COOKIE = 'bc_preview'

// Self-contained "we'll be back" page (no external assets — it must render even
// while everything else is blocked). 503 + noindex keeps Google from dropping
// the site: it treats the outage as temporary and retries.
const MAINTENANCE_HTML = `<!doctype html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>BARCODE — скоро вернёмся</title>
</head>
<body style="margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;background:radial-gradient(120% 120% at 50% 30%,#0a1c3d 0%,#050d1f 46%,#01040c 100%);color:#fff;font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;text-align:center">
<div>
<svg width="76" height="76" viewBox="0 0 100 100" style="margin-bottom:22px" aria-hidden="true">
<defs><linearGradient id="s" x1="0.15" y1="0.1" x2="0.85" y2="0.95">
<stop offset="0%" stop-color="#e2efff"/><stop offset="32%" stop-color="#5f9dff"/>
<stop offset="66%" stop-color="#1a6fff"/><stop offset="100%" stop-color="#0e47a0"/>
</linearGradient></defs>
<path d="M50 3 C53 33 67 47 97 50 C67 53 53 67 50 97 C47 67 33 53 3 50 C33 47 47 33 50 3Z" fill="url(#s)"/>
</svg>
<h1 style="margin:0;font-size:34px;font-weight:800;letter-spacing:5px">BARCODE</h1>
<p style="margin:16px 0 0;font-size:16px;line-height:1.7;color:#7a9cc4">
Сайт временно недоступен.<br>Мы скоро вернёмся.
</p>
</div>
</body>
</html>`

function maintenanceOn(): boolean {
  const v = process.env.MAINTENANCE_MODE
  return v === '1' || v === 'true'
}

export async function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl

  // Admin API (login/logout/reset) gates itself — must stay reachable so the
  // owner can still sign in while the public site is down.
  if (pathname.startsWith('/api/admin')) return NextResponse.next()

  // Admin panel: password gate. Works even during maintenance.
  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    if (pathname.startsWith('/admin/login')) return NextResponse.next()
    const ok = await isValidSession(req.cookies.get(SESSION_COOKIE)?.value)
    if (!ok) return NextResponse.redirect(new URL('/admin/login', req.url))
    return NextResponse.next()
  }

  // Public site — maintenance switch.
  if (maintenanceOn()) {
    const key = process.env.MAINTENANCE_BYPASS
    if (key) {
      // ?preview=<key> → remember in a cookie and show the real site.
      if (searchParams.get('preview') === key) {
        const url = req.nextUrl.clone()
        url.searchParams.delete('preview')
        const res = NextResponse.redirect(url)
        res.cookies.set(BYPASS_COOKIE, key, { httpOnly: true, sameSite: 'lax', path: '/' })
        return res
      }
      if (req.cookies.get(BYPASS_COOKIE)?.value === key) return NextResponse.next()
    }
    return new NextResponse(MAINTENANCE_HTML, {
      status: 503,
      headers: {
        'content-type': 'text/html; charset=utf-8',
        'cache-control': 'no-store',
        'retry-after': '3600',
      },
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|icon.svg|favicon.ico).*)'],
}
