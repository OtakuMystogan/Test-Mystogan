const Discord = require("discord.js");
const db = require('quick.db');

exports.run = async (client, message, args) => {


  let kanal = message.guild.channels.get(args.join(' ')) || message.mentions.channels.first()
  if (kanal === message.channel.id) return message.channel.send("Girdiğiniz ID bir kanala ait değil!")
  if (!kanal) {
    message.channel.send("Bir kanalı etiketle ya da ID'sini gir.")
  } else {
    db.set(`oneri_${message.guild.id}`, kanal.id)
  }
  
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["önerikanalayarla", "onerikanalayarla", "onerikanal", "oneri-kanal", "öneri-kanal"],
  permLevel: 3,
};

exports.help = {
  name: "önerikanal",
  description: "s",
  usage: "s"
};