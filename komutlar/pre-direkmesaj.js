const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db');
const emoji = require('../emoji.json');
const link = require('../linkler.json');

var ayarlı = emoji.onaylandi;
var ayarsız = emoji.onaylanmadi;

exports.run = function(client, message, args) {
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${ayarsız} Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
   db.fetch(`pre_${message.guild.id}`).then(async i => {
    if (i == 'aktif') {
  let guild = message.guild;
    let dmkisi = message.mentions.users.first();
    const dmkisieror = new Discord.RichEmbed()
    .setAuthor(`${client.user.username} | Direk Mesaj Sistemi`, message.author.avatarURL)
    .setDescription(`${ayarsız} Lütfen geçerli bir kullanıcı adı girin.\n\nNot: Kullanıcı sunucuda bulunmak zorunda!`)
    if (!dmkisi) return message.channel.send(dmkisieror);
    let dm = args.slice(1).join(' ');
    if (!dm) return message.channel.send(`${ayarsız} Mesaj girilmedi`);
    message.delete();
    const dmat = new Discord.RichEmbed()
    .setColor("#2f3136")
    .setTimestamp()
    .setTitle(`\`${message.guild.name}\` adlı sunucunun yetkilisinden sana özel mesaj geldi!`)
    .addField('Yetkili:', `<@${message.author.id}>`)
    .addField('Mesaj:', `${dm}`)
    .addField(`:link: Linkler:`,`> [Davet Et](${link.davet}) | [Destek Sunucusu](${link.desteksunucu}) | [Site](${link.site}) | [Youtube](${link.youtube}) | [Oy Ver](${link.vote})`)
    .setFooter(`${client.user.username} | Premium Özellik Özel Direk Mesaj`)
    dmkisi.sendEmbed(dmat);
    const dmtamam = new Discord.RichEmbed()
    .setColor("#2f3136")
    .setTimestamp()
    .setTitle(`${ayarlı} İşlem Başarılı!`)
    .setDescription(`${dmkisi} / ${dmkisi.id} adlı kullanıcıya \`${dm}\` mesajı başarıyla gönderildi`)
    .setFooter(`${client.user.username} | Premium Özellik Özel Direk Mesaj`)
    message.channel.sendEmbed(dmtamam);
}
  else if (!i || i == 'deaktif') {
      const premiumdeaktif = new Discord.RichEmbed()
      .setTitle(`${emoji.premium} PREMIUM ÖZELLIGI`)
      .addField("Bu sunucuda ``premium özelliği`` bulunmuyor!",`[Destek Sunucusu](${link.desteksunucu})`)
      message.channel.send(premiumdeaktif)
    }
});
}
  

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['dm'],
  permLevel: 3,
};

exports.help = {
  name: 'dm-at',
  description: 'Özel komut.',
  usage: ''
};