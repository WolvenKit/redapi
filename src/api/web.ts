import { Elysia, t } from "elysia";
import { prisma } from "../utils";

export const web = new Elysia({ prefix: "/web" })
  .get("/", async () => {
    return await prisma.user.findMany({
      take: 10,
      orderBy: {
        GlobalId: "desc",
      },
    });
  })
  .get(
    "/user/:userId",
    async ({ params }) => {
      const User = await prisma.user.findUnique({
        where: {
          GlobalId: Number(params.userId),
        },
      });
      return User;
    },
    {
      params: t.Object({
        userId: t.String(),
      }),
    }
  )
  .get(
    "/moderation/bans",
    async ({ query }) => {
      return await prisma.bans.findMany({
        take: 10,
        skip: (query.page ? Number(query.page) : 1 - 1) * 10,
        orderBy: {
          GlobalId: "desc",
        },
      });
    },
    {
      query: t.Object({
        page: t.Optional(t.String()),
      }),
    }
  )
  .get(
    "/moderation/kicks",
    async ({ query }) => {
      return await prisma.kick.findMany({
        take: 10,
        skip: (query.page ? Number(query.page) : 1 - 1) * 10,
        orderBy: {
          GlobalId: "desc",
        },
      });
    },
    {
      query: t.Object({
        page: t.Optional(t.String()),
      }),
    }
  )
  .get(
    "/moderation/:userId",
    async ({ params, cookie: { auth }, error }) => {
      if (!auth.value) {
        return error(401);
      }

      const user = await prisma.moderation.findUnique({
        where: {
          DiscordId: params.userId,
          JWT: auth.value,
        },
        omit: {
          JWT: true,
          GlobalId: true,
        },
      });

      return user ?? error(401);
    },
    {
      params: t.Object({
        userId: t.String(),
      }),
      cookie: t.Object({
        auth: t.String(),
      }),
    }
  );
