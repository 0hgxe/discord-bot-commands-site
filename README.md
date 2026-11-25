# Discord Bot

بوت ديسكورد عربي احترافي، قابل للتوسعة، مبني بـ Discord.js.

## التشغيل

```bash
npm install
cp .env.example .env
# ضع بيانات البوت في .env
npm run deploy
npm start
```

## إعداد Discord Developer Portal

1. فعّل `MESSAGE CONTENT INTENT` داخل صفحة البوت.
2. أضف البوت بصلاحيات `Administrator` أو الصلاحيات التي تحتاجها الأوامر.
3. استخدم رابط OAuth2 مع نطاقات `bot` و `applications.commands`.

## الأوامر

- الأوامر المنفذة حاليًا عبر البريفكس:
  - `!ping`
  - `!help`
  - `!user @member`
  - `!server`
  - `!kick @member [reason]`
  - `!ban @member [reason]`
  - `!mute @member [reason]`
  - `!unmute @member`
  - `!timeout @member <minutes> [reason]`
  - `!clear <count>`
  - `!lock`
  - `!unlock`
  - `!say <message>`
- الأمر `help` يعرض جميع الأوامر المصنفة.
- الأوامر الإدارية اللاحقة تُضاف كوحدات داخل مجلد `src/commands` دون تعديل ملفات التشغيل الأساسية.
