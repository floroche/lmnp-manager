import { prisma } from "@/lib/db"
import type { SimulateurParams } from "@/types"
import { SimulateurClient } from "@/components/simulateur/simulateur-client"
import { MascotSun } from "@/components/groovy-mascots"

export const dynamic = "force-dynamic"

async function getSimulateurDefaults(): Promise<{
  defaults: SimulateurParams
  anneeAcquisition: number
}> {
  const property = await prisma.property.findFirst()
  const lease = await prisma.lease.findFirst({ where: { actif: true } })
  const credit = await prisma.credit.findFirst()
  const equipments = await prisma.equipment.findMany({
    where: { propertyId: property?.id },
  })

  // Charges annuelles récurrentes (hors travaux et intérêts)
  const chargesCategories = [
    "taxe_fonciere",
    "assurance_pno",
    "charges_copro",
    "frais_comptable",
    "cfe",
  ]
  const expenses = await prisma.expense.findMany({
    where: {
      propertyId: property?.id,
      categorie: { in: chargesCategories },
    },
  })
  // Moyenne annuelle des charges sur la base des dépenses existantes
  const chargesAnnuelles = expenses.reduce((s, e) => s + e.montant, 0)

  const travaux = equipments.reduce((s, e) => s + (e.valeur ?? 0), 0)
  const loyerCC = lease ? lease.loyerHC + lease.charges : 730
  const apport = property && credit ? property.prixAchat - credit.montantTotal : 20000

  return {
    defaults: {
      prixFAI: property?.prixAchat ?? 185000,
      travaux: travaux > 0 ? travaux : 3269,
      loyerMensuelCC: loyerCC,
      evolutionLoyer: 1.5,
      apport: apport > 0 ? apport : 20000,
      dureeEmprunt: credit ? Math.round(credit.dureeEnMois / 12) : 20,
      tauxInteret: credit?.tauxInteret ?? 1.85,
      evolutionPrix: 2.0,
      anneeRevente: 10,
      chargesAnnuelles: chargesAnnuelles > 0 ? chargesAnnuelles : 2400,
    },
    anneeAcquisition: property
      ? new Date(property.dateAcquisition).getFullYear()
      : new Date().getFullYear(),
  }
}

export default async function SimulateurPage() {
  const { defaults, anneeAcquisition } = await getSimulateurDefaults()

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* En-tête */}
      <div className="flex items-center gap-4">
        <MascotSun size={56} />
        <div>
          <h1 className="text-3xl font-bold">Simulateur de rentabilité</h1>
          <p className="mt-1 text-muted-foreground">
            Projetez la rentabilité de votre investissement en ajustant les paramètres
          </p>
        </div>
      </div>
      <div className="groovy-stripe" />

      {/* Contenu */}
      <SimulateurClient defaults={defaults} anneeAcquisition={anneeAcquisition} />
    </div>
  )
}
