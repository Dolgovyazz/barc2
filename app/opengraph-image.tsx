import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'BARCODE — библиотека барного дела'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Glossy blue star (same shape as the favicon), embedded as a data URI.
const STAR_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">' +
  '<defs><linearGradient id="b" x1="0.15" y1="0.1" x2="0.85" y2="0.95">' +
  '<stop offset="0%" stop-color="#e2efff"/><stop offset="32%" stop-color="#5f9dff"/>' +
  '<stop offset="66%" stop-color="#1a6fff"/><stop offset="100%" stop-color="#0e47a0"/>' +
  '</linearGradient></defs>' +
  '<path d="M50 3 C53 33 67 47 97 50 C67 53 53 67 50 97 C47 67 33 53 3 50 C33 47 47 33 50 3Z" fill="url(#b)"/>' +
  '</svg>'

export default async function Image() {
  const font = await fetch(new URL('./_og/montserrat-bold.ttf', import.meta.url)).then((r) =>
    r.arrayBuffer(),
  )
  const star = `data:image/svg+xml;base64,${btoa(STAR_SVG)}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background:
            'radial-gradient(120% 120% at 50% 28%, #0a1c3d 0%, #050d1f 46%, #01040c 100%)',
          fontFamily: 'Montserrat',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={star} width={140} height={140} style={{ marginBottom: 30 }} alt="" />
        <div
          style={{
            fontSize: 132,
            fontWeight: 700,
            color: '#ffffff',
            letterSpacing: 10,
            lineHeight: 1,
          }}
        >
          BARCODE
        </div>
        <div style={{ fontSize: 40, color: '#7a9cc4', marginTop: 24, letterSpacing: 2 }}>
          библиотека барного дела
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: 'Montserrat', data: font, weight: 700, style: 'normal' }] },
  )
}
