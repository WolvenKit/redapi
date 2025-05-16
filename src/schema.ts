import { createSchema } from "graphql-yoga";
import { resolvers } from "./graphql/resolvers.generated";
import { typeDefs } from "./graphql/typeDefs.generated";

export const schema = createSchema({
  resolvers: [resolvers],
  typeDefs: [typeDefs],
});
