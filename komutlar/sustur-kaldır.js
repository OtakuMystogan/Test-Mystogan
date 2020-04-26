const Discord = require("discord.js")
const ms = require("ms")
const ayarlar = require('../ayarlar.json')
const emoji = require('../emoji.json');
const link = require('../linkler.json');

var ayarlı = emoji.onaylandi;
var ayarsız = emoji.onaylanmadi;


module.exports.run = async (client, message, args) => {

    if (!message.member.hasPermissions ('KICK_MEMBERS')) return message.channel.send("Yapmak İçin Kick Members Yetkisine Sahip Olmalısın.")
    let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    const khata = new Discord.RichEmbed()
    .setColor("#2f3136")
    .setAuthor(`${client.user.username} - Susturma Sistemi`, client.user.avatarURL)
    .setDescription(`${ayarsız} Lütfen kullanıcı adı girin!`)
    if (!user) return message.channel.sendEmbed(khata);

    let reason = message.content.split(" ").slice(2).join(" ");

    const shata = new Discord.RichEmbed()
    .setColor("#2f3136")
    .setAuthor(`${client.user.username} - Susturma Sistemi`, client.user.avatarURL)
    .setDescription(`${ayarsız} ${user} adlı kullanıcı zaten susturulmamış!`)
    if (!user.roles.find(`name`, "Susturulmuş")) return message.channel.sendEmbed(shata);
    message.delete();
let unmuterole = message.guild.roles.find(r => r.name === "Susturulmuş");

  if(!unmuterole){
    try{
      unmuterole = await message.guild.createRole({
        name: "Susturulmuş",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(unmuterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false,
          READ_MESSAGE: true
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }

  await(user.removeRole(unmuterole.id));
  const embed = new Discord.RichEmbed()
  .setColor("#2f3136")
  .setAuthor(`${client.user.username} - Susturma Sistemi`, client.user.avatarURL)
  .setDescription(`${ayarlı} ${user} adlı kullanıcı ${message.author} yetkili tarafından susturulması kaldırıldı!`)
  message.channel.send(embed);
  const toembed = new Discord.RichEmbed()
  .setColor("#2f3136")
  .setAuthor(`${client.user.username} - Susturma Sistemi`, client.user.avatarURL)
  .setDescription(`${ayarlı} ${user} adlı kullanıcı ${message.author} yetkili tarafından susturulmanızı kaldırıldı! \nSunucu: \`${message.guild.name}\`\nSebep: \`${reason}\``)
  user.send(toembed)
}


exports.conf = {
    aliases: ['sustur-kaldır','susturkaldır'],
    permLevel: 2,
};

exports.help = {
    name: "unmute",
    description: "Etiketlenen Kişinin Mutesini Geri Alır",
    usage:  "unmute [kullanıcı] [sebep]",
}