// module.exports = async function userUpdate(data) {
//   //  Extract data data, default to system channel if no config
//   let guild = data.guild;
//
// //  I should make helper functions to get roles by minimum permissions
//   let role = guild.roles.find('name', 'Lead Trainer');
//   let channel = guild.channels.find('name', 'welcome-lobby');
//
//   let message = `Welcome to **${data.guild.name}**, <@${data.user.id}>!
//   We like to keep this server to Mystic players only!
//
//   Screenshot of your name, buddy, and level and post it here to gain access to chat.
//   If you need help, contact a ${role}!`;
//
//   //  Message dispatcher time
//   channel.send(message);
// 	this.logger.info(`\n\x1b[42mSome User Updated: ${data} \x1b[0m\n`);
// };

module.exports = async function userUpdate(next, state) {
	this.logger.info(`\x1b[41mError: \x1b[0m ${state.event.args[0]}`);
	return await next();
};
