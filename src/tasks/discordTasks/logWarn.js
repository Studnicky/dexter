module.exports = async function logWarn(next, state) {
	this.logger.info(`\x1b[41m Warn: \x1b[0m ${state.event.args[0]}`);
	return await next();
};
