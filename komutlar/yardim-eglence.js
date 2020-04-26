const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const emoji = require('../emoji.json');
const link = require('../linkler.json');

exports.run = async(client, message, params) => {
  let prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
    const embedyardim = new Discord.RichEmbed()
    //.setAuthor(client.user.username, client.user.avatarURL)
    .setColor("#2f3136")
    .addField(`${emoji.eglence} **EĞLENCE KOMUTLARI**`,`
    \`atatürk-çerçeve,aşk-ölçer,efkar-ölçer,sigara,ates-et
stresçarkı,yazıtura,slots,balıktut,kedi\`

`)
    .addField(`:link: Linkler:`,`> [Davet Et](${link.davet}) | [Destek Sunucusu](${link.desteksunucu}) | [Site](${link.site}) | [Youtube](${link.youtube}) | [Oy Ver](${link.vote})`)
    message.channel.sendEmbed(embedyardim) 
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['eğlence-yardım'],
  permLevel: 0,
};

exports.help = {
  name: 'eğlence',
  description: 'Tüm komutları gösterir.',
  usage: 'eğlence [komut]'
};
