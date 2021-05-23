const Discord = require('discord.js');

module.exports = function ping(message){
  const timeTaken = Date.now() - message.createdTimestamp;
  const embed = new Discord.MessageEmbed()
    // Set the title of the field
    .setTitle('Pong!')
          // Set the color of the embed
    .setColor(0x7dd4ca)
          // Set the main content of the embed
    .setDescription(`It took me ${timeTaken} milliseconds to see your message.`)
          //Set Author
    .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL());
  // Send the embed to the same channel as the message
  message.channel.send(embed);
  message.react('👀')
    .then()
    .catch();
}