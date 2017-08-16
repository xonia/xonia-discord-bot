const Discord = require('discord.js');
exports.run = async (client, message, args) => {
  let reason = args.slice(1).join(' ');
  let user = args[0];
  let guild = message.guild;

  if(reason) return message.reply('The proper format is "unban <user id>".').catch(console.error);
  if(!user) return message.reply('You must supply a user id.').catch(console.error);

  await guild.unban(user);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: 'unban',
  description: 'Unbans a user.',
  usage: 'unban <user id>'
};
