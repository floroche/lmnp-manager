"use client"

/**
 * HeroAnimation — lecture automatique des 240 frames à ~24fps.
 * Pas de scroll-driven : l'animation tourne en boucle comme une vidéo.
 * prefers-reduced-motion → frame statique uniquement.
 */

import { useEffect, useRef, useCallback } from "react"

const TOTAL  = 240
const BATCH  = 30
const FPS    = 24
const BG     = "#FBF5E8"

function frameSrc(i: number, mobile: boolean) {
  const n = String(i + 1).padStart(4, "0")
  return mobile
    ? `/scroll-animation/frame-mobile-${n}.webp`
    : `/scroll-animation/frame-${n}.webp`
}

export function HeroAnimation() {
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const loaderRef  = useRef<HTMLDivElement>(null)
  const frames     = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL).fill(null))
  const readyRef   = useRef(false)
  const rafId      = useRef<number | null>(null)
  const lastTime   = useRef<number>(0)
  const curFrame   = useRef(0)
  const isMobile   = useRef(false)
  const reduced    = useRef(false)
  const interval   = 1000 / FPS

  const draw = useCallback((idx: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const img = frames.current[idx]
    if (!img?.complete || !img.naturalWidth) return

    const dpr = window.devicePixelRatio || 1
    const cw  = canvas.clientWidth
    const ch  = canvas.clientHeight

    if (canvas.width !== Math.round(cw * dpr) || canvas.height !== Math.round(ch * dpr)) {
      canvas.width  = Math.round(cw * dpr)
      canvas.height = Math.round(ch * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const ir = img.naturalWidth / img.naturalHeight
    const cr = cw / ch
    let dw: number, dh: number, dx: number, dy: number
    if (ir > cr) { dw = cw; dh = cw / ir; dx = 0; dy = (ch - dh) / 2 }
    else         { dh = ch; dw = ch * ir; dy = 0; dx = (cw - dw) / 2 }

    ctx.fillStyle = BG
    ctx.fillRect(0, 0, cw, ch)
    ctx.drawImage(img, dx, dy, dw, dh)
  }, [])

  const tick = useCallback((ts: number) => {
    if (!readyRef.current) { rafId.current = requestAnimationFrame(tick); return }
    if (ts - lastTime.current >= interval) {
      lastTime.current = ts
      const next = (curFrame.current + 1) % TOTAL
      // Only advance if next frame is loaded — avoids blank flicker
      if (frames.current[next]) {
        curFrame.current = next
        draw(next)
      }
    }
    rafId.current = requestAnimationFrame(tick)
  }, [draw, interval])

  useEffect(() => {
    isMobile.current = window.matchMedia("(max-width: 767px)").matches
    reduced.current  = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let cancelled    = false

    const loadBatch = (start: number) => {
      if (cancelled || start >= TOTAL) return
      const end   = Math.min(start + BATCH, TOTAL)
      let done    = 0
      const count = end - start

      for (let i = start; i < end; i++) {
        const img = new Image()
        img.decoding = "async"

        const finish = (ok: boolean) => {
          if (cancelled) return
          if (ok) frames.current[i] = img

          if (i === 0 && ok) {
            readyRef.current = true
            if (loaderRef.current)  loaderRef.current.style.display  = "none"
            if (canvasRef.current)  canvasRef.current.style.display  = "block"
            draw(0)
            // Start playback only if motion allowed
            if (!reduced.current) rafId.current = requestAnimationFrame(tick)
          }

          if (++done === count) {
            const next = () => { if (!cancelled) loadBatch(end) }
            "requestIdleCallback" in window
              ? (window as unknown as { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(next)
              : setTimeout(next, 0)
          }
        }

        img.onload  = () => finish(true)
        img.onerror = () => finish(false)
        img.src     = frameSrc(i, isMobile.current)
      }
    }

    loadBatch(0)
    return () => {
      cancelled = true
      if (rafId.current !== null) { cancelAnimationFrame(rafId.current); rafId.current = null }
    }
  }, [draw, tick])

  useEffect(() => {
    const onResize = () => draw(curFrame.current)
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [draw])

  return (
    <div className="relative h-dvh w-full" style={{ background: BG }}>
      {/* Loader */}
      <div
        ref={loaderRef}
        className="absolute inset-0 flex items-center justify-center"
        style={{ background: BG }}
        aria-label="Chargement de l'animation"
      >
        <svg
          width="52"
          height="52"
          viewBox="0 0 40 40"
          fill="none"
          className="animate-spin"
          style={{ animationDuration: "1.2s" }}
        >
          <ellipse cx="20" cy="8" rx="5" ry="9" fill="white" stroke="#1A1A1A" strokeWidth="2" />
          <ellipse cx="20" cy="32" rx="5" ry="9" fill="white" stroke="#1A1A1A" strokeWidth="2" />
          <ellipse cx="8" cy="20" rx="9" ry="5" fill="white" stroke="#1A1A1A" strokeWidth="2" />
          <ellipse cx="32" cy="20" rx="9" ry="5" fill="white" stroke="#1A1A1A" strokeWidth="2" />
          <circle cx="20" cy="20" r="7" fill="#F4C430" stroke="#1A1A1A" strokeWidth="2" />
          <circle cx="20" cy="20" r="2.5" fill="#1A1A1A" />
        </svg>
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
        style={{ display: "none", background: BG }}
      />

      {/* Scroll hint */}
      <div
        className="absolute inset-x-0 bottom-8 flex flex-col items-center gap-1.5"
        style={{ pointerEvents: "none" }}
      >
        <span
          className="text-xl sm:text-2xl"
          style={{ fontFamily: "var(--font-accent)", color: "#1A1A1A99" }}
        >
          défiler pour en savoir plus
        </span>
        <svg
          className="animate-bounce"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          style={{ color: "#1A1A1A66" }}
        >
          <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  )
}
