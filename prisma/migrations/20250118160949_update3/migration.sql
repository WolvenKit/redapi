/*
  Warnings:

  - A unique constraint covering the columns `[Id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "Username" DROP NOT NULL,
ALTER COLUMN "GlobalName" DROP NOT NULL,
ALTER COLUMN "Image" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_Id_key" ON "User"("Id");
