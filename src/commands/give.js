const Discord = require('discord.js');
const createLbUser = require("../utils/createaccount.js");
const addCoins = require("../utils/addcoins.js");

module.exports = function give(args, message){
  let id;
  let username;
  let authorId = message.author.id;
  let authorTag = message.author.tag;

  try{
  let mention = message.mentions.users.first();
  if (mention){
    id = mention.id;
    username = mention.tag;
  }
  else{
    return message.reply("you have to give coins to a real person, not your imaginary friend")
  }
  }
  catch(err){

  }

  let amount;
  if (!isNaN(Number(args[1]))){
    amount = Number(args[1])
  }
  if (!isNaN(Number(args[2]))){
    amount = Number(args[2])
  }
  if (amount == null){
    return message.reply("You have to give coins, don't try to crash me")
  }
  

  createLbUser(id);
  createLbUser(authorId);

  if (leaderboard[authorId].coins <= amount){
    return message.reply("man you don't even have enough coins")
  }
  if (amount < 0){
    return message.reply("you tried")
  }
  addCoins(id, amount);
  addCoins(authorId, -amount);
  
  if (authorId == id){
    return message.reply(`ok you just gave ${coinEmoji} ${amount} to yourself... nothing changed, good job!`)
  }
  if (amount != 0){
  const embed = new Discord.MessageEmbed()
    // Set the title of the field
    .setTitle(`${authorTag} gave ${amount} coins to ${username}`)
          // Set the color of the embed
    .setColor(0x7dd4ca)
          // Set the main content of the embed
    .setDescription(`Now you have ${coinEmoji} ${leaderboard[authorId].coins} and they have ${coinEmoji} ${leaderboard[id].coins}!`)
          //Set Author
    .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL());
  // Send the embed to the same channel as the message
  message.channel.send(embed);
  }
  else{
  const embed = new Discord.MessageEmbed()
    // Set the title of the field
    .setTitle(`${authorTag} gave ${amount} coins to ${username}`)
          // Set the color of the embed
    .setColor(0x7dd4ca)
          // Set the main content of the embed
    .setDescription(`umm... what even was the point of that`)
          //Set Author
    .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL());
  // Send the embed to the same channel as the message
  message.channel.send(embed);
  }
}