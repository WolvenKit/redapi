import type { QueryResolvers } from "./../../../types.generated";
export const Quotes: NonNullable<QueryResolvers['Quotes']> = async (
  _parent,
  _arg,
  _ctx
) => {
  return _ctx.prisma.quotes.findMany({
    skip: _arg.page! * 10 - 1 || 0,
  });
};
