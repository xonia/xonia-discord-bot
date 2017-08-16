const ms = require('ms');
const fs = require('fs');
const Discord = require('discord.js');
const settings = require('../settings.json');
exports.run = (client, message, args) => {
  if (!client.lockit) client.lockit = [];
  let time = args.slice(1).join(' ');
  let guild = message.guild;
  let user = message.mentions.users.first();
  let modlog = guild.channels.find('name', settings.modlogchannel);
  let muteRole = client.guilds.get(message.guild.id).roles.find('name', settings.muterolename);

  if(!muteRole) return message.reply('I cannot find a mute role').catch(console.error);
  if(!time || !ms(time)) return message.reply('You must set a duration for the mute in either hours, minutes or seconds.').catch(console.error);
  if(message.mentions.users.size < 1) return message.reply('You must mention someone to mute them.').catch(console.error);
  if(!message.guild.member(client.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.reply('I do not have correct permissions.').catch(console.error);

  var roles = message.guild.member(user).roles;
  if (!message.guild.member(user).roles.has(muteRole.id)) {
    message.guild.member(user).setRoles([muteRole]).then(() => {
      message.channel.send(user.username + ' has been sent to ' + muteRole + ' for ' + time);
      client.lockit[message.channel.id] = setTimeout(() => {
        message.guild.member(user).setRoles(roles);
        message.channel.send(user.username + ' is back from ' + muteRole);
        delete client.lockit[message.channel.id];
      }, ms(time));
    }).catch(error => {
      console.log(error);
    });
  } else {
    return message.channel.send(user.username + ' is already in ' + muteRole);
  }

  const embed = new Discord.RichEmbed()
    .setColor(0x0057e7)
    .setTimestamp()
    .setDescription(`**Action:** Mute\n**Target:** ${user.tag} (${user.id})\n**Moderator:** ${message.author.username}#${message.author.discriminator}\n**Duration:** ${time}`);
  return message.guild.channels.get(modlog.id).send({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: 'mute',
  description: 'Mutes a user for a set amount of time.',
  usage: 'mute <user> <time>'
};
