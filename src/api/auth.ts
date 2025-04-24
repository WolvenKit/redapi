import { Elysia, t } from "elysia";
import { errorLog, prisma } from "../utils";
import { jwt } from "@elysiajs/jwt";
import { defaultPermission, AdminPermission } from "../utils";

export const auth = new Elysia({ prefix: "/auth" }).use(
  jwt({
    name: "jwt",
    secret: process.env.JWT_SECRET!,
  }).get(
    "/redirect",
    async ({ jwt, query, cookie: { discord, auth }, redirect, error }) => {
      try {
        const Token = (await fetch("https://discord.com/api/oauth2/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            client_id: "796283112199553044",
            client_secret: process.env.DISCORD_SECRET!,
            grant_type: "authorization_code",
            code: query.code,
            redirect_uri: `${process.env.LOCAL_URL!}/auth/redirect`,
            scope: "identify guilds user email",
          }),
        }).then((data) => data.json())) as Token;

        const DiscordUser = (await fetch("https://discord.com/api/users/@me", {
          headers: {
            Authorization: `Bearer ${Token.access_token}`,
          },
        }).then((data) => data.json())) as User;

        const JWT = await jwt.sign({
          id: DiscordUser.id,
          username: DiscordUser.username,
        });

        auth.set({
          value: JWT,
          maxAge: Token.expires_in,
          path: "/",
        });

        await prisma.$transaction([
          prisma.auth.upsert({
            where: {
              DiscordId: DiscordUser.id,
            },
            update: {
              JWT: JWT,
            },
            create: {
              DiscordId: DiscordUser.id,
              JWT: JWT,
              Endpoints:
                DiscordUser.id === process.env.ADMIN_ID!
                  ? AdminPermission
                  : defaultPermission,
            },
          }),
          prisma.moderation.upsert({
            where: {
              DiscordId: DiscordUser.id,
            },
            update: {
              DiscordId: DiscordUser.id,
              JWT: auth.value,
            },
            create: {
              DiscordId: DiscordUser.id,
              JWT: auth.value,
              Resolved: true,
            },
          }),
        ]);

        discord.set({
          value: JSON.stringify(DiscordUser),
          path: "/",
          maxAge: Token.expires_in,
        });

        return redirect(process.env.REDIRECT!);
      } catch (e) {
        errorLog(e);
        return error(500);
      }
    },
    {
      query: t.Object({
        code: t.String(),
      }),
    }
  )
);
