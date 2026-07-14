import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { AnalyticsTracker } from '@/components/analytics-tracker'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'BARCODE — библиотека барного дела',
    template: '%s — BARCODE',
  },
  description:
    'Вся барная библиотека теперь в одном Telegram-канале. Достоверная информация о видах алкоголя, техниках приготовления и коктейлях по стандартам IBA.',
  keywords: [
    'барное дело',
    'коктейли',
    'рецепты коктейлей',
    'IBA',
    'бармен',
    'обучение барменов',
    'виды алкоголя',
    'домашний бар',
  ],
  applicationName: 'BARCODE',
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: 'BARCODE',
    title: 'BARCODE — библиотека барного дела',
    description:
      'Вся барная библиотека теперь в одном Telegram-канале: виды алкоголя, техники приготовления и коктейли по стандартам IBA.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BARCODE — библиотека барного дела',
    description:
      'Вся барная библиотека теперь в одном Telegram-канале: виды алкоголя, техники и коктейли по стандартам IBA.',
  },
}

export const viewport: Viewport = {
  themeColor: '#000000',
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body style={{ background: 'var(--bg-base)' }}>
        {children}
        <AnalyticsTracker />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
