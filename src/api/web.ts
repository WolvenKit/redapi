import { Elysia } from "elysia";
import { prisma, log } from "../utils";

export const web = new Elysia({ prefix: "/web" })
  .get("/", async () => {
    return await prisma.user.findMany({
      take: 10,
      orderBy: {
        GlobalId: "desc",
      },
    });
  })
  .get("/user/:userId", async ({ params }) => {
    return await prisma.user.findUnique({
      where: {
        GlobalId: Number(params.userId),
      },
    });
  })
  .get("/user/moderation/:userId", async ({ params }) => {
    const moderation = await prisma.moderation.findUnique({
      where: {
        DiscordId: params.userId,
      },
      include: { Warnings: true }, // Fetch related warnings
    });

    log(moderation);

    return moderation;
  });
