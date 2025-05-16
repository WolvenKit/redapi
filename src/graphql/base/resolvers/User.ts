import type { UserResolvers } from "./../../types.generated";

export const User: UserResolvers = {
  Descryption: async (_parent, _arg, _ctx) => {
    return _parent.Description;
  },
  Github: ({ Github }, _arg, _ctx) => {
    // Ensure the returned objects conform to the Github type (with Commits, Issues, Name, etc.)
    if (!Github) return null;
    const normalize = (g: any) => {
      if (typeof g === "object") {
        return {
          ...g,
          Commits: g.Commits ?? [],
          Issues: g.Issues ?? [],
          Name: g.Name ?? g.username ?? null,
        };
      }
      return {
        username: g,
        Commits: [],
        Issues: [],
        Name: g ?? null,
      };
    };
    if (Array.isArray(Github)) {
      return Github.map(normalize);
    }
    return [normalize(Github)];
  },
  GlobalName: ({ GlobalName }, _arg, _ctx) => {
    return GlobalName || "";
  },
  NexusMods: ({ NexusMods }, _arg, _ctx) => {
    if (!NexusMods) return null;
    if (Array.isArray(NexusMods)) {
      return NexusMods.filter(
        (nm) => typeof nm === "object" && nm !== null
      ).map((nm) => nm as any);
    }
    if (typeof NexusMods === "object" && NexusMods !== null) {
      return [NexusMods as any];
    }
    return null;
  },
  Roles: ({ Roles }, _arg, _ctx) => {
    if (!Roles) return null;
    if (Array.isArray(Roles)) {
      return Roles.filter((role) => typeof role === "object" && role !== null);
    }
    if (typeof Roles === "object" && Roles !== null) {
      return [Roles as any];
    }
    return null;
  },
  Username: ({ Username }, _arg, _ctx) => {
    return Username || "";
  },
};
