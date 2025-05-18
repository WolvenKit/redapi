import type { MutationResolvers } from "./../../../types.generated";
import type { JsonValue } from "type-fest";

export const LinkUser: NonNullable<MutationResolvers['LinkUser']> = async (
  _parent,
  _arg,
  _ctx
) => {
  const {
    DiscordId,
    Name,
    Image,
    NexusModsUsername,
    GithubUsername,
    Theme,
    Description,
    NameStyle,
    Roles,
  } = _arg;

  return _ctx.prisma.user.create({
    data: {
      DiscordiD: DiscordId,
      Username: Name?.Username || "",
      GlobalName: Name?.GlobalName || "",
      Avatar: Image || "",
      Theme: Theme || "default",
      Style: NameStyle || "uppercase",
      Description: Description || "",
      NexusModsUsername: NexusModsUsername || "",
      GithubUsername: GithubUsername || "",
      Roles: JSON.parse(Roles as string) || [],
    },
  });
};
