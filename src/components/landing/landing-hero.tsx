"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Check, Play } from "lucide-react"

/* ─── Sparkline ───────────────────────────────────────────── */
function Sparkline({ points, color, height = 28, width = 80 }: {
  points: number[]; color: string; height?: number; width?: number
}) {
  const max = Math.max(...points)
  const min = Math.min(...points)
  const range = max - min || 1
  const path = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * width
      const y = height - ((p - min) / range) * height
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`
    })
    .join(" ")
  const last = points[points.length - 1]
  const lastY = height - ((last - min) / range) * height

  return (
    <svg width={width} height={height} style={{ overflow: "visible" }}>
      <path d={path} stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={width} cy={lastY} r="3" fill={color} />
    </svg>
  )
}

/* ─── Count-up hook ───────────────────────────────────────── */
function useCountUp(target: number, duration = 1400) {
  const [val, setVal] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (started.current) return
    started.current = true
    let raf: number
    let t0: number | null = null
    const tick = (ts: number) => {
      if (!t0) t0 = ts
      const p = Math.min((ts - t0) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(target * eased)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    const delay = setTimeout(() => { raf = requestAnimationFrame(tick) }, 600)
    return () => { clearTimeout(delay); cancelAnimationFrame(raf) }
  }, [target, duration])

  return val
}

/* ─── Dashboard mock ──────────────────────────────────────── */
function DashboardMock() {
  const revenu = useCountUp(8730, 1600)
  const cashflow = useCountUp(412, 1400)
  const rendement = useCountUp(5.8, 1400)

  const months = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"]
  const revs = [720, 720, 720, 740, 740, 740, 740, 740, 740, 770, 770, 770]
  const exps = [180, 90, 240, 90, 90, 320, 90, 90, 180, 90, 90, 280]
  const barMax = 800

  return (
    <div
      className="w-full overflow-hidden rounded-2xl"
      style={{
        background: "#FFFFFF",
        border: "1.5px solid #1A1A1A",
        boxShadow: "0 24px 50px -20px rgba(26,60,42,0.25), 0 8px 16px -8px rgba(26,60,42,0.15)",
      }}
    >
      {/* Chrome */}
      <div className="flex items-center gap-2 px-3.5 py-2.5" style={{ background: "#F0E8D4", borderBottom: "1px solid #DDD0B4" }}>
        <div className="flex gap-1.5">
          <span className="block h-[11px] w-[11px] rounded-full" style={{ background: "#E8743B" }} />
          <span className="block h-[11px] w-[11px] rounded-full" style={{ background: "#F4C430" }} />
          <span className="block h-[11px] w-[11px] rounded-full" style={{ background: "#3A8B5C" }} />
        </div>
        <div className="mx-auto max-w-[320px] flex-1 rounded-md px-3 py-1 text-center text-[11px]"
          style={{ background: "#FBF5E8", border: "1px solid #DDD0B4", color: "#1A1A1A70", fontFamily: "var(--font-inter)" }}>
          lmnp-manager.app<span style={{ color: "#1A1A1A", fontWeight: 600 }}>/dashboard</span>
        </div>
        <div style={{ width: 60 }} />
      </div>

      {/* Body */}
      <div className="flex" style={{ minHeight: 540 }}>
        {/* Sidebar */}
        <aside className="flex shrink-0 flex-col gap-[18px] p-[18px_14px]" style={{ width: 180, background: "#1A3C2A" }}>
          <div className="flex items-center gap-2">
            <div className="relative h-[22px] w-[22px] rounded-md" style={{ background: "#F4C430" }}>
              <div className="absolute inset-[5px] rounded-full" style={{ background: "#1A3C2A" }} />
            </div>
            <span className="text-[13px] font-bold tracking-[0.14em] uppercase" style={{ fontFamily: "var(--font-inter)", color: "#FBF5E8" }}>LMNP</span>
          </div>

          <nav className="flex flex-col gap-0.5">
            {[
              { i: "◐", l: "Dashboard", a: true },
              { i: "◇", l: "Bien" },
              { i: "◈", l: "Loyers" },
              { i: "◉", l: "Crédit" },
              { i: "◊", l: "Simulateur" },
              { i: "◑", l: "Quittances" },
              { i: "◍", l: "Contacts" },
            ].map((it, i) => (
              <div key={i}
                className="flex items-center gap-2.5 rounded-lg px-2.5 py-[7px] text-[12px]"
                style={{
                  background: it.a ? "#2D5A3F" : "transparent",
                  color: it.a ? "#FBF5E8" : "#FBF5E895",
                  fontFamily: "var(--font-inter)",
                  fontWeight: it.a ? 600 : 400,
                }}>
                <span className="w-3.5 text-center text-[13px]" style={{ color: it.a ? "#F4C430" : "#FBF5E895" }}>{it.i}</span>
                <span>{it.l}</span>
              </div>
            ))}
          </nav>

          <div className="mt-auto flex items-center gap-2.5 pt-3.5" style={{ borderTop: "1px solid #2D5A3F" }}>
            <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-[13px] font-bold"
              style={{ background: "#E8743B", color: "#FBF5E8", fontFamily: "var(--font-inter)" }}>F</div>
            <div className="text-[11px] leading-[1.3]" style={{ color: "#FBF5E8" }}>
              <div className="font-bold">Flo</div>
              <div style={{ color: "#FBF5E866" }}>Studio · Lyon 7</div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="flex flex-1 flex-col gap-3.5 overflow-hidden p-5" style={{ background: "#FBF5E8" }}>
          {/* Header */}
          <div className="mb-1 flex items-end justify-between">
            <div>
              <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em]"
                style={{ fontFamily: "var(--font-inter)", color: "#1A1A1A60" }}>Avril 2026</div>
              <h2 className="m-0 text-[22px] font-semibold tracking-[-0.01em]"
                style={{ fontFamily: "var(--font-fraunces)", color: "#1A1A1A" }}>Bonjour Flo 👋</h2>
            </div>
            <div className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold"
              style={{ background: "#EEF7E8", border: "1px solid #6FB04A40", color: "#3A8B5C", fontFamily: "var(--font-inter)" }}>
              <span className="relative h-[7px] w-[7px] rounded-full" style={{ background: "#6FB04A", boxShadow: "0 0 0 3px #6FB04A30" }}>
                <span className="absolute inset-0 animate-ping rounded-full" style={{ background: "#6FB04A", opacity: 0.4 }} />
              </span>
              Loyer encaissé · 04 avr.
            </div>
          </div>

          {/* KPI row */}
          <div className="grid grid-cols-3 gap-2.5">
            {[
              {
                label: "Revenu YTD",
                value: `${Math.round(revenu).toLocaleString("fr-FR")} €`,
                trend: "↗ +4,2% vs N-1",
                up: true,
                color: "#3A8B5C",
                spark: [6.2, 6.4, 6.5, 6.8, 7.1, 7.5, 7.9, 8.3, 8.7],
              },
              {
                label: "Cash-flow / mois",
                value: `+${Math.round(cashflow)} €`,
                trend: "net après crédit",
                up: true,
                color: "#E8743B",
                spark: [280, 310, 350, 320, 380, 400, 412],
              },
              {
                label: "Rendement net",
                value: `${rendement.toFixed(1)} %`,
                trend: "stable sur 6 mois",
                up: false,
                color: "#F4C430",
                spark: [5.6, 5.7, 5.8, 5.7, 5.8, 5.8, 5.8],
              },
            ].map((kpi) => (
              <div key={kpi.label} className="rounded-xl p-3.5"
                style={{ background: "#FFF", border: "1px solid #DDD0B4" }}>
                <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.14em]"
                  style={{ fontFamily: "var(--font-inter)", color: "#1A1A1A60" }}>{kpi.label}</div>
                <div className="text-[22px] font-bold tabular-nums tracking-[-0.01em]"
                  style={{ fontFamily: "var(--font-fraunces)", color: "#1A1A1A" }}>{kpi.value}</div>
                <div className="mb-1.5 mt-0.5 text-[10px]"
                  style={{ color: kpi.up ? kpi.color : "#1A1A1A60", fontWeight: kpi.up ? 600 : 400, fontFamily: "var(--font-inter)" }}>
                  {kpi.trend}
                </div>
                <Sparkline points={kpi.spark} color={kpi.color} width={90} />
              </div>
            ))}
          </div>

          {/* Bar chart */}
          <div className="rounded-xl p-3.5" style={{ background: "#FFF", border: "1px solid #DDD0B4" }}>
            <div className="mb-3 flex items-start justify-between">
              <div>
                <div className="text-[13px] font-bold tracking-[-0.005em]"
                  style={{ fontFamily: "var(--font-fraunces)", color: "#1A1A1A" }}>Recettes vs Dépenses</div>
                <div className="mt-0.5 text-[10px]" style={{ color: "#1A1A1A60", fontFamily: "var(--font-inter)" }}>12 mois glissants</div>
              </div>
              <div className="flex gap-2.5 text-[10px]" style={{ color: "#1A1A1A70", fontFamily: "var(--font-inter)" }}>
                <span className="flex items-center gap-1">
                  <i className="inline-block h-2 w-2 rounded-sm" style={{ background: "#3A8B5C" }} />Loyers
                </span>
                <span className="flex items-center gap-1">
                  <i className="inline-block h-2 w-2 rounded-sm" style={{ background: "#E8743B" }} />Charges
                </span>
              </div>
            </div>
            <div className="grid h-[120px]" style={{ gridTemplateColumns: "repeat(12, 1fr)", gap: 4 }}>
              {months.map((m, i) => (
                <div key={m} className="flex h-full flex-col items-center justify-end gap-1">
                  <div className="flex w-full items-end justify-center gap-0.5 flex-1 min-h-0">
                    <div className="w-[7px] rounded-t-sm"
                      style={{
                        height: `${(revs[i] / barMax) * 100}%`,
                        background: "#3A8B5C",
                        animation: `barRise 0.7s cubic-bezier(.4,1.4,.4,1) ${i * 0.05}s both`,
                      }} />
                    <div className="w-[7px] rounded-t-sm"
                      style={{
                        height: `${(exps[i] / barMax) * 100}%`,
                        background: "#E8743B",
                        opacity: 0.85,
                        animation: `barRise 0.7s cubic-bezier(.4,1.4,.4,1) ${i * 0.05 + 0.2}s both`,
                      }} />
                  </div>
                  <div className="text-[9px] font-medium" style={{ color: "#1A1A1A60", fontFamily: "var(--font-inter)" }}>{m.slice(0, 1)}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom row: échéances + donut */}
          <div className="grid gap-2.5" style={{ gridTemplateColumns: "1.3fr 1fr" }}>
            {/* Échéances */}
            <div className="rounded-xl p-3.5" style={{ background: "#FFF", border: "1px solid #DDD0B4" }}>
              <div className="mb-3 text-[13px] font-bold" style={{ fontFamily: "var(--font-fraunces)", color: "#1A1A1A" }}>
                Prochaines échéances
              </div>
              <ul className="flex flex-col" style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {[
                  { date: "04 mai", text: "Loyer mai · Marie L.", amount: "740 €", bg: "#FFF8E0", color: "#A07C10" },
                  { date: "15 mai", text: "Échéance crédit · CIC", amount: "−438 €", bg: "#FDEEE6", color: "#E8743B" },
                  { date: "20 mai", text: "Quittance avril à envoyer", amount: "PDF", bg: "#EEF7E8", color: "#3A8B5C" },
                ].map((row, i, arr) => (
                  <li key={i} className="grid items-center gap-2.5 py-2 text-[12px]"
                    style={{
                      gridTemplateColumns: "auto 1fr auto",
                      borderBottom: i < arr.length - 1 ? "1px dashed #DDD0B4" : "none",
                      fontFamily: "var(--font-inter)",
                    }}>
                    <span className="rounded-md px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.08em]"
                      style={{ background: row.bg, color: row.color, fontFamily: "var(--font-inter)" }}>
                      {row.date}
                    </span>
                    <span style={{ color: "#1A1A1A" }}>{row.text}</span>
                    <span className="tabular-nums text-[12px] font-bold" style={{ fontFamily: "var(--font-fraunces)", color: "#1A1A1A" }}>{row.amount}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Donut */}
            <div className="rounded-xl p-3.5" style={{ background: "#FFF", border: "1px solid #DDD0B4" }}>
              <div className="mb-3 text-[13px] font-bold" style={{ fontFamily: "var(--font-fraunces)", color: "#1A1A1A" }}>
                Répartition charges
              </div>
              <div className="flex items-center gap-4">
                <svg viewBox="0 0 100 100" style={{ width: 100, height: 100, flexShrink: 0 }}>
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#EDE4CE" strokeWidth="14" />
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#3A8B5C" strokeWidth="14"
                    strokeDasharray="95 239" strokeDashoffset="0" transform="rotate(-90 50 50)" />
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#F4C430" strokeWidth="14"
                    strokeDasharray="60 239" strokeDashoffset="-95" transform="rotate(-90 50 50)" />
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#E8743B" strokeWidth="14"
                    strokeDasharray="48 239" strokeDashoffset="-155" transform="rotate(-90 50 50)" />
                </svg>
                <ul className="flex flex-1 flex-col gap-1.5 text-[11px]" style={{ listStyle: "none", margin: 0, padding: 0 }}>
                  {[
                    { c: "#3A8B5C", l: "Crédit", v: "40%" },
                    { c: "#F4C430", l: "Charges", v: "25%" },
                    { c: "#E8743B", l: "Travaux", v: "20%" },
                    { c: "#EDE4CE", l: "Divers", v: "15%" },
                  ].map((row) => (
                    <li key={row.l} className="grid items-center gap-1.5" style={{ gridTemplateColumns: "auto 1fr auto", fontFamily: "var(--font-inter)" }}>
                      <i className="inline-block h-2 w-2 rounded-sm" style={{ background: row.c }} />
                      <span style={{ color: "#1A1A1A" }}>{row.l}</span>
                      <b className="tabular-nums" style={{ fontFamily: "var(--font-fraunces)", color: "#1A1A1A" }}>{row.v}</b>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

/* ─── Header ──────────────────────────────────────────────── */
function LandingHeader() {
  return (
    <header
      className="fixed inset-x-0 top-0 z-50 flex h-[60px] items-center justify-between px-6 sm:px-10"
      style={{ background: "rgba(251,245,232,0.88)", backdropFilter: "blur(12px)", borderBottom: "1px solid #1A1A1A10" }}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 shrink-0">
        <div className="h-7 w-7 rounded-lg" style={{ background: "#1A3C2A" }} />
        <span className="text-[15px] font-bold tracking-tight" style={{ fontFamily: "var(--font-inter)", color: "#1A1A1A" }}>
          LMNP Manager
        </span>
      </Link>

      {/* CTAs */}
      <div className="flex items-center gap-3">
        <Link href="/dashboard"
          className="hidden sm:block text-[13px] font-medium"
          style={{ fontFamily: "var(--font-inter)", color: "#1A1A1A70" }}>
          Se connecter
        </Link>
        <Link
          href="/dashboard"
          className="rounded-full px-4 py-2 text-[13px] font-bold transition-all hover:opacity-85"
          style={{ fontFamily: "var(--font-inter)", background: "#1A1A1A", color: "#FBF5E8", boxShadow: "0 1px 3px rgba(0,0,0,0.15)" }}
        >
          Démarrer →
        </Link>
      </div>
    </header>
  )
}

/* ─── Hero section ────────────────────────────────────────── */
function HeroSection() {
  return (
    <section className="min-h-dvh pt-[60px]" style={{ background: "#FBF5E8" }}>
      <div className="mx-auto w-full max-w-[1200px] px-6 sm:px-10 py-16 flex flex-col gap-12">

        {/* Copy block */}
        <div className="flex flex-col gap-8">
          {/* H1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
          >
            <h1 className="leading-[0.92] tracking-[-0.02em]"
              style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(52px, 7vw, 96px)", color: "#1A1A1A" }}>
              Votre LMNP,
              <br />
              <em style={{ color: "#E8743B", fontStyle: "italic" }}>tout au même endroit.</em>
            </h1>
          </motion.div>

          {/* Body + CTAs */}
          <motion.div
            className="flex flex-col gap-7 max-w-[580px]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-[16px] leading-[1.7]"
              style={{ fontFamily: "var(--font-inter)", color: "#1A1A1A70" }}>
              Loyers, crédit, charges, quittances, simulation et liasse fiscale dans
              une seule interface chaude et claire. On a remplacé votre Excel,
              votre dossier Drive et trois rappels Google Calendar.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-[14px] font-bold transition-all hover:opacity-85"
                style={{ fontFamily: "var(--font-inter)", background: "#1A1A1A", color: "#FBF5E8" }}
              >
                Ouvrir mon dashboard →
              </Link>
              <button className="flex items-center gap-2.5 text-[14px] font-medium transition-opacity hover:opacity-60"
                style={{ fontFamily: "var(--font-inter)", color: "#1A1A1A", background: "none", border: "none", cursor: "pointer" }}>
                <span className="flex h-8 w-8 items-center justify-center rounded-full"
                  style={{ background: "#1A1A1A" }}>
                  <Play className="h-3 w-3 ml-0.5" style={{ color: "#FBF5E8" }} fill="#FBF5E8" />
                </span>
                Voir en 90 secondes
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              {["Sans CB", "Données hébergées en France", "Annulable d'un clic"].map((p) => (
                <span key={p} className="flex items-center gap-1.5 text-[13px]"
                  style={{ fontFamily: "var(--font-inter)", color: "#1A1A1A55" }}>
                  <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                  {p}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Dashboard mock */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <DashboardMock />
        </motion.div>
      </div>
    </section>
  )
}

/* ─── Buddy mascot ────────────────────────────────────────── */
const BUDDY_TIPS = [
  { t: "Psst !", m: "Votre cash-flow est à +412 € ce mois. Pas mal, hein ?" },
  { t: "Un tuyau", m: "Cliquez sur un KPI pour voir le détail mois par mois." },
  { t: "Bon à savoir", m: "Vos chiffres se mettent à jour en temps réel." },
]

function BuddyMascot() {
  const [minimized, setMinimized] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [tipIdx, setTipIdx] = useState(0)
  const [bubbleVisible, setBubbleVisible] = useState(true)

  const tip = BUDDY_TIPS[tipIdx % BUDDY_TIPS.length]

  useEffect(() => {
    if (minimized || dismissed || !bubbleVisible) return
    const id = setInterval(() => {
      setBubbleVisible(false)
      setTimeout(() => { setTipIdx((i) => i + 1); setBubbleVisible(true) }, 280)
    }, 8000)
    return () => clearInterval(id)
  }, [minimized, dismissed, bubbleVisible])

  const nextTip = () => {
    setBubbleVisible(false)
    setTimeout(() => { setTipIdx((i) => i + 1); setBubbleVisible(true) }, 200)
  }

  if (dismissed) return null

  return (
    <div className="fixed bottom-6 right-6 z-[9500] flex flex-col items-end gap-2 pointer-events-none">
      <AnimatePresence>
        {!minimized && bubbleVisible && (
          <motion.div
            key={tipIdx}
            initial={{ opacity: 0, scale: 0.7, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 4 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="pointer-events-auto relative max-w-[260px] rounded-[18px] p-4"
            style={{ background: "#FFFFFF", border: "1.5px solid #1A1A1A", boxShadow: "4px 4px 0 #1A1A1A", transformOrigin: "bottom right" }}
          >
            <button className="absolute top-1.5 right-2 px-1.5 text-lg leading-none opacity-40 hover:opacity-80 transition-opacity"
              style={{ color: "#1A1A1A", background: "none", border: "none", cursor: "pointer" }}
              onClick={() => setBubbleVisible(false)}>×</button>
            <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.12em]"
              style={{ fontFamily: "var(--font-inter)", color: "#E8743B" }}>{tip.t}</div>
            <div className="mb-3 pr-3 text-[13px] leading-[1.45]"
              style={{ fontFamily: "var(--font-inter)", color: "#1A1A1A" }}>{tip.m}</div>
            <div className="flex justify-end">
              <button onClick={nextTip}
                className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.08em] transition-all hover:opacity-80"
                style={{ fontFamily: "var(--font-inter)", background: "#1A1A1A", color: "#FBF5E8", border: "none", cursor: "pointer" }}>
                Un autre conseil →
              </button>
            </div>
            <div className="absolute -bottom-[9px] right-8 h-4 w-4 rotate-45"
              style={{ background: "#FFFFFF", borderRight: "1.5px solid #1A1A1A", borderBottom: "1.5px solid #1A1A1A" }} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative pointer-events-auto">
        <motion.div
          animate={{ y: [0, -4, 0], rotate: [-1, 1, -1] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          onClick={() => setMinimized(!minimized)}
          className="cursor-pointer"
          style={{ width: minimized ? 56 : 80, height: minimized ? 56 : 80 }}
          whileHover={{ scale: 1.08, rotate: -3 }}
        >
          <Image src="/mascot.png" alt="Assistant" width={80} height={80}
            className="object-contain drop-shadow-lg" style={{ width: "100%", height: "100%" }} />
        </motion.div>
        {minimized && (
          <motion.div
            animate={{ scale: [0.85, 1.35], opacity: [0.8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeOut" }}
            className="absolute inset-[-4px] rounded-full pointer-events-none"
            style={{ border: "2px solid #E8743B" }} />
        )}
        {!minimized && (
          <button
            onClick={(e) => { e.stopPropagation(); setDismissed(true) }}
            className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full text-[10px]"
            style={{ background: "#FFFFFF", border: "1.5px solid #1A1A1A", color: "#1A1A1A", boxShadow: "1px 1px 0 #1A1A1A", cursor: "pointer" }}
            title="Masquer">✕</button>
        )}
      </div>
    </div>
  )
}

/* ─── CSS for bar animation ───────────────────────────────── */
const barRiseStyle = `
@keyframes barRise {
  from { transform: scaleY(0); }
  to   { transform: scaleY(1); }
}
`

/* ─── Main export ─────────────────────────────────────────── */
export function LandingHero() {
  return (
    <>
      <style>{barRiseStyle}</style>
      <LandingHeader />
      <HeroSection />
    </>
  )
}
