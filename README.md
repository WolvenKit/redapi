# API for the REDmodding Community

This API backend provides database storage using PostgreSQL and access to 
Discord API. It is currently used by the bot [lizzyfuzzy] and the website 
[redmodding.org].

[lizzyfuzzy]: https://github.com/WolvenKit/lizzyfuzzy
[redmodding.org]: https://redmodding.org/

# Setup

## Requirements

- [bun] v1.2+
- [postgresql] v17.5+

[bun]: https://bun.sh/
[postgresql]: https://www.postgresql.org/

## Configuration

You must follow the instructions below if you wish to run and develop this 
project locally.

### GitHub

1. Create a [new GitHub App] for local development:
- Name: `<whatever>`
- Homepage URL: `http://localhost:4000`
- Callback URL: `http://localhost:3000`
- Webhook Active: `uncheck`
- Where can this GitHub App be installed? `Only on this account`
2. Write down `App ID` somewhere.
3. Click on `generate a private key` in the notification. Generate a new 
   private key and save the file in `src/token/github/[filename].pem` (create 
   missing directories).
4. In the left panel, go to `Install App`. Click `Install` for your account. 
   After the application is installed, write down the last segment of the URL.
   It will be used as the GitHub installation ID.

> [!CAUTION]
> **DO NOT** commit the private key file `src/token/github/[filename].pem`.

[new GitHub App]: https://github.com/settings/apps/new

### Discord

1. Go to https://discord.com/developers/applications/
2. Create a `new application`
3. Define a name (e.g. `cp2077-lizzy-dev`)
4. Go to `Settings` > `Bot`
5. Enable the following options under `Privileged Gateway Intents`:
- PRESENCE INTENT
- SERVER MEMBERS INTENT
- MESSAGE CONTENT INTENT
6. Go to `Settings` > `OAuth2`, under `OAuth2 URL Generator` enable option `bot`.
7. Copy `GENERATED URL` at the bottom, open it with your browser. You'll be 
   redirected to Discord application (or webapp), you can then allow/install 
   the bot on a custom server of yours.
8. Click on `Reset Token` to generate a new token, and write it down.

### Database

In PostgreSQL, create a new `user` with a `password`. Create a new database 
named `redapi_dev` using the user created previously.

### Environment

1. Copy `.env_default` to `.env`
2. Define the following fields with values previously generated:
- `postgresql://[user]:[password]@localhost:5432/redapi_dev?schema=public`
- `GITHUB_APP_ID=[App ID]`
- `GITHUB_APP_KEY_FILE=[filename].pem`
- `GITHUB_INSTALLATION_ID=[last URL segment]`
- `JWT_SECRET=[generate yourself/use dummy key]`
- `DISCORD_TOKEN=[token]`

> ![TIP]
> `.env` file is defined in `.gitignore`. 

## Installation

1. Clone this repository:
```shell
git clone https://github.com/WolvenKit/redapi.git
```
2. Install dependencies:
```shell
bun install
```
3. Run the project locally:
```shell
bun dev
```
