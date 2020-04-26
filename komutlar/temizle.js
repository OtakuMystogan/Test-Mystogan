const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const emoji = require('../emoji.json');

var ayarlı = emoji.onaylandi;
var ayarsız = emoji.onaylanmadi;

exports.run = function(client, message, args) {

  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(":warning: Bu komutu kullanabilmek için **\`Mesajları Yönetme\` yetkisine sahip değilsin**");
  if(!args[0]) return message.channel.send(`${message.author} ${ayarsız} Lütfen bir sayı gir!`);
  if(args >= 101) return message.channel.send(`${ayarsız} En fazla \`100\` mesaj silebilirsin`)
  message.channel.bulkDelete(args[0]).then(() => {
    message.channel.send(new Discord.RichEmbed().setColor("#2f3136").setDescription(`${ayarlı} Başarıyla **${args[0]}** adet mesaj silindi.`)).then(msg => msg.delete(5000));

  });
}


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['sil'],
  permLevel: 2,
};

exports.help = {
  name: 'temizle',
  description: 'Belirlenen miktar mesajı siler.',
  usage: 'temizle <temizlenecek mesaj sayısı>'
};
