import { prisma } from "../utils/prisma";

export async function ValidateAuth(
  set: any,
  bearer: string,
  error: any,
  path: string,
  realm: string
) {
  if (!bearer) {
    set.headers[
      "WWW-Authenticate"
    ] = `Bearer realm='${realm}', error="invalid_request"`;

    return error(400, "Unauthorized");
  }

  const User = await prisma.auth.findUnique({
    where: {
      JWT: bearer,
    },
  });

  if (!User) {
    set.headers[
      "WWW-Authenticate"
    ] = `Bearer realm='${realm}', error="invalid_request"`;
    return error(400, "Unauthorized");
  }

  const { JWT, Endpoints } = User;

  if (!Endpoints || typeof Endpoints !== "object") {
    return error(400, "Invalid Endpoints");
  }

  const [endpoint, method] = path.split("/").slice(1);
  const endpointMethod = (Endpoints as Record<string, any>)[endpoint]?.[method];

  if (!endpointMethod) {
    return error(403, "Forbidden");
  }
}
