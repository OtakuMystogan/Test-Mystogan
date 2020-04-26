const Discord = require('discord.js');
const db = require('quick.db');
const fs = require('fs');
const ayarlar = require('../ayarlar.json');
const emoji = require('../emoji.json');

var ayarlı = emoji.onaylandi;
var ayarsız = emoji.onaylanmadi;

module.exports.run = async (Octopus, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`:x: Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
  
  let prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`) || ayarlar.prefix

  if (args == 0) return message.channel.send(`${ayarsız} Anket başlaması için soru yazmalısın`)

    let dkanal9 = await db.fetch(`duyuruK_${message.guild.id}`);
  if (!dkanal9) return;
  const dkanal31 = message.guild.channels.find('name', dkanal9);
  
  let embed = new Discord.RichEmbed()
  .setTitle(`Anket: ${args}`.split(',').join(' '))
  .setColor("#2f3136")
  .setDescription(`\`${message.author.username}\` adlı yetkili anketi başlattı.`);

  dkanal31.send(embed)

  .then(function (message, str) {
       message.react("✅")
       message.react("⛔")
     }).catch(function() {
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [ ],
  permLevel: 0,
};

exports.help = {
  name: 'anket', 
  description: "Anket başlatır", 
  usage: 'anket <mesaj>' 
};