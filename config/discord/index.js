const auth = require('./auth');
const channelConfig = require('./channelConfig');
const usersConfig = require('./usersConfig');

const discordConfig = {
	enabled: true,
	debug: true,
	mapper: {},
	events: {},
	auth,
	channelConfig,
	usersConfig
};

module.exports = discordConfig;
