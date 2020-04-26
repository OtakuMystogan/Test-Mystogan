const chalk = require('chalk');
const moment = require('moment');
const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const fs = require('fs');
const db = require('quick.db');
var prefix = ayarlar.prefix;

module.exports = async client => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: Aktif, Komutlar yüklendi!`);
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: ${client.user.username} ismi ile giriş yapıldı!`);
  
  client.user.setStatus('online');


  //🔸 
var oyun = [
  `${prefix}yardım`,
  `Sunucu: ${client.guilds.size}`,
  `Kullanıcı: ${client.users.size}`
  ];

setInterval(function() {

  var random = Math.floor(Math.random()*(oyun.length-0+1)+0);
  
  //client.user.setActivity(oyun[random]);
  //client.user.setGame(oyun[random]); //client.user.setGame(oyun[random], "https://www.twitch.tv/leadertr01");

  client.user.setGame(`${prefix}yardım | Sunucu: ${client.guilds.size} | Kullanıcı: ${client.users.size}`)
  }, 7000);
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: Oyun ismi ayarlandı!`);
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: Şu an ` + client.channels.size + ` adet kanala, ` + client.guilds.size + ` adet sunucuya ve ` + client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString() + ` kullanıcıya hizmet veriliyor!`);

};