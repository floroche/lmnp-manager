"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Percent, Coins } from "lucide-react"
import { formatEuros, statutLabel } from "@/lib/utils"

interface KpiCardsProps {
  loyerMois: number
  statutLoyer: string
  revenusAnnuels: number
  depensesAnnuelles: number
  rendementBrut: number
}

function statutBadgeClass(statut: string) {
  if (statut === "paye") return "bg-primary text-white hover:bg-primary"
  if (statut === "en_retard") return "bg-accent text-foreground hover:bg-accent"
  return "bg-destructive text-white hover:bg-destructive"
}

export function KpiCards({
  loyerMois,
  statutLoyer,
  revenusAnnuels,
  depensesAnnuelles,
  rendementBrut,
}: KpiCardsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
      {/* Loyer du mois */}
      <Card className="col-span-2 py-0 groovy-hover overflow-hidden xl:col-span-1">
        <div className="h-1 bg-gradient-to-r from-primary to-[#5BAF7A]" />
        <CardContent className="p-5">
          <div className="mb-3 flex items-start justify-between">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
              <Coins className="h-4.5 w-4.5 text-primary" />
            </div>
            <Badge className={statutBadgeClass(statutLoyer)}>
              {statutLabel(statutLoyer)}
            </Badge>
          </div>
          <p className="groovy-label text-xs text-muted-foreground">Loyer du mois</p>
          <p className="mt-1.5 tabular-nums text-2xl font-bold lg:text-3xl" style={{ fontFamily: "var(--font-display)" }}>
            {formatEuros(loyerMois)}
          </p>
        </CardContent>
      </Card>

      {/* Revenus annuels */}
      <Card className="py-0 groovy-hover overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-[#2D6B45] to-primary" />
        <CardContent className="p-5">
          <div className="mb-3 flex items-start justify-between">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2D6B45]/10">
              <TrendingUp className="h-4.5 w-4.5 text-[#2D6B45]" />
            </div>
          </div>
          <p className="groovy-label text-xs text-muted-foreground">Revenus annuels</p>
          <p className="mt-1.5 tabular-nums text-2xl font-bold lg:text-3xl" style={{ fontFamily: "var(--font-display)" }}>
            {formatEuros(revenusAnnuels)}
          </p>
        </CardContent>
      </Card>

      {/* Dépenses annuelles */}
      <Card className="py-0 groovy-hover overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-[#E8712A] to-accent" />
        <CardContent className="p-5">
          <div className="mb-3 flex items-start justify-between">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E8712A]/10">
              <TrendingDown className="h-4.5 w-4.5 text-[#E8712A]" />
            </div>
          </div>
          <p className="groovy-label text-xs text-muted-foreground">Dépenses annuelles</p>
          <p className="mt-1.5 tabular-nums text-2xl font-bold lg:text-3xl" style={{ fontFamily: "var(--font-display)" }}>
            {formatEuros(depensesAnnuelles)}
          </p>
        </CardContent>
      </Card>

      {/* Rendement brut */}
      <Card className="py-0 groovy-hover overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-accent to-[#F5D76E]" />
        <CardContent className="p-5">
          <div className="mb-3 flex items-start justify-between">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/15">
              <Percent className="h-4.5 w-4.5 text-[#D49A1A]" />
            </div>
          </div>
          <p className="groovy-label text-xs text-muted-foreground">Rendement brut</p>
          <p className="mt-1.5 tabular-nums text-2xl font-bold lg:text-3xl" style={{ fontFamily: "var(--font-display)" }}>
            {rendementBrut.toFixed(1).replace(".", ",")} %
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
