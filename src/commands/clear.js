export default {
  name: 'clear',
  description: 'حذف رسائل من الشات',
  category: 'الإدارة',
  slashDefinition: {
    name: 'clear', description: 'حذف رسائل من الشات',
    options: [{ name: 'count', description: 'عدد الرسائل', type: 4, required: true, min_value: 1, max_value: 100 }]
  },
  async execute(message, args) {
    if (!message.member.permissions.has('ManageMessages')) return message.reply('ليس لديك صلاحية إدارة الرسائل.');
    const count = Number(args[0]);
    if (!Number.isInteger(count) || count < 1 || count > 100) return message.reply('استخدم: clear <1-100>');
    const deleted = await message.channel.bulkDelete(count, true);
    await message.reply(`🧹 تم حذف **${deleted.size}** رسالة.`).then(m => setTimeout(() => m.delete().catch(() => {}), 3000));
  },
  async slash(interaction) {
    if (!interaction.memberPermissions.has('ManageMessages')) return interaction.reply({ content: 'ليس لديك الصلاحية.', ephemeral: true });
    const count = interaction.options.getInteger('count');
    const deleted = await interaction.channel.bulkDelete(count, true);
    await interaction.reply({ content: `🧹 تم حذف **${deleted.size}** رسالة.`, ephemeral: true });
  }
};
