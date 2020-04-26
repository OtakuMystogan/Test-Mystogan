const Discord = require("discord.js");
const ms = require("ms");
const ayarlar = require('../ayarlar.json')
const emoji = require('../emoji.json');
const link = require('../linkler.json');

var ayarlı = emoji.onaylandi;
var ayarsız = emoji.onaylanmadi;

module.exports.run = async (client, message, args) => {
let prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`) || ayarlar.prefix

  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  const susturkomut2 = new Discord.RichEmbed()
  .setColor("#2f3136")
  .setAuthor(`${client.user.username} - Susturma Sistemi`, client.user.avatarURL)
  .setDescription(`Komutun kullanımı; \`${prefix}/sustur <@kullanıcı> <süre> <sebep>\``)
  if(!tomute) return message.channel.send(susturkomut2);
  let reason = message.content.split(" ").slice(3).join(" ");
    const khata = new Discord.RichEmbed()
    .setColor("#2f3136")
    .setAuthor(`${client.user.username}- Susturma Sistemi`, client.user.avatarURL)
    .setDescription(`${ayarsız} ${tomute} adlı kullanıcı'yı susturamazsınız. \n\nKullanıcı neden susturulmuyor?\n\`Mesajları Yönetme\` bulunduğundan susturulamıyor.`)
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.channel.sendEmbed(khata);
  message.delete();
let muterole = message.guild.roles.find(r => r.name === "Susturulmuş");

  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "Susturulmuş",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false,
          READ_MESSAGE: true
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  let mutetime = args[1];
  const susturkomut = new Discord.RichEmbed()
  .setColor("#2f3136")
  .setAuthor(`${client.user.username} - Susturma Sistemi`, client.user.avatarURL)
  .setDescription(`Komutun kullanımı; \`${prefix}/sustur <@kullanıcı> <süre> <sebep>\``)
  if(!mutetime) return message.channel.send(susturkomut);

  await(tomute.addRole(muterole.id));
  const embed = new Discord.RichEmbed()
  .setColor("#2f3136")
  .setAuthor(`${client.user.username} - Susturma Sistemi`, client.user.avatarURL)
  .setDescription(`${tomute} adlı kullanıcı ${message.author} yetkili tarafından susturuldu!`)
  message.channel.send(embed);
  const toembed = new Discord.RichEmbed()
  .setColor("#2f3136")
  .setAuthor(`${client.user.username} - Susturma Sistemi`, client.user.avatarURL)
  .setDescription(`${tomute} adlı kullanıcı ${message.author} yetkili tarafından susturuldunuz! \nSunucu: \`${message.guild.name}\`\nSüre: \`${mutetime}\` \nSebep: \`${reason}\``)
  tomute.send(toembed)

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    const susturkaldirma = new Discord.RichEmbed()
    .setColor("#2f3136")
    .setAuthor(`${client.user.username} - Susturma Kaldırıldı`, client.user.avatarURL)
    .setDescription(`<@${tomute.id}> adlı kullanıcın susturulma süresi dolduğu için susturma kaldırıldi`)
    message.channel.send(susturkaldirma);
  }, ms(mutetime));



}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['geçici-sustur', 'gsustur', 'mute'],
  permLevel: 2,
};

exports.help = {
  name: 'sustur',
  description: 'Sureli Susturur.',
  usage: 'sustur [Kullanıcı] [Süre]'
};