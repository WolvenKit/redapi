/*
  Warnings:

  - A unique constraint covering the columns `[DiscordId]` on the table `Auth` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Auth" ADD COLUMN     "DiscordId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Auth_DiscordId_key" ON "Auth"("DiscordId");
