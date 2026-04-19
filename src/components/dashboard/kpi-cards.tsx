"use client"

import { Coins, TrendingUp, TrendingDown, Percent } from "lucide-react"
import { formatEuros, statutLabel } from "@/lib/utils"

interface KpiCardsProps {
  loyerMois: number
  statutLoyer: string
  revenusAnnuels: number
  depensesAnnuelles: number
  rendementBrut: number
}

function statutStyle(statut: string): { bg: string; color: string } {
  if (statut === "paye") return { bg: "#6FB04A20", color: "#3A8B5C" }
  if (statut === "en_retard") return { bg: "#F4C43020", color: "#A07C10" }
  return { bg: "#E8743B20", color: "#C45520" }
}

export function KpiCards({
  loyerMois,
  statutLoyer,
  revenusAnnuels,
  depensesAnnuelles,
  rendementBrut,
}: KpiCardsProps) {
  const badge = statutStyle(statutLoyer)

  return (
    <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
      {/* Loyer du mois — dark green */}
      <div className="col-span-2 flex flex-col gap-4 rounded-xl p-6 xl:col-span-1" style={{ background: "#1A3C2A" }}>
        <div className="flex items-start justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: "#6FB04A18" }}>
            <Coins className="h-5 w-5" style={{ color: "#6FB04A" }} />
          </div>
          <span
            className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em]"
            style={{ background: badge.bg, color: badge.color, fontFamily: "var(--font-inter)" }}
          >
            {statutLabel(statutLoyer)}
          </span>
        </div>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.16em]"
            style={{ fontFamily: "var(--font-inter)", color: "#FBF5E850" }}>
            Loyer du mois
          </p>
          <p className="mt-1.5 tabular-nums text-3xl font-bold"
            style={{ fontFamily: "var(--font-fraunces)", color: "#FBF5E8" }}>
            {formatEuros(loyerMois)}
          </p>
        </div>
      </div>

      {/* Revenus annuels — gold */}
      <div className="flex flex-col gap-4 rounded-xl p-6" style={{ background: "#FFF8E0" }}>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: "#F4C43020" }}>
          <TrendingUp className="h-5 w-5" style={{ color: "#A07C10" }} />
        </div>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.16em]"
            style={{ fontFamily: "var(--font-inter)", color: "#1A1A1A45" }}>
            Revenus annuels
          </p>
          <p className="mt-1.5 tabular-nums text-2xl font-bold lg:text-3xl"
            style={{ fontFamily: "var(--font-fraunces)", color: "#1A1A1A" }}>
            {formatEuros(revenusAnnuels)}
          </p>
        </div>
      </div>

      {/* Dépenses annuelles — orange */}
      <div className="flex flex-col gap-4 rounded-xl p-6" style={{ background: "#FDEEE6" }}>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: "#E8743B20" }}>
          <TrendingDown className="h-5 w-5" style={{ color: "#E8743B" }} />
        </div>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.16em]"
            style={{ fontFamily: "var(--font-inter)", color: "#1A1A1A45" }}>
            Dépenses annuelles
          </p>
          <p className="mt-1.5 tabular-nums text-2xl font-bold lg:text-3xl"
            style={{ fontFamily: "var(--font-fraunces)", color: "#1A1A1A" }}>
            {formatEuros(depensesAnnuelles)}
          </p>
        </div>
      </div>

      {/* Rendement brut — light green */}
      <div className="flex flex-col gap-4 rounded-xl p-6" style={{ background: "#EEF7E8" }}>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: "#6FB04A20" }}>
          <Percent className="h-5 w-5" style={{ color: "#3A8B5C" }} />
        </div>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.16em]"
            style={{ fontFamily: "var(--font-inter)", color: "#1A1A1A45" }}>
            Rendement brut
          </p>
          <p className="mt-1.5 tabular-nums text-2xl font-bold lg:text-3xl"
            style={{ fontFamily: "var(--font-fraunces)", color: "#1A1A1A" }}>
            {rendementBrut.toFixed(1).replace(".", ",")} %
          </p>
        </div>
      </div>
    </div>
  )
}
