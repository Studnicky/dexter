// https://discord.com/developers/applications
const Discord = require('discord.js');
const Platform = require('../platform');

const methods = require('./methods');

const defaultConfig = {
	userEvents: ['message', 'messageUpdate']
};

class DiscordPlatform extends Platform {
	constructor(options = defaultConfig) {
		super('discord', options);

		this.socket = new Discord.Client(this.config);
		this.registerDispatcher();
	}
}

//  Expose a standard interface for all event based clients
DiscordPlatform.prototype.acknowledge = methods.acknowledge;
DiscordPlatform.prototype.sendResponse = methods.sendResponse;
DiscordPlatform.prototype.dispatch = methods.dispatch;
DiscordPlatform.prototype.getUserData = methods.getUserData;
DiscordPlatform.prototype.registerDispatcher = methods.registerDispatcher;
DiscordPlatform.prototype.startup = methods.startup;
DiscordPlatform.prototype.shutdown = methods.shutdown;

//	Platforms may require additional methods individually

module.exports = DiscordPlatform;
