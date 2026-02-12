/*
  Warnings:

  - Added the required column `sportId` to the `Competition` table without a default value. This is not possible if the table is not empty.

*/
-- Clean existing data that would violate the new constraint
DELETE FROM "Epreuve";
DELETE FROM "Competition";

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Competition" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nom" TEXT NOT NULL,
    "sportId" TEXT NOT NULL,
    "championnatId" TEXT,
    CONSTRAINT "Competition_sportId_fkey" FOREIGN KEY ("sportId") REFERENCES "Sport" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Competition_championnatId_fkey" FOREIGN KEY ("championnatId") REFERENCES "Championnat" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Competition" ("championnatId", "id", "nom") SELECT "championnatId", "id", "nom" FROM "Competition";
DROP TABLE "Competition";
ALTER TABLE "new_Competition" RENAME TO "Competition";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
