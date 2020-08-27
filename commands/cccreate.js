const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("MANAGE_MESSAGES"))
    return message.reply("OI stop right there");
  let name = args[0];
  if (!name) return message.reply("Please include a command name"); //If they dont include a command name we return a message to tell them to include one
  let content = args.slice(1).join(" ");
  if (!content) return message.reply("Please include a command content"); //If they dont include a command content we return a message to tell them to include one
  let commandObject = {};
  function random(length) {
    let string =
      "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
    let secret = "";
    for (let i = length; i > 0; i--) {
      const random = Math.floor(Math.random() * string.length);
      const char = string.charAt(random);
      string = string.replace(char, "");
      secret += char;
    }
    return secret;
  }
  let id = random(20);
  commandObject.name = name;
  commandObject.content = content;
  commandObject.id = id;

  let commandDescription;
  let exist = db.fetch(`customcommand_${message.guild.id}_${name}`);
  if (exist) {
    commandDescription = `Custom command update\n \`Name:\` ${commandObject.name}\n \`Content:\` ${commandObject.content}`
    db.set(`customcommand_${message.guild.id}_${name}`, commandObject);
      
     let embed = new Discord.MessageEmbed()
      .setColor("#FF5349")
      .setDescription(`${commandDescription}`);
    message.channel.send(embed);
  } else {
      commandDescription = `Custom command creation\n \`Name:\` ${commandObject.name}\n \`Content:\` ${commandObject.content}`
    db.set(`customcommand_${message.guild.id}_${name}`, commandObject);
        
    let embed = new Discord.MessageEmbed()
      .setColor("#FF5349")
      .setDescription(`${commandDescription}`);
    message.channel.send(embed);
  }
};
module.exports.help = {
  name: "cccreate",
  description: "Creates a custom command",
  usage: " <command name> <command content>",
  aliases: ["cc", "customcommand"],
  permissions: ["MANAGE_MESSAGES"]
};
