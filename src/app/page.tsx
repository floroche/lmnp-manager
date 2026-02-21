import { prisma } from "@/lib/db"
import { KpiCards } from "@/components/dashboard/kpi-cards"
import { RevenusDepensesChart } from "@/components/dashboard/revenus-depenses-chart"
import { ProchinesEcheances } from "@/components/dashboard/prochaines-echeances"
import { DerniersPaiements } from "@/components/dashboard/derniers-paiements"
import { RepartitionDepenses } from "@/components/dashboard/repartition-depenses"

export const dynamic = "force-dynamic"

async function getDashboardData() {
  const now = new Date()
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`
  const currentYear = now.getFullYear()

  // Bien immobilier
  const property = await prisma.property.findFirst()

  // Bail actif
  const lease = await prisma.lease.findFirst({
    where: { actif: true },
    include: { tenant: true },
  })

  // Paiement du mois en cours
  const paiementMois = await prisma.payment.findFirst({
    where: { mois: currentMonth },
  })

  // Tous les paiements de l'année
  const paiementsAnnee = await prisma.payment.findMany({
    where: { mois: { startsWith: String(currentYear) } },
  })
  const revenusAnnuels = paiementsAnnee.reduce(
    (sum, p) => sum + p.montantRecu,
    0
  )

  // Toutes les dépenses de l'année
  const depensesAnnee = await prisma.expense.findMany({
    where: {
      date: {
        gte: new Date(`${currentYear}-01-01`),
        lt: new Date(`${currentYear + 1}-01-01`),
      },
    },
  })
  const depensesAnnuelles = depensesAnnee.reduce(
    (sum, d) => sum + d.montant,
    0
  )

  // Rendement brut = (loyer annuel / prix achat) * 100
  const loyerAnnuel = lease ? (lease.loyerHC + lease.charges) * 12 : 0
  const rendementBrut = property ? (loyerAnnuel / property.prixAchat) * 100 : 0

  // Tous les paiements et dépenses pour le graphe (12 derniers mois)
  const allPayments = await prisma.payment.findMany()
  const allExpenses = await prisma.expense.findMany()

  const chartData = []
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const moisKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`
    const moisLabel = d.toLocaleDateString("fr-FR", { month: "short" })

    const revenus = allPayments
      .filter((p) => p.mois === moisKey)
      .reduce((s, p) => s + p.montantRecu, 0)

    const depenses = allExpenses
      .filter((e) => {
        const ed = new Date(e.date)
        return (
          ed.getFullYear() === d.getFullYear() &&
          ed.getMonth() === d.getMonth()
        )
      })
      .reduce((s, e) => s + e.montant, 0)

    chartData.push({
      mois: moisLabel.charAt(0).toUpperCase() + moisLabel.slice(1),
      revenus,
      depenses,
    })
  }

  // Derniers paiements (5 derniers)
  const derniersPaiements = await prisma.payment.findMany({
    orderBy: { mois: "desc" },
    take: 5,
  })

  // Répartition des dépenses par catégorie (année en cours)
  const depensesParCategorie = depensesAnnee.reduce(
    (acc, d) => {
      acc[d.categorie] = (acc[d.categorie] || 0) + d.montant
      return acc
    },
    {} as Record<string, number>
  )
  const repartitionDepenses = Object.entries(depensesParCategorie)
    .map(([categorie, montant]) => ({ categorie, montant }))
    .sort((a, b) => b.montant - a.montant)

  // Prochaines échéances
  const echeances = [
    {
      titre: "Révision du loyer",
      date: "01 Jul 2026",
      type: "loyer" as const,
    },
    {
      titre: "Renouvellement assurance",
      date: "15 Sep 2026",
      type: "assurance" as const,
    },
    {
      titre: "Déclaration fiscale",
      date: "20 Mai 2026",
      type: "fiscal" as const,
    },
  ]

  return {
    loyerMois: lease ? lease.loyerHC + lease.charges : 0,
    statutLoyer: paiementMois?.statut ?? "impaye",
    revenusAnnuels,
    depensesAnnuelles,
    rendementBrut,
    chartData,
    derniersPaiements: derniersPaiements.map((p) => ({
      mois: p.mois,
      montantRecu: p.montantRecu,
      datePaiement: p.datePaiement?.toISOString() ?? null,
      statut: p.statut,
    })),
    repartitionDepenses,
    echeances,
  }
}

export default async function DashboardPage() {
  const data = await getDashboardData()

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* En-tête */}
      <div>
        <h1 className="text-3xl font-bold">Tableau de bord</h1>
        <p className="mt-1 text-muted-foreground">
          Bienvenue — voici un résumé de votre bien
        </p>
      </div>

      {/* KPI Cards */}
      <KpiCards
        loyerMois={data.loyerMois}
        statutLoyer={data.statutLoyer}
        revenusAnnuels={data.revenusAnnuels}
        depensesAnnuelles={data.depensesAnnuelles}
        rendementBrut={data.rendementBrut}
      />

      {/* Graphe Revenus vs Dépenses */}
      <RevenusDepensesChart data={data.chartData} />

      {/* Échéances + Derniers paiements */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <ProchinesEcheances echeances={data.echeances} />
        <div className="lg:col-span-2">
          <DerniersPaiements paiements={data.derniersPaiements} />
        </div>
      </div>

      {/* Répartition des dépenses */}
      <RepartitionDepenses data={data.repartitionDepenses} />
    </div>
  )
}
