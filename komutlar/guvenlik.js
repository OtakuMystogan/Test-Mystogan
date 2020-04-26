const Discord = require('discord.js');
const db = require('quick.db')
const ayarlar = require('../ayarlar.json')
const emoji = require('../emoji.json');

var ayarlı = emoji.onaylandi;
var ayarsız = emoji.onaylanmadi;

exports.run = async (client, message,args) => {
 let prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);

let logk = message.mentions.channels.first();
let logkanal = await db.fetch(`guvenlik_${message.guild.id}`)
 
  if (args[0] === "sıfırla" || args[0] === "kapat") {
 		var bilgilendirme = new Discord.RichEmbed()
      .setAuthor(`${client.user.username} - Güvenlik Sistemi`, client.user.avatarURL)
      .setDescription(`${emoji.bilgi} Güvenliği kapatmak için \`güvenlik kanalının\` belirlenmiş olması lazım \n\nKullanım: \`${prefix}güvenlik <#kanal>\``)
    
    if(!logkanal) return message.channel.send(bilgilendirme);
    
   db.delete(`guvenlik_${message.guild.id}`)
   message.channel.send(`Güvenlik başarıyla kapatıldı.`);
 
    return
  }
 		var hata = new Discord.RichEmbed()
      .setAuthor(`${client.user.username} - Güvenlik Sistemi`, client.user.avatarURL)
      .setDescription(`${ayarsız} Güvenlik kanalı bulunamadı! \n\nKullanım: \`${prefix}güvenlik <#kanal>\``)
if (!logk) return message.channel.send(hata);
 

   db.set(`guvenlik_${message.guild.id}`, logk.id)

message.channel.send(`Güvenlik başarıyla ${logk} olarak ayarlandı`);

}

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['gks','güvenlik'],
  permLevel: 3,
};

module.exports.help = {
  name: 'güvenlik',
  description: 'güvenlik sağlar',
  usage: 'güvenlik'
};