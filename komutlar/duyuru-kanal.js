const Discord = require('discord.js')
const db = require('quick.db');
const fs = require('fs');
const ayarlar = require('../ayarlar.json');
const emoji = require('../emoji.json');

var ayarlı = emoji.onaylandi;
var ayarsız = emoji.onaylanmadi;


exports.run = async (client, message, args) => {
 let prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
  
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${ayarsız} Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
  let channel = message.mentions.channels.first()
    if (!channel) {
        return message.channel.send(`${ayarsız} Duyuru kanalı olarak ayarlamak istediğin kanalı etiketlemelisin.`)
      
    }
    db.set(`duyuruK_${message.guild.id}`, channel.name)
    message.channel.send(`${ayarlı} Duyuru kanalı başarıyla ${channel} olarak ayarlandı.Kapatmak İçin \`${prefix}kapat duyuru-kanal\``)
  }
  
    
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['duyuru-k'],
    permLevel: 3,
}

exports.help = {
    name: 'duyuru-kanal',
    description: 'Giriş-çıkış kanalını ayarlar.',
    usage: 'duyuru-kanal <#kanal>'
}