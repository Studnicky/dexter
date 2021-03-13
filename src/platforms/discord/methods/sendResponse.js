module.exports = async function sendResponse(state) {
	const { event: { args } = {}, response, error } = state;
	const message = args[0];

	if (response) {
		await message.reply(response);
	} else if (error) {
		await message.react(':shrug:');
	}
	return;
};
