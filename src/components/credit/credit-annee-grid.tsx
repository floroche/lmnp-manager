"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { formatEuros, formatMoisLong } from "@/lib/utils"
import { EcheanceDialog } from "./echeance-dialog"
import { ChevronLeft, ChevronRight, Pencil } from "lucide-react"
import type { CreditInfo, EcheanceMois } from "@/types"

function buildMoisGrid(
  credit: CreditInfo,
  annee: number
): { moisList: EcheanceMois[]; montantDefaut: number } {
  const echeanceAnnuelle = credit.echeancesAnnuelles.find(
    (ea) => ea.annee === annee
  )
  const montantDefaut = echeanceAnnuelle?.montant ?? 0

  const overridesMap = new Map(
    credit.echeancesMensuelles
      .filter((em) => em.mois.startsWith(String(annee)))
      .map((em) => [em.mois, em])
  )

  const moisList: EcheanceMois[] = []
  for (let m = 1; m <= 12; m++) {
    const moisKey = `${annee}-${String(m).padStart(2, "0")}`
    const override = overridesMap.get(moisKey)
    moisList.push({
      mois: moisKey,
      montant: override ? override.montant : montantDefaut,
      isOverride: !!override,
      note: override?.note ?? null,
    })
  }

  return { moisList, montantDefaut }
}

export function CreditAnneeGrid({ credit }: { credit: CreditInfo }) {
  const currentYear = new Date().getFullYear()
  const [annee, setAnnee] = useState(currentYear)

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogProps, setDialogProps] = useState<{
    mode: "annuel" | "mensuel"
    annee?: number
    mois?: string
    montantDefaut?: number
    montantActuel: number
    isOverride?: boolean
    note?: string | null
  } | null>(null)

  const { moisList, montantDefaut } = buildMoisGrid(credit, annee)
  const totalAnnuel = moisList.reduce((sum, m) => sum + m.montant, 0)

  function openAnnuelDialog() {
    setDialogProps({
      mode: "annuel",
      annee,
      montantActuel: montantDefaut,
    })
    setDialogOpen(true)
  }

  function openMensuelDialog(echeance: EcheanceMois) {
    setDialogProps({
      mode: "mensuel",
      mois: echeance.mois,
      montantDefaut,
      montantActuel: echeance.montant,
      isOverride: echeance.isOverride,
      note: echeance.note,
    })
    setDialogOpen(true)
  }

  return (
    <>
      <div className="rounded-xl bg-white p-6" style={{ border: "1px solid #DDD0B4" }}>
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon-sm" aria-label="Année précédente" onClick={() => setAnnee(annee - 1)}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-xl font-bold tabular-nums"
              style={{ fontFamily: "var(--font-inter)", color: "#1A1A1A" }}>{annee}</span>
            <Button variant="ghost" size="icon-sm" aria-label="Année suivante" onClick={() => setAnnee(annee + 1)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2 text-sm" style={{ color: "#1A1A1A60" }}>
            <span>
              Échéance par défaut :{" "}
              <span className="font-semibold tabular-nums" style={{ color: "#1A1A1A" }}>
                {formatEuros(montantDefaut)}
              </span>
            </span>
            <Button variant="ghost" size="icon-xs" aria-label="Modifier l'échéance annuelle" onClick={openAnnuelDialog}>
              <Pencil className="h-3 w-3" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {moisList.map((echeance) => (
            <button
              key={echeance.mois}
              onClick={() => openMensuelDialog(echeance)}
              aria-label={`Modifier l'échéance de ${formatMoisLong(echeance.mois)}`}
              className="group relative flex flex-col items-center gap-1 rounded-xl border p-3 text-center transition-all hover:shadow-sm"
              style={{
                borderColor: echeance.isOverride ? "#F4C430" : "#1A1A1A12",
                background: echeance.isOverride ? "#FFF8E0" : "#FBF5E8",
              }}
            >
              <span className="text-[11px] font-bold uppercase tracking-[0.1em] capitalize"
                style={{ fontFamily: "var(--font-inter)", color: "#1A1A1A55" }}>
                {formatMoisLong(echeance.mois)}
              </span>
              <span className="text-sm font-bold tabular-nums" style={{ color: "#1A1A1A" }}>
                {formatEuros(echeance.montant)}
              </span>
              {echeance.isOverride && (
                <span className="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider"
                  style={{ background: "#F4C43030", color: "#A07C10", fontFamily: "var(--font-inter)" }}>
                  Modifié
                </span>
              )}
              {echeance.note && (
                <span className="text-[10px] line-clamp-1" style={{ color: "#1A1A1A50" }}>
                  {echeance.note}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between border-t pt-4" style={{ borderColor: "#1A1A1A10" }}>
          <span className="text-sm" style={{ color: "#1A1A1A55" }}>Total annuel</span>
          <span className="text-lg font-bold tabular-nums"
            style={{ fontFamily: "var(--font-inter)", color: "#1A1A1A" }}>
            {formatEuros(totalAnnuel)}
          </span>
        </div>
      </div>

      {dialogOpen && dialogProps && (
        <>
          {dialogProps.mode === "annuel" ? (
            <EcheanceDialog
              open={dialogOpen}
              onOpenChange={setDialogOpen}
              creditId={credit.id}
              mode="annuel"
              annee={dialogProps.annee!}
              montantActuel={dialogProps.montantActuel}
            />
          ) : (
            <EcheanceDialog
              open={dialogOpen}
              onOpenChange={setDialogOpen}
              creditId={credit.id}
              mode="mensuel"
              mois={dialogProps.mois!}
              montantDefaut={dialogProps.montantDefaut!}
              montantActuel={dialogProps.montantActuel}
              isOverride={dialogProps.isOverride!}
              note={dialogProps.note ?? null}
            />
          )}
        </>
      )}
    </>
  )
}
