const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const emoji = require('../emoji.json');

var ayarlı = emoji.onaylandi;
var ayarsız = emoji.onaylanmadi;

exports.run = (client, message, args) => {
    if (!message.member.hasPermissions("MANAGE_CHANNELS")) return message.channel.send(":no_entry: Bu komutu kullanabilmek için `Kanalları yönet` yetkisine sahip olmanız gerek")
    let kanal = message.mentions.channels.first()
    let isim = args[1];
    let guild = message.guild;
    const text = new Discord.RichEmbed()
    .setColor("#2f3136")
    .setAuthor(`${client.user.username} - Kanal Isim Değiştirme`, client.user.avatarURL)
    .setDescription(`${ayarsız} Lütfen bir yazı kanal adı girin!`)
    if (!kanal || kanal.type !== "text") return message.channel.send(text)
    const embed2 = new Discord.RichEmbed()
    .setColor("#2f3136")
    .setAuthor(`${client.user.username} - Kanal Isim Değiştirme`, client.user.avatarURL)
    .setDescription(`${ayarsız} Lütfen kanalın yeni ismini yazınız!`)
    if (!isim) return message.channel.send(embed2)

    message.guild.channels.get(`${kanal.id}`).setName(`${isim}`)
    const isimdegisti = new Discord.RichEmbed()
    .setColor("#2f3136")
    .setAuthor(`${client.user.username} - Kanal Isim Değiştirme`, client.user.avatarURL)
    .setDescription(`\`${kanal.name}\` olan kanalın yeni adı \`${isim}\` olarak değiştirildi!`)
    message.channel.send(isimdegisti)

}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['kanalnickdeğiş', 'kanal-isim-değiş'],
    permLevel: 0
};

exports.help = {
    name: 'kanalismideğiş',
    description: 'Kanalın ismini değişir',
    usage: 'kanalismideğiş [#kanal] [isim]'
};