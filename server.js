/////////////////////////////////////////////

const YouTube = require('simple-youtube-api');
const { Client } = require('discord.js');
const ayarlar = require('./ayarlar.json');
const emoji = require('./emoji.json');
const generator = require('generate-password');

const Jimp = require('jimp');
const db = require('quick.db');
const Discord = require('discord.js');
const client = new Discord.Client();
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
require('./util/eventLoader')(client);
/////////////////////////////////////////////

var ayarlı = emoji.onaylandi;
var ayarsız = emoji.onaylanmadi;

var anabotlog = "697222461531488298";

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});
client.login(ayarlar.token);


//////////////////////////////ETIKET PREFİX//////////////////////////////
client.on('message', async msg => {
  let prefix = await require('quick.db').fetch(`prefix_${msg.guild.id}`) || ayarlar.prefix
  if (msg.content.toLowerCase() == `<@${ayarlar.botid}>`) 
      msg.channel.send(`Prefix (Ön Ek): \`${prefix}\``);
});
//////////////////////////////ETIKET PREFİX//////////////////////////////

//////////////////////////////GÜVENLİK SİSTEMİ//////////////////////////////
client.on('guildMemberAdd',async member => {
  let user = client.users.get(member.id);
  let chan = client.channels.get(db.fetch(`guvenlik_${member.guild.id}`))
       const Canvas = require('canvas')
       const canvas = Canvas.createCanvas(360,100);
       const ctx = canvas.getContext('2d');
 
  const resim1 = await Canvas.loadImage('https://cdn.discordapp.com/attachments/591299755976425493/614151181752860672/yhosgeldirrn.png')
    const resim2 = await Canvas.loadImage('https://cdn.discordapp.com/attachments/591299755976425493/614164419768877056/yhosgeldirrn.png')
    const kurulus = new Date().getTime() - user.createdAt.getTime();
    const gün = moment.duration(kurulus).format("D")   
    var kontrol;
      if (kurulus > 2629800000) kontrol = resim2
    if (kurulus < 2629800000) kontrol = resim1

       const background = await Canvas.loadImage('https://cdn.discordapp.com/attachments/591299755976425493/614164413318168606/Adsz.png');
       ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  


  const avatar = await Canvas.loadImage(member.user.displayAvatarURL);
  ctx.drawImage(kontrol,0,0,canvas.width, canvas.height)
  ctx.beginPath();
    ctx.lineWidth = 4;
  ctx.fill()
    ctx.lineWidth = 4;
  ctx.arc(180, 46, 36, 0, 2 * Math.PI);
    ctx.clip();
  ctx.drawImage(avatar, 143,10, 73, 72  );

  
       const attachment = new Discord.Attachment(canvas.toBuffer(), 'STARKs-güvenlik.png');
    chan.send(attachment)
});
//////////////////////////////GÜVENLİK SİSTEMİ//////////////////////////////


//////////////////////////////GİRİŞ-ÇIKIŞ//////////////////////////////
client.on('guildCreate', async guild => { 
  let prefix = await require('quick.db').fetch(`prefix_${guild.id}`) || ayarlar.prefix
    let channel = client.channels.get(anabotlog)
    const embed = new Discord.RichEmbed()
        .setColor("GREEN")
        .setTitle(`${ayarlı} **${guild.name}** adlı sunucuya giriş yaptım!`)
        .setThumbnail(guild.iconURL)
        .addField(`Sunucu Sahibi`, `${guild.owner.user.tag} / ${guild.owner.user.id}`)
        .addField(`Sunucu ID`, `${guild.id}`, true)
        .addField(`Toplam Kullanıcı`, `${guild.memberCount}`, true)
        .addField(`Toplam Kanal`, `${guild.channels.size}`,true)
        .addField(`Prefix`,`${prefix}`, true)
    channel.send(embed);
});
client.on('guildDelete', async guild => { 
    let prefix = await require('quick.db').fetch(`prefix_${guild.id}`) || ayarlar.prefix
    let channel = client.channels.get(anabotlog)
    const embed = new Discord.RichEmbed()
        .setColor("RED")
        .setTitle(`${ayarsız} **${guild.name}** adlı sunucudan çıkış yaptım!`)
        .setThumbnail(guild.iconURL)
        .addField(`Sunucu Sahibi`, `${guild.owner.user.tag} / ${guild.owner.user.id}`)
        .addField(`Sunucu ID`, `${guild.id}`, true)
        .addField(`Toplam Kullanıcı`, `${guild.memberCount}`, true)
        .addField(`Toplam Kanal`, `${guild.channels.size}`,true)
        .addField(`Prefix`,`${prefix}`, true)
    channel.send(embed);
});
//////////////////////////////GİRİŞ-ÇIKIŞ//////////////////////////////


