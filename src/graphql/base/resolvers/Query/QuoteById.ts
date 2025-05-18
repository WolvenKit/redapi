import type { QueryResolvers } from "./../../../types.generated";
export const QuoteById: NonNullable<QueryResolvers['QuoteById']> = async (
  _parent,
  _arg,
  _ctx
) => {
  return _ctx.prisma.quotes.findUnique({
    where: {
      GlobalId: _arg.id,
    },
  });
};
