import { EmbedBuilder } from 'discord.js';

const commandData = {
  name: 'help',
  description: 'عرض قائمة الأوامر',
  category: 'عام',
  slashDefinition: { name: 'help', description: 'عرض قائمة الأوامر' }
};

export default {
  ...commandData,
  async execute(message) {
    await message.reply({ embeds: [buildHelp(message.client)] });
  },
  async slash(interaction) {
    await interaction.reply({ embeds: [buildHelp(interaction.client)], ephemeral: true });
  }
};

function buildHelp(client) {
  const categories = new Map();
  for (const command of client.commands.values()) {
    const list = categories.get(command.category || 'عام') || [];
    list.push(`\`${process.env.DEFAULT_PREFIX || '!'}${command.name}\``);
    categories.set(command.category || 'عام', list);
  }

  const embed = new EmbedBuilder()
    .setTitle('📋 قائمة الأوامر')
    .setColor('#5865F2')
    .setFooter({ text: client.user.username });

  for (const [category, commands] of categories) {
    embed.addFields({ name: category, value: commands.join('  •  ') });
  }
  return embed;
}
