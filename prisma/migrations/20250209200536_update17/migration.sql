/*
  Warnings:

  - A unique constraint covering the columns `[DiscordId]` on the table `Moderation` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Moderation" ALTER COLUMN "Status" DROP NOT NULL,
ALTER COLUMN "WarningLevel" DROP NOT NULL,
ALTER COLUMN "WarningCount" DROP NOT NULL,
ALTER COLUMN "LastWarning" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Warning" ALTER COLUMN "IssuedTime" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "Reason" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Moderation_DiscordId_key" ON "Moderation"("DiscordId");
