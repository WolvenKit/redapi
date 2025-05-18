import type { QueryResolvers } from "./../../../types.generated";

export const Me: NonNullable<QueryResolvers['Me']> = async (
  _parent,
  _arg,
  _ctx
) => {
  return await _ctx.prisma.auth.findFirstOrThrow({
    where: {
      OR: [
        {
          DiscordId: _ctx.auth?.DiscordId,
        },
        {
          JWT: _ctx.auth?.JWT,
        },
      ],
    },
  });
};
