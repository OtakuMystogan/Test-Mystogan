const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
const db = require('quick.db')
const emoji = require('../emoji.json');
const link = require('../linkler.json');

var ayarlı = emoji.onaylandi;
var ayarsız = emoji.onaylanmadi;

exports.run = async (client, message, args) => {
    let pre = await db.fetch(`pre_${message.guild.id}`)
  let preYazi;
  if (pre == null) preYazi = `${ayarsız} Aktif Değil!`
  if (pre == 'aktif') preYazi = `${ayarlı} Aktif!`
  if (pre == 'deaktif') preYazi = `${ayarsız} Deaktif!`
  const embed = new Discord.RichEmbed()
  .setTitle(`PREMIUM ÖZELLIĞI`)
   .setColor("#2f3136")
  .addField(preYazi, `[Destek Sunucusu](${link.desteksunucu})`)
  
  message.channel.send(embed)
  }
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['pre-kontrol', 'prekontrol'],
    permLevel: 0,
}

exports.help = {
    name: 'premium-kontrol',
    description: '',
    usage: ''
}