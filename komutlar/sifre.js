const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const generator = require('generate-password');
const link = require('../linkler.json');

exports.run = function(client, message, args) {
    var uzunluk = args.slice(0).join(' ');

    if (!uzunluk) return message.reply('Bir uzunluk belirt. **Doğru Kullanım**: ' + (ayarlar.prefix) + 'şifre <uzunluk>')



    var password = generator.generate({
        length: uzunluk,
        numbers: true,
    })

    //message.author.send((ayarlar.botisim) + ' Oluşturduğu Şifre ❯ **' + password + '**');
		var sifre = new Discord.RichEmbed()
      .setAuthor(`${client.user.username} - Şifre Oluşturucu `, client.user.avatarURL)
			.setColor("#2f3136")
      .setDescription('**❯** ' + password)
			.setTimestamp()
      .addField(`:link: Linkler:`,`> [Davet Et](${link.davet}) | [Destek Sunucusu](${link.desteksunucu}) | [Site](${link.site}) | [Youtube](${link.youtube}) | [Oy Ver](${link.vote})`)
    message.author.send(sifre)
		var mesajgonderme = new Discord.RichEmbed()
      .setAuthor(`${client.user.username} - Şifre Oluşturucu `, client.user.avatarURL)
			.setColor("#2f3136")
      .setAuthor(message.author.username, message.author.avatarURL)
      .setDescription('Şifre Oluşturuldu :exclamation: Özel mesajlarını kontrol et. :postbox:')
      .addField(`:link: Linkler:`,`> [Davet Et](${link.davet}) | [Destek Sunucusu](${link.desteksunucu}) | [Site](${link.site}) | [Youtube](${link.youtube}) | [Oy Ver](${link.vote})`)
			.setTimestamp()
    message.channel.send(mesajgonderme)
};  

exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: [],
  permLevel: 0 
};

exports.help = {
  name: 'şifre', 
  description: 'Rastgele bir şifre oluşturur.',
  usage: 'şifre <uzunluk>'
};