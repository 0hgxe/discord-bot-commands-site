import 'dotenv/config';
import { Client, GatewayIntentBits, Partials, Collection } from 'discord.js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

if (!process.env.BOT_TOKEN) {
  throw new Error('BOT_TOKEN is missing in .env');
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages
  ],
  partials: [Partials.Channel, Partials.Message, Partials.Reaction]
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
for (const file of fs.readdirSync(commandsPath).filter(f => f.endsWith('.js'))) {
  const command = (await import(pathToFileURL(path.join(commandsPath, file)).href)).default;
  if (command?.name) client.commands.set(command.name, command);
}

client.once('clientReady', () => {
  console.log(`Logged in as ${client.user.tag}`);
  client.user.setPresence({ activities: [{ name: 'إدارة السيرفر', type: 0 }], status: 'online' });
});

client.on('messageCreate', async message => {
  if (message.author.bot || !message.guild) return;

  const prefix = process.env.DEFAULT_PREFIX || '!';
  if (!message.content.startsWith(prefix)) return;

  const [name, ...args] = message.content.slice(prefix.length).trim().split(/\s+/);
  const command = client.commands.get(name?.toLowerCase());
  if (!command) return;

  try {
    await command.execute(message, args, client);
  } catch (error) {
    console.error(error);
    await message.reply('حدث خطأ أثناء تنفيذ الأمر.').catch(() => {});
  }
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;
  const command = client.commands.get(interaction.commandName);
  if (!command?.slash) return;

  try {
    await command.slash(interaction, client);
  } catch (error) {
    console.error(error);
    const payload = { content: 'حدث خطأ أثناء تنفيذ الأمر.', ephemeral: true };
    if (interaction.deferred || interaction.replied) await interaction.followUp(payload).catch(() => {});
    else await interaction.reply(payload).catch(() => {});
  }
});

try {
  await client.login(process.env.BOT_TOKEN);
} catch (error) {
  if (error?.code === 'TokenInvalid') {
    console.error('رمز BOT_TOKEN غير صالح. حدّثه في ملف .env من Discord Developer Portal.');
  } else {
    console.error('تعذر تسجيل دخول البوت إلى Discord:', error);
  }
  process.exitCode = 1;
}
