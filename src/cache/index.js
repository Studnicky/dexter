const config = require('../../config');
const logger = require('../logger');

const defaultConfig = {
	debug: true
};

class CacheManager {
	constructor(options = {}) {
		this.config = { ...defaultConfig, ...config.cache, ...options };
		this.logger = this.config.debug ? logger.active : logger.silent;
		// this._redisClient = new RedisClient(this.config);
	}

	async setState(newState) {
		return newState;
	}
	async getState(newState) {
		return newState;
	}
}

module.exports = CacheManager;
