"use server"

import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function upsertCredit(data: {
  id?: string
  nom: string
  montantTotal: number
  tauxInteret: number
  dureeEnMois: number
  dateDebut: string
  banque?: string
  propertyId: string
}) {
  if (data.id) {
    await prisma.credit.update({
      where: { id: data.id },
      data: {
        nom: data.nom,
        montantTotal: data.montantTotal,
        tauxInteret: data.tauxInteret,
        dureeEnMois: data.dureeEnMois,
        dateDebut: new Date(data.dateDebut),
        banque: data.banque || null,
      },
    })
  } else {
    await prisma.credit.create({
      data: {
        nom: data.nom,
        montantTotal: data.montantTotal,
        tauxInteret: data.tauxInteret,
        dureeEnMois: data.dureeEnMois,
        dateDebut: new Date(data.dateDebut),
        banque: data.banque || null,
        propertyId: data.propertyId,
      },
    })
  }

  revalidatePath("/credit")
}

export async function upsertEcheanceAnnuelle(data: {
  creditId: string
  annee: number
  montant: number
}) {
  await prisma.creditEcheanceAnnuelle.upsert({
    where: {
      creditId_annee: {
        creditId: data.creditId,
        annee: data.annee,
      },
    },
    update: { montant: data.montant },
    create: {
      creditId: data.creditId,
      annee: data.annee,
      montant: data.montant,
    },
  })

  revalidatePath("/credit")
}

export async function upsertEcheanceMensuelle(data: {
  creditId: string
  mois: string
  montant: number
  note?: string
}) {
  await prisma.creditEcheanceMensuelle.upsert({
    where: {
      creditId_mois: {
        creditId: data.creditId,
        mois: data.mois,
      },
    },
    update: { montant: data.montant, note: data.note || null },
    create: {
      creditId: data.creditId,
      mois: data.mois,
      montant: data.montant,
      note: data.note || null,
    },
  })

  revalidatePath("/credit")
}

export async function supprimerEcheanceMensuelle(data: {
  creditId: string
  mois: string
}) {
  await prisma.creditEcheanceMensuelle.deleteMany({
    where: {
      creditId: data.creditId,
      mois: data.mois,
    },
  })

  revalidatePath("/credit")
}
