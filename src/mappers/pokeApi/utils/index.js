const utils = require('../../../utils');
const getPokemonRole = require('./getPokemonRole');
const calulateCombatPower = require('./calulateCombatPower');

module.exports = {
	...utils,
	getPokemonRole,
	calulateCombatPower
};
