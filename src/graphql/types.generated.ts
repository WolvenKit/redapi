import { GraphQLResolveInfo } from 'graphql';
import { AuthMapper, MessageComparisonMapper, UserMapper, WarningMapper } from './base/schema.mappers';
import { GraphQLContext } from '../context';
export type Maybe<T> = T | null | undefined;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string | number; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Auth = {
  __typename?: 'Auth';
  DiscordId: Scalars['String']['output'];
  JWT: Scalars['String']['output'];
};

export type EventSetter = {
  __typename?: 'EventSetter';
  ban?: Maybe<Scalars['Boolean']['output']>;
  categoryChannelCreated?: Maybe<Scalars['Boolean']['output']>;
  categoryChannelDeleted?: Maybe<Scalars['Boolean']['output']>;
  categoryChannelUpdated?: Maybe<Scalars['Boolean']['output']>;
  duplicationChecker?: Maybe<Scalars['Boolean']['output']>;
  guildJoin?: Maybe<Scalars['Boolean']['output']>;
  join?: Maybe<Scalars['Boolean']['output']>;
  kick?: Maybe<Scalars['Boolean']['output']>;
  mark?: Maybe<Scalars['Boolean']['output']>;
  messageDelete?: Maybe<Scalars['Boolean']['output']>;
  messageUpdate?: Maybe<Scalars['Boolean']['output']>;
  quickCommands?: Maybe<Scalars['Boolean']['output']>;
  quote?: Maybe<Scalars['Boolean']['output']>;
  suggenstions_handle?: Maybe<Scalars['Boolean']['output']>;
  textChannelCreate?: Maybe<Scalars['Boolean']['output']>;
  textChannelDelete?: Maybe<Scalars['Boolean']['output']>;
  textChannelUpdate?: Maybe<Scalars['Boolean']['output']>;
  threadCreate?: Maybe<Scalars['Boolean']['output']>;
  threadDelete?: Maybe<Scalars['Boolean']['output']>;
  threadUpdate?: Maybe<Scalars['Boolean']['output']>;
  userBan?: Maybe<Scalars['Boolean']['output']>;
  userCheck?: Maybe<Scalars['Boolean']['output']>;
  userJoined?: Maybe<Scalars['Boolean']['output']>;
  userRemoved?: Maybe<Scalars['Boolean']['output']>;
  userUnban?: Maybe<Scalars['Boolean']['output']>;
};

export type Github = {
  __typename?: 'Github';
  Commits: Scalars['Int']['output'];
  Issues: Scalars['Int']['output'];
  Name: Scalars['String']['output'];
};

export type InteractionSetter = {
  __typename?: 'InteractionSetter';
  Avatar?: Maybe<Scalars['Boolean']['output']>;
  Clean?: Maybe<Scalars['Boolean']['output']>;
  Clear?: Maybe<Scalars['Boolean']['output']>;
  Core?: Maybe<Scalars['Boolean']['output']>;
  Developer?: Maybe<Scalars['Boolean']['output']>;
  Discord?: Maybe<Scalars['Boolean']['output']>;
  Emoji?: Maybe<Scalars['Boolean']['output']>;
  Infos?: Maybe<Scalars['Boolean']['output']>;
  Mute?: Maybe<Scalars['Boolean']['output']>;
  Remind?: Maybe<Scalars['Boolean']['output']>;
  Repeat?: Maybe<Scalars['Boolean']['output']>;
  Sync?: Maybe<Scalars['Boolean']['output']>;
  Teams?: Maybe<Scalars['Boolean']['output']>;
  Who?: Maybe<Scalars['Boolean']['output']>;
};

export type LinkRole = {
  __typename?: 'LinkRole';
  Id: Scalars['String']['output'];
  Name: Scalars['String']['output'];
  icon?: Maybe<Scalars['String']['output']>;
  iconUrl?: Maybe<Scalars['String']['output']>;
  position: Scalars['Int']['output'];
  rawPosition: Scalars['Int']['output'];
};

export type MessageComparison = {
  __typename?: 'MessageComparison';
  Duplicate: Scalars['Boolean']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  LinkUser?: Maybe<User>;
  MessageComparison?: Maybe<Scalars['Boolean']['output']>;
  Quote?: Maybe<Quote>;
  Settings?: Maybe<SettingReturn>;
  Warning?: Maybe<Array<Maybe<Warning>>>;
};


export type MutationLinkUserArgs = {
  Description?: InputMaybe<Scalars['String']['input']>;
  DiscordId: Scalars['String']['input'];
  GithubUsername?: InputMaybe<Scalars['String']['input']>;
  Image?: InputMaybe<Scalars['String']['input']>;
  Name?: InputMaybe<UserName>;
  NameStyle?: InputMaybe<Scalars['String']['input']>;
  NexusModsUsername?: InputMaybe<Scalars['String']['input']>;
  Roles?: InputMaybe<Scalars['String']['input']>;
  Theme?: InputMaybe<Scalars['String']['input']>;
};


