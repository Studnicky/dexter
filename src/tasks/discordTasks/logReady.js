const config = require('../../../config');

module.exports = async function logReady(next, state) {
	this.logger.info(`\x1b[44m${this.platform.name.toUpperCase()} ready!\x1b[0m`);

	this.logger.info(
		`\x1b[42mBot connected at: \x1b[0m ${new Date()}\n\x1b[42mBot username: \x1b[0m ${this.platform.socket.user.username}\n\x1b[42mBot ID: \x1b[0m ${this.platform.socket.user.id}`
	);

	await this.platform.socket.user.setActivity('Pokeymanz', { url: config.frontend.url, type: 'STREAMING' });

	await next();
};
