import type { MutationResolvers } from "./../../../types.generated";
export const Quote: NonNullable<MutationResolvers['Quote']> = async (
  _parent,
  _arg,
  _ctx
) => {
  return _ctx.prisma.quotes.create({
    data: {
      Quote: _arg.Quote,
      Responder: _arg.Responder || "everyone",
    },
  });
};
