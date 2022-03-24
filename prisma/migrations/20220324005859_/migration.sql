/*
  Warnings:

  - You are about to drop the column `primary` on the `Guest` table. All the data in the column will be lost.
  - Made the column `comment` on table `Guest` required. This step will fail if there are existing NULL values in that column.
  - Made the column `plus_one_ids` on table `Guest` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Guest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "attending" BOOLEAN NOT NULL,
    "plus_one_ids" TEXT NOT NULL,
    "diet" TEXT NOT NULL,
    "comment" TEXT NOT NULL
);
INSERT INTO "new_Guest" ("address", "attending", "comment", "diet", "email", "first_name", "id", "last_name", "plus_one_ids") SELECT "address", "attending", "comment", "diet", "email", "first_name", "id", "last_name", "plus_one_ids" FROM "Guest";
DROP TABLE "Guest";
ALTER TABLE "new_Guest" RENAME TO "Guest";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
