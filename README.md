<div align="center">

# 🏠 LMNP Manager

**Gestion de location meublée non professionnelle — sans le tableur Excel qui déborde.**

<sub>*Une app full-stack conçue et expédiée en pilotant **Claude Code**.*</sub>

![Status](https://img.shields.io/badge/status-in_development-orange?style=flat-square)
![Next.js](https://img.shields.io/badge/Next.js-16-000?style=flat-square&logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?style=flat-square&logo=prisma&logoColor=white)
![Built with Claude Code](https://img.shields.io/badge/Built_with-Claude_Code-D97706?style=flat-square&logo=anthropic&logoColor=white)

</div>

---

## 💡 Pourquoi ce projet

Si tu loues un bien en **LMNP** (Location Meublée Non Professionnelle), tu connais la chanson :

- Des loyers à encaisser chaque mois — et à tracer.
- Des quittances à envoyer aux locataires.
- Des factures de travaux, taxes foncières, intérêts d'emprunt à archiver.
- Et une fois par an, l'angoisse : **ressortir tout ça pour la liasse fiscale 2031**.

La plupart des gens gèrent ça dans un Google Sheet qui grossit, se fragmente, et finit par être un cauchemar au moment de la déclaration. **LMNP Manager** remplace ce bazar par une app simple, locale, et taillée pour le cas français.

## 🤖 Note sur la conception

Ce projet est **ma démo vivante de ce qu'un workflow "spec → agent → review"** permet de livrer. Je ne suis pas développeuse pro — je suis spécialiste automatisation & AI ops. L'intégralité du code est écrite par **Claude Code** à partir de specs et d'une architecture que j'ai posées.

Ma valeur ajoutée n'est pas dans les lignes de TypeScript. Elle est dans :
- le **découpage du problème métier** (régime fiscal LMNP, bail, quittance réglementaire…)
- le **choix de stack** (pourquoi Prisma + SQLite plutôt qu'un Supabase, pourquoi App Router)
- la **review critique** de ce que l'agent produit
- la **boucle d'itération** : brief → code → test → brief plus précis

C'est, je pense, la forme que va prendre beaucoup de "dev" dans les 2 prochaines années. Ce repo est ma manière de montrer que je maîtrise ce mode de fabrication.

## ✨ Fonctionnalités

- 📅 **Suivi des loyers** — encaissements, retards, relances
- 🧾 **Génération de quittances** — PDF prêts à envoyer, format réglementaire
- 💶 **Gestion des dépenses** — catégorisées (travaux, charges, assurance, intérêts…)
- 📊 **Tableau de bord** — revenus nets, taux d'occupation, trésorerie
- 🗂️ **Export fiscal** — récap annuel pour ton expert-comptable ou ta déclaration 2031

## 🛠️ Stack technique

| Couche | Outil | Pourquoi ce choix |
|---|---|---|
| Framework | **Next.js 16** (App Router) | Server Actions = pas d'API REST à maintenir à côté |
| UI | **React 19** + **Tailwind v4** + **shadcn/ui** | Composants accessibles, design cohérent, zéro CSS custom |
| Langage | **TypeScript 5** | Type-safety de bout en bout, indispensable pour un code écrit par agent |
| ORM | **Prisma 7** | Migrations versionnées, schéma comme source de vérité |
| Base de données | **SQLite** (via `better-sqlite3`) | Local-first, zéro config, un fichier à sauvegarder |
| Graphiques | **Recharts** | Dashboards simples et réactifs |
| Icônes | **Lucide React** | Set cohérent, léger |

## 🚀 Démarrage
```
​bash
git clone https://github.com/floroche/lmnp-manager.git
cd lmnp-manager
npm install
```
# Base de données : migrations + données de seed
```
npm run db:migrate
npm run db:seed
```
# Lancer en dev
```
npm run dev
​
→ [http://localhost:3000](http://localhost:3000)
```
## 📁 Structure

​```
lmnp-manager/
├── app/              # Routes Next.js (App Router)
├── components/       # Composants UI (shadcn + custom)
├── lib/              # Utils, helpers, client Prisma
├── prisma/
│   ├── schema.prisma # Modèle de données
│   └── seed.ts       # Données de démo
└── public/           # Assets statiques
​```

## 🗺️ Roadmap

- [x] Base de données + modèles (biens, locataires, baux, paiements)
- [x] Interface de saisie des loyers
- [ ] Génération PDF de quittances
- [ ] Import OFX / CSV de relevés bancaires
- [ ] Calcul d'amortissements (régime réel LMNP)
- [ ] Export liasse 2031

## ⚠️ Disclaimer

Projet **perso** et **en développement actif**. Ce n'est pas un conseil fiscal — pour ta vraie déclaration, parle à un expert-comptable. L'app t'aide à organiser tes données, elle ne remplace pas un pro.

---

<div align="center">

Conçu par [**@floroche**](https://github.com/floroche) • Écrit par [**Claude Code**](https://claude.com/claude-code) • Parce qu'un outil simple > dix onglets Excel.

</div>
