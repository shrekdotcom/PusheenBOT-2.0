const Discord = require('discord.js');

module.exports = function ping(message){

  const embed = new Discord.MessageEmbed()
    // Set the title of the field
    .setTitle('Help Info')
          // Set the color of the embed
    .setColor(0x7dd4ca)
          // Set the main content of the embed
    .setDescription(`This bot is very early in development. Current commands as follows.
    
**Utility**
p!ping - Pings the bot for a response

**Currency**
p!bal [user] - Checks balance of user
p!beg - Begs for coins
p!give [amount] [user] - Gives coins to a user`)
          //Set Author
    .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL());
  // Send the embed to the same channel as the message
  message.channel.send(embed);
  message.react(`${coinEmoji}`)
    .then()
    .catch();
}