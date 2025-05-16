import type { QueryResolvers } from "./../../../types.generated";
export const User: NonNullable<QueryResolvers['User']> = async (
  _parent,
  _arg,
  _ctx
) => {
  return _ctx.prisma.user.findMany({
    take: 10,
    skip: ((_arg.page ?? 1) - 1) * 10,
  });
};
