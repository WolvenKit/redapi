-- CreateTable
CREATE TABLE "Auth" (
    "GlobalId" SERIAL NOT NULL,
    "JWT" TEXT,
    "Status" TEXT,

    CONSTRAINT "Auth_pkey" PRIMARY KEY ("GlobalId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Auth_JWT_key" ON "Auth"("JWT");
