const CacheManager = require('../cache');
const config = require('../../config');
const logger = require('../logger');
const methods = require('./methods');

const defaultConfig = {
	debug: true
};

class Dispatcher {
	constructor(platform, queue = [], options = defaultConfig) {
		this.config = { ...defaultConfig, ...config.dispatcher, ...options };
		this.logger = this.config.debug ? logger.active : logger.silent;

		this.platform = platform;

		this.queue = Array.isArray(queue) ? queue : [];

		this.logTag = `\x1b[45m${this.constructor.name}:\x1b[0m`;
		this.logger.trace(`${this.logTag} Created new task queue: ${this.queue.length}`);

		this.cache = new CacheManager();
	}
}

Dispatcher.prototype.addTask = methods.addTask;
Dispatcher.prototype.addTasks = methods.addTasks;
Dispatcher.prototype.process = methods.process;
Dispatcher.prototype.executeTask = methods.executeTask;
Dispatcher.prototype.onComplete = methods.onComplete;

module.exports = Dispatcher;
