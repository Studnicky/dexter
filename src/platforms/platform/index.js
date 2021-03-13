// https://discord.com/developers/applications
const config = require('../../../config');
const logger = require('../../logger');
const mappers = require('../../mappers');
const routines = require('../../routines');

class Platform {
	constructor(name, options = {}) {
		this.name = name;
		this.config = { ...config[name], ...options };
		this.logger = this.config.debug ? logger.active : logger.silent;
		this.mapper = new mappers[name]();
		this.routines = routines[name];
	}
}

module.exports = Platform;