//////////////////////////////BOT-DM///////////////////////////////
client.on("message", message => {
    const dmchannel = client.channels.get(anabotlog)
    if (message.channel.type === "dm") {
        if (message.author.bot) return;
const embed = new Discord.RichEmbed()
      .setTitle(`${ayarlı} ${ayarlar.botisim} yeni mesaj geldi!`)
      .addField(`Gönderen`, `${message.author.tag} / ${message.author.id}`)
      .addField(`Gelen Mesaj`, message.content)
      .setColor("BLUE")
      .setTimestamp()
      dmchannel.send(embed);
};
});
//////////////////////////////BOT-DM///////////////////////////////


//////////////////////////////EVERYONE-ENGEL///////////////////////////////
let hereEngel = JSON.parse(fs.readFileSync("././jsonlar/hereEngelle.json", "utf8"));
client.on("message", msg => {
  if (!msg.guild) return;
  if (!hereEngel[msg.guild.id]) return;
  if (hereEngel[msg.guild.id].hereEngel === 'kapali') return;
    if (hereEngel[msg.guild.id].hereEngel=== 'acik') {
      const here = ["@here", "@everyone"];
  if (here.some(word => msg.content.toLowerCase().includes(word)) ) {
    if (!msg.member.hasPermission("ADMINISTRATOR")) {
      msg.delete()
       msg.channel.send(`<@${msg.author.id}>`).then(message => message.delete());
        var e = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor("Everyone ve Here Engeli!")
        .setDescription(`Bu sunucuda Everyone ve Here yasak!`)
        msg.channel.send(e).then(message => message.delete(5000));
    }
}
    }
});
//////////////////////////////EVERYONE-ENGEL///////////////////////////////

//////////////////////////////OTOROL///////////////////////////////
client.on('guildMemberAdd', async member => {
  
  let rol = await db.fetch(`otorol_${member.guild.id}`);
  const rol2 = member.guild.roles.find('name', rol);
  
  const rolk = await db.fetch(`rolK_${member.guild.id}`);
  if(!rolk) return;
  const rolk2 = member.guild.channels.find('name', rolk)
  
  member.addRole(rol2);
  rolk2.send(`${ayarlı} \`${member.user.tag}\` adlı kullanıcıya \`${rol2.name}\` rolü verildi.`)
});
//////////////////////////////OTOROL///////////////////////////////

//////////////////////////////ETIKETLEME///////////////////////////////
client.on('message', async msg => {
  let prefix = await require('quick.db').fetch(`prefix_${msg.guild.id}`) || ayarlar.prefix
  if (msg.content.toLowerCase() == `<@!${ayarlar.botid}>`) 
      msg.channel.send(`> Prefix (Ön Ek): \`${prefix}\``);
});
//////////////////////////////ETIKETLEME///////////////////////////////

//////////////////////////////OZEL-KOMUT///////////////////////////////
client.on('message', async msg => {
  let ozelkomut = await db.fetch(`sunucuKomut_${msg.guild.id}`);
  let ozelkomutYazi;
  if (ozelkomut == null) ozelkomutYazi = 'Burayı silme yoksa hatalı olur'
  else ozelkomutYazi = ''+ ozelkomut +''
  if (msg.content.toLowerCase() === `${ozelkomutYazi}`) {
      let mesaj = await db.fetch(`sunucuMesaj_${msg.guild.id}`);
  let mesajYazi;
  if (mesaj == null) mesajYazi = 'Burayı silme yoksa hatalı olur'
  else mesajYazi = ''+ mesaj +''
    msg.channel.send(mesajYazi)
  }
});
//////////////////////////////OZEL-KOMUT///////////////////////////////

