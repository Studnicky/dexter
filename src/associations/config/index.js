const numbersToNames = require('./pokemonNames.json');

module.exports = {
	numbers: Object.keys(numbersToNames),
	names: Object.values(numbersToNames).map((name) => {
		return name.toLowerCase();
	})
};
