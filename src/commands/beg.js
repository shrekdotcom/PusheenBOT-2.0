const Discord = require('discord.js');
const createLbUser = require("../utils/createaccount.js");
const addCoins = require("../utils/addcoins.js");
const begStats = require("../stats/begstats.js");

function randomInterval(min, max) { // min and max included 
  return Math.random() * (max - min + 1) + min;
}

module.exports = function coinbox(message){
  createLbUser(message.author.id);
  //addCoins(message.author.id, 1);

  let begList = Object.keys(begStats);
  let begOptions = [];
  while(begOptions.length < 3){
    let number = Math.floor(Math.random() * begList.length);
    if(begOptions.indexOf(begList[number]) === -1) begOptions.push(begList[number]);
  }
  
  let optionText = "Options: ";
  for(let i of begOptions){
    optionText += `\`${i}\`, `
  }
  optionText = optionText.slice(0, -2);

  const embed = new Discord.MessageEmbed()
    // Set the title of the field
    .setTitle(`Who would you like to beg to?`)
          // Set the color of the embed
    .setColor(0x7dd4ca)
          // Set the main content of the embed
    .setDescription(`${optionText}`)
          //Set Author
    .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL());


  let filter = m => m.author.id === message.author.id
    message.channel.send(embed).then(() => {
      message.channel.awaitMessages(filter, {
          max: 1,
          time: 30000,
          errors: ['time']
        })
        .then(message => {
          message = message.first()
          let inside = false;
          for(let i of begOptions){
            if (i.toLowerCase() == message.content.toLowerCase()){
              message.content = i;
              inside = true;
            }
          }
          if (inside) {
            let chances = begStats[message.content];
            let totalChance = 0;
            for(let i of chances){
              totalChance += i.chance;
            }
            let rand = Math.random() * totalChance;
            let chosenOption = null;
            for(let i of chances){
              rand -= i.chance;
              if (rand <= 0){
                chosenOption = i;
                break;
              }
            }
            let color = 0xdb1f1f;
            if (chosenOption.fail == false){
              color = 0x26d13f;
            }
            let reward = randomInterval(chosenOption.coinAmount[0], chosenOption.coinAmount[1]);
            reward = Math.floor(reward);

            if (reward < 0){
              if (Math.abs(reward) > leaderboard[message.author.id].coins){
                reward = leaderboard[message.author.id].coins * -1;
              }
            }

            let descriptionText = "";
            if (reward > 0){
              descriptionText = `You gained ${coinEmoji} ${reward}`
            }
            if (reward == 0){
              descriptionText = `You didn't get any ${coinEmoji}`
            }
            if (reward < 0){
              descriptionText = `You lost ${coinEmoji} ${Math.abs(reward)}`
            }

            addCoins(message.author.id, reward);
            
            
            const embed = new Discord.MessageEmbed()
              // Set the title of the field
              .setTitle(`${message.content}: ${chosenOption.text}`)
              // Set the color of the embed
              .setColor(color)
              // Set the main content of the embed
              .setDescription(`${descriptionText}!`)
              //Set Author
              .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL());
            message.channel.send(embed);
          }
          else{
            message.reply("That's not even a valid option man, what are you doing?")
          }
          
        })
        .catch(collected => {
            message.reply(`can you actually like reply next time, ${console.log(collected)}`);
        });
    })

}