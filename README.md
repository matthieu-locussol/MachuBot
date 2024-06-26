# MachuBot [![Deploy](https://github.com/matthieu-locussol/MachuBot/actions/workflows/ci.yml/badge.svg)](https://github.com/matthieu-locussol/MachuBot/actions/workflows/ci.yml)

MachuBot is an open-source and modular discord bot written in TypeScript.

## Getting started

1. Clone the repository

   ```bash
   git clone https://github.com/matthieu-locussol/MachuBot.git
   ```

2. Install dependencies

   ```bash
   pnpm install
   ```

**Set up your environment variables**

Create a `.env` file at the root of the repository based on the sample file `.env.sample`. See the
instructions below to learn more about the environment variables and their purpose.

## Environment variables

| Variable                       | Description                                                                         |
| ------------------------------ | ----------------------------------------------------------------------------------- |
| DISCORD_CLIENT_ID_DEVELOPMENT  | Your development bot application ID                                                 |
| DISCORD_CLIENT_ID_PRODUCTION   | Your production bot application ID                                                  |
| DISCORD_TOKEN_DEVELOPMENT      | Your development bot secret token                                                   |
| DISCORD_TOKEN_PRODUCTION       | Your production bot secret token                                                    |
| DISCORD_DEVELOPMENT_SERVER_ID  | The discord server ID on which you invited your development bot for testing         |
| DISCORD_DEVELOPMENT_CHANNEL_ID | The discord channel ID on which the development bot has exclusive access for musics |
| DISCORD_EMOJIS_SERVER_ID       | The discord server ID on which you store custom emojis                              |
| OSU_OAUTH_CLIENT_ID            | Your Osu! application OAuth ID                                                      |
| OSU_OAUTH_CLIENT_SECRET        | Your Osu! application OAuth secret                                                  |

Depending on if you want to setup a development and/or a production bot, refer to the variable names
to know if you need these. For example, if you want to setup a development bot locally, you at least
need to fill the variables whose name include `DEVELOPMENT` as well as common variables (whose name
does not include `DEVELOPMENT` nor `PRODUCTION`) such as `DISCORD_EMOJIS_SERVER_ID`.

### Emojis server

**Why do I need an emojis server?**

MachuBot is using plenty of emojis inside rich embeds and components like buttons, select or context
menus. In order to use these emojis, the bot needs to have access to a discord server that
registered these emojis. It can be on your real, main discord server ; or you can decide to create a
server whose only purpose will be to store these emojis.

**How do I register emojis on my emojis server?**

Once you decided which server should be your emojis server, register every emojis (located under the
`/assets` directory) in your server parameters under the "Emoji" tab. You can then upload emojis and
drag-n-drop all the directory content and you're done! Don't forget to set your emojis server ID
(right-click on the server > Copy server ID) in the `.env` file and you will be done.

### Osu! module

**Do I need the Osu! module?**

No. If you'd like not to have the Osu! module enabled, you can just edit the `main.ts` file and
remove the `osuModule` from the `modules` array. In that case, you will not need to provide the
environment variables `OSU_OAUTH_CLIENT_ID` and `OSU_OAUTH_CLIENT_SECRET`.

## Invitations links

[Invite production bot](https://discord.com/api/oauth2/authorize?client_id=896388427040313386&permissions=8&scope=bot%20applications.commands)

[Invite development bot](https://discord.com/api/oauth2/authorize?client_id=904661905711456276&permissions=8&scope=bot%20applications.commands)
