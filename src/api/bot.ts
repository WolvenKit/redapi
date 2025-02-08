import { Elysia, t } from "elysia";
import { prisma } from "../utils/prisma";
import { NexusQuery, GithubQuery, log, Updater } from "../utils";

export const bot = new Elysia({ prefix: "/bot" })
  .post(
    "/",
    async ({ body }) => {
      log(body);

      const NexusMods: Record<string, any> | undefined = await NexusQuery(
        body.nexusmods
      );
      const Github: any = (await GithubQuery(body.github)) ?? undefined;

      return await prisma.user.upsert({
        where: {
          DiscordiD: body.id,
        },
        update: {
          Username: body.user,
          GlobalName: body.globalname,
          Avatar: body.image,
          Theme: body.theme,
          Style: body.namestyle,
          Description: body.description,
          GithubUsername: body.github,
          NexusMods: NexusMods,
          Github: Github,
          Roles: body.Roles,
        },
        create: {
          DiscordiD: body.id,
          Username: body.user,
          GlobalName: body.globalname,
          Avatar: body.image,
          Theme: body.theme,
          Style: body.namestyle,
          Description: body.description,
          GithubUsername: body.github,
          NexusModsUsername: body.nexusmods,
          NexusMods: NexusMods,
          Github: Github,
          Roles: body.Roles,
        },
      });
    },
    {
      body: t.Object({
        server: t.Union([t.String(), t.Null()]),
        id: t.String(),
        user: t.String(),
        globalname: t.Union([t.String(), t.Null()]),
        image: t.Union([t.String(), t.Null()]),
        nexusmods: t.Union([t.String(), t.Null()]),
        github: t.Union([t.String(), t.Null()]),
        theme: t.Union([t.String(), t.Null()]),
        description: t.Union([t.String(), t.Null()]),
        namestyle: t.Union([t.String(), t.Null()]),
        Roles: t.Array(t.String()),
      }),
    }
  )
  .post("/commands", async ({ body }) => {}, {
    body: t.Object({
      command: t.String(),
      response: t.String(),
    }),
  })
  .post(
    "/quotes",
    async ({ body }) => {
      return await prisma.quotes.create({
        data: {
          Quote: body.Quote,
          Responder: body.Responder,
        },
      });
    },
    {
      body: t.Object({
        Quote: t.String(),
        Responder: t.String(),
      }),
    }
  )
  .post(
    "/quotes/request",
    async ({ body }) => {
      const Responder = body.Responder;

      console.log(Responder || "everyone");

      const productsCount = await prisma.quotes.count();
      const skip = Math.floor(Math.random() * productsCount);
      return await prisma.quotes.findMany({
        take: 1,
        skip: skip,
        orderBy: {
          GlobalId: "asc",
        },
        where: {
          OR: [
            {
              Responder: Responder,
            },
            {
              Responder: "everyone",
            },
          ],
        },
      });
    },
    {
      body: t.Object({
        Responder: t.String(),
      }),
    }
  )
  .get("/coreversions", async () => {
    return await Updater();
  });
