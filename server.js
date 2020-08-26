const express = require("express");
const app = express();
const Discord = require("discord.js");
const db = require("quick.db");
const client = new Discord.Client({
  fetchAllMembers: true,
  partials: ["MESSAGE", "USER", "REACTION"]
});
let token = "enter your token here"
const port = 1000;
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
const fs = require("fs");
fs.readdir("./commands/", (err, files) => {
  if (err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if (jsfile.length <= 0) {
    console.log("Could not find any commands");
    return;
  }
  jsfile.forEach(f => {
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    client.commands.set(props.help.name, props);
    props.help.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});
fs.readdir("./events/", (err, files) => {
  if (err) console.log(err);

  let jsfile1 = files.filter(f => f.split(".").pop() === "js");
  if (jsfile1.length <= 0) {
    console.log("Could not find any events");
    return;
  }
  jsfile1.forEach(f => {
    const eventName = f.split(".")[0];
    console.log(`Loading Event: ${eventName}`);
    const event = require(`./events/${f}`);

    client.on(eventName, event.bind(null, client));
  });
});
client.login(token);
