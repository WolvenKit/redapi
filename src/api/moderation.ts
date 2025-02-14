import { Elysia, t } from "elysia";
import { prisma } from "../utils/prisma";
import { log } from "../utils";
import { bearer } from "@elysiajs/bearer";

function calculateWarningLevel(warningCount: number): number {
  return Math.min(100, 10 * Math.pow(1.5, warningCount));
}

export const moderation = new Elysia({ prefix: "/moderation" })
  .use(bearer())
  .guard(
    {
      beforeHandle({ set, bearer }) {
        if (bearer !== process.env.BOT_TOKEN) {
          set.status = 401;
          return "Unauthorized";
        }
      },
    },
    (app) =>
      app
        .post(
          "/ban",
          async ({ body }) => {
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

            log(newmoderation, bans);

            return [body, newWarningLevel];
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
          async ({ body }) => {
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

            log(newModeration);

            return [body, newWarningLevel];
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
          async ({ body }) => {
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

            console.log(moderation);

            // Count previous warnings
            const previousWarnings = moderation?.WarningCount ?? 0;
            const updatedWarnings = previousWarnings + 1;

            // Calculate new warning level
            const newWarningLevel = calculateWarningLevel(updatedWarnings);

            console.log(newWarningLevel);

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
          async ({ body }) => {
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
          },
          {
            body: t.Object({
              DiscordId: t.String(),
            }),
          }
        )
  );
