import { prisma } from "@/lib/db"
import { MascotSun } from "@/components/groovy-mascots"
import { CreditInfoCard } from "@/components/credit/credit-info-card"
import { CreditAnneeGrid } from "@/components/credit/credit-annee-grid"
import type { CreditInfo } from "@/types"

export const dynamic = "force-dynamic"

async function getCreditData(): Promise<{
  credit: CreditInfo | null
  propertyId: string
}> {
  const property = await prisma.property.findFirst()
  if (!property) {
    return { credit: null, propertyId: "" }
  }

  const credit = await prisma.credit.findFirst({
    where: { propertyId: property.id },
    include: {
      echeancesAnnuelles: { orderBy: { annee: "asc" } },
      echeancesMensuelles: { orderBy: { mois: "asc" } },
    },
  })

  if (!credit) {
    return { credit: null, propertyId: property.id }
  }

  return {
    credit: {
      id: credit.id,
      nom: credit.nom,
      montantTotal: credit.montantTotal,
      tauxInteret: credit.tauxInteret,
      dureeEnMois: credit.dureeEnMois,
      dateDebut: credit.dateDebut,
      banque: credit.banque,
      propertyId: credit.propertyId,
      echeancesAnnuelles: credit.echeancesAnnuelles.map((ea) => ({
        annee: ea.annee,
        montant: ea.montant,
      })),
      echeancesMensuelles: credit.echeancesMensuelles.map((em) => ({
        mois: em.mois,
        montant: em.montant,
        note: em.note,
      })),
    },
    propertyId: property.id,
  }
}

export default async function CreditPage() {
  const { credit, propertyId } = await getCreditData()

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* En-tête */}
      <div className="flex items-center gap-4">
        <MascotSun size={56} />
        <div>
          <h1 className="text-3xl font-bold">Crédit immobilier</h1>
          <p className="mt-1 text-muted-foreground">
            Gérez vos échéances de prêt mois par mois
          </p>
        </div>
      </div>

      <div className="groovy-stripe" />

      {/* Infos crédit */}
      <CreditInfoCard credit={credit} propertyId={propertyId} />

      {/* Grille des échéances (seulement si un crédit existe) */}
      {credit && <CreditAnneeGrid credit={credit} />}
    </div>
  )
}
