const { numbers, names } = require('../config');
const { combatType } = require('game-master');
const allTypes = Object.keys(combatType);

const pokemonNameMapper = {
	best: 'shuckle',
	worst: 'gyarados',
	trash: 'gyarados'
};

const typeNameMapper = {
	best: 'steel',
	worst: 'ice'
};

module.exports = function getArgsFromState(state) {
	const types = state.tokens.initial.reduce((typesList, token) => {
		token = typeNameMapper.hasOwnProperty(token) ? typeNameMapper[token] : token;
		if (allTypes.includes(token.toUpperCase())) {
			typesList.push(token);
		}
		return typesList;
	}, []);

	const pokemon = state.tokens.initial.reduce((pokemonList, token) => {
		token = pokemonNameMapper[token] ? pokemonNameMapper[token] : token;
		if (names.includes(token.toLowerCase()) || numbers.includes(token)) {
			pokemonList.push(token);
		}
		return pokemonList;
	}, []);

	return { types, pokemon };
};
