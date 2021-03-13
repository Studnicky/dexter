module.exports = async function acknowledge(state, toggle) {
	const message = state.event.args[0];
	if (toggle) {
		message.channel.startTyping();
	} else {
		message.channel.stopTyping();
	}
};
