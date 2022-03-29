/*
  Warnings:

  - Added the required column `event_id` to the `Guest` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Event" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "description" TEXT,
    "date_created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_updated" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Guest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "address" TEXT,
    "attending" BOOLEAN NOT NULL DEFAULT false,
    "diet" TEXT NOT NULL,
    "comment" TEXT,
    "event_id" INTEGER NOT NULL,
    CONSTRAINT "Guest_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Guest" ("address", "attending", "comment", "diet", "email", "first_name", "id", "last_name") SELECT "address", "attending", "comment", "diet", "email", "first_name", "id", "last_name" FROM "Guest";
DROP TABLE "Guest";
ALTER TABLE "new_Guest" RENAME TO "Guest";
CREATE UNIQUE INDEX "Guest_email_key" ON "Guest"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
