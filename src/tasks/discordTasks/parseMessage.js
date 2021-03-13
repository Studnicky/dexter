module.exports = async function parseMessage(next, state) {
	const messageContentsMap = {
		message: state.event.args[0],
		messageUpdate: state.event.args[1]
	};

	const { username, id } = this.platform.socket.user;

	const message = messageContentsMap.hasOwnProperty(state.event.eventName) ? messageContentsMap[state.event.eventName] : '';

	const input = message.content.replace(/[^\w\d]/g, ' ');
	const tokens = input.trim().toLowerCase().split(/\s+/g);

	const sortedTokens = tokens.reduce(
		(tokenLists, token) => {
			if (token.includes(username) || token.includes(id)) {
				tokenLists.mentions.push(token);
			} else {
				tokenLists.tokens.push(token);
			}
			return tokenLists;
		},
		{
			mentions: [],
			tokens: []
		}
	);
	const userIsBot = message.author.bot === true;
	const isDirectedAtMe = sortedTokens.mentions.length || message.channel.type === 'dm';
	//  Platforms will have their own rules for parsing tokens out of messages
	const shouldReply = !userIsBot && isDirectedAtMe;
	state.tokens = { initial: sortedTokens.tokens };
	//	If there are no tokens, or the interaction trigger wasn't met, jut return.
	return shouldReply ? await next() : state;
};
