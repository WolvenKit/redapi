/*
  Warnings:

  - A unique constraint covering the columns `[UserId]` on the table `LLM` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "LLM_UserId_key" ON "LLM"("UserId");
