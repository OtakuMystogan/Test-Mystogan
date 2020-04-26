const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const emoji = require('../emoji.json');
const link = require('../linkler.json');

var ayarlı = emoji.onaylandi;
var ayarsız = emoji.onaylanmadi;

exports.run = function(client, message, args) {
    if (message.author.id === (ayarlar.sahip)) {
    let dm = args.slice(1).join(' ');
    if (!dm) return message.channel.send(`${ayarsız} Mesaj Girilmedi`);
    message.delete();
    const dmat = new Discord.RichEmbed()
    .setColor("#2f3136")
    .setTimestamp()
    .setAuthor(`${client.user.username} | Yapımcısından Sana Mesaj Geldi!`, message.author.avatarURL)
    .addField('Yetkili:', `<@${message.author.id}>`)
    .addField('Mesaj:', `${dm}`)
    .addField(`:link: Linkler:`,`> [Davet Et](${link.davet}) | [Destek Sunucusu](${link.desteksunucu}) | [Site](${link.site}) | [Youtube](${link.youtube}) | [Oy Ver](${link.vote})`)
    .setFooter(`${client.user.username} | Özel Direk Mesaj`)
      client.users.forEach(u => {
u.sendEmbed(dmat)
})
    const dmtamam = new Discord.RichEmbed()
    .setColor("#2f3136")
    .setTimestamp()
    .setTitle(`${ayarlı} İşlem Başarılı!`)
    .setDescription(client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString() +` kişiye \`${dm}\` mesajı başarıyla gönderildi!`)
    .setFooter(`${client.user.username} | Özel Direk Mesaj`)
    message.channel.sendEmbed(dmtamam);
    } else {
        message.channel.send(`${ayarsız} **Bu Komutu Sadece Yapımcım Kullanabilir!**`);
    }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['dmadmin','dm-admin'],
  permLevel: 4,
};

exports.help = {
  name: 'dmadmin',
  description: 'Özel komut.',
  usage: ''
};