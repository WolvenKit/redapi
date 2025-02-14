import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { bot, web, auth, moderation, sign } from "./api";
import { ping, login, profile, root } from "./pages";
import { prisma, log, errorLog } from "./utils";
import { cors } from "@elysiajs/cors";
import { join } from "path";
import { request } from "http";

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
    .use(sign)
    .use(profile)
    .use(profile)
    .use(login)
    .use(ping)
    .use(bot)
    .use(web)
    .use(auth)
    .use(moderation)
    .use(root)
    .listen({
      port: 3000,
      hostname: "localhost",
    })
    // .listen({
    //   port: 443,
    //   tls: {
    //     key: Bun.file(join(import.meta.dir, `./certs/${process.env.SSL_KEY}`)),
    //     cert: Bun.file(
    //       join(import.meta.dir, `./certs/${process.env.SSL_CERT}`)
    //     ),
    //   },
    //   hostname: process.env.HOSTNAME,
    // })
    .onRequest(({ request }) => {
      const { method, url } = request;
      log(`${method} ${url}`);
    })
    .onError(({ error }) => {
      errorLog(error);
      return "An error occurred";
    });
} catch (error) {
  errorLog(error);
}
