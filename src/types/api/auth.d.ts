type User = {
  id: string;
  username: number;
  discriminator: string;
  global_name: number?;
  avatar: string?;
  bot?: boolean;
  mfa_enabled?: boolean;
  banner?: string?;
  accent_color?: number?;
  locale?: string;
  verified?: boolean;
  email?: string;
  flags?: number;
  premium_type?: number;
  public_flags?: number;
};

type Token = {
  token_type: string;
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
};
