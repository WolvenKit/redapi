import type { QueryResolvers } from "./../../../types.generated";
export const UserByJWT: NonNullable<QueryResolvers['UserByJWT']> = async (
  _parent,
  _arg,
  _ctx
) => {
  const User = await _ctx.prisma.moderation.findUnique({
    where: {
      JWT: _arg.JWT,
    },
  });

  return _ctx.prisma.user.findUnique({
    where: {
      DiscordiD: User?.DiscordId,
    },
  });
};
