"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { formatEuros, formatMoisLong } from "@/lib/utils"
import {
  upsertEcheanceAnnuelle,
  upsertEcheanceMensuelle,
  supprimerEcheanceMensuelle,
} from "@/app/(app)/credit/actions"

type EcheanceDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  creditId: string
} & (
  | {
      mode: "annuel"
      annee: number
      montantActuel: number
    }
  | {
      mode: "mensuel"
      mois: string
      montantDefaut: number
      montantActuel: number
      isOverride: boolean
      note: string | null
    }
)

export function EcheanceDialog(props: EcheanceDialogProps) {
  const { open, onOpenChange, creditId } = props
  const [montant, setMontant] = useState(props.montantActuel.toString())
  const [note, setNote] = useState(
    props.mode === "mensuel" ? props.note ?? "" : ""
  )
  const [saving, setSaving] = useState(false)

  async function handleSave() {
    setSaving(true)
    if (props.mode === "annuel") {
      await upsertEcheanceAnnuelle({
        creditId,
        annee: props.annee,
        montant: parseFloat(montant),
      })
    } else {
      await upsertEcheanceMensuelle({
        creditId,
        mois: props.mois,
        montant: parseFloat(montant),
        note: note || undefined,
      })
    }
    setSaving(false)
    onOpenChange(false)
  }

  async function handleResetToDefault() {
    if (props.mode !== "mensuel") return
    setSaving(true)
    await supprimerEcheanceMensuelle({
      creditId,
      mois: props.mois,
    })
    setSaving(false)
    onOpenChange(false)
  }

  const title =
    props.mode === "annuel"
      ? `Échéance par défaut — ${props.annee}`
      : `Échéance de ${formatMoisLong(props.mois)} ${props.mois.split("-")[0]}`

  const description =
    props.mode === "annuel"
      ? "Ce montant sera appliqué à tous les mois de l'année sauf ceux modifiés individuellement."
      : `Défaut annuel : ${formatEuros(props.montantDefaut)}`

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="montant-echeance">Montant mensuel</Label>
            <Input
              id="montant-echeance"
              type="number"
              step="0.01"
              value={montant}
              onChange={(e) => setMontant(e.target.value)}
              autoFocus
            />
          </div>
          {props.mode === "mensuel" && (
            <div className="space-y-2">
              <Label htmlFor="note-echeance">Note (optionnel)</Label>
              <Input
                id="note-echeance"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Raison de la modification…"
              />
            </div>
          )}
        </div>
        <DialogFooter>
          {props.mode === "mensuel" && props.isOverride && (
            <Button
              variant="outline"
              onClick={handleResetToDefault}
              disabled={saving}
              className="mr-auto"
            >
              Revenir au défaut
            </Button>
          )}
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? "Enregistrement…" : "Enregistrer"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
