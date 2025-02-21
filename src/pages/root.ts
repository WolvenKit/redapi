import { Elysia, redirect } from "elysia";

export const root = new Elysia().get("/", () => {});