//////////////////////////////TAG+PM-MESAJ///////////////////////////////
client.on('guildMemberAdd', async member => {
  
  let tag = await db.fetch(`tag_${member.guild.id}`);
  let tagyazi;
  if (tag == null) tagyazi = member.setNickname(`${member.user.username}`)
  else tagyazi = member.setNickname(`${tag} | ${member.user.username}`)
});

client.on('guildMemberAdd', async member => {
  
  let dkanal9 = await db.fetch(`pmgirisM_${member.guild.id}`);
  if (!dkanal9) return;
  const dkanal31 = member.send(new Discord.RichEmbed().setColor(0x00AE86).setTitle(dkanal9))
  dkanal31.send()
});
//////////////////////////////TAG+PM-MESAJ///////////////////////////////

//////////////////////////////GIRIS-CIKIS///////////////////////////////
client.on("guildMemberAdd", async member => {
  
  let gck = await db.fetch(`gckanal_${member.guild.id}`);
  if (!gck) return;
  const gck31 = member.guild.channels.find('name', gck)
  let username = member.user.username;
  setTimeout(function () {
   const giris = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTitle(`📥 \`${member.user.tag}\` Adlı kullanıcı sunucuya katıldı!`, member.user.avatarURL )
    gck31.send(giris);
  }, 1000);
  setTimeout(function () {
  }, 10000);
})

client.on("guildMemberRemove", async member => {
 
  let gck = await db.fetch(`gckanal_${member.guild.id}`);
  if (!gck) return;
  const gck31 = member.guild.channels.find('name', gck)
  let username = member.user.username;          
  setTimeout(function () {
   const cikis = new Discord.RichEmbed()
      .setColor("RED")
    .setTitle(`📤 \`${member.user.tag}\` Adlı kullanıcı sunucudan ayrıldı!`, member.user.avatarURL)
    gck31.send(cikis);
  }, 1000);
  setTimeout(function () {
  }, 10000);
})         
//////////////////////////////GIRIS-CIKIS///////////////////////////////

//////////////////////////////SAYAC///////////////////////////////
client.on("guildMemberAdd", async member => {
  
  let sayac = await db.fetch(`sayac_${member.guild.id}`);
  let skanal9 = await db.fetch(`sayacK_${member.guild.id}`);
  if (!skanal9) return;
  const skanal31 = member.guild.channels.find('name', skanal9)
  skanal31.send(`📥 \`${member.user.tag}\` adlı kullanıcı sunucuya katıldı. \`${sayac}\` kişi olmaya \`${sayac - member.guild.members.size}\` kişi kaldı.`)
});

client.on("guildMemberRemove", async member => {
  
  let sayac = await db.fetch(`sayac_${member.guild.id}`);
  let skanal9 = await db.fetch(`sayacK_${member.guild.id}`);
  if (!skanal9) return;
  const skanal31 = member.guild.channels.find('name', skanal9)
  skanal31.send(`📤 \`${member.user.tag}\` adlı kullanıcı sunucuya ayrıldı. \`${sayac}\` kişi olmaya \`${sayac - member.guild.members.size}\` kişi kaldı.`)
}); 
//////////////////////////////SAYAC///////////////////////////////

//////////////////////////////BAN///////////////////////////////
client.on('memberBanAdd', async (guild, member) => {
const embed = new Discord.RichEmbed()
      .setTitle('Üye yasaklandı.')
      .setAuthor(member.user.tag, member.user.avatarURL)
      .setColor("BLUE")
      .setDescription(`<@!${member.user.id}>, ${member.user.tag}`)
      .setThumbnail(member.user.avatarURL)
      .setTimestamp();
let membermodChannel = await db.fetch(`membermodChannel_${guild.id}`)
if (!guild.channels.get(membermodChannel)) return
else guild.channels.get(membermodChannel).send(embed)   
})

