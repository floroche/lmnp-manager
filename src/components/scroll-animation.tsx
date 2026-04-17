"use client"

/**
 * ScrollAnimation — séquence de frames scroll-driven sur <canvas>
 *
 * Frames : /public/scroll-animation/frame-0001.webp … frame-0240.webp (desktop)
 *          /public/scroll-animation/frame-mobile-0001.webp … (mobile 720p)
 *
 * Générer les WebP : node scripts/optimize-frames.mjs
 *
 * La section mesure 300dvh. Le contenu enfant est affiché en overlay sur le canvas.
 */

import { useEffect, useRef, useState, useCallback } from "react"

const TOTAL_FRAMES = 240
const BATCH_SIZE = 30
const BG = "#FBF5E8"

function frameSrc(i: number, mobile: boolean): string {
  const n = String(i + 1).padStart(4, "0")
  return mobile
    ? `/scroll-animation/frame-mobile-${n}.webp`
    : `/scroll-animation/frame-${n}.webp`
}

function SpinningDaisy() {
  return (
    <div className="flex flex-col items-center gap-4" aria-label="Chargement de l'animation">
      <svg
        width="48"
        height="48"
        viewBox="0 0 40 40"
        fill="none"
        className="animate-spin"
        style={{ animationDuration: "1.4s" }}
      >
        <ellipse cx="20" cy="8" rx="5" ry="9" fill="white" stroke="#1A1A1A" strokeWidth="2" />
        <ellipse cx="20" cy="32" rx="5" ry="9" fill="white" stroke="#1A1A1A" strokeWidth="2" />
        <ellipse cx="8" cy="20" rx="9" ry="5" fill="white" stroke="#1A1A1A" strokeWidth="2" />
        <ellipse cx="32" cy="20" rx="9" ry="5" fill="white" stroke="#1A1A1A" strokeWidth="2" />
        <circle cx="20" cy="20" r="7" fill="#F4C430" stroke="#1A1A1A" strokeWidth="2" />
        <circle cx="20" cy="20" r="2.5" fill="#1A1A1A" />
      </svg>
      <p className="text-sm text-[#1A1A1A]/50" style={{ fontFamily: "var(--font-body)" }}>
        Chargement…
      </p>
    </div>
  )
}

interface ScrollAnimationProps {
  children?: React.ReactNode
}

export function ScrollAnimation({ children }: ScrollAnimationProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const frames     = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null))
  const curFrame   = useRef(0)
  const rafId      = useRef<number | null>(null)
  const isMobile   = useRef(false)
  const reduced    = useRef(false)

  const [ready, setReady] = useState(false)

  const draw = useCallback((idx: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const img = frames.current[idx]
    if (!img?.complete || img.naturalWidth === 0) return

    const dpr = window.devicePixelRatio || 1
    const cw  = canvas.clientWidth
    const ch  = canvas.clientHeight

    if (canvas.width !== Math.round(cw * dpr) || canvas.height !== Math.round(ch * dpr)) {
      canvas.width  = Math.round(cw * dpr)
      canvas.height = Math.round(ch * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    // Letterbox (contain)
    const ir = img.naturalWidth / img.naturalHeight
    const cr = cw / ch
    let dw: number, dh: number, dx: number, dy: number
    if (ir > cr) { dw = cw; dh = cw / ir; dx = 0; dy = (ch - dh) / 2 }
    else          { dh = ch; dw = ch * ir; dy = 0; dx = (cw - dw) / 2 }

    ctx.fillStyle = BG
    ctx.fillRect(0, 0, cw, ch)
    ctx.drawImage(img, dx, dy, dw, dh)
  }, [])

  useEffect(() => {
    isMobile.current = window.matchMedia("(max-width: 767px)").matches
    reduced.current  = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let cancelled = false

    const loadBatch = (start: number) => {
      if (cancelled || start >= TOTAL_FRAMES) return
      const end   = Math.min(start + BATCH_SIZE, TOTAL_FRAMES)
      const count = end - start
      let done    = 0

      for (let i = start; i < end; i++) {
        const img = new Image()
        img.decoding = "async"

        const finish = (ok: boolean) => {
          if (cancelled) return
          if (ok) frames.current[i] = img
          if (i === 0 && ok) setReady(true)
          if (++done === count) {
            const next = () => { if (!cancelled) loadBatch(end) }
            typeof window !== "undefined" && "requestIdleCallback" in window
              ? (window as unknown as { requestIdleCallback: (fn: () => void) => void }).requestIdleCallback(next)
              : setTimeout(next, 0)
          }
        }

        img.onload  = () => finish(true)
        img.onerror = () => finish(false)
        img.src = frameSrc(i, isMobile.current)
      }
    }

    loadBatch(0)
    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    if (!ready) return
    draw(reduced.current ? TOTAL_FRAMES - 1 : 0)
  }, [ready, draw])

  useEffect(() => {
    if (!ready || reduced.current) return

    const onScroll = () => {
      const el = sectionRef.current
      if (!el) return
      const scrollable = el.offsetHeight - window.innerHeight
      const scrolled   = el.getBoundingClientRect().top * -1
      const progress   = Math.max(0, Math.min(1, scrolled / scrollable))
      const next       = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(progress * (TOTAL_FRAMES - 1))))
      if (next === curFrame.current) return
      curFrame.current = next

      if (rafId.current !== null) cancelAnimationFrame(rafId.current)
      rafId.current = requestAnimationFrame(() => { draw(next); rafId.current = null })
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (rafId.current !== null) { cancelAnimationFrame(rafId.current); rafId.current = null }
    }
  }, [ready, draw])

  useEffect(() => {
    if (!ready) return
    const onResize = () => draw(curFrame.current)
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [ready, draw])

  return (
    <section
      ref={sectionRef}
      aria-label="Animation d'introduction LMNP Manager"
      style={{ height: "300dvh" }}
      className="relative"
    >
      <span className="sr-only">
        Animation montrant une maison groovy qui s'anime au fil du défilement pour introduire LMNP Manager.
      </span>

      <div className="sticky top-0 h-dvh w-full overflow-hidden">
        {/* Canvas frame */}
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute inset-0 h-full w-full"
          style={{ background: BG, display: ready ? "block" : "none" }}
        />

        {/* Loader */}
        {!ready && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: BG }}
          >
            <SpinningDaisy />
          </div>
        )}

        {/* Overlay content (hero text, nav, CTA) */}
        {children && (
          <div className="absolute inset-0">
            {children}
          </div>
        )}
      </div>
    </section>
  )
}
