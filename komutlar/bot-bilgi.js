const Discord = require('discord.js');
const moment = require('moment');
const { version } = require("discord.js");
const os = require('os');
let cpuStat = require("cpu-stat");
const db = require('quick.db');
const fs = require('fs');
const { stripIndents } = require('common-tags');
require('moment-duration-format');

const ayarlar = require('../ayarlar.json');
const link = require('../linkler.json');

exports.run = async(client, message, args) => {
 const aylar = {
    "01": "Ocak",
    "02": "Şubat",
    "03": "Mart",
    "04": "Nisan",
    "05": "Mayıs",
    "06": "Haziran",
    "07": "Temmuz",
    "08": "Ağustos",
    "09": "Eylül",
    "10": "Ekim",
    "11": "Kasım",
    "12": "Aralık"
  }  
    let cpuLol;
    cpuStat.usagePercent(function(err, percent, seconds) {
        if (err) {
            return console.log(err);
        }
        const duration = moment.duration(client.uptime).format(" D [gün] \n H [saat] \n m [dakika] \n s [saniye]");
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);

  
        const embedStats = new Discord.RichEmbed()
        .setColor("#2f3136")
        //.setAuthor(client.user.username, client.user.avatarURL)
        .addField("Kullanıcı Adı:", `${client.user.tag}`, true)
        .addField("ID:",`${client.user.id}`, true)
        .addField("Gecikme:",`${client.ping} MS`, true)
        .addField("Orjinal Prefix:", `${ayarlar.prefix}`, true)
        .addField("Bellek Kullanımı:", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}`, true)
        .addField("Çalışma Süresi:", `${duration}`, true)
        .addField(`Sunucu`, `${client.guilds.size}`,true)
        .addField(`Kullanıcı`, `${client.users.size}`,true)
        .addField(`Kanal`, `${client.channels.size}`,true)
        //.addField("Sunucu, Kullanıcı, Kanal",`${client.guilds.size} , ${client.users.size} , ${client.channels.size}`,true)
        .addField("Komut Sayısı", `${files.length}`, true)
        .addField("Kuruluş Tarihi:", `${moment(client.user.createdAt).format('DD')} ${aylar[moment(client.user.createdAt).format('MM')]} ${moment(client.user.createdAt).format('YYYY')}`, true)
        .addField("Kütüphabe",`Discord.js: v${version} \nNode: ${process.version}`,true)
        .addField("Sahibim:",`<@${ayarlar.sahip}>`, true)
        .addField(`:link: Linkler:`,`> [Davet Et](${link.davet}) | [Destek Sunucusu](${link.desteksunucu}) | [Site](${link.site}) | [Youtube](${link.youtube}) | [Oy Ver](${link.vote})`)
        .setThumbnail(client.user.avatarURL)
        message.channel.send(embedStats)
    });
})};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['i','botbilgi', 'bilgi'],
    permLevel: 0,
  };
  
  exports.help = {
    name: 'istatistik',
    category: "bot",
    description: 'Botun istatistiklerini gösterir.',
    usage: 'istatistik'
  };