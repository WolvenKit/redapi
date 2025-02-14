import { Elysia } from "elysia";

export const root = new Elysia().get("/", () => "Hello, World!");
