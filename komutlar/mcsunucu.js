const Discord = require('discord.js');
const request = require('request');
const ayarlar = require ('../ayarlar.json');
const emoji = require ('../emoji.json');

var mcPort = 25565

exports.run = (client, message, args) => {
      var url = 'http://mcapi.us/server/status?ip=' + args[0] + '&port=' + mcPort;
		let reason = args.slice(0).join(' ');
        request(url, function (err, response, body) {
            if (err) {
                console.log(err);
                return message.channel.sendEmbed(new Discord.RichEmbed().setTitle('Hata!').addField('Sunucu bilgileri alınırken beklenmedik bir hatayla karşılaştık.').setThumbnail("https://cdn.pixabay.com/photo/2013/07/12/19/25/minecraft-154749_960_720.png").setAuthor("XERESSA").setFooter('').setColor("RANDOM").setTimestamp());
            }
            body = JSON.parse(body);
            var status = `Sunucu Adı: **${body.motd}**\n\nSunucu IP: **${reason}**\n\nSunucu aktiflik durumu: ${emoji.onaylanmadi}\n\nBu IP adresi bir sunucuya ait değil veya sunucu şu anda kapalı.`;
            if (body.online) {
			status = `Sunucu Adı: **${body.motd}** \n\nSunucu IP: **${reason}**\n\nSunucu aktiflik durumu: ${emoji.onaylandi}\n\nSunucu versiyonu: **${body.server.name}**\n`;
                if (body.players.now) {
                    status += `\nAktif oyuncu sayısı: ${body.players.now}/${body.players.max}`;
					} else {
						status += 'Şu anda sunucuda kimse yok.';
                }
            }
            message.channel.sendEmbed(new Discord.RichEmbed().setDescription(status).setThumbnail('https://cdn.pixabay.com/photo/2013/07/12/19/25/minecraft-154749_960_720.png').setColor('RANDOM').setFooter('' + body.motd + ''));
        });
    }

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['mcsunucu', 'mc sunucu'],
  permLevel: 0
};

exports.help = {
  name: 'mcsunucu',
  description: 'Minecraft sunucu bilgisini verir.',
  usage: 'mcserver <sunucu IP>'
};