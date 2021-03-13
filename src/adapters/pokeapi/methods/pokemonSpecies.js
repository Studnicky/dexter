const fetch = require('node-fetch');

module.exports = async function fetchSpecies(pokemon) {
	const URI = `http://pokeapi.co/api/v2/pokemon-species/${pokemon}`;

	const requestOptions = {
		method: 'GET'
	};

	try {
		const result = await fetch(URI, requestOptions);
		return await result.json();
	} catch (err) {
		throw err;
	}
};
