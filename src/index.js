const express = require('express');
const app = express();
const port = 3000;
const Database = require("@replit/database")
const db = new Database()

db.get("leaderboard").then(function (value) {
    if (value == undefined) {
        db.set("leaderboard", {});
        value = {};
    }
    global.leaderboard = value;
});
db.get("inventory").then(function (value) {
    if (value == undefined) {
        db.set("inventory", {});
        value = {};
    }
    global.inventory = value;
});
db.get("cooldown").then(function (value) {
    if (value == undefined) {
        db.set("cooldown", {});
        value = {};
    }
    global.cooldown = value;
});
db.get("stats").then(function (value) {
    if (value == undefined) {
        db.set("stats", {});
        value = {};
    }
    global.stats = value;
});
global.coinEmoji = "<:pusheenCoin:845730283390238781>";
global.effctEmoji = "<:effctEmoji:845747938499756052>";



app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`App Started!`));

const ping = require("./commands/ping.js")
const beg = require("./commands/beg.js")
const coins = require("./commands/coins.js")
const help = require("./commands/help.js")
const give = require("./commands/give.js")


// BOT CODE BELOW
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {  
  client.user.setActivity(`${client.guilds.cache.size} servers`, { type: 'WATCHING' });

  console.log(`Logged in as ${client.user.tag}!`);  
});

client.on('message', msg => {
  let message = msg;

  //Make sure it's not a bot
  if (!message.author.bot) {
    //arguments
    if (message.content.slice(0, 2).toLowerCase() == "p!"){
      //Get content
      content = (message.content.slice(2)).toLowerCase();
      const args = content.split(" ");

      if (args[0] == "ping"){
        ping(message);
      }
      else if (args[0] == "beg"){
        beg(message);
      }
      else if (args[0] == "coins" || args[0] == "coin" || args[0] == "bal" || args[0] == "balance"){
        coins(message);
      }
      else if (args[0] == "help" || args[0] == "info"){
        help(message);
      }
      else if (args[0] == "give" || args[0] == "giv"){
        give(args, message);
      }
      
    }
  }
});
client.on("message", message => {
    if (message.content === "hi") {
        message.channel.send("hey lol")
    }
});



// You really don't want your token here since your repl's code
// is publically available. We'll take advantage of a Replit
// feature to hide the token we got earlier. 
client.login(process.env.DISCORD_TOKEN).then(
  console.log("Login successful!")
).catch(reason => {
  console.log("Login failed: " + reason);
});

setInterval(() => {
  /*
  box = {
    level: 0,
    hp: 1,
    maxHP: 1000,
  }
  */
    client.user.setActivity(`${client.guilds.cache.size} servers`, { type: 'WATCHING' });
    db.set("inventory", inventory)//.then(()=>{console.log("inventory updated")});
    db.set("leaderboard", leaderboard)//.then(()=>{console.log("leaderboard updated")});
    db.set("cooldown", cooldown)//.then(()=>{console.log("cooldown updated")});
    db.set("stats", stats)//.then(()=>{console.log("stats updated")})

    
}, 2500)