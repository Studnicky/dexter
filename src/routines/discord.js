const tasks = require('../tasks')['discord'];

module.exports = {
	debug: [tasks.logDebug],
	disconnect: [tasks.logDisconnect],
	error: [tasks.logError],
	message: [tasks.onEvent, tasks.parseMessage, tasks.setAcknowledge, tasks.getIntent, tasks.executeIntent],
	messageUpdate: [tasks.onEvent, tasks.parseMessage, tasks.setAcknowledge, tasks.getIntent, tasks.executeIntent],
	ready: [tasks.logReady],
	reconnecting: [tasks.logReconnecting],
	userUpdate: [tasks.onEvent, tasks.userUpdate],
	warn: [tasks.logWarn]
};
