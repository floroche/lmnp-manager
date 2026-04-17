"use server"

import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function createContact(data: {
  nom: string
  metier: string
  telephone?: string
  email?: string
  entreprise?: string
  notes?: string
  propertyId: string
}) {
  await prisma.contact.create({
    data: {
      nom: data.nom,
      metier: data.metier,
      telephone: data.telephone || null,
      email: data.email || null,
      entreprise: data.entreprise || null,
      notes: data.notes || null,
      propertyId: data.propertyId,
    },
  })

  revalidatePath("/contacts")
}

export async function updateContact(data: {
  id: string
  nom: string
  metier: string
  telephone?: string
  email?: string
  entreprise?: string
  notes?: string
}) {
  await prisma.contact.update({
    where: { id: data.id },
    data: {
      nom: data.nom,
      metier: data.metier,
      telephone: data.telephone || null,
      email: data.email || null,
      entreprise: data.entreprise || null,
      notes: data.notes || null,
    },
  })

  revalidatePath("/contacts")
}

export async function deleteContact(id: string) {
  await prisma.contact.delete({
    where: { id },
  })

  revalidatePath("/contacts")
}
