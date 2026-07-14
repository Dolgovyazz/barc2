'use client'

import { useRouter } from 'next/navigation'

export function LogoutButton() {
  const router = useRouter()
  return (
    <button
      type="button"
      onClick={async () => {
        await fetch('/api/admin/logout', { method: 'POST' })
        router.replace('/admin/login')
      }}
      style={{
        padding: '8px 14px',
        fontSize: '13px',
        borderRadius: '9px',
        border: '1px solid rgba(120,170,255,0.25)',
        background: 'transparent',
        color: 'var(--text-muted, #7a9cc4)',
        cursor: 'pointer',
      }}
    >
      Выйти
    </button>
  )
}
