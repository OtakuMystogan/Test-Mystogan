const Discord = require('discord.js')
const db = require('quick.db');
const fs = require('fs');
const ayarlar = require('../ayarlar.json');
const emoji = require('../emoji.json');

var ayarlı = emoji.onaylandi;
var ayarsız = emoji.onaylanmadi;

exports.run = async(client, message, args) => {

  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${ayarsız} Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
  
  let dkanal9 = await db.fetch(`duyuruK_${message.guild.id}`);
  if (!dkanal9) return;
  const dkanal31 = message.guild.channels.find('name', dkanal9);

	var duyurumesaj = args.slice(0).join(' ');
	message.delete();
	if (!duyurumesaj){
		return message.reply("Bir mesaj belirtin! Doğru kullanım: **" + (ayarlar.prefix) + "duyuru <mesaj>**");
	} else {

  
		//var embed = new Discord.RichEmbed()
			//.setColor("RANDOM")
      //.setTitle(duyurumesaj)
			//.setDescription(`@everyone, @here`)
    
    
		//dkanal31.send(embed);
    dkanal31.send(duyurumesaj)
		var dembed = new Discord.RichEmbed()
			.setColor("#2f3136")
      .setAuthor(`${client.user.username} - Duyuru Sistemi`, client.user.avatarURL)
			.setDescription(emoji.onaylandi + ` Duyuru ${dkanal31} kanalında yapıldı`)
		message.channel.send(dembed);
	};


};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["duyuru-yap"], 
  permLevel: 0,
};

exports.help = {
  name: 'duyuru', 
  description: "bot hakkındaki önerilerinizi bot sahiplerine ulaştırır", 
  usage: 'duyuru <mesaj>' 
};
