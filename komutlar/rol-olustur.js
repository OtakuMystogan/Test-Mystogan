const Discord = require('discord.js')

exports.run = async (client, message, args) => {
if (!message.member.hasPermission("MANAGE_ROLES")) 
  return message.channel.send(":no_entry: Bu komutu kullanabilmek için `Rolleri yönet` yetkisine sahip olmanız gerek")
  
let guild = message.guild;
let isim = args.slice(0).join(" ");
if (!isim) 
  return message.channel.send("Bir isim girmeniz gerek")

guild.createRole({
  name: isim
})
  .then(role => message.channel.send(`\`${role.name}\` adında yeni rol oluşturuldu`))
  .catch(console.error)
  
}

exports.conf = {
  aliases: [ 'rololuştur' , 'rol-oluştur'],
  enabled: true,
  guildOnly: false,
  permLevel: 0
};

exports.help = {
  name: 'createrole',
  description: 'Yeni rol oluşturur',
  usage: 'rololuştur <isim>',
};