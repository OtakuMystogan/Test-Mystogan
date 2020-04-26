const Discord = require('discord.js');
const fs = require('fs');
const db = require('quick.db');
const ayarlar = require('../ayarlar.json');
let küfürEngel = JSON.parse(fs.readFileSync("././jsonlar/kufurEngelle.json", "utf8"));
const emoji = require('../emoji.json');

var ayarlı = emoji.onaylandi;
var ayarsız = emoji.onaylanmadi;

exports.run = async(client, message) => {
    let prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`${ayarsız} Bu komutu kullanabilmek için **Yönetici** iznine sahip olmalısın!`);


	let args = message.content.split(' ').slice(1);
	const secenekler = args.slice(0).join(' ');

	var errembed = new Discord.RichEmbed()
	.setColor("#2f3136")
	.setDescription(`Yanlış Kullanım!`)
	.addField(`Doğru Kullanım:`, `${prefix}küfür-engelle aç veya kapat`)
	if(secenekler.length < 1) return message.channel.send(errembed);
	//if(secenekler === "aç" || "kapat") return message.channel.send(errembed);
  	if(secenekler.length < 1) return message.reply(`Küfür engelleme açmak için \`${prefix}küfür-engelle aç\` kapatmak için \`${prefix}küfür-engelle kapat\``).then(m => m.delete(10000));


			if (secenekler === "aç") {
				var dembed = new Discord.RichEmbed()
			.setColor("#2f3136")
			.setDescription(`Küfür Engelleme: ${ayarlı} **Açık**`)
		message.channel.send(dembed);
     db.set(`kufurEngel_${message.guild.id}`, "aç")
		küfürEngel[message.guild.id] = {
			küfürEngel: "acik"
		  };

		  fs.writeFile("././jsonlar/kufurEngelle.json", JSON.stringify(küfürEngel), (err) => {
			if (err) console.log(err)
		  });
	};

	if (secenekler === "kapat") {
				var dembed = new Discord.RichEmbed()
			.setColor("#2f3136")
			.setDescription(`Küfür Engelleme: ${ayarsız} **Kapalı**`)
		message.channel.send(dembed);
    db.delete(`kufurEngel_${message.guild.id}`, "kapat")
		küfürEngel[message.guild.id] = {
			küfürEngel: "kapali"
		  };

		fs.writeFile("././jsonlar/kufurEngelle.json", JSON.stringify(küfürEngel), (err) => {
			if (err) console.log(err)
		  });
	};
}

	exports.conf = {
		enabled: true,
		guildOnly: false,
		aliases: ['küfür-engel'],
		permLevel: 3,
	  };
	  
	  exports.help = {
		name: 'küfür-engelle',
		description: 'Küfür engelleme sistemini açıp kapatmanızı sağlar.',
		usage: '!küfür-engelle <aç> veya <kapat>'
	  };