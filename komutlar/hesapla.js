const Discord = require('discord.js');
const math = require('math-expression-evaluator')
const stripIndents = require('common-tags').stripIndents
const ayarlar = require('../ayarlar.json');


exports.run = async(client, message, args) => {
  let prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`) || ayarlar.prefix;
    var soru = args.join(' ');
        const embed = new Discord.RichEmbed()
        .setAuthor(`${client.user.username} - Hesap Makinesi`, client.user.avatarURL)
        .setDescription(`Lütfen bir işlem girin! \nÖrnek: \`${prefix}hesapla 10+10\``)
        .setFooter(`${message.author.username} tarafından istendi`, message.author.avatarURL)
    if(!soru) return message.channel.send(embed)
    else { 
      let cevap;
        try {
            cevap = math.eval(soru)
        } catch(err) {
            message.channel.send(`HATA: \n**${err ? err : "Bilinmiyor"}**`)
        }

        const embed = new Discord.RichEmbed()
        .setColor("#2f3136")
        .addField('» İşlem', soru ? soru : "İşlem Bulunamadı")
        .addField('» Sonuç', cevap ? cevap : "Hesaplanamadı")
        message.channel.send(embed)
    }


};  

exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: ["matematik"],
  permLevel: `Yetki gerekmiyor.` 
};

exports.help = {
  name: 'hesapla',
  category: "kullanıcı",
  description: 'Belirtilen işlemi yapar.',
  usage: 'r?hesapla <işlem>'
};