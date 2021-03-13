module.exports = async function setAcknowledge(next, state) {
	await this.cache.getState(state);
	await next();
	await this.cache.setState(state);
};