client.on('guildBanRemove', async (guild, member) => {
var embed = new Discord.RichEmbed()
      .setTitle('Üyenin yasaklaması kaldırıldı.')
      .setAuthor(member.user.tag, member.user.avatarURL)
      .setColor("BLUE")
      .setDescription(`<@!${member.user.id}>, ${member.user.tag}`)
      .setThumbnail(member.user.avatarURL)
      .setTimestamp();
let membermodChannel = await db.fetch(`membermodChannel_${guild.id}`)
if (!guild.channels.get(membermodChannel)) return 
else guild.channels.get(membermodChannel).send(embed)

})

//////////////////////////////BAN///////////////////////////////

//////////////////////////////DUZENLEME,SILME,METIN-SESLI KANAL OLUSTURMA///////////////////////////////
client.on('messageUpdate', async (oldMessage, newMessage) => {
 if (oldMessage.author.bot) {
        return true;
    }

    if (!oldMessage.guild) {
        return false;
    }

    if (oldMessage.content == newMessage.content) {
        return false;
    }

    if (!oldMessage || !oldMessage.id || !oldMessage.content || !oldMessage.guild) return;
  let embedds4 = new Discord.RichEmbed()
  .setColor("ORANGE")
  .setAuthor(`${oldMessage.author.tag} mesajını düzenledi:`, oldMessage.author.avatarURL)
  .addField("Eski Mesaj: \n",  `\`\`\`${oldMessage.content}\`\`\``)
  .addField("Yeni Mesaj: \n", `\`\`\`${newMessage.content}\`\`\``, true)
  .setFooter(`Kanal: #${newMessage.channel.name} | Kullanıcı: ${oldMessage.author.tag}`)
  .setTimestamp();
  let membermodChannel = await db.fetch(`membermodChannel_${oldMessage.guild.id}`)
  if (!oldMessage.guild.channels.get(membermodChannel)) return
  else oldMessage.guild.channels.get(membermodChannel).send(embedds4)
})

client.on('messageDelete', async msg => {
  var embed = new Discord.RichEmbed()
  .setColor("BLUE")
  .setTitle(`${msg.author.tag} kullanıcısının mesajı silindi`, msg.author.avatarURL)
  .addField("Silinen Mesaj: \n ", `\`\`\`${msg.content}\`\`\``)
  .setFooter(`Kanal: #${msg.channel.name} | Kullanıcı: ${msg.author.tag}`)
  .setTimestamp();
  let membermodChannel = await db.fetch(`membermodChannel_${msg.guild.id}`)
  if (!msg.guild.channels.get(membermodChannel)) return 
  else msg.guild.channels.get(membermodChannel).send(embed)          
})
 
client.on('channelCreate', async channel => {
    if (channel.type === "text") {
    var embed = new Discord.RichEmbed()
    .setColor("BLUE")
    .setDescription(`${ayarlı} \`${channel.name}\` adlı bir yazı kanalı oluşturuldu!`)
    let membermodChannel = await db.fetch(`membermodChannel_${channel.guild.id}`)
    if (!channel.guild.channels.get(membermodChannel)) return
    else channel.guild.channels.get(membermodChannel).send(embed)                      
};
if (channel.type === "voice") {
    var embed = new Discord.RichEmbed()
    .setColor("BLUE")
    .setDescription(`${ayarlı} \`${channel.name}\` adlı bir sesli kanalı oluşturuldu!`)
    let membermodChannel = await db.fetch(`membermodChannel_${channel.guild.id}`)
    if (!channel.guild.channels.get(membermodChannel)) return
    else channel.guild.channels.get(membermodChannel).send(embed)                       }
                        })
               
