/*
  Warnings:

  - A unique constraint covering the columns `[ServerId]` on the table `Server` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Server_ServerId_key" ON "Server"("ServerId");
