/*
  Warnings:

  - A unique constraint covering the columns `[userGlobalId]` on the table `CustomData` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CustomData_userGlobalId_key" ON "CustomData"("userGlobalId");
