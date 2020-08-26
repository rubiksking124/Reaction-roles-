const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let start = new Discord.MessageEmbed()
    .setAuthor("Ping?")
    .setColor("#FF5349");
  const m = await message.channel.send(start);
  db.set(`test`, Date.now());
  let test = db.fetch(`test`);
  let TIMEE = Date.now() - test;

  let finisg = new Discord.MessageEmbed()

    .setDescription(
      `<:DiscordSupporter:746063443580157953>Message latency-\`${m.createdTimestamp -
        message.createdTimestamp}\`ms\n<:websocket:740064742386696214>Websocket latency-\`${
        client.ws.ping
      }\`ms\n<:Database:740064337212997683>Database latency-\`${TIMEE}\`ms`
    )
    .setColor("#FF5349");
  m.edit(finisg);
};
module.exports.help = {
  name: "ping",
  description: "Pings the bot",
  usage: " ",
  aliases: ["ping"]
};
