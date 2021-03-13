module.exports = async function getUserData(event) {
	this.logger.info('\x1b[42m Fetching User Data... \x1b[0m');

	const eventUserId = event['args'][0]['author']['id'];

	const user = await this.socket.users.fetch(eventUserId);

	return user;
};
