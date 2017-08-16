const Discord = require('discord.js');
const settings = require('../settings.json');
exports.run = async (client, message, args) => {
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  let guild = message.guild;
  let modlog = guild.channels.find('name', settings.modlogchannel);
  let person = message.mentions.users.first();

  if(!modlog) return message.reply('I cannot find a modlog channel.').catch(console.error);
  if(reason.length < 1) return message.reply('You must supply a reason for banning.').catch(console.error);
  if(message.mentions.users.size < 1) return message.reply('You must mention someone to ban them.').catch(console.error);
  if(!message.guild.member(client.user).hasPermission('BAN_MEMBERS')) return message.reply('I do not have correct permissions.').catch(console.error);

  if(!message.guild.member(user).bannable) return message.reply ('I cannot ban that member');

  try {
    await person.send(`${person.username}, you were banned from ${guild.name} for ${reason}`);
    await guild.ban(user); // ban(user, days)
  } catch(error) {
    console.log(error);
  }

  const embed = new Discord.RichEmbed()
    .setColor(0xd62d20)
    .setTimestamp()
    .setDescription(`**Action:** Ban\n**Target:** ${user.tag} (${user.id})\n**Moderator:** ${message.author.username}#${message.author.discriminator}\n**Reason:** ${reason}`);
  return guild.channels.get(modlog.id).send({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: 'ban',
  description: 'Bans a user.',
  usage: 'ban <user> <reason>'
};
