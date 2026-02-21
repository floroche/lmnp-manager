import { PrismaClient } from "../src/generated/prisma/client"

const prisma = new PrismaClient()

async function main() {
  // Nettoyage
  await prisma.payment.deleteMany()
  await prisma.lease.deleteMany()
  await prisma.tenant.deleteMany()
  await prisma.expense.deleteMany()
  await prisma.amortization.deleteMany()
  await prisma.document.deleteMany()
  await prisma.equipment.deleteMany()
  await prisma.property.deleteMany()

  // Bien immobilier — Appartement T2 à Lyon
  const property = await prisma.property.create({
    data: {
      adresse: "24 rue de la République",
      codePostal: "69002",
      ville: "Lyon",
      surface: 45.5,
      type: "meuble",
      prixAchat: 185000,
      dateAcquisition: new Date("2022-03-15"),
      description:
        "Appartement T2 meublé au 3ème étage avec ascenseur. Proche métro Bellecour. Cave incluse.",
    },
  })

  // Équipements / meubles
  const equipements = [
    { nom: "Canapé convertible", valeur: 650, dateAchat: new Date("2022-04-01") },
    { nom: "Lit double 140x190 + matelas", valeur: 480, dateAchat: new Date("2022-04-01") },
    { nom: "Table à manger + 4 chaises", valeur: 320, dateAchat: new Date("2022-04-01") },
    { nom: "Bureau + chaise", valeur: 250, dateAchat: new Date("2022-04-01") },
    { nom: "Réfrigérateur-congélateur", valeur: 450, dateAchat: new Date("2022-04-01") },
    { nom: "Lave-linge", valeur: 380, dateAchat: new Date("2022-04-01") },
    { nom: "Micro-ondes", valeur: 89, dateAchat: new Date("2022-04-01") },
    { nom: "Plaques vitrocéramiques", valeur: 200, dateAchat: new Date("2022-04-01") },
    { nom: "Vaisselle et ustensiles complets", valeur: 150, dateAchat: new Date("2022-04-01") },
    { nom: "Luminaires (x5)", valeur: 180, dateAchat: new Date("2022-04-01") },
    { nom: "Rideaux et tringles", valeur: 120, dateAchat: new Date("2022-04-01") },
  ]

  for (const eq of equipements) {
    await prisma.equipment.create({
      data: { ...eq, propertyId: property.id },
    })
  }

  // Ancien locataire (historique)
  const ancienLocataire = await prisma.tenant.create({
    data: {
      nom: "Martin",
      prenom: "Sophie",
      email: "sophie.martin@email.com",
      telephone: "06 12 34 56 78",
      garantNom: "Martin Jean-Pierre (père)",
      garantTel: "06 98 76 54 32",
      propertyId: property.id,
      actif: false,
    },
  })

  // Ancien bail (terminé)
  await prisma.lease.create({
    data: {
      dateDebut: new Date("2022-06-01"),
      dateFin: new Date("2023-05-31"),
      loyerHC: 620,
      charges: 80,
      depotGarantie: 620,
      actif: false,
      tenantId: ancienLocataire.id,
      propertyId: property.id,
    },
  })

  // Locataire actuel
  const locataire = await prisma.tenant.create({
    data: {
      nom: "Dubois",
      prenom: "Antoine",
      email: "antoine.dubois@gmail.com",
      telephone: "07 45 23 67 89",
      garantNom: "Dubois Marie (mère)",
      garantTel: "06 78 12 34 56",
      propertyId: property.id,
      actif: true,
    },
  })

  // Bail actuel
  const bail = await prisma.lease.create({
    data: {
      dateDebut: new Date("2023-09-01"),
      dateFin: new Date("2024-08-31"),
      loyerHC: 650,
      charges: 80,
      depotGarantie: 650,
      actif: true,
      tenantId: locataire.id,
      propertyId: property.id,
    },
  })

  // Paiements — 12 derniers mois (mars 2025 à février 2026)
  const paiements = [
    { mois: "2025-03", montantRecu: 730, datePaiement: new Date("2025-03-05"), statut: "paye" },
    { mois: "2025-04", montantRecu: 730, datePaiement: new Date("2025-04-03"), statut: "paye" },
    { mois: "2025-05", montantRecu: 730, datePaiement: new Date("2025-05-06"), statut: "paye" },
    { mois: "2025-06", montantRecu: 730, datePaiement: new Date("2025-06-04"), statut: "paye" },
    { mois: "2025-07", montantRecu: 730, datePaiement: new Date("2025-07-02"), statut: "paye" },
    { mois: "2025-08", montantRecu: 730, datePaiement: new Date("2025-08-05"), statut: "paye" },
    { mois: "2025-09", montantRecu: 730, datePaiement: new Date("2025-09-08"), statut: "paye" },
    { mois: "2025-10", montantRecu: 730, datePaiement: new Date("2025-10-03"), statut: "paye" },
    { mois: "2025-11", montantRecu: 730, datePaiement: new Date("2025-11-12"), statut: "en_retard" },
    { mois: "2025-12", montantRecu: 730, datePaiement: new Date("2025-12-04"), statut: "paye" },
    { mois: "2026-01", montantRecu: 730, datePaiement: new Date("2026-01-06"), statut: "paye" },
    { mois: "2026-02", montantRecu: 0, datePaiement: null, statut: "impaye" },
  ]

  for (const p of paiements) {
    await prisma.payment.create({
      data: {
        mois: p.mois,
        montantAttendu: 730, // 650 HC + 80 charges
        montantRecu: p.montantRecu,
        datePaiement: p.datePaiement,
        statut: p.statut,
        leaseId: bail.id,
      },
    })
  }

  // Dépenses réalistes sur 2025
  const depenses = [
    { date: new Date("2025-01-15"), montant: 1250, categorie: "taxe_fonciere", description: "Taxe foncière 2025 — avis reçu" },
    { date: new Date("2025-01-20"), montant: 195, categorie: "assurance_pno", description: "Assurance PNO — Allianz — prime annuelle" },
    { date: new Date("2025-02-10"), montant: 450, categorie: "charges_copro", description: "Charges copropriété T1 2025" },
    { date: new Date("2025-03-15"), montant: 85, categorie: "divers", description: "Remplacement du mitigeur cuisine" },
    { date: new Date("2025-04-20"), montant: 450, categorie: "charges_copro", description: "Charges copropriété T2 2025" },
    { date: new Date("2025-05-10"), montant: 2800, categorie: "travaux", description: "Remplacement du ballon d'eau chaude" },
    { date: new Date("2025-06-15"), montant: 600, categorie: "frais_comptable", description: "Honoraires comptable — déclaration LMNP 2024" },
    { date: new Date("2025-07-20"), montant: 450, categorie: "charges_copro", description: "Charges copropriété T3 2025" },
    { date: new Date("2025-09-01"), montant: 3200, categorie: "interets_emprunt", description: "Intérêts emprunt annuels 2025" },
    { date: new Date("2025-10-15"), montant: 450, categorie: "charges_copro", description: "Charges copropriété T4 2025" },
    { date: new Date("2025-11-10"), montant: 155, categorie: "cfe", description: "Cotisation foncière des entreprises 2025" },
    { date: new Date("2026-01-15"), montant: 1280, categorie: "taxe_fonciere", description: "Taxe foncière 2026 — avis reçu" },
    { date: new Date("2026-01-20"), montant: 205, categorie: "assurance_pno", description: "Assurance PNO — Allianz — prime annuelle 2026" },
  ]

  for (const d of depenses) {
    await prisma.expense.create({
      data: { ...d, propertyId: property.id },
    })
  }

  // Amortissements
  const amortissements = [
    { libelle: "Structure du bien (gros œuvre)", type: "bien", valeur: 92500, duree: 30, dateDebut: new Date("2022-03-15") },
    { libelle: "Toiture", type: "bien", valeur: 18500, duree: 25, dateDebut: new Date("2022-03-15") },
    { libelle: "Installations techniques (électricité, plomberie)", type: "bien", valeur: 27750, duree: 20, dateDebut: new Date("2022-03-15") },
    { libelle: "Agencements intérieurs", type: "bien", valeur: 27750, duree: 15, dateDebut: new Date("2022-03-15") },
    { libelle: "Mobilier complet", type: "meuble", valeur: 3269, duree: 7, dateDebut: new Date("2022-04-01") },
    { libelle: "Électroménager", type: "meuble", valeur: 1119, duree: 5, dateDebut: new Date("2022-04-01") },
    { libelle: "Remplacement ballon eau chaude", type: "travaux", valeur: 2800, duree: 10, dateDebut: new Date("2025-05-10") },
  ]

  for (const a of amortissements) {
    await prisma.amortization.create({
      data: { ...a, propertyId: property.id },
    })
  }

  console.log("✅ Seed terminé avec succès !")
  console.log(`   - 1 bien immobilier (${property.adresse}, ${property.ville})`)
  console.log(`   - ${equipements.length} équipements`)
  console.log(`   - 2 locataires (1 ancien, 1 actuel)`)
  console.log(`   - 2 baux (1 terminé, 1 actif)`)
  console.log(`   - ${paiements.length} paiements`)
  console.log(`   - ${depenses.length} dépenses`)
  console.log(`   - ${amortissements.length} amortissements`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
