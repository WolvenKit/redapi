import { Elysia, t } from "elysia";
import { prisma } from "../utils/prisma";
import { bearer } from "@elysiajs/bearer";
import { ValidateAuth } from "src/middleware/auth";
import { NexusQuery, GithubQuery, errorLog, client as DClient } from "../utils";
import type { GuildMember, GuildMemberRoleManager } from "discord.js";

export const Interface = new Elysia({ prefix: "/interface" })
  .use(bearer())
  .guard(
    {
      beforeHandle({ set, bearer, error, path }) {
        return ValidateAuth(set, bearer, error, path, "interface");
      },
    },
    (app) =>
      app
        .patch("/update/users", async ({ error }) => {
          try {
            const allUsers = await prisma.user.findMany();

            if (!allUsers) return error;

            allUsers.map(async (user) => {
              const DiscordUser = (await DClient.guilds.cache
                .find((guild) => {
                  return guild.id === process.env.GUILD_ID;
                })
                ?.members.fetch(user.DiscordiD)) as GuildMember;

              const Roles = DiscordUser
                ? (DiscordUser.roles as GuildMemberRoleManager).cache.map(
                    (role) => {
                      return {
                        id: role.id,
                        name: role.name,
                        position: role.position,
                        rawPosition: role.rawPosition,
                        icon: role.icon,
                        iconUrl: role.iconURL(),
                      };
                    }
                  )
                : [];

              const Github: any =
                (await GithubQuery(user.GithubUsername)) ?? undefined;

              const NexusMods: Record<string, any> | undefined =
                await NexusQuery(user.NexusModsUsername);

              await prisma.user.update({
                where: {
                  DiscordiD: user.DiscordiD,
                },
                data: {
                  Username: DiscordUser.user.username,
                  GlobalName: DiscordUser.user.globalName,
                  NexusMods: NexusMods,
                  Github: Github,
                  Roles: Roles,
                },
              });
            });

            return await prisma.user.findMany({
              orderBy: {
                GlobalId: "desc",
              },
            });
          } catch (e) {
            errorLog(e);
            return error;
          }
        })
        .post(
          "/import/users",
          async ({ body, error }) => {
            try {
              const NexusMods: Record<string, any> | undefined =
                await NexusQuery(body.NexusModsUsername);

              const Github: any =
                (await GithubQuery(body.GithubUsername)) ?? undefined;

              const DiscordUser = (await DClient.guilds.cache
                .find((guild) => {
                  return guild.id === process.env.GUILD_ID;
                })
                ?.members.fetch(body.DiscordiD)) as GuildMember;

              const Roles = DiscordUser
                ? (DiscordUser.roles as GuildMemberRoleManager).cache.map(
                    (role) => {
                      return {
                        id: role.id,
                        name: role.name,
                        position: role.position,
                        rawPosition: role.rawPosition,
                        icon: role.icon,
                        iconUrl: role.iconURL(),
                      };
                    }
                  )
                : [];

              return await prisma.user.upsert({
                where: {
                  DiscordiD: body.DiscordiD,
                },
                update: {
                  Username: DiscordUser.user.username,
                  GlobalName: DiscordUser.user.globalName,
                  Theme: body.Theme,
                  Style: body.Style,
                  Description: body.Description,
                  GithubUsername: body.GithubUsername,
                  NexusModsUsername: body.NexusModsUsername,
                  NexusMods: NexusMods,
                  Github: Github,
                  Roles: Roles,
                },
                create: {
                  Username: DiscordUser.user.username,
                  GlobalName: DiscordUser.user.globalName,
                  Theme: body.Theme,
                  Style: body.Style,
                  Description: body.Description,
                  DiscordiD: body.DiscordiD,
                  GithubUsername: body.GithubUsername,
                  NexusModsUsername: body.NexusModsUsername,
                  NexusMods: NexusMods,
                  Github: Github,
                  Roles: Roles,
                },
              });
            } catch (e) {
              errorLog(e);
              return error;
            }
          },
          {
            body: t.Object({
              Username: t.Union([t.String(), t.Null()]),
              GlobalName: t.Union([t.String(), t.Null()]),
              DiscordiD: t.String(),
              Theme: t.String(),
              Style: t.String(),
              Description: t.Union([t.String(), t.Null()]),
              GithubUsername: t.Union([t.String(), t.Null()]),
              NexusModsUsername: t.Union([t.String(), t.Null()]),
              Roles: t.Union([t.Array(t.String()), t.Null()]),
            }),
          }
        )
        .get("/quotes", async ({ error }) => {
          try {
            return await prisma.quotes.findMany({
              orderBy: {
                GlobalId: "desc",
              },
            });
          } catch (e) {
            errorLog(e);
            return error;
          }
        })
         .patch("/quotes:id", async ({ error }) => {
          try {
            return await prisma.quotes.findMany({
              orderBy: {
                GlobalId: "desc",
              },
            });
          } catch (e) {
            errorLog(e);
            return error;
          }
        })
  );
