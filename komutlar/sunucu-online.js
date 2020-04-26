const Discord = require('discord.js');
const db = require('quick.db');
const fs = require('fs');
const ayarlars = require('../ayarlar.json');
const emoji = require('../emoji.json');

var ayarlı = emoji.onaylandi;
var ayarsız = emoji.onaylanmadi;

exports.run = async(client, message, args, member) => {

  const ayarlar = new Discord.RichEmbed()
   .setColor("#2f3136")
  //.setAuthor(`**${message.guild.name}** Üye Durum`, client.user.avatarURL)
  .setTitle(`\`${message.guild.name}\` - Kullanıcı Durumları`)
  .addField("Çevrimiçi:", `${message.guild.members.filter(m => m.user.presence.status === "online").size}`, true)
  .addField("Rahatsız Etmeyin:", `${message.guild.members.filter(m => m.user.presence.status === "dnd").size}`, true)
  .addField("Boşta:", `${message.guild.members.filter(m => m.user.presence.status === "idle").size}`, true)
  .addField("Çevrimdışı:", `${message.guild.members.filter(m => m.user.presence.status === "offline").size}`, true)
  .addField("Bot:", `${message.guild.members.filter(m => m.user.bot).size}`, true)
  .addField("Toplam Kullanıcı:", `${message.guild.members.size}`, true)
  .addField("Toplam Aktif Kullanıcı:", message.guild.members.filter(m => m.user.presence.status === "online").size + message.guild.members.filter(m => m.user.presence.status === "dnd").size + message.guild.members.filter(m => m.user.presence.status === "id").size, true)
  .setThumbnail(message.guild.iconURL)
  .setFooter(`${client.user.username} - Kullanıcı Durum`, client.user.avatarURL)
  message.channel.send(ayarlar);
};
	
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [`sunucuonline`, `sunucu-online`],
  kategori: 'online',
  permLevel: 0,
 };
 
 exports.help = {
 name: 'online',
 description: 'Bot İçin Sunucuyu Ayarlarını Gösterir.',
 usage: 'online'
 }