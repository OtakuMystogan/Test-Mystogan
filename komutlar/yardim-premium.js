const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const emoji = require('../emoji.json');
const link = require('../linkler.json');

exports.run = async(client, message, params) => {
  let prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
    const embedyardim = new Discord.RichEmbed()
    //.setAuthor(client.user.username, client.user.avatarURL)
    .setColor("#2f3136")
    .addField(`${emoji.premium} **Premium Özelliği Hakkında Bilgi**`, `
    
    ${emoji.bilgi} Premium Özelliği Nasıl Alabilirim?

    Satın almak için [Destek Sunucusu](${ayarlar.sunucudavet}) gelmelisiniz.

    :credit_card: Ödeme Türü: \`İninal & Papara\`
    :money_with_wings: Fiyat: \`5 TL\`
    

    ${emoji.bilgi} Premium özelliği aktif edildiğinde hangi komutlara aktif olucak?

    \`${prefix}sesli-sustur\` = Belirlenen kullanıcıyı süreli olarak seslide susturur.
    \`${prefix}dm <@kişi> <mesaj>\` = Belirlenen kullanıcıya özel mesaj atar.
    \`${prefix}dmherkes <mesaj>\` = Discord sunucusunda bulunan herkese mesaj atar.    

    > Şuanlık bu kadar komut var ama yakında bir sürü komut eklencektir.
    
`)
    .addField(`:link: Linkler:`,`> [Davet Et](${link.davet}) | [Destek Sunucusu](${link.desteksunucu}) | [Site](${link.site}) | [Youtube](${link.youtube}) | [Oy Ver](${link.vote})`)
    message.channel.sendEmbed(embedyardim) 
};

exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
};

exports.help = {
  name: 'premium',
  description: 'Tüm komutları gösterir.',
  usage: 'premium [komut]'
};
