import { Client, Events, GatewayIntentBits } from "discord.js";

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildModeration],
});

client.once(Events.ClientReady, () => {
  console.log("Client is ready!");
});

client.login(process.env.DISCORD_BOT_TOKEN!).catch((err) => {
  console.error("Failed to login to Discord:", err);
});

export { client };