client.on('channelDelete', async channel => {
 if (channel.type === "text") {
    let embed = new Discord.RichEmbed()
    .setColor("BLUE")
    .setDescription(`${ayarsız} \`${channel.name}\` adlı yazı kanalı silindi!`)
    let membermodChannel = await db.fetch(`membermodChannel_${channel.guild.id}`)
    if (!channel.guild.channels.get(membermodChannel)) return
    else channel.guild.channels.get(membermodChannel).send(embed)
 };
if (channel.type === "voice") {
    let embed = new Discord.RichEmbed()
    .setColor("BLUE")
    .setDescription(`${ayarsız} \`${channel.name}\` adlı sesli kanalı silindi!`)
    let membermodChannel = await db.fetch(`membermodChannel_${channel.guild.id}`)
    if (!channel.guild.channels.get(membermodChannel)) return
    else channel.guild.channels.get(membermodChannel).send(embed)    

}
});
//////////////////////////////DUZENLEME,SILME,METIN-SESLI KANAL OLUSTURMA///////////////////////////////

//////////////////////////////ROL OLUŞTURMA + ROL SİLME//////////////////////////////
client.on('roleCreate', async rol => {
    let embed = new Discord.RichEmbed()
    .setColor("BLUE")
    .setDescription(`${ayarlı} \`${rol.name}\` adlı rol oluşturuldu!`)
 let membermodChannel = await db.fetch(`membermodChannel_${rol.guild.id}`)
    if (!rol.guild.channels.get(membermodChannel)) return
    else rol.guild.channels.get(membermodChannel).send(embed)  
  
});

client.on('roleDelete', async rol => {
    let embed = new Discord.RichEmbed()
    .setColor("BLUE")
    .setDescription(`${ayarsız} \`${rol.name}\` adlı rol silindi!`)
 let membermodChannel = await db.fetch(`membermodChannel_${rol.guild.id}`)
    if (!rol.guild.channels.get(membermodChannel)) return
    else rol.guild.channels.get(membermodChannel).send(embed)  
  
});

client.on('roleUpdate', async (rol, newRol) => {
    if (!rol.guild) {
        return false;
    }

    if (rol.name == newRol.name) {
        return false;
    }

    if (!rol || !rol.id || !rol.name || !rol.guild) return;
    let embed = new Discord.RichEmbed()
    .setColor("ORANGE")
    .setDescription(`${ayarlı} \`${rol.name}\` adlı rolün ismi; \`${newRol.name}\` olarak güncellendi!`)
 let membermodChannel = await db.fetch(`membermodChannel_${rol.guild.id}`)
    if (!rol.guild.channels.get(membermodChannel)) return
    else rol.guild.channels.get(membermodChannel).send(embed)  
  
});
//////////////////////////////ROL OLUŞTURMA + ROL SİLME + ROL DÜZENLEME//////////////////////////////

//////////////////////////////KÜFÜR + LİNK ENGELLEME//////////////////////////////
let küfürEngel = JSON.parse(fs.readFileSync("././jsonlar/kufurEngelle.json", "utf8"));
let linkEngel = JSON.parse(fs.readFileSync("././jsonlar/linkEngelle.json", "utf8"));


client.on("message", async msg => {
  if (!msg.guild) return;
  if (!küfürEngel[msg.guild.id]) return;
  if (küfürEngel[msg.guild.id].küfürEngel === 'kapali') return;
    if (küfürEngel[msg.guild.id].küfürEngel=== 'acik') {
      let vkanal9 = await db.fetch(`varsayılanK_${msg.guild.id}`);
      if (!vkanal9) return;
      const vkanal31 = msg.guild.channels.find('name', vkanal9);
      const kufur = ["mk", "amk", "aq", "orospu", "oruspu", "oç", "sikerim", "yarrak", "piç", "amq", "sik", "amcık", "çocu", "sex", "seks", "amına", "orospu çocuğu", "sg", "siktir git", "amına kodumun", "amına kodumu"];
  if (kufur.some(vkanal31 => msg.content.toLowerCase().includes(vkanal31)) ) {
    if (!msg.member.hasPermission("ADMINISTRATOR")) {
      msg.delete()
       //msg.channel.send("Bu sunucuda küfürler **LeaderTR** tarafından engellenmektedir! Küfür etmene izin vermeyeceğim!").then(message => message.delete(3000));
    }
}
    }
});

