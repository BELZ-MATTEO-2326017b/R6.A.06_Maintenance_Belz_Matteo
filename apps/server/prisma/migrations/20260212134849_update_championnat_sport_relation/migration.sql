/*
  Warnings:

  - You are about to drop the column `sportId` on the `Competition` table. All the data in the column will be lost.
  - Added the required column `sportId` to the `Championnat` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Championnat" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nom" TEXT NOT NULL,
    "sportId" TEXT NOT NULL,
    CONSTRAINT "Championnat_sportId_fkey" FOREIGN KEY ("sportId") REFERENCES "Sport" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Championnat" ("id", "nom") SELECT "id", "nom" FROM "Championnat";
DROP TABLE "Championnat";
ALTER TABLE "new_Championnat" RENAME TO "Championnat";
CREATE TABLE "new_Competition" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nom" TEXT NOT NULL,
    "championnatId" TEXT,
    CONSTRAINT "Competition_championnatId_fkey" FOREIGN KEY ("championnatId") REFERENCES "Championnat" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Competition" ("championnatId", "id", "nom") SELECT "championnatId", "id", "nom" FROM "Competition";
DROP TABLE "Competition";
ALTER TABLE "new_Competition" RENAME TO "Competition";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
