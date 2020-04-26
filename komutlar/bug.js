const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const emoji = require('../emoji.json');

exports.run = function(client, message, args) {

	var bug = args.slice(0).join(' ');
	var guildID = (ayarlar.sunucuID);
	var channelID = (ayarlar.bosID);
	
	if (!bug){
		return message.reply("Bir mesaj belirtin! Doğru kullanım: **" + (ayarlar.prefix) + "bug <mesaj>**");
	} else {
		message.delete()
		var embed = new Discord.RichEmbed()
			.setColor("#2f3136")
			.setTimestamp()
      .setTitle(`${emoji.onaylandi} BUG BILDIRIM`)
			.addField(`Kullanıcı Adı:`, message.author.tag, true)
			.addField(`ID:`, message.author.id, true)
      .addField(`Sunucu Adı:`, message.guild.name)
      .addField(`Sunucu Sahibi:`, message.guild.owner)
    .addField(`Bug Mesajı`, bug)
		
		client.guilds.get(guildID).channels.get(channelID).send(embed);
		message.author.send(`> ${emoji.onaylandi} Bug bildiriminiz alınmıştır! Teşekkür ederiz.`);
	};


};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['bug'], 
  permLevel: 0,
};

exports.help = {
  name: 'bug', 
  description: "bot hakkındaki buglarınızı bot sahiplerine ulaştırır", 
  usage: 'bug <mesaj>' 
};
