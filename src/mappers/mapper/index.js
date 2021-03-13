// https://discord.com/developers/applications
const config = require('../../../config');
const logger = require('../../logger');
const Models = require('../../models');

class Mapper {
	constructor(name, options) {
		this.name = name;
		this.config = { ...config[name]['mapper'], ...options };
		this.logger = this.config.debug ? logger.active : logger.silent;
		this._models = Models;
	}
}

module.exports = Mapper;
