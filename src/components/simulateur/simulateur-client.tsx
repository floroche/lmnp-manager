"use client"

import { useState, useMemo } from "react"
import type { SimulateurParams } from "@/types"
import { calculerSimulation } from "@/lib/simulateur"
import { formatEuros } from "@/lib/utils"
import { HypothesesPanel } from "./hypotheses-panel"
import { BudgetTotalChart } from "./budget-total-chart"
import { RevenusMensuelsChart } from "./revenus-mensuels-chart"
import { ReventeChart } from "./revente-chart"
import { KpiCard } from "./kpi-card"

interface SimulateurClientProps {
  defaults: SimulateurParams
  anneeAcquisition: number
}

export function SimulateurClient({ defaults, anneeAcquisition }: SimulateurClientProps) {
  const [params, setParams] = useState<SimulateurParams>(defaults)

  const resultats = useMemo(
    () => calculerSimulation(params, anneeAcquisition),
    [params, anneeAcquisition],
  )

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      {/* Panneau hypothèses — sticky sur desktop */}
      <div className="w-full shrink-0 lg:sticky lg:top-6 lg:w-[340px] lg:self-start">
        <HypothesesPanel params={params} defaults={defaults} onChange={setParams} />
      </div>

      {/* Zone résultats */}
      <div className="flex-1 space-y-5">
        {/* Budget total donut */}
        <BudgetTotalChart
          prixFAI={params.prixFAI}
          travaux={params.travaux}
          fraisNotaire={resultats.fraisNotaire}
          budgetTotal={resultats.budgetTotal}
        />

        {/* KPI row 1 */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <KpiCard
            label="Rentabilité nette"
            value={`${resultats.rentabiliteNette.toFixed(2).replace(".", ",")} %`}
            color={resultats.rentabiliteNette >= 3 ? "green" : resultats.rentabiliteNette >= 0 ? "gold" : "red"}
          />
          <KpiCard
            label="Revenus locatifs"
            value={`${formatEuros(resultats.revenusLocatifsAnnuels)} /an`}
            color="green"
          />
        </div>

        {/* Revenus mensuels */}
        <RevenusMensuelsChart
          loyerCC={params.loyerMensuelCC}
          mensualiteCredit={resultats.mensualiteCredit}
          tresorerieMensuelle={resultats.tresorerieMensuelle}
        />

        {/* Revente */}
        <ReventeChart
          anneeRevente={resultats.anneeReventeAbsolue}
          prixRevente={resultats.prixRevente}
          capitalRestant={resultats.capitalRestant}
          interetsPayes={resultats.interetsPayes}
          apport={params.apport}
          tresorerieNetteCumulee={resultats.tresorerieNetteCumulee}
          benefices={resultats.benefices}
        />

        {/* KPI row 2 */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <KpiCard
            label="Bénéfices"
            value={formatEuros(resultats.benefices)}
            color={resultats.benefices >= 0 ? "green" : "red"}
          />
          <KpiCard
            label="Rentabilité capitaux investis"
            value={`${resultats.rentabiliteCapitauxInvestis.toFixed(1).replace(".", ",")} %`}
            color={resultats.rentabiliteCapitauxInvestis >= 0 ? "gold" : "red"}
          />
        </div>
      </div>
    </div>
  )
}
