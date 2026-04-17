"use client"

import Image from "next/image"
import { motion, type Variants } from "framer-motion"
import { LayoutDashboard, ArrowRight, Check, Sparkles } from "lucide-react"
import { GroovyButton } from "@/components/groovy-button"

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
}
const up: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 90, damping: 20 } },
}
const pop: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 140, damping: 14, delay: 0.5 } },
}

export function AnimatedHero() {
  return (
    <section className="relative min-h-dvh overflow-hidden" style={{ background: "#0B1A10" }}>

      {/* Grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: "url(/grain.png)", backgroundRepeat: "repeat", opacity: 0.07 }}
      />

      {/* Halo or */}
      <div aria-hidden className="pointer-events-none absolute right-0 top-0 h-[70vh] w-[60vw]"
        style={{ background: "radial-gradient(ellipse at 80% 20%, #F4C43018 0%, transparent 65%)" }} />

      {/* Halo vert bas */}
      <div aria-hidden className="pointer-events-none absolute bottom-0 left-0 h-[50vh] w-[50vw]"
        style={{ background: "radial-gradient(ellipse at 10% 90%, #3A8B5C14 0%, transparent 65%)" }} />

      {/* ── HEADER ── */}
      <header className="absolute inset-x-0 top-0 z-50 flex h-16 items-center justify-between px-6 sm:px-10">
        <div className="flex items-center gap-2.5">
          <Image src="/mascot-house.png" alt="" width={28} height={37} quality={100} className="object-contain" priority />
          <span className="text-sm font-bold uppercase tracking-[0.14em]"
            style={{ fontFamily: "var(--font-display)", color: "#FBF5E8" }}>
            LMNP Manager
          </span>
        </div>

        <nav className="hidden items-center gap-8 lg:flex">
          {["Fonctionnalités", "Simulateur", "Tarifs"].map(item => (
            <a key={item} href="#"
              className="text-xs font-semibold uppercase tracking-wider transition-opacity hover:opacity-60"
              style={{ fontFamily: "var(--font-display)", color: "#FBF5E855" }}>
              {item}
            </a>
          ))}
          <GroovyButton href="/dashboard">Accéder →</GroovyButton>
        </nav>

        <div className="lg:hidden">
          <GroovyButton href="/dashboard">
            <LayoutDashboard className="h-3.5 w-3.5" /> App
          </GroovyButton>
        </div>
      </header>

      {/* ── CONTENT ── */}
      <motion.div
        variants={container} initial="hidden" animate="show"
        className="relative z-10 mx-auto grid min-h-dvh max-w-[1200px] items-center gap-12 px-6 pb-20 pt-24 sm:px-10 lg:grid-cols-[1fr_380px] lg:gap-16"
      >
        {/* LEFT */}
        <div>
          <motion.div variants={up} className="mb-7">
            <span className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5"
              style={{ border: "1px solid #F4C43028", background: "#F4C4300E" }}>
              <Sparkles className="h-3 w-3" style={{ color: "#F4C430" }} />
              <span className="text-[11px] font-bold uppercase tracking-[0.16em]"
                style={{ fontFamily: "var(--font-display)", color: "#F4C430" }}>
                Gestion locative LMNP
              </span>
            </span>
          </motion.div>

          <motion.h1 variants={up}
            className="font-bold uppercase"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(60px, 8vw, 122px)",
              lineHeight: 0.84,
              letterSpacing: "-0.01em",
            }}
          >
            <span style={{ color: "#FBF5E8" }}>Gérez</span>
            <br />
            <span style={{ color: "#FBF5E8" }}>votre </span>
            <span style={{ color: "#F4C430" }}>LMNP</span>
            <br />
            <span style={{ color: "#FBF5E8" }}>sans prise</span>
            <br />
            <span style={{ color: "#E8743B" }}>de tête.</span>
          </motion.h1>

          <motion.p variants={up}
            className="mt-7 max-w-[420px] text-[15px] leading-[1.65]"
            style={{ fontFamily: "var(--font-body)", color: "#FBF5E860" }}>
            Dashboard, crédit, simulateur 30 ans, quittances et contacts — tout en un, zéro tableur.
          </motion.p>

          <motion.div variants={up} className="mt-8 flex flex-wrap gap-3">
            <motion.div whileHover={{ y: -2, rotate: -1 }} whileTap={{ scale: 0.97 }}>
              <GroovyButton href="/dashboard" size="lg">
                <LayoutDashboard className="h-4 w-4" /> Essayer gratuitement
              </GroovyButton>
            </motion.div>
            <motion.div whileHover={{ y: -2, rotate: 1 }} whileTap={{ scale: 0.97 }}>
              <GroovyButton href="/simulateur" variant="secondary" size="lg">
                Simuler <ArrowRight className="h-4 w-4" />
              </GroovyButton>
            </motion.div>
          </motion.div>

          <motion.div variants={up} className="mt-7 flex flex-wrap gap-x-5 gap-y-2">
            {["14 jours gratuits", "Sans carte bancaire", "100 % français"].map(p => (
              <span key={p} className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5" style={{ color: "#6FB04A" }} strokeWidth={3} />
                <span className="text-[13px]" style={{ fontFamily: "var(--font-body)", color: "#FBF5E845" }}>{p}</span>
              </span>
            ))}
          </motion.div>
        </div>

        {/* RIGHT — polaroid mascot */}
        <motion.div variants={pop} className="relative flex justify-center">

          {/* Badge tournant */}
          <motion.div
            aria-hidden
            className="absolute -right-4 -top-8 z-20 flex h-[76px] w-[76px] items-center justify-center rounded-full border-2 border-[#1A1A1A]"
            style={{ background: "#F4C430", boxShadow: "3px 3px 0 #1A1A1A" }}
            animate={{ rotate: [10, 18, 10] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-center text-[9px] font-bold uppercase leading-tight"
              style={{ fontFamily: "var(--font-display)" }}>
              14j<br />gratuit<br />✦
            </span>
          </motion.div>

          {/* Polaroid */}
          <motion.div
            className="groovy-sticker w-full"
            style={{ maxWidth: 320, background: "#162C1F", padding: "10px 10px 42px" }}
            animate={{ y: [0, -8, 0], rotate: [2.5, 4, 2.5] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ rotate: 0, scale: 1.02, transition: { duration: 0.25 } }}
          >
            <div className="relative overflow-hidden rounded-[8px]"
              style={{ aspectRatio: "3/4", background: "#0F1F16" }}>
              <Image src="/mascot-hero.png" alt="Mascotte" fill quality={100} className="object-contain p-4" />
            </div>
            <p className="mt-3 text-center text-[10px] font-bold uppercase tracking-[0.18em]"
              style={{ fontFamily: "var(--font-display)", color: "#FBF5E848" }}>
              LMNP Manager ✦
            </p>
          </motion.div>

          {/* Stat badge */}
          <motion.div
            className="groovy-sticker absolute -bottom-5 -left-10 px-4 py-2.5"
            style={{ background: "#F4C430" }}
            initial={{ opacity: 0, x: -16, y: 8 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 1, type: "spring", stiffness: 100 }}
          >
            <p className="text-2xl font-bold tabular-nums leading-none"
              style={{ fontFamily: "var(--font-display)" }}>2 500+</p>
            <p className="mt-0.5 text-[10px] uppercase tracking-wider opacity-55"
              style={{ fontFamily: "var(--font-display)" }}>propriétaires</p>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 0.28 }} transition={{ delay: 1.8 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        aria-hidden
      >
        <div className="flex h-7 w-[18px] items-start justify-center rounded-full border border-[#FBF5E8] pt-1.5">
          <motion.div className="h-1.5 w-[3px] rounded-full bg-[#FBF5E8]"
            animate={{ y: [0, 5, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} />
        </div>
        <span className="text-[8px] uppercase tracking-widest"
          style={{ fontFamily: "var(--font-display)", color: "#FBF5E8" }}>Scroll</span>
      </motion.div>
    </section>
  )
}
