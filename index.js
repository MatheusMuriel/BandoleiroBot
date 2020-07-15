const Discord = require('discord.js');
require('dotenv').config()

const bot = new Discord.Client();
bot.login(process.env.TOKEN);

let canaisDeVoz;

bot.once('ready', () => {
  canaisDeVoz = bot.channels.cache.filter(c => c.type === "voice");
});

bot.on('message', msg => {
  if (msg.content === "!oi") {
    msg.reply("Hello World!");
  }
});

bot.on('voiceStateUpdate', (oldState, newState) => {
  if (newState.channel) {
    bot.channels.fetch(newState.channelID)
      .then( chann => {
        chann.join().then( conn => {
          conn.play('/home/muriel/discord/audio.mp3');
        })
      });
  }
})

// https://discord.com/api/oauth2/authorize?client_id=733013710293041172&permissions=0&scope=bot