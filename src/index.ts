import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { bot, web, auth, moderation, Interface } from "api";
import { ping, root } from "pages";
import { prisma, log, errorLog, swaggerConfig, CORSConfig } from "utils";
import { cors } from "@elysiajs/cors";
import { yoga } from "@elysiajs/graphql-yoga";
import { schema, createContext } from "./graphql";

try {
  await prisma.$connect();
  log("Database is connected");
} catch (error) {
  errorLog("Database is not connected");
  process.exit(1);
}

try {
  new Elysia()
    .use(
      yoga({
        // @ts-ignore
        schema,
        context: createContext,
      })
    )
    .use(swagger(swaggerConfig))
    .use(cors(CORSConfig))
    .use(Interface)
    .use(ping)
    .use(bot)
    .use(web)
    .use(auth)
    .use(moderation)
    .use(root)
    .listen({
      port: 8080,
      hostname: "localhost",
    })
    .onRequest(({ request }) => {
      const { method, url } = request;
      log(`${method} ${url}`);
    });
} catch (error) {
  errorLog(error);
}
