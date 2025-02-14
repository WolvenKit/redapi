import { Elysia } from "elysia";

export const ping = new Elysia({ prefix: "/ping" }).get("/", () => {});
