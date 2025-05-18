/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
    import type   { Resolvers } from './types.generated';
    import    { Info as Query_Info } from './base/resolvers/Query/Info';
import    { Me as Query_Me } from './base/resolvers/Query/Me';
import    { QuoteById as Query_QuoteById } from './base/resolvers/Query/QuoteById';
import    { Quotes as Query_Quotes } from './base/resolvers/Query/Quotes';
import    { User as Query_User } from './base/resolvers/Query/User';
import    { UserByDiscordId as Query_UserByDiscordId } from './base/resolvers/Query/UserByDiscordId';
import    { UserByJWT as Query_UserByJWT } from './base/resolvers/Query/UserByJWT';
import    { LinkUser as Mutation_LinkUser } from './base/resolvers/Mutation/LinkUser';
import    { MessageComparison as Mutation_MessageComparison } from './base/resolvers/Mutation/MessageComparison';
import    { Quote as Mutation_Quote } from './base/resolvers/Mutation/Quote';
import    { Settings as Mutation_Settings } from './base/resolvers/Mutation/Settings';
import    { Warning as Mutation_Warning } from './base/resolvers/Mutation/Warning';
import    { Auth } from './base/resolvers/Auth';
import    { MessageComparison } from './base/resolvers/MessageComparison';
import    { User } from './base/resolvers/User';
import    { Warning } from './base/resolvers/Warning';
    export const resolvers: Resolvers = {
      Query: { Info: Query_Info,Me: Query_Me,QuoteById: Query_QuoteById,Quotes: Query_Quotes,User: Query_User,UserByDiscordId: Query_UserByDiscordId,UserByJWT: Query_UserByJWT },
      Mutation: { LinkUser: Mutation_LinkUser,MessageComparison: Mutation_MessageComparison,Quote: Mutation_Quote,Settings: Mutation_Settings,Warning: Mutation_Warning },
      
      Auth: Auth,
MessageComparison: MessageComparison,
User: User,
Warning: Warning
    }