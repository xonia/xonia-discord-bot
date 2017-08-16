const settings = require('../settings.json');
module.exports = member => {
  let guild = member.guild;
  guild.defaultChannel.send(`Please welcome ${member.user.username} to the server!`);
  if(guild.roles.find('name', settings.memberrolename))
    member.addRole(guild.roles.find('name', settings.memberrolename));
};
