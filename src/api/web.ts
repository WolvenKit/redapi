import { Elysia } from "elysia";
import { prisma } from "../utils/prisma";

export const web = new Elysia({ prefix: "/web" })
  .get("/",  async () => {
    return await prisma.user.findMany({
      take: 10,
      orderBy: {
        GlobalId: "desc"
      }
    })
  })
  .get("/user/:userId", async ({params}) => {
    return await prisma.user.findUnique({
      where: {
        GlobalId: Number(params.userId)
      },
    });
  })
