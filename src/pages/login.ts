import { Elysia, t } from "elysia";

export const login = new Elysia({ prefix: "/login" }).get(
  "/",
  async ({ redirect }) => {
    return redirect("/auth/login");
  }
);
