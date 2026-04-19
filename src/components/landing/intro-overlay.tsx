"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

export function IntroOverlay() {
  const [visible, setVisible] = useState(true)
  const [progress, setProgress] = useState(0)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const dismissedRef = useRef(false)

  const dismiss = useCallback(() => {
    if (dismissedRef.current) return
    dismissedRef.current = true
    setVisible(false)
  }, [])

  // Callback ref — s'exécute synchroniquement à l'insertion DOM
  // Contourne le bug React où muted/autoPlay ne sont pas appliqués au DOM
  const setVideo = useCallback((el: HTMLVideoElement | null) => {
    videoRef.current = el
    if (!el) return

    el.muted = true
    el.playsInline = true
    el.setAttribute("muted", "")
    el.setAttribute("playsinline", "")

    const tryPlay = () => el.play().catch(() => {})

    if (el.readyState >= 2) {
      tryPlay()
    } else {
      el.addEventListener("canplay", tryPlay, { once: true })
    }
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const onUpdate = () => {
      if (video.duration) setProgress(video.currentTime / video.duration)
    }
    const onEnded = () => setTimeout(dismiss, 400)

    video.addEventListener("timeupdate", onUpdate)
    video.addEventListener("ended", onEnded)

    const safety = setTimeout(dismiss, 15000)

    return () => {
      video.removeEventListener("timeupdate", onUpdate)
      video.removeEventListener("ended", onEnded)
      clearTimeout(safety)
    }
  }, [dismiss])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="fixed inset-0 z-[99999] overflow-hidden"
          style={{ background: "#0B1A10" }}
        >
          <video
            ref={setVideo}
            className="absolute inset-0 h-full w-full object-cover cursor-pointer"
            src="/mascot-hero.mp4"
            poster="/mascot-hero-poster.jpg"
            autoPlay
            muted
            playsInline
            onClick={() => videoRef.current?.play().catch(() => {})}
            onCanPlay={() => console.log("[intro] canplay")}
            onPlay={() => console.log("[intro] playing ✓")}
            onError={(e) => console.error("[intro] error", e)}
          />

          {/* Bottom gradient */}
          <div className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(11,26,16,0.9) 0%, rgba(11,26,16,0.2) 50%, transparent 100%)" }} />

          {/* Brand + skip */}
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between px-8 pb-10">
            <div className="flex items-center gap-3">
              <Image src="/mascot-logo.png" alt="" width={28} height={36} quality={100} className="opacity-80" style={{ height: "auto" }} />
              <div>
                <div className="text-[14px] font-bold tracking-[0.08em]"
                  style={{ fontFamily: "var(--font-fraunces)", color: "#FBF5E8" }}>
                  LMNP Manager
                </div>
                <div className="mt-0.5 text-[12px] italic"
                  style={{ fontFamily: "var(--font-fraunces)", color: "#FBF5E870" }}>
                  une appli, une maison, toute votre fiscalité.
                </div>
              </div>
            </div>
            <button
              onClick={dismiss}
              className="flex items-center gap-1.5 rounded-full px-4 py-2 text-[12px] font-medium transition-all hover:bg-white/10"
              style={{
                fontFamily: "var(--font-inter)",
                color: "#FBF5E880",
                border: "1px solid #FBF5E820",
                background: "transparent",
                cursor: "pointer",
              }}
            >
              Passer l&apos;intro →
            </button>
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-0 inset-x-0 h-[3px]" style={{ background: "#FBF5E810" }}>
            <div className="h-full transition-none" style={{ background: "#F4C430", width: `${progress * 100}%` }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
