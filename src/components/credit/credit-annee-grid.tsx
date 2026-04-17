"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Année précédente"
              onClick={() => setAnnee(annee - 1)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <CardTitle className="text-xl tabular-nums">{annee}</CardTitle>
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Année suivante"
              onClick={() => setAnnee(annee + 1)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>
              Échéance par défaut :{" "}
              <span className="font-semibold text-foreground">
                {formatEuros(montantDefaut)}
              </span>
            </span>
            <Button
              variant="ghost"
              size="icon-xs"
              aria-label="Modifier l'échéance annuelle"
              onClick={openAnnuelDialog}
            >
              <Pencil className="h-3 w-3" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {moisList.map((echeance) => (
              <button
                key={echeance.mois}
                onClick={() => openMensuelDialog(echeance)}
                aria-label={`Modifier l'échéance de ${formatMoisLong(echeance.mois)}`}
                className={`group relative flex flex-col items-center gap-1 rounded-xl border p-3 text-center transition-all hover:shadow-md hover:border-[#3A8B5C]/40 ${
                  echeance.isOverride
                    ? "border-[#F5B731]/50 bg-[#F5B731]/8"
                    : "border-border bg-card"
                }`}
              >
                <span className="text-xs font-medium capitalize text-muted-foreground">
                  {formatMoisLong(echeance.mois)}
                </span>
                <span className="text-sm font-bold tabular-nums">
                  {formatEuros(echeance.montant)}
                </span>
                {echeance.isOverride && (
                  <Badge
                    variant="secondary"
                    className="bg-[#F5B731]/20 text-[#B8860B] text-[10px] px-1.5 py-0"
                  >
                    Modifié
                  </Badge>
                )}
                {echeance.note && (
                  <span className="text-[10px] text-muted-foreground line-clamp-1">
                    {echeance.note}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between border-t pt-4">
            <span className="text-sm text-muted-foreground">Total annuel</span>
            <span className="text-lg font-bold">{formatEuros(totalAnnuel)}</span>
          </div>
        </CardContent>
      </Card>

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
