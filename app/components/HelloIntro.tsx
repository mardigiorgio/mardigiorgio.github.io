"use client"

import { useEffect, useMemo, useRef, useState } from "react"

// Draw-once intro overlay that fetches and inlines /hello.svg,
// animates path strokes, then fades out and unmounts.
export default function HelloIntro() {
  const [shouldShow, setShouldShow] = useState<boolean | null>(null)
  const [fading, setFading] = useState(false)
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const mountRef = useRef<HTMLDivElement | null>(null)
  const particlesRef = useRef<HTMLDivElement | null>(null)

  // Use a stable sessionStorage key
  const storageKey = useMemo(() => "helloDrawn", [])
  const reducedMotion = useMemo(() =>
    typeof window !== "undefined" && window.matchMedia
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  , [])

  // Decide whether to show on mount: only on homepage entry and if not drawn this session
  useEffect(() => {
    try {
      const drawn = typeof window !== "undefined" && sessionStorage.getItem(storageKey)
      // Determine base path similar to pre-paint logic (env then baseURI-derived)
      const envBase = (process.env.NEXT_PUBLIC_BASE_PATH || "") as string
      const fallbackBase = () => {
        try {
          const u = new URL(document.baseURI)
          const parts = u.pathname.split("/").filter(Boolean)
          return parts.length > 0 ? `/${parts[0]}` : ""
        } catch {
          return ""
        }
      }
      let base = envBase || fallbackBase() || ""
      if (base !== "") base = base.replace(/\/$/, "")
      const path = window.location.pathname || "/"
      const isHome = base === "" ? path === "/" || path === "" : path === base || path === base + "/"

      if (drawn || !isHome) {
        setShouldShow(false)
      } else {
        setShouldShow(true)
      }
    } catch {
      // If anything goes wrong, don't block the site
      setShouldShow(false)
      try { document.documentElement.classList.remove("hello-intro-pending") } catch {}
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
    const controller = new AbortController()
    const animations: Animation[] = []
    let svgEl: SVGSVGElement | null = null
    let stopParticles: (() => void) | null = null
    let finished = false
    // Watchdog: ensure we never keep the page hidden if something stalls
    const watchdog = window.setTimeout(() => {
      if (!finished && !cancelled) {
        console.warn("hello-intro: watchdog triggered; revealing site")
        try { sessionStorage.setItem(storageKey, "1") } catch {}
        try { document.documentElement.classList.remove("hello-intro-pending") } catch {}
        setFading(true)
        window.setTimeout(() => setShouldShow(false), 200)
      }
    }, reducedMotion ? 3500 : 6500)

    async function run() {
      try {
        // Wait for full page load and fonts to avoid half-done starts
        if (document.readyState !== "complete") {
          await new Promise<void>((resolve) => window.addEventListener("load", () => resolve(), { once: true }))
        }
        if ((document as any).fonts && (document as any).fonts.ready) {
          try { await (document as any).fonts.ready } catch {}
        }
        await new Promise<void>((r) => requestAnimationFrame(() => requestAnimationFrame(() => r())))
        // Compute a robust prefix for GitHub Pages project sites.
        // Prefer deriving from any Next.js chunk <script> src (contains `/<basePath>/_next/...`).
        // Fallback to document.baseURI which works when landing at the site root.
        // Base-aware URL for SVG (works in dev and on Pages)
        const svgUrl = new URL('hello.svg', document.baseURI).toString()
        const res = await fetch(svgUrl, { signal: controller.signal, cache: 'no-store' })
        if (!res.ok) throw new Error(`Failed to fetch ${svgUrl}: ${res.status}`)
        const text = await res.text()

        if (cancelled) return

        // Parse the SVG text into a node we can insert
        const parser = new DOMParser()
        const doc = parser.parseFromString(text, "image/svg+xml")
        const found = doc.querySelector("svg") as SVGSVGElement | null
        if (!found) throw new Error("No <svg> root in hello.svg response")

        // Import into this document to ensure correct namespace
        svgEl = document.importNode(found, true) as SVGSVGElement

        // Ensure responsive sizing via viewBox
        if (!svgEl.getAttribute("viewBox") && svgEl.hasAttribute("width") && svgEl.hasAttribute("height")) {
          const w = Number(svgEl.getAttribute("width")) || 0
          const h = Number(svgEl.getAttribute("height")) || 0
          if (w > 0 && h > 0) svgEl.setAttribute("viewBox", `0 0 ${w} ${h}`)
        }

        // Allow glow to render outside the SVG viewport.
        // Note: Using overflow visible prevents rectangular clipping on iOS during animation.
        svgEl.setAttribute("overflow", "visible")

        // Append it under the mount
        if (!mountRef.current) return
        // Clear anything existing
        mountRef.current.innerHTML = ""
        mountRef.current.appendChild(svgEl)

        // Add gradient defs and SVG glow filter (no CSS drop-shadow).
        const uid = `hello-${Math.random().toString(36).slice(2)}`
        const defs = ((): SVGDefsElement => {
          let d = svgEl!.querySelector("defs") as SVGDefsElement | null
          if (!d) {
            d = document.createElementNS("http://www.w3.org/2000/svg", "defs")
            svgEl!.insertBefore(d, svgEl!.firstChild)
          }
          return d
        })()

        const gradId = `helloGradient-${uid}`
        const gradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient")
        gradient.setAttribute("id", gradId)
        gradient.setAttribute("x1", "0%")
        gradient.setAttribute("y1", "0%")
        gradient.setAttribute("x2", "100%")
        gradient.setAttribute("y2", "0%")
        const stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop")
        stop1.setAttribute("offset", "0%")
        stop1.setAttribute("stop-color", "var(--hello-neon-start)")
        const stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop")
        stop2.setAttribute("offset", "100%")
        stop2.setAttribute("stop-color", "var(--hello-neon-end)")
        gradient.appendChild(stop1)
        gradient.appendChild(stop2)
        defs.appendChild(gradient)

        // Neon glow filter with expanded region to avoid clipping on mobile.
        // Tune: pad controls extra space around the viewBox; increase if glow is cut off.
        const glowId = `helloGlow-${uid}`
        const filter = document.createElementNS("http://www.w3.org/2000/svg", "filter")
        filter.setAttribute("id", glowId)
        filter.setAttribute("filterUnits", "userSpaceOnUse") // stable region, not tied to path bbox
        filter.setAttribute("color-interpolation-filters", "sRGB")
        const vb = svgEl.viewBox.baseVal
        const pad = 0.5 // 50% of viewBox on each side; lower to 0.25 if you need less
        const fx = vb.x - vb.width * pad
        const fy = vb.y - vb.height * pad
        const fw = vb.width * (1 + pad * 2)
        const fh = vb.height * (1 + pad * 2)
        filter.setAttribute("x", String(fx))
        filter.setAttribute("y", String(fy))
        filter.setAttribute("width", String(fw))
        filter.setAttribute("height", String(fh))

        // Performance: prefer a few moderate blurs over a single huge blur.
        // Reduced motion: use a lighter glow.
        const blur1 = document.createElementNS("http://www.w3.org/2000/svg", "feGaussianBlur")
        blur1.setAttribute("in", "SourceGraphic")
        blur1.setAttribute("stdDeviation", reducedMotion ? "0.75" : "2")
        blur1.setAttribute("result", "blur1")
        const blur2 = document.createElementNS("http://www.w3.org/2000/svg", "feGaussianBlur")
        blur2.setAttribute("in", "blur1")
        blur2.setAttribute("stdDeviation", reducedMotion ? "1.25" : "4")
        blur2.setAttribute("result", "blur2")
        const blur3 = document.createElementNS("http://www.w3.org/2000/svg", "feGaussianBlur")
        blur3.setAttribute("in", "blur2")
        blur3.setAttribute("stdDeviation", reducedMotion ? "1.5" : "8")
        blur3.setAttribute("result", "blur3")
        const merge = document.createElementNS("http://www.w3.org/2000/svg", "feMerge")
        const mn3 = document.createElementNS("http://www.w3.org/2000/svg", "feMergeNode")
        mn3.setAttribute("in", "blur3")
        const mn2 = document.createElementNS("http://www.w3.org/2000/svg", "feMergeNode")
        mn2.setAttribute("in", "blur2")
        const mn1 = document.createElementNS("http://www.w3.org/2000/svg", "feMergeNode")
        mn1.setAttribute("in", "blur1")
        const msrc = document.createElementNS("http://www.w3.org/2000/svg", "feMergeNode")
        msrc.setAttribute("in", "SourceGraphic")
        merge.appendChild(mn3)
        merge.appendChild(mn2)
        merge.appendChild(mn1)
        merge.appendChild(msrc)
        filter.appendChild(blur1)
        filter.appendChild(blur2)
        filter.appendChild(blur3)
        filter.appendChild(merge)
        defs.appendChild(filter)

        // Collect paths and set defaults if missing
        const paths = Array.from(svgEl.querySelectorAll("path"))
        if (paths.length === 0) {
          // Nothing to animate; finish quickly
          await fadeAndDone()
          return
        }

        // Default stroke styles, and force gradient stroke
        for (const p of paths) {
          p.setAttribute("stroke", `url(#${gradId})`)
          if (!p.hasAttribute("fill")) p.setAttribute("fill", "none")
          p.setAttribute("stroke-width", getComputedStyle(document.documentElement).getPropertyValue("--hello-stroke-width").trim() || "6")
          if (!p.hasAttribute("stroke-linecap")) p.setAttribute("stroke-linecap", "round")
          if (!p.hasAttribute("stroke-linejoin")) p.setAttribute("stroke-linejoin", "round")
        }

        // Wrap all strokes in a stable group with the SVG filter.
        // Important: apply the filter to a parent group so the region is stable
        // while dashoffset animates on the child paths.
        const strokeGroup = document.createElementNS("http://www.w3.org/2000/svg", "g")
        strokeGroup.setAttribute("id", `helloStroke-${uid}`)
        if (!reducedMotion) strokeGroup.setAttribute("filter", `url(#${glowId})`)
        // Move path nodes into the group (preserves references in `paths`).
        for (const p of paths) {
          const parent = p.parentNode
          if (parent) parent.removeChild(p)
          strokeGroup.appendChild(p)
        }
        svgEl.appendChild(strokeGroup)

        // Prepare stroke-dash animations
        const lengths = paths.map((p) => {
          try {
            return p.getTotalLength()
          } catch {
            return 0
          }
        })
        const totalLen = lengths.reduce((a, b) => a + b, 0)

        // Initialize dash
        paths.forEach((p, i) => {
          const len = lengths[i]
          p.style.strokeDasharray = `${len}`
          p.style.strokeDashoffset = `${len}`
        })

        // Animate using WAAPI; duration scaled with relative length within [1600, 2200]ms
        const minDur = reducedMotion ? 800 : 1600
        const maxDur = reducedMotion ? 1000 : 2200
        const range = maxDur - minDur

        const animMeta: { anim: Animation; path: SVGPathElement; len: number; duration: number }[] = []
        for (let i = 0; i < paths.length; i++) {
          const p = paths[i]
          const len = Math.max(1, lengths[i])
          const ratio = totalLen > 0 ? len / totalLen : 1
          const duration = Math.round(minDur + ratio * range)
          const anim = p.animate(
            [
              { strokeDashoffset: len },
              { strokeDashoffset: 0 },
            ],
            { duration, easing: "ease-in-out", fill: "forwards" }
          )
          animations.push(anim)
          animMeta.push({ anim, path: p, len, duration })
        }

        // Particles: subtle trail at the pen tip (skip for reduced motion)
        if (!reducedMotion) {
          stopParticles = startParticles(svgEl, animMeta)
        }

        // Wait for all animations to finish
        await Promise.allSettled(animations.map((a) => a.finished))
        if (cancelled) return

        await fadeAndDone()
      } catch (err) {
        // On any error, ensure we still set the flag and hide
        try { sessionStorage.setItem(storageKey, "1") } catch {}
        if (!cancelled) {
          // Reveal site immediately on failure
          try { document.documentElement.classList.remove("hello-intro-pending") } catch {}
          setFading(true)
          window.setTimeout(() => setShouldShow(false), 200)
        }
      } finally {
        finished = true
        try { document.documentElement.classList.remove("hello-intro-pending") } catch {}
      }
    }

    async function fadeAndDone() {
      try {
        sessionStorage.setItem(storageKey, "1")
      } catch {}
      if (!overlayRef.current) {
        setShouldShow(false)
        return
      }
      // Tiny elastic snap just before fading out
      if (!reducedMotion && mountRef.current) {
        try {
          await mountRef.current.animate(
            [
              { transform: "scale(1)" },
              { transform: "scale(1.035)" },
              { transform: "scale(1)" },
            ],
            { duration: 240, easing: "cubic-bezier(.2,.8,.2,1)", fill: "none" }
          ).finished
        } catch {}
      }

      // Reveal the site content by removing the pre-paint gate
      try { document.documentElement.classList.remove("hello-intro-pending") } catch {}

      setFading(true)
      // Wait ~400ms for fade-out
      await new Promise((r) => window.setTimeout(r, 420))
      if (!cancelled) setShouldShow(false)
    }

    run()

    return () => {
      cancelled = true
      controller.abort()
      window.clearTimeout(watchdog)
      animations.forEach((a) => {
        try {
          a.cancel()
        } catch {}
      })
      if (stopParticles) {
        try { stopParticles() } catch {}
      }
      // Remove inserted SVG to free memory
      try {
        if (svgEl && svgEl.parentNode) svgEl.parentNode.removeChild(svgEl)
      } catch {}
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldShow])

  type Particle = {
    el: HTMLSpanElement
    x: number
    y: number
    vx: number
    vy: number
    life: number
    ttl: number
    size: number
  }

  function startParticles(
    svg: SVGSVGElement,
    metas: { anim: Animation; path: SVGPathElement; len: number; duration: number }[]
  ): () => void {
    let lastTime = performance.now()
    let lastSpawn = lastTime
    const cap = 60 // Tune: maximum number of live particles
    let particles: Particle[] = []
    let rafId: number | null = null

    const step = (t: number) => {
      const dt = Math.min(64, t - lastTime)
      lastTime = t

      // Determine current drawing point from the first not-finished animation
      const active = metas.find((m) => toNum(m.anim.currentTime) < m.duration)
      if (active) {
        const progress = Math.max(0, Math.min(1, toNum(active.anim.currentTime) / active.duration))
        const p = safePointAt(active.path, active.len * progress)
        if (p && particlesRef.current) {
          // Emit time-based particles
          if (t - lastSpawn > 18 && particlesRef.current.childElementCount < cap) {
            lastSpawn = t
            const { x, y } = svgPointToScreen(svg, p.x, p.y)
            const el = document.createElement("span")
            el.className = "hello-intro__particle"
            // Initial placement
            el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(1)`
            particlesRef.current.appendChild(el)
            particles.push({ el, x, y, vx: (Math.random() - 0.5) * 0.04, vy: -Math.random() * 0.06, life: 0, ttl: 360, size: 4 })
          }
        }
      }

      // Update existing particles
      particles = particles.filter((pt: Particle) => {
        pt.life += dt
        const k = pt.life / pt.ttl
        if (k >= 1) {
          pt.el.remove()
          return false
        }
        // Motion integration (time in ms → scale velocities)
        pt.vy += 0.00012 * dt // gravity-like drift
        pt.x += pt.vx * dt
        pt.y += pt.vy * dt
        const s = 1 - 0.8 * k
        const o = 0.9 * (1 - k)
        pt.el.style.opacity = `${o}`
        pt.el.style.transform = `translate3d(${pt.x}px, ${pt.y}px, 0) scale(${s})`
        return true
      })

      rafId = requestAnimationFrame(step)
    }

    rafId = requestAnimationFrame(step)

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId)
      particles.forEach((p) => p.el.remove())
      particles = []
    }
  }

  function toNum(v: unknown): number {
    return typeof v === "number" ? v : 0
  }

  function safePointAt(path: SVGPathElement, length: number): DOMPoint | null {
    try {
      const p = path.getPointAtLength(length)
      return new DOMPoint(p.x, p.y)
    } catch {
      return null
    }
  }

  function svgPointToScreen(svg: SVGSVGElement, x: number, y: number) {
    const rect = svg.getBoundingClientRect()
    const vb = svg.viewBox.baseVal
    const sx = rect.width / vb.width
    const sy = rect.height / vb.height
    // Account for non-zero/minus viewBox origin
    const px = rect.left + (x - vb.x) * sx
    const py = rect.top + (y - vb.y) * sy
    return { x: px, y: py }
  }

  if (!shouldShow) return null

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      className={`hello-intro hello-intro-root ${fading ? "is-fading" : ""}`}
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
          display: flex;
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
          border-radius: 9999px;
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
