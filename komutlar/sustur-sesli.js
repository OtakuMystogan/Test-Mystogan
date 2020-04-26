const Discord = require('discord.js');
const request = require('node-superfetch');
const db = require('quick.db');
const ayarlar = require("../ayarlar.json")
const emoji = require('../emoji.json');
const ms = require("ms");
const link = require('../linkler.json');

var ayarlı = emoji.onaylandi;
var ayarsız = emoji.onaylanmadi;

exports.run = (client, message, args) => {
   db.fetch(`pre_${message.guild.id}`).then(async i => {
    if (i == 'aktif') {
    if (!message.member.hasPermissions("MUTE_MEMBERS")) return message.channel.send(":no_entry: Bu komutu kullanabilmek için `Üyeleri sustur` yetkisine sahip olmanız gerek.")
    let kullanici = message.mentions.members.first()
    
    let süre = args[1]
    if (!süre) return message.reply("Süre belirtmelisin.")
    if (!kullanici) return message.channel.send("Kimi susturacağını belirtmedin.")
    kullanici.setMute(true, `Susturan yetkili: ${message.author.tag} - Susturma süresi: ${süre}ms`)
        .then(() =>
            message.channel.send(`${kullanici} \`${süre}\`**ms** ses kanallarında susturuldu.`))
        .catch(console.error);
        setTimeout(() => {

        kullanici.setMute(false,`Süresi dolduğu için susturması kaldırıldı.`)
        message.channel.send(`${kullanici} Süresi dolduğu için mikrafonu açıldı. `)

    }, ms(süre))
}
  else if (!i || i == 'deaktif') {
      const premiumdeaktif = new Discord.RichEmbed()
      .setTitle(`${emoji.premium} PREMIUM ÖZELLIGI`)
      .addField("Bu sunucuda ``premium özelliği`` bulunmuyor!",`[Destek Sunucusu](${link.desteksunucu})`)
      message.channel.send(premiumdeaktif)
    }
});
}
  
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['sesli-sustur'],
    permLevel: 0
};

exports.help = {
    name: 'mic-kapat',
    description: 'Ping was here',
    usage: ""
};