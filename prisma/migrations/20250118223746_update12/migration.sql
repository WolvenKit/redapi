-- DropForeignKey
ALTER TABLE "NexusModsModData" DROP CONSTRAINT "NexusModsModData_nexusModsDataStoredId_fkey";

-- AlterTable
ALTER TABLE "NexusModsModData" ALTER COLUMN "nexusModsDataStoredId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "NexusModsModData" ADD CONSTRAINT "NexusModsModData_nexusModsDataStoredId_fkey" FOREIGN KEY ("nexusModsDataStoredId") REFERENCES "NexusModsData"("userGlobalId") ON DELETE SET NULL ON UPDATE CASCADE;
