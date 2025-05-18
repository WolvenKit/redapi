-- CreateTable
CREATE TABLE "Settings" (
    "Id" SERIAL NOT NULL,
    "GuildId" TEXT,
    "RestrictedQuotesChannels" JSONB,
    "MarkedMembersChannel" TEXT,
    "ModerationCategory" TEXT,
    "ModerationLog" TEXT,
    "MarkedMembersRole" TEXT,
    "interactionSettingsId" INTEGER,
    "eventSettingsId" INTEGER,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "InteractionSettings" (
    "Id" SERIAL NOT NULL,
    "Avatar" BOOLEAN NOT NULL DEFAULT false,
    "Clean" BOOLEAN NOT NULL DEFAULT false,
    "Clear" BOOLEAN NOT NULL DEFAULT false,
    "Core" BOOLEAN NOT NULL DEFAULT false,
    "Developer" BOOLEAN NOT NULL DEFAULT false,
    "Discord" BOOLEAN NOT NULL DEFAULT false,
    "Emoji" BOOLEAN NOT NULL DEFAULT false,
    "Infos" BOOLEAN NOT NULL DEFAULT false,
    "Mute" BOOLEAN NOT NULL DEFAULT false,
    "Remind" BOOLEAN NOT NULL DEFAULT false,
    "Repeat" BOOLEAN NOT NULL DEFAULT false,
    "Sync" BOOLEAN NOT NULL DEFAULT false,
    "Teams" BOOLEAN NOT NULL DEFAULT false,
    "Who" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "InteractionSettings_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "EventSettings" (
    "Id" SERIAL NOT NULL,
    "ban" BOOLEAN NOT NULL DEFAULT false,
    "categoryChannelCreated" BOOLEAN NOT NULL DEFAULT false,
    "categoryChannelDeleted" BOOLEAN NOT NULL DEFAULT false,
    "categoryChannelUpdated" BOOLEAN NOT NULL DEFAULT false,
    "duplicationChecker" BOOLEAN NOT NULL DEFAULT false,
    "guildJoin" BOOLEAN NOT NULL DEFAULT false,
    "join" BOOLEAN NOT NULL DEFAULT false,
    "kick" BOOLEAN NOT NULL DEFAULT false,
    "mark" BOOLEAN NOT NULL DEFAULT false,
    "messageDelete" BOOLEAN NOT NULL DEFAULT false,
    "messageUpdate" BOOLEAN NOT NULL DEFAULT false,
    "quickCommands" BOOLEAN NOT NULL DEFAULT false,
    "quote" BOOLEAN NOT NULL DEFAULT false,
    "suggenstions_handle" BOOLEAN NOT NULL DEFAULT false,
    "textChannelCreate" BOOLEAN NOT NULL DEFAULT false,
    "textChannelDelete" BOOLEAN NOT NULL DEFAULT false,
    "textChannelUpdate" BOOLEAN NOT NULL DEFAULT false,
    "threadCreate" BOOLEAN NOT NULL DEFAULT false,
    "threadDelete" BOOLEAN NOT NULL DEFAULT false,
    "threadUpdate" BOOLEAN NOT NULL DEFAULT false,
    "userBan" BOOLEAN NOT NULL DEFAULT false,
    "userCheck" BOOLEAN NOT NULL DEFAULT false,
    "userJoined" BOOLEAN NOT NULL DEFAULT false,
    "userRemoved" BOOLEAN NOT NULL DEFAULT false,
    "userUnban" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "EventSettings_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Infotext" (
    "id" SERIAL NOT NULL,
    "Json" JSONB,

    CONSTRAINT "Infotext_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Settings_GuildId_key" ON "Settings"("GuildId");

-- AddForeignKey
ALTER TABLE "Settings" ADD CONSTRAINT "Settings_interactionSettingsId_fkey" FOREIGN KEY ("interactionSettingsId") REFERENCES "InteractionSettings"("Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Settings" ADD CONSTRAINT "Settings_eventSettingsId_fkey" FOREIGN KEY ("eventSettingsId") REFERENCES "EventSettings"("Id") ON DELETE SET NULL ON UPDATE CASCADE;
