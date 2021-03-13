const fetch = require('node-fetch');

module.exports = async function types(types) {
	try {
		const responses = await Promise.all(
			types.map(async (type) => {
				const URI = `http://pokeapi.co/api/v2/type/${type}`;
				const requestOptions = {
					method: 'GET'
				};
				const result = await fetch(URI, requestOptions);
				return await result.json();
			})
		);
		return responses;
	} catch (err) {
		throw err;
	}
};
