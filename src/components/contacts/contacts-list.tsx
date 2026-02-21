"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { metierLabel } from "@/lib/utils"
import { deleteContact } from "@/app/contacts/actions"
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
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            Aucun contact enregistré. Ajoutez votre premier contact !
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {contacts.map((contact) => {
            const Icon = metierIcons[contact.metier] ?? HelpCircle
            return (
              <Card key={contact.id} className="gap-0 py-0">
                <div className="flex items-start gap-3 px-5 pt-5 pb-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#3A8B5C]/10">
                    <Icon className="h-5 w-5 text-[#3A8B5C]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-[#3A8B5C]">
                      {metierLabel(contact.metier)}
                    </p>
                    <p className="truncate font-semibold">{contact.nom}</p>
                  </div>
                </div>

                <div className="space-y-1.5 px-5 pb-3">
                  {contact.entreprise && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Building2 className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">{contact.entreprise}</span>
                    </div>
                  )}
                  {contact.telephone && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-3.5 w-3.5 shrink-0" />
                      <span>{contact.telephone}</span>
                    </div>
                  )}
                  {contact.email && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">{contact.email}</span>
                    </div>
                  )}
                  {contact.notes && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <StickyNote className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">{contact.notes}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-end gap-1 border-t px-3 py-2">
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
                    <span className="text-xs text-red-600">Confirmer ?</span>
                  )}
                </div>
              </Card>
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
