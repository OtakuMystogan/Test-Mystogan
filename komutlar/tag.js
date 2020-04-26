const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require('../ayarlar.json');
const emoji = require('../emoji.json');

var ayarlı = emoji.onaylandi;
var ayarsız = emoji.onaylanmadi;

exports.run = async (client, message, args) => {
  
  
exports.run = async(bot, message, args) => { 
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${ayarsız} Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
  let prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
  
  let tag = args[0];
  let tagg = db.fetch(`tag_${message.guild.id}`)
  
  if (!tag) return message.channel.send(`${ayarsız} Bir tag girmelisin.`)
  
  
  db.set(`tag_${message.guild.id}`, tag)
  message.channel.send(`${ayarlı} Tag başarıyla \`${tag}\` olarak ayarlandı.Kapatmak İçin \`${prefix}kapat tag\``)
                          
  
}
   
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0,
};

exports.help = {
  name: 'tag',
  description: 'Tagı ayarlar.',
  usage: 'tag <yazı>'
};