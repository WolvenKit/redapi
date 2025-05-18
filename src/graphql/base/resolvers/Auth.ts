import type { AuthResolvers } from "./../../types.generated";
export const Auth: AuthResolvers = {
  DiscordId: ({ DiscordId }, _arg, _ctx) => {
    return DiscordId ?? "";
  },
  JWT: ({ JWT }, _arg, _ctx) => {
    return JWT ?? "";
  },
};
