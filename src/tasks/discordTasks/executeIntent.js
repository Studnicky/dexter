const controllers = require('../../controllers');

//  This would be where we would use the retrieved user state object and the tokens (and attachments) of the event to identify where to go next - but for now this is just going to be a rete rule parser by keyword.
//  Let's be real, this is already lightyears ahead of most twitch and discord bots.
module.exports = async function executeIntent(next, state) {
	const { targetAction: { controller, method } = {} } = state;

	const targetController = new controllers[controller]({});
	state.response = await targetController[method](state);
	await next();
};