export type MutationMessageComparisonArgs = {
  Content: Scalars['String']['input'];
  UserId: Scalars['String']['input'];
};


export type MutationQuoteArgs = {
  Quote: Scalars['String']['input'];
  Responder: Scalars['String']['input'];
};


export type MutationSettingsArgs = {
  Event?: InputMaybe<EventSetter>;
  GuildId: Scalars['String']['input'];
  Interaction?: InputMaybe<InteractionSetter>;
  MarkedMembersChannel?: InputMaybe<Scalars['String']['input']>;
  MarkedMembersRole?: InputMaybe<Scalars['String']['input']>;
  ModerationCategory?: InputMaybe<Scalars['String']['input']>;
  ModerationLog?: InputMaybe<Scalars['String']['input']>;
  RestrictedQuotesChannels?: InputMaybe<Scalars['String']['input']>;
};


export type MutationWarningArgs = {
  DiscordId: Scalars['String']['input'];
  Issuer: Scalars['String']['input'];
  Reason?: InputMaybe<Scalars['String']['input']>;
  Username: Scalars['String']['input'];
};

export type NexusMods = {
  __typename?: 'NexusMods';
  Mods?: Maybe<Array<NexusModsMods>>;
  User?: Maybe<NexusModsUser>;
};

export type NexusModsMods = {
  __typename?: 'NexusModsMods';
  AdultContent: Scalars['Boolean']['output'];
  Downloads: Scalars['Int']['output'];
  Endorsements: Scalars['Int']['output'];
  Game: Scalars['String']['output'];
  ModCategory: Scalars['String']['output'];
  ModId: Scalars['Int']['output'];
  Name: Scalars['String']['output'];
  PictureUrl: Scalars['String']['output'];
  Status: Scalars['String']['output'];
  Summary: Scalars['String']['output'];
  Version: Scalars['String']['output'];
};

export type NexusModsUser = {
  __typename?: 'NexusModsUser';
  About: Scalars['String']['output'];
  Avatar: Scalars['String']['output'];
  Country: Scalars['String']['output'];
  Kudos: Scalars['Int']['output'];
  MemberId: Scalars['Int']['output'];
  ModCount: Scalars['Int']['output'];
  Name: Scalars['String']['output'];
  Posts: Scalars['Int']['output'];
  UniqueModDownloads: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  Info?: Maybe<Scalars['String']['output']>;
  Me: Auth;
  QuoteById?: Maybe<Quote>;
  Quotes?: Maybe<Array<Maybe<Quote>>>;
  User: Array<User>;
  UserByDiscordId?: Maybe<User>;
  UserByJWT?: Maybe<User>;
};


export type QueryQuoteByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryQuotesArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryUserArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryUserByDiscordIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryUserByJWTArgs = {
  JWT: Scalars['String']['input'];
};

export type Quote = {
  __typename?: 'Quote';
  Quote: Scalars['String']['output'];
  Responder: Scalars['String']['output'];
};

export type Register = {
  __typename?: 'Register';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  password: Scalars['String']['output'];
};

export type Roles = {
  __typename?: 'Roles';
  icon?: Maybe<Scalars['String']['output']>;
  iconUrl?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  position: Scalars['Int']['output'];
  rawPosition: Scalars['Int']['output'];
};

export type Setting = {
  __typename?: 'Setting';
  GuildId: Scalars['String']['output'];
  ModifiedSetting: Scalars['String']['output'];
  Set: Scalars['Boolean']['output'];
};

export type SettingReturn = {
  __typename?: 'SettingReturn';
  Event?: Maybe<EventSetter>;
  GuildId?: Maybe<Scalars['String']['output']>;
  Interaction?: Maybe<InteractionSetter>;
  MarkedMembersChannel?: Maybe<Scalars['String']['output']>;
  MarkedMembersRole?: Maybe<Scalars['String']['output']>;
  ModerationCategory?: Maybe<Scalars['String']['output']>;
  ModerationLog?: Maybe<Scalars['String']['output']>;
  RestrictedQuotesChannels?: Maybe<Scalars['String']['output']>;
};

