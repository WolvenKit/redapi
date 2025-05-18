import type { WarningResolvers } from "./../../types.generated";

export const Warning: WarningResolvers = {
  DiscordId: async (_parent, _arg, _ctx) => {
    return String(_parent.GlobalId!);
  },
  IssuedTime: ({ IssuedTime }, _arg, _ctx) => {
    return IssuedTime ? IssuedTime.toISOString() : null;
  },
  Issuer: async (_parent, _arg, _ctx) => {
    return _parent.IssuerName;
  },
  Username: async (_parent, _arg, _ctx) => {
    return _parent.IssuerName ?? "";
  },
};
