module.exports = async function logDisconnect(next, state) {
	this.logger.info(`\x1b[41m Bot disconnected at: \x1b[0m ${new Date()}`);
	return await next();
};
