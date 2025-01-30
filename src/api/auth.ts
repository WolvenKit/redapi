import { Elysia, t } from "elysia";
import { prisma } from "../utils/prisma";
import { log } from "../utils";

export const auth = new Elysia({ prefix: "/auth" })
  .get("/login", async ({ redirect }) => {
    log("Redirecting to Discord OAuth2");
    return redirect(
      "https://discord.com/oauth2/authorize?client_id=796283112199553044&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fredirect&scope=identify+guilds"
    );
  })
  .get(
    "/redirect",
    async ({ query, cookie: { userData, discord }, redirect }) => {
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
          redirect_uri: "http://localhost:3000/api/auth/redirect",
          scope: "identify guilds",
        }),
      });

      const json = await data.json();

      userData.set({
        value: JSON.stringify(json),
        path: "/",
        httpOnly: true,
        maxAge: 3600,
      });

      const user = await fetch("https://discord.com/api/users/@me", {
        headers: {
          Authorization: `Bearer ${json.access_token}`,
        },
      });

      const userJson = await user.json();

      // save data to browser

      // save user data to a cookie
      discord.set({
        value: JSON.stringify(userJson),
        path: "/",
        httpOnly: true,
        maxAge: 3600,
      });

      return redirect("/");
    },
    {
      query: t.Object({
        code: t.String(),
      }),
    }
  );
