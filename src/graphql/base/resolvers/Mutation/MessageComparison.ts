import type { MutationResolvers } from "./../../../types.generated";
export const MessageComparison: NonNullable<MutationResolvers['MessageComparison']> = async (_parent, _arg, _ctx) => {
  await _ctx.prisma.messageComparison.upsert({
    where: {
      UserId: _arg.UserId,
    },
    update: {
      UserId: _arg.UserId,
      LastMessageHash: (
        await _ctx.prisma.messageComparison.findFirst({
          where: {
            UserId: _arg.UserId,
          },
          select: {
            CurrentMessageHash: true,
          },
        })
      )?.CurrentMessageHash,
      CurrentMessageHash: _arg.Content,
      TimestampLastMessage: (
        await _ctx.prisma.messageComparison.findFirst({
          where: {
            UserId: _arg.UserId,
          },
          select: {
            TimestampCurrentMessage: true,
          },
        })
      )?.TimestampCurrentMessage,
      TimestampCurrentMessage: new Date().toISOString(),
    },
    create: {
      UserId: _arg.UserId,
      CurrentMessageHash: _arg.Content,
      TimestampCurrentMessage: new Date().toISOString(),
    },
  });

  const message = await _ctx.prisma.messageComparison.findUnique({
    where: {
      UserId: _arg.UserId,
    },
  });

  const lastMessageHash = message?.LastMessageHash;
  const currentMessageHash = message?.CurrentMessageHash;
  const timestampLastMessage = message?.TimestampLastMessage;
  const timestampCurrentMessage = message?.TimestampCurrentMessage;

  const TimeRangeInMinutes = 5;
  const isSameMessage = lastMessageHash === currentMessageHash;

  const isTimeRange =
    Math.abs(
      new Date(timestampCurrentMessage ?? 0).getTime() -
        new Date(timestampLastMessage ?? 0).getTime()
    ) <
    TimeRangeInMinutes * 60 * 1000;

  if (isSameMessage && isTimeRange) {
    return true;
  }
  return false;
};
