module.exports = async function startup() {
	this.logger.info('\x1b[42m Creating client... \x1b[0m');
	try {
		const loginData = await this.socket.login(this.config.auth.botToken);
		this.user = this.socket.user;
	} catch (err) {
		this.logger.error(err);
	}
};
