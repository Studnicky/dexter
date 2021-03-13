module.exports = async function setAcknowledge(next, state) {
	this.platform.acknowledge(state, true);
	try {
		await next();
		this.platform.acknowledge(state, false);
	} catch (err) {
		this.platform.acknowledge(state, false);
		throw err;
	}
};
