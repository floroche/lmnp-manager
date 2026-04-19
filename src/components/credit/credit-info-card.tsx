"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { formatEuros, formatDate, formatTaux } from "@/lib/utils"
import { upsertCredit } from "@/app/(app)/credit/actions"
import { Pencil, X, Landmark, Calendar, Percent, Banknote, Building2 } from "lucide-react"
import type { CreditInfo } from "@/types"

export function CreditInfoCard({ credit, propertyId }: { credit: CreditInfo | null; propertyId: string }) {
  const [editing, setEditing] = useState(!credit)
  const [saving, setSaving] = useState(false)

  const [nom, setNom] = useState(credit?.nom ?? "")
  const [montantTotal, setMontantTotal] = useState(credit?.montantTotal?.toString() ?? "")
  const [tauxInteret, setTauxInteret] = useState(credit?.tauxInteret?.toString() ?? "")
  const [dureeEnMois, setDureeEnMois] = useState(credit?.dureeEnMois?.toString() ?? "")
  const [dateDebut, setDateDebut] = useState(
    credit?.dateDebut ? new Date(credit.dateDebut).toISOString().slice(0, 10) : ""
  )
  const [banque, setBanque] = useState(credit?.banque ?? "")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    await upsertCredit({
      id: credit?.id,
      nom,
      montantTotal: parseFloat(montantTotal),
      tauxInteret: parseFloat(tauxInteret),
      dureeEnMois: parseInt(dureeEnMois),
      dateDebut,
      banque: banque || undefined,
      propertyId,
    })
    setSaving(false)
    setEditing(false)
  }

  if (editing) {
    return (
      <div className="rounded-xl bg-white p-6" style={{ border: "1px solid #DDD0B4" }}>
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-bold"
            style={{ fontFamily: "var(--font-fraunces)", color: "#1A1A1A" }}>
            {credit ? "Modifier le crédit" : "Ajouter un crédit immobilier"}
          </h2>

          {credit && (
            <Button variant="ghost" size="icon-sm" aria-label="Annuler" onClick={() => setEditing(false)}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="nom">Nom du prêt</Label>
            <Input id="nom" value={nom} onChange={(e) => setNom(e.target.value)} placeholder="Prêt acquisition…" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="montantTotal">Montant total emprunté</Label>
            <Input id="montantTotal" type="number" step="0.01" value={montantTotal} onChange={(e) => setMontantTotal(e.target.value)} placeholder="165000" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tauxInteret">Taux d'intérêt (%)</Label>
            <Input id="tauxInteret" type="number" step="0.01" value={tauxInteret} onChange={(e) => setTauxInteret(e.target.value)} placeholder="1.85" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dureeEnMois">Durée (mois)</Label>
            <Input id="dureeEnMois" type="number" value={dureeEnMois} onChange={(e) => setDureeEnMois(e.target.value)} placeholder="240" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dateDebut">Date de début</Label>
            <Input id="dateDebut" type="date" value={dateDebut} onChange={(e) => setDateDebut(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="banque">Banque (optionnel)</Label>
            <Input id="banque" value={banque} onChange={(e) => setBanque(e.target.value)} placeholder="Crédit Agricole" />
          </div>
          <div className="col-span-full flex justify-end gap-2 pt-2">
            {credit && (
              <Button type="button" variant="outline" onClick={() => setEditing(false)}>
                Annuler
              </Button>
            )}
            <Button type="submit" disabled={saving}>
              {saving ? "Enregistrement…" : credit ? "Enregistrer" : "Créer le crédit"}
            </Button>
          </div>
        </form>
      </div>
    )
  }

  if (!credit) return null

  const dureeAnnees = Math.floor(credit.dureeEnMois / 12)
  const dureeMoisReste = credit.dureeEnMois % 12

  return (
    <div className="rounded-xl bg-white p-6" style={{ border: "1px solid #DDD0B4" }}>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-bold"
          style={{ fontFamily: "var(--font-fraunces)", color: "#1A1A1A" }}>
          <Landmark className="h-5 w-5" style={{ color: "#1A3C2A" }} />
          {credit.nom}
        </h2>
        <Button variant="ghost" size="sm" onClick={() => setEditing(true)}>
          <Pencil className="h-4 w-4" />
          Modifier
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-3">
        <div className="flex items-start gap-2">
          <Banknote className="mt-0.5 h-4 w-4" style={{ color: "#1A1A1A40" }} />
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.12em]"
              style={{ fontFamily: "var(--font-inter)", color: "#1A1A1A40" }}>
              Montant emprunté
            </p>
            <p className="font-semibold tabular-nums" style={{ color: "#1A1A1A" }}>
              {formatEuros(credit.montantTotal)}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <Percent className="mt-0.5 h-4 w-4" style={{ color: "#1A1A1A40" }} />
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.12em]"
              style={{ fontFamily: "var(--font-inter)", color: "#1A1A1A40" }}>
              Taux d'intérêt
            </p>
            <p className="font-semibold tabular-nums" style={{ color: "#1A1A1A" }}>
              {formatTaux(credit.tauxInteret)}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <Calendar className="mt-0.5 h-4 w-4" style={{ color: "#1A1A1A40" }} />
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.12em]"
              style={{ fontFamily: "var(--font-inter)", color: "#1A1A1A40" }}>
              Durée
            </p>
            <p className="font-semibold" style={{ color: "#1A1A1A" }}>
              {dureeAnnees} ans{dureeMoisReste > 0 ? ` ${dureeMoisReste} mois` : ""}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <Calendar className="mt-0.5 h-4 w-4" style={{ color: "#1A1A1A40" }} />
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.12em]"
              style={{ fontFamily: "var(--font-inter)", color: "#1A1A1A40" }}>
              Date de début
            </p>
            <p className="font-semibold" style={{ color: "#1A1A1A" }}>{formatDate(credit.dateDebut)}</p>
          </div>
        </div>
        {credit.banque && (
          <div className="flex items-start gap-2">
            <Building2 className="mt-0.5 h-4 w-4" style={{ color: "#1A1A1A40" }} />
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.12em]"
                style={{ fontFamily: "var(--font-inter)", color: "#1A1A1A40" }}>
                Banque
              </p>
              <p className="font-semibold" style={{ color: "#1A1A1A" }}>{credit.banque}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
