# INSTRUCTIONS — LMNP Manager

## 🎯 Description du projet

Application web de gestion locative pour un appartement en LMNP (Loueur Meublé Non Professionnel).
L'objectif est de remplacer une agence immobilière en centralisant tout dans un outil personnel :
suivi des loyers, génération de quittances, comptabilité simplifiée, gestion documentaire et alertes.

L'application est destinée à un usage personnel (un seul propriétaire, un seul bien pour commencer, extensible ensuite).

---

## 🧱 Stack technique

- **Framework** : Next.js 14+ (App Router)
- **UI** : React + Tailwind CSS + shadcn/ui
- **Base de données** : SQLite via Prisma (simple, pas besoin de serveur DB)
- **Génération PDF** : @react-pdf/renderer ou jsPDF
- **Graphiques** : Recharts
- **Auth** : Pas nécessaire dans un premier temps (usage local / perso)
- **Langue** : Interface en français

---

## 📦 Modules & Fonctionnalités

### Phase 1 — MVP (priorité haute)

#### 1. Dashboard
- Vue d'ensemble : loyer du mois (payé/impayé), solde annuel, prochaines échéances
- Graphique recettes vs dépenses sur 12 mois glissants
- Indicateurs clés : rendement brut, taux d'occupation

#### 2. Gestion du bien
- Fiche du bien : adresse, surface, type (meublé), date d'acquisition, prix d'achat
- Liste des meubles / équipements (utile pour les amortissements LMNP)
- Photos du bien

#### 3. Gestion du locataire
- Fiche locataire : nom, prénom, email, téléphone, garant
- Informations bail : date début, date fin, montant loyer HC, montant charges, dépôt de garantie
- Historique des locataires

#### 4. Suivi des loyers
- Tableau mensuel : mois, montant attendu, montant reçu, date de paiement, statut (payé / en retard / impayé)
- Saisie rapide d'un paiement reçu
- Calcul automatique des retards

#### 5. Génération de quittances de loyer
- Génération automatique en PDF avec les mentions légales obligatoires
- Pré-remplie avec les données du locataire et du bien
- Envoi par email (optionnel phase 2)

### Phase 2 — Comptabilité LMNP

#### 6. Suivi des dépenses
- Catégories : travaux, assurance PNO, taxe foncière, charges copro, frais comptable, intérêts emprunt, CFE, divers
- Saisie avec date, montant, catégorie, justificatif (upload)
- Récapitulatif annuel par catégorie

#### 7. Amortissements
- Tableau d'amortissement du bien (linéaire sur 25-30 ans selon composants)
- Amortissement des meubles (5-10 ans)
- Amortissement des travaux (10-15 ans)
- Décomposition par composants : structure, toiture, installations techniques, agencements

#### 8. Récapitulatif fiscal
- Synthèse annuelle : recettes BIC, charges déductibles, amortissements
- Résultat fiscal LMNP
- Export CSV/PDF pour le comptable
- Aide au remplissage de la liasse 2031/2033

### Phase 3 — Gestion avancée

#### 9. Documents & Modèles
- Stockage organisé des documents (bail, états des lieux, diagnostics, assurances)
- Modèles de courriers pré-remplis : relance impayé, avis d'augmentation loyer, congé
- Archivage par année

#### 10. Calendrier & Alertes
- Révision annuelle du loyer selon l'indice IRL (calcul automatique)
- Rappels : échéance bail, renouvellement assurance, déclaration fiscale
- Historique des événements

#### 11. Multi-biens (évolution future)
- Gestion de plusieurs biens
- Dashboard consolidé

---

## 🗃️ Modèle de données (schéma Prisma initial)

Les entités principales :

- **Property** : id, adresse, surface, type, prixAchat, dateAcquisition, description
- **Tenant** : id, nom, prenom, email, telephone, garant, propertyId
- **Lease** : id, dateDebut, dateFin, loyerHC, charges, depotGarantie, tenantId, propertyId
- **Payment** : id, mois (YYYY-MM), montantAttendu, montantRecu, datePaiement, statut, leaseId
- **Expense** : id, date, montant, categorie, description, justificatifUrl, propertyId
- **Amortization** : id, libelle, type (bien/meuble/travaux), valeur, duree, dateDebut, propertyId
- **Document** : id, nom, type, fichierUrl, dateUpload, propertyId

---

## 🎨 Design & UX

- Design moderne, épuré, professionnel
- Palette de couleurs sobre : bleu foncé / gris / blanc, touches de vert pour les éléments positifs, rouge/orange pour les alertes
- Sidebar de navigation à gauche
- Responsive mais usage principalement desktop
- Composants shadcn/ui pour la cohérence
- Icônes : Lucide React

---

## 📁 Structure du projet

```
lmnp-manager/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx              # Dashboard
│   │   ├── bien/                 # Fiche du bien
│   │   ├── locataire/            # Gestion locataire
│   │   ├── loyers/               # Suivi des loyers
│   │   ├── quittances/           # Génération quittances
│   │   ├── depenses/             # Suivi dépenses
│   │   ├── amortissements/       # Tableau amortissements
│   │   ├── documents/            # Gestion documentaire
│   │   └── api/                  # API Routes
│   ├── components/
│   │   ├── ui/                   # Composants shadcn
│   │   ├── layout/               # Sidebar, Header
│   │   ├── dashboard/            # Widgets dashboard
│   │   └── forms/                # Formulaires réutilisables
│   ├── lib/
│   │   ├── db.ts                 # Client Prisma
│   │   ├── utils.ts              # Utilitaires
│   │   └── pdf.ts                # Génération PDF
│   └── types/
│       └── index.ts              # Types TypeScript
├── public/
├── INSTRUCTIONS.md
├── package.json
└── README.md
```

---

## ✅ Conventions

- **TypeScript** strict
- **Nommage** : camelCase pour les variables/fonctions, PascalCase pour les composants
- **Commentaires** : en français
- **Commits** : messages en français, conventionnels (feat:, fix:, refactor:)
- **Pas d'over-engineering** : garder les choses simples, on est sur un outil perso
- **Données de test** : créer des seed data réalistes pour le développement

---

## 🚀 Pour commencer

Démarre par la **Phase 1** dans cet ordre :
1. Setup du projet (Next.js + Prisma + Tailwind + shadcn)
2. Schéma de base de données + seed
3. Layout principal (sidebar + header)
4. Dashboard avec données mockées
5. Page de suivi des loyers (CRUD)
6. Génération de quittances PDF
7. Fiche du bien et du locataire

Chaque fonctionnalité doit être opérationnelle avant de passer à la suivante.
