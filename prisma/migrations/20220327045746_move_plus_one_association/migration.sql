/*
  Warnings:

  - You are about to drop the column `plus_one_ids` on the `Guest` table. All the data in the column will be lost.
  - Added the required column `guest_id` to the `PlusOne` table without a default value. This is not possible if the table is not empty.

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
    "diet" TEXT NOT NULL,
    "comment" TEXT NOT NULL
);
INSERT INTO "new_Guest" ("address", "attending", "comment", "diet", "email", "first_name", "id", "last_name") SELECT "address", "attending", "comment", "diet", "email", "first_name", "id", "last_name" FROM "Guest";
DROP TABLE "Guest";
ALTER TABLE "new_Guest" RENAME TO "Guest";
CREATE TABLE "new_PlusOne" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "diet" TEXT NOT NULL,
    "guest_id" INTEGER NOT NULL
);
INSERT INTO "new_PlusOne" ("diet", "first_name", "id", "last_name") SELECT "diet", "first_name", "id", "last_name" FROM "PlusOne";
DROP TABLE "PlusOne";
ALTER TABLE "new_PlusOne" RENAME TO "PlusOne";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
