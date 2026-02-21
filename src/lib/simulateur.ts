import type { SimulateurParams, SimulateurResultats } from "@/types"

/** Frais de notaire estimés (ancien) */
export function calculerFraisNotaire(prixFAI: number): number {
  return prixFAI * 0.08
}

/** Budget total = prix FAI + travaux + frais de notaire */
export function calculerBudgetTotal(
  prixFAI: number,
  travaux: number,
  fraisNotaire: number,
): number {
  return prixFAI + travaux + fraisNotaire
}

/** Mensualité de crédit classique : M = C×r / (1 - (1+r)^-n) */
export function calculerMensualite(
  capital: number,
  tauxAnnuel: number,
  dureeAnnees: number,
): number {
  if (capital <= 0 || dureeAnnees <= 0) return 0
  if (tauxAnnuel <= 0) return capital / (dureeAnnees * 12)
  const r = tauxAnnuel / 100 / 12
  const n = dureeAnnees * 12
  return (capital * r) / (1 - Math.pow(1 + r, -n))
}

/** Capital restant dû après N années */
export function calculerCapitalRestant(
  capital: number,
  tauxAnnuel: number,
  dureeAnnees: number,
  anneesEcoulees: number,
): number {
  if (capital <= 0 || dureeAnnees <= 0) return 0
  if (anneesEcoulees >= dureeAnnees) return 0
  if (tauxAnnuel <= 0) {
    return capital * (1 - anneesEcoulees / dureeAnnees)
  }
  const r = tauxAnnuel / 100 / 12
  const n = dureeAnnees * 12
  const p = anneesEcoulees * 12
  return capital * (Math.pow(1 + r, n) - Math.pow(1 + r, p)) / (Math.pow(1 + r, n) - 1)
}

/** Total des intérêts payés après N années */
export function calculerInteretsPayes(
  capital: number,
  tauxAnnuel: number,
  dureeAnnees: number,
  anneesEcoulees: number,
): number {
  if (capital <= 0 || dureeAnnees <= 0) return 0
  const mensualite = calculerMensualite(capital, tauxAnnuel, dureeAnnees)
  const moisEcoules = Math.min(anneesEcoulees, dureeAnnees) * 12
  const totalPaye = mensualite * moisEcoules
  const capitalRembourse = capital - calculerCapitalRestant(capital, tauxAnnuel, dureeAnnees, Math.min(anneesEcoulees, dureeAnnees))
  return totalPaye - capitalRembourse
}

/** Prix de revente avec appréciation annuelle composée */
export function calculerPrixRevente(
  prixFAI: number,
  appreciationAnnuelle: number,
  annees: number,
): number {
  return prixFAI * Math.pow(1 + appreciationAnnuelle / 100, annees)
}

/** Simulation complète */
export function calculerSimulation(
  params: SimulateurParams,
  anneeAcquisition: number,
): SimulateurResultats {
  const fraisNotaire = calculerFraisNotaire(params.prixFAI)
  const budgetTotal = calculerBudgetTotal(params.prixFAI, params.travaux, fraisNotaire)
  const montantEmprunte = budgetTotal - params.apport

  // Rentabilité brute
  const revenusLocatifsAnnuels = params.loyerMensuelCC * 12
  const rentabiliteBrute = budgetTotal > 0
    ? (revenusLocatifsAnnuels / budgetTotal) * 100
    : 0

  // Rentabilité nette
  const rentabiliteNette = budgetTotal > 0
    ? ((revenusLocatifsAnnuels - params.chargesAnnuelles) / budgetTotal) * 100
    : 0

  // Crédit
  const mensualiteCredit = calculerMensualite(
    montantEmprunte,
    params.tauxInteret,
    params.dureeEmprunt,
  )

  // Trésorerie mensuelle
  const tresorerieMensuelle = params.loyerMensuelCC - mensualiteCredit - params.chargesAnnuelles / 12

  // Revente
  const prixRevente = calculerPrixRevente(
    params.prixFAI,
    params.evolutionPrix,
    params.anneeRevente,
  )
  const capitalRestant = calculerCapitalRestant(
    montantEmprunte,
    params.tauxInteret,
    params.dureeEmprunt,
    params.anneeRevente,
  )
  const interetsPayes = calculerInteretsPayes(
    montantEmprunte,
    params.tauxInteret,
    params.dureeEmprunt,
    params.anneeRevente,
  )

  // Trésorerie nette cumulée : boucle année par année avec évolution du loyer
  let tresorerieNetteCumulee = 0
  for (let a = 0; a < params.anneeRevente; a++) {
    const loyerAnnee = params.loyerMensuelCC * 12 * Math.pow(1 + params.evolutionLoyer / 100, a)
    const chargesAnnee = params.chargesAnnuelles
    const creditAnnee = mensualiteCredit * 12
    tresorerieNetteCumulee += loyerAnnee - chargesAnnee - creditAnnee
  }

  // Bénéfices à la revente
  const benefices = prixRevente - capitalRestant - params.apport - params.travaux - fraisNotaire + tresorerieNetteCumulee

  // Rentabilité des capitaux investis (apport + travaux + frais notaire)
  const capitauxInvestis = params.apport + params.travaux + fraisNotaire
  const rentabiliteCapitauxInvestis = capitauxInvestis > 0
    ? (benefices / capitauxInvestis) * 100
    : 0

  return {
    fraisNotaire,
    budgetTotal,
    montantEmprunte,
    rentabiliteBrute,
    rentabiliteNette,
    revenusLocatifsAnnuels,
    mensualiteCredit,
    tresorerieMensuelle,
    prixRevente,
    capitalRestant,
    interetsPayes,
    tresorerieNetteCumulee,
    benefices,
    rentabiliteCapitauxInvestis,
    anneeReventeAbsolue: anneeAcquisition + params.anneeRevente,
  }
}
