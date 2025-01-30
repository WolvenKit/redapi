-- DropForeignKey
ALTER TABLE "CustomData" DROP CONSTRAINT "CustomData_userGlobalId_fkey";

-- AlterTable
ALTER TABLE "CustomData" ALTER COLUMN "userGlobalId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "CustomData" ADD CONSTRAINT "CustomData_userGlobalId_fkey" FOREIGN KEY ("userGlobalId") REFERENCES "User"("Id") ON DELETE SET NULL ON UPDATE CASCADE;
