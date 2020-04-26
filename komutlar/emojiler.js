const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require("../ayarlar.json")
const emoji = require('../emoji.json');
const link = require('../linkler.json');

var ayarlı = emoji.onaylandi;
var ayarsız = emoji.onaylanmadi;

exports.run = async (client, message) => {
  const embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setAuthor(`${message.guild.name} - Emoji Bilgisi [${message.guild.emojis.size}]`, message.guild.iconURL)
  .setDescription(`${message.guild.emojis.map(e=>e.toString()).join("") ? message.guild.emojis.map(e=>e.toString()).join("") : 'Bu sunucuda hiç emoji bulunmuyor.'}`)
  .addField(`:link: Linkler:`,`> [Davet Et](${link.davet}) | [Destek Sunucusu](${link.desteksunucu}) | [Site](${link.site}) | [Youtube](${link.youtube}) | [Oy Ver](${link.vote})`)
  return message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: `Yetki gerekmiyor.`
};

exports.help = {
  name: 'emojiler',
  category: "sunucu",
  description: 'Bulunduğunuz sunucudaki rolleri gösterir.',
  usage: 'emojiler'
};