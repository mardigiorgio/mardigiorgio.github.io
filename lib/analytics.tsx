import Script from 'next/script'

export function Analytics() {
  const enabled = process.env.NEXT_PUBLIC_ANALYTICS === 'plausible'
  if (!enabled) return null
  return (
    <Script
      defer
      data-domain="mardigiorgio.github.io"
      src="https://plausible.io/js/script.js"
    />
  )
}
