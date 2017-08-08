const Discord = require('discord.js');
const settings = require('../settings.json');
module.exports = async (guild, user) => {
  let modlog = guild.channels.find('name', settings.modlogchannel);
  const embed = new Discord.RichEmbed()
    .setColor(0x008744)
    .setTimestamp()
    .setDescription(`**Action:** Unban\n**Target:** ${user.tag} (${user.id})\n`);
  return guild.channels.get(modlog.id).send({embed});
};
