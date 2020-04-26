const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db');
const emoji = require('../emoji.json');
const link = require('../linkler.json');

var ayarlı = emoji.onaylandi;
var ayarsız = emoji.onaylanmadi;

exports.run = (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${ayarsız} Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
   db.fetch(`pre_${message.guild.id}`).then(async i => {
    if (i == 'aktif') {
      
  let mesaj = args.slice(0).join(' ');
    const mesajerror = new Discord.RichEmbed()
    .setAuthor(`${client.user.username} | Direk Mesaj Sistemi`, message.author.avatarURL)
    .setDescription(`${ayarsız} Lütfen bir mesaj girin!`)
if (mesaj.length < 1) return message.channel.send(mesajerror);

  message.delete();

  console.log(`Toplu Mesaj: "${message.author.username}#${message.author.discriminator}" "${mesaj}"`);

      const mesajat = new Discord.RichEmbed()
    .setColor("#2f3136")
    .setTimestamp()
    .setTitle(`\`${message.guild.name}\` adlı sunucunun yetkilisinden mesaj geldi!`)
    .addField('Yetkili:', `<@${message.author.id}>`)
    .addField('Mesaj:', `${mesaj}`)
    .addField(`:link: Linkler:`,`> [Davet Et](${link.davet}) | [Destek Sunucusu](${link.desteksunucu}) | [Site](${link.site}) | [Youtube](${link.youtube}) | [Oy Ver](${link.vote})`)
    .setFooter(`${client.user.username} | Premium Özellik Toplu Direk Mesaj`)
      message.guild.members.forEach(u => {
u.sendEmbed(mesajat)
})
  
    const dmtamam = new Discord.RichEmbed()
    .setColor("#2f3136")
    .setTimestamp()
    .setTitle(`${ayarlı} İşlem Başarılı!`)
    .setDescription(`\`${message.guild.memberCount}\` kişiye \`${mesaj}\` mesajı başarıyla gönderildi!`)
    .setFooter(`${client.user.username} | Premium Özellik Toplu Direk Mesaj`)
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
  guildOnly: true,
  aliases: ['dmherkes'],
  permLevel: 3
};

exports.help = {
  name: 'direkherkes',
  description: 'YAPIMCI Özel',
  usage: 'direkherkes'
};
