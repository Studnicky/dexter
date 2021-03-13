module.exports = async function logError(next, state) {
	this.logger.info(`\x1b[41mError: \x1b[0m ${state.event.args[0]}`);
	return await next();
};
