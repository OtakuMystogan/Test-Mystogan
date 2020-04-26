const Discord = require('discord.js');
const moment = require('moment');
const ayarlar = require('../ayarlar.json');
const emoji = require('../emoji.json');
const db = require('quick.db')
require('moment-duration-format');
const link = require('../linkler.json');

exports.run = async (client, message, params) => {
let prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
 const aylar = {
    "01": "Ocak",
    "02": "Şubat",
    "03": "Mart",
    "04": "Nisan",
    "05": "Mayıs",
    "06": "Haziran",
    "07": "Temmuz",
    "08": "Ağustos",
    "09": "Eylül",
    "10": "Ekim",
    "11": "Kasım",
    "12": "Aralık"
  }

  var konum = ''
        if(message.guild.region === "russia") {
            var konum = 'Rusya :flag_ru:'
        }
        if(message.guild.region === "us-west") {
            var konum = 'Batı Amerika :flag_us: '
        }
        if(message.guild.region === "us-south") {
            var konum = 'Güney Amerika :flag_us: '
        }
        if(message.guild.region === "us-east") {
            var konum = 'Doğu Amerika :flag_us: '
        }
        if(message.guild.region === "us-central") {
            var konum = 'Amerika :flag_us: '
        }
        if(message.guild.region === "brazil") {
            var konum = 'Brezilya :flag_br:'
        }
        if(message.guild.region === "singapore") {
            var konum = 'Singapur :flag_sg:'
        }
        if(message.guild.region === "sydney") {
            var konum = 'Sidney :flag_sh:'
        }
        if(message.guild.region === "europe") {
            var konum = 'Avrupa :flag_eu:'
        }
        if(message.guild.region === "hongkong") {
            var konum = 'Hong Kong :flag_hk: '
        }
        if(message.guild.region === "japan") {
            var konum = 'Japonya :flag_jp:'
        }
       if (message.guild.region === "south-africa") {
         var konum = 'Güney Afrika :south-africa:'
       }
       if (message.guild.region === "india") {
         var konum = 'India :flag_in:'
       }
    let pre = await db.fetch(`pre_${message.guild.id}`)
  let preYazi;
  if (pre == null) preYazi = `${emoji.onaylanmadi} Aktif Değil!`
  if (pre == 'aktif') preYazi = `${emoji.onaylandi} Aktif!`
  if (pre == 'deaktif') preYazi = `${emoji.onaylanmadi} Deaktif!`
   const embed = new Discord.RichEmbed()
   .setColor("#2f3136")
   .setThumbnail(message.guild.iconURL)
   .setAuthor(`${message.guild.name} - Sunucu Bilgisi`, message.guild.iconURL)
   .addField("Sunucu İsim", message.guild.name, true)
   .addField("Sunucu ID", message.guild.id, true)
   .addField("Sunucu Sahibi / ID", `${message.guild.owner} / ${message.guild.owner.id}`, true)
   .addField("Sunucu Bölgesi", konum || "Bilinmiyor", true)
   .addField(`Ön-Ek(Prefix);`, `\`${prefix ? prefix : "Orjinal Prefix"}\``,true)
   .addField(`Premium Özellik \n(${prefix}premium)`, `${preYazi}`, true)
   .addField('Üyeler ['+message.guild.memberCount+']', `Çevrimiçi: \`${message.guild.members.filter(m => m.user.presence.status === "online").size}\` \nRahatsız Etmeyin: \`${message.guild.members.filter(m => m.user.presence.status === "dnd").size}\` \nBoşta: \`${message.guild.members.filter(m => m.user.presence.status === "idle").size}\` \nÇevrimdışı: \`${message.guild.members.filter(m => m.user.presence.status === "offline").size}\` \nBot: \`${message.guild.members.filter(m => m.user.bot).size}\``, true)
   .addField('Kanallar ['+message.guild.channels.size+']', `📝Yazı: \`${message.guild.channels.filter(c => c.type === "text").size}\` \n🔊Sesli: \`${message.guild.channels.filter(c => c.type === "voice").size}\` \n📋Kategori: \`${message.guild.channels.filter(c => c.type === "category").size}\` \n💤AFK Kanalı: ${message.guild.afkChannel ? message.guild.afkChannel : "Bulunmuyor"}`, true)
   .addField(`Roller [${message.guild.roles.size}]`,`\`${prefix}roller\` yazarak rollerin tamamını görebilirsin.`,true)
   .addField(`Emojiler [${message.guild.emojis.size}]`,`\`${prefix}emojiler\` yazarak emojilerin tamamını görebilirsin.`,true)
   //.addField('Emojiler ['+message.guild.emojis.size+']', `${message.guild.emojis.map(e => e).join(' **|** ') || "Bulunmuyor"}`, true)
   .addField("Oluşturulma Tarihi", `${moment(message.guild.createdAt).format('DD')} ${aylar[moment(message.guild.createdAt).format('MM')]} ${moment(message.guild.createdAt).format('YYYY HH:mm:ss')}`, true)
   .addField(`:link: Linkler:`,`> [Davet Et](${link.davet}) | [Destek Sunucusu](${link.desteksunucu}) | [Site](${link.site}) | [Youtube](${link.youtube}) | [Oy Ver](${link.vote})`)
   message.channel.send({embed: embed});
 };

exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ['sunucubilgi'],
 permLevel: 0,
};

exports.help = {
  name: "sunucu-bilgi", //Komutun ismini belirtiyoruz
  description: "Bulunulan sunucu hakkında bilgi verir.", //Komutun açıklamasını yazıyoruz
  usage: "sunucu-bilgi" //Komutun Doğru Kullanım'ını yazıyoruz
};
