module.exports = async function setUser(next, state) {
	state.user = await state.platform.getUserData(state.event);
	return await next();
};
