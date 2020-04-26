const Discord = require('discord.js')
const db = require('quick.db');
const ayarlar = require('../ayarlar.json');
const emoji = require('../emoji.json');

var ayarlı = emoji.onaylandi;
var ayarsız = emoji.onaylanmadi;

exports.run = async (client, message, args) => {
  
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${ayarsız} Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
  
  let rol = message.mentions.roles.first()
  let rolk = message.mentions.channels.first()
  
  if (!rol) {
    return message.channel.send(`${ayarsız} Otorol olarak ayarlamak istediğin rolü etiketlemelisin.`)
    }
  
  if (!rolk) {
    return message.channel.send(`${ayarsız} Otorol kanalını etiketlemelisin.`)
  }

  db.set(`otorol_${message.guild.id}`, rol.name)
  db.set(`rolK_${message.guild.id}` ,rolk.name)
  
    message.channel.send(`${ayarlı} Otorol \`${rol.name}\`, otorol kanalı ${rolk} olarak ayarlandı.`)
  
}
    
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['oto-rol'],
    permLevel: 0,
}

exports.help = {
    name: 'otorol',
    description: 'Otorolü ayarlar.',
    usage: 'otorol <@rol>'
}