-- CreateTable
CREATE TABLE "Credit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nom" TEXT NOT NULL,
    "montantTotal" REAL NOT NULL,
    "tauxInteret" REAL NOT NULL,
    "dureeEnMois" INTEGER NOT NULL,
    "dateDebut" DATETIME NOT NULL,
    "banque" TEXT,
    "propertyId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Credit_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CreditEcheanceAnnuelle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "annee" INTEGER NOT NULL,
    "montant" REAL NOT NULL,
    "creditId" TEXT NOT NULL,
    CONSTRAINT "CreditEcheanceAnnuelle_creditId_fkey" FOREIGN KEY ("creditId") REFERENCES "Credit" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CreditEcheanceMensuelle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "mois" TEXT NOT NULL,
    "montant" REAL NOT NULL,
    "note" TEXT,
    "creditId" TEXT NOT NULL,
    CONSTRAINT "CreditEcheanceMensuelle_creditId_fkey" FOREIGN KEY ("creditId") REFERENCES "Credit" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "CreditEcheanceAnnuelle_creditId_annee_key" ON "CreditEcheanceAnnuelle"("creditId", "annee");

-- CreateIndex
CREATE UNIQUE INDEX "CreditEcheanceMensuelle_creditId_mois_key" ON "CreditEcheanceMensuelle"("creditId", "mois");
