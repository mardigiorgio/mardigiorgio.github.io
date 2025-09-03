// Heavy animation logic for HelloIntro, loaded lazily on demand

type HelloIntroOptions = {
  overlayEl: HTMLDivElement
  mountEl: HTMLDivElement
  particlesEl: HTMLDivElement
  storageKey: string
  reducedMotion: boolean
  onFading: () => void
  onDone: () => void
}

declare global {
  interface Window {
    finishIntro?: () => void
    __introFailTimer?: number
  }
}

export function runHelloIntro(opts: HelloIntroOptions): { stop: () => void } {
  const { overlayEl, mountEl, particlesEl, reducedMotion, storageKey, onFading, onDone } = opts

  let cancelled = false
  let finished = false
  const controller = new AbortController()
  const animations: Animation[] = []
  let svgEl: SVGSVGElement | null = null
  let stopParticles: (() => void) | null = null

  const watchdog = window.setTimeout(() => {
    if (!finished && !cancelled) {
      try { sessionStorage.setItem(storageKey, '1') } catch {}
      try { window.finishIntro && window.finishIntro() } catch {}
      onFading()
      window.setTimeout(() => onDone(), 200)
    }
  }, reducedMotion ? 3500 : 6500)

  ;(async () => {
    try {
      // Wait for full page load and fonts
      if (document.readyState !== 'complete') {
        await new Promise<void>((resolve) => window.addEventListener('load', () => resolve(), { once: true }))
      }
      if ((document as any).fonts && (document as any).fonts.ready) {
        try { await (document as any).fonts.ready } catch {}
      }
      await new Promise<void>((r) => requestAnimationFrame(() => requestAnimationFrame(() => r())))

      // Fetch SVG with base-aware URL
      const svgUrl = new URL('hello.svg', document.baseURI).toString()
      const res = await fetch(svgUrl, { signal: controller.signal, cache: 'no-store' })
      if (!res.ok) throw new Error(`Failed to fetch ${svgUrl}: ${res.status}`)
      const text = await res.text()
      if (cancelled) return

      // Parse SVG
      const parser = new DOMParser()
      const doc = parser.parseFromString(text, 'image/svg+xml')
      const found = doc.querySelector('svg') as SVGSVGElement | null
      if (!found) throw new Error('No <svg> root in hello.svg response')
      svgEl = document.importNode(found, true) as SVGSVGElement

      // Ensure responsive sizing via viewBox
      if (!svgEl.getAttribute('viewBox') && svgEl.hasAttribute('width') && svgEl.hasAttribute('height')) {
        const w = Number(svgEl.getAttribute('width')) || 0
        const h = Number(svgEl.getAttribute('height')) || 0
        if (w > 0 && h > 0) svgEl.setAttribute('viewBox', `0 0 ${w} ${h}`)
      }
      svgEl.setAttribute('overflow', 'visible')

      // Mount SVG
      mountEl.innerHTML = ''
      mountEl.appendChild(svgEl)

      const uid = `hello-${Math.random().toString(36).slice(2)}`
      const defs = ((): SVGDefsElement => {
        let d = svgEl!.querySelector('defs') as SVGDefsElement | null
        if (!d) {
          d = document.createElementNS('http://www.w3.org/2000/svg', 'defs')
          svgEl!.insertBefore(d, svgEl!.firstChild)
        }
        return d
      })()

      const gradId = `helloGradient-${uid}`
      const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient')
      gradient.setAttribute('id', gradId)
      gradient.setAttribute('x1', '0%')
      gradient.setAttribute('y1', '0%')
      gradient.setAttribute('x2', '100%')
      gradient.setAttribute('y2', '0%')
      const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop')
      stop1.setAttribute('offset', '0%')
      stop1.setAttribute('stop-color', 'var(--hello-neon-start)')
      const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop')
      stop2.setAttribute('offset', '100%')
      stop2.setAttribute('stop-color', 'var(--hello-neon-end)')
      gradient.appendChild(stop1)
      gradient.appendChild(stop2)
      defs.appendChild(gradient)

      // Glow filter with expanded region
      const glowId = `helloGlow-${uid}`
      const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter')
      filter.setAttribute('id', glowId)
      filter.setAttribute('filterUnits', 'userSpaceOnUse')
      filter.setAttribute('color-interpolation-filters', 'sRGB')
      const vb = svgEl.viewBox.baseVal
      const pad = 0.5
      const fx = vb.x - vb.width * pad
      const fy = vb.y - vb.height * pad
      const fw = vb.width * (1 + pad * 2)
      const fh = vb.height * (1 + pad * 2)
      filter.setAttribute('x', String(fx))
      filter.setAttribute('y', String(fy))
      filter.setAttribute('width', String(fw))
      filter.setAttribute('height', String(fh))
      const blur1 = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur')
      blur1.setAttribute('in', 'SourceGraphic')
      blur1.setAttribute('stdDeviation', reducedMotion ? '0.75' : '2')
      blur1.setAttribute('result', 'blur1')
      const blur2 = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur')
      blur2.setAttribute('in', 'blur1')
      blur2.setAttribute('stdDeviation', reducedMotion ? '1.25' : '4')
      blur2.setAttribute('result', 'blur2')
      const blur3 = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur')
      blur3.setAttribute('in', 'blur2')
      blur3.setAttribute('stdDeviation', reducedMotion ? '1.5' : '8')
      blur3.setAttribute('result', 'blur3')
      const merge = document.createElementNS('http://www.w3.org/2000/svg', 'feMerge')
      const mn3 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode')
      mn3.setAttribute('in', 'blur3')
      const mn2 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode')
      mn2.setAttribute('in', 'blur2')
      const mn1 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode')
      mn1.setAttribute('in', 'blur1')
      const msrc = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode')
      msrc.setAttribute('in', 'SourceGraphic')
      merge.appendChild(mn3)
      merge.appendChild(mn2)
      merge.appendChild(mn1)
      merge.appendChild(msrc)
      filter.appendChild(blur1)
      filter.appendChild(blur2)
      filter.appendChild(blur3)
      filter.appendChild(merge)
      defs.appendChild(filter)

      // Collect paths
      const paths = Array.from(svgEl.querySelectorAll('path'))
      if (paths.length === 0) {
        await fadeAndDone()
        return
      }
      for (const p of paths) {
        p.setAttribute('stroke', `url(#${gradId})`)
        if (!p.hasAttribute('fill')) p.setAttribute('fill', 'none')
        p.setAttribute(
          'stroke-width',
          getComputedStyle(document.documentElement).getPropertyValue('--hello-stroke-width').trim() || '6'
        )
        if (!p.hasAttribute('stroke-linecap')) p.setAttribute('stroke-linecap', 'round')
        if (!p.hasAttribute('stroke-linejoin')) p.setAttribute('stroke-linejoin', 'round')
      }

      const strokeGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g')
      strokeGroup.setAttribute('id', `helloStroke-${uid}`)
      if (!reducedMotion) strokeGroup.setAttribute('filter', `url(#${glowId})`)
      for (const p of paths) {
        const parent = p.parentNode
        if (parent) parent.removeChild(p)
        strokeGroup.appendChild(p)
      }
      svgEl.appendChild(strokeGroup)

      // Stroke-dash animations
      const lengths = paths.map((p) => {
        try { return p.getTotalLength() } catch { return 0 }
      })
      const totalLen = lengths.reduce((a, b) => a + b, 0)
      paths.forEach((p, i) => {
        const len = lengths[i]
        p.style.strokeDasharray = `${len}`
        p.style.strokeDashoffset = `${len}`
      })
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
          [ { strokeDashoffset: len }, { strokeDashoffset: 0 } ],
          { duration, easing: 'ease-in-out', fill: 'forwards' }
        )
        animations.push(anim)
        animMeta.push({ anim, path: p, len, duration })
      }

      if (!reducedMotion) {
        stopParticles = startParticles(svgEl, particlesEl, animMeta)
      }

      await Promise.allSettled(animations.map((a) => a.finished))
      if (cancelled) return
      await fadeAndDone()
    } catch {
      try { sessionStorage.setItem(storageKey, '1') } catch {}
      if (!cancelled) {
        try { window.finishIntro && window.finishIntro() } catch {}
        onFading()
        window.setTimeout(() => onDone(), 200)
      }
    } finally {
      finished = true
    }
  })()

  async function fadeAndDone() {
    try { sessionStorage.setItem(storageKey, '1') } catch {}
    // Small elastic snap
    if (!reducedMotion && mountEl) {
      try {
        await mountEl.animate(
          [ { transform: 'scale(1)' }, { transform: 'scale(1.035)' }, { transform: 'scale(1)' } ],
          { duration: 240, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'none' }
        ).finished
      } catch {}
    }
    try { window.finishIntro && window.finishIntro() } catch {}
    onFading()
    await new Promise((r) => window.setTimeout(r, 420))
    if (!cancelled) onDone()
  }

  function stop() {
    cancelled = true
    controller.abort()
    window.clearTimeout(watchdog)
    animations.forEach((a) => { try { a.cancel() } catch {} })
    if (stopParticles) { try { stopParticles() } catch {} }
    try { if (svgEl && svgEl.parentNode) svgEl.parentNode.removeChild(svgEl) } catch {}
  }

  return { stop }
}

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
  container: HTMLDivElement,
  metas: { anim: Animation; path: SVGPathElement; len: number; duration: number }[]
): () => void {
  let lastTime = performance.now()
  let lastSpawn = lastTime
  const cap = 60
  let particles: Particle[] = []
  let rafId: number | null = null

  const step = (t: number) => {
    const dt = Math.min(64, t - lastTime)
    lastTime = t

    const active = metas.find((m) => toNum(m.anim.currentTime) < m.duration)
    if (active) {
      const progress = Math.max(0, Math.min(1, toNum(active.anim.currentTime) / active.duration))
      const p = safePointAt(active.path, active.len * progress)
      if (p && container) {
        if (t - lastSpawn > 18 && container.childElementCount < cap) {
          lastSpawn = t
          const { x, y } = svgPointToScreen(svg, p.x, p.y)
          const el = document.createElement('span')
          el.className = 'hello-intro__particle'
          el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(1)`
          container.appendChild(el)
          particles.push({ el, x, y, vx: (Math.random() - 0.5) * 0.04, vy: -Math.random() * 0.06, life: 0, ttl: 360, size: 4 })
        }
      }
    }

    particles = particles.filter((pt: Particle) => {
      pt.life += dt
      const k = pt.life / pt.ttl
      if (k >= 1) {
        pt.el.remove()
        return false
      }
      pt.vy += 0.00012 * dt
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
  return typeof v === 'number' ? v : 0
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
  const px = rect.left + (x - vb.x) * sx
  const py = rect.top + (y - vb.y) * sy
  return { x: px, y: py }
}

