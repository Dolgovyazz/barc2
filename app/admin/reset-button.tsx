'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function ResetButton() {
  const router = useRouter()
  const [busy, setBusy] = useState(false)

  async function reset() {
    if (
      !confirm(
        'Сбросить всю статистику?\n\nВсе события (посещения, клики) будут удалены безвозвратно. Счётчики обнулятся.',
      )
    )
      return
    setBusy(true)
    try {
      const res = await fetch('/api/admin/reset', { method: 'POST' })
      if (!res.ok) alert('Не удалось сбросить статистику.')
    } finally {
      setBusy(false)
      router.refresh()
    }
  }

  return (
    <button
      type="button"
      onClick={reset}
      disabled={busy}
      style={{
        padding: '9px 16px',
        fontSize: '13px',
        borderRadius: '10px',
        border: '1px solid rgba(255,107,107,0.45)',
        background: 'rgba(255,107,107,0.08)',
        color: '#ff8f6b',
        cursor: busy ? 'default' : 'pointer',
        opacity: busy ? 0.6 : 1,
      }}
    >
      {busy ? 'Сброс…' : 'Сбросить статистику'}
    </button>
  )
}
