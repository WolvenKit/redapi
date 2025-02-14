import { Elysia } from "elysia";

export const profile = new Elysia({ prefix: "/profile" }).get("/", async ({jwt, set, cookie: { auth } }) => {
    const profile = await jwt.verify(auth.value);

    if (!profile) {
      set.status = 401;
      return "Unauthorized";
    }

    return `Hello ${profile.name}`;
  })
