const Discord = require('discord.js');
const settings = require('../settings.json');
exports.run = (client, message, args) => {
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  let modlog = client.channels.find('name', 'mod-log');

  if(!modlog) return message.reply('I cannot find a modlog channel.').catch(console.error);
  if(reason.length < 1) return message.reply('You must supply a reason for the warning.').catch(console.error);
  if(message.mentions.users.size < 1) return message.reply('You must mention someone to warn them.').catch(console.error);

  const embed = new Discord.RichEmbed()
  .setColor(0x00AE86)
  .setTimestamp()
  .addField('Action:', 'Warning')
  .addField('User:', `${user.username}#${user.discriminator}`)
  .addField('Moderator:', `${message.author.username}#${message.author.discriminator} (${user.id})`);
  return client.channels.get(modlog.id).send({embed : embed});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 4
};

exports.help = {
  name: 'warn',
  description: 'Warns a user of bad behavior.',
  usage: 'warn <user> <reason>'
};
