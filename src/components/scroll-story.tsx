"use client"

/**
 * ScrollStory — canvas frame animation (240 frames) + Framer Motion parallax overlays.
 *
 * Frame naming: /public/scroll-animation/frame-0001.webp … frame-0240.webp
 * Mobile (720p): /public/scroll-animation/frame-mobile-0001.webp … (if present)
 *
 * Scroll wrapper: 300dvh; canvas is sticky top-0 h-dvh inside it.
 * frameIndex = round(clamp(progress, 0, 1) * 239)
 * All 6 parallax overlays share the same useScroll progress.
 */

import { useEffect, useRef, useCallback } from "react"
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from "framer-motion"
import { Receipt, Calculator, TrendingUp, ArrowRight, LayoutDashboard } from "lucide-react"
import { FeatureChip } from "@/components/feature-chip"
import { GroovyButton } from "@/components/groovy-button"

const TOTAL = 240
const BATCH = 30
const BG = "#FBF5E8"

function frameSrc(i: number, mobile: boolean) {
  const n = String(i + 1).padStart(4, "0")
  return mobile
    ? `/scroll-animation/frame-mobile-${n}.webp`
    : `/scroll-animation/frame-${n}.webp`
}

function SpinningDaisy() {
  return (
    <div className="flex flex-col items-center gap-3">
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
      <span
        className="text-sm"
        style={{ fontFamily: "var(--font-body)", color: "#1A1A1A66" }}
      >
        Chargement…
      </span>
    </div>
  )
}

