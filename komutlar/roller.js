const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require("../ayarlar.json")
const emoji = require('../emoji.json');
const link = require('../linkler.json');

var ayarlı = emoji.onaylandi;
var ayarsız = emoji.onaylanmadi;

exports.run = async (client, message) => {
  const embed = new Discord.RichEmbed()
  .setColor("#2f3136")
  .setAuthor(`${message.guild.name} - Rol Bilgisi [${message.guild.roles.size}]`, message.guild.iconURL)
  .setDescription(`${message.guild.roles.filter(r => r.name !== "@everyone").map(r => r).join('\n') ? message.guild.roles.filter(r => r.name !== "@everyone").map(r => r).join('\n') : 'Bu sunucuda hiç rol bulunmuyor.'}`)
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
  name: 'roller',
  category: "sunucu",
  description: 'Bulunduğunuz sunucudaki rolleri gösterir.',
  usage: 'roller'
};