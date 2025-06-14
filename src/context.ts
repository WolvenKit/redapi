import { PrismaClient, Auth } from "@prisma/client";
import { authenticateUser } from "./graphql/auth";
import { YogaInitialContext } from "graphql-yoga";

const prisma = new PrismaClient();

export type GraphQLContext = {
  auth: Auth | null;
  prisma: PrismaClient;
};

export async function createContext(
  initialContext: YogaInitialContext
): Promise<GraphQLContext> {
  return {
    prisma,
    auth: await authenticateUser(prisma, initialContext.request),
  };
}
