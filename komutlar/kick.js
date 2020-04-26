const Discord = require('discord.js');
const db = require('quick.db');
const emoji = require('../emoji.json');

var ayarlı = emoji.onaylandi;
var ayarsız = emoji.onaylanmadi;
exports.run = async (client, message, args) => {
  
  if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(`${ayarsız} Bu komutu kullanabilmek için "\`Üyeleri At\`" yetkisine sahip olmalısın.`);
  let guild = message.guild
  let user = message.mentions.users.first();
  let reason = args.slice(1).join(' ');
  let modlog = await db.fetch(`modlogK_${message.guild.id}`);
  let modlog2 = guild.channels.find('name', modlog);
  if (!reason) return message.channel.send(`${ayarsız} Sebebi belirtmelisin.`)
  if (message.mentions.users.size < 1) return message.channel.send(`${ayarsız} Atacağın kişiyi etiketlemelisin.`).catch(console.error);
  message.guild.member(user).kick();
  message.channel.send(`${ayarlı} ${user} kullanıcısını ${reason} sebebinden sunucudan attınız.`)
  modlog2.send(`${ayarlı} ${user} adlı kullanıcı sunucudan atıldı.`);
}; 

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['at'],
  permLevel: 3,
};

exports.help = {
  name: 'kick',
  description: 'İstediğiniz kişiyi sunucudan atar.',
  usage: 'kick [kullanıcı] [sebep]'
};