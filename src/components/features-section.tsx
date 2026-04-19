"use client"

import { motion } from "framer-motion"
import { TrendingUp, Landmark, Calculator, Receipt, Users, ArrowRight, FileCheck2 } from "lucide-react"
import Link from "next/link"

const vp = { once: true, amount: 0.08 }

const FEATURES = [
  {
    icon: TrendingUp,
    title: "Dashboard temps réel",
    body: "Loyer encaissé, revenus annuels, rendement brut — une seule vue, zéro Excel.",
    color: "#3A8B5C",
    bg: "#EEF7E8",
    large: true,
    stat: "100% automatique",
  },
  {
    icon: Landmark,
    title: "Crédit immobilier",
    body: "Tableau d'amortissement complet, modifiable mois par mois.",
    color: "#A07C10",
    bg: "#FFF8E0",
  },
  {
    icon: Calculator,
    title: "Simulateur 30 ans",
    body: "Cash-flow, rendement net et revente simulés sur 30 ans.",
    color: "#E8743B",
    bg: "#FDEEE6",
  },
  {
    icon: Receipt,
    title: "Quittances auto",
    body: "Génère et envoie les quittances PDF. Suivi des paiements intégré.",
    color: "#6FB04A",
    bg: "#EEF7E8",
  },
  {
    icon: Users,
    title: "Contacts utiles",
    body: "Plombier, notaire, assureur — rangés par métier, 1 clic.",
    color: "#E8743B",
    bg: "#FDEEE6",
  },
  {
    icon: FileCheck2,
    title: "Liasse LMNP",
    body: "Synthèse annuelle prête pour votre expert-comptable.",
    color: "#3A8B5C",
    bg: "#EEF7E8",
    large: true,
    stat: "Export en 1 clic",
  },
]

export function FeaturesSection() {
  return (
    <section className="border-t-2 border-[#1A1A1A] py-24 sm:py-28" style={{ background: "#FBF5E8" }}>
      <div className="mx-auto max-w-[1200px] px-6 sm:px-10">

        <motion.div className="mb-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={vp}
        >
          <p className="mb-3 text-[12px] font-medium uppercase tracking-[0.18em]"
            style={{ fontFamily: "var(--font-inter)", color: "#1A1A1A40" }}>
            7 outils · une seule interface
          </p>
          <h2 className="leading-[0.9] tracking-[-0.02em]"
            style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(32px, 4vw, 56px)", color: "#1A1A1A", fontWeight: 700 }}>
            Tout ce dont<br />vous avez besoin.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">

          {/* Dashboard — large dark */}
          <motion.div
            className="col-span-1 sm:col-span-2 flex flex-col gap-6 rounded-2xl p-7"
            style={{ background: "#1A3C2A" }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={vp}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: "#5EC4E820" }}>
              <TrendingUp className="h-5 w-5" style={{ color: "#5EC4E8" }} />
            </div>
            <div>
              <h3 className="text-[20px] font-bold" style={{ fontFamily: "var(--font-fraunces)", color: "#FBF5E8" }}>
                Dashboard temps réel
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed" style={{ fontFamily: "var(--font-inter)", color: "#FBF5E860" }}>
                Loyer encaissé, revenus annuels, rendement brut — une seule vue, zéro Excel.
              </p>
            </div>
            <div className="mt-auto flex items-baseline gap-2">
              <span className="text-[42px] font-bold tabular-nums leading-none"
                style={{ fontFamily: "var(--font-fraunces)", color: "#5EC4E8" }}>100%</span>
              <span className="text-[11px] uppercase tracking-wider"
                style={{ fontFamily: "var(--font-inter)", color: "#FBF5E840" }}>automatique</span>
            </div>
          </motion.div>

          {/* Small cards */}
          {[
            { icon: Landmark, title: "Crédit immobilier", body: "Tableau d'amortissement complet, modifiable mois par mois.", ic: "#A07C10", ib: "#A07C1018" },
            { icon: Calculator, title: "Simulateur 30 ans", body: "Cash-flow, rendement net et revente simulés sur 30 ans.", ic: "#E8743B", ib: "#E8743B18" },
            { icon: Receipt, title: "Quittances auto", body: "Génère et envoie les quittances PDF. Suivi des paiements intégré.", ic: "#6FB04A", ib: "#6FB04A18" },
            { icon: Users, title: "Contacts utiles", body: "Plombier, notaire, assureur — rangés par métier, 1 clic.", ic: "#E8743B", ib: "#E8743B18" },
          ].map((f, i) => (
            <motion.div key={f.title}
              className="flex flex-col gap-4 rounded-2xl p-6"
              style={{ background: "#FFFFFF", border: "1px solid #DDD0B4" }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              viewport={vp}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: f.ib }}>
                <f.icon className="h-5 w-5" style={{ color: f.ic }} />
              </div>
              <div>
                <h3 className="text-[17px] font-bold" style={{ fontFamily: "var(--font-fraunces)", color: "#1A1A1A" }}>{f.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed" style={{ fontFamily: "var(--font-inter)", color: "#1A1A1A60" }}>{f.body}</p>
              </div>
            </motion.div>
          ))}

          {/* Liasse — large cream */}
          <motion.div
            className="col-span-1 sm:col-span-2 flex flex-col gap-6 rounded-2xl p-7"
            style={{ background: "#FFFFFF", border: "1px solid #DDD0B4" }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24 }}
            viewport={vp}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: "#3A8B5C18" }}>
              <FileCheck2 className="h-5 w-5" style={{ color: "#3A8B5C" }} />
            </div>
            <div>
              <h3 className="text-[20px] font-bold" style={{ fontFamily: "var(--font-fraunces)", color: "#1A1A1A" }}>
                Liasse LMNP
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed" style={{ fontFamily: "var(--font-inter)", color: "#1A1A1A60" }}>
                Synthèse annuelle prête pour votre expert-comptable. Export en un clic, sans ressaisie.
              </p>
            </div>
            <div className="mt-auto">
              <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[12px] font-semibold"
                style={{ background: "#EEF7E8", color: "#3A8B5C", fontFamily: "var(--font-inter)" }}>
                Export en 1 clic →
              </span>
            </div>
          </motion.div>

        </div>

        <motion.div className="mt-10 flex justify-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          viewport={vp}
        >
          <Link href="/dashboard"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-[13px] font-bold transition-all hover:opacity-85"
            style={{ fontFamily: "var(--font-inter)", background: "#1A1A1A", color: "#FBF5E8" }}>
            Accéder à l'app <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
