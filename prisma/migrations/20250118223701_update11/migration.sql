-- DropForeignKey
ALTER TABLE "NexusModsUserData" DROP CONSTRAINT "NexusModsUserData_nexusModsDataStoredId_fkey";

-- AlterTable
ALTER TABLE "NexusModsUserData" ALTER COLUMN "nexusModsDataStoredId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "NexusModsUserData" ADD CONSTRAINT "NexusModsUserData_nexusModsDataStoredId_fkey" FOREIGN KEY ("nexusModsDataStoredId") REFERENCES "NexusModsData"("userGlobalId") ON DELETE SET NULL ON UPDATE CASCADE;
