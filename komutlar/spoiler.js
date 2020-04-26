const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require('../ayarlar.json');

exports.run = async(client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`:warning: Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
    let vkanal9 = await db.fetch(`varsayılanK_${message.guild.id}`);
    if (!vkanal9) return;
    const vkanal31 = message.guild.channels.find('name', vkanal9);
  message.delete();
    let mesaj = args.slice(0).join(' ');
    if (mesaj.length < 1) return message.reply('Yazmam için herhangi bir şey yazmalısın.');
    const embed = new Discord.RichEmbed()
    vkanal31.send('||' + `${mesaj}` + '||');
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 3,
};

exports.help = {
  name: 'spoiler',
  description: 'İstediğiniz şeyi bota yazdırır.',
  usage: 'spoiler [yazdırmak istediğiniz şey]'
};
