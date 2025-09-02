import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Marco DiGiorgio'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const title = searchParams.get('title') || 'Marco DiGiorgio'
  const tagline = searchParams.get('tagline') || 'Software Engineer & Security tinkerer'

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          background: 'linear-gradient(180deg, #ffffff, #eaeaea)',
          padding: '64px',
          fontSize: 48,
          fontFamily: 'Inter',
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 700, marginBottom: 12 }}>{title}</div>
        <div style={{ fontSize: 32, opacity: 0.7 }}>{tagline}</div>
      </div>
    ),
    { ...size }
  )
}

