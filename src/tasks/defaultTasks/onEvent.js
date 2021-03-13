module.exports = async function onEvent(next, state) {
	await next();
	await this.platform.sendResponse(state);
	return state;
};
