// https://discord.com/developers/applications
const Mapper = require('../mapper');
const methods = require('./methods');

const defaultConfig = {};
class DiscordEventMapper extends Mapper {
	constructor(options = defaultConfig) {
		super('discord', options);
	}
}

//  Expose a standard interface for all event based clients
DiscordEventMapper.prototype.message = methods.message;
DiscordEventMapper.prototype.messageUpdate = methods.messageUpdate;

module.exports = DiscordEventMapper;
