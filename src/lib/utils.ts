import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatEuros(montant: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(montant)
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date))
}

export function formatDateShort(date: Date | string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date))
}

export function formatMois(mois: string): string {
  const [annee, m] = mois.split("-")
  const date = new Date(parseInt(annee), parseInt(m) - 1)
  return new Intl.DateTimeFormat("fr-FR", {
    month: "long",
    year: "numeric",
  }).format(date)
}

export function statutLabel(statut: string): string {
  const labels: Record<string, string> = {
    paye: "Payé",
    en_retard: "En retard",
    impaye: "Impayé",
  }
  return labels[statut] ?? statut
}

export function categorieLabel(categorie: string): string {
  const labels: Record<string, string> = {
    travaux: "Travaux",
    assurance_pno: "Assurance PNO",
    taxe_fonciere: "Taxe foncière",
    charges_copro: "Charges copro",
    frais_comptable: "Frais comptable",
    interets_emprunt: "Intérêts emprunt",
    cfe: "CFE",
    divers: "Divers",
  }
  return labels[categorie] ?? categorie
}
