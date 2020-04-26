const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const emoji = require('../emoji.json');
const link = require('../linkler.json');

exports.run = async(client, message, params) => {
  let prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
    const embedyardim = new Discord.RichEmbed()
    //.setAuthor(client.user.username, client.user.avatarURL)
    .setColor("#2f3136")
    .addField(`${emoji.bilgi} **YARDIM KOMUTLARI**`,`
    ${emoji.kullanıcı} \`${prefix}kullanıcı\` = Kullanıcı komutlarını gösterir.
    ${emoji.yetkili} \`${prefix}yetkili\` = Yetkili komutlarını gösterir.
    ${emoji.ayarlar} \`${prefix}ayarlar\` = Sunucu ayarlarını gösterir.
    ${emoji.eglence} \`${prefix}eğlence\` = Eğlence komutlarını gösterir.
    ${emoji.premium} \`${prefix}premium\` = Premium sistemi hakkında bilgi verir.
    :underage: \`${prefix}nsfw\` = NSFW komutlarını gösterir.
`)
    .addField(`:link: Linkler:`,`> [Davet Et](${link.davet}) | [Destek Sunucusu](${link.desteksunucu}) | [Site](${link.site}) | [Youtube](${link.youtube}) | [Oy Ver](${link.vote})`)

    message.channel.sendEmbed(embedyardim) 
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['h', 'halp', 'help', 'y'],
  permLevel: 0,
};

exports.help = {
  name: 'yardım',
  description: 'Tüm komutları gösterir.',
  usage: 'yardım [komut]'
};
