export default {
  name: 'lock',
  description: 'تقفيل الشات',
  category: 'إدارة الرومات',
  slashDefinition: { name: 'lock', description: 'تقفيل الشات' },
  async execute(message) {
    if (!message.member.permissions.has('ManageChannels')) return message.reply('ليس لديك صلاحية إدارة الرومات.');
    await message.channel.permissionOverwrites.edit(message.guild.roles.everyone, { SendMessages: false });
    await message.reply('🔒 تم تقفيل الشات.');
  },
  async slash(interaction) {
    if (!interaction.memberPermissions.has('ManageChannels')) return interaction.reply({ content: 'ليس لديك صلاحية إدارة الرومات.', ephemeral: true });
    await interaction.channel.permissionOverwrites.edit(interaction.guild.roles.everyone, { SendMessages: false });
    await interaction.reply('🔒 تم تقفيل الشات.');
  }
};
