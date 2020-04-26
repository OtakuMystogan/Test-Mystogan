const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json');
const link = require('../linkler.json');

exports.run = (client, message) => {
	const davet = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setAuthor(`${client.user.username} | Linkler`, client.user.avatarURL)
    .addField(`Aşağıdaki linklerden botumuzun destek sunucusunu ve davet linki görebilirsiniz.`,`
    [Botunuzu kendi sunucunuza davet edin](${link.davet})
    [Soru(n) yaşıyorsanız destek sunucumuza katılın](${link.desteksunucu})
    [Botumuza oy vererek bize destek çıkabilirsin](${link.vote})
    [Botumuzun şuanlık paneli bulunmuyor.](${link.site})
    [Youtube kanalımı takip ederek botumuza gelen güncellemeleri görebilirsiniz](${link.youtube})
`)
    message.channel.send(davet)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['desteksunucu', 'davet', 'site', 'oyver','link'],
  permLevel: 0,
};

exports.help = {
  name: 'davet',
  description: 'Botun davet linkini gΓΆnderir.',
  usage: 'davet'
};
