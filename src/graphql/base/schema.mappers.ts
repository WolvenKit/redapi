import type {
  User,
  Tags,
  Moderation,
  Warning,
  Bans,
  Quotes,
  MessageComparison,
  Auth,
} from "@prisma/client";

export type UserMapper = User;
export type TagsMapper = Tags;
export type ModerationMapper = Moderation;
export type WarningMapper = Warning;
export type BansMapper = Bans;
export type QuotesMapper = Quotes;
export type MessageComparisonMapper = MessageComparison;
export type AuthMapper = Auth;
