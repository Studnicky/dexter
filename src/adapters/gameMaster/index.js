const gameMaster = require('game-master');

const logger = require('../../logger');
const methods = require('./methods');

const defaultConfig = {
	debug: true
};
class GameMaster {
	constructor(options = defaultConfig) {
		this.config = { ...defaultConfig, ...options };
		this.logger = this.config.debug ? logger.active : logger.silent;
		this.gameMaster = gameMaster;
	}
}

module.exports = GameMaster;