client.on("message", async msg => {
  if (!msg.guild) return;
  if (!linkEngel[msg.guild.id]) return;
  if (linkEngel[msg.guild.id].linkEngel === 'kapali') return;
    if (linkEngel[msg.guild.id].linkEngel=== 'acik') {
      let vkanal9 = await db.fetch(`varsayılanK_${msg.guild.id}`);
      if (!vkanal9) return;
      const vkanal31 = msg.guild.channels.find('name', vkanal9);
      const reklams = ["discord.gg","http",".gg",".com",".net",".org","invite","İnstagram","Facebook","watch","Youtube","youtube","facebook","instagram"];
  if (reklams.some(vkanal31 => msg.content.toLowerCase().includes(vkanal31)) ) {
    if (!msg.member.hasPermission("ADMINISTRATOR")) {
      msg.delete()
       //msg.channel.send("Bu sunucuda küfürler **LeaderTR** tarafından engellenmektedir! Küfür etmene izin vermeyeceğim!").then(message => message.delete(3000));
    }
}
    }
});


//////////////////////////////KÜFÜR + LİNK ENGELLEME//////////////////////////////

//////////////////////////////SÜREKLİ AÇIK TUTMA//////////////////////////////
const express = require('express');
const app = express();
const http = require('http');
    app.get("/", (request, response) => {
    console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: Bot Aktif Edildi`);
    response.sendStatus(200);
    });
    app.listen(process.env.PORT);
    setInterval(() => {
    http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
    }, 280000);  // GEREKLİ YERLER
//////////////////////////////SÜREKLİ AÇIK TUTMA//////////////////////////////


//////////////////////////////MUSIC///////////////////////////////
const queue = new Map();  
const ytdl = require('ytdl-core');

const youtube = new YouTube(ayarlar.api);

client.on('message', async msg => { // eslint-disable-line
let prefix = await require('quick.db').fetch(`prefix_${msg.guild.id}`) || ayarlar.prefix
        if (msg.author.bot) return undefined;
        if (!msg.content.startsWith(prefix)) return undefined;
 
        const args = msg.content.split(' ');
        const searchString = args.slice(1).join(' ');
        const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
        const serverQueue = queue.get(msg.guild.id);
 
        let command = msg.content.toLowerCase().split(' ')[0];
        command = command.slice(prefix.length)

  
 
        if (command === 'çal') {
    if (!msg.guild) {
      const ozelmesajuyari = new Discord.RichEmbed()
      .setDescription(`You can not use commands here.`)
      return msg.author.sendEmbed(ozelmesajuyari); }
                const voiceChannel = msg.member.voiceChannel;
    if (!voiceChannel) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription(' ❎ | İlk olarak sesli bir kanala giriş yapmanız gerek.'));
                const permissions = voiceChannel.permissionsFor(msg.client.user);
                if (!permissions.has('CONNECT')) {
      return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setColor('RANDOM')
      .setDescription('🚫 | Şuanda olduğunuz kanala girmek için gerekli izinlere sahip değilim.'));
                }
                if (!permissions.has('SPEAK')) {
      return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setColor('RANDOM')
      .setDescription('🚫 | Şarkı başlatılamıyor. Lütfen mikrofonumu açınız.'));
                }
 
                if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
                        const playlist = await youtube.getPlaylist(url);
                        const videos = await playlist.getVideos();
                        for (const video of Object.values(videos)) {
                                const video2 = await youtube.getVideoByID(video.id); // ehehehehu videomuzu bulalım
                                await handleVideo(video2, msg, voiceChannel, true); // ve gönderelim
                        }
      return msg.channel.sendEmbed(new Discord.RichEmbed)
      .setDescription(`✔ | Playlist ➢ **${playlist.title}** has been added to the queue!`);
                } else {
                        try {
                                var video = await youtube.getVideo(url);
                        } catch (error) {
                                try {
                                        var videos = await youtube.searchVideos(searchString, 10);
                                        let index = 0;
                                        msg.channel.sendEmbed(new Discord.RichEmbed()
                                .setTitle('Şarkı Seçimi')
      .setDescription(`${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}`)
       .setFooter('Lütfen 1-10 arasında bir rakam seçiniz 30 saniye içinde liste iptal edilecektir.')
          .setColor('RANDOM'));
                                        // en fazla 5 tane
                                        try {
                                                var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
                                                        maxMatches: 1,
                                                        time: 10000,
                                                        errors: ['time']
                                                });
                                        } catch (err) {
                                                console.error(err);
            return msg.channel.sendEmbed(new Discord.RichEmbed()
            .setColor('RANDOM')
            .setDescription('❎ | Şarkı seçimi iptal edildi. '));
                                        }
                                        const videoIndex = parseInt(response.first().content);
                                        var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
                                } catch (err) {
                                        console.error(err);
          return msg.channel.sendEmbed(new Discord.RichEmbed()
          .setColor('RANDOM')
          .setDescription(' ❎ | Herhangi bir arama sonucu elde edemedim.'));
                                }
                        }
                        return handleVideo(video, msg, voiceChannel);
                }
        } else if (command === 'geç') {
    if (!msg.guild) {
      const ozelmesajuyari = new Discord.RichEmbed()
      .setDescription(`You can not use commands here.`)
      return msg.author.sendEmbed(ozelmesajuyari); }
    if (!msg.member.voiceChannel) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription(' ❎ | Lütfen öncelikle sesli bir kanala katılınız.'));
                if (!serverQueue) return msg.channel.send(' ❎ | Kuyruk boş olduğu için geçemiyorum. ');
                serverQueue.connection.dispatcher.end('Geç komudu kullanıldı.');
                return undefined;
        } else if (command === 'durdur') {
    if (!msg.guild) {
      const ozelmesajuyari = new Discord.RichEmbed()
      .setDescription(`You can not use commands here.`)
      return msg.author.sendEmbed(ozelmesajuyari); }
    if (!msg.member.voiceChannel) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription(' ❎ | Lütfen öncelikle sesli bir kanala katılınız.'));
    if (!serverQueue) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription(' ❎ | Şu anda herhangi bir şarkı çalmıyorum.'));
                serverQueue.songs = [];
                serverQueue.connection.dispatcher.end('Kapat komutu kullanıldı!');
                return undefined;
        } else if (command === 'ses') {
      if (!msg.guild) {
        const ozelmesajuyari = new Discord.RichEmbed()
        .setDescription(`You can not use commands here.`)
        return msg.author.sendEmbed(ozelmesajuyari); }
    if (!msg.member.voiceChannel) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
  .setDescription(' ❎ | Lütfen öncelikle sesli bir kanala katılınız.'));
    if (!serverQueue) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
   .setDescription(' ❎ | Şu anda herhangi bir şarkı çalmıyorum.'));
    if (!args[1]) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription(` 🔊 | Ses seviyesi: **${serverQueue.volume}**`));
                serverQueue.volume = args[1];
        if (args[1] > 10) return msg.channel.send({
            embed: {
                title: "",
                color: 0xE50000,
                description: "Lütfen 10'dan az yada 10 olarak bir sayı belirtin."
            }
        });
                serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
    return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
   .setDescription('Ses Seviyesi ' + `**${args[1]}**` + ' Olarak Ayarlandı.'));
        } else if (command === 'çalan') {
   
   
    if (!msg.guild) {
      const ozelmesajuyari = new Discord.RichEmbed()
      .setDescription(`❕ | Şu anda hiçbir şey çalmıyorum.`)
      return msg.author.sendEmbed(ozelmesajuyari); }
    if (!serverQueue) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription(':x: | Şu anda hiçbir şey çalmıyorum.'));
    return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .addField('Başlık', `[${serverQueue.songs[0].title}](${serverQueue.songs[0].url})`, true)
    .addField("Süre", `${serverQueue.songs[0].durationm}:${serverQueue.songs[0].durations}`, true))
        } else if (command === 'sıra') {
                if (!serverQueue) return msg.channel.send('❎ | Şu anda hiçbir şey çalmıyorum. ');
                return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
     .setTitle('Şarkı Kuyruğu')
    .setDescription(`${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}`))
    .addField('Şu anda çalınan: ' + `${serverQueue.songs[0].title}`);
        } else if (command === 'duraklat') {
    if (!msg.guild) {
      const ozelmesajuyari = new Discord.RichEmbed()
      .setDescription(`You can not use commands here.`)
      return msg.author.sendEmbed(ozelmesajuyari); }
                if (serverQueue && serverQueue.playing) {
                        serverQueue.playing = false;
                        serverQueue.connection.dispatcher.pause();
      return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setDescription('⏸ | Müzik durduruldu.')
      .setColor('RANDOM'));
                }
                return msg.channel.send('🚫 | Şu anda hiçbir şey çalmıyorum.');
        } else if (command === 'devam') {
    if (!msg.guild) {
      const ozelmesajuyari = new Discord.RichEmbed()
      .setDescription(`Burada komutu kullanamazsınız.`)
      return msg.author.sendEmbed(ozelmesajuyari); }
                if (serverQueue && !serverQueue.playing) {
                        serverQueue.playing = true;
                        serverQueue.connection.dispatcher.resume();
      return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setColor('RANDOM')
      .setDescription('▶ | Müzik devam ediyor.'));
                }
                return msg.channel.send('❎ | Şu anda hiçbir şey çalmıyorum.');
  }
 
        return undefined;
});
 
async function handleVideo(video, msg, voiceChannel, playlist = false) {
        const serverQueue = queue.get(msg.guild.id);
        console.log(video);
        const song = {
                id: video.id,
                title: video.title,
                url: `https://www.youtube.com/watch?v=${video.id}`,
    durationh: video.duration.hours,
    durationm: video.duration.minutes,
                durations: video.duration.seconds,
    views: video.views,
        };
        if (!serverQueue) {
                const queueConstruct = {
                        textChannel: msg.channel,
                        voiceChannel: voiceChannel,
                        connection: null,
                        songs: [],
                        volume: 3,
                        playing: true
                };
                queue.set(msg.guild.id, queueConstruct);
 
                queueConstruct.songs.push(song);
 
                try {
                        var connection = await voiceChannel.join();
                        queueConstruct.connection = connection;
                        play(msg.guild, queueConstruct.songs[0]);
                } catch (error) {
                        console.error(`I could not join the voice channel: ${error}`);
                        queue.delete(msg.guild.id);
                        return msg.channel.send(`HATA | Ses kanalına katılamadım: ${error}`);
                }
        } else {
                serverQueue.songs.push(song);
                console.log(serverQueue.songs);
                if (playlist) return undefined;
    else return msg.channel.sendEmbed(new Discord.RichEmbed()
  .setDescription(`✔ | **${song.title}** adlı şarkı başarıyla kuyruğa eklendi.`)
  .setColor('RANDOM'));
        }
 
        return undefined;
}
 
