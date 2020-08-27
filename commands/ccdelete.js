const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("MANAGE_MESSAGES"))
    return message.reply("OI stop right there");
  let name = args[0];
  if (!name) return message.reply("Please include a command name"); //If they dont include a command name we return a message to tell them to include one
  let exist = db.fetch(`customcommand_${message.guild.id}_${name}`);

  if(!exist) return message.reply("That is not a custom command")
db.delete(`customcommand_${message.guild.id}_${name}`)
let embed = new Discord.MessageEmbed()
 .setColor("#FF5349")
  .setDescription(`Custom command has been deleted with the name\n \`${name}\``)
message.channel.send(embed)
};
module.exports.help = {
  name: "ccdelete",
  description: "Deletes a custom command",
  usage: " <command name>",
  aliases: ["ccr", "customcommandremove"],
  permissions: ["MANAGE_MESSAGES"]
  
};
