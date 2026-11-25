import { EmbedBuilder, PermissionFlagsBits } from 'discord.js';

export default {
  name: 'ping',
  description: 'سرعة اتصال البوت',
  category: 'عام',
  slashDefinition: { name: 'ping', description: 'سرعة اتصال البوت' },
  async execute(message) {
    const sent = await message.reply('جاري فحص السرعة...');
    await sent.edit(`🏓 سرعة البوت: **${sent.createdTimestamp - message.createdTimestamp}ms**\n📡 WebSocket: **${message.client.ws.ping}ms**`);
  },
  async slash(interaction) {
    await interaction.reply(`🏓 سرعة البوت: **${interaction.client.ws.ping}ms**`);
  }
};
