const Discord = require("discord.js");
const superagent = require("superagent");
const ayarlar = require("../ayarlar.json")
const link = require('../linkler.json');
const emoji = require('../emoji.json');
const moment = require("moment");

exports.run = (client, message, args) => {
  
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
 
  var Rol = message.mentions.roles.first() || message.guild.roles.find(Rol => Rol.name === args.slice().join(' ')) || message.guild.roles.find(Rol => Rol.id === args[0])
  
  const rolYok = new Discord.RichEmbed()
  .setColor("#2f3136")
  .setDescription('Bir rol etiketleyiniz veya isim/ID giriniz!')
  
  const rolBulunamadı = new Discord.RichEmbed()
  .setColor("#2f3136")
  .setDescription('Böyle bir rol bulunamadı!')
  
  if (!message.mentions.roles.first()) if (!args[0]) message.channel.send(rolYok)
  if (message.mentions.roles.first()) {
    Rol = message.mentions.roles.first()
    var Renk = Rol.hexColor || 'Rol, sıradan renkte.'
    if (Rol.hexColor == '#000000') Renk = 'Rol, sıradan renkte.'
    if (Rol.hexColor !== '#000000') Renk = `(Hex) ${Rol.hexColor}`
    
    var setColor = Rol.hexColor || 'Rol, sıradan renkte.'
    if (Rol.hexColor == '#000000') setColor = 'c7ccd1'
    if (Rol.hexColor !== '#000000') setColor = Rol.hexColor
    
    var rolEtiketlenmesi = Rol.mentionable
    if (rolEtiketlenmesi == true) rolEtiketlenmesi = `${emoji.onaylandi} Evet`
    if (rolEtiketlenmesi == false) rolEtiketlenmesi = `${emoji.onaylanmadi} Hayır`
    const Mesaj = new Discord.RichEmbed()
    .setAuthor(`${client.user.username} - ${Rol.name} / ${Rol.id} Rol Bilgisi `, client.user.avatarURL)
    .setColor("#2f3136")
    .addField(`Rol Adı:`, `${Rol.name}`,true)
    .addField(`Rol ID:`, `${Rol.id}`,true)
    .addField(`Rol Sırası:`,`Yukarıdan ${Number(message.guild.roles.size) - Number(Rol.position)}; \nAşağıdan ${Rol.position}; \nsırada bulunmakta`,true)
    .addField(`Etiket Durumu;`, `${rolEtiketlenmesi}`,true)
    .addField(`Rol Rengi;`,`${Renk}`,true)
    .addField(`Role sahip kaç kullanıcı bulunuyor?`,`${Rol.members.size}`, true)
    .addField(`Rol Oluşturulma Tarihi;`,`${moment(Rol.createdAt).format('DD')} ${aylar[moment(Rol.createdAt).format('MM')]} ${moment(Rol.createdAt).format('YYYY HH:mm:ss')}`,true)

    message.channel.send(Mesaj)
  } else {
    if (args[0]) {
      Rol = message.guild.roles.find(Rol => Rol.id === args[0])
      if (!Rol) Rol = message.guild.roles.find(Rol => Rol.name === args.slice().join(' ')) 
      if (!Rol) message.channel.send(rolBulunamadı)
      
      var rolEtiketlenmesi = Rol.mentionable
      if (rolEtiketlenmesi == true) rolEtiketlenmesi = `${emoji.onaylandi} Evet`
      if (rolEtiketlenmesi == false) rolEtiketlenmesi = `${emoji.onaylanmadi} Hayır`
      
      var üyeMisin = message.member.roles.some(R => R.name === Rol.name)
      if (üyeMisin == true) üyeMisin = `${emoji.onaylandi} Evet`
      if (üyeMisin == false) üyeMisin = `${emoji.onaylanmadi} Hayır`
      
      var Renk = Rol.hexColor || '#c7ccd1'
      if (Rol.hexColor == '#000000') Renk = 'Rol, sıradan renkte.'
      if (Rol.hexColor !== '#000000') Renk = `(Hex) ${Rol.hexColor}`
      var renkliDynoLogo = `https://color.dyno.gg/color/${Rol.hexColor.replace('#', '')}/960x960.png` || ''
      if (Rol.hexColor == '#000000') renkliDynoLogo = ''
      if (Rol.hexColor !== '#000000') renkliDynoLogo = `https://color.dyno.gg/color/${Rol.hexColor.replace('#', '')}/960x960.png`
      
      var setColor = Rol.hexColor || 'Rol, sıradan renkte.'
      if (Rol.hexColor == '#000000') setColor = 'c7ccd1'
      if (Rol.hexColor !== '#000000') setColor = Rol.hexColor
  
      const Mesaj = new Discord.RichEmbed()
      .setAuthor(`${client.user.username} - ${Rol.name} / ${Rol.id} Rol Bilgisi `, client.user.avatarURL)
      .setColor("#2f3136")
      .addField(`Rol Adı:`, `${Rol.name}`,true)
      .addField(`Rol ID:`, `${Rol.id}`,true)
      .addField(`Rol Sırası:`,`Yukarıdan ${Number(message.guild.roles.size) - Number(Rol.position)}; \nAşağıdan ${Rol.position}; \nsırada bulunmakta`,true)
      .addField(`Etiket Durumu;`, `${rolEtiketlenmesi}`,true)
      .addField(`Rol Rengi;`,`${Renk}`,true)
      .addField(`Role sahip kaç kullanıcı bulunuyor?`,`${Rol.members.size}`, true)
      .addField(`Rol Oluşturulma Tarihi;`,`${moment(Rol.createdAt).format('DD')} ${aylar[moment(Rol.createdAt).format('MM')]} ${moment(Rol.createdAt).format('YYYY HH:mm:ss')}`,true)
      .addField(`Bu rol sahip misin?`, `${üyeMisin}`, true)
      if (Rol) {
        message.channel.send(Mesaj)
      }
    }
  }
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['rolbilgi'],
  permLevel: 0
}

exports.help = {
  name: 'rol-bilgi'
}