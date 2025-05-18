import type { MutationResolvers } from "./../../../types.generated";
export const Settings: NonNullable<MutationResolvers['Settings']> = async (
  _parent,
  _arg,
  _ctx
) => {
  const {
    GuildId,
    Event,
    Interaction,
    RestrictedQuotesChannels,
    MarkedMembersChannel,
    MarkedMembersRole,
    ModerationCategory,
    ModerationLog,
  } = _arg;

  const oldSetting = await _ctx.prisma.settings.findUnique({
    where: {
      GuildId,
    },
  });

  const [InteractionSettings, EventSettings] = await _ctx.prisma.$transaction([
    _ctx.prisma.interactionSettings.findUnique({
      where: {
        Id: oldSetting?.interactionSettingsId!,
      },
    }),
    _ctx.prisma.eventSettings.findUnique({
      where: {
        Id: oldSetting?.eventSettingsId!,
      },
    }),
  ]);

  const Setting = await _ctx.prisma.settings.upsert({
    where: {
      GuildId,
    },
    update: {
      RestrictedQuotesChannels: JSON.parse(RestrictedQuotesChannels as string),
      MarkedMembersChannel: MarkedMembersChannel,
      ModerationCategory: ModerationCategory,
      ModerationLog: ModerationLog,
      MarkedMembersRole: MarkedMembersRole,
      EventSettings: {
        upsert: {
          update: {
            ban: Event?.ban ?? EventSettings?.ban ?? false,
            categoryChannelCreated:
              Event?.categoryChannelCreated ??
              EventSettings?.categoryChannelCreated ??
              false,
            categoryChannelDeleted:
              Event?.categoryChannelDeleted ??
              EventSettings?.categoryChannelDeleted ??
              false,
            categoryChannelUpdated:
              Event?.categoryChannelUpdated ??
              EventSettings?.categoryChannelDeleted ??
              false,
            duplicationChecker:
              Event?.duplicationChecker ??
              EventSettings?.categoryChannelDeleted ??
              false,
            guildJoin:
              Event?.guildJoin ??
              EventSettings?.categoryChannelDeleted ??
              false,
            join: Event?.join ?? EventSettings?.categoryChannelDeleted ?? false,
            kick: Event?.kick ?? EventSettings?.categoryChannelDeleted ?? false,
            mark: Event?.mark ?? EventSettings?.categoryChannelDeleted ?? false,
            messageDelete:
              Event?.messageDelete ??
              EventSettings?.categoryChannelDeleted ??
              false,
            messageUpdate:
              Event?.messageUpdate ??
              EventSettings?.categoryChannelDeleted ??
              false,
            quickCommands:
              Event?.quickCommands ??
              EventSettings?.categoryChannelDeleted ??
              false,
            quote:
              Event?.quote ?? EventSettings?.categoryChannelDeleted ?? false,
            suggenstions_handle:
              Event?.suggenstions_handle ??
              EventSettings?.categoryChannelDeleted ??
              false,
            textChannelCreate:
              Event?.textChannelCreate ??
              EventSettings?.categoryChannelDeleted ??
              false,
            textChannelDelete:
              Event?.textChannelDelete ??
              EventSettings?.categoryChannelDeleted ??
              false,
            textChannelUpdate:
              Event?.textChannelUpdate ??
              EventSettings?.categoryChannelDeleted ??
              false,
            threadCreate:
              Event?.threadCreate ??
              EventSettings?.categoryChannelDeleted ??
              false,
            threadDelete:
              Event?.threadDelete ??
              EventSettings?.categoryChannelDeleted ??
              false,
            threadUpdate:
              Event?.threadUpdate ??
              EventSettings?.categoryChannelDeleted ??
              false,
            userBan:
              Event?.userBan ?? EventSettings?.categoryChannelDeleted ?? false,
            userCheck:
              Event?.userCheck ??
              EventSettings?.categoryChannelDeleted ??
              false,
            userJoined:
              Event?.userJoined ??
              EventSettings?.categoryChannelDeleted ??
              false,
            userRemoved:
              Event?.userRemoved ??
              EventSettings?.categoryChannelDeleted ??
              false,
            userUnban:
              Event?.userUnban ??
              EventSettings?.categoryChannelDeleted ??
              false,
          },
          create: {
            ban: Event?.ban ?? false,
            categoryChannelCreated: Event?.categoryChannelCreated ?? false,
            categoryChannelDeleted: Event?.categoryChannelDeleted ?? false,
            categoryChannelUpdated: Event?.categoryChannelUpdated ?? false,
            duplicationChecker: Event?.duplicationChecker ?? false,
            guildJoin: Event?.guildJoin ?? false,
            join: Event?.join ?? false,
            kick: Event?.kick ?? false,
            mark: Event?.mark ?? false,
            messageDelete: Event?.messageDelete ?? false,
            messageUpdate: Event?.messageUpdate ?? false,
            quickCommands: Event?.quickCommands ?? false,
            quote: Event?.quote ?? false,
            suggenstions_handle: Event?.suggenstions_handle ?? false,
            textChannelCreate: Event?.textChannelCreate ?? false,
            textChannelDelete: Event?.textChannelDelete ?? false,
            textChannelUpdate: Event?.textChannelUpdate ?? false,
            threadCreate: Event?.threadCreate ?? false,
            threadDelete: Event?.threadDelete ?? false,
            threadUpdate: Event?.threadUpdate ?? false,
            userBan: Event?.userBan ?? false,
            userCheck: Event?.userCheck ?? false,
            userJoined: Event?.userJoined ?? false,
            userRemoved: Event?.userRemoved ?? false,
            userUnban: Event?.userUnban ?? false,
          },
        },
      },
      InteractionSettings: {
        upsert: {
          update: {
            Avatar: Interaction?.Avatar ?? InteractionSettings?.Avatar ?? false,
            Clean: Interaction?.Clean ?? InteractionSettings?.Clean ?? false,
            Clear: Interaction?.Clear ?? InteractionSettings?.Clean ?? false,
            Core: Interaction?.Core ?? InteractionSettings?.Clean ?? false,
            Developer:
              Interaction?.Developer ?? InteractionSettings?.Clean ?? false,
            Discord:
              Interaction?.Discord ?? InteractionSettings?.Clean ?? false,
            Emoji: Interaction?.Emoji ?? InteractionSettings?.Clean ?? false,
            Infos: Interaction?.Infos ?? false,
            Mute: Interaction?.Mute ?? InteractionSettings?.Clean ?? false,
            Remind: Interaction?.Remind ?? InteractionSettings?.Clean ?? false,
            Repeat: Interaction?.Repeat ?? InteractionSettings?.Clean ?? false,
            Sync: Interaction?.Sync ?? InteractionSettings?.Clean ?? false,
            Teams: Interaction?.Teams ?? InteractionSettings?.Clean ?? false,
            Who: Interaction?.Who ?? InteractionSettings?.Clean ?? false,
          },
          create: {
            Avatar: Interaction?.Avatar ?? false,
            Clean: Interaction?.Clean ?? false,
            Clear: Interaction?.Clear ?? false,
            Core: Interaction?.Core ?? false,
            Developer: Interaction?.Developer ?? false,
            Discord: Interaction?.Discord ?? false,
            Emoji: Interaction?.Emoji ?? false,
            Infos: Interaction?.Infos ?? false,
            Mute: Interaction?.Mute ?? false,
            Remind: Interaction?.Remind ?? false,
            Repeat: Interaction?.Repeat ?? false,
            Sync: Interaction?.Sync ?? false,
            Teams: Interaction?.Teams ?? false,
            Who: Interaction?.Who ?? false,
          },
        },
      },
    },
    create: {
      GuildId: GuildId,
      RestrictedQuotesChannels: JSON.parse(RestrictedQuotesChannels as string),
      MarkedMembersChannel: MarkedMembersChannel,
      ModerationCategory: ModerationCategory,
      ModerationLog: ModerationLog,
      MarkedMembersRole: MarkedMembersRole,
      EventSettings: {
        create: {
          ban: Event?.ban ?? false,
          categoryChannelCreated: Event?.categoryChannelCreated ?? false,
          categoryChannelDeleted: Event?.categoryChannelDeleted ?? false,
          categoryChannelUpdated: Event?.categoryChannelUpdated ?? false,
          duplicationChecker: Event?.duplicationChecker ?? false,
          guildJoin: Event?.guildJoin ?? false,
          join: Event?.join ?? false,
          kick: Event?.kick ?? false,
          mark: Event?.mark ?? false,
          messageDelete: Event?.messageDelete ?? false,
          messageUpdate: Event?.messageUpdate ?? false,
          quickCommands: Event?.quickCommands ?? false,
          quote: Event?.quote ?? false,
          suggenstions_handle: Event?.suggenstions_handle ?? false,
          textChannelCreate: Event?.textChannelCreate ?? false,
          textChannelDelete: Event?.textChannelDelete ?? false,
          textChannelUpdate: Event?.textChannelUpdate ?? false,
          threadCreate: Event?.threadCreate ?? false,
          threadDelete: Event?.threadDelete ?? false,
          threadUpdate: Event?.threadUpdate ?? false,
          userBan: Event?.userBan ?? false,
          userCheck: Event?.userCheck ?? false,
          userJoined: Event?.userJoined ?? false,
          userRemoved: Event?.userRemoved ?? false,
          userUnban: Event?.userUnban ?? false,
        },
      },
      InteractionSettings: {
        create: {
          Avatar: Interaction?.Avatar ?? false,
          Clean: Interaction?.Clean ?? false,
          Clear: Interaction?.Clear ?? false,
          Core: Interaction?.Core ?? false,
          Developer: Interaction?.Developer ?? false,
          Discord: Interaction?.Discord ?? false,
          Emoji: Interaction?.Emoji ?? false,
          Infos: Interaction?.Infos ?? false,
          Mute: Interaction?.Mute ?? false,
          Remind: Interaction?.Remind ?? false,
          Repeat: Interaction?.Repeat ?? false,
          Sync: Interaction?.Sync ?? false,
          Teams: Interaction?.Teams ?? false,
          Who: Interaction?.Who ?? false,
        },
      },
    },
  });

  return {
    ...Setting,
    RestrictedQuotesChannels: JSON.stringify(Setting.RestrictedQuotesChannels),
  };
};
