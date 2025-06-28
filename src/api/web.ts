import { Elysia, t } from "elysia";
import { prisma } from "../utils";
import { errorLog } from "../utils";

export const web = new Elysia({ prefix: "/web" })
  .get("/", async ({ status }) => {
    try {
      return await prisma.user.findMany({
        orderBy: {
          GlobalId: "desc",
        },
      });
    } catch (e) {
      errorLog(e);
      return status(500);
    }
  })
  .get(
    "/user/:userId",
    async ({ params, status }) => {
      try {
        const User = await prisma.user.findUnique({
          where: {
            GlobalId: Number(params.userId),
          },
        });
        return User;
      } catch (e) {
        errorLog(e);
        return status(500);
      }
    },
    {
      params: t.Object({
        userId: t.String(),
      }),
    }
  )
  .get(
    "/moderation/bans",
    async ({ query, status }) => {
      try {
        return await prisma.bans.findMany({
          take: 10,
          skip: (query.page ? Number(query.page) : 1 - 1) * 10,
          orderBy: {
            GlobalId: "desc",
          },
        });
      } catch (e) {
        errorLog(e);
        return status(500);
      }
    },
    {
      query: t.Object({
        page: t.Optional(t.String()),
      }),
    }
  )
  .get(
    "/moderation/kicks",
    async ({ query, status }) => {
      try {
        return await prisma.kick.findMany({
          take: 10,
          skip: (query.page ? Number(query.page) : 1 - 1) * 10,
          orderBy: {
            GlobalId: "desc",
          },
        });
      } catch (e) {
        errorLog(e);
        return status(500);
      }
    },
    {
      query: t.Object({
        page: t.Optional(t.String()),
      }),
    }
  )
  .get(
    "/moderation/:userId",
    async ({ params, cookie: { auth }, status }) => {
      try {
        if (!auth.value) {
          return status(401);
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

        return user ?? status(401);
      } catch (e) {
        errorLog(e);
        return status(500);
      }
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
