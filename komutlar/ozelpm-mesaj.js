const Discord = require('discord.js')
const db = require('quick.db');
const ayarlar = require('../ayarlar.json');
const emoji = require('../emoji.json');

var ayarlı = emoji.onaylandi;
var ayarsız = emoji.onaylanmadi;


exports.run = async (client, message, args) => {
 let prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
  
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${ayarsız} Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
  
  let mesaj = args.slice(0).join(' ')
  
      if (!mesaj) {
        return message.channel.send(`${ayarsız} Yeni gelen kullanıcı özel mesajını yazmalısın.`)
    }
  
    db.set(`pmgirisM_${message.guild.id}`, mesaj)
    message.channel.send(`${ayarlı} Yeni gelen kullanıcı mesajı \`${mesaj}\` olarak ayarlandı.Kapatmak İçin \`${prefix}kapat özelpm-mesaj\``)

  
}    
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['pm-mesaj'],
    permLevel: 3,
}

exports.help = {
    name: 'özelpm-mesaj',
    description: 'Giriş çıkış kanalına gönderilen çıkış mesajını düzenler.',
    usage: 'özelpm-mesaj <yazı>'
}