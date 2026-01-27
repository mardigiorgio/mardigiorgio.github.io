"use client"

import { useEffect, useMemo, useRef, useState } from "react"

declare global {
  interface Window {
    finishIntro?: () => void
  }
}

// Draw-once intro overlay that fetches and inlines /hello.svg,
// animates path strokes, then fades out and unmounts.
export default function HelloIntro() {
  const [shouldShow, setShouldShow] = useState<boolean | null>(null)
  const [fading, setFading] = useState(false)
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const mountRef = useRef<HTMLDivElement | null>(null)
  const particlesRef = useRef<HTMLDivElement | null>(null)

  // Use a stable sessionStorage key
  const storageKey = useMemo(() => "helloSeen", [])
  const reducedMotion = useMemo(() =>
    typeof window !== "undefined" && window.matchMedia
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  , [])

  // Decide whether to show on mount: only on homepage entry and if not drawn this session
  useEffect(() => {
    try {
      const drawn = typeof window !== "undefined" && sessionStorage.getItem(storageKey)
      const path = window.location.pathname || "/"
      // Check if we're on the home page (root or index.html)
      const isHome = path === "/" || path === "" || path === "/index.html"

      if (drawn || !isHome) {
        setShouldShow(false)
      } else {
        setShouldShow(true)
      }
    } catch {
      // If anything goes wrong, don't block the site
      setShouldShow(false)
      try { /* no-op */ } catch {}
    }
  }, [storageKey])

  // Prevent scroll while overlay visible
  useEffect(() => {
    if (shouldShow) {
      const prev = document.body.style.overflow
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [shouldShow])

  // Perform fetch + animation when visible
  useEffect(() => {
    if (!shouldShow) return
    let cancelled = false
    let cleanup: (() => void) | undefined
    ;(async () => {
      try {
        const mod = await import('./helloIntroRunner')
        if (cancelled) return
        const overlayEl = overlayRef.current
        const mountEl = mountRef.current
        const particlesEl = particlesRef.current
        if (!overlayEl || !mountEl || !particlesEl) return
        const { stop } = await mod.runHelloIntro({
          overlayEl,
          mountEl,
          particlesEl,
          storageKey,
          reducedMotion,
          onFading: () => setFading(true),
          onDone: () => setShouldShow(false),
        })
        cleanup = stop
      } catch {
        try { sessionStorage.setItem(storageKey, '1') } catch {}
        try { window.finishIntro && window.finishIntro() } catch {}
        setFading(true)
        window.setTimeout(() => setShouldShow(false), 200)
      }
    })()
    return () => {
      cancelled = true
      try { cleanup && cleanup() } catch {}
    }
  }, [shouldShow, reducedMotion, storageKey])

  // paint gate handled by window.finishIntro()

  return (
    <div
      id="hello-intro-root"
      ref={overlayRef}
      aria-hidden="true"
      className={`hello-intro hello-intro-root ${shouldShow ? "is-active" : ""} ${fading ? "is-fading" : ""}`}
    >
      <div className="hello-intro__center">
        {/* SVG mounts here */}
        <div ref={mountRef} className="hello-intro__box" />
        <div ref={particlesRef} className="hello-intro__particles" />
      </div>
      <style jsx>{`
        .hello-intro {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: none; /* hidden by default; shown when gating or active */
          align-items: center;
          justify-content: center;
          /* Inherit app background if defined; otherwise fallback */
          background: var(--background, inherit);
          color: currentColor;
          opacity: 1;
          transition: opacity 400ms ease;
          /* Don't block interactions to avoid focus traps */
          pointer-events: none;
          /* Allow glow to extend beyond SVG bounds */
          overflow: visible;
        }
        /* Show overlay immediately when pre-hydration guard is active */
        html[data-intro-pending] .hello-intro { display: flex; }
        /* Keep overlay visible while component is active (after we remove gate) */
        .hello-intro.is-active { display: flex; }
        .hello-intro::before {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image:
            radial-gradient(transparent 60%, rgba(0,0,0,0.02) 100%),
            repeating-linear-gradient(45deg, rgba(0,0,0,0.02) 0, rgba(0,0,0,0.02) 2px, transparent 2px, transparent 4px);
          opacity: 0.2;
          mix-blend-mode: soft-light;
        }
        .hello-intro.is-fading {
          opacity: 0;
        }
        .hello-intro__center {
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          padding: clamp(16px, 4vmin, 32px);
          width: 100%;
          height: 100%;
        }
        .hello-intro__box {
          display: grid;
          place-items: center;
          max-width: min(92vw, 1200px);
          max-height: min(86vh, 900px);
          width: 100%;
          height: 100%;
          will-change: transform;
        }
        .hello-intro__box :global(svg) {
          display: block;
          width: 100%;
          height: auto;
          max-height: 100%;
        }
        .hello-intro__particles {
          position: fixed;
          inset: 0;
          pointer-events: none;
        }
        .hello-intro__particle {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 0;
          background: radial-gradient(circle at 30% 30%, var(--hello-neon-end), rgba(255,255,255,0) 70%);
          opacity: 0.9;
          transform: translate3d(0,0,0) scale(1);
          will-change: transform, opacity;
        }
        @media (prefers-reduced-motion: reduce) {
          .hello-intro {
            transition: none;
          }
          .hello-intro::before { display: none; }
        }
      `}</style>
    </div>
  )
}

// Pages Router note:
// If using the Pages Router instead of the App Router, include <HelloIntro />
// once in pages/_app.tsx within the top-level component, above {Component}.
