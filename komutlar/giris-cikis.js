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
        return message.channel.send(`${ayarsız} Giriş-çıkış kanalı olarak ayarlamak istediğin kanalı etiketlemelisin.`)
      
    }
    db.set(`gckanal_${message.guild.id}`, channel.name)
    message.channel.send(`${ayarlı} Giriş-çıkış kanalı başarıyla ${channel} olarak ayarlandı.Kapatmak İçin \`${prefix}kapat giriş-çıkış\``)
  }
  
    
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['girişçıkış', 'giris-cikis'],
    permLevel: 3,
}

exports.help = {
    name: 'giriş-çıkış',
    description: 'Giriş-çıkış kanalını ayarlar.',
    usage: 'giriş-çıkış <#kanal> / sıfırla'
}