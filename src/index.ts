import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { bot, web, auth, moderation, admin } from "api";
import { ping, root, profile } from "pages";
import {
  prisma,
  log,
  errorLog,
  rateLimitConfig,
  swaggerConfig,
  CORSConfig,
} from "utils";
import { cors } from "@elysiajs/cors";
import { join } from "path";
import { rateLimit } from "elysia-rate-limit";

// Check if the Database if Up and running
try {
  const DBCheck: { result: number }[] =
    await prisma.$queryRaw`SELECT 1 as result`;

  if (DBCheck[0].result === 1) {
    log("Database is running");
  }

  new Elysia()
    .use(swagger(swaggerConfig))
    .use(cors(CORSConfig))
    .use(rateLimit(rateLimitConfig))
    // .use(profile)
    .use(admin)
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
    .listen({
      port: 4443,
      tls: {
        key: Bun.file(join(import.meta.dir, `./certs/${process.env.SSL_KEY}`)),
        cert: Bun.file(
          join(import.meta.dir, `./certs/${process.env.SSL_CERT}`)
        ),
      },
      hostname: process.env.HOSTNAME,
    })
    .listen({
      port: 8080,
      hostname: process.env.HOSTNAME,
    })
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
