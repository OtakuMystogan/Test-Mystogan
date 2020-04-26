const Discord = require('discord.js')
const db = require('quick.db');
const ayarlar = ('../ayarlar.json');
const emoji = require('../emoji.json');

var ayarlı = emoji.onaylandi;
var ayarsız = emoji.onaylanmadi;
exports.run = async (client, message, args) => {
  let prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
  
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${ayarsız} Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
  let channel = message.mentions.channels.first()
    if (!channel) {
        return message.channel.send(`${ayarsız} Kayıt kanalı olarak ayarlamak istediğin kanalı etiketlemelisin.`)
    }
    db.set(`modlogK_${message.guild.id}`, channel.name)
     db.set(`membermodChannel_${message.guild.id}`, message.mentions.channels.first().id).then(i => {  
       message.channel.send(`${ayarlı} Kayıt kanalı başarıyla **${channel}** olarak ayarlandı.Kapatmak İçin \`${prefix}kapat logkanal\``)
    })         
}; 

exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ["log-kanal"],
 permLevel: 3,
};

exports.help = {
 name: 'kayıt-kanal',
 description: 'Kayıt Kanalını Ayarlar',
 usage: 'kayıt-kanal'
};