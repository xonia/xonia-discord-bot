const Discord = require('discord.js');
const settings = require('../settings.json');
exports.run = function(client, message, args) {
  let msg = args.slice(0).join(' ');
  message.channel.send(msg);
  message.delete();
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: 'echo',
  description: 'echos a message',
  usage: 'echo <message>'
};
