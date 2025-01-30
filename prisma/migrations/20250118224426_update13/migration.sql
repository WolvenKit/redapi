/*
  Warnings:

  - Changed the type of `Downloads` on the `NexusModsModData` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `Endorsements` on the `NexusModsModData` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "NexusModsModData" DROP COLUMN "Downloads",
ADD COLUMN     "Downloads" INTEGER NOT NULL,
DROP COLUMN "Endorsements",
ADD COLUMN     "Endorsements" INTEGER NOT NULL;
