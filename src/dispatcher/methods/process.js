module.exports = async function process(...args) {
	try {
		return await this.executeTask(0, ...args);
	} catch (err) {
		this.logger.error(`${this.logTag} Failed!`);
		throw err;
	}
};
