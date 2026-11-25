import 'dotenv/config';
import { REST, Routes, SlashCommandBuilder } from 'discord.js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const commands = [];

for (const file of fs.readdirSync(path.join(__dirname, 'commands')).filter(f => f.endsWith('.js'))) {
  const command = (await import(pathToFileURL(path.join(__dirname, 'commands', file)).href)).default;
  if (command?.slash) commands.push(command.slashDefinition ?? { name: command.name, description: command.description });
}

const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

if (!process.env.CLIENT_ID) throw new Error('CLIENT_ID is missing in .env');

if (process.env.GUILD_ID) {
  await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: commands });
  console.log(`Deployed ${commands.length} guild commands`);
} else {
  await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });
  console.log(`Deployed ${commands.length} global commands`);
}
