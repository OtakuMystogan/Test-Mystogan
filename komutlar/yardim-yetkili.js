const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const emoji = require('../emoji.json');
const link = require('../linkler.json');

exports.run = async(client, message, params) => {
  let prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
    const embedyardim = new Discord.RichEmbed()
    //.setAuthor(client.user.username, client.user.avatarURL)
    .setColor("#2f3136")
    .addField(`${emoji.yetkili} **Moderasyon Komutları**`,`
    \`${prefix}ban <@kullanıcı> <sebep>\` = Seçilen kullanıcıyı sunucudan banlar. 
    \`${prefix}temizle <1-100>\` = Belirtilen miktarda mesajı silir (MAX 100).
    \`${prefix}kilit <süre>\` = Bulunduğunuz kanalı kilitler.
    \`${prefix}yavaşmod <1-120>\` = Sohbete yazma sınır ekler.
    \`${prefix}sayaç <sayı> <#kanal>\` = Sunucunuza belli kişi hedefi koyarak onun sayaçını yapmaya yarar. 
    \`${prefix}giriş-çıkış <#kanal>\` = Giriş-Çıkış kanalını belirler.
    \`${prefix}kayıt-kanal <#kanal>\` = Log Kanalı belirler.
    \`${prefix}otorol <@rol> <#kanal>\` = Belirlediğin rolü verir,belirlediğin kanalda gözükür.
    \`${prefix}duyuru-kanal <#kanal>\` = Duyuru kanalı belirler.
    \`${prefix}duyuru <mesaj>\` = Belirlenen kanalda duyuru yapar.
    \`${prefix}varsayılan-kanal <#kanal>\` = Varsayılan kanalı belirler.
    \`${prefix}küfür-engelle <aç/kapat>\` = Varsayılan kanalda küfürler engeller.
    \`${prefix}reklam-engelle <aç/kapat>\` = Varsayılan kanalda linkleri engeller.
`)
    .addField(`${emoji.yetkili} **Moderasyon Komutları #2**`,`
    \`${prefix}prefix-ayarla <prefix>\` = Sizin sunucunuzdaki bota ait prefixi değiştirir.
    \`${prefix}özelpm-mesaj <mesaj>\` = Yeni gelen kullanıcıya özel mesaj gönderir.
    \`${prefix}anket <mesaj>\` = Duyuru kanalında anket yapar.
    \`${prefix}spoiler <mesaj>\` = Varsayılan kanalda bot adına spoiler paylaşır.
    \`${prefix}sunucutanıt\` = Sunucunuzu destek sunucusunda tanıtır.
    \`${prefix}komut-ekle\` = Sunucuza özel komut ekler.
    \`${prefix}komut-sil\` = Eklediğiniz komutu siler.
    \`${prefix}komut-liste\` = Eklediğiniz komutları gösterir.
    \`${prefix}isim-değiştir <@kullanıcı> <yeni isim>\` = Belirlene kullanıcının adını değiştirir.
    \`${prefix}rol-oluştur <@roladı>\` = Rol oluşturur.
    \`${prefix}rol-al <@kullanıcı> <@alınıcak rol>\` = Belirlenen kullanıcıya seçilen rolünü alır.
    \`${prefix}rol-ver <@kullanıcı> <@verilicek rol> \`= Belirlenen kullanıcıya seçilen rolü verir.
    \`${prefix}öneri-kanal <#kanal>\` = Belirlenen kanala önerileri gönderir.
    \`${prefix}reklamtarama\` = Kullanıcıların oynuyor ve isminde reklam var ise tespit eder.
`)
    .addField(`${emoji.yetkili} **Moderasyon Komutları #3**`,`
    \`${prefix}güvenlik <#kanal>\` = Kullanıcıların güvenli olduğunu gösteren kanalı ayarlar.
    \`${prefix}sustur <@kullanıcı> <süre> <sebep>\` = Seçilen kullanıcıyı susturur.
    \`${prefix}sustur-kaldır <@kullanıcı> <sebep>\` = Seçilen kullanıcının susturulmasını kaldırır.
    \`${prefix}yaz <mesaj>\` = Botun adına yazacağınız mesaj.
`)
    .addField(`${emoji.yetkili} **Moderasyon Komutları(Premium)**`,`
    \`${prefix}sesli-sustur\` = Belirlenen kullanıcıyı süreli olarak seslide susturur.
    \`${prefix}dm <@kişi> <mesaj>\` = Belirlenen kullanıcıya özel mesaj atar.
    \`${prefix}dmherkes <mesaj>\` = Discord sunucusunda bulunan herkese mesaj atar.  
`)
   .addField(`:link: Linkler:`,`> [Davet Et](${link.davet}) | [Destek Sunucusu](${link.desteksunucu}) | [Site](${link.site}) | [Youtube](${link.youtube}) | [Oy Ver](${link.vote})`)
    message.channel.sendEmbed(embedyardim) 
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['admin', 'ayarlar-yardım'],
  permLevel: 0,
};

exports.help = {
  name: 'yetkili',
  description: 'Tüm komutları gösterir.',
  usage: 'yetkili [komut]'
};
