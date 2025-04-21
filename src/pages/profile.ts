import { Elysia, redirect } from "elysia";
import jwt from "@elysiajs/jwt";
import { prisma } from "../utils/prisma";

export const profile = new Elysia({ prefix: "/profile" })
  .use(jwt({ secret: process.env.JWT_SECRET! }))
  .get("/", async ({ set, cookie: { auth, discord }, jwt, redirect }) => {
    if (!auth.value || !discord.value) {
      return redirect("/sign");
    }

    const authValue = await jwt.verify(auth.value);

    if (!authValue) {
      return redirect("/");
    }

    const User = JSON.parse(discord.value!);

    const JWT = await prisma.auth.findUnique({
      where: {
        DiscordId: User.id,
      },
    });

    return `Hello ${User.username}\n\nYour api key is:\n${JWT?.JWT}`;
  });
