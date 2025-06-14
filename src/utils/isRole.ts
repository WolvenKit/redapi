import type { GraphQLContext } from "src/context";
import type { JsonValue } from "type-fest";

type Roles = {
  [key: string]: string;
};

export async function isRoles(role: string | JsonValue | undefined, _ctx: GraphQLContext["auth"]): Promise<boolean> {
  const roles = _ctx?.Roles ? (JSON.parse(_ctx!.Roles as string) as Roles) : null;

  if (!roles) return false;

  console.log(roles[role as string]);

  if (roles[role as string]) {
    return true;
  }

  return false;
}
