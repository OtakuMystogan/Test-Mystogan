const Discord = require('discord.js');
const { stripIndents } = require('common-tags');
const ayarlar = require('../ayarlar.json');
const emoji = require('../emoji.json');

var ayarlı = emoji.onaylandi;
var ayarsız = emoji.onaylanmadi;

exports.run = (client, msg, args) => {


let x;
    let x2;
    let x3;
    let x4;
    let x5;
    let x6;
    let x7;
    let x8;
    let x9;
    let x10;
    let x11;
    
    //yönetici
    if (msg.member.hasPermission("ADMINISTRATOR")) x = `${ayarlı}`
    if (!msg.member.hasPermission("ADMINISTRATOR")) x = `${ayarsız}`
    
    //Denetim kaydı
    if (msg.member.hasPermission("VIEW_AUDIT_LOG")) x2 = `${ayarlı}`
    if (!msg.member.hasPermission("VIEW_AUDIT_LOG")) x2 = `${ayarsız}`
    
    //Sunucuyu yönet
    if (msg.member.hasPermission("MANAGE_GUILD")) x3 = `${ayarlı}`
    if (!msg.member.hasPermission("MANAGE_GUILD")) x3 = `${ayarsız}`
    
    //Rolleri yönet
    if (msg.member.hasPermission("MANAGE_ROLES")) x4 = `${ayarlı}`
    if (!msg.member.hasPermission("MANAGE_ROLES")) x4 = `${ayarsız}`
    
    //Kanalları yönet
    if (msg.member.hasPermission("MANAGE_CHANNELS")) x5 = `${ayarlı}`
    if (!msg.member.hasPermission("MANAGE_CHANNELS")) x5 = `${ayarsız}`
    
    //üyeleri at
    if (msg.member.hasPermission("KICK_MEMBERS")) x6 = `${ayarlı}`
    if (!msg.member.hasPermission("KICK_MEMBERS")) x6 = `${ayarsız}`
    
    //üyeleri yasakla
    if (msg.member.hasPermission("BAN_MEMBERS")) x7 = `${ayarlı}`
    if (!msg.member.hasPermission("BAN_MEMBERS")) x7 = `${ayarsız}`
    
    //mesajları yönet
    if (msg.member.hasPermission("MANAGE_MESSAGES")) x8 = `${ayarlı}`
    if (!msg.member.hasPermission("MANAGE_MESSAGES")) x8 = `${ayarsız}`
    
    //kullanıcı adlarını yönet
    if (msg.member.hasPermission("MANAGE_NICKNAMES")) x9 = `${ayarlı}`
    if (!msg.member.hasPermission("MANAGE_NICKNAMES")) x9 = `${ayarsız}`
    
    //emojileri yönet
    if (msg.member.hasPermission("MANAGE_EMOJIS")) x10 = `${ayarlı}`
    if (!msg.member.hasPermission("MANAGE_EMOJIS")) x10 = `${ayarsız}`
    
    //webhookları yönet
    if (msg.member.hasPermission("MANAGE_WEBHOOKS")) x11 = `${ayarlı}`
    if (!msg.member.hasPermission("MANAGE_WEBHOOKS")) x11 = `${ayarsız}`
    
    
    const embed = new Discord.RichEmbed()
    //.setAuthor(client.user.username, client.user.avatarURL)
    .setColor("#2f3136")
    .setAuthor(`${client.user.username} | Yetkilerim`, client.user.avatarURL)
    .addField(`${emoji.bilgi} **YETKILERIM**`,`

    ${x} Yönetici
    ${x2} Denetim Kaydını Görüntüle
    ${x3} Sunucuyu Yönet
    ${x4} Rolleri Yönet
    ${x5} Kanalları Yönet
    ${x6} Üyeleri At
    ${x7} Üyeleri Yasakla
    ${x8} Mesajları Yönet
    ${x9} Kullanıcı Adlarını Yönet
    ${x10} Emojileri Yönet
    ${x11} Webhook'ları Yönet

    ${emoji.bilgi} Başında ${ayarlı} olanlar o yetkiye sahip olunduğunu gösterir.
    ${emoji.bilgi} Başında ${ayarsız} olanlar o yetkiye sahip olmadığını gösterir.`)
    .setFooter(`${msg.author.username} tarafından istendi`, msg.author.avatarURL)
  
  msg.channel.send(embed)
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['izinlerim'],
  permLevel: 0,
    kategori: "kullanıcı"
};

exports.help = {
  name: 'yetkilerim',
  description: 'Komutu kullandığınız sunucudaki yetkilerinizi/izinlerinizi gösterir.',
  usage: 'yetkilerim'
};