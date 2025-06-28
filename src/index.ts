import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { log, errorLog, rateLimitConfig, swaggerConfig, CORSConfig } from "utils";
import { cors } from "@elysiajs/cors";
import { rateLimit } from "elysia-rate-limit";
import { bot, web, auth, moderation, Interface } from "api";
import { ping, profile, root } from "pages";

try {
  new Elysia()
    .use(swagger(swaggerConfig))
    .use(cors(CORSConfig))
    .use(rateLimit(rateLimitConfig))
    .use(profile)
    .use(Interface)
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
    //   port: 4443,
    //   tls: {
    //     key: Bun.file(join(import.meta.dir, `./certs/${process.env.SSL_KEY}`)),
    //     cert: Bun.file(
    //       join(import.meta.dir, `./certs/${process.env.SSL_CERT}`)
    //     ),
    //   },
    //   hostname: process.env.HOSTNAME,
    // })
    // .listen({
    //   port: 8080,
    //   hostname: process.env.HOSTNAME,
    // })
    .onRequest(({ request }) => {
      const { method, url } = request;
      log(`${method} ${url}`);
    });
} catch (error) {
  errorLog(error);
}
