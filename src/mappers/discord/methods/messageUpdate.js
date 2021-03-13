module.exports = async function messageUpdate(state) {
	const { username, id } = await state.platform.getPlatformIdentity();

	//	Updated message should be second argument
	const message = state.event.args[1];

	const userInput = message.content.trim().toLowerCase().split(/ +/g);
	const userIsBot = message.author.bot === true;
	const channelIsDm = message.channel.type === 'dm';

	const sortedTokens = userInput.reduce(
		(tokenLists, token) => {
			if (token.includes(username) || token.includes(id)) {
				tokenLists.mentions.push(token);
			} else {
				tokenLists.tokens.push(token);
			}
			return tokenLists;
		},
		{
			tokens: [],
			mentions: []
		}
	);

	const mappedInput = {
		shouldReply: !userIsBot && (channelIsDm || sortedTokens.mentions.length),
		tokens: sortedTokens.tokens
	};

	return mappedInput;
};
