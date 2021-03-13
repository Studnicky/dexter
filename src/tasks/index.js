const defaultTasks = require('./defaultTasks');
const discordTasks = require('./discordTasks');

module.exports = {
	default: defaultTasks,
	discord: { ...defaultTasks, ...discordTasks }
};
