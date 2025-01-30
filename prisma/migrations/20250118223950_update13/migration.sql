/*
  Warnings:

  - A unique constraint covering the columns `[MemberId]` on the table `NexusModsUserData` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "NexusModsUserData_MemberId_key" ON "NexusModsUserData"("MemberId");
