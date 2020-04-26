const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
const db = require('quick.db')


exports.run = (client, message, args) => {
if(message.author.id !== ayarlar.sahip) return message.channel.send('Bu Komutu Sadece Yapımcım Kullanabilir!')
  let prekanal = client.channels.get('697229068235440238')
  var premium = args[0]
var presunucu = client.guilds.get(args[1])
if (!premium) return message.reply("Lütfen **aktif** ya da **deaktif Yazın!")
if (!presunucu) return message.reply("Premium'un Aktif Edileceği Sunucunun ID sini Yazmalısın!")
  
  if (premium === 'aktif') {
 db.set(`pre_${presunucu.id}`, "aktif")
    prekanal.send(`\`${message.author.tag}\` adlı yetkili tarafından \`${presunucu.id}\` ID'ine sahip \`${presunucu.name}\` adlı sunucunun \`premium özelliği\` aktif edildi!`)
  };

  if (premium === 'deaktif') {
    db.delete(`pre_${presunucu.id}`)
    prekanal.send(`\`${message.author.tag}\` adlı yetkili tarafından \`${presunucu.id}\` ID'ine sahip \`${presunucu.name}\` adlı sunucunun \`premium özelliği\` de-aktif edildi!`)
  };
  
};
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 4,
};

exports.help = {
    name: 'pre',
    description: 'Premium aktifleştirir veya deaktifleştirir.',
    usage: 'pre [aktif/deaktif] [sunucu ID]'
};