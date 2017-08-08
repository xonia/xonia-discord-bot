const Discord = require('discord.js');
const settings = require('../settings.json');
exports.run = function(client, message, args) {
  let guild = message.guild;
  let modlog = client.channels.find('name', settings.modlogchannel);
  if(args.length == 1) {
    let messagecount = parseInt(args.join(' '));
    if(!messagecount) return message.reply('you must specify a number of messages to delete.');
    if(messagecount < 2 || messagecount > 99) return message.reply('please enter a valid number (2 - 99).');
    message.channel.fetchMessages({limit: (messagecount + 1)}).then(messages => message.channel.bulkDelete(messages));

    const embed = new Discord.RichEmbed()
      .setColor(0xffea1f)
      .setTimestamp()
      .setDescription(`**Action:** Purge\n**Channel:** ${message.channel}\n**Moderator:** ${message.author.username}#${message.author.discriminator}\n**Deleted:** ${messagecount}`);
    return guild.channels.get(modlog.id).send({embed});
  }
  else if(args.length == 2) {
    let user =  message.mentions.users.first();
    let messagecount = parseInt(args[1]);
    if(!user) return message.reply('You must mention someone to delete their messages.').catch(console.error);
    if(!messagecount) return message.reply('you must specify a number of messages to delete.');
    if(messagecount < 2 || messagecount > 99) return message.reply('please enter a valid number (2 - 99).');

    message.delete();
    message.channel.fetchMessages({limit: 100}).then(allMessages => {
      var deleted = 0;
      var completed = false;
      var messagesToDelete = [];
      allMessages.forEach(function(m, key) {
        if(!(key == message.id)) {
          if(m.author == user || m == allMessages.last()) {
            message.channel.fetchMessage(m.id).then(mToDelete => {
              messagesToDelete.push(mToDelete);
              deleted++;
              if(!completed && (deleted == messagecount || m == allMessages.last())) {
                message.channel.bulkDelete(messagesToDelete);
                completed = true;
                const embed = new Discord.RichEmbed()
                  .setColor(0xffea1f)
                  .setTimestamp()
                  .setDescription(`**Action:** Purge User\n**Channel:** ${message.channel}\n**Target:** ${user.tag} (${user.id})\n**Moderator:** ${message.author.username}#${message.author.discriminator}\n**Deleted:** ${deleted}`);
                return guild.channels.get(modlog.id).send({embed});
              }
            }).catch(console.error);
          }
        }
      });
    });

  }
  else {
    return message.reply('Usage: purge <# of messages> || purge <user> <# of messages>.');
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 4
};

exports.help = {
  name: 'purge',
  description: 'Deletes specified number of messages (2 - 99).',
  usage: 'purge <# of messages> || purge <user> <# of messages>'
};
