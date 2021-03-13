module.exports = async function logDebug ( next, state ) {
	this.logger.trace(`\x1b[43mDebug Message: \x1b[0m ${state.event.args[0]}`);
	return await next();
}
