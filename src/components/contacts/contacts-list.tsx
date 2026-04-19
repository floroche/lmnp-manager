"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { metierLabel } from "@/lib/utils"
import { deleteContact } from "@/app/(app)/contacts/actions"
import { ContactDialog } from "@/components/contacts/contact-dialog"
import {
  Plus,
  Pencil,
  Trash2,
  Phone,
  Mail,
  Building2,
  StickyNote,
  Wrench,
  Zap,
  KeyRound,
  Bug,
  Paintbrush,
  Flame,
  Hammer,
  Home,
  Calculator,
  Shield,
  Landmark,
  HelpCircle,
} from "lucide-react"
import type { Contact } from "@prisma/client"

const metierIcons: Record<string, React.ElementType> = {
  plombier: Wrench,
  electricien: Zap,
  serrurier: KeyRound,
  deratiseur: Bug,
  peintre: Paintbrush,
  chauffagiste: Flame,
  menuisier: Hammer,
  agent_immobilier: Home,
  comptable: Calculator,
  assureur: Shield,
  syndic: Landmark,
  autre: HelpCircle,
}

export function ContactsList({
  contacts,
  propertyId,
}: {
  contacts: Contact[]
  propertyId: string
}) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingContact, setEditingContact] = useState<Contact | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  function handleAdd() {
    setEditingContact(null)
    setDialogOpen(true)
  }

  function handleEdit(contact: Contact) {
    setEditingContact(contact)
    setDialogOpen(true)
  }

  async function handleDelete(id: string) {
    if (deletingId === id) {
      await deleteContact(id)
      setDeletingId(null)
    } else {
      setDeletingId(id)
      // Annuler la confirmation après 3s
      setTimeout(() => setDeletingId(null), 3000)
    }
  }

  return (
    <>
      <div className="flex items-center justify-end">
        <Button onClick={handleAdd}>
          <Plus className="h-4 w-4" />
          Ajouter
        </Button>
      </div>

      {contacts.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-xl bg-white py-14 text-center" style={{ border: "1px solid #DDD0B4" }}>
          <p className="font-bold uppercase tracking-[0.1em]"
            style={{ fontFamily: "var(--font-inter)", color: "#1A1A1A" }}>
            Aucun contact enregistré
          </p>
          <p className="text-sm" style={{ color: "#1A1A1A55" }}>
            Ajoutez vos artisans, gestionnaires et prestataires.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {contacts.map((contact) => {
            const Icon = metierIcons[contact.metier] ?? HelpCircle
            return (
              <div key={contact.id} className="flex flex-col rounded-xl bg-white" style={{ border: "1px solid #DDD0B4" }}>
                <div className="flex items-start gap-3 px-5 pt-5 pb-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                    style={{ background: "#1A3C2A12" }}>
                    <Icon className="h-5 w-5" style={{ color: "#1A3C2A" }} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em]"
                      style={{ fontFamily: "var(--font-inter)", color: "#3A8B5C" }}>
                      {metierLabel(contact.metier)}
                    </p>
                    <p className="truncate font-bold" style={{ color: "#1A1A1A" }}>{contact.nom}</p>
                  </div>
                </div>

                <div className="space-y-1.5 px-5 pb-3">
                  {contact.entreprise && (
                    <div className="flex items-center gap-2 text-sm" style={{ color: "#1A1A1A60" }}>
                      <Building2 className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">{contact.entreprise}</span>
                    </div>
                  )}
                  {contact.telephone && (
                    <div className="flex items-center gap-2 text-sm" style={{ color: "#1A1A1A60" }}>
                      <Phone className="h-3.5 w-3.5 shrink-0" />
                      <a href={`tel:${contact.telephone}`} className="transition-opacity hover:opacity-80">
                        {contact.telephone}
                      </a>
                    </div>
                  )}
                  {contact.email && (
                    <div className="flex items-center gap-2 text-sm" style={{ color: "#1A1A1A60" }}>
                      <Mail className="h-3.5 w-3.5 shrink-0" />
                      <a href={`mailto:${contact.email}`} className="truncate transition-opacity hover:opacity-80">
                        {contact.email}
                      </a>
                    </div>
                  )}
                  {contact.notes && (
                    <div className="flex items-center gap-2 text-sm" style={{ color: "#1A1A1A60" }}>
                      <StickyNote className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">{contact.notes}</span>
                    </div>
                  )}
                </div>

                <div className="mt-auto flex items-center justify-end gap-1 border-t border-[#1A1A1A10] px-3 py-2">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => handleEdit(contact)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className={deletingId === contact.id ? "text-red-600 hover:text-red-700" : ""}
                    onClick={() => handleDelete(contact.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  {deletingId === contact.id && (
                    <span className="text-[11px] font-bold text-red-600">Confirmer ?</span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      <ContactDialog
        key={editingContact?.id ?? "new"}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        contact={editingContact}
        propertyId={propertyId}
      />
    </>
  )
}
