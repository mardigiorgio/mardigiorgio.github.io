"use client"

import { useEffect } from 'react'

declare global {
  interface Window {
    __introGateFailOpen?: () => void
    __introGateTimer?: number
  }
}

export default function IntroGateClient() {
  useEffect(() => {
    try {
      // Only act on first home mount: if overlay exists, this is a gated home entry
      const gate = document.getElementById('__intro-gate')
      if (!gate) return

      // Mark session as seen
      try { sessionStorage.setItem('introSeen', '1') } catch {}

      // Clear fail-open timer if set
      if (typeof window.__introGateTimer === 'number') {
        try { window.clearTimeout(window.__introGateTimer) } catch {}
        try { delete (window as { __introGateTimer?: number }).__introGateTimer } catch {}
      }

      // Fade out then remove overlay and restore scroll by removing style tag
      try { gate.style.opacity = '0' } catch {}
      const done = () => {
        try { window.__introGateFailOpen && window.__introGateFailOpen() } catch {}
      }
      const t = window.setTimeout(done, 320)
      return () => window.clearTimeout(t)
    } catch {}
  }, [])

  return null
}
