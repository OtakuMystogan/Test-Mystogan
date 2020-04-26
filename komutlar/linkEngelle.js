const Discord = require('discord.js');
const fs = require('fs');
const db = require('quick.db');
const ayarlar = require('../ayarlar.json');
let linkEngel = JSON.parse(fs.readFileSync("././jsonlar/linkEngelle.json", "utf8"));
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
	.addField(`Doğru Kullanım:`, `${prefix}reklam-engelle aç veya kapat`)
	if(secenekler.length < 1) return message.channel.send(errembed);
	//if(secenekler === "aç" || "kapat") return message.channel.send(errembed);
  	if(secenekler.length < 1) return message.reply(`Reklam Engelleme Açmak İçin \`${prefix}reklam-engelle aç\` kapatmak için \`${prefix}reklam-engelle kapat\``).then(m => m.delete(10000));


			if (secenekler === "aç") {
				var dembed = new Discord.RichEmbed()
			.setColor("#2f3136")
			.setDescription(`Reklam Engelleme: ${ayarlı} **Açık**`)
		message.channel.send(dembed);
     db.set(`reklamEngel_${message.guild.id}`, "aç")
		linkEngel[message.guild.id] = {
			linkEngel: "acik"
		  };

		  fs.writeFile("././jsonlar/linkEngelle.json", JSON.stringify(linkEngel), (err) => {
			if (err) console.log(err)
		  });
	};

	if (secenekler === "kapat") {
				var dembed = new Discord.RichEmbed()
			.setColor("#2f3136")
			.setDescription(`Reklam Engelleme: ${ayarsız} **Kapalı**`)
		message.channel.send(dembed);
    db.delete(`reklamEngel_${message.guild.id}`, "kapat")
		linkEngel[message.guild.id] = {
			linkEngel: "kapali"
		  };

		fs.writeFile("././jsonlar/linkEngelle.json", JSON.stringify(linkEngel), (err) => {
			if (err) console.log(err)
		  });
	};
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['reklam-engelle'],
  permLevel: 3,
  };

  exports.help = {
  name: 'reklam-engel',
  description: 'Küfür engelleme sistemini açıp kapatmanızı sağlar.',
  usage: 'reklam-engel <aç> veya <kapat>'
  };