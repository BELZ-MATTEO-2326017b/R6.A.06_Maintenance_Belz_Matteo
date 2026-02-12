-- CreateTable
CREATE TABLE "Sport" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nom" TEXT NOT NULL,
    "type" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Championnat" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nom" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Competition" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nom" TEXT NOT NULL,
    "championnatId" TEXT,
    CONSTRAINT "Competition_championnatId_fkey" FOREIGN KEY ("championnatId") REFERENCES "Championnat" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Epreuve" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nom" TEXT NOT NULL,
    "sportId" TEXT NOT NULL,
    "competitionId" TEXT NOT NULL,
    CONSTRAINT "Epreuve_sportId_fkey" FOREIGN KEY ("sportId") REFERENCES "Sport" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Epreuve_competitionId_fkey" FOREIGN KEY ("competitionId") REFERENCES "Competition" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
