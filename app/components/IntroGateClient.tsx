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
      // Do not remove the paint gate here; HelloIntro coordinates it
      // to ensure the animation is the first visible content.
      return
    } catch {}
  }, [])

  return null
}
