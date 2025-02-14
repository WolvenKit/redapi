/*
  Warnings:

  - A unique constraint covering the columns `[JWT]` on the table `Moderation` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Moderation" ADD COLUMN     "JWT" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Moderation_JWT_key" ON "Moderation"("JWT");
