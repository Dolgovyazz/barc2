import Link from 'next/link'

// Shared shell for the legal documents (privacy policy, offer agreement).
// Server component — no client state needed; keeps the brand's dark theme.
export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string
  updated?: string
  children: React.ReactNode
}) {
  return (
    <main
      className="relative mx-auto min-h-screen w-full max-w-[820px] px-5 py-14"
      style={{ color: 'var(--text-primary)' }}
    >
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-[13px] transition-colors hover:opacity-80"
        style={{ color: 'var(--text-muted)' }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
        На главную
      </Link>

      <h1
        className="mt-8 font-bold"
        style={{ fontSize: 'clamp(28px,4vw,40px)', color: 'var(--text-primary)' }}
      >
        {title}
      </h1>
      {updated && (
        <p className="mt-2 text-[13px]" style={{ color: 'var(--text-label)' }}>
          Обновлено: {updated}
        </p>
      )}

      <div className="legal-body mt-8">{children}</div>

      <footer
        className="mt-16 border-t pt-6 text-[12px]"
        style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-label)' }}
      >
        © BARCODE 2026 · Все права защищены.
      </footer>
    </main>
  )
}
