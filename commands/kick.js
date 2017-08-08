const Discord = require('discord.js');
const settings = require('../settings.json');
exports.run = async (client, message, args) => {
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  let modlog = client.channels.find('name', settings.modlogchannel);
  let guild = message.guild;
  let person = message.mentions.users.first();

  if(!modlog) return message.reply('I cannot find a modlog channel.').catch(console.error);
  if(reason.length < 1) return message.reply('You must supply a reason for kicking.').catch(console.error);
  if(message.mentions.users.size < 1) return message.reply('You must mention someone to kick them.').catch(console.error);
  if(!message.guild.member(client.user).hasPermission('KICK_MEMBERS')) return message.reply('I do not have correct permissions.').catch(console.error);

  if(!message.guild.member(user).kickable) return message.reply ('I cannot kick that member');

  try {
    await person.send(`${person.username}, you were kicked from ${guild.name} for ${reason}`);
    await guild.member(user).kick();
  } catch(error) {
    console.log(error);
  }

  const embed = new Discord.RichEmbed()
    .setColor(0xffa700)
    .setTimestamp()
    .setDescription(`**Action:** Kick\n**Target:** ${user.tag} (${user.id})\n**Moderator:** ${message.author.username}#${message.author.discriminator}\n**Reason:** ${reason}\n`);
  return guild.channels.get(modlog.id).send({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 4
};

exports.help = {
  name: 'kick',
  description: 'Kicks a user.',
  usage: 'kick <user> <reason>'
};
