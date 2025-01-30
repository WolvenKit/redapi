/*
  Warnings:

  - You are about to drop the column `AdultContent` on the `NexusModsData` table. All the data in the column will be lost.
  - You are about to drop the column `Downloads` on the `NexusModsData` table. All the data in the column will be lost.
  - You are about to drop the column `Endorsements` on the `NexusModsData` table. All the data in the column will be lost.
  - You are about to drop the column `GameDomainName` on the `NexusModsData` table. All the data in the column will be lost.
  - You are about to drop the column `ModCategory` on the `NexusModsData` table. All the data in the column will be lost.
  - You are about to drop the column `ModId` on the `NexusModsData` table. All the data in the column will be lost.
  - You are about to drop the column `Name` on the `NexusModsData` table. All the data in the column will be lost.
  - You are about to drop the column `PictureUrl` on the `NexusModsData` table. All the data in the column will be lost.
  - You are about to drop the column `Status` on the `NexusModsData` table. All the data in the column will be lost.
  - You are about to drop the column `Summary` on the `NexusModsData` table. All the data in the column will be lost.
  - You are about to drop the column `Version` on the `NexusModsData` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "NexusModsData" DROP COLUMN "AdultContent",
DROP COLUMN "Downloads",
DROP COLUMN "Endorsements",
DROP COLUMN "GameDomainName",
DROP COLUMN "ModCategory",
DROP COLUMN "ModId",
DROP COLUMN "Name",
DROP COLUMN "PictureUrl",
DROP COLUMN "Status",
DROP COLUMN "Summary",
DROP COLUMN "Version";

-- CreateTable
CREATE TABLE "NexusModsModData" (
    "StoredId" SERIAL NOT NULL,
    "ModId" INTEGER NOT NULL,
    "Name" TEXT NOT NULL,
    "Version" TEXT NOT NULL,
    "Downloads" TEXT NOT NULL,
    "Endorsements" TEXT NOT NULL,
    "AdultContent" BOOLEAN NOT NULL,
    "Summary" TEXT NOT NULL,
    "Status" TEXT NOT NULL,
    "ModCategory" TEXT NOT NULL,
    "PictureUrl" TEXT NOT NULL,
    "GameDomainName" TEXT NOT NULL,
    "nexusModsDataStoredId" INTEGER,

    CONSTRAINT "NexusModsModData_pkey" PRIMARY KEY ("StoredId")
);

-- CreateTable
CREATE TABLE "NexusModsUserData" (
    "StoredId" SERIAL NOT NULL,
    "Name" TEXT,
    "ModCount" INTEGER,
    "Kudos" INTEGER,
    "Country" TEXT,
    "MemberId" INTEGER,
    "About" TEXT,
    "Posts" INTEGER,
    "Avatar" TEXT,
    "UniqueModDownloads" INTEGER,
    "nexusModsDataStoredId" INTEGER,

    CONSTRAINT "NexusModsUserData_pkey" PRIMARY KEY ("StoredId")
);

-- CreateIndex
CREATE UNIQUE INDEX "NexusModsModData_ModId_key" ON "NexusModsModData"("ModId");

-- AddForeignKey
ALTER TABLE "NexusModsModData" ADD CONSTRAINT "NexusModsModData_nexusModsDataStoredId_fkey" FOREIGN KEY ("nexusModsDataStoredId") REFERENCES "NexusModsData"("StoredId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NexusModsUserData" ADD CONSTRAINT "NexusModsUserData_nexusModsDataStoredId_fkey" FOREIGN KEY ("nexusModsDataStoredId") REFERENCES "NexusModsData"("StoredId") ON DELETE SET NULL ON UPDATE CASCADE;