export function ScrollStory() {
  const wrapperRef  = useRef<HTMLDivElement>(null)
  const canvasRef   = useRef<HTMLCanvasElement>(null)
  const frames      = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL).fill(null))
  const readyRef    = useRef(false)
  const loaderRef   = useRef<HTMLDivElement>(null)
  const rafId       = useRef<number | null>(null)
  const curFrame    = useRef(0)
  const isMobile    = useRef(false)
  const reduced     = useRef(false)

  // ── Scroll progress over the 300dvh wrapper ──────────────────────────────
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  })

  // Smooth spring for motion (feel), raw for canvas (responsiveness)
  const smooth = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  // ── Canvas draw ──────────────────────────────────────────────────────────
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
    if (ir > cr) { dw = cw; dh = cw / ir; dx = 0;         dy = (ch - dh) / 2 }
    else         { dh = ch; dw = ch * ir; dy = 0;          dx = (cw - dw) / 2 }

    ctx.fillStyle = BG
    ctx.fillRect(0, 0, cw, ch)
    ctx.drawImage(img, dx, dy, dw, dh)
  }, [])

  // ── Sync canvas to raw scroll progress (bypasses spring for responsiveness)
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (!readyRef.current || reduced.current) return
    const next = Math.max(0, Math.min(TOTAL - 1, Math.round(p * (TOTAL - 1))))
    if (next === curFrame.current) return
    curFrame.current = next
    if (rafId.current !== null) cancelAnimationFrame(rafId.current)
    rafId.current = requestAnimationFrame(() => { draw(next); rafId.current = null })
  })

  // ── Preload frames in batches ─────────────────────────────────────────────
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
            if (loaderRef.current) loaderRef.current.style.display = "none"
            if (canvasRef.current) canvasRef.current.style.display = "block"
            draw(reduced.current ? TOTAL - 1 : 0)
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
      if (rafId.current !== null) cancelAnimationFrame(rafId.current)
    }
  }, [draw])

  // ── Resize ────────────────────────────────────────────────────────────────
  useEffect(() => {
    const onResize = () => { if (readyRef.current) draw(curFrame.current) }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [draw])

  // ── Framer Motion transforms (overlays use spring-smoothed progress) ──────

  // Overlay 1: 0 → 0.15 — Headline
  const o1Opacity = useTransform(smooth, [0, 0.04, 0.12, 0.18], [1, 1, 0.8, 0])
  const o1Y       = useTransform(smooth, [0, 0.04, 0.14, 0.18], [24, 0, 0, -40])

  // Overlay 2: 0.15 → 0.35 — Left copy (house blinks)
  const o2Opacity = useTransform(smooth, [0.13, 0.19, 0.31, 0.37], [0, 1, 1, 0])
  const o2X       = useTransform(smooth, [0.13, 0.19, 0.31, 0.37], [-60, 0, 0, -60])

  // Overlay 3: chips — staggered within 0.35–0.55
  const o3aOpacity = useTransform(smooth, [0.33, 0.38, 0.51, 0.57], [0, 1, 1, 0])
  const o3bOpacity = useTransform(smooth, [0.36, 0.41, 0.51, 0.57], [0, 1, 1, 0])
  const o3cOpacity = useTransform(smooth, [0.39, 0.44, 0.51, 0.57], [0, 1, 1, 0])
  const o3Y        = useTransform(smooth, [0.33, 0.40, 0.51, 0.57], [32, 0, 0, 32])

  // Overlay 4: 0.55 → 0.75 — "Tout sort tout seul."
  const o4Opacity = useTransform(smooth, [0.53, 0.59, 0.71, 0.77], [0, 1, 1, 0])
  const o4Scale   = useTransform(smooth, [0.53, 0.60, 0.71, 0.77], [0.88, 1, 1, 0.92])

  // Overlay 5: 0.75 → 0.95 — CTA row
  const o5Opacity = useTransform(smooth, [0.73, 0.79, 0.93, 0.98], [0, 1, 1, 0])
  const o5Y       = useTransform(smooth, [0.73, 0.80, 0.93, 0.98], [40, 0, 0, 40])

  // Overlay 6: 0.95 → 1 — Final flourish
  const o6Opacity = useTransform(smooth, [0.93, 0.97, 1], [0, 1, 1])
  const o6Rotate  = useTransform(smooth, [0.93, 1], [-8, -2])

  return (
    <section
      ref={wrapperRef}
      style={{ height: "300dvh" }}
      className="relative"
      aria-label="Présentation animée de LMNP Manager"
    >
      <span className="sr-only">
        Animation de la mascotte maison groovy qui s'anime et présente les fonctionnalités de LMNP Manager.
      </span>

      <div className="sticky top-0 h-dvh w-full overflow-hidden" style={{ background: BG }}>

        {/* ── Canvas ── */}
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute inset-0 h-full w-full"
          style={{ display: "none", background: BG }}
        />

        {/* ── Loader ── */}
        <div
          ref={loaderRef}
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: BG }}
        >
          <SpinningDaisy />
        </div>

        {/* ─────────────────────────────────────────────────────────────
            OVERLAY 1 — Headline (0 → 0.15)
        ───────────────────────────────────────────────────────────── */}
        <motion.div
          className="absolute inset-x-0 top-0 flex flex-col items-center pt-24 text-center sm:pt-32"
          style={{ opacity: o1Opacity, y: o1Y, pointerEvents: "none" }}
        >
          <h1
            className="font-bold uppercase leading-[0.88] tracking-tight"
            style={{
              fontFamily: "var(--font-display)",
              color: "#1A1A1A",
              fontSize: "clamp(44px, 7vw, 120px)",
            }}
          >
            Gérez votre LMNP
          </h1>
          <span
            className="-rotate-2 mt-2 block"
            style={{
              fontFamily: "var(--font-accent)",
              color: "#E8743B",
              fontSize: "clamp(28px, 4vw, 72px)",
            }}
          >
            sans prise de tête
          </span>
        </motion.div>

        {/* ─────────────────────────────────────────────────────────────
            OVERLAY 2 — Left copy (0.15 → 0.35)
        ───────────────────────────────────────────────────────────── */}
        <motion.div
          className="absolute left-0 top-0 flex h-full flex-col justify-center pl-8 sm:pl-14 lg:pl-20"
          style={{ opacity: o2Opacity, x: o2X, pointerEvents: "none", maxWidth: "380px" }}
        >
          <span
            className="mb-3 block rotate-1"
            style={{
              fontFamily: "var(--font-accent)",
              color: "#D9362C",
              fontSize: "clamp(22px, 2.5vw, 34px)",
            }}
          >
            Elle est mignonne hein ?
          </span>
          <p
            className="text-base leading-relaxed sm:text-lg"
            style={{ fontFamily: "var(--font-body)", color: "#1A1A1ABB" }}
          >
            Comme votre compta LMNP après 5 min chez nous&nbsp;: réveillée, souriante, propre.
          </p>
        </motion.div>

        {/* ─────────────────────────────────────────────────────────────
            OVERLAY 3 — Feature chips, right side (0.35 → 0.55)
        ───────────────────────────────────────────────────────────── */}
        <motion.div
          className="absolute right-8 top-0 flex h-full flex-col items-end justify-center gap-4 sm:right-14 lg:right-20"
          style={{ y: o3Y, pointerEvents: "none" }}
        >
          <motion.div style={{ opacity: o3aOpacity }}>
            <FeatureChip icon={Receipt} label="Quittances auto" />
          </motion.div>
          <motion.div style={{ opacity: o3bOpacity }}>
            <FeatureChip icon={Calculator} label="Amortissement réel" />
          </motion.div>
          <motion.div style={{ opacity: o3cOpacity }}>
            <FeatureChip icon={TrendingUp} label="Cash-flow live" />
          </motion.div>
        </motion.div>

        {/* ─────────────────────────────────────────────────────────────
            OVERLAY 4 — "Tout sort tout seul." (0.55 → 0.75)
        ───────────────────────────────────────────────────────────── */}
        <motion.div
          className="absolute inset-x-0 bottom-0 flex flex-col items-center pb-20 text-center sm:pb-28"
          style={{ opacity: o4Opacity, scale: o4Scale, pointerEvents: "none" }}
        >
          <h2
            className="font-bold uppercase leading-[0.88]"
            style={{
              fontFamily: "var(--font-display)",
              color: "#1A1A1A",
              fontSize: "clamp(48px, 8vw, 120px)",
            }}
          >
            Tout sort tout seul.
          </h2>
          <span
            className="mt-2 rotate-1 block"
            style={{
              fontFamily: "var(--font-accent)",
              color: "#E8743B",
              fontSize: "clamp(22px, 3vw, 44px)",
            }}
          >
            (enfin presque)
          </span>
        </motion.div>

        {/* ─────────────────────────────────────────────────────────────
            OVERLAY 5 — CTA row (0.75 → 0.95)
        ───────────────────────────────────────────────────────────── */}
        <motion.div
          className="absolute inset-x-0 bottom-0 flex flex-col items-center pb-12 sm:pb-20"
          style={{ opacity: o5Opacity, y: o5Y }}
        >
          <div className="flex flex-wrap items-center justify-center gap-4">
            <GroovyButton href="/dashboard" size="lg">
              <LayoutDashboard className="h-4 w-4" />
              Essayer gratuitement
              <ArrowRight className="h-4 w-4" />
            </GroovyButton>
            <GroovyButton href="/simulateur" variant="secondary" size="lg">
              Voir le simulateur
            </GroovyButton>
          </div>
          <p
            className="mt-4 text-sm"
            style={{ fontFamily: "var(--font-body)", color: "#1A1A1A66" }}
          >
            14 jours gratuits · sans carte bancaire
          </p>
        </motion.div>

        {/* ─────────────────────────────────────────────────────────────
            OVERLAY 6 — Final flourish (0.95 → 1)
        ───────────────────────────────────────────────────────────── */}
        <motion.div
          className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10"
          style={{ opacity: o6Opacity, rotate: o6Rotate, pointerEvents: "none" }}
        >
          <span
            style={{
              fontFamily: "var(--font-accent)",
              color: "#D9362C",
              fontSize: "clamp(24px, 4vw, 60px)",
            }}
          >
            Prêt à scroller dans la vie ?
          </span>
        </motion.div>

        {/* ── Scroll hint (visible only at progress ≈ 0) ── */}
        <motion.div
          className="absolute inset-x-0 bottom-6 flex flex-col items-center gap-1.5"
          style={{
            opacity: useTransform(smooth, [0, 0.08], [1, 0]),
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-accent)",
              color: "#1A1A1A88",
              fontSize: "clamp(16px, 1.8vw, 22px)",
            }}
          >
            scrollez pour voir
          </span>
          <span className="animate-bounce text-xl" style={{ color: "#1A1A1A66" }}>↓</span>
        </motion.div>

      </div>
    </section>
  )
}
