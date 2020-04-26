const Discord = require('discord.js');
const superagent = require('superagent');
const ayarlar = require('../ayarlar.json')
const emoji = require('../emoji.json');

var ayarlı = emoji.onaylandi;
var ayarsız = emoji.onaylanmadi;

exports.run = (client, msg, args) => {
  if (msg.channel.nsfw === true) {
    superagent.get('https://nekobot.xyz/api/image')
    .query({ type: 'pgif'})
    .end((err, response) => {
      var embed = new Discord.RichEmbed()
      .setAuthor(`${client.user.username} - NSFW `, client.user.avatarURL)
      .setColor("#2f3136")
      .setImage(`${response.body.message}`)
      .setFooter(`${msg.author.tag} tarafından istenildi.`, msg.author.avatarURL)
      msg.channel.send(embed);
      //msg.channel.send({ file: response.body.message });
    });
  } else {
		var nsfwdegil = new Discord.RichEmbed()
      .setAuthor(`${client.user.username} - NSFW `, client.user.avatarURL)
      .setDescription(`${ayarsız} Bu kanal bir NSFW kanalı değil!`)
    msg.channel.send(nsfwdegil)
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['porno','4k'],
  permLevel: 0
};

exports.help = {
  name: 'pgif',
  description: 'Botun pingini gösterir',
  usage: 'pgif'
};