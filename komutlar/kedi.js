const commando = require('discord.js-commando');
const snekfetch = require('snekfetch');

exports.run = async(client, msg, args) => {
		try {
			const { body } = await snekfetch
				.get('http://aws.random.cat/meow');
                let embed = {
                    color: 3447003,
                    description: `Meowwww 🐱`,
                    image: {
                        url: body.file,
                    }
                  };
                  return msg.channel.send({embed});
		} catch (err) {
			return msg.say(`${client.config.customEmojis.basarisiz} Opss bir hata var galiba! \`${err.message}\`. Lütfen daha sonra tekrar dene!`);
		}
    };
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['kedi-foto', 'kedi'],
  permLevel: 0,
};

exports.help = {
  name: 'kedi',
  description: 'kedi gif',
  usage: 'kedigif'
};