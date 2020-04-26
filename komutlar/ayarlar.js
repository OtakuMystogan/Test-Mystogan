const Discord = require('discord.js');
const db = require('quick.db');
const fs = require('fs');
const ayarlars = require('../ayarlar.json');
const emoji = require('../emoji.json');

var ayarlı = emoji.onaylandi;
var ayarsız = emoji.onaylanmadi;

exports.run = async(client, message, args, member) => {
 let prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`) || ayarlars.prefix
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`${ayarsız} Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
  //
  let modKanal = await db.fetch(`modlogK_${message.guild.id}`);
  const logkanal = message.guild.channels.find('name', modKanal);
  let modKanalyazi;
  if (modKanal == null) modKanalyazi = `${ayarsız} **Ayarlanmamış**`
  else modKanalyazi = `${logkanal}`
  //
  let hgKanal = await db.fetch(`gckanal_${message.guild.id}`);
  const hgkanal = message.guild.channels.find('name', hgKanal);
  let hgKanalyazi;
  if (hgKanal == null) hgKanalyazi = `${ayarsız} **Ayarlanmamış**`
  else hgKanalyazi = `${hgkanal}`
  //
  let otorolKanal = await db.fetch(`rolK_${message.guild.id}`);
  const rolkanal = message.guild.channels.find('name', otorolKanal);
  let otorolKanalyazi;
  if (otorolKanal == null) otorolKanalyazi = `${ayarsız} **Ayarlanmamış**`
  else otorolKanalyazi = `${rolkanal}`
  //
  let sayac = await db.fetch(`sayac_${message.guild.id}`);
  let sayacs;
  if (sayac == null) sayacs = `${ayarsız} **Ayarlanmamış**`
  else sayacs = `${sayac}`
  //
  let sayacKanal = await db.fetch(`sayacK_${message.guild.id}`);
  const skanal = message.guild.channels.find('name', sayacKanal);
  let sayacKanalyazi;
  if (sayacKanal == null) sayacKanalyazi = `${ayarsız} **Ayarlanmamış**`
  else sayacKanalyazi = `${skanal}`
  //
  let tag = await db.fetch(`tag_${message.guild.id}`)
  let tagYazi;
  if (tag == null) tagYazi = `${ayarsız} **Ayarlanmamış**`
  else tagYazi=  `${tag}`
  //    
  let otorol = await db.fetch(`otorol_${message.guild.id}`)
  const otorol2 = message.guild.roles.find('name', otorol);
  let autorole;
  if (otorol == null) autorole = `${ayarsız} **Ayarlanmamış**`
  else autorole = `${otorol2}`
  //
  let kufurengel = await db.fetch(`kufurEngel_${message.guild.id}`)
  let kufurYazi;
  if (kufurengel == null) kufurYazi = `${ayarsız} **Ayarlanmamış**`
  if (kufurengel == 'aç') kufurYazi = `${ayarlı} **Açık!**`
  else kufurengel = `${kufurYazi}`
  //
  let reklamengel = await db.fetch(`reklamEngel_${message.guild.id}`)
  let reklamYazi;
  if (reklamengel == null) reklamYazi = `${ayarsız} **Ayarlanmamış**`
  if (reklamengel == 'aç') reklamYazi = `${ayarlı} **Açık!**`
  else reklamengel = `${reklamYazi}`
  //
  let duyuru = await db.fetch(`duyuruK_${message.guild.id}`)
  const dkanal = message.guild.channels.find('name', duyuru);
  let duyuruk;
  if (duyuru == null) duyuruk = `${ayarsız} **Ayarlanmamış**`
  else duyuruk = `${dkanal}`
  //
  let varsayilan = await db.fetch(`varsayılanK_${message.guild.id}`)
  const vkanal = message.guild.channels.find('name', varsayilan);
  let varsayilank;
  if (varsayilan == null) varsayilank = `${ayarsız} **Ayarlanmamış**`
  else varsayilank = `${vkanal}`
  //
  let guvenlik = await db.fetch(`guvenlik_${message.guild.id}`)
  const gkanal = message.guild.channels.find('name', guvenlik);
  let guvenlikK;
  if (guvenlik == null) guvenlikK = `${ayarsız} **Ayarlanmamış**`
  else guvenlikK = `${gkanal}`
  //
  let ozelprefix = await db.fetch(`prefix_${message.guild.id}`)
  let ozelprefixx;
  if (ozelprefix == null) ozelprefixx = `${ayarsız} **Ayarlanmamış**`
  else ozelprefixx = `\`${ozelprefix}\``
  //
  let ozelpm = await db.fetch(`pmgirisM_${message.guild.id}`)
  let ozelpmm;
  if (ozelpm == null) ozelpmm = `${ayarsız} **Ayarlanmamış**`
  else ozelpmm = `\`\`\`${ozelpm}\`\`\``
  //
  const ayarlar = new Discord.RichEmbed()
  .setColor("#2f3136")
  .setTitle(`\`${message.guild.name}\` Sunucu Ayarları`)
  .addField("Varsayılan Kanal", `${varsayilank}`, true)
  .addField("Giriş-Çıkış Kanalı", `${hgKanalyazi}`, true)
  .addField("Log Kanalı", `${modKanalyazi}`, true)
  .addField("Duyuru Kanal", `${duyuruk}`, true)
  .addField("Otorol Kanal", `${otorolKanalyazi}`, true)
  .addField("Otorol Bilgi", `${autorole}`, true)
  .addField("Sayaç Kanal", `${sayacKanalyazi}`, true)
  .addField("Sayaç Hedef Sayısı", `${sayacs}`, true)
  .addField("Sunucu Tag Sistemi", `${tagYazi}`, true)
  .addField("Özel Prefix Sistemi", `${ozelprefixx}`, true)
  .addField("Küfür Filtresi",  `${kufurYazi}`, true)
  .addField("Reklam Filtresi", `${reklamYazi}`, true) 
  .addField("Güvenlik Kanal", `${guvenlikK}`, true)
  .addField("Giriş Direkt Mesaj", `${ozelpmm}`, true)
  .setThumbnail(message.guild.iconURL)
  .setFooter(`${client.user.username} | Ayarlar - ${prefix}kapat <ayar adı>`, client.user.avatarURL)
  message.channel.send(ayarlar);
};
	
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  kategori: 'ayarlar',
  permLevel: 0,
 };
 
 exports.help = {
 name: 'ayarlar',
 description: 'Bot İçin Sunucuyu Ayarlarını Gösterir.',
 usage: 'ayarlar'
 }