function play(guild, song) {
        const serverQueue = queue.get(guild.id);
 
        if (!song) {
                serverQueue.voiceChannel.leave();
                queue.delete(guild.id);
                return;
        }
        console.log(serverQueue.songs);
 
        const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
                .on('end', reason => {
                        if (reason === 'Akış yeterince hızlı diğil.') console.log('Şarkı Durduruldu.');
                        else console.log(reason);
                        serverQueue.songs.shift();
                        play(guild, serverQueue.songs[0]);
                })
                .on('error', error => console.error(error));
        dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
 
   serverQueue.textChannel.sendEmbed(new Discord.RichEmbed()
  .setAuthor(`Turkish Bot | Şarkı Çalınıyor`, `https://images.vexels.com/media/users/3/137425/isolated/preview/f2ea1ded4d037633f687ee389a571086-youtube-icon-logo-by-vexels.png`)
  .setThumbnail(`https://i.ytimg.com/vi/${song.id}/default.jpg?width=80&height=60`)
  .addField('Başlık', `[${song.title}](${song.url})`, true)
  .addField("Süre", `${song.durationm}:${song.durations}`, true)
  .addField("Ses Seviyesi", `${serverQueue.volume}%`, true)
  .setColor('#FFFFFF'));
}
//////////////////////////////MUSIC///////////////////////////////
