import { PrismaClient, Auth } from "@prisma/client";
import { verify, JwtPayload } from "jsonwebtoken";
import type { JsonValue } from "type-fest";

export async function authenticateUser(
  prisma: PrismaClient,
  request: Request
): Promise<Auth | null> {
  const header = request.headers.get("authorization");

  if (header !== null) {
    const token = header.split(" ")[1];

    const tokenPayload = verify(token, process.env.JWT_SECRET!) as JwtPayload;

    const user = tokenPayload.id;

    return await prisma.auth.findFirstOrThrow({ where: { DiscordId: user } });
  }
  return null;
}
