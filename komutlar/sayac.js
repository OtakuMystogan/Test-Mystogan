const Discord = require('discord.js')
const db = require('quick.db')
const ayarlar = require('../ayarlar.json')
const emoji = require('../emoji.json');

var ayarlı = emoji.onaylandi;
var ayarsız = emoji.onaylanmadi;

exports.run = async (client, message, args) => {
  
  const sayacsayi = await db.fetch(`sayac_${message.guild.id}`);
  const sayackanal = message.mentions.channels.first()
  
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${emoji.onaylanmadi} Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
        
  if(!args[0]) {
    message.channel.send(`${emoji.onaylanmadi} Bir sayı yazmalısın.`)
    return
  }
  
  if(!sayackanal) {
   message.channel.send(`${emoji.onaylanmadi} Sayaç kanalını etiketlemelisin.`)
  }
  
        if(args[0] <= message.guild.members.size) {
                message.channel.send(`${emoji.onaylanmadi} Sunucudaki kullanıcı sayısından (${message.guild.members.size}) daha yüksek bir değer girmelisin.`)
                return
        }
  
  db.set(`sayac_${message.guild.id}`, args[0])
  db.set(`sayacK_${message.guild.id}`, sayackanal.name)
  
  message.channel.send(`${emoji.onaylandi} Sayaç \`${args[0]}\`, sayaç kanalı ${sayackanal} olarak ayarlandı.`)
}
 
exports.conf = {
        enabled: true,
        guildOnly: true,
        aliases: ['sayac'],
        permLevel: 3,
}
 
exports.help = {
        name: 'sayaç',
        description: 'Sayacı ayarlar.',
        usage: 'sayaç <sayı> <#kanal> / sıfırla'
}