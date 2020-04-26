const Discord = require("discord.js");

exports.run = async(client, message, args) => {
    const guildArray = client.guilds.array()
  while (guildArray.length) {
    const embed = new Discord.RichEmbed();
    const guilds = guildArray.splice(0,25);
    for (const guild of guilds) {
      embed.addField(`___`,`${guild.name} / ${guild.id} / ${guild.memberCount} \n${guild.owner}`);
      embed.setColor("#36393F");
      embed.setTitle('Sunucu Adı / ID / Kişi Sayısı / Sunucu Sahibi');
      embed.setFooter(`Şu an ${client.guilds.size} sunucu da bulunuyorum`);
    }
    message.channel.send({embed: embed});
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 4,
};

exports.help = {
  name: 'sunucular',
  description: 'sunuculistesi',
  usage: 'sunuculistesi'
};