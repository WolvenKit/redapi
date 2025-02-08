/*
  Warnings:

  - You are about to drop the column `Id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `Image` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `serverStoredId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `CustomData` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GithubData` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NexusModsData` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NexusModsModData` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NexusModsUserData` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Server` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[DiscordiD]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `DiscordiD` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CustomData" DROP CONSTRAINT "CustomData_userGlobalId_fkey";

-- DropForeignKey
ALTER TABLE "GithubData" DROP CONSTRAINT "GithubData_userGlobalId_fkey";

-- DropForeignKey
ALTER TABLE "NexusModsData" DROP CONSTRAINT "NexusModsData_userGlobalId_fkey";

-- DropForeignKey
ALTER TABLE "NexusModsModData" DROP CONSTRAINT "NexusModsModData_nexusModsDataStoredId_fkey";

-- DropForeignKey
ALTER TABLE "NexusModsUserData" DROP CONSTRAINT "NexusModsUserData_nexusModsDataStoredId_fkey";

-- DropForeignKey
ALTER TABLE "Role" DROP CONSTRAINT "Role_userGlobalId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_serverStoredId_fkey";

-- DropIndex
DROP INDEX "User_Id_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "Id",
DROP COLUMN "Image",
DROP COLUMN "serverStoredId",
ADD COLUMN     "Avatar" TEXT,
ADD COLUMN     "Description" TEXT,
ADD COLUMN     "DiscordiD" TEXT NOT NULL,
ADD COLUMN     "Github" JSONB,
ADD COLUMN     "GithubUsername" TEXT,
ADD COLUMN     "NexusMods" JSONB,
ADD COLUMN     "NexusModsUsername" TEXT,
ADD COLUMN     "Roles" JSONB,
ADD COLUMN     "Style" TEXT DEFAULT 'uppercase',
ADD COLUMN     "Theme" TEXT DEFAULT 'default';

-- DropTable
DROP TABLE "CustomData";

-- DropTable
DROP TABLE "GithubData";

-- DropTable
DROP TABLE "NexusModsData";

-- DropTable
DROP TABLE "NexusModsModData";

-- DropTable
DROP TABLE "NexusModsUserData";

-- DropTable
DROP TABLE "Role";

-- DropTable
DROP TABLE "Server";

-- DropEnum
DROP TYPE "style";

-- DropEnum
DROP TYPE "theme";

-- CreateTable
CREATE TABLE "Tags" (
    "GlobalId" SERIAL NOT NULL,
    "TagName" TEXT NOT NULL,
    "TagContent" TEXT,

    CONSTRAINT "Tags_pkey" PRIMARY KEY ("GlobalId")
);

-- CreateTable
CREATE TABLE "Moderation" (
    "GlobalId" SERIAL NOT NULL,
    "DiscordId" TEXT NOT NULL,
    "Status" TEXT NOT NULL,
    "WarningLevel" INTEGER NOT NULL,
    "WarningCount" INTEGER NOT NULL,
    "LastWarning" TIMESTAMP(3) NOT NULL,
    "LastReason" TEXT,
    "Resolved" BOOLEAN NOT NULL,

    CONSTRAINT "Moderation_pkey" PRIMARY KEY ("GlobalId")
);

-- CreateTable
CREATE TABLE "Warning" (
    "GlobalId" SERIAL NOT NULL,
    "IssuedTime" TIMESTAMP(3) NOT NULL,
    "Reason" TEXT NOT NULL,
    "IssuerName" TEXT NOT NULL,
    "moderationGlobalId" INTEGER,

    CONSTRAINT "Warning_pkey" PRIMARY KEY ("GlobalId")
);

-- CreateTable
CREATE TABLE "Bans" (
    "GlobalId" SERIAL NOT NULL,
    "DiscordId" TEXT NOT NULL,
    "DiscordName" TEXT NOT NULL,
    "Reason" TEXT,
    "Partial" BOOLEAN NOT NULL,
    "GuildId" TEXT NOT NULL,

    CONSTRAINT "Bans_pkey" PRIMARY KEY ("GlobalId")
);

-- CreateTable
CREATE TABLE "Kick" (
    "GlobalId" SERIAL NOT NULL,
    "DiscordId" TEXT NOT NULL,
    "DiscordName" TEXT NOT NULL,
    "Reason" TEXT,
    "Partial" BOOLEAN NOT NULL,
    "GuildId" TEXT NOT NULL,

    CONSTRAINT "Kick_pkey" PRIMARY KEY ("GlobalId")
);

-- CreateTable
CREATE TABLE "Quotes" (
    "GlobalId" SERIAL NOT NULL,
    "Quote" TEXT NOT NULL,
    "Responder" TEXT NOT NULL,

    CONSTRAINT "Quotes_pkey" PRIMARY KEY ("GlobalId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tags_TagName_key" ON "Tags"("TagName");

-- CreateIndex
CREATE UNIQUE INDEX "User_DiscordiD_key" ON "User"("DiscordiD");

-- AddForeignKey
ALTER TABLE "Warning" ADD CONSTRAINT "Warning_moderationGlobalId_fkey" FOREIGN KEY ("moderationGlobalId") REFERENCES "Moderation"("GlobalId") ON DELETE SET NULL ON UPDATE CASCADE;
