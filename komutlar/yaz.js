const Discord = require('discord.js')
const db = require('quick.db');
const fs = require('fs');
const ayarlar = require('../ayarlar.json');
const emoji = require('../emoji.json');

var ayarlı = emoji.onaylandi;
var ayarsız = emoji.onaylanmadi;

exports.run = (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${ayarsız} Bu komutu kullanabilmek için \`Yönetici\` yetkisine sahip olmalısın.`);
  let mesaj = args.slice(0).join(' ');
		var embed = new Discord.RichEmbed()
    .setColor("#2f3136")
    .setAuthor(`${client.user.username} - Duyuru Sistemi`, client.user.avatarURL)
    .addField(`Lütfen bir mesaj belirtin.\nDoğru kullanımı;`,`\`${ayarlar.prefix}yaz <mesaj>\``)
if (mesaj.length < 1) return message.channel.send(embed);
  message.delete();
		var embed = new Discord.RichEmbed()
    .setColor("#2f3136")
    //.setAuthor(`${client.user.username} - Duyuru Sistemi`, client.user.avatarURL)
    .setDescription(`${mesaj}`)
  message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: 'yaz',
  description: '[Admin Komutu]',
  usage: 'yaz [yazdırmak istediğiniz şey]'
};