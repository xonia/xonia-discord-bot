const Discord = require('discord.js');
exports.run = async (client, message, args) => {
  let reason = args.slice(1).join(' ');
  let user = args[0];
  let modlog = client.channels.find('name', 'mod-log');
  let guild = message.guild;

  if(!modlog) return message.reply('I cannot find a modlog channel.').catch(console.error);
  if(reason) return message.reply('The proper format is "unban <user id>".').catch(console.error);
  if(!user) return message.reply('You must supply a user id.').catch(console.error);

  await guild.unban(user);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 4
};

exports.help = {
  name: 'unban',
  description: 'Unbans a user.',
  usage: 'unban <user id>'
};
