/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
    import type   { Resolvers } from './types.generated';
    import    { User as Query_User } from './base/resolvers/Query/User';
import    { info as Query_info } from './base/resolvers/Query/info';
import    { User } from './base/resolvers/User';
    export const resolvers: Resolvers = {
      Query: { User: Query_User,info: Query_info },
      
      
      User: User
    }