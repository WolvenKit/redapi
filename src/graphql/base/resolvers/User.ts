import type {
  UserResolvers,
  NexusMods,
  Roles,
  Github,
} from "./../../types.generated";

export const User: UserResolvers = {
  Descryption: async (_parent, _arg, _ctx) => {
    return _parent.Description;
  },
  Github: ({ Github }, _arg, _ctx) => {
    if (!Github) return null;

    const isGithubObject = (gh: any): gh is Github => {
      return typeof gh === "object" && gh !== null && !Array.isArray(gh);
    };

    if (Array.isArray(Github)) {
      const filtered = Github.filter(isGithubObject);
      return filtered.length > 0 ? filtered : null;
    }
    if (isGithubObject(Github)) {
      return [Github];
    }
    return null;
  },
  GlobalName: ({ GlobalName }, _arg, _ctx) => {
    return GlobalName || "";
  },
  NexusMods: ({ NexusMods }, _arg, _ctx) => {
    if (!NexusMods) return null;

    const isNexusModsObject = (nm: any): nm is NexusMods => {
      return typeof nm === "object" && nm !== null && !Array.isArray(nm);
    };

    if (Array.isArray(NexusMods)) {
      const filtered = NexusMods.filter(isNexusModsObject);
      return filtered.length > 0 ? filtered : null;
    }
    if (isNexusModsObject(NexusMods)) {
      return [NexusMods];
    }
    return null;
  },
  Roles: ({ Roles }, _arg, _ctx) => {
    if (!Roles) return [];

    return Roles as Roles[];
  },
  Username: ({ Username }, _arg, _ctx) => {
    return Username || "";
  },
};
