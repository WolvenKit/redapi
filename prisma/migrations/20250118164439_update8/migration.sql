/*
  Warnings:

  - A unique constraint covering the columns `[userGlobalId]` on the table `GithubData` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userGlobalId]` on the table `NexusModsData` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userGlobalId]` on the table `Role` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "GithubData" DROP CONSTRAINT "GithubData_userGlobalId_fkey";

-- DropForeignKey
ALTER TABLE "NexusModsData" DROP CONSTRAINT "NexusModsData_userGlobalId_fkey";

-- DropForeignKey
ALTER TABLE "Role" DROP CONSTRAINT "Role_userGlobalId_fkey";

-- AlterTable
ALTER TABLE "GithubData" ALTER COLUMN "userGlobalId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "NexusModsData" ALTER COLUMN "userGlobalId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Role" ALTER COLUMN "userGlobalId" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "GithubData_userGlobalId_key" ON "GithubData"("userGlobalId");

-- CreateIndex
CREATE UNIQUE INDEX "NexusModsData_userGlobalId_key" ON "NexusModsData"("userGlobalId");

-- CreateIndex
CREATE UNIQUE INDEX "Role_userGlobalId_key" ON "Role"("userGlobalId");

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_userGlobalId_fkey" FOREIGN KEY ("userGlobalId") REFERENCES "User"("Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NexusModsData" ADD CONSTRAINT "NexusModsData_userGlobalId_fkey" FOREIGN KEY ("userGlobalId") REFERENCES "User"("Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GithubData" ADD CONSTRAINT "GithubData_userGlobalId_fkey" FOREIGN KEY ("userGlobalId") REFERENCES "User"("Id") ON DELETE SET NULL ON UPDATE CASCADE;
