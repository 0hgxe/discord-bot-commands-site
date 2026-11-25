export default {
  name: 'server',
  description: 'عرض معلومات السيرفر',
  category: 'عام',
  slashDefinition: { name: 'server', description: 'عرض معلومات السيرفر' },
  async execute(message) {
    await sendServer(message, message.guild);
  },
  async slash(interaction) {
    await sendServer(interaction, interaction.guild);
  }
};

async function sendServer(target, guild) {
  const text = `**معلومات السيرفر**\n${guild.name}\nالأعضاء: ${guild.memberCount}\nالرولات: ${guild.roles.cache.size}\nالرومات: ${guild.channels.cache.size}\nالمالك: <@${guild.ownerId}>`;
  if (target.reply) await target.reply(text);
}
