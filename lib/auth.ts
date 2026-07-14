// Admin-panel auth. Deliberately tiny: a single shared password (env
// ADMIN_PASSWORD) gates /admin. On login we set an httpOnly cookie whose value
// is an HMAC derived from the password — the raw password never sits in the
// cookie, and the value can't be forged without knowing ADMIN_PASSWORD.
//
// Uses Web Crypto only (no Node APIs) so it runs in BOTH the Edge middleware
// and Node route handlers.

const encoder = new TextEncoder()
const SESSION_MESSAGE = 'barcode-admin-session-v1'
export const SESSION_COOKIE = 'bc_admin'

async function hmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
}

function bufToHex(buf: ArrayBuffer): string {
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

/** Deterministic session token derived from the admin password. */
export async function createSessionToken(): Promise<string> {
  const secret = process.env.ADMIN_PASSWORD
  if (!secret) throw new Error('ADMIN_PASSWORD is not set')
  const key = await hmacKey(secret)
  const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(SESSION_MESSAGE))
  return bufToHex(sig)
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let r = 0
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return r === 0
}

/** True if the cookie token matches what the current ADMIN_PASSWORD would produce. */
export async function isValidSession(token: string | undefined): Promise<boolean> {
  if (!token || !process.env.ADMIN_PASSWORD) return false
  try {
    return timingSafeEqual(token, await createSessionToken())
  } catch {
    return false
  }
}
