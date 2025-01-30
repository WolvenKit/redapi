-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_serverStoredId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "serverStoredId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_serverStoredId_fkey" FOREIGN KEY ("serverStoredId") REFERENCES "Server"("ServerId") ON DELETE SET NULL ON UPDATE CASCADE;
