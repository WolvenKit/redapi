import { Elysia, t } from "elysia";
import { log, prisma } from "../utils";
import jwt from "@elysiajs/jwt";
import { defaultPermission, AdminPermission } from "../utils";

export const auth = new Elysia({ prefix: "/auth" })
  .use(
    jwt({
      name: "jwt",
      secret: process.env.JWT_SECRET!,
    }),
  )
  .get("/login", async ({ redirect }) => {
    log("Redirecting to Discord OAuth2");
    const URL = new URLSearchParams({
      client_id: "796283112199553044",
      response_type: "code",
      redirect_uri: `${process.env.HOSTNAME_METHOD}://${process.env.HOSTNAME}${
        process.env.PORT ? ":" + process.env.PORT : ":" + 8080
      }/auth/redirect`,
      scope: "identify guilds email",
    });

    return redirect(`https://discord.com/oauth2/authorize?${URL.toString()}`);
  })
  .get(
    "/redirect",
    async ({ jwt, query, cookie: { userData, discord, auth }, redirect }) => {
      const code = query.code;

      const data = await fetch("https://discord.com/api/oauth2/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id: "796283112199553044",
          client_secret: process.env.DISCORD_SECRET!,
          grant_type: "authorization_code",
          code: code,
          redirect_uri: `${process.env.HOSTNAME_METHOD}://${
            process.env.HOSTNAME
          }${
            process.env.PORT ? ":" + process.env.PORT : ":" + 8080
          }/auth/redirect`,
          scope: "identify guilds user email",
        }),
      });

      const json: Token = await data.json();

      userData.set({
        value: JSON.stringify(json),
        path: "/",
        httpOnly: false,
        maxAge: 3600,
      });

      const user = await fetch("https://discord.com/api/users/@me", {
        headers: {
          Authorization: `Bearer ${json.access_token}`,
        },
      });

      const DiscordUser: User = await user.json();

      if (DiscordUser.id === (process.env.ADMIN_ID as string)) {
        await prisma.auth.upsert({
          where: {
            DiscordId: DiscordUser.id,
          },
          update: {},
          create: {
            DiscordId: DiscordUser.id,
            JWT: await jwt.sign({
              id: DiscordUser.id,
              username: DiscordUser.username,
              discriminator: DiscordUser.discriminator,
            }),
            Endpoints: AdminPermission,
          },
        });
      } else {
        await prisma.auth.upsert({
          where: {
            DiscordId: DiscordUser.id,
          },
          update: {},
          create: {
            DiscordId: DiscordUser.id,
            JWT: await jwt.sign({
              id: DiscordUser.id,
              username: DiscordUser.username,
              discriminator: DiscordUser.discriminator,
            }),
            Endpoints: defaultPermission,
          },
        });
      }
      auth.set({
        value: await jwt.sign({
          id: DiscordUser.id,
          username: DiscordUser.username,
        }),
        httpOnly: false,
        maxAge: 7 * 86400,
        path: process.env.INTERFACE_URL as string,
      });

      await prisma.moderation.upsert({
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
      });

      // save user data to a cookie
      discord.set({
        value: JSON.stringify(DiscordUser),
        path: "/",
        httpOnly: false,
        maxAge: 3600,
      });

      return redirect(process.env.REDIRECT as string);
    },
    {
      query: t.Object({
        code: t.String(),
      }),
    },
  );
