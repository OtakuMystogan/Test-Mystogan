const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const emoji = require('../emoji.json');
const link = require('../linkler.json');

exports.run = async(client, message, params) => {
  let prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
    const embedyardim = new Discord.RichEmbed()
    //.setAuthor(client.user.username, client.user.avatarURL)
    .setColor("#2f3136")
    .addField(`${emoji.kullanıcı} **Kullanıcı Komutları**`, `
    \`${prefix}öneri\` = Sunucu sahibi'ne veya yetkililere öneri bildirirsiniz.
    \`${prefix}sunucu-tanıt\` = Bot'un discord sunucusunda kendi discord sunucunuzu tanıtırsınız.
    \`${prefix}sunucu-bilgi\` = Bulunduğunuz sunucu hakkında bilgi verir. 
    \`${prefix}kullanıcı-bilgi\` = Seçtiğiniz veya kendi bilgilerinizi gösterir.
    \`${prefix}şifre <uzunluk>\` = Rastgele şifre oluşturur.
    \`${prefix}avatar\` = Avatarınızı veya başka kullanıcının avatarını listeler.
    \`${prefix}mcsunucu <sunucuip>\` = Belirlenen sunucu hakkında bilgi verir.
    \`${prefix}premium\` = Premium özelliği hakkında bilgi verir.
    \`${prefix}havadurumu <şehir>\` = Belirlenen şehirin hava durum bilgisini atar.
    \`${prefix}rolbilgi <rol>\` = Seçilen rol hakkında bilgi verir.
    \`${prefix}yetkilerim\` = Sunucudaki yetkilerini listeler.
    \`${prefix}asci <mesaj>\` = Yazılan yazıyı ascii olarak yazar.
    \`${prefix}roller\` = Bulunduğunuz sunucunun rollerini gösterir.
    \`${prefix}emojiler\` = Bulunduğunuz sunucunun emojilerini gösterir.
    \`${prefix}online\` = Bulunduğunuz sunucunun kullanıcı durumunu gösterir.
`)
    .addField(`${emoji.kullanıcı} **Kullanıcı Komutları #2**`, `
    \`${prefix}link\` = Bot'un davet,destek sunucu,youtube kanalını gösterir.
`) 
    .addField(`${emoji.müzik} **Müzik Komutları**`, `
    \`${prefix}çal\` = İstediğiniz şarkıyı çalar.
    \`${prefix}durdur\` = Çalan şarkıyı kapatır.
    \`${prefix}geç\` = Bulunan şarkıya geçer.
    \`${prefix}duraklat\` = Çalan şarkıyı durdurur.
    \`${prefix}devam\` = Durdurulan şarkıyı devam ettirir.
    \`${prefix}sıra\` = Sıradaki çarşıyı gösterir.
    \`${prefix}çalan\` = Çalan şarkıyı gösterir.
`)
    .addField(`${emoji.bot} **Bot Komutları**`, `
    \`${prefix}yardım\` = BOT komutlarını atar.
    \`${prefix}bilgi\` = BOT kendisi hakkında bilgi verir.
    \`${prefix}ping\` = BOT gecikme süresini söyler.
    \`${prefix}davet\` = BOT davet linkini atar.
    \`${prefix}şikayet\` = Botta bulunan bir şikayetinizi bot sahibine bildirir.
    \`${prefix}bug\` = Botta bulunan bir bugu bot sahibine bildirir.
`)
    .addField(`:link: Linkler:`,`> [Davet Et](${link.davet}) | [Destek Sunucusu](${link.desteksunucu}) | [Site](${link.site}) | [Youtube](${link.youtube}) | [Oy Ver](${link.vote})`)
    message.channel.sendEmbed(embedyardim) 
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
};

exports.help = {
  name: 'kullanıcı',
  description: 'Tüm komutları gösterir.',
  usage: 'kullanıcı [komut]'
};
