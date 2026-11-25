export default {
  name: 'say',
  description: 'إرسال رسالة في القناة',
  category: 'عام',
  async execute(message, args) {
    if (!message.member.permissions.has('ManageMessages')) return message.reply('ليس لديك صلاحية إدارة الرسائل.');
    const text = args.join(' ').trim();
    if (!text) return message.reply('اكتب الرسالة بعد الأمر.');
    await message.delete().catch(() => {});
    await message.channel.send(text);
  }
};
