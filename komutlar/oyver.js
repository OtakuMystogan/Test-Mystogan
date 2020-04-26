const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json');
const link = require('../linkler.json');

exports.run = (client, message) => {
  if (message.channel.type !== 'dm') {
    const ozelmesajkontrol = new Discord.RichEmbed()
    .setColor("#2f3136")
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setDescription('Özel mesajlarını kontrol et. :postbox:');
    message.channel.sendEmbed(ozelmesajkontrol) }
	const pingozel = new Discord.RichEmbed()
    .setColor("#2f3136")
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
.addField((ayarlar.botisim) + " | Oylama", `Bota oy vermek için [TIKLA](${link.davet})`, )
  .addField("Oy vererek bize destek olabilirsiniz", `Her 12 saate bir bize sende destek ol ${message.user.username}`);
    return message.author.sendEmbed(pingozel)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['oyla'],
  permLevel: 0,
};

exports.help = {
  name: 'oyver',
  description: 'Botun davet linkini gΓΆnderir.',
  usage: 'oyver'
};
