const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("MANAGE_ROLES"))
    return message.reply("OI stop right there");
  let msgid = args[0];
  if (!msgid) return message.reply("Please include a message id");
  try {
    message.channel.messages
      .fetch(msgid, { limit: 1 })
      .then(m => {
        try {
          if (m.embeds.length > 0) {
            let roleObject = db.fetch(
              `rolereactions_${message.guild.id}_${msgid}`
            );
            if (!roleObject)
              return message.reply("That is not a reaction role menu");
            let embed = new Discord.MessageEmbed()
              .setColor("#FF5349")
              .setDescription(
                roleObject.text || `React to get <@&${roleObject.role}> role`
              )
              .setFooter("This reaction role has been deleted");
            db.delete(`rolereactions_${message.guild.id}_${msgid}`);
            m.edit({ embed });
            message.channel.send("Reaction role deleted");
          } else {
            message.reply("Unknown error has occured");
          }
        } catch (e) {
          message.reply("This is not a reaction role message **by this bot**");
        }
      })
      .catch(err => {
        message.channel.send("Message not found or " + err.message);
      });
  } catch (e) {
    message.reply("oof something went wrong " + e.message);
  }
};
module.exports.help = {
  name: "rrdelete",
  description: "Deletes reaction role",
  usage: " <message id of reaction role>",
  aliases: ["rrremove"]
};
