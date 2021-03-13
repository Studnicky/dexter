const fetch = require('node-fetch');

module.exports = async function pokemon(pokemon) {
	const URI = `http://pokeapi.co/api/v2/pokemon/${pokemon}`;

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
