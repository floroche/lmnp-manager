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
      <Card className="border-border/50 bg-card py-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              Loyer du mois
            </p>
            <Badge
              variant={statutLoyer === "paye" ? "default" : "destructive"}
              className={
                statutLoyer === "paye"
                  ? "bg-[#4a5d3a] text-white hover:bg-[#4a5d3a]"
                  : statutLoyer === "en_retard"
                    ? "bg-[#c8722a] text-white hover:bg-[#c8722a]"
                    : "bg-[#c44b2f] text-white hover:bg-[#c44b2f]"
              }
            >
              {statutLabel(statutLoyer)}
            </Badge>
          </div>
          <p className="mt-3 text-3xl font-bold">{formatEuros(loyerMois)}</p>
        </CardContent>
      </Card>

      {/* Revenus annuels */}
      <Card className="border-border/50 bg-card py-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              Revenus annuels
            </p>
            <TrendingUp className="h-5 w-5 text-[#4a5d3a]" />
          </div>
          <p className="mt-3 text-3xl font-bold">
            {formatEuros(revenusAnnuels)}
          </p>
        </CardContent>
      </Card>

      {/* Dépenses annuelles */}
      <Card className="border-border/50 bg-card py-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              Dépenses annuelles
            </p>
            <TrendingDown className="h-5 w-5 text-[#c8722a]" />
          </div>
          <p className="mt-3 text-3xl font-bold">
            {formatEuros(depensesAnnuelles)}
          </p>
        </CardContent>
      </Card>

      {/* Rendement brut */}
      <Card className="border-border/50 bg-card py-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              Rendement brut
            </p>
            <Percent className="h-5 w-5 text-[#c8722a]" />
          </div>
          <p className="mt-3 text-3xl font-bold">
            {rendementBrut.toFixed(1).replace(".", ",")}%
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
