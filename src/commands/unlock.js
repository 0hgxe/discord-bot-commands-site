export default {
  name: 'unlock',
  description: 'فتح الشات',
  category: 'إدارة الرومات',
  slashDefinition: { name: 'unlock', description: 'فتح الشات' },
  async execute(message) {
    if (!message.member.permissions.has('ManageChannels')) return message.reply('ليس لديك صلاحية إدارة الرومات.');
    await message.channel.permissionOverwrites.edit(message.guild.roles.everyone, { SendMessages: null });
    await message.reply('🔓 تم فتح الشات.');
  },
  async slash(interaction) {
    if (!interaction.memberPermissions.has('ManageChannels')) return interaction.reply({ content: 'ليس لديك صلاحية إدارة الرومات.', ephemeral: true });
    await interaction.channel.permissionOverwrites.edit(interaction.guild.roles.everyone, { SendMessages: null });
    await interaction.reply('🔓 تم فتح الشات.');
  }
};
