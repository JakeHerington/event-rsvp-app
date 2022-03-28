-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PlusOne" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "diet" TEXT NOT NULL,
    "guest_id" INTEGER NOT NULL,
    CONSTRAINT "PlusOne_guest_id_fkey" FOREIGN KEY ("guest_id") REFERENCES "Guest" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PlusOne" ("diet", "first_name", "guest_id", "id", "last_name") SELECT "diet", "first_name", "guest_id", "id", "last_name" FROM "PlusOne";
DROP TABLE "PlusOne";
ALTER TABLE "new_PlusOne" RENAME TO "PlusOne";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
