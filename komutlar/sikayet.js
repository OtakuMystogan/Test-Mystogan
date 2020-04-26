const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const emoji = require('../emoji.json');

exports.run = function(client, message, args) {

	var sikayet = args.slice(0).join(' ');
	var guildID = (ayarlar.sunucuid);
	var channelID = (ayarlar.bosID);
	
	if (!sikayet){
		return message.reply("Bir mesaj belirtin! Doğru kullanım: **" + (ayarlar.prefix) + "şikayet <mesaj>**");
	} else {
		message.delete()
		var embed = new Discord.RichEmbed()
			.setColor("#2f3136")
			.setTimestamp()
      .setTitle(`${emoji.onaylandi} SIKAYET BILDIRIM`)
			.addField(`Kullanıcı Adı:`, message.author.tag, true)
			.addField(`ID:`, message.author.id, true)
      .addField(`Sunucu Adı:`, message.guild.name)
      .addField(`Sunucu Sahibi:`, message.guild.owner)
      .addField(`Şikayet Mesajı`, sikayet)
		
		client.guilds.get(guildID).channels.get(channelID).send(embed);
		message.author.send(`> ${emoji.onaylandi} Şikayet bildiriminiz alınmıştır! Teşekkür ederiz.`);
	};


};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["şikayet"], 
  permLevel: 0,
};

exports.help = {
  name: 'şikayet', 
  description: "bot hakkındaki şikayetlerinizi bot sahiplerine ulaştırır", 
  usage: 'şikayet <mesaj>' 
};
