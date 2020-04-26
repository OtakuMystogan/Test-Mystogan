const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const link = require('../linkler.json');

module.exports.run = async (client, msg, args) => {
    let pingembed = new Discord.RichEmbed()
        .setColor("#2f3136")
        .setDescription(`Gecikme değerlerim test ediliyor....`)
        .setTimestamp()
    const message = msg
    const m = await msg.channel.send(pingembed);
    let embed = new Discord.RichEmbed()
         .setColor("#2f3136")
        .addField(`Mesaj Gecikme Süresim`, `${m.createdTimestamp - msg.createdTimestamp}ms`, true)
        .addField(`Bot Gecikme Süresim`, `${Math.round(client.ping)}ms`, true)
        .addField(`:link: Linkler:`,`> [Davet Et](${link.davet}) | [Destek Sunucusu](${link.desteksunucu}) | [Site](${link.site}) | [Youtube](${link.youtube}) | [Oy Ver](${link.vote})`)
        .setAuthor(client.user.username, client.user.avatarURL)
    m.edit({ embed });
}


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'ping',
  description: 'Botun pingini gösterir.',
  usage: 'ping'
};
