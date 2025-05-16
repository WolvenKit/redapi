import { GraphQLResolveInfo } from 'graphql';
import { UserMapper } from './base/schema.mappers';
import { GraphQLContext } from '../context';
export type Maybe<T> = T | null | undefined;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string | number; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Github = {
  __typename?: 'Github';
  Commits: Scalars['Int']['output'];
  Issues: Scalars['Int']['output'];
  Name: Scalars['String']['output'];
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
  User: Array<User>;
  info?: Maybe<Scalars['String']['output']>;
};


export type QueryUserArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
};

export type Roles = {
  __typename?: 'Roles';
  icon?: Maybe<Scalars['String']['output']>;
  iconUrl?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  position: Scalars['Int']['output'];
  rawPosition: Scalars['Int']['output'];
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
  Github: ResolverTypeWrapper<Github>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  NexusMods: ResolverTypeWrapper<NexusMods>;
  NexusModsMods: ResolverTypeWrapper<NexusModsMods>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  NexusModsUser: ResolverTypeWrapper<NexusModsUser>;
  Query: ResolverTypeWrapper<{}>;
  Roles: ResolverTypeWrapper<Roles>;
  User: ResolverTypeWrapper<UserMapper>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Github: Github;
  Int: Scalars['Int']['output'];
  String: Scalars['String']['output'];
  NexusMods: NexusMods;
  NexusModsMods: NexusModsMods;
  Boolean: Scalars['Boolean']['output'];
  NexusModsUser: NexusModsUser;
  Query: {};
  Roles: Roles;
  User: UserMapper;
  ID: Scalars['ID']['output'];
};

export type GithubResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Github'] = ResolversParentTypes['Github']> = {
  Commits?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  Issues?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  Name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
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
  User?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, Partial<QueryUserArgs>>;
  info?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type RolesResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Roles'] = ResolversParentTypes['Roles']> = {
  icon?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  iconUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  position?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  rawPosition?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
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

export type Resolvers<ContextType = GraphQLContext> = {
  Github?: GithubResolvers<ContextType>;
  NexusMods?: NexusModsResolvers<ContextType>;
  NexusModsMods?: NexusModsModsResolvers<ContextType>;
  NexusModsUser?: NexusModsUserResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Roles?: RolesResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

