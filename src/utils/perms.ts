export const defaultPermission = {
  web: {
    root: ["GET"],
    user: {
      userId: ["GET"],
    },
    moderation: {
      bans: ["GET"],
      kicks: ["GET"],
      userId: ["GET"],
    },
  },
};

export const AdminPermission = {
  bot: {
    root: ["GET", "POST", "DELETE"],
    commands: ["GET", "POST", "DELETE"],
    quotes: {
      root: ["GET", "POST", "DELETE"],
      request: ["GET", "POST", "DELETE"],
    },
    coreversions: ["GET", "POST", "DELETE"],
  },
  moderation: {
    bans: ["GET", "POST", "DELETE"],
    warn: ["GET", "POST", "DELETE"],
    kicks: ["GET", "POST", "DELETE"],
    drop: ["GET", "POST", "DELETE"],
    message: ["GET", "POST", "DELETE"],
  },
  web: {
    root: ["GET"],
    user: {
      userId: ["GET"],
    },
    moderation: {
      bans: ["GET"],
      kicks: ["GET"],
      userId: ["GET"],
    },
  },
  admin: {
    update: {
      users: ["GET"],
    },
    import: {
      users: ["POST"],
    }
  }
};
