import type { MutationResolvers } from "./../../../types.generated";
export const Warning: NonNullable<MutationResolvers['Warning']> = async (
  _parent,
  _arg,
  _ctx
) => {
  const Moderation = await _ctx.prisma.moderation.update({
    where: {
      DiscordId: _arg.DiscordId,
    },
    data: {
      Warnings: {
        create: {
          IssuerName: _arg.Issuer,
          Reason: _arg.Reason,
          IssuedTime: new Date(),
        },
      },
    },
    select: {
      Warnings: {
        select: {
          GlobalId: true,
          IssuerName: true,
          Reason: true,
          IssuedTime: true,
          moderationGlobalId: true,
        },
      },
    }
  });
  return Moderation.Warnings;
};
