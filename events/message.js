const settings = require('../settings.json');
module.exports = message => {
	if(!message.content.startsWith(settings.prefix)) return; // bot wont respond unless prefix is used
	if(message.author.bot) return; // makes sure the bot doesnt respond to itself
	if(message.content === settings.prefix + 'reset') return; // makes sure the bot doesnt throw an error for emotion reset


	let client = message.client;
	let command = message.content.split(' ')[0].slice(settings.prefix.length);
	let params = message.content.split(' ').slice(1);
	let perms = client.elevation(message);
	let cmd;
	if (client.commands.has(command)) {
	  cmd = client.commands.get(command);
	} else if (client.aliases.has(command)) {
	  cmd = client.commands.get(client.aliases.get(command));
	}
	if (cmd) {
	  if (perms < cmd.conf.permLevel) return;
	  cmd.run(client, message, params, perms);
	}
};
