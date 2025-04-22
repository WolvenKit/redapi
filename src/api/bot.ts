import { Elysia, t } from "elysia";
import { prisma } from "../utils/prisma";
import { NexusQuery, GithubQuery, log, Updater } from "../utils";
import bearer from "@elysiajs/bearer";
import { ValidateAuth } from "src/middleware/auth";

export const bot = new Elysia({ prefix: "/bot" }).use(bearer()).guard(
  {
    beforeHandle({ set, bearer, error, path }) {
      return ValidateAuth(set, bearer, error, path, "bot");
    },
  },
  (app) =>
    app
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
      .get(
        "/quotes/request",
        async ({ query }) => {
          const User = query.user;

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
                  Responder: User,
                },
                {
                  Responder: "everyone",
                },
              ],
            },
          });
        },
        {
          query: t.Object({
            user: t.String(),
          }),
        }
      )
      .get("/coreversions", async () => {
        return await Updater();
      })
      .get(
        "/quotes",
        async ({ query }) => {
          const quote =  await prisma.quotes.findUnique({
            where: {
              GlobalId: query.quoteId,
            },
          });

          return quote
        },
        {
          query: t.Object({
            quoteId: t.Number(),
          }),
        }
      )
);
