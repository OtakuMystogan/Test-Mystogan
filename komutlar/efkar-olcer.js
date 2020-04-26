const Discord = require('discord.js');
exports.run = (client, message) => {
      const random = Math.floor(Math.random() * 100) + 1
      message.channel.send(`Efkarınız %${random} Efkar `)
   } 
 
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ['efkar-ölçer'],
 permLevel: 0,
}
exports.help = {
 name: 'efkarölçer',
 description: 'Efkarınızı ölçer',
 usage: 'efkarölçer'
};
