const Discord = require('discord.js')
const fs = require('fs');
const ms = require("ms")
const db = require('quick.db')
const ayarlar = require('../ayarlar.json')
const emoji = require('../emoji.json');
const link = require('../linkler.json');

var ayarlı = emoji.onaylandi;
var ayarsız = emoji.onaylanmadi;


exports.run = async (client, message, args) => {
  const DBL = require('dblapi.js')
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NTU0NDY5NjMyMzQ0MDY3MCIsImJvdCI6dHJ1ZSwiaWF0IjoxNTc2NjAwMTg2fQ.NiejC2oCa2Z9SJA736-1R8GmNpcecmOhq1SVUN7zMS4', client) 

  let prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`) || ayarlar.prefix;
  dbl.hasVoted(message.author.id).then(voted => {
      if(voted) {
        if (!message.guild) {
        const ozelmesajuyari = new Discord.RichEmbed()
        .setColor(0xFF0000)
        .setTimestamp()
        .setAuthor(message.author.username, message.author.avatarURL)
        .addField(':warning: Uyarı :warning:', `${prefix}sunucutanıt adlı komutu özel mesajlarda kullanamazsın.`)
        return message.author.sendEmbed(ozelmesajuyari); }
        if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("Bu Komutu kullanmanız için `Sunucu_Yönet` Yetkisine sahip olmalısınız.")
        let kullanildii = JSON.parse(fs.readFileSync('./jsonlar/sunucutanit.json', 'utf8'));
      if (!kullanildii[message.guild.id]) kullanildii[message.guild.id] = {
        gunlukkullanim: 0
      }
      if (kullanildii[message.guild.id].gunlukkullanim == 0)
      {
            const embed = new Discord.RichEmbed()
      .addField(`${ayarlı} **BAŞARILI** ${ayarlı}`, `
      [Sunucu burada tanıtıldı!](${ayarlar.sunucudavet})
      6 saat Sonra sunucunuzu Tekrardan Tanıtabilirsiniz.
      Sunucunu tanıtabilmek için [beni ekle!](${ayarlar.botdavet})`)
      .setColor("#2f3136")
     message.channel.sendEmbed(embed);
        message.channel.createInvite({maxAge: 0}).then((invite) => {
            const embed = new Discord.RichEmbed()
                .addField(` Sunucu Sahibi`, message.author.tag, true)
                .addField(` Sunucu İsmi`, message.guild.name, true)
          .addField(` Sunucudakı Üye Sayısı`, message.guild.members.size, true)
          .addField(` Sunucu Davet Linki`, invite.url, true)
                .setColor("#2f3136")
          .setThumbnail(message.guild.iconURL)
           client.channels.get('655789788112224286').send(embed)
                });
      kullanildii[message.guild.id].gunlukkullanim = 1

      fs.writeFile('./jsonlar/sunucutanit.json', JSON.stringify(kullanildii), (err) => {
          if (err) console.error(err)
        })
      return
      }
      setTimeout(async() => {
        kullanildii[message.guild.id].gunlukkullanim = 0
        fs.writeFile('./jsonlar/sunucutanit.json', JSON.stringify(kullanildii), (err) => {
          if (err) console.error(err)
        })
      }, ms('360min'));

      if (kullanildii[message.guild.id].gunlukkullanim == 1)
      {
      message.channel.send({embed: {
          description: `**BAŞARISIZ TANITIM**:sparkles:  \n\nBu komut zaten kullanılmış!\n\nSunucunu 6 saate 1 defa tanıtabilirsin! :flag_tr:  \n\n[Destek Sunucusu](${link.desteksunucu}) \n[Beni Sunucuna Ekleyebilmek İçin Tıklaman Yeterli!](${link.davet})`
                }});
  }
     } else {
        message.channel.send({embed: {
          description: `**OYVER**:sparkles:  \n\nBu komutu kullanmak için bot'a vote vermelisin \n[Bana Tıkla ve Bot'a Oy Ver](${link.vote})\n\n[Destek Sunucusu](${link.desteksunucu}) \n[Beni Sunucuna Ekleyebilmek İçin Tıklaman Yeterli!](${link.davet})`
                }});
      }      
  });
}
                                       
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['sunucutanıt', 'sunucu-tanıt'],
    permLevel: 2,
}

exports.help = {
    name: 'sunucunutanıt',
    description: 'Sunuzunuzu Tanıtmak İçin En Uygun Kod!',
    usage: 'sunucutanıt'
}