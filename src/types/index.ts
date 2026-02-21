export type PaymentStatut = "paye" | "en_retard" | "impaye"

export type ExpenseCategorie =
  | "travaux"
  | "assurance_pno"
  | "taxe_fonciere"
  | "charges_copro"
  | "frais_comptable"
  | "interets_emprunt"
  | "cfe"
  | "divers"

export type AmortizationType = "bien" | "meuble" | "travaux"

export type DocumentType =
  | "bail"
  | "etat_des_lieux"
  | "diagnostic"
  | "assurance"
  | "quittance"
  | "autre"

export type ContactMetier =
  | "plombier"
  | "electricien"
  | "serrurier"
  | "deratiseur"
  | "peintre"
  | "chauffagiste"
  | "menuisier"
  | "agent_immobilier"
  | "comptable"
  | "assureur"
  | "syndic"
  | "autre"

export type CreditInfo = {
  id: string
  nom: string
  montantTotal: number
  tauxInteret: number
  dureeEnMois: number
  dateDebut: Date
  banque: string | null
  propertyId: string
  echeancesAnnuelles: { annee: number; montant: number }[]
  echeancesMensuelles: { mois: string; montant: number; note: string | null }[]
}

export type EcheanceMois = {
  mois: string // "YYYY-MM"
  montant: number
  isOverride: boolean
  note: string | null
}

export type SimulateurParams = {
  prixFAI: number
  travaux: number
  loyerMensuelCC: number
  evolutionLoyer: number      // % par an
  apport: number
  dureeEmprunt: number        // en années
  tauxInteret: number         // % annuel
  evolutionPrix: number       // % par an
  anneeRevente: number        // nb d'années après acquisition
  chargesAnnuelles: number
}

export type SimulateurResultats = {
  fraisNotaire: number
  budgetTotal: number
  montantEmprunte: number
  rentabiliteBrute: number
  rentabiliteNette: number
  revenusLocatifsAnnuels: number
  mensualiteCredit: number
  tresorerieMensuelle: number
  prixRevente: number
  capitalRestant: number
  interetsPayes: number
  tresorerieNetteCumulee: number
  benefices: number
  rentabiliteCapitauxInvestis: number
  anneeReventeAbsolue: number
}
