'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(false)
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    setLoading(false)
    if (res.ok) router.replace('/admin')
    else setError(true)
  }

  return (
    <main
      style={{
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        background: 'var(--bg-base, #000)',
        color: 'var(--text-primary, #fff)',
      }}
    >
      <form
        onSubmit={submit}
        style={{
          width: '100%',
          maxWidth: '360px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          padding: '32px',
          borderRadius: '16px',
          background: 'rgba(10, 22, 46, 0.6)',
          border: '1px solid rgba(120,170,255,0.22)',
        }}
      >
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700 }}>BARCODE · Аналитика</h1>
          <p style={{ fontSize: '13px', color: 'var(--text-muted, #7a9cc4)', marginTop: '4px' }}>
            Вход в админ-панель
          </p>
        </div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Пароль"
          autoFocus
          style={{
            padding: '12px 14px',
            borderRadius: '10px',
            border: `1px solid ${error ? '#ff6b6b' : 'rgba(120,170,255,0.25)'}`,
            background: 'rgba(0,0,0,0.35)',
            color: '#fff',
            fontSize: '15px',
            outline: 'none',
          }}
        />
        {error && (
          <p style={{ fontSize: '13px', color: '#ff6b6b', margin: 0 }}>Неверный пароль</p>
        )}
        <button
          type="submit"
          disabled={loading || !password}
          className="btn-cta"
          style={{ padding: '12px', fontSize: '14px', opacity: loading || !password ? 0.6 : 1 }}
        >
          {loading ? 'Проверка…' : 'Войти'}
        </button>
      </form>
    </main>
  )
}
