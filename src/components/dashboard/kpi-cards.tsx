"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Percent } from "lucide-react"
import { formatEuros, statutLabel } from "@/lib/utils"

interface KpiCardsProps {
  loyerMois: number
  statutLoyer: string
  revenusAnnuels: number
  depensesAnnuelles: number
  rendementBrut: number
}

const kpiConfig = [
  { gradient: "from-[#3A8B5C] to-[#5BAF7A]", iconBg: "bg-[#3A8B5C]/10", iconColor: "text-[#3A8B5C]" },
  { gradient: "from-[#2D6B45] to-[#3A8B5C]", iconBg: "bg-[#2D6B45]/10", iconColor: "text-[#2D6B45]" },
  { gradient: "from-[#E8712A] to-[#F5B731]", iconBg: "bg-[#E8712A]/10", iconColor: "text-[#E8712A]" },
  { gradient: "from-[#F5B731] to-[#F5D76E]", iconBg: "bg-[#F5B731]/10", iconColor: "text-[#D49A1A]" },
]

export function KpiCards({
  loyerMois,
  statutLoyer,
  revenusAnnuels,
  depensesAnnuelles,
  rendementBrut,
}: KpiCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      {/* Loyer du mois */}
      <Card className="py-0 groovy-hover overflow-hidden">
        <div className={`h-1.5 bg-gradient-to-r ${kpiConfig[0].gradient}`} />
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <p className="groovy-label text-xs text-muted-foreground">
              Loyer du mois
            </p>
            <Badge
              variant={statutLoyer === "paye" ? "default" : "destructive"}
              className={
                statutLoyer === "paye"
                  ? "bg-[#3A8B5C] text-white hover:bg-[#3A8B5C]"
                  : statutLoyer === "en_retard"
                    ? "bg-[#F5B731] text-[#1A3C2A] hover:bg-[#F5B731]"
                    : "bg-[#D4622B] text-white hover:bg-[#D4622B]"
              }
            >
              {statutLabel(statutLoyer)}
            </Badge>
          </div>
          <p className="mt-3 text-3xl font-bold" style={{ fontFamily: "var(--font-display)" }}>{formatEuros(loyerMois)}</p>
        </CardContent>
      </Card>

      {/* Revenus annuels */}
      <Card className="py-0 groovy-hover overflow-hidden">
        <div className={`h-1.5 bg-gradient-to-r ${kpiConfig[1].gradient}`} />
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <p className="groovy-label text-xs text-muted-foreground">
              Revenus annuels
            </p>
            <div className={`flex h-8 w-8 items-center justify-center rounded-full ${kpiConfig[1].iconBg}`}>
              <TrendingUp className={`h-4 w-4 ${kpiConfig[1].iconColor}`} />
            </div>
          </div>
          <p className="mt-3 text-3xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
            {formatEuros(revenusAnnuels)}
          </p>
        </CardContent>
      </Card>

      {/* Dépenses annuelles */}
      <Card className="py-0 groovy-hover overflow-hidden">
        <div className={`h-1.5 bg-gradient-to-r ${kpiConfig[2].gradient}`} />
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <p className="groovy-label text-xs text-muted-foreground">
              Dépenses annuelles
            </p>
            <div className={`flex h-8 w-8 items-center justify-center rounded-full ${kpiConfig[2].iconBg}`}>
              <TrendingDown className={`h-4 w-4 ${kpiConfig[2].iconColor}`} />
            </div>
          </div>
          <p className="mt-3 text-3xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
            {formatEuros(depensesAnnuelles)}
          </p>
        </CardContent>
      </Card>

      {/* Rendement brut */}
      <Card className="py-0 groovy-hover overflow-hidden">
        <div className={`h-1.5 bg-gradient-to-r ${kpiConfig[3].gradient}`} />
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <p className="groovy-label text-xs text-muted-foreground">
              Rendement brut
            </p>
            <div className={`flex h-8 w-8 items-center justify-center rounded-full ${kpiConfig[3].iconBg}`}>
              <Percent className={`h-4 w-4 ${kpiConfig[3].iconColor}`} />
            </div>
          </div>
          <p className="mt-3 text-3xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
            {rendementBrut.toFixed(1).replace(".", ",")}%
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
