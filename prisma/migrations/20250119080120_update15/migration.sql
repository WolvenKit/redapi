/*
  Warnings:

  - A unique constraint covering the columns `[NexusId]` on the table `NexusModsData` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nexusModsDataStoredId]` on the table `NexusModsModData` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nexusModsDataStoredId]` on the table `NexusModsUserData` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `NexusId` to the `NexusModsData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "NexusModsData" ADD COLUMN     "NexusId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "NexusModsData_NexusId_key" ON "NexusModsData"("NexusId");

-- CreateIndex
CREATE UNIQUE INDEX "NexusModsModData_nexusModsDataStoredId_key" ON "NexusModsModData"("nexusModsDataStoredId");

-- CreateIndex
CREATE UNIQUE INDEX "NexusModsUserData_nexusModsDataStoredId_key" ON "NexusModsUserData"("nexusModsDataStoredId");