export type User = {
  __typename?: 'User';
  Avatar?: Maybe<Scalars['String']['output']>;
  Descryption?: Maybe<Scalars['String']['output']>;
  DiscordiD: Scalars['String']['output'];
  Github?: Maybe<Array<Maybe<Github>>>;
  GithubUsername?: Maybe<Scalars['String']['output']>;
  GlobalId: Scalars['ID']['output'];
  GlobalName: Scalars['String']['output'];
  NexusMods?: Maybe<Array<Maybe<NexusMods>>>;
  NexusModsUsername?: Maybe<Scalars['String']['output']>;
  Roles?: Maybe<Array<Maybe<Roles>>>;
  Style?: Maybe<Scalars['String']['output']>;
  Theme?: Maybe<Scalars['String']['output']>;
  Username: Scalars['String']['output'];
};

export type UserName = {
  __typename?: 'UserName';
  GlobalName?: Maybe<Scalars['String']['output']>;
  Username?: Maybe<Scalars['String']['output']>;
};

export type Warning = {
  __typename?: 'Warning';
  DiscordId: Scalars['String']['output'];
  IssuedTime?: Maybe<Scalars['String']['output']>;
  Issuer: Scalars['String']['output'];
  Reason?: Maybe<Scalars['String']['output']>;
  Username: Scalars['String']['output'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Auth: ResolverTypeWrapper<AuthMapper>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  EventSetter: ResolverTypeWrapper<EventSetter>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Github: ResolverTypeWrapper<Github>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  InteractionSetter: ResolverTypeWrapper<InteractionSetter>;
  LinkRole: ResolverTypeWrapper<LinkRole>;
  MessageComparison: ResolverTypeWrapper<MessageComparisonMapper>;
  Mutation: ResolverTypeWrapper<{}>;
  NexusMods: ResolverTypeWrapper<NexusMods>;
  NexusModsMods: ResolverTypeWrapper<NexusModsMods>;
  NexusModsUser: ResolverTypeWrapper<NexusModsUser>;
  Query: ResolverTypeWrapper<{}>;
  Quote: ResolverTypeWrapper<Quote>;
  Register: ResolverTypeWrapper<Register>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Roles: ResolverTypeWrapper<Roles>;
  Setting: ResolverTypeWrapper<Setting>;
  SettingReturn: ResolverTypeWrapper<SettingReturn>;
  User: ResolverTypeWrapper<UserMapper>;
  UserName: ResolverTypeWrapper<UserName>;
  Warning: ResolverTypeWrapper<WarningMapper>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Auth: AuthMapper;
  String: Scalars['String']['output'];
  EventSetter: EventSetter;
  Boolean: Scalars['Boolean']['output'];
  Github: Github;
  Int: Scalars['Int']['output'];
  InteractionSetter: InteractionSetter;
  LinkRole: LinkRole;
  MessageComparison: MessageComparisonMapper;
  Mutation: {};
  NexusMods: NexusMods;
  NexusModsMods: NexusModsMods;
  NexusModsUser: NexusModsUser;
  Query: {};
  Quote: Quote;
  Register: Register;
  ID: Scalars['ID']['output'];
  Roles: Roles;
  Setting: Setting;
  SettingReturn: SettingReturn;
  User: UserMapper;
  UserName: UserName;
  Warning: WarningMapper;
};

export type AuthResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Auth'] = ResolversParentTypes['Auth']> = {
  DiscordId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  JWT?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EventSetterResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['EventSetter'] = ResolversParentTypes['EventSetter']> = {
  ban?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  categoryChannelCreated?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  categoryChannelDeleted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  categoryChannelUpdated?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  duplicationChecker?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  guildJoin?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  join?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  kick?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  mark?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  messageDelete?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  messageUpdate?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  quickCommands?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  quote?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  suggenstions_handle?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  textChannelCreate?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  textChannelDelete?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  textChannelUpdate?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  threadCreate?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  threadDelete?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  threadUpdate?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  userBan?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  userCheck?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  userJoined?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  userRemoved?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  userUnban?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GithubResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Github'] = ResolversParentTypes['Github']> = {
  Commits?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  Issues?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  Name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InteractionSetterResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['InteractionSetter'] = ResolversParentTypes['InteractionSetter']> = {
  Avatar?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  Clean?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  Clear?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  Core?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  Developer?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  Discord?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  Emoji?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  Infos?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  Mute?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  Remind?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  Repeat?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  Sync?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  Teams?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  Who?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LinkRoleResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['LinkRole'] = ResolversParentTypes['LinkRole']> = {
  Id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  Name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  icon?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  iconUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  position?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  rawPosition?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MessageComparisonResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['MessageComparison'] = ResolversParentTypes['MessageComparison']> = {
  Duplicate?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  LinkUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationLinkUserArgs, 'DiscordId'>>;
  MessageComparison?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationMessageComparisonArgs, 'Content' | 'UserId'>>;
  Quote?: Resolver<Maybe<ResolversTypes['Quote']>, ParentType, ContextType, RequireFields<MutationQuoteArgs, 'Quote' | 'Responder'>>;
  Settings?: Resolver<Maybe<ResolversTypes['SettingReturn']>, ParentType, ContextType, RequireFields<MutationSettingsArgs, 'GuildId'>>;
  Warning?: Resolver<Maybe<Array<Maybe<ResolversTypes['Warning']>>>, ParentType, ContextType, RequireFields<MutationWarningArgs, 'DiscordId' | 'Issuer' | 'Username'>>;
};

export type NexusModsResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['NexusMods'] = ResolversParentTypes['NexusMods']> = {
  Mods?: Resolver<Maybe<Array<ResolversTypes['NexusModsMods']>>, ParentType, ContextType>;
  User?: Resolver<Maybe<ResolversTypes['NexusModsUser']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NexusModsModsResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['NexusModsMods'] = ResolversParentTypes['NexusModsMods']> = {
  AdultContent?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  Downloads?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  Endorsements?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  Game?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ModCategory?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ModId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  Name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  PictureUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  Status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  Summary?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  Version?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NexusModsUserResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['NexusModsUser'] = ResolversParentTypes['NexusModsUser']> = {
  About?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  Avatar?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  Country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  Kudos?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  MemberId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  ModCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  Name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  Posts?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  UniqueModDownloads?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  Info?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  Me?: Resolver<ResolversTypes['Auth'], ParentType, ContextType>;
  QuoteById?: Resolver<Maybe<ResolversTypes['Quote']>, ParentType, ContextType, RequireFields<QueryQuoteByIdArgs, 'id'>>;
  Quotes?: Resolver<Maybe<Array<Maybe<ResolversTypes['Quote']>>>, ParentType, ContextType, Partial<QueryQuotesArgs>>;
  User?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, Partial<QueryUserArgs>>;
  UserByDiscordId?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserByDiscordIdArgs, 'id'>>;
  UserByJWT?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserByJWTArgs, 'JWT'>>;
};

export type QuoteResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Quote'] = ResolversParentTypes['Quote']> = {
  Quote?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  Responder?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RegisterResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Register'] = ResolversParentTypes['Register']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RolesResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Roles'] = ResolversParentTypes['Roles']> = {
  icon?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  iconUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  position?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  rawPosition?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SettingResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Setting'] = ResolversParentTypes['Setting']> = {
  GuildId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ModifiedSetting?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  Set?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SettingReturnResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['SettingReturn'] = ResolversParentTypes['SettingReturn']> = {
  Event?: Resolver<Maybe<ResolversTypes['EventSetter']>, ParentType, ContextType>;
  GuildId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  Interaction?: Resolver<Maybe<ResolversTypes['InteractionSetter']>, ParentType, ContextType>;
  MarkedMembersChannel?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  MarkedMembersRole?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ModerationCategory?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ModerationLog?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  RestrictedQuotesChannels?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  Avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  Descryption?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  DiscordiD?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  Github?: Resolver<Maybe<Array<Maybe<ResolversTypes['Github']>>>, ParentType, ContextType>;
  GithubUsername?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  GlobalId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  GlobalName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  NexusMods?: Resolver<Maybe<Array<Maybe<ResolversTypes['NexusMods']>>>, ParentType, ContextType>;
  NexusModsUsername?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  Roles?: Resolver<Maybe<Array<Maybe<ResolversTypes['Roles']>>>, ParentType, ContextType>;
  Style?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  Theme?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  Username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserNameResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['UserName'] = ResolversParentTypes['UserName']> = {
  GlobalName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  Username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WarningResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Warning'] = ResolversParentTypes['Warning']> = {
  DiscordId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  IssuedTime?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  Issuer?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  Reason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  Username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = GraphQLContext> = {
  Auth?: AuthResolvers<ContextType>;
  EventSetter?: EventSetterResolvers<ContextType>;
  Github?: GithubResolvers<ContextType>;
  InteractionSetter?: InteractionSetterResolvers<ContextType>;
  LinkRole?: LinkRoleResolvers<ContextType>;
  MessageComparison?: MessageComparisonResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  NexusMods?: NexusModsResolvers<ContextType>;
  NexusModsMods?: NexusModsModsResolvers<ContextType>;
  NexusModsUser?: NexusModsUserResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Quote?: QuoteResolvers<ContextType>;
  Register?: RegisterResolvers<ContextType>;
  Roles?: RolesResolvers<ContextType>;
  Setting?: SettingResolvers<ContextType>;
  SettingReturn?: SettingReturnResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserName?: UserNameResolvers<ContextType>;
  Warning?: WarningResolvers<ContextType>;
};

