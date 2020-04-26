const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require('../ayarlar.json')

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`:x: Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
  
  let prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
  const komut = args.join(" ")
/////////////////////////////////////////////////////////////////////////////////////////
  let dkanal = await db.fetch(`duyuruK_${message.guild.id}`)
  let gckanal = await db.fetch(`gckanal_${message.guild.id}`)
  let kayitk = await db.fetch(`modlogK_${message.guild.id}`)
  let otorol = await db.fetch(`otorol_${message.guild.id}`)
  let sayac = await db.fetch(`sayac_${message.guild.id}`)
  let tag = await db.fetch(`tag_${message.guild.id}`)
  let prefixx = await db.fetch(`prefix_${message.guild.id}`)
  let varsayilan = await db.fetch(`varsayilan_${message.guild.id}`)
  let ozelpmmesaj = await db.fetch(`pmgirisM_${message.guild.id}`)
  let guvenlik = await db.fetch(`guvenlik_${message.guild.id}`)
//////////////////////////////////////////////////////////////////////////////////
  
  if (!komut) return message.channel.send(`Lütfen kapatmak istediğiniz ayarı yazın. Ayarlar: \n\`- giriş-çıkış \n- logkanal\n- otorol\n- sayaç\n- duyuru-kanal\n- prefix\n- varsayılan\n- tag\n- özelpm-mesaj\``)

  
  if (komut == 'giriş-çıkış') {
    if (!gckanal) message.channel.send(`:x: Bu komut zaten ayarlanmamış.`)
    if (gckanal) message.channel.send(`\`Giriş-Çıkış kanal\` özelliği başarıyla kapatıldı. Tekrar ayarlamak için \`${prefix}giriş-çıkış\` komutunu kullanabilirsiniz.`).then(db.delete(`gckanal_${message.guild.id}`))
  }
  if (komut == 'logkanal') {
    if (!kayitk) message.channel.send(`:x: Bu komut zaten ayarlanmamış.`)
    if (kayitk) message.channel.send(`\`Kayıt kanalı\` özelliği başarıyla kapatıldı. Tekrar ayarlamak için \`${prefix}log-kanal\` komutunu kullanabilirsiniz.`).then(db.delete(`kayitlar_${message.guild.id}`))
  }
  if (komut == 'otorol') {
    if (!otorol) message.channel.send(`:x: Bu komut zaten ayarlanmamış.`)
    if (otorol) message.channel.send(`\`Otorol\` özelliği başarıyla kapatıldı. Tekrar ayarlamak için \`${prefix}otorol\` komutunu kullanabilirsiniz.`).then(db.delete(`otorol_${message.guild.id}`), db.delete(`rolK_${message.guild.id}`))
  }  
  if (komut == 'sayaç') {
    if (!sayac) message.channel.send(`:x: Bu komut zaten ayarlanmamış.`)
    if (sayac) message.channel.send(`\`Sayaç\` özelliği başarıyla kapatıldı. Tekrar ayarlamak için \`${prefix}sayaç\` komutunu kullanabilirsiniz.`).then(db.delete(`sayac_${message.guild.id}`), db.delete(`sayacK_${message.guild.id}`))
  }
  if (komut == 'duyuru-kanal') {
    if (!dkanal) message.channel.send(`:x: Bu komut zaten ayarlanmamış.`)
    if (dkanal) message.channel.send(`\`Duyuru kanal\` özelliği başarıyla kapatıldı. Tekrar ayarlamak için \`${prefix}duyuru-kanal <#kanal>\` komutunu kullanabilirsiniz.`).then(db.delete(`duyuruK_${message.guild.id}`))
  }
  if (komut == 'özelprefix', 'prefix') {
    if (!prefixx) message.channel.send(`:x: Bu komut zaten ayarlanmamış.`)
    if (prefixx) message.channel.send(`\`Prefix\` özelliği başarıyla kapatıldı. Tekrar ayarlamak için \`${prefix}prefix-ayarla <prefix>\` komutunu kullanabilirsiniz.`).then(db.delete(`prefix_${message.guild.id}`))
  }
  if (komut == 'varsayılan') {
    if (!varsayilan) message.channel.send(`:x: Bu komut zaten ayarlanmamış.`)
    if (varsayilan) message.channel.send(`\`Varsayılan kanal\` özelliği başarıyla kapatıldı. Tekrar ayarlamak için \`${prefix}varsayılan-kanal <#kanal>\` komutunu kullanabilirsiniz.`).then(db.delete(`varsayilank_${message.guild.id}`))
  }
  if (komut == 'tag') {
    if (!tag) message.channel.send(`:x: Bu komut zaten ayarlanmamış.`)
    if (tag) message.channel.send(`\`Tag\` özelliği başarıyla kapatıldı. Tekrar ayarlamak için \`${prefix}tag <tag>\` komutunu kullanabilirsiniz.`).then(db.delete(`tag_${message.guild.id}`))
  }
  if (komut == 'özelpm-mesaj') {
    if (!ozelpmmesaj) message.channel.send(`:x: Bu komut zaten ayarlanmamış.`)
    if (ozelpmmesaj) message.channel.send(`\`Özel direkt mesaj\` özelliği başarıyla kapatıldı. Tekrar ayarlamak için \`${prefix}özelpm-mesaj <mesaj>\` komutunu kullanabilirsiniz.`).then(db.delete(`pmgirisM_${message.guild.id}`))
  }
  if (komut == 'guvenlik') {
    if (!guvenlik) message.channel.send(`:x: Bu komut zaten ayarlanmamış.`)
    if (guvenlik) message.channel.send(`\`Güvenlik kanal\` özelliği başarıyla kapatıldı. Tekrar ayarlamak için \`${prefix}güvenlik <#kanal>\` komutunu kullanabilirsiniz.`).then(db.delete(`guvenlik_${message.guild.id}`))
  }
    }

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  kategori: 'ayarlar',
  permLevel: 0,
};

exports.help = {
  name: 'kapat',
  description: 'Ayarladığınız komutlardan istediğinizi kapatır.',
  usage: 'kapat <komut>'
};