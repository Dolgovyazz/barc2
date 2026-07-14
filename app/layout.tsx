import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { AnalyticsTracker } from '@/components/analytics-tracker'
import { SITE_URL } from '@/lib/site'
import './globals.css'

const DESCRIPTION =
  'Вся барная библиотека теперь в одном Telegram-канале. Достоверная информация о видах алкоголя, техниках приготовления и коктейлях по стандартам IBA.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'BARCODE — библиотека барного дела',
    template: '%s — BARCODE',
  },
  description: DESCRIPTION,
  keywords: [
    'барное дело',
    'коктейли',
    'рецепты коктейлей',
    'IBA',
    'бармен',
    'обучение барменов',
    'виды алкоголя',
    'домашний бар',
    'барные техники',
    'миксология',
  ],
  applicationName: 'BARCODE',
  authors: [{ name: 'BARCODE' }],
  creator: 'BARCODE',
  publisher: 'BARCODE',
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: 'BARCODE',
    url: SITE_URL,
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
  category: 'education',
}

export const viewport: Viewport = {
  themeColor: '#000000',
  colorScheme: 'dark',
}

// Schema.org structured data — helps search engines identify the site/brand.
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'BARCODE',
  alternateName: 'BARCODE — библиотека барного дела',
  url: SITE_URL,
  inLanguage: 'ru-RU',
  description: DESCRIPTION,
  publisher: {
    '@type': 'Organization',
    name: 'BARCODE',
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    sameAs: ['https://www.instagram.com/barcode_community'],
  },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  )
}
