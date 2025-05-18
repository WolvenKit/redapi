import { Elysia, error, t } from "elysia";
import { prisma } from "../utils/prisma";
import { errorLog } from "../utils";
import { bearer } from "@elysiajs/bearer";
import { ValidateAuth } from "src/middleware/auth";

function calculateWarningLevel(warningCount: number): number {
  return Math.min(100, 10 * Math.pow(1.5, warningCount));
}

export const moderation = new Elysia({ prefix: "/moderation" })
  .use(bearer())
  .guard(
    {
      beforeHandle({ set, bearer, error, path }) {
        return ValidateAuth(set, bearer, error, path, "moderation");
      },
    },
    (app) =>
      app
        .post(
          "/ban",
          async ({ body, error }) => {
            try {
              const moderation = await prisma.moderation.findUnique({
                where: { DiscordId: body.DiscordId },
                include: { Warnings: true }, // Fetch related warnings
              });

              // Count previous warnings
              const previousWarnings = moderation?.WarningCount ?? 0;
              const updatedWarnings = previousWarnings + 1;

              // Calculate new warning level
              const newWarningLevel = calculateWarningLevel(updatedWarnings);

              const bans = await prisma.bans.create({
                data: {
                  DiscordId: body.DiscordId,
                  DiscordName: body.User,
                  Reason: body.Reason,
                  Partial: newWarningLevel > 75.94 ? false : true,
                  GuildId: body.GuildId,
                },
              });

              const newmoderation = await prisma.moderation.upsert({
                where: {
                  DiscordId: body.DiscordId,
                },
                update: {
                  DiscordId: body.DiscordId,
                  WarningCount: {
                    increment: 1,
                  },
                  WarningLevel: newWarningLevel,
                  Status: body.Type,
                  LastReason: body.Reason,
                },
                create: {
                  DiscordId: body.DiscordId,
                  Status: body.Type,
                  LastReason: body.Reason,
                  Resolved: false,
                  WarningCount: 1,
                  WarningLevel: newWarningLevel,
                },
              });

              return [body, newWarningLevel];
            } catch (e) {
              errorLog(e);
              return error(500);
            }
          },
          {
            body: t.Object({
              Type: t.String(),
              DiscordId: t.String(),
              User: t.String(),
              Reason: t.String(),
              Issuer: t.String(),
              GuildId: t.String(),
            }),
          }
        )
        .post(
          "/warn",
          async ({ body, error }) => {
            try {
              const moderation = await prisma.moderation.findUnique({
                where: { DiscordId: body.DiscordId },
                include: { Warnings: true }, // Fetch related warnings
              });

              // Count previous warnings
              const previousWarnings = moderation?.WarningCount ?? 0;
              const updatedWarnings = previousWarnings + 1;

              // Calculate new warning level
              const newWarningLevel = calculateWarningLevel(updatedWarnings);

              const newModeration = await prisma.moderation.upsert({
                where: {
                  DiscordId: body.DiscordId,
                },
                update: {
                  DiscordId: body.DiscordId,
                  Status: body.Type,
                  LastReason: body.Reason,
                  LastWarning: new Date().toISOString(),
                  Resolved: false,
                  WarningCount: {
                    increment: 1,
                  },
                  WarningLevel: newWarningLevel,
                  Warnings: {
                    create: {
                      Reason: body.Reason,
                      IssuedTime: new Date(),
                      IssuerName: body.Issuer,
                    },
                  },
                },
                create: {
                  DiscordId: body.DiscordId,
                  Status: body.Type,
                  LastReason: body.Reason,
                  LastWarning: new Date().toISOString(),
                  Resolved: false,
                  WarningCount: 1,
                  WarningLevel: newWarningLevel,
                  Warnings: {
                    create: {
                      Reason: body.Reason,
                      IssuedTime: new Date(),
                      IssuerName: body.Issuer,
                    },
                  },
                },
              });

              return [body, newWarningLevel];
            } catch (e) {
              errorLog(e);
              return error(500);
            }
          },
          {
            body: t.Object({
              Type: t.String(),
              DiscordId: t.String(),
              User: t.String(),
              Reason: t.String(),
              Issuer: t.String(),
            }),
          }
        )
        .post(
          "/kick",
          async ({ body, error }) => {
            try {
              await prisma.kick.create({
                data: {
                  DiscordId: body.DiscordId,
                  DiscordName: body.User,
                  Reason: body.Reason,
                  Partial: true,
                  GuildId: body.GuildId,
                },
              });

              const moderation = await prisma.moderation.findUnique({
                where: { DiscordId: body.DiscordId },
                include: { Warnings: true }, // Fetch related warnings
              });

              // Count previous warnings
              const previousWarnings = moderation?.WarningCount ?? 0;
              const updatedWarnings = previousWarnings + 1;

              // Calculate new warning level
              const newWarningLevel = calculateWarningLevel(updatedWarnings);

              await prisma.moderation.upsert({
                where: {
                  DiscordId: body.DiscordId,
                },
                update: {
                  DiscordId: body.DiscordId,
                  WarningCount: {
                    increment: 1,
                  },
                  WarningLevel: newWarningLevel,
                  Status: body.Type,
                  LastReason: body.Reason,
                  LastWarning: new Date(),
                  Resolved: false,
                },
                create: {
                  DiscordId: body.DiscordId,
                  Status: body.Type,
                  LastReason: body.Reason,
                  Resolved: false,
                  WarningCount: 1,
                  WarningLevel: newWarningLevel,
                  LastWarning: new Date(),
                },
              });

              return [body, newWarningLevel];
            } catch (e) {
              errorLog(e);
              return error(500);
            }
          },
          {
            body: t.Object({
              Type: t.String(),
              DiscordId: t.String(),
              User: t.String(),
              Reason: t.String(),
              Issuer: t.String(),
              GuildId: t.String(),
            }),
          }
        )
        .post(
          "/drop",
          async ({ body, error }) => {
            try {
              // Drop all Moderation data for a user

              const moderation = await prisma.moderation
                .deleteMany({
                  where: {
                    DiscordId: body.DiscordId,
                  },
                })
                .catch((error) => {
                  return error;
                });

              // Drop all Kicks for a user

              const kicks = await prisma.kick
                .deleteMany({
                  where: {
                    DiscordId: body.DiscordId,
                  },
                })
                .catch((error) => {
                  return error;
                });

              // Drop all Bans for a user

              const bans = await prisma.bans
                .deleteMany({
                  where: {
                    DiscordId: body.DiscordId,
                  },
                })
                .catch((error) => {
                  return error;
                });

              if (!moderation || !kicks || !bans) {
                return body;
              }

              return [body, moderation, kicks, bans];
            } catch (e) {
              errorLog(e);
              return error(500);
            }
          },
          {
            body: t.Object({
              DiscordId: t.String(),
            }),
          }
        )
        .post(
          "/message",
          async ({ body, error }) => {
            try {
              await prisma.messageComparison.upsert({
                where: {
                  UserId: body.UserId,
                },
                update: {
                  UserId: body.UserId,
                  LastMessageHash: (
                    await prisma.messageComparison.findFirst({
                      where: {
                        UserId: body.UserId,
                      },
                      select: {
                        CurrentMessageHash: true,
                      },
                    })
                  )?.CurrentMessageHash,
                  CurrentMessageHash: body.Content,
                  TimestampLastMessage: (
                    await prisma.messageComparison.findFirst({
                      where: {
                        UserId: body.UserId,
                      },
                      select: {
                        TimestampCurrentMessage: true,
                      },
                    })
                  )?.TimestampCurrentMessage,
                  TimestampCurrentMessage: new Date().toISOString(),
                },
                create: {
                  UserId: body.UserId,
                  CurrentMessageHash: body.Content,
                  TimestampCurrentMessage: new Date().toISOString(),
                },
              });

              const message = await prisma.messageComparison.findUnique({
                where: {
                  UserId: body.UserId,
                },
              });

              const lastMessageHash = message?.LastMessageHash;
              const currentMessageHash = message?.CurrentMessageHash;
              const timestampLastMessage = message?.TimestampLastMessage;
              const timestampCurrentMessage = message?.TimestampCurrentMessage;

              const TimeRangeInMinutes = 5;
              const isSameMessage = lastMessageHash === currentMessageHash;

              const isTimeRange =
                Math.abs(
                  new Date(timestampCurrentMessage ?? 0).getTime() -
                    new Date(timestampLastMessage ?? 0).getTime()
                ) <
                TimeRangeInMinutes * 60 * 1000;

              if (isSameMessage && isTimeRange) {
                return true;
              }
              return false;
            } catch (e) {
              errorLog(e);
              return error(500);
            }
          },
          {
            body: t.Object({
              Timestamp: t.String(),
              Content: t.String(),
              UserId: t.String(),
            }),
          }
        )
  );
