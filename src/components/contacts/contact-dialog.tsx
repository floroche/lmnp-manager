"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { createContact, updateContact } from "@/app/contacts/actions"
import type { ContactMetier } from "@/types"
import type { Contact } from "@prisma/client"

const metiers: { value: ContactMetier; label: string }[] = [
  { value: "plombier", label: "Plombier" },
  { value: "electricien", label: "Électricien" },
  { value: "serrurier", label: "Serrurier" },
  { value: "deratiseur", label: "Dératiseur" },
  { value: "peintre", label: "Peintre" },
  { value: "chauffagiste", label: "Chauffagiste" },
  { value: "menuisier", label: "Menuisier" },
  { value: "agent_immobilier", label: "Agent immobilier" },
  { value: "comptable", label: "Comptable" },
  { value: "assureur", label: "Assureur" },
  { value: "syndic", label: "Syndic" },
  { value: "autre", label: "Autre" },
]

export function ContactDialog({
  open,
  onOpenChange,
  contact,
  propertyId,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  contact?: Contact | null
  propertyId: string
}) {
  const [saving, setSaving] = useState(false)
  const [nom, setNom] = useState(contact?.nom ?? "")
  const [metier, setMetier] = useState(contact?.metier ?? "plombier")
  const [telephone, setTelephone] = useState(contact?.telephone ?? "")
  const [email, setEmail] = useState(contact?.email ?? "")
  const [entreprise, setEntreprise] = useState(contact?.entreprise ?? "")
  const [notes, setNotes] = useState(contact?.notes ?? "")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)

    if (contact) {
      await updateContact({
        id: contact.id,
        nom,
        metier,
        telephone: telephone || undefined,
        email: email || undefined,
        entreprise: entreprise || undefined,
        notes: notes || undefined,
      })
    } else {
      await createContact({
        nom,
        metier,
        telephone: telephone || undefined,
        email: email || undefined,
        entreprise: entreprise || undefined,
        notes: notes || undefined,
        propertyId,
      })
    }

    setSaving(false)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {contact ? "Modifier le contact" : "Ajouter un contact"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="nom">Nom</Label>
            <Input
              id="nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              placeholder="Jean Dupont"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="metier">Métier</Label>
            <select
              id="metier"
              value={metier}
              onChange={(e) => setMetier(e.target.value)}
              className="border-input bg-background flex h-9 w-full rounded-md border px-3 py-1 text-sm shadow-xs"
            >
              {metiers.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="telephone">Téléphone</Label>
            <Input
              id="telephone"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              placeholder="06 12 34 56 78"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="contact@exemple.fr"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="entreprise">Entreprise</Label>
            <Input
              id="entreprise"
              value={entreprise}
              onChange={(e) => setEntreprise(e.target.value)}
              placeholder="ProPlomb Lyon"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Input
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Disponible le week-end"
            />
          </div>
          <DialogFooter className="col-span-full pt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Enregistrement…" : contact ? "Enregistrer" : "Ajouter"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
