const config = require('../../config');
const console = require('./consoleLogger');
const silent = require('./silentLogger');

const {
	logger: { active }
} = config;

const loggers = {
	console,
	silent
};

module.exports = {
	...loggers,
	active: loggers[active]
};
