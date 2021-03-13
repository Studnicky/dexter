const fetch = require('node-fetch');
const errors = require('../../../errors');
module.exports = async function fetchSpecies(state) {
	const pokemon = this.getArgsFromState(state);
	let URI = `http://pokeapi.co/api/v2/pokemon-species/${pokemon[0]}`;

	try {
		const requestOptions = {
			method: 'GET'
		};
		const result = await fetch(URI, requestOptions);
		return await result.json();
	} catch (err) {
		throw err;
	}
};

const _getArgsFromState = (state) => {
	return state.tokens.remaining;
};
