module.exports = async (client, message) => {
  let prefixss = "r.";
  let prefixes = [prefixss, "<@!730564471101325335>", "<@730564471101325335>"];

  let prefix = false;
  for (const thisPrefix of prefixes) {
    if (message.content.toLowerCase().startsWith(thisPrefix.toLowerCase()))
      prefix = thisPrefix;
  }

  if (!message.content.toLowerCase().startsWith(prefix)) return;
  let args = message.content
    .slice(prefix.toLowerCase().length)
    .trim()
    .split(/ +/g);
  let cmd;
  cmd = args.shift().toLowerCase();
  let command;

  if (client.commands.has(cmd)) {
    command = client.commands.get(cmd);
  } else if (client.aliases.has(cmd)) {
    command = client.commands.get(client.aliases.get(cmd));
  }

  try {
    command.run(client, message, args);
  } catch (e) {
    return;
  }
};
