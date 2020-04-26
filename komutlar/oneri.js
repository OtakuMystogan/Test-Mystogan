const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const emoji = require('../emoji.json');
const db = require('quick.db');

var ayarlı = emoji.onaylandi;
var ayarsız = emoji.onaylanmadi;

exports.run = async(client, message, args) => {

	var öneri = args.slice(0).join(' ');
	
		var embed = new Discord.RichEmbed()
			.setColor("#2f3136")
			.setTimestamp()
      .setTitle(`${emoji.onaylandi} ONERI BILDIRIM`)
			.addField(`Kullanıcı Adı:`, message.author.tag, true)
			.addField(`ID:`, message.author.id, true)
      //.addField(`Sunucu Adı:`, message.guild.name)
      //.addField(`Sunucu Sahibi:`, message.guild.owner)
      .addField(`Öneri Mesajı`, öneri)
  if (öneri.length > 1024) return message.channel.send("API izin vermediği için mesajınızı gönderemiyorum.")
  if (öneri.length < 1) {
    message.channel.send(`$ayarsız} Lütfen önerinizi giriniz.`)
  } else {
    const a = await db.fetch(`oneri_${message.guild.id}`)
    const b = client.channels.get(a)
      if (!a) {
        message.channel.send(`${ayarsız} Lütfen önce bir kanal ayarla.`)
      } else {
        b.send(embed)
      }
  }
  
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["öner"], 
  permLevel: 0 ,
};

exports.help = {
  name: 'öneri', 
  description: "bot hakkındaki önerilerinizi bot sahiplerine ulaştırır", 
  usage: 'öneri <mesaj>' 
};
