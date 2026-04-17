"use client"

import { useEffect, useRef, useCallback } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const TOTAL_FRAMES = 40
const LOOPS = 2        // nombre de cycles sur les 200dvh
const BG = "#FBF5E8"

function frameSrc(i: number): string {
  const n = String(i + 1).padStart(4, "0")
  return `/scroll-animation/frame-${n}.webp`
}

interface ScrollTestProps {
  children?: React.ReactNode
}

export function ScrollTest({ children }: ScrollTestProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const frames     = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null))
  const curFrame   = useRef(0)
  const loaded     = useRef(0)

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
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let cancelled = false

    const initST = () => {
      if (cancelled || !sectionRef.current) return
      if (reduced) { draw(TOTAL_FRAMES - 1); return }

      const obj = { progress: 0 }

      gsap.to(obj, {
        progress: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          onUpdate: () => {
            // Boucle : LOOPS cycles complets sur tout le scroll
            const raw = obj.progress * TOTAL_FRAMES * LOOPS
            const idx = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(raw) % TOTAL_FRAMES))
            if (idx !== curFrame.current) {
              curFrame.current = idx
              draw(idx)
            }
          },
        },
      })
    }

    // Preload all frames; draw frame 0 as soon as it's ready
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image()
      img.decoding = "async"
      img.onload = () => {
        if (cancelled) return
        frames.current[i] = img
        loaded.current++
        if (i === 0) draw(0)
        if (loaded.current === TOTAL_FRAMES) initST()
      }
      img.onerror = () => {
        if (cancelled) return
        loaded.current++
        if (loaded.current === TOTAL_FRAMES) initST()
      }
      img.src = frameSrc(i)
    }

    const onResize = () => draw(curFrame.current)
    window.addEventListener("resize", onResize)

    return () => {
      cancelled = true
      window.removeEventListener("resize", onResize)
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [draw])

  return (
    <section
      ref={sectionRef}
      aria-label="Animation d'introduction"
      style={{ height: "300dvh" }}
      className="relative"
    >
      <span className="sr-only">Animation scroll-driven sur 40 frames.</span>

      <div className="sticky top-0 h-dvh w-full">
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute inset-0 h-full w-full"
          style={{ background: BG }}
        />

        {children && (
          <div className="absolute inset-0">
            {children}
          </div>
        )}
      </div>
    </section>
  )
}
