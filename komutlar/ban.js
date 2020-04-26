const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require('../ayarlar.json');
const emoji = require('../emoji.json');

var ayarlı = emoji.onaylandi;
var ayarsız = emoji.onaylanmadi;

exports.run = async (client, message, args) => {
  
  if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(`${ayarsız} Bu komutu kullanabilmek için "\`Üyeleri Yasakla\`" yetkisine sahip olmalısın.`);
  let guild = message.guild
  let user = message.mentions.users.first();
  let reason = args[0]
  let modlog = await db.fetch(`modlogK_${message.guild.id}`);
  let modlog2 = guild.channels.find('name', modlog);
  if (!reason) return message.channel.send(`${ayarsız} Sebebi belirtmelisin.`)
  if (message.mentions.users.size < 1) return message.channel.send(`${ayarsız} Yasaklayacağın kişiyi etiketlemelisin.`).catch(console.error);
  message.guild.member(user).ban();
  message.channel.send(`${ayarlı} ${user} kullanıcısını ${reason} sebebinden sunucudan yasakladınız.`)
  modlog2.send(`${ayarsız} ${user} adlı kullanıcı sunucudan yasaklandı.`);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['yasakla'],
  permLevel: 3,
};

exports.help = {
  name: 'ban',
  description: 'İstediğiniz kişiyi sunucudan atar.',
  usage: 'ban [kullanıcı] [sebep]'
};