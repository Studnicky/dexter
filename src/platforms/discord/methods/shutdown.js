module.exports = async function shutdown() {
	this.logger.info('\x1b[41m Destroying client... \x1b[0m');
	this._discordEmitter.removeAllListeners();
	await this._discordEmitter.destroy();
	delete this._discordEmitter;
	this.logger.info('\x1b[41m Client destroyed! \x1b[0m');
	return null;
};
