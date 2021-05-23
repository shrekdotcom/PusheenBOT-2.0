const Discord = require('discord.js');
const createLbUser = require("../utils/createaccount.js");

module.exports = function coins(message){
  let id = message.author.id;
  let username = message.author.tag;

  try{
  let mention = message.mentions.users.first();
  if (mention){
    id = mention.id;
    username = mention.tag;
  }
  }
  catch(err){

  }

  createLbUser(id);
  


  const embed = new Discord.MessageEmbed()
    // Set the title of the field
    .setTitle(`Data for ${username}`)
          // Set the color of the embed
    .setColor(0x7dd4ca)
          // Set the main content of the embed
    .setDescription(`${coinEmoji} ${leaderboard[id].coins}`)
          //Set Author
    .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL());
  // Send the embed to the same channel as the message
  message.channel.send(embed);
}