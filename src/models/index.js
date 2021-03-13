// https://discord.com/developers/applications
const config = require('../../config');
const logger = require('../logger');

class Models {
	constructor(options) {
		this.config = { ...config['models'], ...options };
		this.logger = this.config.debug ? logger.active : logger.silent;
	}
}

module.exports = Models;
