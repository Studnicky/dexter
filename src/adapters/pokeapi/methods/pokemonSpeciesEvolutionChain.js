const fetch = require('node-fetch');
const errors = require('../../../errors');
module.exports = async function pokemonSpeciesEvolutionChain(species) {
	const {
		evolution_chain: { url: URI }
	} = species;

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
