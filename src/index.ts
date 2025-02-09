import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { bot, web, auth, moderation } from "./api";
import { prisma, log, errorLog } from "./utils";
import { cors } from '@elysiajs/cors'

// Check if the Database if Up and running
try {
  const DBCheck: { result: number }[] =
    await prisma.$queryRaw`SELECT 1 as result`;

  if (DBCheck[0].result === 1) {
    log("Database is running");
  }

  new Elysia()
    .use(swagger())
    .use(cors())
    .get('/ping', () => {})
    .get("/login", async ({ redirect }) => {
      return redirect("/api/auth/login");
    })
    .get("/", ({ cookie: { discord, userData } }) => {

      // For testing purposes return the data from the cookies

      const discordData = JSON.parse(discord.value!);
      const user = JSON.parse(userData.value!);
      return { discordData, user };
    })
    .group(
      "/api",

      (app) => app.use(bot).use(web).use(auth).use(moderation)
    )
    .listen(3000, () => {
      log("Server is running on port 3000");
    })
    .onRequest(({ request }) => {
      const { method, url } = request;
      log(`${method} ${url}`);
    });
} catch (error) {
  // Kill the API if the Database is not running.

  errorLog("Database is not running");
  process.exit(1);
}
