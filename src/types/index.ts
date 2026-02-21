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
