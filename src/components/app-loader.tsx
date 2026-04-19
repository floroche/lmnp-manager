"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const SESSION_KEY = "lmnp_loader_seen"
const DURATION = 3500

function LoaderContent({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, DURATION)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-6"
      style={{ background: "#FFFFFF" }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <video
          muted
          autoPlay
          playsInline
          onEnded={onDone}
          className="h-[60dvh] max-h-[520px] w-auto object-contain"
          aria-hidden
        >
          <source src="/mascot-hero.webm" type="video/webm" />
          <source src="/mascot-hero.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Barre de progression */}
      <div className="h-[3px] w-32 overflow-hidden rounded-full" style={{ background: "#1A1A1A12" }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: "#E8743B" }}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: DURATION / 1000 - 0.3, ease: "linear" }}
        />
      </div>

      <p className="text-[11px] font-bold uppercase tracking-[0.22em]"
        style={{ fontFamily: "var(--font-display)", color: "#1A1A1A30" }}>
        Chargement…
      </p>

      {/* Skip */}
      <button
        onClick={onDone}
        className="absolute bottom-8 right-8 text-[11px] font-bold uppercase tracking-widest opacity-30 transition-opacity hover:opacity-60"
        style={{ fontFamily: "var(--font-display)", color: "#1A1A1A" }}
      >
        Passer →
      </button>
    </motion.div>
  )
}

export function AppLoader() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const force = new URLSearchParams(window.location.search).has("loader")
    if (!force && sessionStorage.getItem(SESSION_KEY)) return
    setVisible(true)
    sessionStorage.setItem(SESSION_KEY, "1")
  }, [])

  return (
    <AnimatePresence>
      {visible && <LoaderContent key="loader" onDone={() => setVisible(false)} />}
    </AnimatePresence>
  )
}
