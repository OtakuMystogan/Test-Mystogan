const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const emoji = require('../emoji.json');
const link = require('../linkler.json');

exports.run = async(client, message, params) => {
  let prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
    const embedyardim = new Discord.RichEmbed()
    //.setAuthor(client.user.username, client.user.avatarURL)
    .setColor("#2f3136")
    .addField(`:underage: **NSFW KOMUTLARI**`,`
    \`${prefix}pgif\` = NSFW bir gif gösterir.
    \`${prefix}anal\` = NSFW bir gif gösterir.
    \`${prefix}hentai\` = NSFW bir resim gösterir.
    \`${prefix}4k\` = NSFW bir resim gösterir.
`)
    .addField(`:link: Linkler:`,`> [Davet Et](${link.davet}) | [Destek Sunucusu](${link.desteksunucu}) | [Site](${link.site}) | [Youtube](${link.youtube}) | [Oy Ver](${link.vote})`)
    message.channel.sendEmbed(embedyardim) 
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['nsfw'],
  permLevel: 0,
};

exports.help = {
  name: 'nsfw',
  description: 'Tüm komutları gösterir.',
  usage: 'nsfw [komut]'
};
