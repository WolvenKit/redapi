-- CreateTable
CREATE TABLE "MessageComparison" (
    "GlobalId" SERIAL NOT NULL,
    "LastMessageHash" TEXT,
    "CurrentMessageHash" TEXT,
    "UserId" TEXT NOT NULL,
    "TimestampLastMessage" TIMESTAMP(3),
    "TimestampCurrentMessage" TIMESTAMP(3),

    CONSTRAINT "MessageComparison_pkey" PRIMARY KEY ("GlobalId")
);

-- CreateIndex
CREATE UNIQUE INDEX "MessageComparison_UserId_key" ON "MessageComparison"("UserId");
