const associations = require('../../associations');

//  This would be where we would use the retrieved user state object and the tokens (and attachments) of the event to identify where to go next - but for now this is just going to be a rete rule parser by keyword.
//  Let's be real, this is already lightyears ahead of most twitch and discord bots.
module.exports = async function getIntent(next, state) {
	const initialTokens = state.tokens.initial;
	const keywordMatches = associations
		.reduce((matchedMethods, targetAction) => {
			const matches = initialTokens.filter((token) => {
				return targetAction.keywords.includes(token);
			});

			if (matches.length) {
				matchedMethods.push({
					...targetAction,
					matches,
					count: matches.length
				});
			}
			return matchedMethods;
		}, [])
		.sort((a, b) => {
			return a.count > b.count ? -1 : 1;
		});

	// Get descending by most keyword matches
	if (keywordMatches.length) {
		const topMatch = keywordMatches[0];

		state.targetAction = topMatch;

		state.tokens.remaining = _exclude(initialTokens, topMatch.matches);

		return await next();
	} else {
		return state;
	}
};

function _exclude(initialTokens, removeTokens) {
	return initialTokens.filter((token) => {
		return removeTokens.includes(token) === false;
	});
}
