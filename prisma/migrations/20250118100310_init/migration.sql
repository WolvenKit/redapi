-- CreateEnum
CREATE TYPE "Theme" AS ENUM ('cyberpunk', 'default', 'witcher');

-- CreateEnum
CREATE TYPE "Style" AS ENUM ('uppercase', 'lowercase');

-- CreateTable
CREATE TABLE "User" (
    "GlobalId" SERIAL NOT NULL,
    "Username" TEXT NOT NULL,
    "GlobalName" TEXT NOT NULL,
    "Image" TEXT NOT NULL,
    "Id" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("GlobalId")
);

-- CreateTable
CREATE TABLE "Role" (
    "StoredId" SERIAL NOT NULL,
    "RoleName" TEXT NOT NULL,
    "DiscordId" TEXT NOT NULL,
    "IconUrl" TEXT NOT NULL,
    "ServerId" TEXT NOT NULL,
    "ServerPosition" INTEGER NOT NULL,
    "userGlobalId" INTEGER,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("StoredId")
);

-- CreateTable
CREATE TABLE "CustomData" (
    "StoredId" SERIAL NOT NULL,
    "Theme" "Theme" NOT NULL,
    "Style" "Style" NOT NULL,
    "NexusMods" TEXT NOT NULL,
    "Github" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "userGlobalId" INTEGER,

    CONSTRAINT "CustomData_pkey" PRIMARY KEY ("StoredId")
);

-- CreateTable
CREATE TABLE "NexusModsData" (
    "StoredId" SERIAL NOT NULL,
    "ModId" INTEGER NOT NULL,
    "Name" TEXT NOT NULL,
    "Version" TEXT NOT NULL,
    "Downloads" TEXT NOT NULL,
    "Endorsements" TEXT NOT NULL,
    "AdultContent" BOOLEAN NOT NULL,
    "Summary" TEXT NOT NULL,
    "Status" TEXT NOT NULL,
    "ModCategory" TEXT NOT NULL,
    "PictureUrl" TEXT NOT NULL,
    "GameDomainname" TEXT NOT NULL,
    "userGlobalId" INTEGER,

    CONSTRAINT "NexusModsData_pkey" PRIMARY KEY ("StoredId")
);

-- CreateTable
CREATE TABLE "GithubData" (
    "StoredId" SERIAL NOT NULL,
    "Repository" TEXT NOT NULL,
    "IssueCount" INTEGER NOT NULL,
    "CommitCount" INTEGER NOT NULL,
    "userGlobalId" INTEGER,

    CONSTRAINT "GithubData_pkey" PRIMARY KEY ("StoredId")
);

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_userGlobalId_fkey" FOREIGN KEY ("userGlobalId") REFERENCES "User"("GlobalId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomData" ADD CONSTRAINT "CustomData_userGlobalId_fkey" FOREIGN KEY ("userGlobalId") REFERENCES "User"("GlobalId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NexusModsData" ADD CONSTRAINT "NexusModsData_userGlobalId_fkey" FOREIGN KEY ("userGlobalId") REFERENCES "User"("GlobalId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GithubData" ADD CONSTRAINT "GithubData_userGlobalId_fkey" FOREIGN KEY ("userGlobalId") REFERENCES "User"("GlobalId") ON DELETE SET NULL ON UPDATE CASCADE;
