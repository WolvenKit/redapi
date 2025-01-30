/*
  Warnings:

  - The `Theme` column on the `CustomData` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `Style` column on the `CustomData` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "theme" AS ENUM ('cyberpunk', 'default', 'witcher');

-- CreateEnum
CREATE TYPE "style" AS ENUM ('uppercase', 'lowercase');

-- AlterTable
ALTER TABLE "CustomData" DROP COLUMN "Theme",
ADD COLUMN     "Theme" TEXT NOT NULL DEFAULT 'default',
DROP COLUMN "Style",
ADD COLUMN     "Style" TEXT NOT NULL DEFAULT 'uppercase';

-- DropEnum
DROP TYPE "Style";

-- DropEnum
DROP TYPE "Theme";
