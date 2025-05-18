import type { QueryResolvers } from "./../../../types.generated";
export const UserByDiscordId: NonNullable<QueryResolvers['UserByDiscordId']> = async (_parent, _arg, _ctx) => {
  return _ctx.prisma.user.findUnique({
    where: {
      DiscordiD: _arg.id,
    },
  });
};
