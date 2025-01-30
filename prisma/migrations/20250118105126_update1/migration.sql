/*
  Warnings:

  - You are about to drop the column `GameDomainname` on the `NexusModsData` table. All the data in the column will be lost.
  - Added the required column `GameDomainName` to the `NexusModsData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "NexusModsData" DROP COLUMN "GameDomainname",
ADD COLUMN     "GameDomainName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "serverStoredId" INTEGER;

-- CreateTable
CREATE TABLE "Server" (
    "StoredId" SERIAL NOT NULL,
    "ServerId" TEXT NOT NULL,

    CONSTRAINT "Server_pkey" PRIMARY KEY ("StoredId")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_serverStoredId_fkey" FOREIGN KEY ("serverStoredId") REFERENCES "Server"("StoredId") ON DELETE SET NULL ON UPDATE CASCADE;
